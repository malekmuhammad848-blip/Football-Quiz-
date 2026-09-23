/* ============================================================
 *  Question Bank — الموجة الثالثة (50 سؤالًا)
 *  ============================================================ */

import type { Question } from "../domain/types";

export const QUESTIONS_WAVE_C: Question[] = [
  // ——— كأس العالم ———
  {
    id: "wc3-1966-england", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "من استضاف مونديال 1966 وفاز به؟", options: ["البرازيل", "إنجلترا", "ألمانيا", "الأرجنتين"], fact: "إنجلترا فازت على أرضها 4-2 ضد ألمانيا الغربية في نهائي تاريخي بالوقت الإضافي." },
    en: { q: "Who hosted and won the 1966 World Cup?", options: ["Brazil", "England", "West Germany", "Argentina"], fact: "England won 4-2 vs West Germany at home after extra time." },
  },
  {
    id: "wc3-1982-brazil", category: "worldcup", difficulty: "hard", answer: 0,
    ar: { q: "أي منتخب يُعد الأجمل بلا لقب في تاريخ المونديال؟", options: ["البرازيل 1982", "هولندا 1974", "المجر 1954", "البرتغال 1966"], fact: "برازيل 82 لعبوا الكرة الأجمل — سيليسو وزيكو وسوكراتيس وخسروا أمام إيطاليا 3-2." },
    en: { q: "Which is football's greatest team that never won the World Cup?", options: ["Brazil 1982", "Netherlands 1974", "Hungary 1954", "Portugal 1966"], fact: "Brazil '82 played the beautiful game — Sócrates, Zico, Falcão — then lost 3-2 to Italy." },
  },
  {
    id: "wc3-penalty-shootout", category: "worldcup", difficulty: "medium", answer: 2,
    ar: { q: "أول نهائي مونديال يُحسم بركلات الترجيح؟", options: ["1986", "1990", "1994", "1998"], fact: "البرازيل فازت على إيطاليا 3-2 بالترجيح 1994 — باجيو أضاع الأخيرة." },
    en: { q: "Which World Cup final was first decided on penalties?", options: ["1986", "1990", "1994", "1998"], fact: "Brazil beat Italy 3-2 on penalties in 1994 — Baggio skied the last." },
  },
  {
    id: "wc3-romario-94", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "من هداف مونديال 1994؟", options: ["روبرتو باجيو", "روماريو", "هريستو ستيتشكوف", "كيني دالغليش"], fact: "روماريو وستيتشكوف تعادلا بخمسة أهداف، لكن روماريو أخذ الحذاء الذهبي." },
    en: { q: "Who starred at USA '94?", options: ["Roberto Baggio", "Romário", "Hristo Stoichkov", "Kenny Dalglish"], fact: "Romário and Stoichkov tied on 5 goals; Romário took the Golden Ball." },
  },
  {
    id: "wc3-zidane-final-98", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "كم هدفًا سجل زيدان في نهائي مونديال 1998؟", options: ["هدفان برأسيتين", "هدف واحد", "ثلاثية", "لم يسجل"], fact: "رأسيتان من ركنيتين — فرنسا 3-0 أمام البرازيل الحاملة للقب." },
    en: { q: "How many goals did Zidane score in the 1998 final?", options: ["Two headers", "One", "A hat-trick", "None"], fact: "Two corners, two headers — France 3-0 over defending champions Brazil." },
  },
  {
    id: "wc3-asian-hosts", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "من استضاف مونديال 2002؟", options: ["اليابان فقط", "كوريا فقط", "كوريا واليابان معًا", "الصين"], fact: "أول مونديال في آسيا وأول مونديال يستضيفه بلدان معًا." },
    en: { q: "Who hosted the 2002 World Cup?", options: ["Japan only", "South Korea only", "South Korea & Japan jointly", "China"], fact: "Asia's first World Cup and the first co-hosted by two nations." },
  },
  {
    id: "wc3-messi-golden-ball", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "كم مرة فاز ميسي بالكرة الذهبية لأفضل لاعب في المونديال؟", options: ["مرة (2014)", "مرتين (2014 و2022)", "ثلاث مرات", "لم يفز"], fact: "2014 كأفضل لاعب رغم الخسارة، و2022 مع اللقب — الوحيد بالجائزة مرتين." },
    en: { q: "How many World Cup Golden Balls has Messi won?", options: ["One (2014)", "Two (2014, 2022)", "Three", "None"], fact: "2014 despite losing, 2022 with the title — the only two-time winner." },
  },
  {
    id: "wc3-2026-format", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "كم منتخبًا سيشارك في مونديال 2026؟", options: ["48", "32", "40", "36"], fact: "48 منتخبًا لأول مرة — توسعة تاريخية تضاعف الفرص الأفريقية والآسيوية." },
    en: { q: "How many teams will play at the 2026 World Cup?", options: ["48", "32", "40", "36"], fact: "48 teams for the first time — a historic expansion for Africa and Asia." },
  },
  {
    id: "wc3-hurst-hattrick", category: "worldcup", difficulty: "hard", answer: 2,
    ar: { q: "كم من الزمن استغرق هيرست لتسجيل ثلاثية النهائي 1966؟", options: ["كامل المباراة", "الشوط الثاني فقط", "الوقت الإضافي شمل هدفًا جدليًا", "الشوط الأول"], fact: "هدفه الثالث جاء في الدقيقة 120 ورفع النتيجة 4-2 وسط 97 ألف متفرج في ويمبلي." },
    en: { q: "When did Hurst complete his 1966 final hat-trick?", options: ["Regulation time", "Second half only", "In extra time (120th min)", "First half"], fact: "His third came in the 120th minute to make it 4-2 before 97,000 at Wembley." },
  },
  {
    id: "wc3-refs-wc", category: "worldcup", difficulty: "hard", answer: 0,
    ar: { q: "من الحكم الإيطالي الشهير الذي أدار نهائي مونديال 2002؟", options: ["بييرلويجي كولينا", "ماركوس ميرك", "هوارد ويب", "ألي مبنج"], fact: "كولينا الأصلع الأيقوني — أستاذ التحكيم العالمي ونجم نهائي البرازيل وألمانيا." },
    en: { q: "Which iconic Italian referee officiated the 2002 final?", options: ["Pierluigi Collina", "Markus Merk", "Howard Webb", "Ali Bin Nasser"], fact: "The bald icon himself — Collina refereed Brazil vs Germany in Yokohama." },
  },

  // ——— تاريخ وقوانين ———
  {
    id: "wc3-offside-def", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "متى يكون اللاعب «متجاوزًا» خط الدفاع؟", options: ["أمام الكرة", "عند تمريرته قبل آخر مدافع", "دائرة المرمى", "خط المرمى"], fact: "التسلل لحظة التمرير لا لحظة الاستلام — فرق دقيقة تغير القرار." },
    en: { q: "When is a player considered offside?", options: ["Ahead of the ball", "At the moment the pass is played", "In the box", "On the goal line"], fact: "Offside is judged at the pass, not the reception — the finest of margins." },
  },
  {
    id: "wc3-gk-gloves", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "متى بدأ حراس المرمى باستخدام القفازات؟", options: ["1880", "1920", "1940s", "1970"], fact: "قفازات الحارس لم تُعتد رسميًا حتى السبعينيات — قبلها قبض باليدين العاريتين." },
    en: { q: "When did goalkeepers start wearing gloves?", options: ["1880", "1920", "1940s", "1970"], fact: "Keeper gloves weren't standard until the 1970s — bare hands before." },
  },
  {
    id: "wc3-shootout-order", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "كم ركلة جزاء أساسية تُنفذ لكل فريق في الترجيح؟", options: ["3", "5", "4", "6"], fact: "خمس ركلات متبادلة لكل فريق، ثم الموت المفاجئ إن تعادلوا." },
    en: { q: "How many penalty kicks per team in a shootout?", options: ["3", "5", "4", "6"], fact: "Five alternating kicks each, then sudden death if level." },
  },
  {
    id: "wc3-fifa-founded", category: "history", difficulty: "medium", answer: 0,
    ar: { q: "متى تأسست الفيفا؟", options: ["1904", "1919", "1930", "1886"], fact: "الفيفا تأسست بباريس 1904 بسبع دول أوروبية — نمت لـ211 عضوًا اليوم." },
    en: { q: "When was FIFA founded?", options: ["1904", "1919", "1930", "1886"], fact: "FIFA formed in Paris 1904 with seven European members — now 211." },
  },
  {
    id: "wc3-first-wc-venue", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "أين أقيم أول كأس عالم 1930؟", options: ["البرازيل", "إيطاليا", "أوروغواي", "فرنسا"], fact: "أوروغواي استضافت وفازت — 13 منتخبًا فقط شاركوا في النسخة الأولى." },
    en: { q: "Where was the first World Cup held in 1930?", options: ["Brazil", "Italy", "Uruguay", "France"], fact: "Uruguay hosted and won — just 13 teams entered the first edition." },
  },
  {
    id: "wc3-throw-in-rule", category: "history", difficulty: "medium", answer: 0,
    ar: { q: "ما شرط الرمية الصحيحة؟", options: ["كلتا اليدتين فوق الرأس", "يد واحدة", "أي طريقة", "القدم على الخط"], fact: "كلتا اليدتين خلف الرأس وعلى الأرض كاملة — مخالفه تعطي رمية للخصم." },
    en: { q: "What makes a throw-in legal?", options: ["Both hands over the head", "One hand", "Any way", "Foot on the line"], fact: "Both hands behind the head, feet on the ground — or it goes to the opponent." },
  },
  {
    id: "wc3-yellow-origin", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "متى ظهرت البطاقات الصفراء والحمراء؟", options: ["1966", "1970", "1978", "1986"], fact: "ألهمها إشارات المرور بعد إلغاء ملعب 1966 — طبقت أول مرة بالمونديال 1970." },
    en: { q: "When were yellow and red cards introduced?", options: ["1966", "1970", "1978", "1986"], fact: "Inspired by traffic lights after 1966 confusion; debuted at Mexico 70." },
  },
  {
    id: "wc3-corner-invention", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "متى أُدخلت الركلة الركنية؟", options: ["1863", "1872", "1873", "1890"], fact: "الركنية جاءت 1873 كتعديل على قانون التسلل الأولي." },
    en: { q: "When were corner kicks introduced?", options: ["1863", "1872", "1873", "1890"], fact: "Corners arrived in 1873, tweaking the original offside law." },
  },
  {
    id: "wc3-laws-count", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "كم قانونًا رسميًا لكرة القدم؟", options: ["15", "17", "19", "20"], fact: "17 قانونًا فقط تحكم اللعبة كلها — من التسديد إلى التسلل." },
    en: { q: "How many official Laws of the Game exist?", options: ["15", "17", "19", "20"], fact: "Just 17 laws govern all of football — from kick-offs to offside." },
  },
  {
    id: "wc3-shield-formation", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "أي تشكيل كان شائعًا في بدايات كرة القدم الحديثة؟", options: ["4-4-2", "4-3-3", "2-3-5 (الهرمي)", "3-5-2"], fact: "2-3-5 «الهرم الكلاسيكي» ساد حتى السبعينيات قبل تشكيلات الدفاع الحديثة." },
    en: { q: "Which formation dominated early modern football?", options: ["4-4-2", "4-3-3", "2-3-5 (the pyramid)", "3-5-2"], fact: "The 2-3-5 pyramid ruled until the 1970s' defensive revolution." },
  },

  // ——— الأندية ———
  {
    id: "wc3-juventus-stripes", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من أين جاءت خطوط يوفنتوس البيضاء والسوداء؟", options: ["من إيطاليا", "من نوتس كاونتي الإنجليزي", "من مدينة تورينو", "من رئيس النادي"], fact: "يوفنتوس استلهمت خطوطها من قمصان نوتس كاونتي الإنجليزي عند تأسيسها." },
    en: { q: "Where did Juventus's black & white stripes come from?", options: ["Italian flag", "England's Notts County", "Turin's colors", "The chairman"], fact: "Juventus borrowed the stripes from English club Notts County." },
  },
  {
    id: "wc3-milan-count", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "كم مرة فاز ميلان بدوري أبطال أوروبا؟", options: ["5", "6", "7", "8"], fact: "ميلان ثاني أكثر النوادي تحقيقًا للأبطال بسبعة ألقاب بعد ريال مدريد." },
    en: { q: "How many European Cups has AC Milan won?", options: ["5", "6", "7", "8"], fact: "Milan's seven titles rank second only to Real Madrid." },
  },
  {
    id: "wc3-bayern-legend", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "من أسطورة بايرن ميونخ التاريخية؟", options: ["فرانتس بكنباور", "جيرد مولر فقط", "كل من بكنباور ومولر وماير", "فيليب لام"], fact: "الثلاثي الذهبي: بكنباور ومولر وسيب ماير — بايرن السبعينيات." },
    en: { q: "Who anchors Bayern Munich's golden era?", options: ["Franz Beckenbauer", "Gerd Müller alone", "Beckenbauer, Müller & Maier", "Philipp Lahm"], fact: "The golden trio: Beckenbauer, Müller and Sepp Maier — 1970s Bayern." },
  },
  {
    id: "wc3-barcelona-6", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "أي نادٍ حقق «السداسية» (6 ألقاب في سنة)؟", options: ["ريال مدريد", "برشلونة 2009", "بايرن 2020", "مان سيتي"], fact: "برشلونة 2009 بغوارديولا فازت بكل شيء: دوري، كأس، أبطال، سوبر إسباني وأوروبي وعالمي." },
    en: { q: "Which club won the 'Sextuple' (6 trophies in a year)?", options: ["Real Madrid", "Barcelona 2009", "Bayern 2020", "Man City"], fact: "Pep's Barça 2009 swept: league, cup, CL, both super cups and the Club World Cup." },
  },
  {
    id: "wc3-american-owners", category: "clubs", difficulty: "hard", answer: 2,
    ar: { q: "من يملك ليفربول حاليًا؟", options: ["رومان أبراموفيتش", "الشيخ منصور", "فينويش سبورتس (FSG)", "الإمارات"], fact: "FSG الأمريكية اشترت ليفربول 2010 وأعادته لقمة أوروبا." },
    en: { q: "Who owns Liverpool FC?", options: ["Roman Abramovich", "Sheikh Mansour", "Fenway Sports Group", "Emirates"], fact: "America's FSG bought Liverpool in 2010 and restored their European crown." },
  },
  {
    id: "wc3-napoli-record", category: "clubs", difficulty: "hard", answer: 1,
    ar: { q: "من فاز بالدوري الإيطالي 2023 بعد 33 عامًا؟", options: ["ميلان", "نابولي", "إنتر", "لاتسيو"], fact: "نابولي عاد للقب بعد 33 سنة من عصر مارادونا — حزن وفرح مدينة كاملة." },
    en: { q: "Who won Serie A 2023 after 33 years?", options: ["Milan", "Napoli", "Inter", "Lazio"], fact: "Napoli's first title since Maradona's era — 33 years of waiting ended." },
  },
  {
    id: "wc3-atletico-simeone", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "من مدرب أتلتيكو مدريد الأطول خدمة؟", options: ["دييغو سيميوني", "أنتونيو كونتي", "كارلو أنشيلوتي", "زيدان"], fact: "سيميوني يدرب الأتلتيكو منذ 2011 — أكثر من عقد واحد من الكولتشونيروس." },
    en: { q: "Who is Atlético Madrid's longest-serving manager?", options: ["Diego Simeone", "Antonio Conte", "Carlo Ancelotti", "Zidane"], fact: "Simeone has led Atlético since 2011 — over a decade of Cholo football." },
  },
  {
    id: "wc3-sevilla-europa", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من ملك الدوري الأوروبي؟", options: ["إنتر", "إشبيلية", "تشيلسي", "أتلتيكو"], fact: "إشبيلية فازت باليوروبا ليج 7 مرات — رقم لم يقترب منه أحد." },
    en: { q: "Who owns the Europa League?", options: ["Inter", "Sevilla", "Chelsea", "Atlético"], fact: "Sevilla's seven Europa League titles — untouchable record." },
  },
  {
    id: "wc3-ny-team", category: "clubs", difficulty: "hard", answer: 2,
    ar: { q: "أي نادٍ برازيلي يُلقَّب بـ«الأدميرال»؟", options: ["فلامنغو", "بالميراس", "فاسكو دا غاما", "غريميو"], fact: "فاسكو دا غاما «O Almirante» — النادي الشعبي التاريخي في ريو دي جانيرو." },
    en: { q: "Which Brazilian club is nicknamed 'The Admiral'?", options: ["Flamengo", "Palmeiras", "Vasco da Gama", "Grêmio"], fact: "Vasco da Gama — 'O Almirante' — Rio's traditional giant." },
  },
  {
    id: "wc3-argentina-derby", category: "clubs", difficulty: "hard", answer: 0,
    ar: { q: "من فاز بأكبر عدد من السوبر كلاسيكو الأرجنتيني؟", options: ["بوكا جونيورز", "ريفر بليت", "تعادل تاريخي", "إنديبندينتي"], fact: "بوكا يتقدم بفارق بسيط في المواجهات — لكن الإحصائيات تقترب دائمًا." },
    en: { q: "Who leads the Superclásico head-to-head?", options: ["Boca Juniors", "River Plate", "Historically even", "Independiente"], fact: "Boca edges the record, but River always keeps it close." },
  },
  {
    id: "wc3-liga-record", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من الأكثر تحقيقًا للدوري الإسباني؟", options: ["برشلونة", "ريال مدريد", "أتلتيكو", "أتلتيك بلباو"], fact: "ريال مدريد يتقدم بـ35+ لقبًا مقابل 27+ للبرشا — قمة المنافسة." },
    en: { q: "Who has won the most La Liga titles?", options: ["Barcelona", "Real Madrid", "Atlético", "Athletic Bilbao"], fact: "Real's 35+ titles lead Barcelona's 27+ — Spain's eternal race." },
  },
  {
    id: "wc3-premier-owners", category: "clubs", difficulty: "hard", answer: 2,
    ar: { q: "من يملك مانشستر يونايتد حاليًا؟", options: ["الشيخ منصور", "FSG", "عائلة غليزر", "تود بوهلي"], fact: "عائلة غليزر الأمريكية اشترت النادي 2005 وسط احتجاجات جماهيرية كبيرة." },
    en: { q: "Who owns Manchester United?", options: ["Sheikh Mansour", "FSG", "The Glazers", "Todd Boehly"], fact: "The American Glazer family took over in 2005 amid fan protests." },
  },
  {
    id: "wc3-chelsea-boehly", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "من اشترى تشيلسي بعد أبراموفيتش؟", options: ["تود بوهلي (كونسورتيوم أمريكي)", "الشيخ منصور", "قطر", "FSG"], fact: "بوهلي وكونسورتيوم Clearlake اشترى تشيلسي 2022 بـ4.25 مليار جنيه." },
    en: { q: "Who bought Chelsea after Abramovich?", options: ["Todd Boehly's consortium", "Sheikh Mansour", "Qatar", "FSG"], fact: "Boehly and Clearlake paid £4.25B for Chelsea in 2022." },
  },
  {
    id: "wc3-brazil-serie", category: "clubs", difficulty: "hard", answer: 1,
    ar: { q: "من أكثر أندية البرازيل تحقيقًا للدوري؟", options: ["فلامنغو", "بالميراس", "ساو باولو", "سانتوس"], fact: "بالميراس تجاوز فلامنغو بعد لقبي 2022 و2023 المتتاليين." },
    en: { q: "Which club has won the most Brazilian titles?", options: ["Flamengo", "Palmeiras", "São Paulo", "Santos"], fact: "Palmeiras edged ahead with back-to-back titles in 2022 and 2023." },
  },

  // ——— لاعبون ومدربون ———
  {
    id: "wc3-messi-copa", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "كم كوبا أمريكا فاز بها ميسي؟", options: ["اثنتان (2021، 2024)", "واحدة", "ثلاث", "صفر"], fact: "ميسي فاز بكوبا أمريكا 2021 (أول لقب دولي) ثم 2024 ككابتن." },
    en: { q: "How many Copa América titles has Messi won?", options: ["Two (2021, 2024)", "One", "Three", "None"], fact: "Messi lifted the Copa in 2021 — his first senior international title — and again in 2024." },
  },
  {
    id: "wc3-ronaldo-goals", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من أول لاعب يسجل 900 هدف رسمي؟", options: ["ميسي", "كريستيانو رونالدو", "بيليه", "روماليو"], fact: "كريستيانو بلغ 900 هدف رسمي 2024 — رقم يبدو معصومًا." },
    en: { q: "Who first reached 900 official career goals?", options: ["Messi", "Cristiano Ronaldo", "Pelé", "Romário"], fact: "CR7 hit 900 official goals in 2024 — a seemingly untouchable mark." },
  },
  {
    id: "wc3-kane-england", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "من هداف إنجلترا التاريخي؟", options: ["واين روني", "بوبي تشارلتون", "هاري كين", "مايكل أوين"], fact: "كين تجاوز روني برصيد 68+ هدفًا دوليًا وبدأ الحرق للرقم أكثر." },
    en: { q: "Who is England's all-time top scorer?", options: ["Wayne Rooney", "Bobby Charlton", "Harry Kane", "Michael Owen"], fact: "Kane passed Rooney with 68+ international goals — and counting." },
  },
  {
    id: "wc3-kylian-worldcup", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "كم هدفًا سجل مبابي في نهائيات مونديال 2018 و2022؟", options: ["12 (4+8)", "10", "9", "14"], fact: "4 أهداف في 2018 و8 في 2022 — 12 هدفًا قبل عامه الـ25." },
    en: { q: "How many goals did Mbappé score across the 2018 and 2022 World Cups?", options: ["12 (4+8)", "10", "9", "14"], fact: "Four in 2018 and eight in 2022 — 12 goals before turning 25." },
  },
  {
    id: "wc3-guardiola-tiki", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "ما الأسلوب الشهير لغوارديولا؟", options: ["الدفاع الصارم", "الاستحواذ والضغط العالي (تكيكيتاكا)", "الكرات الطويلة", "الهجمات المرتدة"], fact: "تكيكيتاكا: استحواذ ممل للخصم وضغط فوري عند فقدان الكرة." },
    en: { q: "What is Guardiola's signature style?", options: ["Low-block defense", "Possession & high press (tiki-taka)", "Long balls", "Counter-attacks"], fact: "Tiki-taka: suffocating possession plus instant pressing on turnovers." },
  },
  {
    id: "wc3-mourinho-bus", category: "players", difficulty: "medium", answer: 2,
    ar: { q: "ما اسم أسلوب مورينيو الدفاعي؟", options: ["البحث عن الأهداف", "الهجوم الشامل", "ركن الباص (park the bus)", "الكرة الدوارة"], fact: "«ركن الباص» — دفاع منخفض مكثف يغلق الملعب أمام الخصم." },
    en: { q: "What's Mourinho's defensive tactic nickname?", options: ["Goal hunting", "Total attack", "Parking the bus", "Tiki-taka"], fact: "'Parking the bus' — a compact low block that shuts the game down." },
  },
  {
    id: "wc3-benzema-ballon", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "في أي عام فاز بنزيما بالكرة الذهبية؟", options: ["2021", "2022", "2023", "2020"], fact: "2022 بعد موسم أسطوري: هداف أبطال أوروبا ولا ليغا مع ريال مدريد." },
    en: { q: "When did Benzema win the Ballon d'Or?", options: ["2021", "2022", "2023", "2020"], fact: "2022 — after a legendary season winning CL and La Liga with Real." },
  },
  {
    id: "wc3-debruyne-city", category: "players", difficulty: "hard", answer: 0,
    ar: { q: "كم صناعة هدف سجل دي بروين في موسم 2020؟", options: ["20", "18", "16", "22"], fact: "20 صناعة كسرت رقم تيري هنري القديم (20 تعادلًا سابقًا ثم تجاوزًا)." },
    en: { q: "How many assists did De Bruyne record in 2020?", options: ["20", "18", "16", "22"], fact: "20 assists equaled Henry's record with games to spare." },
  },
  {
    id: "wc3-simeone-style", category: "players", difficulty: "hard", answer: 1,
    ar: { q: "ما فلسفة سيميوني في الأتلتيكو؟", options: ["استحواذ كامل", "دفاع صلب وهجمة مرتدة قاتلة (الرجال)", "هجوم مفتوح", "تدوير شامل"], fact: "«الرجال» — تشكيلة 4-4-2 صارمة تحول الأتلتيكو لآلة تنافسية." },
    en: { q: "What is Simeone's Atlético philosophy?", options: ["Full possession", "Solid defense & lethal counters", "Open attacking play", "Total rotation"], fact: "His rigid 4-4-2 'garra charrúa' turned Atlético into a competitive machine." },
  },
  {
    id: "wc3-zidane-touch", category: "players", difficulty: "hard", answer: 2,
    ar: { q: "ما المهارة الفريدة لزيدان؟", options: ["السرعة", "الرأسيات فقط", "التحكم الروكتان (Roulette)", "المراوغة العادية"], fact: "«الروكيت» — دوران 360 درجة بلمسة واحدة أبهرت العالم." },
    en: { q: "What's Zidane's signature move?", options: ["Pace", "Headers only", "The Roulette (360 spin)", "Simple dribbles"], fact: "The Roulette — a 360° spin in one touch that left defenders dizzy." },
  },

  // ——— الأساطير ———
  {
    id: "wc3-pele-goals", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "كم هدفًا رسميًا وغير رسمي سجل بيليه في مسيرته؟", options: ["أقل من 700", "أكثر من 1200 في 1363 مباراة", "500 بالضبط", "900 فقط"], fact: "بيليه سجل 1281 هدفًا في 1363 مباراة بحساب معظم المصادر — رقم أسطوري." },
    en: { q: "How many goals did Pelé claim in his career?", options: ["Under 700", "1,281 in 1,363 matches", "Exactly 500", "Just 900"], fact: "Pelé's tally reaches 1,281 goals in 1,363 matches by most counts." },
  },
  {
    id: "wc3-cruyff-number", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "ما الرقم الذي اشتهر به كرويف في نهائي 1974؟", options: ["14", "10", "9", "7"], fact: "الرقم 14 — استخدمه بدل الـ10 التقليدي لتوقيع حركته الشهيرة بمنتصف الملعب." },
    en: { q: "Which number did Cruyff famously wear in the 1974 final?", options: ["14", "10", "9", "7"], fact: "Number 14 — chosen over the traditional 10, forever tied to his signature turn." },
  },
  {
    id: "wc3-eusebio-goals", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من أين جاء أوزيبيو؟", options: ["أنغولا", "موزمبيق", "البرازيل", "الكونغو"], fact: "أوزيبيو وُلد في موزمبيق ثم سطع نجمه مع بنفيكا البرتغالية." },
    en: { q: "Where was Eusébio born?", options: ["Angola", "Mozambique", "Brazil", "Congo"], fact: "Born in Mozambique, Eusébio became Benfica's immortal legend." },
  },
  {
    id: "wc3-ferenc-puskas", category: "legends", difficulty: "hard", answer: 2,
    ar: { q: "من قاد «المجر الذهبية» الخمسينيات؟", options: ["أوزيبيو", "ألفريدو دي ستيفانو", "فيرينك بوشكاش", "ساندور كوكس"], fact: "بوشكاش قاد المجر لفوز تاريخي 6-3 على إنجلترا في ويمبلي 1953." },
    en: { q: "Who led the 'Mighty Magyars' of the 1950s?", options: ["Eusébio", "Di Stéfano", "Ferenc Puskás", "Sándor Kocsis"], fact: "Puskás captained Hungary's 6-3 demolition of England at Wembley 1953." },
  },
  {
    id: "wc3-bobby-moore", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من قائد إنجلترا البطل 1966؟", options: ["بوبي تشارلتون", "بوبي مور", "جيوف هيرست", "غوردون بانكس"], fact: "بوبي مور رفع الكأس في ويمبلي — أشهر قائد إنجليزي في التاريخ." },
    en: { q: "Who captained England to the 1966 title?", options: ["Bobby Charlton", "Bobby Moore", "Geoff Hurst", "Gordon Banks"], fact: "Moore lifted the trophy at Wembley — England's most iconic captain." },
  },
  {
    id: "wc3-peter-shilton", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "من حارس إنجلترا في «هدف اليد الإلهية»؟", options: ["بيتر شيلتون", "غوردون بانكس", "ديفيد سيمان", "جو هارت"], fact: "شيلتون لم يرَ يد مارادونا — القفزة جاءت متأخرة على هدف القرن." },
    en: { q: "Who was England's keeper for the 'Hand of God'?", options: ["Peter Shilton", "Gordon Banks", "David Seaman", "Joe Hart"], fact: "Shilton never saw Maradona's fist — and was left for dead on the second goal." },
  },
  {
    id: "wc3-maradona-napoli-legacy", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "ماذا فعل نابولي بعد موت مارادونا؟", options: ["غيّر اسمه", "أعاد تسمية ملعبه باسمه", "وقف اللعب", "بنى تمثالًا فقط"], fact: "ملعب نابولي صار «ستاديو دييغو أرماندو مارادونا» — تكريم أبدّي." },
    en: { q: "How did Napoli honor Maradona after his death?", options: ["Renamed the club", "Renamed the stadium after him", "Stopped playing", "Just a statue"], fact: "Napoli's stadium became 'Stadio Diego Armando Maradona' — eternal tribute." },
  },
  {
    id: "wc3-van-basten-injury", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "لماذا اعتزل فان باستن مبكرًا؟", options: ["إصابة كاحل قاسية", "مشاكل مالية", "قرار شخصي", "لعب حتى الكبار"], fact: "اعتزل بعمر 30 بعد إصابات كاحل متكررة — خسارة كبرى للعبة الجميلة." },
    en: { q: "Why did Van Basten retire early?", options: ["Chronic ankle injuries", "Money issues", "Personal choice", "He played until 35"], fact: "Retired at just 30 after relentless ankle problems — football's great loss." },
  },
  {
    id: "wc3-gullit-dreads", category: "legends", difficulty: "hard", answer: 2,
    ar: { q: "من أول كابتن أسود يرفع كأسًا أوروبية كبرى؟", options: ["إدينغو", "مارك فيفي فوا", "رواد خوليت", "كلارنس سيدورف"], fact: "خوليت رفع يورو 1988 كقائد لهولندا — لحظة تاريخية للتنوع." },
    en: { q: "Who was the first Black captain to lift a major European trophy?", options: ["Drogba", "Viv Anderson", "Ruud Gullit", "Seedorf"], fact: "Gullit captained Holland to Euro 88 — a landmark moment for diversity." },
  },
  {
    id: "wc3-baggio-miss", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "ماذا حدث لركلة باجيو في نهائي 1994؟", options: ["سجلها", "طارتها فوق العارضة", "صدها الحارس", "لم تنفذ"], fact: "أضاع الركلة الأخيرة وعيناه دمعتا — لقطة الألم الأشهر في المونديال." },
    en: { q: "What happened to Baggio's 1994 final penalty?", options: ["He scored", "Skied it over the bar", "Keeper saved it", "Never taken"], fact: "The final kick sailed over — tears on the pitch became football's saddest image." },
  },

  // ——— الكرة العربية ———
  {
    id: "wc3-salah-egypt", category: "arab", difficulty: "easy", answer: 0,
    ar: { q: "من حمل راية مصر في مونديال 2018؟", options: ["محمد صلاح", "أسامة حسني", "أحمد حسام", "عمرو وردة"], fact: "صلاح عاد من إصابة الكتف ليلعب مونديال روسيا بتلبيسة على الكتف المصابة." },
    en: { q: "Who led Egypt at the 2018 World Cup?", options: ["Mohamed Salah", "Osama Housny", "Ahmed Hassan", "Amr Warda"], fact: "Salah returned from a shoulder injury to play in Russia with it strapped." },
  },
  {
    id: "wc3-mahrez-city", category: "arab", difficulty: "medium", answer: 2,
    ar: { q: "من سجل هدف الفوز الحاسم في دوري 2019 مع السيتي؟", options: ["أغويرو", "ستيرلينغ", "محرز ضد ليفربول", "سيلفا"], fact: "محرز سجل ضد ليفربول في اللحظات الحاسمة لضمان لقب السيتي." },
    en: { q: "Whose goal sealed Man City's 2019 title race?", options: ["Aguero", "Sterling", "Mahrez vs Liverpool", "Silva"], fact: "Mahrez's strike against Liverpool in the run-in proved decisive." },
  },
  {
    id: "wc3-hakimi-real", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "من أي أكاديمية خرج أشرف حكيمي؟", options: ["لا ماسيا", "أكاديمية ريال مدريد", "الاتحاد", "PSG"], fact: "حكيمي من أكاديمية ريال مدريد الشهيرة — صعد من الفئات للأول." },
    en: { q: "Which academy produced Achraf Hakimi?", options: ["La Masia", "Real Madrid academy", "Al-Ittihad", "PSG"], fact: "Hakimi rose through Real Madrid's famed academy system." },
  },
  {
    id: "wc3-zidane-real-cups", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "كم لقب أبطال أوروبا فاز بها زيدان كمدرب لريال مدريد؟", options: ["ثلاثة متتالية (2016-2018)", "اثنان", "واحد", "أربعة"], fact: "زيدان الوحيد الذي فاز بثلاثة أبطال متتالية في عصره — بعد أن فاز بها لاعبًا 2002." },
    en: { q: "How many Champions Leagues did Zidane win coaching Real Madrid?", options: ["Three straight (2016-18)", "Two", "One", "Four"], fact: "The only coach to win three straight in the modern era — after lifting it as a player in 2002." },
  },
  {
    id: "wc3-omen-goal", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من سجل أول هدف عربي وأفريقي في تاريخ كأس العالم؟", options: ["مصطفى زيتوني", "عبد الرحمن فوزي", "حسين صقال", "محمد الغامدي"], fact: "المصري عبد الرحمن فوزي سجل ثنائية ضد المجر 1934 — أول أهداف أفريقية بالمونديال." },
    en: { q: "Who scored the Arab world's first World Cup goal?", options: ["Mustafa Zitouni", "Abdelrahman Fawzi", "Hussein Sakal", "Mohammed Al-Ghamdi"], fact: "Egypt's Fawzi struck twice vs Hungary in 1934 — Africa's first WC goals." },
  },
  {
    id: "wc3-algeria-2019", category: "arab", difficulty: "medium", answer: 2,
    ar: { q: "من فاز بكأس أفريقيا 2019؟", options: ["السنغال", "تونس", "الجزائر", "نيجيريا"], fact: "الجزائر فازت بلقبها الثاني بعد هدف محرز الذهبي في النهائي ضد السنغال." },
    en: { q: "Who won AFCON 2019?", options: ["Senegal", "Tunisia", "Algeria", "Nigeria"], fact: "Algeria's second title came via Mahrez's stunning late free kick vs Senegal." },
  },
  {
    id: "wc3-morocco-2022-gk", category: "arab", difficulty: "easy", answer: 0,
    ar: { q: "من حارس المغرب البطل في مونديال 2022؟", options: ["ياسين بونو", "منير المحمدي", "أحمد رضا تاغناوتي", "زكرياء بوهلال"], fact: "بونو تصدى لركلات ترجيح حاسمة ضد إسبانيا — أفضل حارس بالبطولة." },
    en: { q: "Who was Morocco's heroic 2022 goalkeeper?", options: ["Yassine Bounou (Bono)", "Munir Mohamedi", "Ahmed Reda Tagnaouti", "Zakaria Bouloud"], fact: "Bono's shootout saves vs Spain powered Morocco's historic run." },
  },
  {
    id: "wc3-hilal-money", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "من من نجوم كرة القدم انضم للدوري السعودي 2023؟", options: ["ميسي", "نيمار", "صلاح", "هالاند"], fact: "نيمار انضم للهلال 2023 بصفقة قياسية — ضمن موجة النجوم للسعودية." },
    en: { q: "Which superstar joined the Saudi league in 2023?", options: ["Messi", "Neymar", "Salah", "Haaland"], fact: "Neymar's Al-Hilal move capped the Saudi league's star recruitment wave." },
  },
  {
    id: "wc3-egypt-legend", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من هو الهداف التاريخي للمنتخب المصري بلقب «الجنرال»؟", options: ["أحمد حسام ميدو", "حسام حسن", "محمد زيدان", "عمرو زكي"], fact: "حسام حسن سجل 69 هدفًا دوليًا — رقم أفريقي تاريخي كمهاجم." },
    en: { q: "Who is Egypt's all-time top scorer nicknamed 'The General'?", options: ["Ahmed Hassan", "Hossam Hassan", "Mohamed Zidan", "Amr Zaki"], fact: "Hossam Hassan's 69 international goals remain an African record." },
  },
  {
    id: "wc3-saudi-league", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "كم مرة فاز الهلال بالدوري السعودي؟", options: ["15", "18+", "12", "20"], fact: "الهلال تجاوز 18 لقبًا سعوديًا — الرقم الأكبر بين الأندية." },
    en: { q: "How many Saudi league titles has Al-Hilal won?", options: ["15", "18+", "12", "20"], fact: "Al-Hilal's 18+ domestic titles lead all Saudi clubs." },
  },
  {
    id: "wc3-qatar-club", category: "arab", difficulty: "hard", answer: 2,
    ar: { q: "أي نادٍ قطري فاز بدوري أبطال آسيا؟", options: ["الريان", "الدحيل", "السد (2011)", "العربي"], fact: "السد القطري فاز بأبطال آسيا 2011 — من أشهر إنجازات كرة قطر." },
    en: { q: "Which Qatari club won the AFC Champions League?", options: ["Al-Rayyan", "Al-Duhail", "Al-Sadd (2011)", "Al-Arabi"], fact: "Al-Sadd won the 2011 AFC Champions League — Qatar's finest continental hour." },
  },
  {
    id: "wc3-uae-club", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "أي نادٍ إماراتي فاز بدوري أبطال آسيا 2003؟", options: ["العين", "الوصل", "الجزيرة", "شباب الأهلي"], fact: "العين فاز بأول أبطال آسيا 2003 — أول نادٍ إماراتي يحقق الإنجاز." },
    en: { q: "Which UAE club won the 2003 AFC Champions League?", options: ["Al-Ain", "Al-Wasl", "Al-Jazira", "Shabab Al-Ahli"], fact: "Al-Ain's 2003 triumph made them the UAE's first Asian champions." },
  },
  {
    id: "wc3-bahrain-gulf", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "من فاز بكأس الخليج العربي (الخليجي) 25؟", options: ["البحرين", "العراق", "عمان", "الإمارات"], fact: "البحرين فازت بالخليجي 25 في 2019 — أول لقب لها في البطولة." },
    en: { q: "Who won the 25th Arabian Gulf Cup?", options: ["Bahrain", "Iraq", "Oman", "UAE"], fact: "Bahrain's 2019 Gulf Cup win was their first title in the competition." },
  },
  {
    id: "wc3-jordan-asia", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "ما أفضل إنجاز للأردن في كأس آسيا؟", options: ["البطولة", "نهائي 2024", "نصف نهائي", "ربع نهائي"], fact: "الأردن وصل نهائي كأس آسيا 2024 — قصة مدهشة لمنتخب صاعد." },
    en: { q: "What is Jordan's best Asian Cup result?", options: ["Champions", "Final 2024", "Semifinal", "Quarterfinal"], fact: "Jordan's 2024 Asian Cup final run stunned continental football." },
  },
  {
    id: "wc3-iraq-wc-goal", category: "arab", difficulty: "hard", answer: 2,
    ar: { q: "من سجل هدف العراق في مونديال 1986؟", options: ["حسين سعيد", "أحمد رضا", "أحمد راضي", "علي حسين"], fact: "أحمد راضي سجل ضد بلجيكا — الهدف العراقي الوحيد في تاريخ المونديالات." },
    en: { q: "Who scored Iraq's only World Cup goal?", options: ["Hussein Saeed", "Ahmed Radhi", "Ali Hussein", "Laith Hussein"], fact: "Ahmed Radhi's strike vs Belgium 1986 remains Iraq's lone World Cup goal." },
  },
  {
    id: "wc3-syria-qualify", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "هل تأهل منتخب سوريا لكأس العالم؟", options: ["نعم 2018", "قريب جدًا (تصفيات 2018 و2022)", "لا أبدًا", "نعم 2022"], fact: "سوريا كادت تتأهل 2018 و2022 — خسارات مؤلمة في اللحظة الأخيرة." },
    en: { q: "Has Syria ever qualified for the World Cup?", options: ["Yes, 2018", "Nearly (2018 & 2022 playoffs)", "Never close", "Yes, 2022"], fact: "Syria came agonizingly close in both 2018 and 2022 qualifying." },
  },
  {
    id: "wc3-lebanon-asia", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "هل شاركت لبنان في كأس آسيا؟", options: ["نعم 2000 و2023", "لا أبدًا", "نعم 2015", "نعم 2010"], fact: "لبنان شارك في كأس آسيا 2000 على أرضه و2023 بقطر." },
    en: { q: "Has Lebanon played in the Asian Cup?", options: ["Yes — 2000 (hosts) and 2023", "Never", "Yes — 2015", "Yes — 2010"], fact: "Lebanon hosted the 2000 Asian Cup and returned in 2023." },
  },
  {
    id: "wc3-libya-africa", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من فاز بكأس أفريقيا 1982؟", options: ["ليبيا (المضيفة)", "غانا", "نيجيريا", "الجزائر"], fact: "غانا فازت على لبيا بركلات الترجيح في نهائي استضافته طرابلس." },
    en: { q: "Who won AFCON 1982 hosted by Libya?", options: ["Libya", "Ghana", "Nigeria", "Algeria"], fact: "Ghana beat hosts Libya on penalties in Tripoli's final." },
  },
  {
    id: "wc3-sudan-africa", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "من فاز بكأس أفريقيا 1970؟", options: ["السودان (المضيف)", "مصر", "إثيوبيا", "غانا"], fact: "السودان فاز بالبطولة على أرضه — أول لقب أفريقي لمنتخب عربي." },
    en: { q: "Who won AFCON 1970?", options: ["Sudan (hosts)", "Egypt", "Ethiopia", "Ghana"], fact: "Sudan won at home — the Arab world's first African title." },
  },
];

/** الموجة الثالثة — اكتمل البنك الضخم */
