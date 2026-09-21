/** ============================================================
 *  Progression Engine — XP، المستويات، الإنجازات
 *  دوال نقيّة (pure) — لا تلمس التخزين، سهلة الاختبار.
 *  ============================================================ */

import { GAMEPLAY } from "../core/config";
import { dayKey, yesterdayKey } from "../core/date";
import type { Difficulty, Progress } from "./types";

/** المستويات: كل مستوى يحتاج XP تراكميًا */
export const LEVELS = [
  { min: 0, ar: "مبتدئ", en: "Rookie" },
  { min: 150, ar: "هاوٍ", en: "Amateur" },
  { min: 400, ar: "محترف", en: "Pro" },
  { min: 800, ar: "نجمة", en: "Star" },
  { min: 1500, ar: "كابتن", en: "Captain" },
  { min: 2500, ar: "أسطورة", en: "Legend" },
] as const;

export function levelFor(xp: number): { index: number; name: string; current: number; next: number | null; progress: number } {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i]!.min) index = i;
  }
  const cur = LEVELS[index]!;
  const next = LEVELS[index + 1] ?? null;
  const span = next ? next.min - cur.min : 1;
  const into = xp - cur.min;
  return {
    index,
    name: cur.en,
    current: index + 1,
    next: next ? next.min : null,
    progress: next ? Math.min(1, into / span) : 1,
  };
}

/** ============ الإنجازات ============ */

export interface Achievement {
  id: string;
  icon: "flame" | "trophy" | "target" | "ball" | "star" | "crown";
  check: (p: Progress) => boolean;
}

export const ACHIEVEMENTS: readonly Achievement[] = [
  { id: "firstGoal", icon: "ball", check: (p) => p.correctCount >= 1 },
  { id: "fiveCorrect", icon: "target", check: (p) => p.correctCount >= 5 },
  { id: "twentyCorrect", icon: "star", check: (p) => p.correctCount >= 20 },
  { id: "streak3", icon: "flame", check: (p) => p.best >= 3 },
  { id: "streak7", icon: "flame", check: (p) => p.best >= 7 },
  { id: "streak30", icon: "crown", check: (p) => p.best >= 30 },
  { id: "veteran10", icon: "trophy", check: (p) => p.playedCount >= 10 },
  { id: "veteran50", icon: "trophy", check: (p) => p.playedCount >= 50 },
  { id: "levelPro", icon: "star", check: (p) => levelFor(p.xp).index >= 2 },
  { id: "levelLegend", icon: "crown", check: (p) => levelFor(p.xp).index >= LEVELS.length - 1 },
];

/** ============ التقدم الافتراضي ============ */

export function emptyProgress(): Progress {
  return {
    streak: 0,
    best: 0,
    correctCount: 0,
    playedCount: 0,
    xp: 0,
    unlocked: [],
    history: {},
    lastAnswered: null,
    todayQuestionId: null,
    streakShields: 0,
  };
}

/** حساب مكافأة السلسلة */
function streakBonus(streak: number): number {
  return Math.min(streak * GAMEPLAY.streakBonusPerDay, GAMEPLAY.streakBonusCap);
}

/** XP لإجابة صحيحة حسب الصعوبة + مكافأة السلسلة */
export function xpForAnswer(difficulty: Difficulty, streakAfter: number): number {
  const base = GAMEPLAY.xp[difficulty];
  return base + streakBonus(streakAfter);
}

/**
 * حساب السلسلة بعد إجابة اليوم:
 * - الإجابة الصحيحة بعد سلسلة متصلة تكملها، والقطع يصفّرها.
 * - أول إجابة صحيحة بعد غياب تبدأ سلسلة جديدة (أو يستهلك درعًا لإنقاذها).
 */
function nextStreak(p: Progress, correct: boolean, dateKey: string): { streak: number; shields: number } {
  if (p.lastAnswered === dateKey) return { streak: p.streak, shields: p.streakShields }; // سبق الإجابة اليوم
  if (!correct) return { streak: 0, shields: p.streakShields };
  const missedYesterday = p.lastAnswered !== yesterdayKey();
  const hadStreak = p.streak > 0;
  if (missedYesterday && hadStreak) {
    // فجوة يوم — الدرع ينقذ السلسلة إن وُجد
    if (p.streakShields > 0) return { streak: p.streak, shields: p.streakShields - 1 };
    return { streak: 1, shields: p.streakShields };
  }
  return { streak: missedYesterday ? 1 : p.streak + 1, shields: p.streakShields };
}

/** نتيجة إجابة: كل الحسابات في مكان واحد */
export function applyAnswer(
  p: Progress,
  opts: { dateKey: string; questionId: string; selected: number; correct: boolean; difficulty: Difficulty },
): Progress {
  const { dateKey, questionId, selected, correct, difficulty } = opts;
  const repeat = p.lastAnswered === dateKey;

  const { streak, shields } = nextStreak(p, correct, dateKey);
  const best = Math.max(p.best, streak);
  const playedCount = p.playedCount + (repeat ? 0 : 1);
  const correctCount = p.correctCount + (correct && !repeat ? 1 : 0);
  const xp = repeat ? p.xp : p.xp + (correct ? xpForAnswer(difficulty, streak) : 0);

  const history = { ...p.history, [dateKey]: selected };
  // تنظيف السجل: نحتفظ بآخر 90 يومًا فقط
  const keys = Object.keys(history).sort();
  while (keys.length > 90) {
    const old = keys.shift();
    if (old) delete history[old];
  }

  const next: Progress = {
    ...p,
    streak,
    streakShields: shields,
    best,
    playedCount,
    correctCount,
    xp,
    history,
    lastAnswered: dateKey,
    todayQuestionId: questionId,
  };
  return withUnlocked(next);
}

/** تحديث قائمة الإنجازات المفتوحة */
export function withUnlocked(p: Progress): Progress {
  const unlocked = ACHIEVEMENTS.filter((a) => a.check(p)).map((a) => a.id);
  return { ...p, unlocked };
}

/** الإنجازات الجديدة بين تقدمين (لعرض التنبيه) */
export function newlyUnlocked(before: Progress, after: Progress): string[] {
  const old = new Set(before.unlocked);
  return after.unlocked.filter((id) => !old.has(id));
}

/** تصدير مساعدات التاريخ للمستهلكين */
export { dayKey };
