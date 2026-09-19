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

/** مخطط التطبيق الأصلي (appId = custom scheme في Capacitor) */
const NATIVE_REDIRECT = "com.malek.tiq://login-callback";

/**
 * تسجيل الدخول عبر Google:
 * - الويب: إعادة توجيه قياسية عبر Supabase OAuth.
 * - الأصلي (APK): فتح متصفح النظام بـ PKCE ثم التقاط الرابط العميق.
 */
export async function signInWithGoogle(): Promise<{ error?: string }> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { skipBrowserRedirect: true, redirectTo: NATIVE_REDIRECT },
      });
      if (error) return { error: error.message };
      if (!data.url) return { error: "no-url" };
      await Browser.open({ url: data.url });
      return {};
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
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
        // تدفق PKCE
        await supabase.auth.exchangeCodeForSession(code);
        return;
      }
      if (url.includes("access_token=")) {
        // تدفق implicit — استخراج الرموز من الجزء السفلي
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

/** اسم العرض إن وُجد (Google يملأه تلقائيًا) */
export function displayNameOf(user: User): string | null {
  const m = (user.user_metadata ?? {}) as Record<string, unknown>;
  const name =
    (m.display_name as string | undefined) ??
    (m.full_name as string | undefined) ??
    (m.name as string | undefined) ??
    null;
  return name && name.trim() ? name.trim() : null;
}

/** حفظ اسم اللاعب: في الحساب + جدول الملفات */
export async function setDisplayName(user: User, name: string): Promise<void> {
  const clean = name.trim().slice(0, 24);
  await supabase.auth.updateUser({ data: { display_name: clean } });
  const { error } = await supabase
    .from("profiles")
    .update({ display_name: clean })
    .eq("id", user.id);
  if (error) throw error;
}

/** تحديث الاسم بجلسة حالية (من شاشة البروفايل) — فشل صامت إن غير مسجل */
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

/** رفع التقدم (الحقول المدعومة في المخطط) */
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

/** جلب بيانات البروفايل للدمج */
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

/** صف لوحة الترتيب الأسبوعي */
export interface LeaderRow {
  user_id: string;
  display_name: string;
  streak: number;
  best: number;
  correct_count: number;
  played_count: number;
  pos: number;
}

/** جلب لوحة الترتيب الأسبوعي (يتطلب جلسة) */
export async function fetchWeeklyLeaderboard(): Promise<LeaderRow[]> {
  const { data, error } = await supabase
    .from("weekly_leaderboard")
    .select("*")
    .order("pos", { ascending: true })
    .limit(50);
  if (error) throw error;
  return (data ?? []) as LeaderRow[];
}

/** حفظ إجابة يومية (upsert آمن للتكرار) */
export async function saveDailyAnswer(user: User, dateKey: string, selected: number, isCorrect: boolean): Promise<void> {
  const { error } = await supabase.from("daily_answers").upsert(
    { user_id: user.id, answer_day: dateKey, selected, is_correct: isCorrect },
    { onConflict: "user_id,answer_day" },
  );
  if (error) throw error;
}

/** مزامنة كاملة: جلب ← دمج في المتجر ← رفع */
export async function syncProgress(user: User, merge: (remote: Partial<Progress>) => void, current: Progress): Promise<void> {
  const remote = await pullProfile(user);
  if (remote) merge(remote);
  await pushProgress(user, current);
}
