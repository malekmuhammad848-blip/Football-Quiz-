/** ============================================================
 *  Rush Engine — محرك وضع السرعة (60 ثانية)
 *  أسئلة عشوائية بلا تكرار، نقاط Combo، أفضل نتيجة محفوظة.
 *  دوال نقيّة + سجل محلي.
 *  ============================================================ */

import { QUESTIONS } from "../data/questions";
import { localizeQuestion } from "./dailyEngine";
import { fnv1a } from "../core/date";
import { readJSON, writeJSON } from "../core/storage";
import type { Lang, LocalizedQuestion } from "./types";

export const RUSH = {
  /** مدة الجولة بالثواني */
  durationSec: 60,
  /** ثوانٍ تُضاف لكل إجابة صحيحة */
  bonusSec: 2,
  /** ثوانٍ تُحرق عند الخطأ */
  penaltySec: 3,
  /** نقاط أساسية للإجابة الصحيحة */
  basePoints: 10,
  /** مكافأة الكومبو: كل 3 متتالية تضاعف القيمة */
  comboStep: 3,
  /** XP يُمنح لكل 30 نقطة */
  xpPer30: 5,
} as const;

const RUSH_KEY = "tiq:rush";

export interface RushRecord {
  best: number;
  matches: number;
  totalCorrect: number;
}

export function loadRushRecord(): RushRecord {
  const r = readJSON<Partial<RushRecord>>(RUSH_KEY, {});
  return { best: r.best ?? 0, matches: r.matches ?? 0, totalCorrect: r.totalCorrect ?? 0 };
}

export function saveRushResult(score: number, correct: number): { record: RushRecord; bestBeaten: boolean } {
  const rec = loadRushRecord();
  const bestBeaten = score > rec.best;
  const next: RushRecord = {
    best: Math.max(rec.best, score),
    matches: rec.matches + 1,
    totalCorrect: rec.totalCorrect + correct,
  };
  writeJSON(RUSH_KEY, next);
  return { record: next, bestBeaten };
}

/** مجموعة أسئلة عشوائية بلا تكرار — بذرة مختلفة كل جولة */
export function buildRushSet(lang: Lang, seed: number, count = 40): LocalizedQuestion[] {
  const indices = QUESTIONS.map((_, i) => i);
  let s = seed >>> 0 || 1;
  for (let i = indices.length - 1; i > 0; i--) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const j = s % (i + 1);
    [indices[i], indices[j]] = [indices[j]!, indices[i]!];
  }
  return indices.slice(0, Math.min(count, indices.length)).map((qi, k) =>
    localizeQuestion(QUESTIONS[qi]!, lang, seed + k * 7919),
  );
}

/** حساب النقاط لإجابة صحيحة حسب الكومبو الحالي */
export function rushPoints(comboBefore: number): number {
  const multiplier = 1 + Math.floor(comboBefore / RUSH.comboStep) * 0.5;
  return Math.round(RUSH.basePoints * multiplier);
}

/** XP المكتسب من نتيجة رَش */
export function rushXp(score: number): number {
  return Math.floor(score / 30) * RUSH.xpPer30;
}

/** بذرة الجولة — فريدة لكل جلسة */
export function roundSeed(): number {
  return fnv1a(`${Date.now()}-${Math.random()}`);
}
