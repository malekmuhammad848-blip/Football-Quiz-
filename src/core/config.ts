/** ============================================================
 *  TiQ — Configuration Core
 *  مصدر الحقيقة الوحيد للثوابت. لا سلاسل سحرية في الكود.
 *  ============================================================ */

export const APP = {
  name: "TiQ",
  version: "3.0.0",
  developer: "Malek",
  tagline: { ar: "سؤال الكرة اليومي", en: "Daily Football Question" },
} as const;

/** مفاتيح التخزين المحلي — كلها تحت مساحة اسم واحدة */
export const STORE_KEYS = {
  data: "tiq:data", // الحالة الكاملة للتقدم (نسخة v3)
  prefs: "tiq:prefs", // التفضيلات (ثيم/صوت/لغة/تذكير)
  quests: "tiq:quests", // المهام اليومية
  legacy: {
    prefix: "fq:",
    lastAnswered: "fq:lastAnswered",
    streak: "fq:streak",
    best: "fq:best",
    correctCount: "fq:correctCount",
    playedCount: "fq:playedCount",
    history: "fq:history",
  },
} as const;

export const GAMEPLAY = {
  /** نقاط XP لكل إجابة صحيحة حسب الصعوبة */
  xp: { easy: 10, medium: 20, hard: 35 } as const,
  /** مكافأة السلسلة: 5 نقاط إضافية لكل يوم سلسلة (بحد أقصى) */
  streakBonusPerDay: 5,
  streakBonusCap: 50,
  /** مراحل الإنجاز للسلسلة (أيام) */
  streakMilestones: [3, 7, 14, 30, 50, 100] as const,
  /** إجابات التدريب قبل رؤية النتيجة */
  trainSetSize: 5,
} as const;

export const SHIELD = {
  /** الحد الأقصى لعدد الدروع المجمعة */
  max: 1,
  /** ساعات سريان الدرع بعد الفقد */
  graceHours: 0,
} as const;

export const REMINDER = {
  id: 1001,
  /** الساعة 10 مساءً */
  hour: 22,
  minute: 0,
} as const;

export const THEME = {
  metaColorLight: "#eaf4ec",
  metaColorDark: "#0b120e",
} as const;
