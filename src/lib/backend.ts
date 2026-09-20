/** ============================================================
 *  Backend — المصادقة ومزامنة البيانات (Supabase)
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
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      cb(session),
    );
    return data.subscription;
  },
};

// ——— Google OAuth ———

const NATIVE_REDIRECT = "com.malek.tiq://login-callback";

export async function signInWithGoogle(): Promise<{ error?: string }> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: NATIVE_REDIRECT,
        },
      });
      if (error) return { error: error.message };
      if (!data?.url) return { error: "no-url" };
      await Browser.open({ url: data.url });
      return {};
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + window.location.pathname,
      },
    });
    return error ? { error: error.message } : {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "google-signin-failed" };
  }
}

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
    } catch { /* رابط غير معروف */ }
  });
}

// ——— الملف الشخصي ———

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

export const authServiceExtra = {
  async updateDisplayName(name: string) {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;
    try { await setDisplayName(data.session.user, name); } catch { /* محلي يكفي */ }
  },
  async updateAvatarTag(avatarId: string, tagId: string) {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return null;
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_id: avatarId, tag_id: tagId })
      .eq("id", data.session.user.id);
    if (error) return null;
    return true;
  },
};

// ——— التقدم ———

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

// ——— Leaderboard ———

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

// ——— أفاتارات وتاغات (تخصيص) ———

export interface AvatarOption {
  id: string;
  label_ar: string;
  label_en: string;
  emoji: string;
  min_xp: number;
  sort: number;
}

export interface TagOption {
  id: string;
  label_ar: string;
  label_en: string;
  emoji: string;
  min_xp: number;
  sort: number;
}

export interface MyProfileRow {
  avatar_id: string | null;
  tag_id: string | null;
}

export async function fetchAvatarCatalog(): Promise<AvatarOption[]> {
  const { data, error } = await supabase
    .from("avatar_catalog")
    .select("*")
    .order("sort", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AvatarOption[];
}

export async function fetchTagCatalog(): Promise<TagOption[]> {
  const { data, error } = await supabase
    .from("tag_catalog")
    .select("*")
    .order("sort", { ascending: true });
  if (error) throw error;
  return (data ?? []) as TagOption[];
}

export async function fetchMyProfileMeta(userId: string): Promise<MyProfileRow | null> {
  const { data } = await supabase
    .from("profiles")
    .select("avatar_id, tag_id")
    .eq("id", userId)
    .maybeSingle();
  return (data as MyProfileRow | null) ?? null;
}

// ——— الفعاليات ———

export interface EventRow {
  id: string;
  kind: "tournament" | "challenge" | "reward" | "season";
  title_ar: string;
  title_en: string;
  desc_ar: string | null;
  desc_en: string | null;
  emoji: string;
  accent: string;
  starts_at: string;
  ends_at: string;
  reward_ar: string | null;
  reward_en: string | null;
  cta_label_ar: string | null;
  cta_label_en: string | null;
}

export async function fetchActiveEvents(): Promise<EventRow[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("active", true)
    .lte("starts_at", now)
    .gte("ends_at", now)
    .order("starts_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as EventRow[];
}

// ——— الترجيح ———

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

export async function fetchPenaltyQuestion(
  id: string,
  lang: "ar" | "en",
): Promise<RoomQuestion | null> {
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

export async function takeShot(
  roomId: string,
  answer: number,
  timeMs: number,
): Promise<void> {
  const { error } = await supabase.rpc("take_penalty_shot", {
    room_id: roomId,
    answer,
    time_ms: timeMs,
  });
  if (error) throw error;
}

export function subscribeRoom(
  roomId: string,
  onUpdate: (room: PenaltyRoomRow) => void,
): () => void {
  const channel = supabase
    .channel(`room:${roomId}`)
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "penalty_rooms", filter: `id=eq.${roomId}` },
      (payload) => onUpdate(payload.new as PenaltyRoomRow),
    )
    .subscribe();
  return () => { void supabase.removeChannel(channel); };
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

export async function fetchMyPenaltyStats(
  userId: string,
): Promise<PenaltyStatRow | null> {
  const { data } = await supabase
    .from("penalty_stats")
    .select("wins, losses, shots, goals")
    .eq("user_id", userId)
    .maybeSingle();
  return (data as PenaltyStatRow | null) ?? null;
}

export interface PenaltyLeaderRow {
  user_id: string; display_name: string;
  wins: number; losses: number; shots: number; goals: number; goal_rate: number;
}

export async function fetchPenaltyLeaders(): Promise<PenaltyLeaderRow[]> {
  const { data, error } = await supabase
    .from("penalty_leaderboard")
    .select("*")
    .order("wins", { ascending: true })
    .limit(20);
  if (error) throw error;
  return (data ?? []) as PenaltyLeaderRow[];
}
