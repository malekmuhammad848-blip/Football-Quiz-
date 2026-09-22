/** ============================================================
 *  Domain types — أنواع مجال اللعبة
 *  ============================================================ */

export type Lang = "ar" | "en";
export type Theme = "light" | "dark" | "system";
export type Difficulty = "easy" | "medium" | "hard";

export const CATEGORIES = ["history", "worldcup", "clubs", "players", "legends", "arab"] as const;
export type Category = (typeof CATEGORIES)[number];

/** سؤال ثنائي اللغة كامل */
export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  ar: { q: string; options: string[]; fact: string };
  en: { q: string; options: string[]; fact: string };
  /** فهرس الإجابة الصحيحة (0-3) — مشترك بين اللغتين */
  answer: number;
}

/** سؤال مُحلَّول للعرض باللغة الحالية */
export interface LocalizedQuestion {
  id: string;
  category: Category;
  difficulty: Difficulty;
  q: string;
  options: string[];
  fact: string;
  answer: number;
}

/** تقدم اللاعب (نسخة v3 الموحدة) */
export interface Progress {
  streak: number;
  best: number;
  correctCount: number;
  playedCount: number;
  xp: number;
  unlocked: string[];
  /** سجل الإجابات: مفتاح اليوم → فهرس الخيار المختار */
  history: Record<string, number>;
  /** آخر يوم تم الإجابة فيه */
  lastAnswered: string | null;
  /** سؤال اليوم الحالي (id) — يُستخدم لمنع إعادة الإجابة بعد تغيير الجدولة */
  todayQuestionId: string | null;
  /** دروع حماية السلسلة (من إكمال المهام) — يُستهلك درع عند فقدان يوم */
  streakShields: number;
  /** إتقان الفئات: category → { a: إجابات، c: صحيحة } — لتقرير الكشّاف */
  categoryRecord: Record<string, { a: number; c: number }>;
}

/** تفضيلات المستخدم */
export interface Prefs {
  theme: Theme;
  sound: boolean;
  lang: Lang;
  reminder: boolean;
  haptics: boolean;
  /** دخل كضيف — يخفي شاشة الترحيب */
  guest: boolean;
  /** اسم اللاعب المحلي (للضيف أو قبل مزامنة الحساب) */
  playerName: string;
  /** الأفاتار المختار محليًا (id من الكتالوج) — يعمل للضيف والمسجل */
  avatarId: string | null;
  /** الشارة/التاغ المختار محليًا (id من الكتالوج) */
  tagId: string | null;
}

/** نتيجة تسجيل إجابة */
export interface AnswerOutcome {
  correct: boolean;
  xpGained: number;
  leveledUp: boolean;
  level: number;
  levelName: string;
  unlocked: string[];
  progress: Progress;
}
