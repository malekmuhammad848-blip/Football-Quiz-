/** ============================================================
 *  Daily Engine — محرك سؤال اليوم
 *  السؤال ثابت لكل المستخدمين في نفس اليوم (تجزئة التاريخ)
 *  مع خَلط ثابت للخيارات (نفسه للجميع) لمنع حفظ مواضع الإجابات.
 *  ============================================================ */

import { fnv1a, dayKey } from "../core/date";
import { QUESTIONS } from "../data/questions";
import type { Lang, LocalizedQuestion, Question } from "./types";

export interface DailyQuestion {
  dateKey: string;
  question: LocalizedQuestion;
}

/** خلط ثابت مبني على بذرة — نفس النتيجة دائمًا لنفس البذرة */
function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const arr = [...items];
  let s = seed >>> 0 || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/** تحويل السؤال الخام إلى نسخة باللغة المطلوبة مع خلط ثابت */
export function localizeQuestion(q: Question, lang: Lang, seed: number): LocalizedQuestion {
  const content = q[lang];
  const order = seededShuffle([0, 1, 2, 3], seed);
  const options = order.map((i) => content.options[i]!);
  const answer = order.indexOf(q.answer);
  return {
    id: q.id,
    category: q.category,
    difficulty: q.difficulty,
    q: content.q,
    options,
    fact: content.fact,
    answer,
  };
}

/** سؤال اليوم لكل المستخدمين — ثابت حسب التاريخ فقط */
export function getDailyQuestion(date: Date = new Date(), lang: Lang = "ar"): DailyQuestion {
  const dateKey = dayKey(date);
  const seed = fnv1a(dateKey);
  const index = seed % QUESTIONS.length;
  return {
    dateKey,
    question: localizeQuestion(QUESTIONS[index]!, lang, seed ^ 0x9e3779b9),
  };
}

/** تحويل فهرس مختار محفوظ (بالترتيب المعروض) إلى صح/خطأ */
export function isSelectionCorrect(question: LocalizedQuestion, selected: number): boolean {
  return selected === question.answer;
}

/** إيجاد سؤال بالمعرف (لعرض سجل قديم إن لزم) */
export function findQuestionById(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}
