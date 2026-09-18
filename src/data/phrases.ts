export interface PhraseSet {
  win: string[];
  lose: string[];
  streakMilestones: Record<number, string>;
}

export const phrases: PhraseSet = {
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
  streakMilestones: {
    3: "٣ أيام متتالية — أنت في قمة لياقتك! 🔥",
    7: "أسبوع كامل! أنت كابتن الفريق 🧢",
    14: "أسبوعان! لاعب محترف بامتياز ⭐",
    30: "شهر كامل! أسطورة المتابعة 👑",
  },
};

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
