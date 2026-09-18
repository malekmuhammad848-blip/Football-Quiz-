import type { Question } from "../data/questions";
import { phrases as phraseData } from "../data/phrases";

/** مفاتيح التخزين المحلي */
const KEYS = {
  lastAnswered: "fq:lastAnswered", // "YYYY-MM-DD"
  streak: "fq:streak",
  best: "fq:best",
  correctCount: "fq:correctCount",
  playedCount: "fq:playedCount",
  sound: "fq:sound",
  theme: "fq:theme",
  history: "fq:history", // سجل الإجابات: { [date]: index }
} as const;

export interface Stats {
  streak: number;
  best: number;
  correctCount: number;
  playedCount: number;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* التخزين ممتلئ أو محجوب — نتجاهل بهدوء */
  }
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00`).getTime();
  const db = new Date(`${b}T00:00:00`).getTime();
  return Math.round((db - da) / 86_400_000);
}

/** فهرس سؤال اليوم ثابت لجميع المستخدمين في نفس اليوم */
export function questionIndexForDate(dateKey: string, length: number): number {
  let h = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    h ^= dateKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % length;
}

export function getQuestionForToday(questions: Question[]): {
  question: Question;
  index: number;
  dateKey: string;
} {
  const dateKey = todayKey();
  const index = questionIndexForDate(dateKey, questions.length);
  return { question: questions[index]!, index, dateKey };
}

export function getStats(): Stats {
  return {
    streak: read<number>(KEYS.streak, 0),
    best: read<number>(KEYS.best, 0),
    correctCount: read<number>(KEYS.correctCount, 0),
    playedCount: read<number>(KEYS.playedCount, 0),
  };
}

export function hasAnsweredToday(dateKey: string): boolean {
  return read<string>(KEYS.lastAnswered, "") === dateKey;
}

export function getHistory(): Record<string, number> {
  return read<Record<string, number>>(KEYS.history, {});
}

export interface AnswerResult {
  correct: boolean;
  stats: Stats;
  milestone: string | null;
}

/** تسجيل إجابة اليوم وتحديث السلسلة والإحصائيات */
export function recordAnswer(
  dateKey: string,
  selectedIndex: number,
  correctIndex: number,
): AnswerResult {
  const correct = selectedIndex === correctIndex;
  const yesterday = todayKey(new Date(Date.now() - 86_400_000));
  const last = read<string>(KEYS.lastAnswered, "");

  let streak = read<number>(KEYS.streak, 0);
  if (last === dateKey) {
    // أُجيب مسبقًا اليوم — لا تغيير
  } else if (last === yesterday) {
    streak += correct ? 1 : 0;
    if (!correct) streak = 0;
  } else {
    streak = correct ? 1 : 0;
  }

  const best = Math.max(read<number>(KEYS.best, 0), streak);
  const playedCount = read<number>(KEYS.playedCount, 0) + (last === dateKey ? 0 : 1);
  const correctCount =
    read<number>(KEYS.correctCount, 0) + (correct && last !== dateKey ? 1 : 0);

  write(KEYS.lastAnswered, dateKey);
  write(KEYS.streak, streak);
  write(KEYS.best, best);
  write(KEYS.playedCount, playedCount);
  write(KEYS.correctCount, correctCount);

  const history = getHistory();
  history[dateKey] = selectedIndex;
  write(KEYS.history, history);

  const milestone = phraseData.streakMilestones[streak] ?? null;
  return { correct, stats: { streak, best, correctCount, playedCount }, milestone };
}

export function getSoundEnabled(): boolean {
  return read<boolean>(KEYS.sound, true);
}

export function setSoundEnabled(on: boolean) {
  write(KEYS.sound, on);
}

export type Theme = "light" | "dark" | "system";

export function getTheme(): Theme {
  return read<Theme>(KEYS.theme, "system");
}

export function setTheme(t: Theme) {
  write(KEYS.theme, t);
}

/** إعادة تعيين كل البيانات المحلية */
export function resetAll() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
