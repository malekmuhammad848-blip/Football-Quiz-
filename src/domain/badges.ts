/** ============================================================
 *  Badges — كتالوج الشارات مع تلميحات الفتح
 *  كل شارة مربوطة بإنجاز موجود في progression (نفس المعرفات).
 *  ============================================================ */

import type { Lang } from "./types";

export interface BadgeDef {
  id: string;
  icon: "flame" | "trophy" | "target" | "ball" | "star" | "crown";
  hint: Record<Lang, string>;
}

export const BADGES: readonly BadgeDef[] = [
  { id: "firstGoal", icon: "ball", hint: { ar: "أجب صحيحًا مرة واحدة", en: "Answer one correctly" } },
  { id: "fiveCorrect", icon: "target", hint: { ar: "5 إجابات صحيحة", en: "5 correct answers" } },
  { id: "twentyCorrect", icon: "star", hint: { ar: "20 إجابة صحيحة", en: "20 correct answers" } },
  { id: "streak3", icon: "flame", hint: { ar: "سلسلة 3 أيام", en: "3-day streak" } },
  { id: "streak7", icon: "flame", hint: { ar: "سلسلة أسبوع كامل", en: "One-week streak" } },
  { id: "streak30", icon: "crown", hint: { ar: "سلسلة 30 يومًا", en: "30-day streak" } },
  { id: "veteran10", icon: "trophy", hint: { ar: "العب 10 مباريات", en: "Play 10 matches" } },
  { id: "veteran50", icon: "trophy", hint: { ar: "العب 50 مباراة", en: "Play 50 matches" } },
  { id: "levelPro", icon: "star", hint: { ar: "بلوغ المستوى 3", en: "Reach level 3" } },
  { id: "levelLegend", icon: "crown", hint: { ar: "الوصول لأعلى مستوى", en: "Reach max level" } },
];
