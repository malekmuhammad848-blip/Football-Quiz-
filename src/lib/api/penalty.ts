/**
 * Penalty API — نظام الترجيح الحي (Supabase Realtime)
 */

import type { User } from "@supabase/supabase-js";
import { supabase } from "../supabase";

export interface PenaltyQuestionRow {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  ar_q: string; ar_a: string; ar_b: string; ar_c: string; ar_d: string;
  en_q: string; en_a: string; en_b: string; en_c: string; en_d: string;
  correct: number;
}

export interface PenaltyRoomRow {
  id: string;
  status: "waiting" | "shooting" | "finished" | "abandoned";
  p1: string; p1_name: string; p1_score: number; p1_answer: number | null;
  p2: string | null; p2_name: string | null; p2_score: number; p2_answer: number | null;
  question_id: string | null;
  round: number;
  total_rounds: number;
  deadline: string | null;
  winner: string | null;
}

export type RoomQuestion = {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  q: string;
  options: [string, string, string, string];
  correct: number;
};

export async function fetchPenaltyQuestion(id: string, lang: "ar" | "en"): Promise<RoomQuestion | null> {
  const { data, error } = await supabase
    .from("penalty_questions")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const row = data as PenaltyQuestionRow;
  return {
    id: row.id,
    difficulty: row.difficulty,
    q: lang === "ar" ? row.ar_q : row.en_q,
    options:
      lang === "ar"
        ? [row.ar_a, row.ar_b, row.ar_c, row.ar_d]
        : [row.en_a, row.en_b, row.en_c, row.en_d],
    correct: row.correct,
  };
}

export async function joinQueue(playerName: string): Promise<string> {
  const { data, error } = await supabase.rpc("join_penalty_queue", { p_name: playerName });
  if (error) throw error;
  return data as string;
}

export async function startBotMatch(playerName: string): Promise<string> {
  const { data, error } = await supabase.rpc("start_bot_match", { p_name: playerName });
  if (error) throw error;
  return data as string;
}

export async function takeShot(roomId: string, answer: number, timeMs: number): Promise<void> {
  const { error } = await supabase.rpc("take_penalty_shot", {
    room_id: roomId,
    answer,
    time_ms: timeMs,
  });
  if (error) throw error;
}

export function subscribeRoom(roomId: string, onUpdate: (room: PenaltyRoomRow) => void): () => void {
  const channel = supabase
    .channel(`room:${roomId}`)
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "penalty_rooms", filter: `id=eq.${roomId}` },
      (payload) => onUpdate(payload.new as PenaltyRoomRow),
    )
    .subscribe();
  return () => {
    void supabase.removeChannel(channel);
  };
}

export async function fetchRoom(roomId: string): Promise<PenaltyRoomRow | null> {
  const { data } = await supabase
    .from("penalty_rooms")
    .select("*")
    .eq("id", roomId)
    .maybeSingle();
  return (data as PenaltyRoomRow | null) ?? null;
}

export interface PenaltyStatRow {
  wins: number; losses: number; shots: number; goals: number;
}

export async function fetchMyPenaltyStats(userId: string): Promise<PenaltyStatRow | null> {
  try {
    const { data, error } = await supabase
      .from("penalty_stats")
      .select("wins, losses, shots, goals")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) return null;
    return (data as PenaltyStatRow | null) ?? null;
  } catch {
    return null;
  }
}

export interface PenaltyLeaderRow {
  user_id: string; display_name: string;
  wins: number; losses: number; shots: number; goals: number; goal_rate: number;
}

export async function fetchPenaltyLeaders(): Promise<PenaltyLeaderRow[]> {
  const { data, error } = await supabase
    .from("penalty_leaderboard")
    .select("*")
    .order("wins", { ascending: false })
    .limit(20);
  if (error) throw error;
  return (data ?? []) as PenaltyLeaderRow[];
}

/** إتاحة المستخدم لطبقة الترجيح المحلية */
export type { User };
