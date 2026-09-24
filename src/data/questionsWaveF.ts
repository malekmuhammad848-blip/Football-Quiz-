/* ============================================================
 *  Question Bank — الموجة البصرية F (33 سؤالًا بصريًا)
 *  شعارات الأندية · أطقم الأندية والمنتخبات · أعلام الدول
 *  **القاعدة الذهبية**: الفن المعروض يخص صاحب الإجابة الصحيحة
 *  دائمًا — لا سؤال يعرض شعار/طقم/علمًا لا يطابق الإجابة.
 *  ============================================================ */

import type { Question } from "../domain/types";

export const QUESTIONS_WAVE_F: Question[] = [
  // ——— شعارات الأندية (14) ———
  {
    id: "vis-wf-liverpool-badge", visual: { kind: "badge", ref: "liverpool" },
    category: "clubs",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["إيفرتون", "ليفربول", "نيوكاسل", "وست هام"],
      fact: "عصفور الليفر يتوّج الدرع منذ 1901 — رمز مدينة ليفربول الخالد.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Everton", "Liverpool", "Newcastle", "West Ham"],
      fact: "The Liver Bird has crowned the crest since 1901 — the city's famous symbol.",
    },
  },
  {
    id: "vis-wf-barca-badge", visual: { kind: "badge", ref: "barca" },
    category: "clubs",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["برشلونة", "إسبانيول", "فالنسيا", "إشبيلية"],
      fact: "درع برشلونة يدمج صليب القديس جرجس وخطوط كاتالونيا منذ 1899.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Barcelona", "Espanyol", "Valencia", "Sevilla"],
      fact: "Barça's crest blends St George's cross and Catalan stripes since 1899.",
    },
  },
  {
    id: "vis-wf-united-badge", visual: { kind: "badge", ref: "united" },
    category: "clubs",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["مانشستر سيتي", "ليفربول", "مانشستر يونايتد", "ليدز يونايتد"],
      fact: "«الشيطان الأحمر» ظهر على الدرع عام 1970 وأصبح هوية النادي الأشهر.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Manchester City", "Liverpool", "Manchester United", "Leeds United"],
      fact: "The Red Devil appeared on the crest in 1970 and became the club's identity.",
    },
  },
  {
    id: "vis-wf-bayern-badge", visual: { kind: "badge", ref: "bayern" },
    category: "clubs",
    difficulty: "medium",
    answer: 1,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["بوروسيا دورتموند", "بايرن ميونخ", "شالكه", "باير ليفركوزن"],
      fact: "الألوان الأزرق والبيضاوي من معين بافاريا — النادي تأسس عام 1900.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Borussia Dortmund", "Bayern Munich", "Schalke", "Bayer Leverkusen"],
      fact: "Blue and white diamond colors come from the Bavarian flag — founded 1900.",
    },
  },
  {
    id: "vis-wf-city-badge", visual: { kind: "badge", ref: "city" },
    category: "clubs",
    difficulty: "easy",
    answer: 3,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["مانشستر يونايتد", "توتنهام", "أستون فيلا", "مانشستر سيتي"],
      fact: "النسر الذهبي والسفينة يخلّدان تاريخ ميناء مانشستر وإرث النادي.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Manchester United", "Tottenham", "Aston Villa", "Manchester City"],
      fact: "The golden eagle and ship honor Manchester's port heritage.",
    },
  },
  {
    id: "vis-wf-juventus-badge", visual: { kind: "badge", ref: "juventus" },
    category: "clubs",
    difficulty: "medium",
    answer: 2,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["ميلان", "إنتر", "يوفنتوس", "نابولي"],
      fact: "درع «السيدة العجوز» حرف J ذهبي عصري بعد قرن من الزيبرا الكلاسيكي.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Milan", "Inter", "Juventus", "Napoli"],
      fact: "The Old Lady's crest is a modern golden J after a century of zebras.",
    },
  },
  {
    id: "vis-wf-arsenal-badge", visual: { kind: "badge", ref: "arsenal" },
    category: "clubs",
    difficulty: "medium",
    answer: 3,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["تشيلسي", "توتنهام", "وست هام", "آرسنال"],
      fact: "المدفع في الشعار تذكار بأصول النادي في مصنع أسلحة وولويتش 1886.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Chelsea", "Tottenham", "West Ham", "Arsenal"],
      fact: "The cannon remembers the club's arsenal-factory origins of 1886.",
    },
  },
  {
    id: "vis-wf-chelsea-badge", visual: { kind: "badge", ref: "chelsea" },
    category: "clubs",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["آرسنال", "تشيلسي", "أستون فيلا", "إيفرتون"],
      fact: "الأسد الحامل للعصا مستوحى من شعار إيرل تشيلسي التاريخي.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Arsenal", "Chelsea", "Aston Villa", "Everton"],
      fact: "The staff-bearing lion comes from the historic Earl of Chelsea crest.",
    },
  },
  {
    id: "vis-wf-inter-badge", visual: { kind: "badge", ref: "inter" },
    category: "clubs",
    difficulty: "medium",
    answer: 3,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["ميلان", "روما", "لاتسيو", "إنتر"],
      fact: "انفصل «الأم الدولي» عن ميلان عام 1908 واختار الأزرق والأسود.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Milan", "Roma", "Lazio", "Inter"],
      fact: "The 'Internazionale' split from Milan in 1908, choosing black and blue.",
    },
  },
  {
    id: "vis-wf-milan-badge", visual: { kind: "badge", ref: "milan" },
    category: "clubs",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["إنتر", "يوفنتوس", "ميلان", "روما"],
      fact: "الصليب الأحمر رمز مدينة ميلانو القديم وخطوط «روسونيري» الشهيرة.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Inter", "Juventus", "Milan", "Roma"],
      fact: "The red cross is old Milan's symbol beside the famous rossoneri stripes.",
    },
  },
  {
    id: "vis-wf-atletico-badge", visual: { kind: "badge", ref: "atletico" },
    category: "clubs",
    difficulty: "medium",
    answer: 1,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["ريال مدريد", "أتلتيكو مدريد", "فياريال", "أوساسونا"],
      fact: "الدب المتسلق شجرة الفراولة رمز مدينة مدريد — تبنّاه أتلتيكو.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Real Madrid", "Atlético Madrid", "Villarreal", "Osasuna"],
      fact: "The bear and strawberry tree is Madrid's symbol — adopted by Atleti.",
    },
  },
  {
    id: "vis-wf-psg-badge", visual: { kind: "badge", ref: "psg" },
    category: "clubs",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["مارسيليا", "ليون", "باريس سان جيرمان", "ليل"],
      fact: "برج إيفل يتوسط الدرع مع المهدم الملكي — وُلد الشعار بهذه الصورة 1974.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Marseille", "Lyon", "Paris Saint-Germain", "Lille"],
      fact: "The Eiffel Tower crowns the crest with the royal cradle since 1974.",
    },
  },
  {
    id: "vis-wf-hilal-badge", visual: { kind: "badge", ref: "hilal" },
    category: "clubs",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["النصر", "الهلال", "الاتحاد", "الأهلي السعودي"],
      fact: "«زعيم آسيا» — الأكثر تتويجًا ببطولة أبطال آسيا في التاريخ.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Al Nassr", "Al Hilal", "Al Ittihad", "Al Ahli Saudi"],
      fact: "'The Asian Leader' — record AFC Champions League winners.",
    },
  },
  {
    id: "vis-wf-ahly-badge", visual: { kind: "badge", ref: "ahly" },
    category: "clubs",
    difficulty: "medium",
    answer: 2,
    ar: {
      q: "أي نادٍ يحمل هذا الشعار؟",
      options: ["الزمالك", "بيراميدز", "الأهلي", "المصري"],
      fact: "النسر الملكي يتوّج درع «نادي القرن» في أفريقيا حسب تصويت 2000.",
    },
    en: {
      q: "Which club bears this crest?",
      options: ["Zamalek", "Pyramids", "Al Ahly", "Al Masry"],
      fact: "The royal eagle crowns Africa's Club of the Century.",
    },
  },

  // ——— أطقم الأندية (6) ———
  {
    id: "vis-wf-real-kit", visual: { kind: "kit", ref: "real-kit" },
    category: "clubs",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["ريال مدريد", "برشلونة", "أتلتيكو مدريد", "سيلتا فيغو"],
      fact: "الأبيض الملكي منذ 1902 — القميص الأشهر في تاريخ كرة القدم.",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Real Madrid", "Barcelona", "Atlético Madrid", "Celta Vigo"],
      fact: "All-white royal kit since 1902 — football's most famous shirt.",
    },
  },
  {
    id: "vis-wf-city-kit", visual: { kind: "kit", ref: "city-kit" },
    category: "clubs",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["مانشستر سيتي", "مانشستر يونايتد", "إيفرتون", "ليدز يونايتد"],
      fact: "السماوي التقليدي رافقه أول لقب دوري إنجليزي عام 1937.",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Manchester City", "Manchester United", "Everton", "Leeds United"],
      fact: "Sky blue has dressed City since before their first 1937 league title.",
    },
  },
  {
    id: "vis-wf-liverpool-kit", visual: { kind: "kit", ref: "liverpool-kit" },
    category: "clubs",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["آرسنال", "ليفربول", "نوتنغهام فورست", "أستون فيلا"],
      fact: "الأحمر الكامل أصبح رسميًا عام 1964 في عهد بيل شانكلي.",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Arsenal", "Liverpool", "Nottingham Forest", "Aston Villa"],
      fact: "All-red became official in 1964 under Bill Shankly.",
    },
  },
  {
    id: "vis-wf-inter-kit", visual: { kind: "kit", ref: "inter-kit" },
    category: "clubs",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["إنتر", "ميلان", "يوفنتوس", "روما"],
      fact: "النيرونزوري — الأزرق والأسود لم يتغيّرا منذ التأسيس عام 1908.",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Inter", "Milan", "Juventus", "Roma"],
      fact: "Nerazzurri — black and blue unchanged since 1908.",
    },
  },
  {
    id: "vis-wf-milan-kit", visual: { kind: "kit", ref: "milan-kit" },
    category: "clubs",
    difficulty: "medium",
    answer: 2,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["إنتر", "يوفنتوس", "ميلان", "لاتسيو"],
      fact: "«روسونيري» — الحمراء والسوداء اختيروا لتخويف الخصم كما تروي الحكاية.",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Inter", "Juventus", "Milan", "Lazio"],
      fact: "Rossoneri — red and black chosen, legend says, to strike fear.",
    },
  },
  {
    id: "vis-wf-juve-kit", visual: { kind: "kit", ref: "juve-kit" },
    category: "clubs",
    difficulty: "hard",
    answer: 1,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["نوتس كاونتي", "يوفنتوس", "أودينيزي", "تشيزينا"],
      fact: "الخطوط البيضاء والسوداء أُعيرت من نادي نوتس كاونتي الإنجليزي عام 1903!",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Notts County", "Juventus", "Udinese", "Cesena"],
      fact: "The zebra stripes were borrowed from England's Notts County in 1903!",
    },
  },

  // ——— أطقم المنتخبات (3) ———
  {
    id: "vis-wf-argentina-kit", visual: { kind: "kit", ref: "argentina-kit" },
    category: "worldcup",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["الأوروغواي", "البرازيل", "الأرجنتين", "كولومبيا"],
      fact: "الخطوط السماوية والبيضاء رافقت التاج الثالث في مونديال قطر 2022.",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Uruguay", "Brazil", "Argentina", "Colombia"],
      fact: "The sky-blue stripes lifted their third star in Qatar 2022.",
    },
  },
  {
    id: "vis-wf-brazil-kit", visual: { kind: "kit", ref: "brazil-kit" },
    category: "worldcup",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["الأرجنتين", "البرازيل", "الإكوادور", "تشيلي"],
      fact: "الأصفر «كاناريو» رسمي منذ 1954 بعد درس خيبة مونديال 1950.",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Argentina", "Brazil", "Ecuador", "Chile"],
      fact: "The canary yellow became official in 1954 after the 1950 heartbreak.",
    },
  },
  {
    id: "vis-wf-morocco-kit", visual: { kind: "kit", ref: "morocco-kit" },
    category: "worldcup",
    difficulty: "easy",
    answer: 3,
    ar: {
      q: "لمن ينتمي هذا الطقم؟",
      options: ["الجزائر", "تونس", "مصر", "المغرب"],
      fact: "أحمر العلم وأخضر النجمة — ألوان أسود الأطلس الدائمة عبر العصور.",
    },
    en: {
      q: "Whose kit is this?",
      options: ["Algeria", "Tunisia", "Egypt", "Morocco"],
      fact: "Flag red and star green — the Atlas Lions' timeless colors.",
    },
  },

  // ——— أعلام المنتخبات (10) ———
  {
    id: "vis-wf-france-flag", visual: { kind: "flag", ref: "france" },
    category: "worldcup",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["هولندا", "روسيا", "فرنسا", "إيطاليا"],
      fact: "الأزرق والأبيض والأحمر وُلد من الثورة الفرنسية عام 1789.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["Netherlands", "Russia", "France", "Italy"],
      fact: "Blue, white and red were born from the 1789 French Revolution.",
    },
  },
  {
    id: "vis-wf-germany-flag", visual: { kind: "flag", ref: "germany" },
    category: "worldcup",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["بلجيكا", "ألمانيا", "النمسا", "المجر"],
      fact: "الأسود والأحمر والذهبي ألوان الوحدة الألمانية منذ 1848.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["Belgium", "Germany", "Austria", "Hungary"],
      fact: "Black, red and gold — German unity colors since 1848.",
    },
  },
  {
    id: "vis-wf-spain-flag", visual: { kind: "flag", ref: "spain" },
    category: "worldcup",
    difficulty: "easy",
    answer: 3,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["المكسيك", "البرتغال", "الأرجنتين", "إسبانيا"],
      fact: "الأحمر والأصفر الأصليان منذ 1785 لتمييز سفن التاج على البحار.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["Mexico", "Portugal", "Argentina", "Spain"],
      fact: "Red and yellow date to 1785, chosen to spot royal ships at sea.",
    },
  },
  {
    id: "vis-wf-england-flag", visual: { kind: "flag", ref: "england" },
    category: "worldcup",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["المملكة المتحدة", "إنجلترا", "الدنمارك", "سويسرا"],
      fact: "صليب القديس جرجس أقدم من علم المملكة المتحدة نفسه بقرون.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["United Kingdom", "England", "Denmark", "Switzerland"],
      fact: "St George's cross predates the Union Jack by centuries.",
    },
  },
  {
    id: "vis-wf-argentina-flag", visual: { kind: "flag", ref: "argentina" },
    category: "worldcup",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["الأرجنتين", "أوروغواي", "تشيلي", "هندوراس"],
      fact: "شمس مايو الذهبية تتوسط العلم منذ 1818 — رمز الاستقلال.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["Argentina", "Uruguay", "Chile", "Honduras"],
      fact: "The golden Sun of May has centered the flag since 1818.",
    },
  },
  {
    id: "vis-wf-portugal-flag", visual: { kind: "flag", ref: "portugal" },
    category: "worldcup",
    difficulty: "medium",
    answer: 2,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["البرازيل", "إسبانيا", "البرتغال", "إيطاليا"],
      fact: "الأخضر والأحمر الرسميان منذ 1911 — الدرع يحمل دروع أفونسو الأول.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["Brazil", "Spain", "Portugal", "Italy"],
      fact: "Green and red became official in 1911 — the shield bears Afonso I's arms.",
    },
  },
  {
    id: "vis-wf-italy-flag", visual: { kind: "flag", ref: "italy" },
    category: "worldcup",
    difficulty: "easy",
    answer: 3,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["فرنسا", "أيرلندا", "المكسيك", "إيطاليا"],
      fact: "الأخضر والأبيض والأحمر وحدوا إيطاليا عموديًا منذ 1861.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["France", "Ireland", "Mexico", "Italy"],
      fact: "Green, white and red unified Italy vertically since 1861.",
    },
  },
  {
    id: "vis-wf-netherlands-flag", visual: { kind: "flag", ref: "netherlands" },
    category: "worldcup",
    difficulty: "medium",
    answer: 1,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["لوكسمبورغ", "هولندا", "روسيا", "فرنسا"],
      fact: "أقدم علم ثلاثي الألوان في العالم — البرتقالي صار أحمر في القرن السابع عشر.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["Luxembourg", "Netherlands", "Russia", "France"],
      fact: "The world's oldest tricolor — orange turned red in the 17th century.",
    },
  },
  {
    id: "vis-wf-croatia-flag", visual: { kind: "flag", ref: "croatia" },
    category: "worldcup",
    difficulty: "medium",
    answer: 3,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["سلوفاكيا", "صربيا", "سلوفينيا", "كرواتيا"],
      fact: "درع الشطرنج الأحمر والأبيض «شاخوفنيتسا» يتوسط العلم.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["Slovakia", "Serbia", "Slovenia", "Croatia"],
      fact: "The red-white checkerboard 'šahovnica' sits at the flag's heart.",
    },
  },
  {
    id: "vis-wf-uruguay-flag", visual: { kind: "flag", ref: "uruguay" },
    category: "worldcup",
    difficulty: "medium",
    answer: 2,
    ar: {
      q: "أي منتخب يمثله هذا العلم؟",
      options: ["الأرجنتين", "البرازيل", "أوروغواي", "باراغواي"],
      fact: "تسعة خطوط زرقاء لمناطق البلاد التسع — وشمس مايو في الزاوية.",
    },
    en: {
      q: "Which nation does this flag represent?",
      options: ["Argentina", "Brazil", "Uruguay", "Paraguay"],
      fact: "Nine blue stripes for nine regions — Sun of May in the corner.",
    },
  },
];
