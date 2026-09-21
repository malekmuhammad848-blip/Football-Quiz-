/** ============================================================
 *  Quests — نظام المهام اليومية (يُتجدَّد كل يوم تلقائيًا)
 *  ثلاث مهام يومية متدرجة الصعوبة + مكافأة XP + إعادة تعيين منتصف الليل.
 *  دوال نقيّة — قابلة للاختبار، والمتجر في questsStore.
 *  ============================================================ */

import { dayKey } from "../core/date";

export type QuestId = "answerDaily" | "trainMaster" | "penaltyAce" | "streakGuard";

export interface QuestDef {
  id: QuestId;
  /** الهدف المطلوب */
  target: number;
  /** XP عند الإكمال */
  rewardXp: number;
  ar: { title: string; hint: string };
  en: { title: string; hint: string };
}

export const QUEST_DEFS: readonly QuestDef[] = [
  {
    id: "answerDaily",
    target: 1,
    rewardXp: 15,
    ar: { title: "أجب على سؤال اليوم", hint: "المهمة الأساسية — سؤال واحد" },
    en: { title: "Answer today's question", hint: "The core task — one question" },
  },
  {
    id: "trainMaster",
    target: 3,
    rewardXp: 25,
    ar: { title: "سجّل 3 أهداف في التدريب", hint: "وضع التدريب لا يؤثر على سلسلتك" },
    en: { title: "Score 3 in training", hint: "Training never hurts your streak" },
  },
  {
    id: "penaltyAce",
    target: 2,
    rewardXp: 30,
    ar: { title: "سجّل هدفين في الترجيح", hint: "أوفلاين أو أونلاين — الاثنان يُحسبان" },
    en: { title: "Score 2 penalty goals", hint: "Offline or online — both count" },
  },
] as const;

export interface QuestState {
  progress: Partial<Record<QuestId, number>>;
  claimed: QuestId[];
  /** يوم المهام (يُعاد تعيينه عند تغيّره) */
  day: string;
}

export function emptyQuests(): QuestState {
  return { progress: { answerDaily: 0, trainMaster: 0, penaltyAce: 0 }, claimed: [], day: dayKey() };
}

/** إعادة تعيين إذا كان اليوم مختلفًا */
export function rollover(q: QuestState): QuestState {
  const today = dayKey();
  if (q.day === today) return q;
  return { ...emptyQuests(), day: today };
}

/** هل كل المهام اكتملت؟ (لعرض المكافأة الكبرى) */
export function allComplete(q: QuestState): boolean {
  return QUEST_DEFS.every((d) => (q.progress[d.id] ?? 0) >= d.target);
}

/** مكافأة إكمال كل المهام (بونص) */
export const ALL_BONUS_XP = 40;

/** تقدم مهمة معينة 0..1 */
export function questProgress(q: QuestState, def: QuestDef): number {
  return Math.min(1, (q.progress[def.id] ?? 0) / def.target);
}
