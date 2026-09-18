import type { Lang } from "../lib/i18n";

export interface PhraseSet {
  win: string[];
  lose: string[];
}

export const phraseSets: Record<Lang, PhraseSet> = {
  ar: {
    win: [
      "هدف عالمي! ⚽",
      "إجابة نارية! 🔥",
      "قراءة رائعة للملعب!",
      "كرة ساحرة! كفو!",
      "ذهبية! عين النسر!",
      "أسطورة! استمر!",
      "تمريرة بينية مثالية!",
      "شباك نظيفة!",
    ],
    lose: [
      "لا بأس، الكرة هكذا!",
      "أخطاء المدرب تصنع البطولات!",
      "محاولة شريفة، حاول غدًا 💪",
      "القادم أجمل!",
      "ضربة جزاء... في العارضة!",
      "الحكام ظلموك اليوم!",
    ],
  },
  en: {
    win: [
      "World-class goal! ⚽",
      "On fire! 🔥",
      "Great vision!",
      "Magic touch!",
      "Golden! Eagle eye!",
      "Legend! Keep going!",
      "Perfect through ball!",
      "Clean sheet!",
    ],
    lose: [
      "No worries, that's football!",
      "Coaches' mistakes make titles!",
      "Nice try, come back tomorrow 💪",
      "Better luck next time!",
      "Penalty... off the crossbar!",
      "The ref was against you today!",
    ],
  },
};

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
