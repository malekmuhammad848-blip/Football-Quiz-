/* ============================================================
 *  Question Bank — الموجة الثانية (50 سؤالًا)
 *  ============================================================ */

import type { Question } from "../domain/types";

export const QUESTIONS_WAVE_B: Question[] = [
  // ——— كأس العالم ———
  {
    id: "wb-2022-final-score", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "كم كانت نتيجة نهائي مونديال 2022 في الوقت الأصلي والإضافي؟", options: ["2-1", "3-2", "3-3", "2-2"], fact: "3-3 بعد الوقت الإضافي، ثم الأرجنتين فازت 4-2 بركلات الترجيح في نهائي خالد." },
    en: { q: "What was the 2022 World Cup final score after extra time?", options: ["2-1", "3-2", "3-3", "2-2"], fact: "3-3 after extra time; Argentina then won 4-2 on penalties in an epic final." },
  },
  {
    id: "wb-hat-trick-final", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "من ثاني لاعب يسجل ثلاثية في نهائي كأس العالم؟", options: ["بيليه", "كيليان مبابي", "جيوف هيرست", "رونالدو"], fact: "مبابي انضم لهيرست (1966) كوحيدهم اللذين سجلا ثلاثية نهائية — رغم الخسارة." },
    en: { q: "Who joined Geoff Hurst with a World Cup final hat-trick?", options: ["Pelé", "Kylian Mbappé", "Geoff Hurst", "Ronaldo"], fact: "Mbappé joined Hurst (1966) as the only final hat-trick scorers — in a losing cause." },
  },
  {
    id: "wb-2002-korea", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "ما إنجاز كوريا الجنوبية في مونديال 2002؟", options: ["أول آسيوي في نصف النهائي", "فازت بالمركز الثالث", "خرجت في ربع النهائي", "فازت بالمونديال"], fact: "هزمت إيطاليا وإسبانيا قبل أن تسقط أمام ألمانيا — مفاجأة القرن الآسيوية." },
    en: { q: "What did South Korea achieve at the 2002 World Cup?", options: ["First Asian semifinalist", "Third place", "Quarterfinal exit", "Won it"], fact: "They beat Italy and Spain before losing to Germany — Asia's greatest run." },
  },
  {
    id: "wb-1990-nil", category: "worldcup", difficulty: "hard", answer: 2,
    ar: { q: "من فاز بمونديال 1990 في إيطاليا؟", options: ["الأرجنتين", "البرازيل", "ألمانيا الغربية", "إنجلترا"], fact: "ألمانيا الغربية انتقدت من الأرجنتين بركلات الترجيح — نهائي قاسٍ وملؤه الطرد." },
    en: { q: "Who won Italia '90?", options: ["Argentina", "Brazil", "West Germany", "England"], fact: "West Germany beat Argentina on penalties in a brutal, ill-tempered final." },
  },
  {
    id: "wb-golden-glove", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "من فاز بالقفاز الذهبي في مونديال 2022؟", options: ["كورتوا", "إيميليانو مارتينيز", "بونو", "ليفريكوف"], fact: "«ديبو» مارتينيز تصدى لترجيح حاسمة في النهائي، وحصل على الجائزة." },
    en: { q: "Who won the Golden Glove at Qatar 2022?", options: ["Courtois", "Emiliano Martínez", "Bono", "Lloris"], fact: "'Dibu' Martínez made decisive penalty saves in the final to claim it." },
  },
  {
    id: "wb-young-player", category: "worldcup", difficulty: "hard", answer: 0,
    ar: { q: "من فاز بجائزة أفضل لاعب شاب في مونديال 2022؟", options: ["إنزو فيرنانديز", "جود بيلينغهام", "جاريل كينغ", "جامال موسيالا"], fact: "فيروسية إنزو في الوسط الأرجنتيني حصدت عليه الجائزة ثم انتقالًا ضخمًا لتشيلسي." },
    en: { q: "Who won Best Young Player at Qatar 2022?", options: ["Enzo Fernández", "Jude Bellingham", "Gavi", "Jamal Musiala"], fact: "Enzo's midfield mastery earned the award and a huge Chelsea move." },
  },
  {
    id: "wb-1978-host", category: "worldcup", difficulty: "medium", answer: 2,
    ar: { q: "من استضاف وفاز بمونديال 1978؟", options: ["البرازيل", "تشيلي", "الأرجنتين", "بيرو"], fact: "الأرجنتين فازت على أرضها وسط ظروف سياسية قاسية — ماريو كيمبيس نجم البطولة." },
    en: { q: "Who hosted and won the 1978 World Cup?", options: ["Brazil", "Chile", "Argentina", "Peru"], fact: "Argentina won at home amid political turmoil — Mario Kempes starred." },
  },
  {
    id: "wb-goal-count", category: "worldcup", difficulty: "hard", answer: 3,
    ar: { q: "كم هدفًا سُجل في مونديال 2022؟", options: ["150", "160", "170", "172"], fact: "172 هدفًا — أعلى رصيد في تاريخ المونديالات من ناحية الأهداف الكلية." },
    en: { q: "How many goals were scored at the 2022 World Cup?", options: ["150", "160", "170", "172"], fact: "172 goals — the highest-scoring World Cup ever." },
  },
  {
    id: "wb-hat-trick-wc-final-first", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "من أول من سجل ثلاثية في نهائي مونديال؟", options: ["بيليه", "جيوف هيرست", "جوست فونتين", "ساندور كوكس"], fact: "هيرست 1966 ضد ألمانيا — الثلاثية الوحيدة في نهائيات حتى مبابي 2022." },
    en: { q: "Who scored the first World Cup final hat-trick?", options: ["Pelé", "Geoff Hurst", "Just Fontaine", "Sándor Kocsis"], fact: "Hurst in 1966 vs West Germany — the only final treble until Mbappé 2022." },
  },
  {
    id: "wb-ronaldo-15", category: "worldcup", difficulty: "medium", answer: 2,
    ar: { q: "من سجل 15 هدفًا في مونديالات قبل كلوزه؟", options: ["بيليه", "جيرد مولر", "رونالدو البرازيلي", "جوست فونتين"], fact: "الظاهرة سجل 15 هدفًا في 3 مونديالات، ومولر 14 في نسختين." },
    en: { q: "Who scored 15 World Cup goals before Klose?", options: ["Pelé", "Gerd Müller", "Ronaldo (Brazil)", "Just Fontaine"], fact: "R9 netted 15 across three World Cups; Müller had 14 in just two." },
  },
  {
    id: "wb-13-goals", category: "worldcup", difficulty: "hard", answer: 0,
    ar: { q: "من سجل 13 هدفًا في نسخة مونديال واحدة؟", options: ["جوست فونتين", "ساندور كوكس", "إيرنوب وييلمس", "ليونيل ميسي"], fact: "فونتين الفرنسي سجل 13 في مونديال 1958 — رقم لم يُقترب منه في نسخة واحدة." },
    en: { q: "Who scored 13 goals in a single World Cup?", options: ["Just Fontaine", "Sándor Kocsis", "Eusébio", "Messi"], fact: "France's Fontaine hit 13 in 1958 — a single-tournament record untouched." },
  },
  {
    id: "wb-wc-trophy-name", category: "worldcup", difficulty: "medium", answer: 2,
    ar: { q: "ما اسم كأس العالم الحالية؟", options: ["كأس جول ريميه", "الكأس الذهبية", "كأس الفيفا للعالم", "كأس الانتصار"], fact: "كأس جول ريميه سُرقت 1983 ولم تُسترد؛ الكأس الحالية منذ 1974." },
    en: { q: "What's the current World Cup trophy called?", options: ["Jules Rimet Trophy", "The Golden Cup", "FIFA World Cup Trophy", "Victory Cup"], fact: "The Jules Rimet was stolen in 1983, never recovered; current one dates to 1974." },
  },
  {
    id: "wb-2006-zidane", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "لماذا طُرد زيدان في نهائي 2006؟", options: ["عناف على الحكم", "رأسية على ماتيريازي", "إساءة للاعب", "شجار مع المدرب"], fact: "رأسه على صدر ماتيريازي بعد إهانة أخته — آخر لمسة له في كرة القدم." },
    en: { q: "Why was Zidane sent off in the 2006 final?", options: ["Striking the ref", "Headbutt on Materazzi", "Abusing a player", "Fighting the coach"], fact: "The headbutt on Materazzi's chest — his last-ever touch in football." },
  },
  {
    id: "wb-young-scorer", category: "worldcup", difficulty: "hard", answer: 0,
    ar: { q: "من أصغر هداف في تاريخ كأس العالم؟", options: ["بيليه (17 عامًا)", "مبابي (19)", "مايكل أوين (18)", "دييجو مارادونا"], fact: "بيليه سجل في نهائي 1958 وهو بعمر 17 عامًا و239 يومًا." },
    en: { q: "Who is the youngest World Cup goalscorer?", options: ["Pelé (17)", "Mbappé (19)", "Michael Owen (18)", "Maradona"], fact: "Pelé scored in the 1958 final aged 17 years 239 days." },
  },

  // ——— تاريخ وقوانين ———
  {
    id: "wb-ballout", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "ما حجم قطر كرة القدم القانوني؟", options: ["68-70 سم", "68-70 سم (الرقم الرسمي)", "65-67 سم", "72-74 سم"], fact: "68-70 سم حولية ووزن 410-450 غرامًا — قياس موحد عالميًا." },
    en: { q: "What's the legal circumference of a football?", options: ["66-68cm", "68-70cm", "70-72cm", "72-74cm"], fact: "68-70cm around and 410-450g — standardized worldwide." },
  },
  {
    id: "wb-linesman-flag", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "كم عدد الحكام المساعدين في مباراة رسمية؟", options: ["واحد", "ثلاثة", "اثنان", "أربعة"], fact: "حكم مساعد لكل خط + الرابع الإداري، وضمن VAR حكم إضافي في الغرفة." },
    en: { q: "How many assistant referees officiate a match?", options: ["One", "Three", "Two", "Four"], fact: "One per touchline plus a fourth official, and VAR staff behind the scenes." },
  },
  {
    id: "wb-backpass-rule", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "متى صدر قانون منع التقاط الحارس للتمريرة الخلفية؟", options: ["1990", "1992", "1995", "2000"], fact: "1992 بعد مونديال ممل إيطاليا 90 مليء بالتمريرات الخلفية الكاسرة للحماس." },
    en: { q: "When was the back-pass rule introduced?", options: ["1990", "1992", "1995", "2000"], fact: "1992, after the tedious keep-ball tactics of Italia '90." },
  },
  {
    id: "wb-penalty-intro", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "متى أُدخلت ركلة الجزاء للقوانين؟", options: ["1891", "1902", "1891 وظهرت أولًا بالتجربة", "1910"], fact: "اقترحها حكم الأيرلندي ويليام مكرم 1890 وطبقت رسميًا 1891." },
    en: { q: "When was the penalty kick added to the Laws?", options: ["1891", "1902", "Trialed 1890, official 1891", "1910"], fact: "Goalkeeper-turned-referee William McCrum proposed it; adopted in 1891." },
  },
  {
    id: "wb-first-radio", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "متى بُثّت أول مباراة كرة قدم إذاعيًا؟", options: ["1923", "1927", "1930", "1935"], fact: "أرسنال ضد شيفيلد يونايتد 1927 — بداية عصر التعليق الرياضي." },
    en: { q: "When was football first broadcast on radio?", options: ["1923", "1927", "1930", "1935"], fact: "Arsenal vs Sheffield United in 1927 launched sports commentary." },
  },
  {
    id: "wb-offside-flag", category: "history", difficulty: "medium", answer: 0,
    ar: { q: "هل يُحتسب اللاعب في حالة تسلل من رمية تماس؟", options: ["لا — لا تسلل من رمية", "نعم دائمًا", "فقط نصف الملعب", "تعود للجنة"], fact: "القانون 11 يستثني رميات التماس وركلات المرمى والمرمى من التسلل." },
    en: { q: "Can you be offside directly from a throw-in?", options: ["No — no offside from throw-ins", "Yes, always", "Only in the half", "Committee decides"], fact: "Law 11 exempts throw-ins, goal kicks and corners from offside." },
  },
  {
    id: "wb-golden-goal", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "ما قانون «الهدف الذهبي» الذي ألغي؟", options: ["أعلى تسجيل يفوز", "الهدف الأول في الإضافي ينهي", "ركلات مباشرة", "لا شيء"], fact: "ألغي 2004 بعد إثباته أنه يجعل الفرق متحفظة بشدة في الوقت الإضافي." },
    en: { q: "What was the abolished 'Golden Goal' rule?", options: ["Highest scorer wins", "First goal in ET ends it", "Direct penalties", "Nothing"], fact: "Abolished 2004 after proving to make teams overly cautious in extra time." },
  },
  {
    id: "wb-shield-comm", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "ما اسم مجتمع كرة القدم الدولي المسؤول عن القوانين؟", options: ["الفيفا فقط", "IFAB", "UEFA", "اللجنة الأولمبية"], fact: "IFAB — المجلس الدولي — تأسس 1886، أقدم هيئة تنظيمية لكرة القدم." },
    en: { q: "Which body governs the Laws of the Game?", options: ["FIFA only", "IFAB", "UEFA", "IOC"], fact: "IFAB, founded 1886, is football's oldest rule-making body." },
  },
  {
    id: "wb-first-tv", category: "history", difficulty: "hard", answer: 0,
    ar: { q: "متى بُثّت أول مباراة تلفزيونية مباشرة؟", options: ["1937", "1948", "1954", "1960"], fact: "أرسنال ضد أرسنال الاحتياطي 1937 في لندن — تجربة BBC الأولى." },
    en: { q: "When was the first live televised football match?", options: ["1937", "1948", "1954", "1960"], fact: "Arsenal vs Arsenal Reserves in 1937 — BBC's pioneering broadcast." },
  },
  {
    id: "wb-boots-evolution", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "متى ظهرت أول حذاء كرة قدم بمسامير قابلة للتبديل؟", options: ["1920", "1940", "1950s", "1970"], fact: "أدار لاعبو الخمسينيات ثورة تغيير المسامير حسب حالة الأرض." },
    en: { q: "When did football boots get interchangeable studs?", options: ["1920", "1940", "1950s", "1970"], fact: "1950s players revolutionized adapting studs to pitch conditions." },
  },

  // ——— الأندية ———
  {
    id: "wb-atletico-nick", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "ما لقب أتلتيكو مدريد؟", options: ["الملوك", "الروخي بلانكوس (الكولتشونيروس)", "الصقور", "الفرسان"], fact: "الكولتشونيروس — «أصحاب المراتب» — من أصل ملابس الفراش المستخدمة في الهوائي." },
    en: { q: "What's Atlético Madrid's nickname?", options: ["The Kings", "The Colchoneros (Mattress Makers)", "The Falcons", "The Knights"], fact: "Colchoneros comes from old mattress fabric stripes matching the kit." },
  },
  {
    id: "wb-inter-records", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "من فاز بخماسية تاريخية في الدوري الإيطالي؟", options: ["يوفنتوس", "ميلان", "إنتر ميلان 2010", "روما"], fact: "إنتر 2010: سكوديتو + كأس إيطاليا + أبطال أوروبا تحت مورينيو." },
    en: { q: "Which Italian side won a historic treble in 2010?", options: ["Juventus", "Milan", "Inter Milan", "Roma"], fact: "Inter's 2010: Scudetto + Coppa Italia + Champions League under Mourinho." },
  },
  {
    id: "wb-boca-river", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "ما اسم ديربي بوكا جونيورز وريفر بليت؟", options: ["السوبر كلاسيكو", "الكلاسيكو", "الديربي الكبير", "الكلاسيك الرسمي"], fact: "Superclásico الأرجنتيني من أشهر وأعنف الديربيات عالميًا." },
    en: { q: "What's Boca Juniors vs River Plate called?", options: ["The Superclásico", "El Clásico", "The Big Derby", "The Classic"], fact: "Argentina's Superclásico ranks among football's fiercest rivalries." },
  },
  {
    id: "wb-flamengo-crowd", category: "clubs", difficulty: "hard", answer: 1,
    ar: { q: "من أكثر أندية أمريكا الجنوبية جماهيرية؟", options: ["بوكا جونيورز", "فلامنغو البرازيلي", "ريفر بليت", "كورينثيانز"], fact: "فلامنغو يتجاوز جماهيره 40 مليون مشجع — الأكبر في البرازيل." },
    en: { q: "Which South American club has the biggest fanbase?", options: ["Boca Juniors", "Flamengo", "River Plate", "Corinthians"], fact: "Flamengo claims 40+ million supporters — Brazil's largest." },
  },
  {
    id: "wb-celtic-rangers", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "ما اسم ديربي سيلتيك ورينجرز في اسكتلندا؟", options: ["الديربي القديم", "معركة الأبطال", "الديربي القديم للمطاعم (Old Firm)", "ديربي غلاسكو"], fact: "Old Firm — من أقدم وأكثر الديربيات إثارة للجدل في العالم." },
    en: { q: "What's Celtic vs Rangers called?", options: ["The Ancient Derby", "Champions' Battle", "The Old Firm", "Glasgow Derby"], fact: "The Old Firm — among football's oldest and most charged rivalries." },
  },
  {
    id: "wb-benfica-eagle", category: "clubs", difficulty: "hard", answer: 0,
    ar: { q: "ما رمز بنفيكا الشهير؟", options: ["النسر", "الأسد", "الصقر", "التنين"], fact: "النسر «فيكتور» يطير في ملعب اللاز قبل المباريات — تقليد عمره عقود." },
    en: { q: "What is Benfica's famous mascot?", options: ["The Eagle", "The Lion", "The Falcon", "The Dragon"], fact: "Vitória the eagle soars over Estádio da Luz pre-match — a decades-old tradition." },
  },
  {
    id: "wb-porto-dragon", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "ما لقب نادي بورتو البرتغالي؟", options: ["النسر", "الأزرق", "التنين", "الملوك"], fact: "التنين من رمز مدينة بورتو التاريخي، وملعبهم «دي دراغاو» (التنين)." },
    en: { q: "What is FC Porto's nickname?", options: ["The Eagle", "The Blue", "The Dragons", "The Kings"], fact: "The Dragon, from Porto's heraldic symbol — their stadium is Estádio do Dragão." },
  },
  {
    id: "wb-chelsea-bilion", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من أول نادٍ إنجليزي يُشترى بمليارات الدولارات؟", options: ["مان سيتي", "تشيلسي (أبراموفيتش 2003)", "ليفربول (FSG)", "أرسنال"], fact: "شراء أبراموفيتش 2003 فتح عصر المليارديرات في كرة إنجلترا." },
    en: { q: "Which English club first sold to a billionaire?", options: ["Man City", "Chelsea (Abramovich 2003)", "Liverpool (FSG)", "Arsenal"], fact: "Abramovich's 2003 takeover kicked off England's billionaire era." },
  },
  {
    id: "wb-city-takeover", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "من سنة تحول مانشستر سيتي لقوة عالمية؟", options: ["2006", "2007", "2008", "2009"], fact: "شراء أبو ظبي 2008 وانتقالات ضخمة جعلت السيتي أحد أندية النخبة." },
    en: { q: "When did Man City become a global force?", options: ["2006", "2007", "2008", "2009"], fact: "The 2008 Abu Dhabi takeover and record signings rebuilt City into elite status." },
  },
  {
    id: "wb-rome-derby", category: "clubs", difficulty: "hard", answer: 0,
    ar: { q: "ما اسم ديربي روما بين لاتسيو وروما؟", options: ["ديربي ديلا كابيتالي", "الكلاسيكو", "الديربي الشمالي", "معركة روما"], fact: "Derby della Capitale من أشد ديربيات إيطاليا حرارة وجماهيرية." },
    en: { q: "What's Lazio vs Roma called?", options: ["Derby della Capitale", "El Clásico", "Northern Derby", "Battle of Rome"], fact: "The Capital Derby — among Italy's most heated fixtures." },
  },
  {
    id: "wb-mls-growth", category: "clubs", difficulty: "hard", answer: 2,
    ar: { q: "أي نادٍ أمريكي صار عالميًا بعد انتقال ميسي؟", options: ["نيويورك سيتي", "لوس أنجلوس FC", "إنتر ميامي", "سياتل ساوندرز"], fact: "انضمام ميسي 2023 ضاعف قيمة النادي وجذب اهتمامًا عالميًا هائلًا." },
    en: { q: "Which US club went global after signing Messi?", options: ["New York City FC", "LAFC", "Inter Miami", "Seattle Sounders"], fact: "Messi's 2023 arrival doubled the club's valuation and global reach." },
  },
  {
    id: "wb-jeonbuk-asia", category: "clubs", difficulty: "hard", answer: 1,
    ar: { q: "من القوة الآسيوية الكورية الكبرى؟", options: ["سول FC", "جيونبوك هيونداي", "أوراوا ريدز", "كاشيما أنتلرز"], fact: "جيونبوك فاز بدوري كوريا أكثر من 9 مرات وبأبطال آسيا مرتين." },
    en: { q: "Which Korean club is Asia's modern powerhouse?", options: ["FC Seoul", "Jeonbuk Hyundai", "Urawa Reds", "Kashima Antlers"], fact: "Jeonbuk won 9+ K-League titles and two AFC Champions Leagues." },
  },
  {
    id: "wb-fener-galata", category: "clubs", difficulty: "hard", answer: 0,
    ar: { q: "ما اسم الديربي التركي بين فنربخشة وغلطة سراي؟", options: ["ديربي القارة العابرة", "الكلاسيكو التركي", "معركة البوسفور", "ديربي الأناضول"], fact: "Intercontinental Derby — الفرق على جانبي قارتين تلتقيان في ملعب واحد." },
    en: { q: "What's Fenerbahçe vs Galatasaray called?", options: ["The Intercontinental Derby", "The Turkish Clásico", "Bosphorus Battle", "Anatolia Derby"], fact: "Two clubs on two continents — football's only intercontinental derby." },
  },

  // ——— لاعبون ومدربون ———
  {
    id: "wb-bellingham-rise", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من نجم ريال مدريد الصاعد منذ 2023؟", options: ["فينيسيوس", "جود بيلينغهام", "كامافينغا", "رودريغو"], fact: "انتقل من دورتموند بـ103 مليون يورو وسجل أهدافًا حاسمة فورًا." },
    en: { q: "Who is Real Madrid's rising star since 2023?", options: ["Vinícius", "Jude Bellingham", "Camavinga", "Rodrygo"], fact: "The €103M Dortmund arrival scored decisive goals from day one." },
  },
  {
    id: "wb-kdb-assists", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من صانع الألعاب الأشهر في البريميرليج الحديث؟", options: ["كيفين دي بروين", "برونو فرنانديز", "مارتين أوديغارد", "جيمس ماديسون"], fact: "دي بروين كسر رقم هنري بـ20 صناعة هدفًا في موسم واحد 2020." },
    en: { q: "Who is the Premier League's modern playmaking king?", options: ["Kevin De Bruyne", "Bruno Fernandes", "Martin Ødegaard", "James Maddison"], fact: "KDB broke Henry's record with 20 assists in the 2020 season." },
  },
  {
    id: "wb-van-dijk-fee", category: "players", difficulty: "medium", answer: 2,
    ar: { q: "من أغلى مدافع في التاريخ (حتى 2018)؟", options: ["ماركينيوس", "روبن دياز", "فيرجيل فان دايك", "هاري ماغواير"], fact: "ليفربول دفع 75 مليون يورو لساوثهامبتون 2018 — تحول دفاعهم جذريًا." },
    en: { q: "Who was the world's most expensive defender (until 2018)?", options: ["Marquinhos", "Rúben Dias", "Virgil van Dijk", "Harry Maguire"], fact: "Liverpool's €75M for Van Dijk in 2018 transformed their defense." },
  },
  {
    id: "wb-mbappe-speed", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من أسرع لاعب في تاريخ كأس العالم؟", options: ["أداما تراوري", "كيليان مبابي (38 كم/س)", "غاريث بيل", "أوسيمين"], fact: "مبابي وصل 38 كم/س في مونديال 2022 — أسرع سرعة مسجلة." },
    en: { q: "Who recorded the fastest World Cup sprint?", options: ["Adama Traoré", "Kylian Mbappé (38 km/h)", "Gareth Bale", "Victor Osimhen"], fact: "Mbappé hit 38 km/h at Qatar 2022 — the fastest recorded sprint." },
  },
  {
    id: "wb-de-bruyne-vision", category: "players", difficulty: "hard", answer: 2,
    ar: { q: "من مدرب فاز بدوري بلا خسارة في إسبانيا وإنجلترا وألمانيا؟", options: ["مورينيو", "أنشيلوتي", "غوارديولا", "كلوب"], fact: "غوارديولا حقق مواسم بلا هزيمة مع البرشا (2009-10) وبايرن (2014) ومان سيتي (2017)." },
    en: { q: "Who managed unbeaten league seasons in Spain, Germany and England?", options: ["Mourinho", "Ancelotti", "Guardiola", "Klopp"], fact: "Pep did it with Barça (2009-10), Bayern (2014) and Man City (2017)." },
  },
  {
    id: "wb-salah-record", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "كم هدفًا سجل صلاح في موسمه الأول بالبريميرليج؟", options: ["32", "28", "30", "25"], fact: "32 هدفًا في 36 مباراة — رقم قياسي لموسم أول في عصر 38 مباراة." },
    en: { q: "How many goals did Salah score in his debut PL season?", options: ["32", "28", "30", "25"], fact: "32 in 36 games — a 38-game-era record for a debut season." },
  },
  {
    id: "wb-mourinho-trophies", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من مدرب فاز بدوري أبطال أوروبا مع نادين مختلفين؟", options: ["غوارديولا", "مورينيو (بورتو وإنتر)", "فريجي", "بيسلي"], fact: "بورتو 2004 وإنتر 2010 — إنجاز فريد بموارد محدودة." },
    en: { q: "Who won the Champions League with two different clubs?", options: ["Guardiola", "Mourinho (Porto & Inter)", "Ferguson", "Paisley"], fact: "Porto 2004 and Inter 2010 — unique achievements with modest resources." },
  },
  {
    id: "wb-rice-transfer", category: "players", difficulty: "hard", answer: 2,
    ar: { q: "من أغلى انتقال في تاريخ إنجلترا للاعب إنجليزي؟", options: ["ماغواير", "ستيرلينغ", "ديكلان رايس لأرسنال", "غريليش"], fact: "أرسنال دفع 105 مليون جنيه لغربهام 2023 — رقم إنجليزي قياسي." },
    en: { q: "Who is the most expensive English player bought by an English club?", options: ["Maguire", "Sterling", "Declan Rice to Arsenal", "Grealish"], fact: "Arsenal's £105M for Rice in 2023 set the English record." },
  },
  {
    id: "wb-lewandowski-5", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من سجل 5 أهداف في 9 دقائق؟", options: ["ميسي", "روبرت ليفاندوفسكي", "كريستيانو", "هالاند"], fact: "ليفا سجل خماسية ضد فولفسبورغ 2015 بعد دخوله بديلًا في الشوط الثاني." },
    en: { q: "Who scored 5 goals in 9 minutes?", options: ["Messi", "Robert Lewandowski", "Ronaldo", "Haaland"], fact: "Lewandowski's five-goal burst vs Wolfsburg 2015 after coming on at halftime." },
  },
  {
    id: "wb-neymar-skills", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "من أكثر لاعب brasileiro تحقيقًا للألقاب الأوروبية؟", options: ["رونالدينيو", "كاكا", "نيمار", "ريفيلينو"], fact: "نيمار فاز بالأبطال مع البرشا (2015) وحقق ألقابًا محلية عديدة." },
    en: { q: "Which Brazilian won the Champions League with Barcelona?", options: ["Ronaldinho", "Kaká", "Neymar", "Rivelino"], fact: "Neymar's 2015 CL win came alongside Messi and Suárez in MSN era." },
  },
  {
    id: "wb-ancelotti-clubs", category: "players", difficulty: "hard", answer: 0,
    ar: { q: "من المدرب الوحيد الذي فاز بالدوري في الخمس دوريات الكبرى؟", options: ["كارلو أنشيلوتي", "مورينيو", "غوارديولا", "كونتي"], fact: "أنشيلوتي فاز بالدوري في إيطاليا وإنجلترا وفرنسا وألمانيا وإسبانيا." },
    en: { q: "Who is the only manager to win the league in all top-5 leagues?", options: ["Carlo Ancelotti", "Mourinho", "Guardiola", "Conte"], fact: "Ancelotti won titles in Italy, England, France, Germany, and Spain." },
  },
  {
    id: "wb-vinicius-rise", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من نجم ريال مدريد البرازيلي اللامع؟", options: ["رودريغو", "فينيسيوس جونيور", "رودريغو غيرمينو", "إيدر ميليتاو"], fact: "فينيسيوس سجل هدف نهائي الأبطال 2022 ضد ليفربول." },
    en: { q: "Who is Real Madrid's Brazilian superstar winger?", options: ["Rodrygo", "Vinícius Júnior", "Rodinei", "Éder Militão"], fact: "Vini scored the 2022 CL final winner vs Liverpool." },
  },
  {
    id: "wb-gavi-young", category: "players", difficulty: "hard", answer: 2,
    ar: { q: "من فاز بجائزة كوبا (أفضل لاعب شاب) أول مرة؟", options: ["بيلينغهام", "موسيالا", "غافي", "بيدري"], fact: "غافي فاز 2022 بعمر 18 — خليفة تشافي وإنييستا في قلب برشلونة." },
    en: { q: "Who won the first-ever Kopa Trophy (best young player)?", options: ["Bellingham", "Musiala", "Gavi", "Pedri"], fact: "Gavi won in 2022 aged 18 — Barça's next midfield icon." },
  },
  {
    id: "wb-klopp-legacy", category: "players", difficulty: "hard", answer: 1,
    ar: { q: "من مدرب فاز بكأس العالم للأندية مع ليفربول؟", options: ["بينيتيز", "كلوب 2019", "دالجليش", "روجرز"], fact: "كلوب فاز بأبطال أوروبا 2019 ثم كأس العالم للأندية 2019 بعدها مباشرة." },
    en: { q: "Who won the Club World Cup with Liverpool?", options: ["Benítez", "Klopp (2019)", "Dalglish", "Rodgers"], fact: "Klopp's 2019 CL win was followed immediately by the Club World Cup." },
  },
  {
    id: "wb-haaland-nation", category: "players", difficulty: "hard", answer: 0,
    ar: { q: "ما لقب هالاند في النرويج؟", options: ["الوحش الأبيض", "الروبوت", "الساحر", "الأرنب"], fact: "هالاند سجل 9 أهداف في مباراة واحدة مع منتخب الناشئين — رقم عالمي." },
    en: { q: "What did Haaland famously do for Norway U20?", options: ["Scored 9 in one match", "Won the U20 World Cup", "Broke speed records", "Never played"], fact: "Haaland's 9 goals in a single U20 World Cup match stunned the world." },
  },
  {
    id: "wb-ynwa-keeper", category: "players", difficulty: "hard", answer: 2,
    ar: { q: "من حارس ليفربول الشهير بلقب «الرجل الفولاذي»؟", options: ["أليكساندر ألبا", "ريما", "أليسون بيكر", "كايتور"], fact: "أليسون سجل هدفًا في الدقيقة 95 ضد ألباكس 2021 — حارس يسجل رأسية." },
    en: { q: "Which Liverpool keeper scored a last-minute header?", options: ["Becker", "Reina", "Alisson Becker", "Karius"], fact: "Alisson's 95th-minute header vs West Brom 2021 — a keeper's dream goal." },
  },

  // ——— أساطير ———
  {
    id: "wb-maradona-napoli", category: "legends", difficulty: "easy", answer: 1,
    ar: { q: "ماذا قدّم مارادونا لنابولي؟", options: ["دوري واحد", "دوريتان إيطاليتان أول مرة", "كأس أوروبا", "لا شيء"], fact: "نابولي الفقير الجنوبي فاز بدوري 1987 و1990 بفضل مارادونا وحده." },
    en: { q: "What did Maradona give Napoli?", options: ["One league title", "First two Serie A titles", "A European Cup", "Nothing"], fact: "Poor southern Napoli won Serie A in 1987 and 1990 on Maradona's back." },
  },
  {
    id: "wb-cruyff-barca", category: "legends", difficulty: "medium", answer: 0,
    ar: { q: "ماذا قدّم كرويف لبرشلونة كمدرب؟", options: ["أول كأس أوروبا + أكاديمية", "لا شيء", "دوري واحد فقط", "كأس ملك إسبانيا"], fact: "كرويف مدربًا 1988-1996: كأس أوروبا 1992 وأسس فلسفة لا ماسيا." },
    en: { q: "What did Cruyff give Barcelona as manager?", options: ["First European Cup + academy philosophy", "Nothing", "One league title", "A Copa del Rey"], fact: "Manager 1988-96: the 1992 European Cup and the La Masia DNA." },
  },
  {
    id: "wb-zidane-volley", category: "legends", difficulty: "medium", answer: 2,
    ar: { q: "في أي نهائي أبطال سجل زيدان واحدة من أجمل الأهداف؟", options: ["2000", "1998", "2002 ضد ليفركوزن", "2001"], fact: "مقصيته الشهيرة في نهائي 2002 ضد ليفركوزن — هدف لا يُنسى في التاريخ." },
    en: { q: "Which CL final featured Zidane's legendary volley?", options: ["2000", "1998", "2002 vs Leverkusen", "2001"], fact: "His 2002 volley vs Leverkusen — one of football's most replayed goals." },
  },
  {
    id: "wb-beckham-cross", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "ما المهارة الأشهر لديفيد بيكهام؟", options: ["المراوغة", "التمريرات والعرضيات المقوسة", "الرأسيات", "السرعة"], fact: "عرضيات بيكهام الدقيقة صنعت أهدافًا حاسمة لمان يونايتد وريال وإنجلترا." },
    en: { q: "What was David Beckham's signature skill?", options: ["Dribbling", "Curling crosses & free kicks", "Headers", "Pace"], fact: "His pinpoint crosses and free kicks defined an era at United, Real and England." },
  },
  {
    id: "wb-ronaldinho-smile", category: "legends", difficulty: "easy", answer: 0,
    ar: { q: "من اللاعب الذي «ابتسم وهو يرعب الدفاعات»؟", options: ["رونالدينيو", "روبنهو", "أدريانو", "باتيستوتا"], fact: "رونالدينيو أعاد البهجة لكرة القدم — الجمهور الإسباني صفق له بعد هدف ضد ريال." },
    en: { q: "Which player 'smiled while destroying defenses'?", options: ["Ronaldinho", "Robinho", "Adriano", "Batistuta"], fact: "Ronaldinho's joy was contagious — even Madrid fans applauded him at the Bernabéu." },
  },
  {
    id: "wb-maldini-one", category: "legends", difficulty: "medium", answer: 2,
    ar: { q: "كم مرة فاز باولو مالديني بدوري أبطال أوروبا؟", options: ["3", "4", "5", "6"], fact: "مالديني لعب 25 عامًا في ميلان وفاز بـ5 أبطال أوروبا — ولاء نادر." },
    en: { q: "How many Champions Leagues did Paolo Maldini win?", options: ["3", "4", "5", "6"], fact: "25 years at Milan with five European Cups — rare loyalty." },
  },
  {
    id: "wb-totti-roma", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "ما لقب فرانشيسكو توتي؟", options: ["الأمير الأزرق", "الابن الثامن لروما", "الملك", "الساحر"], fact: "توتي رفض أكبر الأندية ليبقى في روما طوال مسيرته — أسطورة الوفاء." },
    en: { q: "What is Francesco Totti's nickname?", options: ["The Blue Prince", "The Eighth King of Rome", "The Emperor", "The Wizard"], fact: "Totti rejected every superclub to stay Roman his whole career." },
  },
  {
    id: "wb-henry-arsenal", category: "legends", difficulty: "easy", answer: 2,
    ar: { q: "من هداف أرسنال التاريخي؟", options: ["إان رايت", "دنيس برغكامب", "تيري هنري", "روبين فان بيرسي"], fact: "هنري سجل 228 هدفًا لالأرسنال وقاد العصر الذهبي للنادي." },
    en: { q: "Who is Arsenal's all-time top scorer?", options: ["Ian Wright", "Dennis Bergkamp", "Thierry Henry", "Robin van Persie"], fact: "Henry's 228 Arsenal goals defined the club's golden era." },
  },
  {
    id: "wb-xavi-iniesta", category: "legends", difficulty: "easy", answer: 0,
    ar: { q: "ما الثنائي الذي هيمن على وسط البرشا وإسبانيا؟", options: ["تشافي وإينييستا", "بوسكيتس وراكيتيتش", "ميسي وسواريز", "بيكيه وبويول"], fact: "تشافي وإينييستا صنعا «تكيكيتاكا» التي فازت بكل شيء 2008-2012." },
    en: { q: "Which duo dominated Barcelona and Spain's midfield?", options: ["Xavi & Iniesta", "Busquets & Rakitić", "Messi & Suárez", "Piqué & Puyol"], fact: "Xavi-Iniesta powered the tiki-taka era that won everything 2008-2012." },
  },
  {
    id: "wb-cannavaro-ballon", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من آخر مدافع فاز بالكرة الذهبية؟", options: ["فيرجيل فان دايك", "فابيو كانافارو 2006", "سيرجيو راموس", "تيرغي ألكسندر"], fact: "كانافارو فاز 2006 بعد مونديال أسطوري مع إيطاليا — مدافع وحيد." },
    en: { q: "Who was the last defender to win the Ballon d'Or?", options: ["Virgil van Dijk", "Fabio Cannavaro (2006)", "Sergio Ramos", "Franz Beckenbauer"], fact: "Cannavaro's 2006 World Cup heroics earned the award — a defender's rarity." },
  },
  {
    id: "wb-bergkamp-touch", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "ما لقب دنيس برغكامب الهولندي؟", options: ["الرجل الجليدي", "الساحر", "الفنان", "اللورد"], fact: "برغكامب «الرجل الجليدي» — التحكم الأسطوري في الكرة واللمسات الساحرة." },
    en: { q: "What is Dennis Bergkamp's famous nickname?", options: ["The Iceman", "The Wizard", "The Artist", "The Lord"], fact: "The Iceman's first touch and artistic control defined Arsenal's beautiful game." },
  },
  {
    id: "wb-baggio-pony", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "ما لقب روبرتو باجيو الإيطالي؟", options: ["الحصان الأزرق", "الذيل المقدس (Divin Codino)", "الأمير", "الساحر"], fact: "باجيو «الذيل المقدس» — إيطاليا خسرت نهائي 1994 بركلته فوق العارضة." },
    en: { q: "What is Roberto Baggio's nickname?", options: ["The Blue Pony", "The Divine Ponytail", "The Prince", "The Wizard"], fact: "Baggio's missed 1994 final penalty became football's most iconic heartbreak." },
  },
  {
    id: "wb-zico-white", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "من هو «بيليه الأبيض» البرازيلي؟", options: ["زيكو", "سوكراتيس", "روميلو", "باولو سوزا"], fact: "زيكو نجم فلامنغو الثمانيني — خبير ركلات حرة ومخرج ألعاب." },
    en: { q: "Who is Brazil's 'White Pelé'?", options: ["Zico", "Sócrates", "Rummenigge", "Paulo Sousa"], fact: "Zico lit up 1980s Flamengo — free-kick maestro and midfield artist." },
  },
  {
    id: "wb-van-basten-volley", category: "legends", difficulty: "hard", answer: 2,
    ar: { q: "في أي بطولة سجل فان باستن هدفه الأسطوري من زاوية مستحيلة؟", options: ["كأس أوروبا", "المونديال", "يورو 1988", "الدوري الهولندي"], fact: "مقصيته من زاوية ضيقة في نهائي يورو 1988 ضد السويد — هدف القرن الأوروبي." },
    en: { q: "Which tournament featured Van Basten's impossible-angle volley?", options: ["European Cup", "World Cup", "Euro 1988", "Eredivisie"], fact: "His tight-angle volley vs USSR in the Euro 88 final — an all-time great." },
  },
  {
    id: "wb-ronaldinho-wc", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "مع من فاز رونالدينيو بكأس العالم؟", options: ["1994", "2002", "2006", "1998"], fact: "رونالدينيو كان جزءًا من الثلاثي الهجومي البرازيلي في مونديال 2002." },
    en: { q: "Which World Cup did Ronaldinho win?", options: ["1994", "2002", "2006", "1998"], fact: "Part of Brazil's 2002 attacking trident alongside Ronaldo and Rivaldo." },
  },

  // ——— الكرة العربية ———
  {
    id: "wb-salah-liverpool", category: "arab", difficulty: "easy", answer: 2,
    ar: { q: "كم مرة فاز صلاح بجائزة أفضل لاعب في أفريقيا؟", options: ["مرة", "مرتين", "ثلاث مرات", "أربع"], fact: "صلاح فاز بها 2017 و2018 و2023 — الأكثر أفريقية تحقيقًا حديثًا." },
    en: { q: "How many times has Salah won African Player of the Year?", options: ["Once", "Twice", "Three times", "Four"], fact: "Salah won in 2017, 2018 and 2023 — Africa's modern standard." },
  },
  {
    id: "wb-mahrez-algeria", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "من نجم الجزائر صاحب الكرات الذهبية الإنجليزية؟", options: ["رياض محرز", "إسحاق بلفوديل", "هلال العربي", "بليل عمري"], fact: "محرز فاز بالبريميرليج مع ليستر (2016) والسيتي (2019، 2021، 2023)." },
    en: { q: "Which Algerian won the Premier League with two clubs?", options: ["Riyad Mahrez", "Sofiane Feghouli", "Hilal Soudani", "Yacine Brahimi"], fact: "Mahrez won with Leicester (2016) and Man City (2019, 2021, 2023)." },
  },
  {
    id: "wb-zidane-origin", category: "arab", difficulty: "easy", answer: 0,
    ar: { q: "من أي أصول ينحدر زين الدين زيدان؟", options: ["جزائري (قبائلي)", "مغربي", "تونسي", "مصري"], fact: "زيدان وُلد في مرسيليا لعائلة جزائرية من منطقة القبائل." },
    en: { q: "What are Zinedine Zidane's roots?", options: ["Algerian (Kabyle)", "Moroccan", "Tunisian", "Egyptian"], fact: "Born in Marseille to Kabyle Algerian parents." },
  },
  {
    id: "wb-achraf-speed", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "من fastest لاعب عربي؟", options: ["يوسف الإن نسيري", "أشرف حكيمي", "منير الحمداوي", "زكرياء لبيض"], fact: "حكيمي من أسرع الأظهرة عالميًا — سرعته تقترب من 36 كم/س." },
    en: { q: "Who is the fastest Arab player?", options: ["Youssef En-Nesyri", "Achraf Hakimi", "Munir El Haddadi", "Zakaria Labyad"], fact: "Hakimi's sprint speed approaches 36 km/h — among the world's fastest full-backs." },
  },
  {
    id: "wb-hakimi-mbappe", category: "arab", difficulty: "medium", answer: 2,
    ar: { q: "مع أي نادٍ فاز أشرف حكيمي بدوري الأبطال؟", options: ["ريال مدريد", "دورتموند", "إن لم يفز بعد", "باريس سان جيرمان"], fact: "حكيمي فاز بالأبطال مع ريال مدريد 2018 كاحتياطي شاب." },
    en: { q: "Which club did Achraf Hakimi win the Champions League with?", options: ["Real Madrid", "Dortmund", "None yet", "PSG"], fact: "Hakimi won the 2018 CL as a young Real Madrid full-back." },
  },
  {
    id: "wb-en-nesyri-jump", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "من اللاعب المغربي صاحب أعلى قفزة في مونديال؟", options: ["يوسف الإن نسيري", "أمين عدلي", "صوفيان أمرابط", "يوسف عيتي"], fact: "الإن نسيري قفز 2.78 متر لرأسية ضد البرتغال 2022 — أعلى قفزة مسجلة." },
    en: { q: "Which Moroccan recorded the World Cup's highest header jump?", options: ["Youssef En-Nesyri", "Amine Adli", "Sofyan Amrabat", "Youssef Aït"], fact: "En-Nesyri leaped 2.78m to head vs Portugal 2022 — the highest ever measured." },
  },
  {
    id: "wb-egypt-abotrika", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "ما لقب محمد أبوتريكة المصري؟", options: ["المعلم", "الحاوي", "الجنرال", "الفنان"], fact: "أبوتريكة «الحاوي» — أسطورة الأهلي ومن أشهر صنّاع الألعاب أفريقيًا." },
    en: { q: "What is Mohamed Aboutrika's nickname?", options: ["The Teacher", "The Magician", "The General", "The Artist"], fact: "Aboutrika, 'The Magician' — Al Ahly's icon and Africa's finest playmaker." },
  },
  {
    id: "wb-ahly-record", category: "arab", difficulty: "medium", answer: 2,
    ar: { q: "كم مرة فاز الأهلي بكأس العالم للأندية؟", options: ["مرتين", "ثلاث", "لم يفز (ببرونزيات)", "أربع"], fact: "الأهلي حصل على برونزيات عالمية 2006 و2020 و2021 — أعلى إنجاز أفريقي." },
    en: { q: "How many Club World Cup medals has Al Ahly won?", options: ["Two gold", "Three gold", "Bronze medals (2006, 2020, 2021)", "Four"], fact: "Al Ahly's three bronzes remain Africa's best Club World Cup finishes." },
  },
  {
    id: "wb-hilal-nasser", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "ما الكلاسيكو السعودي الأشهر؟", options: ["الهلال والنصر", "الاتحاد والأهلي", "الاتحاد والهلال", "الشباب والنصر"], fact: "ديربي الرياض بين الهلال والنصر من أقدم وأشهر مواجهات آسيا." },
    en: { q: "What's Saudi Arabia's most famous rivalry?", options: ["Al-Hilal vs Al-Nassr", "Al-Ittihad vs Al-Ahli", "Al-Ittihad vs Al-Hilal", "Al-Shabab vs Al-Nassr"], fact: "The Riyadh derby between Hilal and Nassr ranks among Asia's fiercest." },
  },
  {
    id: "wb-benzema-jeddah", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "من نجم الكرة الذهبية الذي انتقل للسعودية؟", options: ["رونالدو (النصر)", "كريم بنزيما (الاتحاد)", "ميسي", "ساديو ماني"], fact: "بنزيما حامل الكرة الذهبية 2022 اختار الاتحاد الجددي بعد نجاحه الأوروبي." },
    en: { q: "Which Ballon d'Or winner moved to Saudi Arabia?", options: ["Ronaldo (Al-Nassr)", "Karim Benzema (Al-Ittihad)", "Messi", "Sadio Mané"], fact: "The 2022 Ballon d'Or winner joined Al-Ittihad after his Madrid glory." },
  },
  {
    id: "wb-cristiano-nassr", category: "arab", difficulty: "easy", answer: 2,
    ar: { q: "مع أي نادٍ سعودي انضم كريستيانو رونالدو؟", options: ["الهلال", "الاتحاد", "النصر", "الأهلي"], fact: "انتقاله 2023 فتح باب النجوم العالميين للدوري السعودي." },
    en: { q: "Which Saudi club did Cristiano Ronaldo join?", options: ["Al-Hilal", "Al-Ittihad", "Al-Nassr", "Al-Ahli"], fact: "His 2023 arrival opened the Saudi league's global star era." },
  },
  {
    id: "wb-neom-project", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "كم لقبًا آسيويًا للهلال؟", options: ["ثلاثة", "أربعة", "خمسة", "اثنان"], fact: "الهلال فاز بأبطال آسيا 4 مرات — القائد الآسيوي بالألقاب." },
    en: { q: "How many AFC Champions League titles does Al-Hilal hold?", options: ["Three", "Four", "Five", "Two"], fact: "Al-Hilal's four Asian crowns make them Asia's most decorated club." },
  },
  {
    id: "wb-wydad-ultras", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "ما اسم جماهير الوداد المغربي الشهيرة؟", options: ["ألترا وينرز 05", "الخضر", "الصقور الحمراء", "النسر الأحمر"], fact: "Winners 05 من أقوى الجماهير أفريقيًا — أجواء ملعب محمد الخامس أسطورية." },
    en: { q: "What is Wydad Casablanca's famous ultras group?", options: ["Winners 05", "The Greens", "Red Falcons", "Red Eagle"], fact: "Winners 05 — Africa's most vocal support, filling Stade Mohammed V." },
  },
  {
    id: "wb-esperance-blood", category: "arab", difficulty: "hard", answer: 2,
    ar: { q: "ما لقب الترجي التونسي؟", options: ["النسور", "الدموي", "المخLov (المخلاف الذهبي)", "الأصفر"], fact: "«المخلاف الدموي والذهبي» — ألوان الترجي المميزة في أفريقيا." },
    en: { q: "What is Espérance Tunis's nickname?", options: ["The Eagles", "The Blood", "Blood & Gold", "The Yellow"], fact: "'Blood and Gold' — Espérance's iconic colors across Africa." },
  },
];

/** الموجة الثانية تُدمج بنفس النمط */
