/** ============================================================
 *  App store hooks — ربط المتاجر الخارجية بمكوّنات React
 *  ============================================================ */

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import type { Session } from "@supabase/supabase-js";
import { useStore } from "../core/store";
import { prefsStore } from "../stores/prefsStore";
import { progressStore } from "../stores/progressStore";
import { supabaseConfigured } from "../lib/supabase";
import { authService } from "../lib/backend";
import type { Lang, Prefs, Progress } from "../domain/types";

/** تقدم اللاعب الكامل */
export function useProgress(): Progress {
  return useStore(progressStore, (s) => s);
}

/** التفضيلات الكاملة */
export function usePrefs(): Prefs {
  return useStore(prefsStore, (s) => s);
}

/** لغة فقط — لتفادي إعادة الرسم عند تغيير الثيم */
export function useLang(): Lang {
  return useStore(prefsStore, (s) => s.lang);
}

/** هل الوضع الحالي داكن؟ (يتتبع النظام أيضًا) */
export function useIsDark(): boolean {
  const theme = useStore(prefsStore, (s) => s.theme);
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const dark = theme === "dark" || (theme === "system" && systemDark);

  // تطبيق الصنف على الجذر + تحديث meta theme-color
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0b120e" : "#eaf4ec");
  }, [dark]);

  return dark;
}

/** جلسة المصادقة (يعمل فقط عند إعداد Supabase) */
export function useSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);

  const enabled = supabaseConfigured;
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    void authService.getSession().then((s) => {
      if (alive) setSession(s);
    });
    const sub = authService.onChange((s) => setSession(s));
    return () => {
      alive = false;
      sub.unsubscribe();
    };
  }, [enabled]);

  return session;
}

/** مؤقت تنازلي حتى منتصف الليل — يُحدَّث كل ثانية */
export function useMidnightCountdown(): string {
  const [left, setLeft] = useState(() => msToMidnight());
  useEffect(() => {
    const id = setInterval(() => setLeft(msToMidnight()), 1000);
    return () => clearInterval(id);
  }, []);
  return formatCountdown(left);
}

function msToMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, midnight.getTime() - now.getTime());
}

function formatCountdown(ms: number): string {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

/** قيمة متأخرة (لتفادي تحديثات الحالة المتكررة السريعة) */
export function useDebounced<T>(value: T, delay = 150): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

/** مستقر للدوال المستخدمة في التأثيرات */
export function useEventCallback<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
  const [ref] = useState(() => ({ current: fn }));
  ref.current = fn;
  return useCallback((...args: A) => ref.current(...args), [ref]);
}

/** إعادة تصدير للاستهلاك المباشر */
export { useSyncExternalStore };
