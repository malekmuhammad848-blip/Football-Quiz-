export type Lang = "ar" | "en";

const KEY = "fq:lang";

export function getLang(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "en" || v === "ar") return v;
  } catch {
    /* تجاهل */
  }
  return "ar";
}

export function setLang(l: Lang) {
  try {
    localStorage.setItem(KEY, l);
  } catch {
    /* تجاهل */
  }
}

const ar: Record<string, string> = {
  tagline: "سؤال الكرة اليومي",
  todayQuestion: "سؤال اليوم",
  matches: "المباريات",
  goals: "أهداف",
  accuracy: "الدقة",
  backTomorrow: "🗓️ سؤال جديد عند منتصف الليل — استعد!",
  savedAnswer: "إجابة اليوم محفوظة ✅",
  correctAnswerIs: "الإجابة الصحيحة",
  settings: "الإعدادات",
  dailyReminder: "التذكير اليومي",
  reminderTime: "10:00 مساءً",
  sound: "المؤثرات الصوتية",
  appearance: "المظهر",
  light: "نهاري",
  dark: "ليلي",
  system: "النظام",
  resetProgress: "🗑️ إعادة تعيين كل التقدّم",
  signIn: "تسجيل الدخول",
  signUp: "حساب جديد",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  login: "دخول",
  createAccount: "إنشاء الحساب",
  logout: "خروج",
  welcomeBack: "مرحبًا بك مجددًا ⚽",
  busy: "جارٍ...",
  accountCreated: "تم إنشاء الحساب! تحقق من بريدك إن لزم ثم سجّل الدخول.",
  unexpectedError: "حدث خطأ غير متوقع",
  madeBy: "تطوير Malek",
  copied: "تم نسخ النتيجة! 📋",
  shareTitle: "TiQ ⚽",
  shareBody: "جرّب أنت أيضًا!",
  myStreak: "سلسلتي",
  day: "يوم",
  m3: "٣ أيام متتالية — في قمة لياقتك! 🔥",
  m7: "أسبوع كامل! كابتن الفريق 🧢",
  m14: "أسبوعان! لاعب محترف ⭐",
  m30: "شهر كامل! أسطورة المتابعة 👑",
  version: "TiQ v2.0",
};

const en: Record<string, string> = {
  tagline: "Daily Football Question",
  todayQuestion: "Today's Question",
  matches: "Matches",
  goals: "Goals",
  accuracy: "Accuracy",
  backTomorrow: "🗓️ New question at midnight — get ready!",
  savedAnswer: "Today's answer saved ✅",
  correctAnswerIs: "Correct answer",
  settings: "Settings",
  dailyReminder: "Daily reminder",
  reminderTime: "10:00 PM",
  sound: "Sound effects",
  appearance: "Appearance",
  light: "Light",
  dark: "Dark",
  system: "System",
  resetProgress: "🗑️ Reset all progress",
  signIn: "Sign in",
  signUp: "Sign up",
  email: "Email",
  password: "Password",
  login: "Sign in",
  createAccount: "Create account",
  logout: "Log out",
  welcomeBack: "Welcome back ⚽",
  busy: "Working...",
  accountCreated: "Account created! Verify your email if needed, then sign in.",
  unexpectedError: "Unexpected error",
  madeBy: "Made by Malek",
  copied: "Result copied! 📋",
  shareTitle: "TiQ ⚽",
  shareBody: "Try it too!",
  myStreak: "My streak",
  day: "days",
  m3: "3 days straight — peak form! 🔥",
  m7: "Full week! Team captain 🧢",
  m14: "Two weeks! Pro player ⭐",
  m30: "Full month! Legend 👑",
  version: "TiQ v2.0",
};

const dicts: Record<Lang, Record<string, string>> = { ar, en };

let current: Lang = getLang();

export function currentLang(): Lang {
  return current;
}

export function t(key: string): string {
  return dicts[current][key] ?? ar[key] ?? key;
}

/** تُستدعى عند التبديل — تحفظ وتحدّث الاتجاه فورًا */
export function applyLang(l: Lang): Lang {
  current = l;
  setLang(l);
  if (typeof document !== "undefined") {
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }
  return l;
}

// تطبيق الاتجاه عند الإقلاع
if (typeof document !== "undefined") {
  document.documentElement.lang = current;
  document.documentElement.dir = current === "ar" ? "rtl" : "ltr";
}

export const dayNames: Record<Lang, string[]> = {
  ar: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
