/**
 * Profile API — تقدم اللاعب والترتيب الأسبوعي (Supabase)
 */

import type { User } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import type { Progress } from "../../domain/types";

export interface ProfileRow {
  display_name: string | null;
  streak: number;
  best: number;
  correct_count: number;
  played_count: number;
}

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

export async function saveDailyAnswer(
  user: User,
  dateKey: string,
  selected: number,
  isCorrect: boolean,
): Promise<void> {
  await supabase.from("daily_answers").upsert(
    { user_id: user.id, answer_day: dateKey, selected, is_correct: isCorrect },
    { onConflict: "user_id,answer_day" },
  );
}

export async function syncProgress(
  user: User,
  merge: (r: Partial<Progress>) => void,
  current: Progress,
): Promise<void> {
  const remote = await pullProfile(user);
  if (remote) merge(remote);
  await pushProgress(user, current);
}

// ——— التخصيص السحابي (أفاتار/تاغ) ———

export interface MyProfileMeta {
  avatar_id: string | null;
  tag_id: string | null;
}

export async function fetchMyProfileMeta(userId: string): Promise<MyProfileMeta | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("avatar_id, tag_id")
      .eq("id", userId)
      .maybeSingle();
    if (error) return null;
    const row = data as MyProfileMeta | null;
    if (!row || (typeof row.avatar_id !== "string" && typeof row.tag_id !== "string")) return null;
    return {
      avatar_id: typeof row.avatar_id === "string" && row.avatar_id ? row.avatar_id : null,
      tag_id: typeof row.tag_id === "string" && row.tag_id ? row.tag_id : null,
    };
  } catch {
    return null;
  }
}

export async function updateAvatarTag(avatarId: string, tagId: string): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return false;
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_id: avatarId, tag_id: tagId })
    .eq("id", data.session.user.id);
  return !error;
}

// ——— الترتيب ———

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
