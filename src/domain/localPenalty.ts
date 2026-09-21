/**
 * LocalPenalty — ركلات ترجيح محلية 100% ضد حارس AI
 * لا شبكة، لا حساب: اختار زاوية خلال 5 ثوانٍ — يمين/وسط/يسار.
 * الحارس يتعلم: 25% احتمال يقرأ زاويتك السابقة.
 * النتائج تُحفظ محليًا وتُمنح XP عند توفرها.
 */

import { storage, readJSON, writeJSON } from "../core/storage";

export const ZONES = [0, 1, 2] as const; // 0=يسار 1=وسط 2=يمين
export type Zone = (typeof ZONES)[number];

export const LOCAL_PENALTY = {
  /** عدد التسديدات في المباراة */
  shots: 5,
  /** نافذة الاختيار بالملي ثانية */
  shotMs: 5_000,
  /** XP لكل هدف */
  xpPerGoal: 10,
  /** مكافأة الفوز الكامل */
  perfectBonusXp: 25,
  /** مكافأة التسجيل 3+ */
  winBonusXp: 10,
} as const;

const STORE_KEY = "tiq:penaltyLocal";

export interface LocalPenaltyRecord {
  bestGoals: number;
  matches: number;
  totalGoals: number;
  perfects: number;
}

export const emptyRecord = (): LocalPenaltyRecord => ({
  bestGoals: 0,
  matches: 0,
  totalGoals: 0,
  perfects: 0,
});

export function loadPenaltyRecord(): LocalPenaltyRecord {
  return { ...emptyRecord(), ...readJSON<Partial<LocalPenaltyRecord>>(STORE_KEY, {}) };
}

export function savePenaltyRecord(r: LocalPenaltyRecord): void {
  writeJSON(STORE_KEY, r);
}

/** تحديث السجل بعد مباراة ويعيد النسخة الجديدة */
export function applyMatch(record: LocalPenaltyRecord, goals: number): { record: LocalPenaltyRecord; bestBeaten: boolean } {
  const bestBeaten = goals > record.bestGoals;
  const next: LocalPenaltyRecord = {
    bestGoals: Math.max(record.bestGoals, goals),
    matches: record.matches + 1,
    totalGoals: record.totalGoals + goals,
    perfects: record.perfects + (goals === LOCAL_PENALTY.shots ? 1 : 0),
  };
  savePenaltyRecord(next);
  return { record: next, bestBeaten };
}

/**
 * اختيار الحارس (AI محلي):
 * - 25% يقرأ زاويتك السابقة (إذا وُجدت).
 * - وإلا يوزّع عشوائيًا مع تفضيل الزوايا على الوسط.
 */
export function keeperPick(rng: () => number, myLast: Zone | null): Zone {
  if (myLast !== null && rng() < 0.25) return myLast;
  const roll = rng();
  if (roll < 0.4) return rng() < 0.5 ? 0 : 2; // زاوية
  if (roll < 0.75) return rng() < 0.5 ? 0 : 2; // زاوية مرة أخرى
  return 1; // وسط
}

/** نتيجة تسديدة واحدة */
export function shotResult(myZone: Zone | null, keeper: Zone): "goal" | "save" | "timeout" {
  if (myZone === null) return "timeout";
  return myZone === keeper ? "save" : "goal";
}

/** XP المكتسب من مباراة كاملة */
export function matchXp(goals: number): number {
  let xp = goals * LOCAL_PENALTY.xpPerGoal;
  if (goals === LOCAL_PENALTY.shots) xp += LOCAL_PENALTY.perfectBonusXp;
  else if (goals >= 3) xp += LOCAL_PENALTY.winBonusXp;
  return xp;
}

/** مولد عشوائي مثبت بالبذرة (اختياري) أو عشوائي حقيقي */
export function makeRng(): () => number {
  return Math.random;
}

/** حذف بيانات الترجيح المحلية (لإعادة التعيين الكامل) */
export function resetPenaltyRecord(): void {
  try {
    storage.removeItem(STORE_KEY);
  } catch {
    /* تجاهل */
  }
}
