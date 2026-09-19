/** ============================================================
 *  Backend service — المصادقة ومزامنة التقدم (Supabase)
 *  ============================================================ */

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
