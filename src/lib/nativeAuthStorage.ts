/** ============================================================
 *  NativeAuthStorage — محول تخزين جلسة Supabase على Capacitor
 *  localStorage في WebView يُمسح غالبًا على أندرويد (ضغط النظام /
 *  إعادة تشغيل التطبيق) — فتضيع الجلسة ويعود المستخدم لشاشة الدخول.
 *  الحل: تخزين أصلي دائم عبر @capacitor/preferences (SharedPreferences
 *  على أندرويد، NSUserDefaults على iOS) مع مرآة احتياطية في localStorage.
 *  على الويب يعيد التوجيه إلى localStorage مباشرة.
 *  ============================================================ */

import type { SupportedStorage } from "@supabase/supabase-js";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";

const KEY = "tiq:supabase-auth";

function isNative(): boolean {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

/** مرآة localStorage — تُستخدم كبديل عند فشل الأصلي (وذاكرة أمان) */
function mirrorSet(value: string | null): void {
  try {
    if (value === null) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, value);
  } catch {
    /* محجوب — نتجاهل */
  }
}

function mirrorGet(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export const nativeAuthStorage: SupportedStorage = {
  async getItem(): Promise<string | null> {
    if (!isNative()) {
      try {
        return localStorage.getItem(KEY);
      } catch {
        return null;
      }
    }
    try {
      const { value } = await Preferences.get({ key: KEY });
      if (value !== null) return value;
      // ترحيل تلقائي: أول تشغيل بعد التحديث — انقل ما تبقى في localStorage
      const legacy = mirrorGet();
      if (legacy !== null) {
        await Preferences.set({ key: KEY, value: legacy });
        return legacy;
      }
      return null;
    } catch {
      return mirrorGet();
    }
  },

  async setItem(value: string): Promise<void> {
    // Supabase ينادي setItem(value) بمعامل واحد
    if (!isNative()) {
      try {
        localStorage.setItem(KEY, value);
      } catch {
        /* تجاهل */
      }
      return;
    }
    try {
      await Preferences.set({ key: KEY, value });
      mirrorSet(value);
    } catch {
      mirrorSet(value);
    }
  },

  async removeItem(): Promise<void> {
    if (!isNative()) {
      try {
        localStorage.removeItem(KEY);
      } catch {
        /* تجاهل */
      }
      return;
    }
    try {
      await Preferences.remove({ key: KEY });
    } catch {
      /* تجاهل */
    }
    mirrorSet(null);
  },
};
