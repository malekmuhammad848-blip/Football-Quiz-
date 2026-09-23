/* ============================================================
 *  Question Bank — الموجة الرابعة (140 سؤالًا)
 *  أسئلة موثوقة ثنائية اللغة عبر كل الفئات
 *  ============================================================ */

import type { Question } from "../domain/types";

export const QUESTIONS_WAVE_D: Question[] = [
  // ——— التاريخ ———
  {
    id: "wd-fifa-founded", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "في أي مدينة تأسس الاتحاد الدولي لكرة القدم (الفيفا)؟", options: ["لندن", "مدريد", "باريس", "زيورخ"], fact: "تأسست الفيفا في باريس 1904 — ومن هنا حرفا FI من اسمها بالفرنسية." },
    en: { q: "In which city was FIFA founded?", options: ["London", "Madrid", "Paris", "Zurich"], fact: "FIFA was founded in Paris in 1904 — hence the French initials FI." },
  },
  {
    id: "wd-oldest-club", category: "history", difficulty: "hard", answer: 0,
    ar: { q: "ما أقدم نادي كرة قدم محترف في العالم؟", options: ["نوتس كاونتي", "شيفيلد يونايتد", "أستون فيلا", "رويال أندرلخت"], fact: "نوتس كاونتي الإنجليزي تأسس 1862 — وهو مصدر شعار يوفنتوس لأنه أُرسل من إنجلترا." },
    en: { q: "What is the world's oldest professional football club?", options: ["Notts County", "Sheffield United", "Aston Villa", "Royal Antwerp"], fact: "Notts County (1862) — Juventus even adopted their black-and-white stripes from England." },
  },
  {
    id: "wd-offside-origin", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "من الذي سمح بقانون التسلل الحديث (بثلاثة لاعبين)؟", options: ["الفيفا 1930", "الجامعة الاسكتلندية 1925", "أولمبيك فرنساوي", "الاتحاد الإنجليزي 1888"], fact: "تعديل 1925 خفّض عدد المدافعين من ثلاثة لاثنين — فانفجر عدد الأهداف تاريخيًا." },
    en: { q: "Who modernized the offside law to two defenders in 1925?", options: ["FIFA 1930", "The IFAB / Scottish proposal", "French Olympic Committee", "English FA 1888"], fact: "The 1925 change led to an immediate explosion in goals scored." },
  },
  {
    id: "wd-first-tv", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "أول مونديال بُث تلفزيونيًا مباشرة؟", options: ["1950", "1954", "1958", "1962"], fact: "سويسرا 1954 — أول بث تلفزيوني دولي لمونديال." },
    en: { q: "First World Cup broadcast live on television?", options: ["1950", "1954", "1958", "1962"], fact: "Switzerland 1954 — the first internationally televised World Cup." },
  },
  {
    id: "wd-copa-first", category: "history", difficulty: "medium", answer: 3,
    ar: { q: "من فاز بأول كوبا أمريكا 1916؟", options: ["البرازيل", "الأرجنتين", "تشيلي", "أوروغواي"], fact: "أوروغواي فاز بالنسخة الأولى على أرض الأرجنتين — بداية تفوقه التاريخي." },
    en: { q: "Who won the first Copa América in 1916?", options: ["Brazil", "Argentina", "Chile", "Uruguay"], fact: "Uruguay won the inaugural edition held in Argentina." },
  },
  {
    id: "wd-bernabeu-name", category: "history", difficulty: "medium", answer: 0,
    ar: { q: "من هو سانتياغو برنابيو الذي حمل ملعب ريال مدريد اسمه؟", options: ["لاعب ومدرب ورئيس النادي", "مهندس إسباني", "رئيس الفيفا", "ملك مدريد"], fact: "برنابيو لعب 16 عامًا ثم رأَس النادي 35 عامًا وبنى الملعب الذي يحمل اسمه." },
    en: { q: "Who was Santiago Bernabéu, namesake of Real Madrid's stadium?", options: ["Player, coach & club president", "Spanish engineer", "FIFA president", "King of Madrid"], fact: "He played 16 years, then presided 35 — building the stadium that bears his name." },
  },
  {
    id: "wd-azteca-hosted", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "كم مرة استضاف ملعب أزتيكا نهائي كأس العالم؟", options: ["واحدة", "مرتين", "ثلاث مرات", "لم يستضف"], fact: "أزتيكا استضاف نهائيي 1970 و1986 — الملعب الوحيد الذي شهد نهائيين." },
    en: { q: "How many World Cup finals did the Azteca Stadium host?", options: ["One", "Two", "Three", "None"], fact: "The Azteca hosted the 1970 and 1986 finals — the only stadium to hold two." },
  },
  {
    id: "wd-ballon-origin", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "متى أُقيمت أول كرة ذهبية؟", options: ["1946", "1956", "1966", "1976"], fact: "أول كرة ذهبية 1956 لستانلي ماثيوز — كانت حصراً للأوروبيين حتى 1995." },
    en: { q: "When was the first Ballon d'Or awarded?", options: ["1946", "1956", "1966", "1976"], fact: "Stanley Matthews won the first in 1956 — restricted to Europeans until 1995." },
  },
  {
    id: "wd-english-top", category: "history", difficulty: "hard", answer: 0,
    ar: { q: "من أكثر نادٍ تتويجاً بلقب الدوري الإنجليزي؟", options: ["مانشستر يونايتد", "ليفربول", "أرسنال", "إيفرتون"], fact: "يونايتد 20 لقباً — متجاوزاً ليفربول (19) في 2011." },
    en: { q: "Most English top-flight titles?", options: ["Manchester United", "Liverpool", "Arsenal", "Everton"], fact: "United's 20th in 2011 finally overtook Liverpool's 19." },
  },
  {
    id: "wd-serie-founding", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "من أكثر نادٍ فوزاً بالسكوديتو الإيطالي؟", options: ["ميلان", "إنتر", "يوفنتوس", "جينوفا"], fact: "يوفنتوس يتزعم بشريط من 36+ لقباً — ميلان وإنتر خلفه." },
    en: { q: "Most Serie A (Scudetto) titles?", options: ["AC Milan", "Inter", "Juventus", "Genoa"], fact: "Juventus lead with 36+ — Milan and Inter trail." },
  },
  {
    id: "wd-la-liga-titles", category: "history", difficulty: "easy", answer: 1,
    ar: { q: "من أكثر نادٍ تحقيقاً للّاليجا الإسبانية؟", options: ["برشلونة", "ريال مدريد", "أتلتيكو", "أتلتيك بلباو"], fact: "ريال مدريد يتصدّر برصيد يتجاوز 35 لقباً." },
    en: { q: "Most La Liga titles?", options: ["Barcelona", "Real Madrid", "Atlético", "Athletic Bilbao"], fact: "Real Madrid lead with 35+ titles." },
  },
  {
    id: "wd-bundes-titles", category: "history", difficulty: "easy", answer: 0,
    ar: { q: "من أكثر نادٍ تحقيقاً للبوندسليجا؟", options: ["بايرن ميونخ", "بوروسيا دورتموند", "بوروسيا مونشنغلادباخ", "فيردر بريمن"], fact: "بايرن يملك أكثر من 30 لقباً — في سلسلة تاريخية لم تتوقف منذ 2013." },
    en: { q: "Most Bundesliga titles?", options: ["Bayern Munich", "Borussia Dortmund", "Mönchengladbach", "Werder Bremen"], fact: "Bayern own 30+ — including a run dating to 2013." },
  },
  {
    id: "wd-first-transfer", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "أول انتقال يتجاوز مليون جنيه إسترليني كان لمن؟", options: ["دينو زوف", "تريفور فرانسيس", "يوهان كرويف", "كيفن كيغان"], fact: "فرانسيس انتقل من برمنغهام إلى نوتنغهام فورست 1979 بمليون جنيه — وسجل هدف النهائي الأوروبي فوراً." },
    en: { q: "Who was football's first £1 million transfer?", options: ["Dino Zoff", "Trevor Francis", "Johan Cruyff", "Kevin Keegan"], fact: "Francis moved to Nottingham Forest in 1979 — scoring the European Cup final winner weeks later." },
  },
  {
    id: "wd-fa-cup-old", category: "history", difficulty: "medium", answer: 3,
    ar: { q: "ما أقدم مسابقة كرة قدم في العالم؟", options: ["الدوري الإنجليزي", "كأس الاتحاد الأوروبي", "كأس العالم", "كأس الاتحاد الإنجليزي"], fact: "كأس FA بدأ 1871 — أقدم مسابقة كروية مستمرة في التاريخ." },
    en: { q: "What is the world's oldest football competition?", options: ["The English League", "UEFA Cup", "The World Cup", "The FA Cup"], fact: "The FA Cup began in 1871 — football's oldest continuous competition." },
  },
  {
    id: "wd-wembley-built", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "لماذا يُسمى ويمبلي «معبد كرة القدم»؟", options: ["أقدم ملعب أوروبي", "الملعب الأكبر في العالم", "استضاف نهائيات كبرى تاريخية ورمزية اللعبة", "لأنه أُبني فوق معبد روماني"], fact: "استضاف نهائيات المونديال والأوروبي والكأس — صاحب القوس الأيقوني." },
    en: { q: "Why is Wembley called the 'Home of Football'?", options: ["Oldest European ground", "World's largest", "Hosted historic finals & the game's symbolism", "Built on a Roman temple"], fact: "World Cup and Euro finals, plus the iconic arch — football's true home." },
  },
  {
    id: "wd-ref-card", category: "history", difficulty: "medium", answer: 0,
    ar: { q: "من ابتكر البطاقتين الحمراء والصفراء؟", options: ["حكم إنجليزي بعد حادثة 1966", "رئيس الفيفا 1970", "مدرب أرجنتيني", "لاعب برازيلي"], fact: "كين أستون استوحاها من إشارات المرور بعد مونديال 1966 المشوّش." },
    en: { q: "Who invented the red and yellow cards?", options: ["An English referee after the 1966 incident", "FIFA president 1970", "An Argentine coach", "A Brazilian player"], fact: "Ken Aston got the idea from traffic lights after 1966's chaos." },
  },
  {
    id: "wd-penalty-invent", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "متى أُدخلت ركلة الجزاء للعبة؟", options: ["1882", "1891", "1902", "1920"], fact: "قانون الركلة الترجيحية دخل 1891 لإيقاف العنف داخل منطقة الهدف." },
    en: { q: "When was the penalty kick introduced?", options: ["1882", "1891", "1902", "1920"], fact: "The 1891 law was designed to stop goal-area violence." },
  },
  {
    id: "wd-maracana-host", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "ما اسم الحادثة التي هزت البرازيل في نهائي 1950؟", options: ["كارثة هيلسيبورو", "الماراكاتسو", "معجزة برن", "معركة سانتياغو"], fact: "الماراكاتسو: خسارة البرازيل أمام أوروغواي أمام 200 ألف متفرج — أصمّت الأمة." },
    en: { q: "What was Brazil's 1950 final heartbreak called?", options: ["Hillsborough", "The Maracanaço", "The Miracle of Bern", "Battle of Santiago"], fact: "Maracanaço: Uruguay silenced 200,000 at the Maracanã — a national trauma." },
  },
  {
    id: "wd-ucl-rename", category: "history", difficulty: "easy", answer: 2,
    ar: { q: "متى تغيّر اسم «كأس أوروبا» إلى «دوري أبطال أوروبا»؟", options: ["1989", "1991", "1992", "1995"], fact: "موسم 1992-93 هو أول موسم بلاسم جديد وبشكل المجموعات." },
    en: { q: "When did the European Cup become the Champions League?", options: ["1989", "1991", "1992", "1995"], fact: "The 1992-93 season introduced the new name and group stage." },
  },
  {
    id: "wd-wc-golden-goal", category: "history", difficulty: "medium", answer: 3,
    ar: { q: "أول هدف ذهبي في تاريخ كأس العالم حُسمت به المباراة؟", options: ["1994", "1998", "2002", "لم يُسجل في المونديال أبداً"], fact: "قانون الهدف الذهبي ظهر في مونديال 1998 و2002 لكنه لم يحسم أي مباراة نهائية — ولُغي 2004." },
    en: { q: "Which World Cup saw the first golden goal?", options: ["1994", "1998", "2002", "Never used in finals"], fact: "Golden goal appeared in 1998 & 2002 but never decided a final — scrapped in 2004." },
  },
  {
    id: "wd-kits-numbers", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "متى ظهرت الأرقام على قمصان اللاعبين أول مرة؟", options: ["مونديال 1930", "مونديال 1954", "مونديال 1970", "مونديال 1982"], fact: "سويسرا 1954 — أول مونديال بأرقام ثابتة لكل لاعب طوال البطولة." },
    en: { q: "When did squad numbers first appear at a World Cup?", options: ["1930", "1954", "1970", "1982"], fact: "Switzerland 1954 — the first WC with fixed player numbers." },
  },

  // ——— كأس العالم ———
  {
    id: "wd-wc-2010-host", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "من استضاف مونديال 2010؟", options: ["البرازيل", "جنوب أفريقيا", "قطر", "روسيا"], fact: "أول مونديال في القارة الأفريقية — وانتهى بلقب إسبانيا." },
    en: { q: "Who hosted the 2010 World Cup?", options: ["Brazil", "South Africa", "Qatar", "Russia"], fact: "Africa's first WC — Spain lifted the trophy." },
  },
  {
    id: "wd-wc-2022-final", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "من فاز بمونديال قطر 2022؟", options: ["فرنسا", "كرواتيا", "الأرجنتين", "البرازيل"], fact: "الأرجنتين فازت على فرنسا بركلات الترجيح في نهائي يُعد من أعظم المباريات." },
    en: { q: "Who won the 2022 Qatar World Cup?", options: ["France", "Croatia", "Argentina", "Brazil"], fact: "Argentina beat France on penalties in one of the greatest finals ever." },
  },
  {
    id: "wd-wc-mbappe-hat", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "من سجّل هاتريك في نهائي مونديال 2022 ولم يفز؟", options: ["كيليان مبابي", "ليونيل ميسي", "أوليفييه جيرو", "أنطوان جريزمان"], fact: "مبابي أول هاتريك في نهائي مونديال منذ 1966 — ومع ذلك خسرت فرنسا." },
    en: { q: "Who scored a hat-trick in the 2022 final yet lost?", options: ["Kylian Mbappé", "Lionel Messi", "Olivier Giroud", "Antoine Griezmann"], fact: "Mbappé's was the first final hat-trick since 1966 — France still lost." },
  },
  {
    id: "wd-wc-messi-goals", category: "worldcup", difficulty: "medium", answer: 2,
    ar: { q: "من أكثر لاعب مشاركة في مباريات كأس العالم؟", options: ["كريستيانو رونالدو", "بيليه", "ليونيل ميسي", "لوثار ماتيوس"], fact: "ميسي تجاوز 26 مباراة مونديالية — رقم قياسي جديد في قطر." },
    en: { q: "Most World Cup match appearances?", options: ["Cristiano Ronaldo", "Pelé", "Lionel Messi", "Lothar Matthäus"], fact: "Messi passed 26 WC matches in Qatar — a new record." },
  },
  {
    id: "wd-wc-germany-7-1", category: "worldcup", difficulty: "easy", answer: 3,
    ar: { q: "من هزمت البرازيل 7-1 في مونديال 2014؟", options: ["إسبانيا", "هولندا", "فرنسا", "ألمانيا"], fact: "«مينيراميسو»: خمسة أهداف ألمانية في أول 29 دقيقة على أرض البرازيل." },
    en: { q: "Who beat Brazil 7-1 at the 2014 World Cup?", options: ["Spain", "Netherlands", "France", "Germany"], fact: "The Mineirazo: five German goals in the first 29 minutes in Brazil." },
  },
  {
    id: "wd-wc-griezmann-2018", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "من فاز بالحذاء البرونزي ومُنح أفضل لاعب في نهائي 2018؟", options: ["مبابي", "جريزمان", "مودريتش", "بوجبا"], fact: "جريزمان سجل في النهائي وصنع ثالث الهدافين بالبطولة." },
    en: { q: "Who scored in the 2018 final and was named its best player?", options: ["Mbappé", "Griezmann", "Modrić", "Pogba"], fact: "Griezmann scored in the final and finished among the tournament's top scorers." },
  },
  {
    id: "wd-wc-morocco-2022", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "من أول منتخب أفريقي يبلغ نصف نهائي مونديال؟", options: ["المغرب 2022", "الكاميرون 1990", "السنغال 2002", "غانا 2010"], fact: "أسود الأطلس هزموا إسبانيا والبرتغال ثم خسروا أمام فرنسا — تاريخ أفريقي." },
    en: { q: "First African team to reach a World Cup semi-final?", options: ["Morocco 2022", "Cameroon 1990", "Senegal 2002", "Ghana 2010"], fact: "The Atlas Lions beat Spain & Portugal before falling to France — historic." },
  },
  {
    id: "wd-wc-japan-germany", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "من أقصى ألمانيا من دور مجموعات مونديال 2022؟", options: ["اليابان فقط", "اليابان وكوستاريكا", "المغرب", "كرواتيا"], fact: "اليابان هزمت ألمانيا وإسبانيا — وكوستاريكا أنهت الفارق." },
    en: { q: "Who knocked Germany out of the 2022 group stage?", options: ["Japan alone", "Japan & Costa Rica", "Morocco", "Croatia"], fact: "Japan beat Germany & Spain — Costa Rica sealed the margin." },
  },
  {
    id: "wd-wc-1938-italy", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "من دافع عن لقبه في مونديال 1938؟", options: ["أوروغواي", "إيطاليا", "ألمانيا", "البرازيل"], fact: "إيطاليا أصبحت أول منتخب يفوز بمونديالين متتاليين (1934 و1938)." },
    en: { q: "Who defended their title at the 1938 World Cup?", options: ["Uruguay", "Italy", "Germany", "Brazil"], fact: "Italy became the first side to win back-to-back World Cups (1934 & 1938)." },
  },
  {
    id: "wd-wc-uruguay-1950", category: "worldcup", difficulty: "hard", answer: 0,
    ar: { q: "من سجّل هدف الفوز لأوروغواي في الماراكانزو 1950؟", options: ["ألثيديو غيغيا", "أوبدوليو فاريلا", "خوان شيافيو", "ماتياس غونزاليس"], fact: "غيغيا سجّل دقيقة 79 أمام 200 ألف برازيلي — أشهر هدف في تاريخ أمريكا الجنوبية." },
    en: { q: "Who scored Uruguay's winner in the 1950 Maracanaço?", options: ["Alcides Ghiggia", "Obdulio Varela", "Juan Schiaffino", "Matías González"], fact: "Ghiggia's 79th-minute strike silenced 200,000 — South America's most famous goal." },
  },
  {
    id: "wd-wc-2014-gotze", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "من سجّل هدف الفوز بألمانيا في نهائي 2014؟", options: ["توماس مولر", "ماريو غوتزه", "ميروسلاف كلوزه", "توني كروس"], fact: "غوتزه دخل بديلاً وسجّل بدل صدره في الدقيقة 113 أمام الأرجنتين." },
    en: { q: "Who scored Germany's 2014 final winner?", options: ["Thomas Müller", "Mario Götze", "Miroslav Klose", "Toni Kroos"], fact: "Götze came off the bench and volleyed home in the 113th minute." },
  },
  {
    id: "wd-wc-2006-zidane", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "لماذا طُرد زيدان في نهائي مونديال 2006؟", options: ["بطاقتان صفراوان", "عراك مع المدرب", "ضربة رأس لماتيراتزي", "تأخير الركلة"], fact: "ضربة الرأس الشهيرة في آخر مباراة له — إنهت مسيرته بطرد أحمر." },
    en: { q: "Why was Zidane sent off in the 2006 final?", options: ["Second yellow", "Clash with coach", "Headbutt on Materazzi", "Time-wasting"], fact: "The famous headbutt in his final match ended his career with a red." },
  },
  {
    id: "wd-wc-trophies-brazil", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "كم كأس عالم فازت البرازيل؟", options: ["5", "4", "3", "6"], fact: "خمسة مونديالات: 1958، 1962، 1970، 1994، 2002 — أكثر من أي منتخب." },
    en: { q: "How many World Cups has Brazil won?", options: ["5", "4", "3", "6"], fact: "Five: 1958, 1962, 1970, 1994, 2002 — the most of any nation." },
  },
  {
    id: "wd-wc-young-winner", category: "worldcup", difficulty: "hard", answer: 0,
    ar: { q: "من أصغر لاعب يسجل في نهائي كأس عالم؟", options: ["بيليه 1958", "مبابي 2018", "مبابي 2022", "كيمبس 1978"], fact: "بيليه سجل هدفين في نهائي 1958 وهو في السابعة عشرة — رقم ما زال قائماً." },
    en: { q: "Who is the youngest scorer in a World Cup final?", options: ["Pelé 1958", "Mbappé 2018", "Mbappé 2022", "Kempes 1978"], fact: "Pelé scored twice in the 1958 final aged 17 — still the record." },
  },
  {
    id: "wd-wc-argentina-86", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "من قاد الأرجنتين للقب مونديال 1986؟", options: ["بيلاردو كمدرب فقط", "كارلوس بيلاردو وماريو كيمبس", "دييغو مارادونا", "أوسكار روجي"], fact: "مارادونا قاد الفريق كقائد ومحرك — هدف القرن وكأس اللقب في البطولة نفسها." },
    en: { q: "Who drove Argentina to the 1986 title?", options: ["Bilardo as coach only", "Bilardo & Kempes", "Diego Maradona", "Oscar Ruggeri"], fact: "Maradona led as captain and engine — the Goal of the Century and the cup itself." },
  },
  {
    id: "wd-wc-england-1966-goal", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "من سجّل هاتريك في نهائي مونديال 1966؟", options: ["بوبي تشارلتون", "جيوف هيرست", "مارتن بيترز", "جيمي غريفز"], fact: "هيرست الوحيد الذي سجّل هاتريك في نهائي مونديال حتى 2022." },
    en: { q: "Who scored a hat-trick in the 1966 final?", options: ["Bobby Charlton", "Geoff Hurst", "Martin Peters", "Jimmy Greaves"], fact: "Hurst remained the only final hat-trick scorer until 2022." },
  },
  {
    id: "wd-wc-qatar-winter", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "لماذا أُقيم مونديال قطر 2022 في الشتاء؟", options: ["مواعيد الدوري", "حرارة الصيف الشديدة", "رمضان", "التلفزيون"], fact: "حرارة الصيف القطري (45+°) أجبرت على نقله لنوفمبر-ديسمبر — الأول في منتصف الموسم." },
    en: { q: "Why was the 2022 World Cup held in winter?", options: ["League schedules", "Extreme summer heat", "Ramadan", "TV rights"], fact: "Qatar's 45°+ summers forced a November-December slot — the first mid-season WC." },
  },
  {
    id: "wd-wc-2002-south-korea", category: "worldcup", difficulty: "medium", answer: 2,
    ar: { q: "ما أعجب إنجاز كوريا الجنوبية في مونديال 2002؟", options: ["دور الـ16", "ربع النهائي", "نصف النهائي", "النهائي"], fact: "استضافت مع اليابان ووصلت لنصف النهائي — أول آسيوي يحقق ذلك." },
    en: { q: "South Korea's landmark 2002 achievement?", options: ["Round of 16", "Quarter-finals", "Semi-finals", "Final"], fact: "Co-hosts reached the semi-finals — Asia's first." },
  },
  {
    id: "wd-wc-1970-team", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "ما فريق مونديال 1970 الذي أُطلق عليه «الجيش البرازيلي الكامل»؟", options: ["برازيل 1970", "إيطاليا 1970", "ألمانيا 1970", "أوروغواي 1970"], fact: "برازيل 1970 بيليه وجارينشا وتوستاو وريفيكينو وجايرزينهو — فريق النتائج المثالية (6 فوز)." },
    en: { q: "Which 1970 side is called the greatest ever?", options: ["Brazil 1970", "Italy 1970", "Germany 1970", "Uruguay 1970"], fact: "Pelé, Jairzinho, Tostão, Rivelino & Gérson — a perfect six-win campaign." },
  },
  {
    id: "wd-wc-spain-2010-run", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "كم هدف خسرت إسبانيا في طريقها للقب 2010؟", options: ["4", "2", "6", "0"], fact: "إسبانيا خسرت أول مباراة أمام سويسرا ثم سجلت 8 وأكلت 1 — التتويج بتاكا-تاكا." },
    en: { q: "How many goals did Spain concede on their 2010 title run?", options: ["4", "2", "6", "0"], fact: "Lost their opener to Switzerland, then conceded once across the rest." },
  },
  {
    id: "wd-wc-final-scoring", category: "worldcup", difficulty: "hard", answer: 2,
    ar: { q: "من الوحيد الذي سجّل في نهائيين مختلفين لمونديال؟", options: ["بيليه", "مارادونا", "فافا", "زيدان"], fact: "الفيفا البرازيلي فافا سجّل في نهائيي 1958 و1962 — زيدان ضمّ إليه 1998 و2006." },
    en: { q: "Who scored in two separate World Cup finals?", options: ["Pelé", "Maradona", "Vavá (and Zidane)", "Ronaldo"], fact: "Brazil's Vavá scored in 1958 & 1962; Zidane matched him in 1998 & 2006." },
  },
  {
    id: "wd-wc-argentina-78", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "من هداف مونديال الأرجنتين 1978؟", options: ["مارادونا", "ماريو كيمبس", "باساريللا", "دياز"], fact: "كيمبس سجّل 6 أهداف بينهم اثنان في النهائي — فاز بالحذاء والكرة الذهبيتين." },
    en: { q: "Who won the 1978 World Cup Golden Boot?", options: ["Maradona", "Mario Kempes", "Bertoni", "Díaz"], fact: "Kempes scored 6, including two in the final — Boot and Ballon winner." },
  },
  {
    id: "wd-wc-hattricks", category: "worldcup", difficulty: "hard", answer: 0,
    ar: { q: "كم هاتريك سجّل جيوف هيرست ومبابي في النهائيات مجموعاً؟", options: ["هاتريكان — واحد لكل منهما", "ثلاثة", "واحد فقط", "أربعة"], fact: "هيرست 1966 ومبابي 2022 — الوحيدان اللذان سجّلا هاتريك في نهائي مونديال." },
    en: { q: "How many World Cup final hat-tricks have there been?", options: ["Two — Hurst & Mbappé", "Three", "One", "Four"], fact: "Hurst (1966) and Mbappé (2022) are the only two final hat-tricks." },
  },
  {
    id: "wd-wc-2002-ronaldo", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "كم هدف سجّل رونالدو في مونديال 2002؟", options: ["6", "8", "4", "10"], fact: "ثمانية أهداف بعد عودته من إصابة خطيرة — الحذاء الذهبي واللقب معاً." },
    en: { q: "How many goals did Ronaldo score at the 2002 World Cup?", options: ["6", "8", "4", "10"], fact: "Eight goals after career-threatening injuries — Golden Boot and the title." },
  },
  {
    id: "wd-wc-1990-cameroon", category: "worldcup", difficulty: "medium", answer: 2,
    ar: { q: "من هزمت الكاميرون في افتتاح مونديال 1990؟", options: ["الأرجنتين", "برازيل", "الأرجنتين (بطل 1986)", "إيطاليا"], fact: "الأرجنتين حاملة اللقب خسرت الافتتاح أمام الكاميرون — مبادرة «الأسود» الشهيرة." },
    en: { q: "Who did Cameroon beat in the 1990 opening match?", options: ["Argentina", "Brazil", "Argentina (defending champions)", "Italy"], fact: "The holders lost to Cameroon in the opener — the Indomitable Lions' shock." },
  },
  {
    id: "wd-wc-1994-penalty", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "من أهدر الركلة الحاسمة في نهائي 1994؟", options: ["فرانكو باريتزي", "روبرتو باجيو", "دانييلي ماسارو", "ديمتريو ألبيرتيني"], fact: "باجيو «الإلهي» أهدر الترجيح الأخير وسلّم البرازيل اللقب الرابع." },
    en: { q: "Who missed the decisive penalty in the 1994 final?", options: ["Franco Baresi", "Roberto Baggio", "Daniele Massaro", "Demetrio Albertini"], fact: "The 'Divine Ponytail' skied the last spot-kick, gifting Brazil title four." },
  },
  {
    id: "wd-wc-2018-croatia", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "من حصد الكرة الذهبية لمونديال 2018؟", options: ["لوكا مودريتش", "كيليان مبابي", "هاري كين", "إيفان راكيتيتش"], fact: "مودريتش قاد كرواتيا لنهائيها الأول وحصد أفضل لاعب — كسر احتكار ميسي-رونالدو لاحقاً." },
    en: { q: "Who won the 2018 World Cup Golden Ball?", options: ["Luka Modrić", "Kylian Mbappé", "Harry Kane", "Ivan Rakitić"], fact: "Modrić drove Croatia to their first final and claimed player of the tournament." },
  },

  // ——— الأندية ———
  {
    id: "wd-camp-nou-cap", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "ما أكبر ملعب في أوروبا بالسعة؟", options: ["ويمبلي", "كامب نو", "سانتياغو برنابيو", "سان سيرو"], fact: "كامب نو يتسع لنحو 99 ألف — أكبر ملعب أوروبي." },
    en: { q: "Europe's largest stadium by capacity?", options: ["Wembley", "Camp Nou", "Bernabéu", "San Siro"], fact: "Camp Nou holds around 99,000 — Europe's biggest." },
  },
  {
    id: "wd-san-siro-two", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "أي ناديين يتقاسمان ملعب سان سيرو؟", options: ["ميلان وإنتر", "روما ولاتسيو", "يوفنتوس وتورينو", "نابولي وفيتوريا"], fact: "سان سيرو (جيوزيبي مياتزا رسمياً) — قلب ميلانو المشترك بين الميلانيين." },
    en: { q: "Which two clubs share the San Siro?", options: ["Milan & Inter", "Roma & Lazio", "Juventus & Torino", "Napoli & Verona"], fact: "San Siro (officially Giuseppe Meazza) — the shared Milanese heart." },
  },
  {
    id: "wd-anfield-song", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "ما الأغنية التي تنطلق في أنفيلد قبل كل مباراة؟", options: ["Ale Ale Ale", "You'll Never Walk Alone", "Blue Moon", "Glory Glory"], fact: "«You'll Never Walk Alone» من مسرحية 1945 — تبنّتها جماهير ليفربول وأصبحت هوية النادي." },
    en: { q: "Which anthem plays before every Liverpool home game?", options: ["Ale Ale Ale", "You'll Never Walk Alone", "Blue Moon", "Glory Glory"], fact: "'You'll Never Walk Alone' (1945 musical) became Liverpool's identity." },
  },
  {
    id: "wd-bayern-stadium", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "ما اسم ملعب بايرن ميونخ؟", options: ["السيغنال إيدونا بارك", "فولكسفاغن أرينا", "أليانز أرينا", "ميركور سبيل أرينا"], fact: "أليانز أرينا تتحول لونه إلى الأحمر في مباريات بايرن — أيقونة معمارية." },
    en: { q: "Bayern Munich's stadium name?", options: ["Signal Iduna Park", "Volkswagen Arena", "Allianz Arena", "Merkur Spiel-Arena"], fact: "The Allianz Arena glows red on Bayern nights — an architectural icon." },
  },
  {
    id: "wd-dortmund-wall", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "ما هو «الجدار الأصفر» في دورتموند؟", options: ["المدرج الجنوبي الغارق بالجماهير", "سيارة رياضية", "اسم المشجعين", "حاجز أمني"], fact: "«الجدار الأصفر» يضم نحو 25 ألف مشجع واقف — أكبر مدرج وحيد في أوروبا." },
    en: { q: "What is Dortmund's 'Yellow Wall'?", options: ["The packed South Stand", "A sports car", "Fans' nickname", "A security barrier"], fact: "The Yellow Wall packs ~25,000 standing fans — Europe's largest single stand." },
  },
  {
    id: "wd-arsenal-invincibles", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "من الأندية «اللاهزومة» في الدوري الإنجليزي؟", options: ["تشيلسي 2005", "أرسنال 2003-04", "مانشستر سيتي 2018", "ليفربول 2020"], fact: "أرسنال أنجز الموسم بلا خسارة (26 فوز، 12 تعادل) — لم يُكرر منذ." },
    en: { q: "Which side are the Premier League 'Invincibles'?", options: ["Chelsea 2005", "Arsenal 2003-04", "Man City 2018", "Liverpool 2020"], fact: "Arsenal went unbeaten (26W 12D) — still unmatched." },
  },
  {
    id: "wd-city-treble", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "في أي عام حقق مانشستر سيتي ثلاثيته التاريخية؟", options: ["2019", "2021", "2023", "2018"], fact: "2023: البريميرليج + الكأس + الأبطال في موسم واحد — ثاني إنجليزي يفعلها." },
    en: { q: "When did Manchester City win their historic treble?", options: ["2019", "2021", "2023", "2018"], fact: "2023: League + Cup + Champions League — England's second treble." },
  },
  {
    id: "wd-chelsea-2012", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من سجّل هدف تعادل تشيلسي في نهائي الأبطال 2012 ضد بايرن؟", options: ["دروغبا في الوقت الأصلي فقط", "ديدييه دروغبا برأسية", "لامبارد", "ماتيتش"], fact: "دروغبا عادل النتيجة 88' ثم سجّل آخر ركلة ترجيح في ملعب بايرن نفسه." },
    en: { q: "Who equalised for Chelsea in the 2012 CL final vs Bayern?", options: ["Torres in extra time", "Didier Drogba's header", "Lampard", "Matic"], fact: "Drogba equalised 88' then struck the winning penalty in Bayern's home." },
  },
  {
    id: "wd-atletico-nickname", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "ما لقب أتلتيكو مدريد الأشهر؟", options: ["الروخيبلانكوس (الأحمر-الأبيض)", "الملكي", "البلوغرانا", "الشياطين الحمر"], fact: "الروخيبلانكوس = الأحمر والأبيض — ولقب «الماتيلاس» الشعبية." },
    en: { q: "Atlético Madrid's most famous nickname?", options: ["Los Rojiblancos", "Los Galácticos", "Blaugrana", "Red Devils"], fact: "Rojiblancos = red-and-whites — plus the fans' 'Colchoneros'." },
  },
  {
    id: "wd-inter-1908", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "لماذا تأسس إنتر ميلان 1908؟", options: ["انفصال بسبب المال", "انفصال لقبول اللاعبين الأجانب", "دمج ناديين", "قرار ملكي"], fact: "«Internazionale» — تأسست لاستقبال الأجانب حين اقتصر ميلان على الإيطاليين." },
    en: { q: "Why was Inter Milan founded in 1908?", options: ["Money dispute", "To accept foreign players", "A merger", "Royal decree"], fact: "'Internazionale' — created for internationals when Milan restricted Italians." },
  },
  {
    id: "wd-milan-derby", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "ما اسم ديربي ميلان بين ميلان وإنتر؟", options: ["ديربي روما", "ديربي تورينو", "ديربي ديلا مادونينا", "ديربي الجنوب"], fact: "«ديربي ديلا مادونينا» نسبة لتمثال مادونا فوق كاتدرائية ميلان." },
    en: { q: "The Milan derby's name?", options: ["Derby of Rome", "Derby of Turin", "Derby della Madonnina", "Southern derby"], fact: "Named for the Madonna statue atop Milan's cathedral." },
  },
  {
    id: "wd-psg-1970", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "متى تأسس باريس سان جيرمان؟", options: ["1970", "1965", "1975", "1982"], fact: "PSG تأسس 1970 بدمج ناديين باريسيين — أصبح أقوى أندية فرنسا في العقد الأخير." },
    en: { q: "When was Paris Saint-Germain founded?", options: ["1970", "1965", "1975", "1982"], fact: "PSG merged two Paris clubs in 1970 — France's powerhouse of late." },
  },
  {
    id: "wd-boca-nickname", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "ما لقب بوكا جونيورز؟", options: ["السماوي", "الشينبونيسيس (الفقراء نصف)", "الغراي", "الفهود"], fact: "«شينبونيسيس» = أبناء بونيروس الفقراء — وعائلة لاماركا الأزرق والذهبي." },
    en: { q: "Boca Juniors' nickname?", options: ["Los Celestes", "Xeneizes", "Los Grises", "Los Pumas"], fact: "Xeneizes (from 'genoese') — Boca's iconic blue-and-gold identity." },
  },
  {
    id: "wd-river-boca-rivalry", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "ما اسم ديربي الأرجنتين الأشهر بين بوكا وريفير؟", options: ["الكلاسيكو الوطني", "ديربي الأفندي", "السوبر كلاسيكو", "ديربي الأطلسي"], fact: "«السوبر كلاسيكو» — أشهر ديربي في أمريكا الجنوبية وأحد أعنفها عالمياً." },
    en: { q: "Boca vs River's derby name?", options: ["Clásico Nacional", "Avenue Derby", "Superclásico", "Atlantic Derby"], fact: "The Superclásico — South America's fiercest fixture." },
  },
  {
    id: "wd-hilal-asian", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "كم كأس آسيا للأندية فاز الهلال؟", options: ["2", "4", "3", "6"], fact: "الهلال أكثر نادٍ آسيوي تتويجاً — 4 ألقاب دوري أبطال آسيا." },
    en: { q: "How many Asian titles does Al-Hilal hold?", options: ["2", "4", "3", "6"], fact: "Al-Hilal are Asia's most decorated — four AFC Champions League titles." },
  },
  {
    id: "wd-ahly-africa", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "كم كأس أفريقيا للأندية فاز الأهلي؟", options: ["11+", "7", "9", "13"], fact: "الأهلي «قلعة القرن الأفريقي» — أكثر نادٍ تتويجاً في تاريخ أفريقيا." },
    en: { q: "How many African Champions League titles for Al Ahly?", options: ["11+", "7", "9", "13"], fact: "Africa's Club of the Century — the most decorated side on the continent." },
  },
  {
    id: "wd-zamalek-ahly", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "ما اسم ديربي القاهرة بين الأهلي والزمالك؟", options: ["ديربي النيل", "السوبر مصري", "ديربي القاهرة — الكلاسيكو المصري", "ديربي الشمال"], fact: "ديربي القاهرة من أقدم وأشد ديربيات أفريقيا حرارة." },
    en: { q: "Al Ahly vs Zamalek's derby name?", options: ["Nile Derby", "Egyptian Superclásico", "Cairo Derby", "Northern Derby"], fact: "The Cairo Derby — among Africa's oldest and hottest fixtures." },
  },
  {
    id: "wd-benzema-ballon", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "من فاز بالكرة الذهبية 2022 بعد موسم أسطوري مع ريال مدريد؟", options: ["صلاح", "كريم بنزيما", "مبابي", "مودريتش"], fact: "بنزيما سجّل 44 هدفاً وقاد ريال للأبطال — أقدم فائز منذ 1956." },
    en: { q: "Who won the 2022 Ballon d'Or after a legendary Real Madrid season?", options: ["Salah", "Karim Benzema", "Mbappé", "Modrić"], fact: "Benzema's 44 goals drove Real to the CL — the oldest winner since 1956." },
  },
  {
    id: "wd-juve-record", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "كم موسماً متتالياً فاز يوفنتوس بالسكوديتو في العصر الحديث؟", options: ["5", "7", "9", "11"], fact: "تسعة ألقاب متتالية 2012-2020 — رقم قياسي إيطالي." },
    en: { q: "How many straight Serie A titles did Juventus win recently?", options: ["5", "7", "9", "11"], fact: "Nine straight (2012-2020) — an Italian record." },
  },
  {
    id: "wd-united-1999", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "كم دقيقة بقي ليونايتد لقلب نهائي الأبطال 1999؟", options: ["5", "3", "10", "1"], fact: "شيرينغهام وسولسكاير سجّلا 90+1 و90+3 — «أعجبة كامب نو»." },
    en: { q: "How much added time did United need to win the 1999 CL final?", options: ["5 minutes", "3 minutes", "10 minutes", "1 minute"], fact: "Sheringham and Solskjær struck 90+1 and 90+3 — 'Camp Nou miracle'." },
  },
  {
    id: "wd-liverpool-2005", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "ما سُمّي عودة ليفربول في نهائي 2005 ضد ميلان؟", options: ["كامب نو", "معجزة إستنبول", "معجزة برن", "ليلة أنفيلد"], fact: "«معجزة إستنبول» — من 0-3 إلى 3-3 ثم الفوز بالترجيح في 6 دقائق." },
    en: { q: "Liverpool's 2005 comeback vs Milan is known as…?", options: ["Camp Nou", "Miracle of Istanbul", "Miracle of Bern", "Anfield night"], fact: "Istanbul: 0-3 to 3-3, then a penalty shootout win." },
  },
  {
    id: "wd-barca-msn", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "ما هو «MSN» في تاريخ برشلونة؟", options: ["ميسي-سواريز-نيمار", "مودريتش-سواريز-نيمار", "ميسي-شافي-إنستا", "ماتياس-سانشيز-نونيز"], fact: "ميسي-سواريز-نيمار سجلوا 122 هدفاً في موسم الثلاثية 2015." },
    en: { q: "Barcelona's 'MSN' refers to…?", options: ["Messi-Suárez-Neymar", "Modrić-Suárez-Neymar", "Messi-Xavi-Iniesta", "Mata-Sánchez-Núñez"], fact: "MSN struck 122 goals in the 2015 treble season." },
  },
  {
    id: "wd-real-crm", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "ما هو «BBC» الهجومي في ريال مدريد؟", options: ["بنزيما-كاسيميرو-بيل", "بيل-بنزيما-كريستيانو", "براهيم-كروس-بيل", "بوبا-كروس-بيل"], fact: "غاريث بيل + بنزيما + كريستيانو رونالدو — الثلاثي الذي صنع 4 أبطال أوروبا." },
    en: { q: "Real Madrid's 'BBC' attack was…?", options: ["Benzema-Kroos-Bale", "Bale-Benzema-Cristiano", "Brahim-Kroos-Bale", "Benzema-Kovacic-Bale"], fact: "Bale + Benzema + Ronaldo — the trio behind four Champions Leagues." },
  },

  // ——— اللاعبون ———
  {
    id: "wd-haaland-city", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "لأي نادٍ انضم إرلينغ هالاند قبل موسم 2022؟", options: ["بوروسيا دورتموند", "مانشستر سيتي", "ريال مدريد", "بايرن ميونخ"], fact: "انتقل من دورتموند لسيتي وسطّر 36 هدفاً في موسمه الأول." },
    en: { q: "Erling Haaland joined which club ahead of 2022-23?", options: ["Borussia Dortmund", "Manchester City", "Real Madrid", "Bayern Munich"], fact: "From Dortmund to City — 36 goals in his debut season." },
  },
  {
    id: "wd-neymar-pa", category: "players", difficulty: "medium", answer: 2,
    ar: { q: "إلى أي نادٍ انتقل نيمار من باريس سان جيرمان 2023؟", options: ["تشيلسي", "مانشستر سيتي", "الهلال", "فلومينيز"], fact: "الهلال السعودية استقطب نيمار 2023 في صفقة ضخمة ضمن موجة الانتقالات." },
    en: { q: "Neymar left PSG in 2023 for…?", options: ["Chelsea", "Manchester City", "Al-Hilal", "Fluminense"], fact: "Al-Hilal signed Neymar in 2023 as part of the Saudi wave." },
  },
  {
    id: "wd-salah-speed", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "ما لقب محمد صلاح في إنجلترا؟", options: ["الملك المصري", "الفارع", "السهم", "أسد النيل"], fact: "«الملك المصري» — هتاف أنفيلد الشهير لصلاح." },
    en: { q: "Mohamed Salah's Anfield chant calls him…?", options: ["The Egyptian King", "The Pharaoh", "The Arrow", "Nile Lion"], fact: "'The Egyptian King' — Anfield's anthem for Salah." },
  },
  {
    id: "wd-kdb-assists", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من صاحب رقم قياسي بـ20 صناعة في موسم بريميرليج واحد؟", options: ["أوزيل", "كيفين دي بروين", "هنري", "فابريغاس"], fact: "دي بروين تعادل رقم هنري (20 تمريرة حاسمة) في موسم 2019-20." },
    en: { q: "Who matched Henry's 20-assist Premier League record?", options: ["Özil", "Kevin De Bruyne", "Fàbregas", "Pogba"], fact: "De Bruyne hit 20 assists in 2019-20, equalling Henry's mark." },
  },
  {
    id: "wd-lewandowski-5", category: "players", difficulty: "medium", answer: 2,
    ar: { q: "من سجّل 5 أهداف في 9 دقائق كاملة تاريخية؟", options: ["ميسي", "كريستيانو", "روبرت ليفاندوفسكي", "أغويرو"], fact: "ليفاندوفسكي بديلاً ضد فولفسبورغ 2015 — خمسة في 9 دقائق." },
    en: { q: "Who scored 5 goals in 9 legendary minutes?", options: ["Messi", "Cristiano", "Robert Lewandowski", "Agüero"], fact: "Lewandowski off the bench vs Wolfsburg 2015 — five in nine." },
  },
  {
    id: "wd-buffon-juve", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "كم مرة فاز جيانلويجي بوفون بلقب أفضل حارس في العالم؟", options: ["3", "5", "7", "2"], fact: "بوفون خمسة جوائز حارس — أسطورة اليد اليسرى الإيطالية." },
    en: { q: "How many times was Buffon named world's best goalkeeper?", options: ["3", "5", "7", "2"], fact: "Five goalkeeper awards — the Italian colossus." },
  },
  {
    id: "wd-messi-91", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من سجل 91 هدفاً في سنة تقويمية واحدة؟", options: ["ميسي 2012", "كريستيانو 2015", "نيمار 2016", "مبابي 2021"], fact: "ميسي سجل 91 هدفاً في 2012 — رقم قياسي عالمي رسمي." },
    en: { q: "Who scored 91 goals in a single calendar year?", options: ["Messi 2012", "Cristiano 2015", "Neymar 2016", "Mbappé 2021"], fact: "Messi's 91 in 2012 remains the official world record." },
  },
  {
    id: "wd-vinicius-madrid", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "من سجل هدف الفوز بنهائي أبطال أوروبا 2022؟", options: ["بنزيما", "مودريتش", "فينيسيوس جونيور", "فالفيردي"], fact: "فينيسيوس جونيور سجّل الهدف الوحيد أمام ليفربول في باريس." },
    en: { q: "Who scored the winner in the 2022 CL final?", options: ["Benzema", "Modrić", "Vinícius Júnior", "Valverde"], fact: "Vinícius struck the only goal against Liverpool in Paris." },
  },
  {
    id: "wd-kane-tottenham", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من هداف توتنهام التاريخي؟", options: ["جيمي غريفز", "هاري كين", "آدروبييور", "سون"], fact: "كين تجاوز غريفز برصيد 280+ هدفاً لسبيرز." },
    en: { q: "Tottenham's all-time top scorer?", options: ["Jimmy Greaves", "Harry Kane", "Adebayor", "Son"], fact: "Kane passed Greaves with 280+ Spurs goals." },
  },
  {
    id: "wd-bellingham-dort", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "من النجم الإنجليزي الذي انتقل من دورتموند لريال مدريد 2023؟", options: ["موسيالا", "سانتشو", "جود بيلينغهام", "رايس"], fact: "بيلينغهام انتقل لريال وسجّل في أول 4 مباريات أوروبية له." },
    en: { q: "Which English star moved Dortmund → Real Madrid in 2023?", options: ["Musiala", "Sancho", "Jude Bellingham", "Rice"], fact: "Bellingham scored in his first four European games for Real." },
  },
  {
    id: "wd-courtois-final", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من كان رجل مباراة نهائي الأبطال 2022 بـ9 تصديات؟", options: ["أليسون", "تيبو كورتوا", "إيدسون", "نور"], fact: "كورتوا حرم ليفربول مرات لا تُحصى وحصد جائزة أفضل لاعب في النهائي." },
    en: { q: "Who made 9 saves as MOTM in the 2022 CL final?", options: ["Alisson", "Thibaut Courtois", "Ederson", "Neuer"], fact: "Courtois denied Liverpool repeatedly and took the final MOTM." },
  },
  {
    id: "wd-grealish-mane", category: "players", difficulty: "hard", answer: 0,
    ar: { q: "من هو أغلى صفقة مانشستر سيتي التاريخية؟", options: ["جاك غريليش", "كيفين دي بروين", "إيرلينغ هالاند", "فيل فودين"], fact: "غريليش وصل من أستون فيلا بـ100 مليون جنيه — الرقم القياسي البريطاني حينها." },
    en: { q: "Manchester City's record signing?", options: ["Jack Grealish", "Kevin De Bruyne", "Erling Haaland", "Phil Foden"], fact: "Grealish's £100m from Aston Villa — the British record then." },
  },
  {
    id: "wd-modric-2018", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من فاز بالكرة الذهبية 2018؟", options: ["ميسي", "لوكا مودريتش", "كريستيانو", "غريزمان"], fact: "مودريتش أنهى عقد ميسي-رونالدو العشرية بعد قيادة كرواتيا لنهائي المونديال." },
    en: { q: "Who won the 2018 Ballon d'Or?", options: ["Messi", "Luka Modrić", "Cristiano", "Griezmann"], fact: "Modrić broke the Messi-Ronaldo decade after leading Croatia to the final." },
  },
  {
    id: "wd-vardy-record", category: "players", difficulty: "hard", answer: 0,
    ar: { q: "من سجل في 11 مباراة متتالية بالبريميرليج؟", options: ["جيمي فاردي", "تيو والكوت", "ألان شيرر", "أغويرو"], fact: "فاردي 2015 — كسر رقم رود فان نيستيلروي (10) بالتسجيل المتواصل." },
    en: { q: "Who scored in 11 consecutive Premier League games?", options: ["Jamie Vardy", "Theo Walcott", "Alan Shearer", "Agüero"], fact: "Vardy 2015 — broke Van Nistelrooy's 10-game run." },
  },
  {
    id: "wd-robben-cut", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "ما الحركة الشهيرة لأرين روبن؟", options: ["الالتفافة الكرويفية", "القطع من اليمين داخلاً ويسدد يساراً", "المراوغة المزدوجة", "الجسر"], fact: "«القطعة الروبنية» — كل الجمهور يعرفها ولا أحد يوقفها." },
    en: { q: "Arjen Robben's signature move?", options: ["Cruyff Turn", "Cut inside from right & shoot left", "Double stepover", "Rabona"], fact: "Everyone knew the Robben cut — nobody stopped it." },
  },
  {
    id: "wd-suarez-bite", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "كم مرة عض لويس سواريز لاعباً في المباريات؟", options: ["مرة", "مرتين", "ثلاث مرات", "أربع مرات"], fact: "ثلاث عضات شهيرة: باكانو، إيفانوفيتش، وتشياريني في مونديال 2014." },
    en: { q: "How many times did Suárez bite an opponent?", options: ["Once", "Twice", "Three times", "Four times"], fact: "Three famous bites: Bakkal, Ivanović, and Chiellini at the 2014 WC." },
  },
  {
    id: "wd-ramos-la-decima", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من سجّل رأسية الدقيقة 93 في نهائي الأبطال 2014؟", options: ["بيل", "سيرجيو راموس", "مارسيلو", "كريستيانو"], fact: "راموس «لا ديسيما» — الرأسية التي أطلقت ريال للقب العاشر." },
    en: { q: "Who headed the 93rd-minute equaliser in the 2014 CL final?", options: ["Bale", "Sergio Ramos", "Marcelo", "Cristiano"], fact: "Ramos launched 'La Décima' — Real's tenth European crown." },
  },
  {
    id: "wd-pirlo-maestro", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "ما لقب أندريا بيرلو؟", options: ["المهندس", "الساحر", "العميد", "الفيلسوف فقط"], fact: "«المهندس» لأن تمريراته معمارية — وعميد ريحة اللعب الإيطالي." },
    en: { q: "Andrea Pirlo's nickname?", options: ["L'Architetto (The Architect)", "The Wizard", "The Dean", "Only The Philosopher"], fact: "The Architect — his passing built Italy's 2006 World Cup." },
  },
  {
    id: "wd-messi-psg", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "لأي نادٍ انتقل ميسي بعد برشلونة 2021؟", options: ["ريال مدريد", "باريس سان جيرمان", "مانشستر سيتي", "إنتر ميامي"], fact: "PSG استقبل ميسي بعد أزمة برشلونة المالية — ثم أُنتقل لميامي 2023." },
    en: { q: "Messi's club after Barcelona in 2021?", options: ["Real Madrid", "Paris Saint-Germain", "Manchester City", "Inter Miami"], fact: "PSG after Barça's financial crisis — then Miami in 2023." },
  },
  {
    id: "wd-messi-miami", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "ما لقب إنتر ميامي الذي انضم له ميسي؟", options: ["الأسود", "الوردي والأسود", "الملوك", "السماوي"], fact: "«الوردي والأسود» — ميامي صار ظاهرة عالمية بعد وصول ميسي." },
    en: { q: "Inter Miami's colours (Messi's club)?", options: ["The Lions", "Pink & Black", "The Kings", "Sky Blue"], fact: "Pink & Black — Miami went global the day Messi arrived." },
  },
  {
    id: "wd-neuer-sweeper", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "ما الدور الذي أحدثه مانيور نوير كحارس؟", options: ["الحارس المكنسة (Sweeper-keeper)", "الحارس الثابت", "حارس الركلات فقط", "الحارس المدافع"], fact: "نوير غيّر دور الحارس بالخروج للتحام واللعب بالقدم — سلاح بايرن وألمانيا." },
    en: { q: "Which goalkeeping role did Manuel Neuer revolutionise?", options: ["Sweeper-keeper", "Static keeper", "Penalty specialist", "Defender-keeper"], fact: "Neuer redefined the position with sweeping and distribution." },
  },
  {
    id: "wd-ronaldo-ucl-kings", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من هداف دوري أبطال أوروبا التاريخي؟", options: ["ميسي", "كريستيانو رونالدو", "ليفاندوفسكي", "بنزيما"], fact: "كريستيانو تجاوز 140 هدفاً أوروبياً — الرقم القياسي المطلق." },
    en: { q: "All-time Champions League top scorer?", options: ["Messi", "Cristiano Ronaldo", "Lewandowski", "Benzema"], fact: "Cristiano passed 140 European goals — the all-time mark." },
  },
  {
    id: "wd-xavi-iniesta-tiki", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "ما اسم أسلوب برشلونة وإسبانيا الذي جسّده تشافي وإنستا؟", options: ["تيكي-تاكا", "الضغط العالي", "الكتلة المنخفضة", "الكرات الطويلة"], fact: "تيكي-تاكا: تمريرات قصيرة متلاحقة وسيطرة مطلقة على الكرة." },
    en: { q: "Barça & Spain's style embodied by Xavi & Iniesta?", options: ["Tiki-taka", "Gegenpress", "Low block", "Long balls"], fact: "Tiki-taka: endless short passes and total possession." },
  },
  {
    id: "wd-haaland-nickname", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "ما لقب إرلينغ هالاند؟", options: ["الوحش الأزرق", "الروبوت", "الصاروخ", "الآلة النرويجية"], fact: "«الروبوت» لكثافة أهدافه وهدوئه — عيدها الجمهور الإنجليزي." },
    en: { q: "Erling Haaland's nickname?", options: ["Blue Beast", "The Robot", "The Rocket", "Norwegian Machine"], fact: "'The Robot' — for his relentless scoring calm." },
  },
  {
    id: "wd-mbappe-pace", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "ما السرعة القصوى المسجلة لمبابي في المونديال؟", options: ["33 كم/س", "36 كم/س", "38 كم/س", "30 كم/س"], fact: "مبابي بلغ نحو 38 كم/س — من أسرع لاعبي العالم." },
    en: { q: "Mbappé's recorded top speed at the World Cup?", options: ["33 km/h", "36 km/h", "38 km/h", "30 km/h"], fact: "About 38 km/h — among the fastest players on Earth." },
  },
  {
    id: "wd-kante-smile", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "ما لقب نغولو كانتي؟", options: ["الوحش", "قلب النادي الودود", "القاتل", "السيد الهدوء"], fact: "كانتي معروف بابتسامته وتواضعه رغم إخضاعه لوسط الميدان." },
    en: { q: "N'Golo Kanté is famous for being…?", options: ["The Beast", "The kindest engine", "The Killer", "Mr. Chill"], fact: "Kanté's smile and humility match his midfield dominance." },
  },

  // ——— الأساطير ———
  {
    id: "wd-cruijff-barca", category: "legends", difficulty: "medium", answer: 0,
    ar: { q: "ما الإرث الأعمق ليوهان كرويف في برشلونة؟", options: ["الفلسفة اللعبية والاكاديمية", "الأرقام التهديفية", "الانتقالات الكبيرة", "الشعارات"], fact: "كرويف بنى فلسفة «ميسيا» ومدرسة لا ماسيا — أساس تيكي-تاكا الحديث." },
    en: { q: "Cruyff's deepest legacy at Barcelona?", options: ["Playing philosophy & La Masia", "Goal records", "Big transfers", "Crests"], fact: "Cruyff built the philosophy and La Masia — modern tiki-taka's roots." },
  },
  {
    id: "wd-baggio-ponytail", category: "legends", difficulty: "easy", answer: 1,
    ar: { q: "ما لقب روبرتو باجيو الشهير؟", options: ["الملك", "الذيل الإلهي", "الساحر", "الفن"], fact: "«الذيل الإلهي» لشعره المميز — وأسلوبه الهادئ الفاتن." },
    en: { q: "Roberto Baggio's famous nickname?", options: ["Il Re", "The Divine Ponytail", "The Wizard", "The Artist"], fact: "'Il Divin Codino' — his signature hair and elegant calm." },
  },
  {
    id: "wd-beckham-bend", category: "legends", difficulty: "easy", answer: 2,
    ar: { q: "ما المهارة التي اشتهر بها ديفيد بيكهام؟", options: ["المراوغة", "التسديد القوي", "الركلات الحرة المقوّسة والتمريرات", "التدخلات"], fact: "«بيند إت لايك بيكهام» — قوس ركلاته الحرة صار أيقونة عالمية." },
    en: { q: "David Beckham's signature skill?", options: ["Dribbling", "Power shots", "Bending free kicks & crosses", "Tackling"], fact: "'Bend it like Beckham' — his free-kick curve became iconic." },
  },
  {
    id: "wd-maldini-one", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "كم موسماً لعب باولو مالديني لميلان فقط؟", options: ["15", "25", "20", "30"], fact: "مالديني 25 موسماً في ميلان واحد — رمز الوفاء الإيطالي." },
    en: { q: "How many seasons did Paolo Maldini spend at Milan only?", options: ["15", "25", "20", "30"], fact: "25 seasons in one club — Italian loyalty incarnate." },
  },
  {
    id: "wd-totti-roma", category: "legends", difficulty: "easy", answer: 0,
    ar: { q: "ما لقب فرانشيسكو توتي في روما؟", options: ["الملك الثامن لروما", "الأمير", "الساحر", "القائد"], fact: "«الملك الثامن لروما» — أمضى مسيرته كلها في نادي المدينة." },
    en: { q: "Francesco Totti's Roma nickname?", options: ["The Eighth King of Rome", "The Prince", "The Wizard", "The Captain"], fact: "'The Eighth King of Rome' — a one-club legend." },
  },
  {
    id: "wd-maradona-napoli", category: "legends", difficulty: "easy", answer: 1,
    ar: { q: "كم سكوديتو أعطى مارادونا لنابولي؟", options: ["واحد", "اثنان", "ثلاثة", "أربعة"], fact: "1987 و1990 — نابولي الجنوبية هزمت شمال إيطاليا للمرة الأولى." },
    en: { q: "How many Scudetti did Maradona give Napoli?", options: ["One", "Two", "Three", "Four"], fact: "1987 & 1990 — the south finally toppled Italy's northern giants." },
  },
  {
    id: "wd-ronaldinho-smile", category: "legends", difficulty: "easy", answer: 2,
    ar: { q: "ما لقب رونالدينيو؟", options: ["الظاهرة", "الساحر البرازيلي", "الفرحة", "المهرج"], fact: "«جوّ» (الفرحة) — لعب رونالدينيو بابتسامة دائمة وسحر لا يقلد." },
    en: { q: "Ronaldinho's essence in a word?", options: ["The Phenomenon", "The Brazilian Wizard", "Joga Bonito joy", "The Joker"], fact: "He played the beautiful game with a permanent grin." },
  },
  {
    id: "wd-henry-invincible", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "في أي موسم حقق أرسنال موسم «اللاهزومة» بقيادة هنري؟", options: ["2001-02", "2003-04", "2005-06", "1997-98"], fact: "2003-04: 26 فوزاً و12 تعادلاً بلا أي خسارة — و49 مباراة متتالية بلا هزيمة عبر موسمين." },
    en: { q: "In which season did Arsenal go unbeaten led by Henry?", options: ["2001-02", "2003-04", "2005-06", "1997-98"], fact: "2003-04: 26 wins, 12 draws, zero losses — 49 games unbeaten across two seasons." },
  },
  {
    id: "wd-zidane-2002-volley", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "في أي ملعب سجّل زيدان رأسية أمامه في نهائي الأبطال 2002؟", options: ["أولد ترافورد", "هامبدن بارك غلاسكو", "سان سيرو", "أليانز"], fact: "هامبدن بارك — رأسية تاريخية على يسار مدريد في النهائي ضد ليفركوزن." },
    en: { q: "Where did Zidane's iconic 2002 final volley happen?", options: ["Old Trafford", "Hampden Park, Glasgow", "San Siro", "Allianz"], fact: "Hampden Park — the legendary left-foot volley vs Leverkusen." },
  },
  {
    id: "wd-cannavaro-cap", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من المدافع الوحيد الذي فاز بالكرة الذهبية في القرن الحالي؟", options: ["راموس", "فابيو كانافارو 2006", "بويول", "تيرام"], fact: "كانافارو فاز 2006 بعد قيادة إيطاليا للمونديال — آخر مدافع يفعلها." },
    en: { q: "The only defender to win this century's Ballon d'Or?", options: ["Ramos", "Fabio Cannavaro 2006", "Puyol", "Thuram"], fact: "Cannavaro 2006 — captaining Italy to the World Cup." },
  },

  // ——— الكرة العربية ———
  {
    id: "wd-salah-liverpool-2017", category: "arab", difficulty: "easy", answer: 0,
    ar: { q: "من أي نادٍ انتقل صلاح لليفربول 2017؟", options: ["روما", "تشيلسي", "بازل", "فلورنسا"], fact: "روما → ليفربول 2017 مقابل نحو 42 مليون جنيه — أفضل صفقة في تاريخ النادي." },
    en: { q: "Salah joined Liverpool in 2017 from…?", options: ["Roma", "Chelsea", "Basel", "Fiorentina"], fact: "Roma → Liverpool (~£42m) — arguably the club's best-ever deal." },
  },
  {
    id: "wd-egypt-2018-worldcup", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "كم مرة لعب منتخب مصر في كأس العالم حتى 2022؟", options: ["مرتين", "ثلاث مرات", "أربع مرات", "خمس مرات"], fact: "مصر لعب 1934 و1990 و2018 — أول عربي يشارك في مونديال (1934)." },
    en: { q: "How many World Cup appearances for Egypt until 2022?", options: ["Two", "Three", "Four", "Five"], fact: "1934, 1990, 2018 — the first Arab side ever to play one." },
  },
  {
    id: "wd-saudi-asia-titles", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "كم كأس آسيا فاز المنتخب السعودي؟", options: ["1", "3", "2", "4"], fact: "السعودية ثلاثة ألقاب: 1984، 1988، 1996 — قوة خليجية تاريخية." },
    en: { q: "How many Asian Cups for Saudi Arabia?", options: ["1", "3", "2", "4"], fact: "Three: 1984, 1988, 1996 — a historic Gulf power." },
  },
  {
    id: "wd-mahrez-algeria", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "من قاد الجزائر لقب كأس أفريقيا 2019؟", options: ["سفيان فيغولي", "رياض محرز", "إسلام سليماني", "بلقاسم"], fact: "محرز سجّل هدف الفوز الحاسم ضد نيجيريا في الدقائق الأخيرة." },
    en: { q: "Who drove Algeria's 2019 AFCON win?", options: ["Feghouli", "Riyad Mahrez", "Slimani", "Bougherra"], fact: "Mahrez's late free-kick sank Nigeria in the semi." },
  },
  {
    id: "wd-tunisia-2004", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "من استضاف وفاز بكأس أفريقيا 2004؟", options: ["تونس", "المغرب", "مصر", "الجزائر"], fact: "تونس فازت على أرضها — اللقب الأفريقي الأول للنسور." },
    en: { q: "Who hosted and won AFCON 2004?", options: ["Tunisia", "Morocco", "Egypt", "Algeria"], fact: "Tunisia won at home — the Eagles' first African crown." },
  },
  {
    id: "wd-jordan-2013", category: "arab", difficulty: "hard", answer: 2,
    ar: { q: "من وصل لنهائي كأس آسيا 2011 كمن سادس عربي؟", options: ["الأردن", "عُمان", "لا نهائي عربي — أستراليا واليابان", "قطر"], fact: "آخر نهائي كأس آسيا بعربي كان 1996 (السعودية) — ثم قطر 2019." },
    en: { q: "Which Arab side last reached an Asian Cup final before 2019?", options: ["Jordan", "Oman", "Saudi Arabia 1996", "Qatar"], fact: "Saudi Arabia (1996) until Qatar's 2019 triumph." },
  },
  {
    id: "wd-qatar-2019", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "من فاز بكأس آسيا 2019 دون أن يدخل عليه هدف؟", options: ["اليابان", "قطر", "إيران", "أستراليا"], fact: "قطر فازت باللقب بسبعة انتصارات وبدون أي هدف يدخل مرماها." },
    en: { q: "Who won the 2019 Asian Cup without conceding?", options: ["Japan", "Qatar", "Iran", "Australia"], fact: "Qatar: seven wins, zero goals conceded — a perfect run." },
  },
  {
    id: "wd-morocco-2023-uae", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "من أول عربي وأفريقي يصل لمباراة أولمبية (كرة القدم)؟", options: ["المغرب 2024", "مصر 2012", "الجزائر 2016", "السعودية 1996"], fact: "أسود الأطلس وصلوا لنصف نهائي الأولمبياد 2024 بمدريد وتولوز." },
    en: { q: "First Arab/African side in an Olympic football semi?", options: ["Morocco 2024", "Egypt 2012", "Algeria 2016", "Saudi 1996"], fact: "Morocco reached the 2024 Olympic semi-finals." },
  },
  {
    id: "wd-wydad-raja", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "ما اسم ديربي كازابلانكا الشهير؟", options: ["ديربي الشمال", "ديربي البيضاء — الوداد والرجاء", "ديربي الأطلس", "ديربي المضيق"], fact: "«ديربي كازابلانكا» بين الوداد والرجاء — أشد ديربي مغربي حرارة." },
    en: { q: "Casablanca's famous derby?", options: ["Northern Derby", "Wydad vs Raja", "Atlas Derby", "Strait Derby"], fact: "Wydad vs Raja — Morocco's hottest fixture." },
  },
  {
    id: "wd-iraq-legend", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "من هو أسطورة العراق ولقب «سيّد الركلة الحرة»؟", options: ["حسين سعيد", "أحمد راضي", "علي حسين", "حمود سلطان"], fact: "حسين سعيد أسطورة الشرطة والعراق — 121 هدف دولي تاريخي." },
    en: { q: "Iraq's legend and free-kick master?", options: ["Hussein Saeed", "Ahmed Radhi", "Ali Hussein", "Hammoud Sultan"], fact: "Hussein Saeed — 121 international goals, an Iraqi icon." },
  },
];
