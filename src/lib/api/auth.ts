/**
 * Auth API — مصادقة Supabase مفصولة معياريًا
 * طبقة نقية: لا تعرف شيئًا عن الواجهة. كل دوالها async وتعيد نتائج آمنة.
 */

import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { App as CapApp } from "@capacitor/app";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabase";

export type { Session, User };

const NATIVE_REDIRECT = "com.malek.tiq://login-callback";

/** كائن خدمة متوافق مع الواجهات القديمة */
export const authService = {
  signUp: (email: string, password: string) => supabase.auth.signUp({ email, password }),
  signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
  signOut,
  getSession,
  onChange: onSessionChange,
};

/** تحديث اسم العرض (المصادقة + جدول profiles) */
export async function updateDisplayName(name: string): Promise<void> {
  const session = await getSession();
  if (!session) return;
  try {
    await setDisplayName(session.user, name);
  } catch {
    /* الاسم المحلي يكفي */
  }
}

/** الاشتراك في تغيّرات الجلسة */
export function onSessionChange(cb: (session: Session | null) => void): { unsubscribe(): void } {
  const { data } = supabase.auth.onAuthStateChange((_e, session) => cb(session));
  return data.subscription;
}

/** الجلسة الحالية إن وجدت (null بأمان عند أي فشل) */
export async function getSession(): Promise<Session | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch {
    return null;
  }
}

export async function signInWithGoogle(): Promise<{ error?: string }> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { skipBrowserRedirect: true, redirectTo: NATIVE_REDIRECT },
      });
      if (error) return { error: error.message };
      if (!data?.url) return { error: "no-url" };
      await Browser.open({ url: data.url });
      return {};
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + window.location.pathname },
    });
    return error ? { error: error.message } : {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "google-signin-failed" };
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

/** التقاط جلسة OAuth من deep-link على أندرويد */
export function initAuthUrlOpen(): void {
  if (!Capacitor.isNativePlatform()) return;
  void CapApp.addListener("appUrlOpen", async ({ url }) => {
    try {
      const u = new URL(url);
      const code = u.searchParams.get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
        await Browser.close();
        return;
      }
      const hash = url.includes("#") ? url.split("#")[1] : "";
      if (hash) {
        const params = new URLSearchParams(hash);
        const access = params.get("access_token");
        const refresh = params.get("refresh_token");
        if (access && refresh) {
          await supabase.auth.setSession({ access_token: access, refresh_token: refresh });
          await Browser.close();
        }
      }
    } catch {
      /* رابط غير معروف */
    }
  });
}

// ——— الاسم والملف ———

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
