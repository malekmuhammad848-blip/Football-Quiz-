# ⚽ Football Quiz — سؤال الكرة اليومي

<div align="center">

**تطبيق ويب تفاعلي يقدّم سؤال كرة قدم جديدًا كل يوم. حافظ على سلسلتك اليومية وكن أسطورة المتابعة!**

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Framer Motion

</div>

---

## ✨ المميزات

- 📅 **سؤال يومي** — سؤال ثابت لكل اليوم لجميع المستخدمين (خوارزمية تجزئة على التاريخ)
- 🔥 **نظام السلسلة (Streak)** — تتبّع أيام الإجابة المتتالية مع أفضل سلسلة محفوظة
- 🏅 **مراحل تشجيعية** — مكافآت عند 3 و 7 و 14 و 30 يومًا متتاليًا
- 🌙 **الوضع الليلي/النهاري** — نهاري، ليلي، أو تلقائي حسب النظام
- 🔊 **مؤثرات صوتية** — أصوات مولّدة عبر Web Audio API (بدون ملفات خارجية)
- 🎊 **تأثيرات احتفالية** — كونفيتي عند الإجابة الصحيحة
- 💬 **عبارات تشجيعية** — رسائل متنوعة حسب أدائك
- 📊 **إحصائيات** — عدد الإجابات، الإجابات الصحيحة، ونسبة الدقة
- 📱 **تصميم متجاوب** — يعمل على جميع الأجهزة بواجهة عربية كاملة (RTL)
- 💾 **حفظ محلي + سحابي** — التقدّم محفوظ على جهازك، ومع تسجيل الدخول يُزامَن مع قاعدة البيانات
- 🔔 **تذكير يومي** — إشعار على الأندرويد (بعد منح الإذن) عند الساعة 8 مساءً

## 🛠️ التقنيات المستخدمة

| التقنية | الاستخدام |
|--------|----------|
| [React 19](https://react.dev/) | مكتبة واجهة المستخدم |
| [TypeScript 5](https://www.typescriptlang.org/) (وضع strict) | لغة البرمجة |
| [Vite 7](https://vitejs.dev/) | أداة البناء والتطوير |
| [Tailwind CSS 4](https://tailwindcss.com/) | التصميم |
| [Framer Motion](https://motion.dev/) | الأنيميشن |
| [Canvas Confetti](https://github.com/catdad/canvas-confetti) | تأثير الكونفيتي |
| [Lucide React](https://lucide.dev/) | الأيقونات |

## 📁 هيكل المشروع

```
├── index.html                  # نقطة الدخول (RTL + ميتا كاملة)
├── package.json                # التبعيات والسكربتات
├── tsconfig.json               # إعدادات TypeScript الصارمة
├── vite.config.ts              # React + Tailwind + مخرج ملف مفرد
├── public/
│   ├── icon.png                # أيقونة التطبيق
│   └── robots.txt
└── src/
    ├── main.tsx                # نقطة بداية React
    ├── App.tsx                 # المكوّن الرئيسي وحالة اللعبة
    ├── index.css               # ثيم الملعب + متغيرات الوضعين
    ├── components/
    │   ├── QuestionCard.tsx    # بطاقة السؤال والخيارات
    │   ├── ResultPanels.tsx    # لوحة النتيجة (صح/خطأ) مع الحقيقة
    │   ├── SettingsSheet.tsx   # نافذة الإعدادات (صوت/ثيم/إعادة تعيين)
    │   └── StreakOrb.tsx       # كرة السلسلة النارية
    ├── data/
    │   ├── questions.ts        # 30 سؤال كرة قدم مع حقائق
    │   └── phrases.ts          # العبارات والمراحل التشجيعية
    ├── lib/
    │   ├── store.ts            # السلسلة والإحصائيات والتخزين المحلي
    │   └── sound.ts            # المؤثرات الصوتية (Web Audio)
    └── utils/
        └── cn.ts               # دمج أصناف Tailwind
```

## ⚙️ كيفية التشغيل

### المتطلبات
- Node.js 20+ (أو Bun)
- npm / pnpm / bun

### التثبيت والتشغيل

```bash
# 1. نسخ المستودع
git clone https://github.com/malekmuhammad848-blip/Football-Quiz-.git
cd Football-Quiz-

# 2. تثبيت التبعيات
bun install   # أو: npm install

# 3. تشغيل بيئة التطوير
bun run dev   # أو: npm run dev
```

### البناء للإنتاج

```bash
bun run build    # الناتج في dist/ — ملف HTML واحد مكتفٍ بذاته
bun run preview  # معاينة نسخة الإنتاج محليًا
bun run typecheck # فحص الأنواع فقط
```

## 🔐 قاعدة البيانات وتسجيل الدخول (Supabase)

التطبيق يعمل محليًا بالكامل بدون أي إعداد، لكن لتشغيل المزامنة وتسجيل الدخول:

1. أنشئ مشروعًا مجانيًا على [supabase.com](https://supabase.com)
2. من **SQL Editor** شغّل محتوى `supabase/schema.sql` (ينشئ الجداول والسياسات الآمنة)
3. من **Project Settings → API** انسخ Project URL و anon key
4. أضفهما في ملف `.env`:

```bash
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

بدون هذه المتغيرات يعمل التطبيق في «الوضع المحلي» ويُخفي زر الدخول تلقائيًا.

## 🔔 إشعارات الأندرويد (APK)

يطلب التطبيق إذن `POST_NOTIFICATIONS` عند أول تشغيل (Android 13+)، ويجدول تذكيرًا يوميًا عبر `@capacitor/local-notifications`. يمكنك إيقاف التذكير من الإعدادات.

## 📝 إضافة أسئلة جديدة

افتح الملف `src/data/questions.ts` وأضف سؤالًا بهذا الشكل:

```typescript
{
  q: "من فاز بكأس العالم 2022؟",
  options: ["البرازيل", "الأرجنتين", "فرنسا", "ألمانيا"],
  answer: 1,           // فهرس الإجابة الصحيحة (0-based)
  fact: "الأرجنتين فازت بكأس العالم 2022 في قطر بعد ركلات الترجيح ضد فرنسا.",
}
```

## 📄 الرخصة

MIT — انظر ملف [LICENSE](LICENSE).
