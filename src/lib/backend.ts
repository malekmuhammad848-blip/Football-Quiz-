import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import type { Stats } from "./store";

export type { Session, User };

export interface Profile {
  display_name: string | null;
  streak: number;
  best: number;
  correct_count: number;
  played_count: number;
}

export const auth = {
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

/** دمج إحصائيات الجهاز المحلية مع قيم الملف الشخصي في السحابة (الأعلى يفوز) */
function mergeStats(local: Stats, remote: Partial<Profile> | null): Stats {
  if (!remote) return local;
  return {
    streak: Math.max(local.streak, remote.streak ?? 0),
    best: Math.max(local.best, remote.best ?? 0),
    correctCount: Math.max(local.correctCount, remote.correct_count ?? 0),
    playedCount: Math.max(local.playedCount, remote.played_count ?? 0),
  };
}

export const profile = {
  /** جلب الملف الشخصي ودمجه مع الإحصائيات المحلية */
  async pullAndMerge(localStats: Stats, user: User): Promise<Stats> {
    const { data } = await supabase
      .from("profiles")
      .select("display_name, streak, best, correct_count, played_count")
      .eq("id", user.id)
      .maybeSingle();

    return mergeStats(localStats, data as Partial<Profile> | null);
  },

  /** رفع الإحصائيات إلى الملف الشخصي */
  async pushStats(user: User, stats: Stats, displayName?: string | null) {
    const { error } = await supabase
      .from("profiles")
      .update({
        streak: stats.streak,
        best: stats.best,
        correct_count: stats.correctCount,
        played_count: stats.playedCount,
        ...(displayName !== undefined ? { display_name: displayName } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
    return error;
  },

  /** حفظ إجابة يومية (upsert — آمن للتكرار) */
  async saveDailyAnswer(
    user: User,
    dateKey: string,
    selected: number,
    isCorrect: boolean,
  ) {
    const { error } = await supabase.from("daily_answers").upsert(
      {
        user_id: user.id,
        answer_day: dateKey,
        selected,
        is_correct: isCorrect,
      },
      { onConflict: "user_id,answer_day" },
    );
    return error;
  },
};
