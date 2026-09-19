/**
 * Penalty engine — منطق الترجيح على العميل
 * دورة الجولة، المؤقت، ونتائج الجولة (نقي وقابل للاختبار)
 */

import type { PenaltyRoomRow, RoomQuestion } from "../lib/backend";

/** مدة نافذة التسديد (ملي ثانية) — السيرفر يضبط 6 ثوانٍ والتطبيق يعرض 5 */
export const SHOT_WINDOW_MS = 5_000;
/** مهلة إضافية قبل إعلان النتيجة إن تأخر الخصم */
export const ROUND_GRACE_MS = 9_000;

export type ShotOutcome = "goal" | "save" | "miss" | "timeout";

/** هل هذا اللاعب هو p1 في الغرفة؟ */
export function isPlayer1(room: PenaltyRoomRow, userId: string): boolean {
  return room.p1 === userId;
}

/** رتبة اللاعب في الغرفة: 1 أو 2 */
export function mySlot(room: PenaltyRoomRow, userId: string): 1 | 2 {
  return isPlayer1(room, userId) ? 1 : 2;
}

/** اسم الخصم */
export function opponentName(room: PenaltyRoomRow, userId: string): string {
  return room.p1 === userId ? (room.p2_name ?? "TiQ Bot") : room.p1_name;
}

/** نتيجة جولتي في الغرفة الحالية (بعد كتابة إجابتي في الحالة المحلية) */
export function evaluateShot(q: RoomQuestion | null, picked: number | null, timedOut: boolean): ShotOutcome {
  if (!q) return "miss";
  if (timedOut || picked === null) return "timeout";
  return picked === q.correct ? "goal" : "miss";
}

/** ملخص نهاية المباراة */
export interface MatchSummary {
  won: boolean;
  draw: boolean;
  myScore: number;
  oppScore: number;
  oppIsBot: boolean;
}

export function summarize(room: PenaltyRoomRow, userId: string): MatchSummary {
  const me1 = room.p1 === userId;
  const myScore = me1 ? room.p1_score : room.p2_score;
  const oppScore = me1 ? room.p2_score : room.p1_score;
  return {
    won: room.winner === userId,
    draw: room.winner === null,
    myScore,
    oppScore,
    oppIsBot: room.p2 === null,
  };
}

/**
 * الوقت المتبقي في نافذة التسديد الحالية (ملي ثانية)
 * يعتمد على deadline من السيرفر — مصدر الحقيقة الوحيد للزمن
 */
export function msLeftInShot(room: PenaltyRoomRow, now: number): number {
  if (!room.deadline) return SHOT_WINDOW_MS;
  return Math.max(0, new Date(room.deadline).getTime() - now);
}

/** كتابة إجابتي محليًا على نسخة الغرفة (optimistic) */
export function withMyAnswer(room: PenaltyRoomRow, userId: string, picked: number): PenaltyRoomRow {
  const me1 = room.p1 === userId;
  return me1
    ? { ...room, p1_answer: picked }
    : { ...room, p2_answer: picked };
}
