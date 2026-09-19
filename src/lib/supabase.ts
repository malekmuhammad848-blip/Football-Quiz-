/** ============================================================
 *  Supabase client — كشف الإعداد وتكوين آمن
 *  ============================================================ */

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** هل التكامل مهيأ؟ يُستخدم لإخفاء ميزة الحساب إن لم تُضف المفاتيح */
export const supabaseConfigured = Boolean(url && anonKey);

export const supabase = createClient(url ?? "http://localhost:54321", anonKey ?? "placeholder-anon-key", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
