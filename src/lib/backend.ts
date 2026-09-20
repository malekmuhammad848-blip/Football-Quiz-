/** ============================================================
 *  Backend — المصادقة ومزامنة البيانات (Supabase)
 *  ============================================================ */

import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { App as CapApp } from "@capacitor/app";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { Progress } from "../domain/types";

export type { Session, User };

export interface ProfileRow {
  display_name: string | null;
  streak: number;
  best: number;
  correct_count: number;
  played_count: number;
}

export const authService = {
  async signUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  },
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },
  async signOut() {
    return supabase.auth.signOut();
  },
  async getSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
  onChange(cb: (session: Session | null) => void) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      cb(session),
    );
    return data.subscription;
  },
};

// ——— Google OAuth ———

const NATIVE_REDIRECT = "com.malek.tiq://login-callback";

export async function signInWithGoogle(): Promise<{ error?: string }> {
  try {
    if (Capacitor.isNativePlatform()) {
      // APK: implicit flow — يُعيد الـ token في hash الـ URL
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: NATIVE_REDIRECT,
        },
      });
      if (error) return { error: error.message };
      if (!data?.url) return { error: "no-url" };
      await Browser.open({ url: data.url });
      return {};
    }
    // ويب: PKCE مع redirect لنفس الصفحة
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + window.location.pathname,
      },
    });
    return error ? { error: error.message } : {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "google-signin-failed" };
  }
}

/**
 * التقاط deep-link عند العودة من متصفح النظام (Android فقط).
 * يدعم implicit (#access_token) وPKCE (?code) معاً.
 */
export function initAuthUrlOpen(): void {
  if (!Capacitor.isNativePlatform()) return;

  void CapApp.addListener("appUrlOpen", async ({ url }) => {
    try {
      // حالة 1: PKCE — code في query string
      const u = new URL(url);
      const code = u.searchParams.get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
        await Browser.close();
        return;
      }

      // حالة 2: implicit — tokens في hash
      const hash = url.includes("#") ? url.split("#")[1] : "";
      if (hash) {
        const params = new URLSearchParams(hash);
        const access = params.get("access_token");
        const refresh = params.get("refresh_token");
        if (access && refresh) {
          await supabase.auth.setSession({
            access_token: access,
            refresh_token: refresh,
          });
          await Browser.close();
        }
      }
    } catch {
      /* رابط غير معروف — تجاهل */
    }
  });
}

// ——— الملف الشخصي ———

export function displayNameOf(user: User): string | null {
  const m = (user.user_metadata ?? {}) as Record<string, unknown>;
  const n =
    (m.display_name as string | undefined) ??
    (m.full_name as string | undefined) ??
    (m.name as string | undefined) ??
    null;
  return n?.trim() || null;
}

export async function setDisplayName(user: User, name: string): Promise<void> {
  const clean = name.trim().slice(0, 24);
  await supabase.auth.updateUser({ data: { display_name: clean } });
  await supabase.from("profiles").update({ display_name: clean }).eq("id", user.id);
}

export const authServiceExtra = {
  async updateDisplayName(name: string) {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;
    try { await setDisplayName(data.session.user, name); } catch { /* محلي يكفي */ }
  },
};

// ——— التقدم ———

export async function pushProgress(user: User, p: Progress): Promise<void> {
  await supabase.from("profiles").update({
    streak: p.streak,
    best: p.best,
    correct_count: p.correctCount,
    played_count: p.playedCount,
    updated_at: new Date().toISOString(),
  }).eq("id", user.id);
}

export async function pullProfile(user: User): Promise<Partial<Progress> | null> {
  const { data } = await supabase
    .from("profiles")
    .select("streak, best, correct_count, played_count")
    .eq("id", user.id)
    .maybeSingle();
  if (!data) return null;
  const r = data as ProfileRow;
  return { streak: r.streak, best: r.best, correctCount: r.correct_count, playedCount: r.played_count };
}

export async function saveDailyAnswer(user: User, dateKey: string, selected: number, isCorrect: boolean): Promise<void> {
  await supabase.from("daily_answers").upsert(
    { user_id: user.id, answer_day: dateKey, selected, is_correct: isCorrect },
    { onConflict: "user_id,answer_day" },
  );
}

export async function syncProgress(user: User, merge: (r: Partial<Progress>) => void, current: Progress): Promise<void> {
  const remote = await pullProfile(user);
  if (remote) merge(remote);
  await pushProgress(user, current);
}

// ——— Leaderboard ———

export interface LeaderRow {
  user_id: string; display_name: string;
  streak: number; best: number;
  correct_count: number; played_count: number; pos: number;
}

export async function fetchWeeklyLeaderboard(): Promise<LeaderRow[]> {
  const { data, error } = await supabase
    .from("weekly_leaderboard")
    .select("*")
    .order("pos", { ascending: true })
    .limit(50);
  if (error) throw error;
  return (data ?? []) as LeaderRow[];
}
