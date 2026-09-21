/** ============================================================
 *  Supabase client — جلسة دائمة عبر التخزين الأصلي على أندرويد
 *  ============================================================ */

import { createClient } from "@supabase/supabase-js";
import { Capacitor } from "@capacitor/core";
import { nativeAuthStorage } from "./nativeAuthStorage";

// المفاتيح مضمّنة مباشرة
const SUPABASE_URL = "https://arnhijosycpktbbkzbcx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybmhpam9zeWNwa3RiYmt6YmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MDk0MzIsImV4cCI6MjEwNTM4NTQzMn0.PW4O8kk4IhC81_LbGUFBJBDzrP4oQW61to-szmGvq00";

const url = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

export const supabaseConfigured = true;

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // على أندرويد: لا تبحث عن جلسة في الرابط (الجلسة تأتي عبر deep-link)،
    // وعلى الويب: التقط الجلسة من رابط العودة بعد OAuth.
    detectSessionInUrl: !Capacitor.isNativePlatform(),
    flowType: Capacitor.isNativePlatform() ? "implicit" : "pkce",
    // الجلسة تُخزَّن في التخزين الأصلي الدائم (SharedPreferences) —
    // لا تُمسح عند إعادة تشغيل التطبيق كما يفعل localStorage.
    storage: nativeAuthStorage,
    storageKey: "tiq:auth",
  },
});
