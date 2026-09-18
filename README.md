# ⚽ Football Quiz — سؤال الكرة اليومي

تطبيق ويب تفاعلي يقدم سؤال كرة قدم جديد كل يوم. حافظ على سلسلتك اليومية وكن أسطورة المتابعة!

---

## 🚀 المميزات

- 📅 **سؤال يومي** — سؤال جديد كل يوم تلقائياً
- 🔥 **نظام السلسلة (Streak)** — تتبع أيام الإجابة المتتالية
- 🌙 **الوضع الليلي / النهاري** — دعم كامل للثيمات
- 🔊 **مؤثرات صوتية** — أصوات تفاعلية عند الإجابة
- 🎊 **تأثيرات احتفالية** — كونفيتي عند الإجابة الصحيحة
- 💬 **عبارات تشجيعية** — رسائل متنوعة حسب أدائك
- 📱 **تصميم متجاوب** — يعمل على جميع الأجهزة
- 🌐 **دعم اللغة العربية** — واجهة كاملة بالعربية (RTL)

---

## 🛠️ التقنيات المستخدمة

| التقنية | الاستخدام |
|--------|----------|
| [React 19](https://react.dev/) | مكتبة واجهة المستخدم |
| [TypeScript](https://www.typescriptlang.org/) | لغة البرمجة |
| [Vite 7](https://vitejs.dev/) | أداة البناء |
| [Tailwind CSS 4](https://tailwindcss.com/) | التصميم |
| [Framer Motion](https://www.framer.com/motion/) | الأنيميشن |
| [Canvas Confetti](https://github.com/catdad/canvas-confetti) | تأثير الكونفيتي |
| [Lucide React](https://lucide.dev/) | الأيقونات |

---

## 📁 هيكل المشروع

```
Football-Quiz/
├── index.html                  # نقطة الدخول للتطبيق
├── package.json                # تبعيات المشروع
├── tsconfig.json               # إعدادات TypeScript
├── vite.config.ts              # إعدادات Vite
└── src/
    ├── main.tsx                # نقطة بداية React
    ├── App.tsx                 # المكوّن الرئيسي
    ├── index.css               # الأنماط العامة
    ├── components/
    │   ├── QuestionCard.tsx    # بطاقة السؤال والخيارات
    │   ├── ResultPanels.tsx    # لوحة النتيجة (صح/غلط)
    │   ├── SettingsSheet.tsx   # نافذة الإعدادات
    │   └── StreakOrb.tsx       # كرة السلسلة المتحركة
    ├── data/
    │   ├── questions.ts        # قاعدة أسئلة كرة القدم
    │   └── phrases.ts          # العبارات التشجيعية
    ├── lib/
    │   ├── store.ts            # إدارة الحالة والتخزين المحلي
    │   └── sound.ts            # نظام المؤثرات الصوتية
    └── utils/
        └── cn.ts               # دالة مساعدة لـ className
```

---

## ⚙️ كيفية التشغيل

### المتطلبات
- Node.js 18+
- npm أو yarn

### التثبيت والتشغيل

```bash
# 1. نسخ المستودع
git clone https://github.com/malekmuhammad848-blip/Football-Quiz-.git
cd Football-Quiz-

# 2. تثبيت التبعيات
npm install

# 3. تشغيل بيئة التطوير
npm run dev
```

### البناء للإنتاج

```bash
npm run build
```

> الناتج سيكون في مجلد `dist/` — ملف HTML واحد مكتفٍ بذاته (بسبب `vite-plugin-singlefile`)

---

## 📝 إضافة أسئلة جديدة

افتح الملف `src/data/questions.ts` وأضف سؤالاً بهذا الشكل:

```typescript
{
  q: "من فاز بكأس العالم 2022؟",
  options: ["البرازيل", "الأرجنتين", "فرنسا", "ألمانيا"],
  answer: 1,           // index الإجابة الصحيحة (0-based)
  fact: "الأرجنتين فازت بكأس العالم 2022 في قطر بعد ركلات الترجيح ضد فرنسا.",
}
```

---

## 📄 الرخصة

هذا المشروع مفتوح المصدر للأغراض التعليمية.
