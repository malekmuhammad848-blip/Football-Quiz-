/** ============================================================
 *  Backend service — المصادقة ومزامنة التقدم (Supabase)
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
    const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session));
    return data.subscription;
  },
};

/** مخطط التطبيق الأصلي */
const NATIVE_REDIRECT = "com.malek.tiq://login-callback";

/**
 * الـ redirect URL للويب — نفس الصفحة الحالية
 * هذا يضمن أن Supabase يعيد التوجيه للموقع الصحيح بعد Google OAuth
 */
function getWebRedirectUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.origin + window.location.pathname;
}

/**
 * تسجيل الدخول عبر Google:
 * - الويب: إعادة توجيه قياسية مع redirectTo صريح.
 * - الأصلي (APK): فتح متصفح النظام بـ PKCE ثم التقاط الرابط العميق.
 */
export async function signInWithGoogle(): Promise<{ error?: string }> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: NATIVE_REDIRECT,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });
      if (error) return { error: error.message };
      if (!data.url) return { error: "no-url" };
      await Browser.open({ url: data.url });
      return {};
    }

    // الويب
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getWebRedirectUrl(),
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    return error ? { error: error.message } : {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "google-signin-failed" };
  }
}

/** التقاط الرابط العميق عند العودة من المتصفح (أندرويد فقط) */
export function initAuthUrlOpen(): void {
  if (!Capacitor.isNativePlatform()) return;
  void CapApp.addListener("appUrlOpen", async ({ url }) => {
    try {
      const u = new URL(url);
      const code = u.searchParams.get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
        return;
      }
      if (url.includes("access_token=")) {
        const hash = new URLSearchParams(url.split("#")[1] ?? "");
        const access = hash.get("access_token");
        const refresh = hash.get("refresh_token");
        if (access && refresh) {
          await supabase.auth.setSession({ access_token: access, refresh_token: refresh });
        }
      }
    } catch {
      /* رابط غير معروف — تجاهل */
    }
  });
}

/** اسم العرض إن وُجد */
export function displayNameOf(user: User): string | null {
  const m = (user.user_metadata ?? {}) as Record<string, unknown>;
  const name =
    (m.display_name as string | undefined) ??
    (m.full_name as string | undefined) ??
    (m.name as string | undefined) ??
    null;
  return name && name.trim() ? name.trim() : null;
}

/** حفظ اسم اللاعب */
export async function setDisplayName(user: User, name: string): Promise<void> {
  const clean = name.trim().slice(0, 24);
  await supabase.auth.updateUser({ data: { display_name: clean } });
  const { error } = await supabase
    .from("profiles")
    .update({ display_name: clean })
    .eq("id", user.id);
  if (error) throw error;
}

export const authServiceExtra = {
  async updateDisplayName(name: string) {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;
    try {
      await setDisplayName(data.session.user, name);
    } catch {
      /* الاسم المحلي يكفي */
    }
  },
};

/** رفع التقدم */
export async function pushProgress(user: User, p: Progress): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({
      streak: p.streak,
      best: p.best,
      correct_count: p.correctCount,
      played_count: p.playedCount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);
  if (error) throw error;
}

/** جلب بيانات البروفايل */
export async function pullProfile(user: User): Promise<Partial<Progress> | null> {
  const { data } = await supabase
    .from("profiles")
    .select("streak, best, correct_count, played_count")
    .eq("id", user.id)
    .maybeSingle();
  if (!data) return null;
  const row = data as ProfileRow;
  return {
    streak: row.streak,
    best: row.best,
    correctCount: row.correct_count,
    playedCount: row.played_count,
  };
}

export interface LeaderRow {
  user_id: string;
  display_name: string;
  streak: number;
  best: number;
  correct_count: number;
  played_count: number;
  pos: number;
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

export async function saveDailyAnswer(user: User, dateKey: string, selected: number, isCorrect: boolean): Promise<void> {
  const { error } = await supabase.from("daily_answers").upsert(
    { user_id: user.id, answer_day: dateKey, selected, is_correct: isCorrect },
    { onConflict: "user_id,answer_day" },
  );
  if (error) throw error;
}

export async function syncProgress(user: User, merge: (remote: Partial<Progress>) => void, current: Progress): Promise<void> {
  const remote = await pullProfile(user);
  if (remote) merge(remote);
  await pushProgress(user, current);
}
