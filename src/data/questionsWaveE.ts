/* ============================================================
 *  Question Bank — الموجة الخامسة (150 سؤالًا)
 *  أسئلة موثوقة ثنائية اللغة عبر كل الفئات
 *  ============================================================ */

import type { Question } from "../domain/types";

export const QUESTIONS_WAVE_E: Question[] = [
  // ——— التاريخ ———
  {
    id: "we-wc-hosts-2030", category: "history", difficulty: "easy", answer: 1,
    ar: { q: "من يستضيف مونديال 2030؟", options: ["الأرجنتين وأوروغواي فقط", "إسبانيا والبرتغال والمغرب", "البرازيل", "إيطاليا"], fact: "مونديال المئوية يمتد لثلاث قارات: مباراة افتتاحية في أوروغواي ثم الأكيدة في إسبانيا والبرتغال والمغرب." },
    en: { q: "Who hosts the 2030 World Cup?", options: ["Argentina & Uruguay only", "Spain, Portugal & Morocco", "Brazil", "Italy"], fact: "The centenary WC spans three continents: openers in Uruguay, then Spain-Portugal-Morocco." },
  },
  {
    id: "we-first-referee", category: "history", difficulty: "hard", answer: 0,
    ar: { q: "كيف كان التحكيم في أول مباراة دولية 1872؟", options: ["بلا حكم — يتحكمان الكابتنان", "حكم واحد بصفارة", "حكمان وسطي", "حكم يركض بالجانبين"], fact: "أول مباراة دولية (اسكتلندا-إنجلترا) لُعبت بدون حكم — وكان الكابتنان يحسمان النزاعات." },
    en: { q: "How was the first international (1872) officiated?", options: ["No referee — the two captains decided", "One referee with a whistle", "Two refs + a fourth", "Running linesmen"], fact: "Scotland-England 1872 had no referee — the captains settled disputes." },
  },
  {
    id: "we-wc-1930-montevideo", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "ما اسم ملعب نهائي أول مونديال 1930؟", options: ["الماراكانا", "أزتيكا", "ستاد سينتيناريو", "ويمبلي"], fact: "«الملعب المئوي» في مونديفيديو — احتفالاً بمرور 100 عام على دستور أوروغواي." },
    en: { q: "The 1930 final stadium in Montevideo?", options: ["Maracanã", "Azteca", "Estadio Centenario", "Wembley"], fact: "The 'Centenary Stadium' — built for Uruguay's constitution centenary." },
  },
  {
    id: "we-penalty-shootout-invent", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "متى دخلت ركلات الترجيح للعبة رسمياً؟", options: ["1968", "1970", "1976", "1982"], fact: "دخلت 1970 بعد وفيات التكرار — وأول مونديال بها كان 1982." },
    en: { q: "When were penalty shootouts officially introduced?", options: ["1968", "1970", "1976", "1982"], fact: "Introduced in 1970; the first WC to use them was 1982." },
  },
  {
    id: "we-royal-real-title", category: "history", difficulty: "medium", answer: 0,
    ar: { q: "من منح ريال مدريد لقب «ريال» (الملكي)؟", options: ["الملف ألفونسو الثالث عشر", "الملك خوان كارلوس", "فرانكو", "الفيفا"], fact: "ألفونسو الثالث عشر منح اللقب 1920 — لذا التاج في الشعار." },
    en: { q: "Who granted Real Madrid its royal 'Real' title?", options: ["King Alfonso XIII", "King Juan Carlos", "Franco", "FIFA"], fact: "Alfonso XIII granted it in 1920 — hence the crown on the crest." },
  },
  {
    id: "we-dynamo-kyiv-coach", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "من مدرب دينامو كييف الأسطوري صاحب «حصار المراكز الخمسة»؟", options: ["أوتو ريهاغل", "فاليري لوبانوفسكي", "أرينغي ساكي", "ميشيلز"], fact: "لوبانوفسكي مهندس الدفاع الخماسي والمؤسس العلمي للتحليل الرياضي بالكرة." },
    en: { q: "Dynamo Kyiv's legendary scientific coach?", options: ["Otto Rehhagel", "Valeriy Lobanovskyi", "Arrigo Sacchi", "Michels"], fact: "Lobanovskyi pioneered football analytics and the five-defender block." },
  },
  {
    id: "we-catenaccio-invent", category: "history", difficulty: "hard", answer: 0,
    ar: { q: "من أشهر من يُنسب له «الكاتيناتشيو» الإيطالي؟", options: ["هيرينيو هيريرا بإنتر", "نيليو روكو بميلان", "مارتشيلو ليبي", "كارلو أنشيلوتي"], fact: "هيريرا صنع إنتر الستينيات بالكاتيناتشيو والضغط السريع والتدريب النفسي." },
    en: { q: "Who is most associated with Italian 'Catenaccio'?", options: ["Helenio Herrera at Inter", "Nereo Rocco at Milan", "Marcello Lippi", "Carlo Ancelotti"], fact: "Herrera's 1960s Inter: catenaccio, fast breaks, and sports psychology." },
  },
  {
    id: "we-total-football-coach", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "من مدرب «الكرة الشاملة» في هولندا 1974؟", options: ["لويس فان خال", "ريينوس ميتشلز", "خوسي مورينيو", "أده فوغتس"], fact: "ميتشلز «العجن» — هو الذي صاغ فلسفة التبديل الدائم للمواقع." },
    en: { q: "Who coached the 1974 'Total Football' Netherlands?", options: ["Louis van Gaal", "Rinus Michels", "José Mourinho", "Ade Vogts"], fact: "Michels, 'the General', invented constant positional rotation." },
  },
  {
    id: "we-la-masia-year", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "متى تأسست أكاديمية لا ماسيا برشلونية الشهيرة؟", options: ["1979", "1989", "1979 كمزرعة ثم تطورت", "1995"], fact: "بدأت 1979 كمزرعة للناشئين — منها خرج ميسي وتشافي وإنستا وبوسكيتس." },
    en: { q: "When was Barcelona's La Masia academy founded?", options: ["1979", "1989", "1979 as a farm then developed", "1995"], fact: "Started 1979 — produced Messi, Xavi, Iniesta, Busquets." },
  },
  {
    id: "we-fa-premier-1992", category: "history", difficulty: "easy", answer: 1,
    ar: { q: "متى انطلقت البريميرليج الحديثة؟", options: ["1988", "1992", "1995", "1998"], fact: "1992 — انفصلت عن الدرجة الأولى لتسويق حقوق البث باحتراف أكبر." },
    en: { q: "When did the modern Premier League begin?", options: ["1988", "1992", "1995", "1998"], fact: "1992 — a breakaway to market TV rights independently." },
  },
  {
    id: "we-first-black-england", category: "history", difficulty: "hard", answer: 0,
    ar: { q: "من أول أسود يلعب لمنتخب إنجلترا؟", options: ["فيف أندرسون", "لوثر بلوست", "كلايف ووكر", "جون بارنز"], fact: "فيف أندرسون 1978 — ولُقّب بـ«البرق الأسود» للسرعة." },
    en: { q: "First Black player for England?", options: ["Viv Anderson", "Luther Blissett", "Clive Walker", "John Barnes"], fact: "Viv Anderson, 1978 — later dubbed 'the Black Bolt'." },
  },
  {
    id: "we-goal-line-tech", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "متى دخل تكنولوجيا خط المرمى كأس العالم؟", options: ["2006", "2010", "2014", "2018"], fact: "بعد «شبح لامبارد» 2010 — دخلت التكنولوجيا رسمياً في البرازيل 2014." },
    en: { q: "When did goal-line tech debut at a World Cup?", options: ["2006", "2010", "2014", "2018"], fact: "After 'Lampard's ghost' in 2010, tech arrived at Brazil 2014." },
  },
  {
    id: "we-var-first-wc", category: "history", difficulty: "easy", answer: 1,
    ar: { q: "أول مونديال يستخدم نظام حكم الفيديو (VAR)؟", options: ["2014", "2018", "2022", "2010"], fact: "روسيا 2018 — أول استخدام رسمي للمساعد المرئي في تاريخ المونديال." },
    en: { q: "First World Cup with VAR?", options: ["2014", "2018", "2022", "2010"], fact: "Russia 2018 — video assistance's WC debut." },
  },
  {
    id: "we-oldest-tournament-final", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "ما أقدم ديربي في كرة القدم الإنجليزية؟", options: ["ديربي مانشستر", "ديربي شيفيلد", "ديربي نوتس - كاونتي", "ديربي ميرسي"], fact: "ديربي شيفيلد (هيل يونايتد وشييفيلد يونايتد) — منذ 1893." },
    en: { q: "England's oldest football derby?", options: ["Manchester derby", "Sheffield derby", "Notts derby", "Merseyside derby"], fact: "Sheffield's Hallam vs Sheffield FC — contested since the 1860s." },
  },
  {
    id: "we-stadium-97k", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "ما أكبر ملعب نادي في أوروبا تاريخياً بالسعة؟", options: ["ويمبلي", "كامب نو القديم", "برنابيو", "سان سيرو"], fact: "كامب نو القديم وصل 120 ألف متفرج في الثمانينات — سجل أوروبي." },
    en: { q: "Europe's largest club stadium historically?", options: ["Wembley", "Old Camp Nou", "Bernabéu", "San Siro"], fact: "The old Camp Nou hit 120,000 in the 1980s — a European record." },
  },
  {
    id: "we-copa-lib-names", category: "history", difficulty: "hard", answer: 0,
    ar: { q: "من أكثر نادٍ تتويجاً بكأس ليبرتادوريس؟", options: ["إنديبندينتي", "بوكا جونيورز", "ناسيونال", "بينارول"], fact: "إنديبندينتي الأرجنتيني 7 ألقاب — «ملك ليبرتادوريس»." },
    en: { q: "Most Copa Libertadores titles?", options: ["Independiente", "Boca Juniors", "Nacional", "Peñarol"], fact: "Argentina's Independiente with seven — 'the Kings of Libertadores'." },
  },
  {
    id: "we-african-cup-first", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "من فاز بأول كأس أفريقيا للأندية؟", options: ["الأهلي", "ريال سبورتايفي الكاميروني", "هافيا الكونغولي", "مازيمبي"], fact: "1964 — أول نسخة أفريقية للأندية، وفاز بها الكاميروني أوريه." },
    en: { q: "Who won the first African Champions Cup?", options: ["Al Ahly", "Cameroon's Oryx", "Congo's Diables", "TP Mazembe"], fact: "1964 — Cameroon's Oryx claimed the inaugural edition." },
  },
  {
    id: "we-ballon-women-first", category: "history", difficulty: "medium", answer: 0,
    ar: { q: "من أول امرأة تفوز بالكرة الذهبية النسائية؟", options: ["آدا هيغبرغ 2018", "مارتا 2010", "ميغان رابينو 2019", "أليكس مورغان 2019"], fact: "النرويجية آدا هيغبرغ فازت بأول نسخة رسمية 2018 — وهي من أفضل اللاعبات." },
    en: { q: "First women's Ballon d'Or winner?", options: ["Ada Hegerberg 2018", "Marta 2010", "Megan Rapinoe 2019", "Alex Morgan 2019"], fact: "Norway's Hegerberg won the inaugural award in 2018." },
  },
  {
    id: "we-wc-golden-glove", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "من حاز القفاز الذهبي لمونديال 2022؟", options: ["كورتوا", "إيميليانو مارتينيز", "بونو", "إيدسون"], fact: "«ديبو» مارتينيز تصدّى للترجيحات وأخطر الفرص — بطولة قياسية." },
    en: { q: "2022 World Cup Golden Glove winner?", options: ["Courtois", "Emiliano Martínez", "Bounou", "Ederson"], fact: "The 'Dibu' saved penalties and huge chances all tournament." },
  },
  {
    id: "we-ref-woman-wc", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "من أول امرأة تحكم في مونديال رجال؟", options: ["ستيفاني فرابارت (بديلة)", "بيبي ميشيل", "يوشيمي ياماشيتا", "كاترين كينيدو"], fact: "فرابارت الفرنسية حكمت مباراة مونديال رجالية 2022 كأول امرأة أساسية." },
    en: { q: "First woman to referee a men's World Cup match?", options: ["Stephanie Frappart (reserve)", "Bibiana Steinhaus", "Yamashita", "Kateryna Monzul"], fact: "France's Frappart officiated at Qatar 2022 — a historic first." },
  },

  // ——— كأس العالم ———
  {
    id: "we-wc-golden-boot-2022", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "من هداف مونديال قطر 2022؟", options: ["مبابي (8 أهداف)", "ميسي (7)", "ألفاريز (4)", "جيرو (4)"], fact: "مبابي 8 أهداف في قطر — أول من يفعلها بعد رونالدو 2002." },
    en: { q: "2022 World Cup Golden Boot?", options: ["Mbappé (8 goals)", "Messi (7)", "Álvarez (4)", "Giroud (4)"], fact: "Mbappé's eight — the most in a single WC since Ronaldo 2002." },
  },
  {
    id: "we-wc-2014-messi-ballon", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "من فاز بالكرة الذهبية لمونديال 2014 رغم خسارة النهائي؟", options: ["مولر", "ميسي", "روبن", "نيمار"], fact: "ميسي أخذ الكرة الذهبية رغم هزيمة الأرجنتين — قرار نال جدلاً واسعاً." },
    en: { q: "Who won the 2014 Golden Ball despite losing the final?", options: ["Müller", "Messi", "Robben", "Neymar"], fact: "Messi took it despite Argentina's loss — a debated pick." },
  },
  {
    id: "we-wc-brazil-2002-run", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "كم مباراة فازت البرازيل بمونديال 2002؟", options: ["5", "6", "7 (الكل)", "6 وتعادل واحد"], fact: "سبعة انتصارات من سبعة — البرازيل الوحيدة بنسبة 100% منذ 1970." },
    en: { q: "Brazil's 2002 World Cup record?", options: ["5 wins", "6 wins", "7 wins (all)", "6 wins, a draw"], fact: "Seven from seven — the only 100% campaign since 1970." },
  },
  {
    id: "we-wc-spain-tiki2010", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "كم هدفاً سجلت إسبانيا في طريقها للقب 2010؟", options: ["12", "8", "14", "10"], fact: "ثمانية أهداف فقط — لكن الدفاع الحديدي كفى للتتويج الأول." },
    en: { q: "How many goals did Spain score on their 2010 run?", options: ["12", "8", "14", "10"], fact: "Just eight goals — the iron defence carried them." },
  },
  {
    id: "we-wc-1966-wembley", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "ما الجدل الأشهر في نهائي 1966؟", options: ["هدف هيرست الثالث على الخط", "تسديد شوارتز", "معركة الأرجنتين", "طرد كابتن الأرجنتين"], fact: "«على الخط أم لا؟» — القرار الأشهر في تاريخ التكنولوجيا قبل تكنولوجيتها." },
    en: { q: "The 1966 final's most debated moment?", options: ["Hurst's third goal over the line", "Schwarzer's save", "Argentina's brawl", "Their captain's red"], fact: "'Over the line or not?' — the pre-technology decision of the century." },
  },
  {
    id: "we-wc-1974-cruyff-turn", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "ضد من نفّذ كرويف التفافته الشهيرة 1974؟", options: ["ألمانيا", "البرازيل", "السويد", "الأرجنتين"], fact: "ضد السويد في دور المجموعات — الحركة صارت درساً في كل أكاديمية." },
    en: { q: "Against whom did Cruyff perform his iconic 1974 turn?", options: ["Germany", "Brazil", "Sweden", "Argentina"], fact: "Sweden in the group stage — the move became academy gospel." },
  },
  {
    id: "we-wc-1982-hungary-10", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "ما النتيجة القياسية الهزيمة الأكبر في مونديال؟", options: ["9-0", "10-1", "7-1", "8-0"], fact: "المجر 10-1 السلفادور 1982 — أكبر فارق أهداف بمونديال واحد." },
    en: { q: "The biggest World Cup win margin?", options: ["9-0", "10-1", "7-1", "8-0"], fact: "Hungary 10-1 El Salvador, 1982 — the WC's biggest scoreline." },
  },
  {
    id: "we-wc-1994-maradona", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "لماذا غاب مارادونا عن مونديال 1994 فجأة؟", options: ["منشطات (إيفدرا)", "إصابة الكاحل", "بطاقة حمراء", "قرار المدرب"], fact: "إيجابي الإيفدرا بعد مباراة نيجيريا — نهاية مؤلمة لمسيرته الدولية." },
    en: { q: "Why did Maradona exit the 1994 World Cup abruptly?", options: ["Doping (ephedrine)", "Ankle injury", "Red card", "Coach's decision"], fact: "Positive ephedrine test after Nigeria — a painful international end." },
  },
  {
    id: "we-wc-1998-final-zidane", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "كم هدفاً سجل زيدان في نهائي مونديال 1998؟", options: ["واحد", "اثنان برأسيتين", "ثلاثة", "صفر"], fact: "رأسيتان من ركلتين ثابتتين — قادت فرنسا للقب الأول على أرضها." },
    en: { q: "How many goals did Zidane score in the 1998 final?", options: ["One", "Two headers", "Three", "None"], fact: "Two headed goals from set pieces — France's first title." },
  },
  {
    id: "we-wc-2010-vuvuzela", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "ما الصوت الأيقوني لمونديال 2010؟", options: ["الطبول البرازيلية", "الصافرات", "الفوفوزيلا", "التصفيق"], fact: "الفوفوزيلا الجنوب أفريقية — أزعجت العالم كله وعرفته كل المشجعين." },
    en: { q: "The iconic sound of the 2010 World Cup?", options: ["Brazilian drums", "Whistles", "The vuvuzela", "Clapping"], fact: "The South African vuvuzela — the whole world heard it." },
  },
  {
    id: "we-wc-2006-final-venue", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "أين لُعب نهائي مونديال 2006؟", options: ["سان سيرو", "برلين — أولمبياشتيديون", "أليانز أرينا", "سيغنال إيدونا"], fact: "برلين — نهائي الليالي الإيطالية ومأساة زيدان الختامية." },
    en: { q: "Where was the 2006 final played?", options: ["San Siro", "Berlin's Olympiastadion", "Allianz Arena", "Signal Iduna"], fact: "Berlin — Italy's night and Zidane's tragic end." },
  },
  {
    id: "we-wc-2018-final-4goals", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "كم هدفاً سجل كرواتيا في مونديال 2018 كاممتوقعة خارج الوقت الأصلي؟", options: ["3 (كلها في وقت إضافي)", "2", "4", "1"], fact: "كرواتيا فازت بمباراتين في الأوقات الإضافية — أصحاب أعصاب حديدية." },
    en: { q: "How many knockout wins did Croatia 2018 seal in extra time?", options: ["Three", "Two", "Four", "One"], fact: "Three consecutive extra-time wins — nerves of steel." },
  },
  {
    id: "we-wc-2022-first-goal", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "من سجل أول هدف في مونديال قطر 2022؟", options: ["صالح الشهري", "إينر مارتينيز (ضد النفس)", "فالفيردي", "كين"], fact: "الإكوادوري فيلرتون إستيفان سجل في سقوط الإكوادور ضده — أغرب افتتاح." },
    en: { q: "Who scored the opening goal of Qatar 2022?", options: ["Al-Shehri", "Ecuador's Valencia", "Valverde", "Kane"], fact: "Ecuador's Enner Valencia opened the tournament." },
  },
  {
    id: "we-wc-brazil-1958-17", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "كم عاماً كان عمر بيليه في نهائي 1958؟", options: ["17", "19", "21", "16"], fact: "17 عاماً و249 يوماً — أصغر لاعب يسجل في نهائي مونديال حتى اليوم." },
    en: { q: "Pelé's age in the 1958 final?", options: ["17", "19", "21", "16"], fact: "17 years 249 days — still the youngest final scorer." },
  },
  {
    id: "we-wc-uruguay-2titles", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "كم مونديال فازت أوروغواي؟", options: ["واحد", "اثنان", "ثلاثة", "أربعة"], fact: "1930 كمضيفة و1950 في الماراكاتسو — القوة التاريخية الصغيرة." },
    en: { q: "How many World Cups has Uruguay won?", options: ["One", "Two", "Three", "Four"], fact: "1930 at home and 1950's Maracanaço — small nation, huge history." },
  },
  {
    id: "we-wc-italy-4titles", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "كم مونديال فازت إيطاليا؟", options: ["ثلاثة", "أربعة", "خمسة", "اثنان"], fact: "1934 و1938 و1982 و2006 — ثاني أكثر الأمة تتويجاً بعد البرازيل." },
    en: { q: "How many World Cups has Italy won?", options: ["Three", "Four", "Five", "Two"], fact: "1934, 1938, 1982, 2006 — second only to Brazil." },
  },
  {
    id: "we-wc-germany-4titles", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "كم مونديال فازت ألمانيا؟", options: ["ثلاثة", "أربعة", "خمسة", "اثنان"], fact: "1954 و1974 و1990 و2014 — مع معجزة برن الأسطورية." },
    en: { q: "How many World Cups has Germany won?", options: ["Three", "Four", "Five", "Two"], fact: "1954, 1974, 1990, 2014 — including the Miracle of Bern." },
  },
  {
    id: "we-wc-france-2titles", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "كم مونديال فازت فرنسا؟", options: ["اثنان", "ثلاثة", "واحد", "أربعة"], fact: "1998 على أرضها و2018 في روسيا — جيل ذهبي مزدوج." },
    en: { q: "How many World Cups has France won?", options: ["Two", "Three", "One", "Four"], fact: "1998 at home and 2018 in Russia — twin golden generations." },
  },
  {
    id: "we-wc-england-1", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "كم مونديال فازت إنجلترا؟", options: ["اثنان", "ثلاثة", "واحد", "صفر"], fact: "1966 على ويمبلي — الوحيدة حتى الآن رغم تاريخ النجم." },
    en: { q: "How many World Cups has England won?", options: ["Two", "Three", "One", "None"], fact: "1966 at Wembley — still their only crown." },
  },
  {
    id: "we-wc-spain-1", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "كم مونديال فازت إسبانيا؟", options: ["اثنان", "واحد", "ثلاثة", "صفر"], fact: "2010 في جنوب أفريقيا — بعد نهائي مثير ضد هولندا." },
    en: { q: "How many World Cups has Spain won?", options: ["Two", "One", "Three", "None"], fact: "2010 in South Africa — after a heated final vs Holland." },
  },
  {
    id: "we-wc-argentina-3", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "كم مونديال فازت الأرجنتين حتى 2022؟", options: ["اثنان", "أربعة", "ثلاثة", "خمسة"], fact: "1978 و1986 و2022 — ومن قطر عاد ميسي ليكمل الحكاية." },
    en: { q: "How many World Cups for Argentina until 2022?", options: ["Two", "Four", "Three", "Five"], fact: "1978, 1986, and 2022 — Messi completed the story." },
  },
  {
    id: "we-wc-netherlands-0", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "كم نهائي مونديال خسرت هولندا؟", options: ["ثلاثة", "واحد", "اثنان", "أربعة"], fact: "1974 و1978 و2010 — ثلاثة نهائيات بلا لقب، أشهر «أجمل بلا كأس»." },
    en: { q: "How many World Cup finals has the Netherlands lost?", options: ["Three", "One", "Two", "Four"], fact: "1974, 1978, 2010 — three finals, zero titles." },
  },
  {
    id: "we-wc-hungary-golden", category: "worldcup", difficulty: "hard", answer: 1,
    ar: { q: "ما اسم الفريق المجري الذي لم يخسر 32 مباراة متتالية (1950-54)؟", options: ["الفريق الحديدي", "المجر الذهبية — بوشكاش وكوتشيس", "فريق 1938", "القوة الشرقية"], fact: "«المجر الذهبية» هزمت إنجلترا 6-3 في ويمبلي — أول فريق أجنبي يفعلها." },
    en: { q: "Hungary's unbeaten 1950-54 side was called…?", options: ["The Iron Team", "The Golden Team — Puskás & Kocsis", "The 1938 side", "Eastern Force"], fact: "The Magyars beat England 6-3 at Wembley — a first for visitors." },
  },

  // ——— الأندية ———
  {
    id: "we-ucl-most-titles", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "من أكثر نادٍ تحقيقاً لدوري الأبطال؟", options: ["ريال مدريد (14+)", "ميلان (7)", "بايرن (6)", "ليفربول (6)"], fact: "ريال مدريد ملك البطولة — أكثر من ضعف أي منافس." },
    en: { q: "Most Champions League titles?", options: ["Real Madrid (14+)", "Milan (7)", "Bayern (6)", "Liverpool (6)"], fact: "Real Madrid rule Europe — more than double anyone else." },
  },
  {
    id: "we-premier-most", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "من أكثر الأندية فوزاً بالبريميرليج الحديث (منذ 1992)؟", options: ["ليفربول", "مانشستر يونايتد (13)", "أرسنال", "تشيلسي"], fact: "يونايتد 13 لقباً بريميرليج — زعامة فيرجسون الذهبية." },
    en: { q: "Most Premier League titles since 1992?", options: ["Liverpool", "Manchester United (13)", "Arsenal", "Chelsea"], fact: "United's 13 — the Ferguson golden era." },
  },
  {
    id: "we-la-liga-club-most", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "من أكثر الأندية لقباً في تاريخ الليجا؟", options: ["ريال مدريد", "برشلونة", "أتلتيكو", "فالنسيا"], fact: "ريال مدريد يتصدّر برصيد تجاوز 35 لقباً على حساب برشلونة." },
    en: { q: "Most La Liga titles?", options: ["Real Madrid", "Barcelona", "Atlético", "Valencia"], fact: "Real Madrid lead with 35+ over Barcelona." },
  },
  {
    id: "we-serie-club-most", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "من أكثر الأندية لقباً في الكالتشيو؟", options: ["ميلان", "إنتر", "يوفنتوس", "جينوفا"], fact: "يوفنتوس السيدة العجوز — 36+ سكوديتو." },
    en: { q: "Most Serie A titles?", options: ["Milan", "Inter", "Juventus", "Genoa"], fact: "Juventus, the Old Lady, with 36+." },
  },
  {
    id: "we-bundes-club-most", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "من أكثر الأندية لقباً في البوندسليجا؟", options: ["دورتموند", "بايرن ميونخ", "مونشنغلادباخ", "فيردر"], fact: "بايرن أكثر من 30 لقباً — هيمنة لا مثيل لها." },
    en: { q: "Most Bundesliga titles?", options: ["Dortmund", "Bayern Munich", "Gladbach", "Werder"], fact: "Bayern's 30+ — unmatched dominance." },
  },
  {
    id: "we-ligue1-most", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "من أكثر الأندية لقباً في الليج 1 الفرنسي؟", options: ["سانت إتيان وباريس (10)", "مارسيليا", "موناكو", "ليون"], fact: "سانت إتيان تاريخياً، وPSG حاق به بـ10 لقوب في عشر سنوات." },
    en: { q: "Most Ligue 1 titles?", options: ["Saint-Étienne & PSG (10)", "Marseille", "Monaco", "Lyon"], fact: "Saint-Étienne historically; PSG caught up in a decade." },
  },
  {
    id: "we-eredivisie-most", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من أكثر الأندية لقباً في الهولندية؟", options: ["فينورد", "أياكس (36)", "PSV", "ألكمار"], fact: "أياكس أمستردام — المدرسة الهولندية الكلاسيكية." },
    en: { q: "Most Eredivisie titles?", options: ["Feyenoord", "Ajax (36)", "PSV", "AZ"], fact: "Ajax Amsterdam — the classic Dutch school." },
  },
  {
    id: "we-primeira-most", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "من أكثر الأندية لقباً في البرتغال؟", options: ["سبورتينغ", "بنفيكا", "بورتو", "براغا"], fact: "بنفيكا 38 لقباً — بورتو خلفه بقليل في ديربي عريق." },
    en: { q: "Most Portuguese Primeira titles?", options: ["Sporting", "Benfica", "Porto", "Braga"], fact: "Benfica's 38 — Porto close behind in a fierce rivalry." },
  },
  {
    id: "we-liverpool-6", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "كم أبطال أوروبا فاز ليفربول؟", options: ["5", "6", "7", "4"], fact: "ستة ألقاب: 1977، 1978، 1981، 1984، 2005، 2019." },
    en: { q: "How many European Cups for Liverpool?", options: ["5", "6", "7", "4"], fact: "Six: 1977, 1978, 1981, 1984, 2005, 2019." },
  },
  {
    id: "we-bayern-6", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "كم أبطال أوروبا فاز بايرن؟", options: ["5", "4", "6", "7"], fact: "ستة ألقاب — أحدثها 2020 بالثلاثية الثانية." },
    en: { q: "How many European Cups for Bayern?", options: ["5", "4", "6", "7"], fact: "Six — the latest in their 2020 treble." },
  },
  {
    id: "we-milan-7", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "كم أبطال أوروبا فاز ميلان؟", options: ["7", "6", "5", "8"], fact: "سبعة — ثاني أكثر نادٍ تتويجاً بعد ريال مدريد." },
    en: { q: "How many European Cups for AC Milan?", options: ["7", "6", "5", "8"], fact: "Seven — second only to Real Madrid." },
  },
  {
    id: "we-barca-5", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "كم أبطال أوروبا فاز برشلونة؟", options: ["4", "5", "6", "3"], fact: "خمسة: 1992 و2006 و2009 و2011 و2015." },
    en: { q: "How many Champions League titles for Barcelona?", options: ["4", "5", "6", "3"], fact: "Five: 1992, 2006, 2009, 2011, 2015." },
  },
  {
    id: "we-inter-3", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "كم أبطال أوروبا فاز إنتر؟", options: ["3", "4", "2", "5"], fact: "1965 و1966 (عصر هيريرا) و2010 بالثلاثية مع مورينيو." },
    en: { q: "How many European Cups for Inter?", options: ["3", "4", "2", "5"], fact: "1965, 1966 (Herrera era), and 2010's Mourinho treble." },
  },
  {
    id: "we-united-3", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "كم أبطال أوروبا فاز مانشستر يونايتد؟", options: ["2", "3", "4", "5"], fact: "1968 (أول إنجليزي) و1999 و2008 — من بستبي إلى موسكو." },
    en: { q: "How many European Cups for Manchester United?", options: ["2", "3", "4", "5"], fact: "1968 (England's first), 1999, 2008." },
  },
  {
    id: "we-juventus-2", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "كم أبطال أوروبا فاز يوفنتوس؟", options: ["2", "3", "4", "1"], fact: "1985 و1996 — رغم نهائيات خاسرة كثيرة (7 خسائر قياسية)." },
    en: { q: "How many European Cups for Juventus?", options: ["2", "3", "4", "1"], fact: "1985 and 1996 — despite a record seven final losses." },
  },
  {
    id: "we-chelsea-2", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "كم أبطال أوروبا فاز تشيلسي؟", options: ["1", "2", "3", "4"], fact: "2012 في ميونخ و2021 في بورتو — ليلتان تاريخيتان." },
    en: { q: "How many Champions League titles for Chelsea?", options: ["1", "2", "3", "4"], fact: "2012 in Munich and 2021 in Porto." },
  },
  {
    id: "we-aggro-atm-final", category: "clubs", difficulty: "hard", answer: 0,
    ar: { q: "كم نهائي أبطال خسر أتلتيكو مدريد أمام ريال مدريد؟", options: ["نهايتان (2014 و2016)", "نهاية واحدة", "ثلاث نهايات", "لم يصل"], fact: "خسر النهائيين المدينين ضد الجار — 2014 بالوقت الإضافي و2016 بالترجيح." },
    en: { q: "How many CL finals did Atlético lose to Real Madrid?", options: ["Two (2014 & 2016)", "One", "Three", "None"], fact: "Both city finals: 2014 in extra time, 2016 on penalties." },
  },
  {
    id: "we-arsenal-2006-final", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من خسر أرسنال نهائي الأبطال 2006؟", options: ["ميلان", "برشلونة", "ليفربول", "إنتر"], fact: "برشلونة قلبت النتيجة في باريس بعد قيادة أرسنال بهدف سول كامبل." },
    en: { q: "Who beat Arsenal in the 2006 CL final?", options: ["Milan", "Barcelona", "Liverpool", "Inter"], fact: "Barça came back in Paris after Campbell's opener." },
  },
  {
    id: "we-tottenham-final", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "من هزم توتنهام في نهائي الأبطال 2019؟", options: ["ليفربول", "سبارتا", "أياكس", "باريس"], fact: "ليفربول بركلة جزاء مبكرة صالحة — نهائي مدريدي إنجليزي في مدريد." },
    en: { q: "Who beat Spurs in the 2019 CL final?", options: ["Liverpool", "Ajax", "Barcelona", "PSG"], fact: "Liverpool via an early penalty — an all-English final in Madrid." },
  },
  {
    id: "we-marseille-93", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من أول فائز بنظام دوري الأبطال الجديد 1993؟", options: ["ميلان", "مارسيليا", "باريس", "أياكس"], fact: "أوم الفرنسي فاز بأول دوري أبطال حديث — بأسماء باسيل بولي وفوفو." },
    en: { q: "Who won the first modern Champions League in 1993?", options: ["Milan", "Marseille", "PSG", "Ajax"], fact: "OM claimed the rebranded competition's maiden title." },
  },
  {
    id: "we-ajax-4", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "كم أبطال أوروبا فاز أياكس؟", options: ["4", "3", "5", "6"], fact: "أربعة: 1971-1973 المتتالية (كرة شاملة) ثم 1995." },
    en: { q: "How many European Cups for Ajax?", options: ["4", "3", "5", "6"], fact: "Four: three straight 1971-73, then 1995." },
  },
  {
    id: "we-boca-libertadores", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "كم كأس ليبرتادوريس فاز بوكا جونيورز؟", options: ["4", "6", "7", "5"], fact: "ستة ألقاب — أحدثها 2007 بريكيلمي." },
    en: { q: "How many Libertadores for Boca Juniors?", options: ["4", "6", "7", "5"], fact: "Six — the latest with Riquelme in 2007." },
  },
  {
    id: "we-hilal-4-acl", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "من أكثر الأندية الآسيوية لقباً بدوري الأبطال؟", options: ["كاشيوا", "الهلال (4)", "أوراوا", "كووب ولفس"], fact: "الهلال زعيم آسيا — 4 ألقاب دوري أبطال آسيا." },
    en: { q: "Asia's most decorated ACL club?", options: ["Kashiwa", "Al-Hilal (4)", "Urawa", "Kawasaki"], fact: "Al-Hilal lead Asia with four AFC Champions League titles." },
  },
  {
    id: "we-nassr-ronaldo", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "لأي نادٍ سعودي انتقل كريستيانو رونالدو 2023؟", options: ["الاتحاد", "النصر", "الأهلي", "العين"], fact: "النصر استقبل كريستيانو وأشعل موجة النجوم العالمية للسعودية." },
    en: { q: "Which Saudi club signed Cristiano Ronaldo in 2023?", options: ["Ittihad", "Al-Nassr", "Al-Ahli", "Al-Ain"], fact: "Al-Nassr started the global star wave to Saudi football." },
  },
  {
    id: "we-benzema-ittihad", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "لأي نادٍ سعودي انتقل بنزيما 2023؟", options: ["الإتحاد", "الهلال", "النصر", "الشباب"], fact: "الاتحاد جدة — بطل الدوري حينها استقبل الحائز على الكرة الذهبية." },
    en: { q: "Which Saudi club signed Benzema in 2023?", options: ["Ittihad", "Al-Hilal", "Al-Nassr", "Al-Shabab"], fact: "Jeddah's Ittihad — then-reigning champions landed the Ballon d'Or winner." },
  },

  // ——— اللاعبون ———
  {
    id: "we-cristiano-goals", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من أول لاعب يصل 900 هدف رسمي في مسيرته؟", options: ["كريستيانو رونالدو", "ميسي", "بيليه (غير رسمي)", "روميلو"], fact: "كريستيانو تجاوز 900 هدف رسمي — رقم لم يبلغه أحد في العصر الحديث." },
    en: { q: "First player to 900 official career goals?", options: ["Cristiano Ronaldo", "Messi", "Pelé (unofficial)", "Romário"], fact: "Cristiano passed 900 official goals — unmatched in the modern era." },
  },
  {
    id: "we-messi-assists", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من صاحب أكثر التمريرات الحاسمة في تاريخ كرة القدم المسجل؟", options: ["كروس", "ميسي", "دي بروين", "رونالدينيو"], fact: "ميسي يتجاوز 380 تمريرة حاسمة — صانع أهداف الأزلي." },
    en: { q: "Most recorded assists in football history?", options: ["Kroos", "Messi", "De Bruyne", "Ronaldinho"], fact: "Messi passed 380 assists — the game's greatest creator." },
  },
  {
    id: "we-mbappe-worldcup-final-hat", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "من لاعب باريس سان جيرمان (حتى 2024) وقائد فرنسا؟", options: ["جريزمان", "مبابي", "كامافينغا", "توفين"], fact: "مبابي قاد فرنسا لنهائيي 2018 و2022 وأصبح قائد الديوك." },
    en: { q: "France's captain and PSG star (until 2024)?", options: ["Griezmann", "Mbappé", "Kamavinga", "Thuram"], fact: "Mbappé led France to back-to-back finals and took the armband." },
  },
  {
    id: "we-haaland-manchester", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من ابن لاعب مانشستر سيتي السابق ويدرس في إنجلترا؟", options: ["سون", "هالاند", "فودين", "بالمر"], fact: "هالاند ابن ألف-إنغه هالاند (لاعب سيتي السابق) — ومن هنا ارتباطه بإنجلترا." },
    en: { q: "Whose father played for Manchester City?", options: ["Son", "Haaland", "Foden", "Palmer"], fact: "Haaland's dad Alf-Inge played for City — hence the England link." },
  },
  {
    id: "we-vinicius-7", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "ما رقم قميص فينيسيوس جونيور في ريال مدريد؟", options: ["7", "9", "11", "10"], fact: "الرقم 7 الملكي — ورثه من كريستيانو وأمادو وأماريو." },
    en: { q: "Vinícius Júnior's Real Madrid shirt number?", options: ["7", "9", "11", "10"], fact: "The iconic royal 7 — following Cristiano's legacy." },
  },
  {
    id: "we-bellingham-5", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "ما رقم بيلينغهام في ريال مدريد؟", options: ["10", "5", "7", "22"], fact: "الرقم 5 — الرمزي مع زيدان سابقاً في ريال." },
    en: { q: "Bellingham's Real Madrid number?", options: ["10", "5", "7", "22"], fact: "The 5 — once Zidane's royal number." },
  },
  {
    id: "we-salah-record-liverpool", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من سجل 32 هدفاً في موسم بريميرليج من 38 مباراة؟", options: ["صلاح 2017-18", "كين 2017", "هالاند 2023", "أغويرو"], fact: "صلاح 32 هدفاً في 38 مباراة — رقم قياسي للموسم قبل هالاند (36 في 35)." },
    en: { q: "Who scored 32 in a 38-game Premier League season?", options: ["Salah 2017-18", "Kane 2017", "Haaland 2023", "Agüero"], fact: "Salah's 32 was the record until Haaland's 36-in-35." },
  },
  {
    id: "we-kdb-belgium", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من قائد بلجيكا وصانع ألعابها؟", options: ["لوكاكو", "كيفين دي بروين", "هازارد", "فيرتونغن"], fact: "دي بروين — عقل «الجيل الذهبي» البلجيكي." },
    en: { q: "Belgium's captain and chief creator?", options: ["Lukaku", "Kevin De Bruyne", "Hazard", "Vertonghen"], fact: "KDB — the brain of Belgium's golden generation." },
  },
  {
    id: "we-son-tottenham-captain", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "من قائد توتنهام بعد رحيل كين؟", options: ["سون هيونغ مين", "روميرو", "ماديسون", "فيسي"], fact: "سون الكوري — أصبح قائد السبيرز وقبطانهم الروحي." },
    en: { q: "Tottenham's captain after Kane's exit?", options: ["Son Heung-min", "Romero", "Maddison", "Vicario"], fact: "Son took the armband and the fans' hearts." },
  },
  {
    id: "we-neymar-77", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من هداف البرازيل التاريخي بعد بيليه ونيمار؟", options: ["ريفيلينو", "نيمار تجاوز رونالدو", "رونالدو", "ريفينو"], fact: "نيمار تجاوز رونالدو (62) ليصبح ثاني هداف برازيلي تاريخي." },
    en: { q: "Brazil's second all-time scorer?", options: ["Ronaldo", "Neymar passed Ronaldo", "Rivaldo", "Zico"], fact: "Neymar passed Ronaldo (62) for second behind Pelé." },
  },
  {
    id: "we-van-dijk-holland", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "من قائد هولندا وركيزة دفاع ليفربول؟", options: ["فيرجيل فان دايك", "دي ليخت", "أكé", "فريمني"], fact: "فان دايك — أحد أفضل مدافعي جيله وقائد الأورانجي." },
    en: { q: "Netherlands' captain and Liverpool's defensive rock?", options: ["Virgil van Dijk", "De Ligt", "Aké", "Dumfries"], fact: "Van Dijk — among his generation's best centre-backs." },
  },
  {
    id: "we-musiala-bayern", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من موهبة بايرن الألمانية الصاعدة بجنسيتين؟", options: ["فيرتل", "جمال موسيالا", "سان", "غوريتسكا"], fact: "موسيالا مولود لأب نيجيري وأم ألمانية — لعب لإنجلترا قبل ألمانيا." },
    en: { q: "Bayern's dual-national German wonderkid?", options: ["Wirtz", "Jamal Musiala", "Sané", "Goretzka"], fact: "Musiala (Nigerian father, German mother) even played for England's youth." },
  },
  {
    id: "we-saka-arsenal", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "من نجم أرسنال وإنجلترا الصاعد بجناح يمين؟", options: ["بوكايو ساكا", "راشفورد", "فودين", "جوردون"], fact: "ساكا «نجمة الشمال لندن» — صناعة لا ماسيا الأرسنالية." },
    en: { q: "Arsenal and England's right-wing star?", options: ["Bukayo Saka", "Rashford", "Foden", "Gordon"], fact: "Saka — Hale End's homegrown jewel." },
  },
  {
    id: "we-rodri-2024", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من فاز بالكرة الذهبية 2024؟", options: ["فينيسيوس", "رودري", "كارفاخال", "بيتشيس"], fact: "رودري وسط الميدان الإسباني — أول رقم 6 يفوز منذ سنوات." },
    en: { q: "Who won the 2024 Ballon d'Or?", options: ["Vinícius", "Rodri", "Carvajal", "Bellingham"], fact: "Rodri — the first pure No.6 winner in years." },
  },
  {
    id: "we-yamal-barca", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "من أصغر لاعب يسجل في تاريخ اليورو؟", options: ["لامين يامال", "جريزمان", "فيليكس", "غافي"], fact: "يامال 16 عاماً — وأصغر لاعب يلعب نهائي يورو ويفوزه." },
    en: { q: "Youngest scorer in Euro history?", options: ["Lamine Yamal", "Griezmann", "Félix", "Gavi"], fact: "Yamal at 16 — also the youngest in a Euro final." },
  },
  {
    id: "we-kane-bayern-trophy", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "هل فاز هاري كين بأول لقب له في مسيرته مع بايرن؟", options: ["نعم بالدوري 2024", "لا — انتظر حتى كأس السوبر", "فاز بالأبطال", "بلا ألقاب"], fact: "كين انتظر سنوات — ثم أخذ كأس السوبر الألماني أول غريم." },
    en: { q: "Did Harry Kane finally win his first trophy at Bayern?", options: ["Yes — the 2024 league", "Yes — the German Super Cup", "Yes — the UCL", "Not yet"], fact: "Kane's long wait ended with the German Super Cup." },
  },
  {
    id: "we-alisson-liverpool", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "من حارس ليفربول البرازيلي؟", options: ["أليسون بيكر", "إيدسون", "كورتوا", "أونانا"], fact: "أليسون — رأسية 100 دقيقة ضد وست بروم مثلت لحظة أسطورية لحارس." },
    en: { q: "Liverpool's Brazilian goalkeeper?", options: ["Alisson Becker", "Ederson", "Courtois", "Onana"], fact: "Alisson — even scored a famous 95th-minute header vs West Brom." },
  },
  {
    id: "we-ederson-pass", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من حارس مانشستر سيتي صاحب التمريرات الطويلة الدقيقة؟", options: ["أليسون", "إيدسون", "نايرلاند", "ستيل"], fact: "إيدسون — حارس بقدم لاعب وسط، سلاح سيتي في البناء." },
    en: { q: "Man City's long-passing goalkeeper?", options: ["Alisson", "Ederson", "Ortega", "Steele"], fact: "Ederson — a keeper with a midfielder's foot." },
  },
  {
    id: "we-bale-wales", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من هداف ويلز التاريخي؟", options: ["جاريث بيل", "غانتر بيل", "روبي سافاج", "أرون رامزي"], fact: "بيل قاد ويلز لنصف نهائي يورو 2016 وتأهل مونديال 2022 تاريخياً." },
    en: { q: "Wales' all-time top scorer?", options: ["Gareth Bale", "Ian Rush", "Craig Bellamy", "Aaron Ramsey"], fact: "Bale drove Wales to Euro 2016 semis and their first WC since 1958." },
  },
  {
    id: "we-ronaldinho-2005", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من فاز بالكرة الذهبية 2005 وهو برازيلي في برشلونة؟", options: ["كاكا", "رونالدينيو", "ريفالدو", "روماريو"], fact: "رونالدينيو 2005 — قلب سان سيرو لمصلحة البارسا رغم ملاعب ميلان." },
    en: { q: "The 2005 Ballon d'Or winner at Barcelona?", options: ["Kaká", "Ronaldinho", "Rivaldo", "Romário"], fact: "Ronaldinho — even Madrid fans applauded him at the Bernabéu." },
  },
  {
    id: "we-kaka-2007", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من آخر برازيلي (قبل فينيسيوس) فاز بالكرة الذهبية في ميلان؟", options: ["كاكا 2007", "رونالدينيو", "أدريانو", "باتيستا"], fact: "كاكا قاد ميلان للأبطال 2007 — آخر فائز غير أوروبي بالجائزة لسنوات." },
    en: { q: "The last Brazilian to win the Ballon d'Or (2007)?", options: ["Kaká", "Ronaldinho", "Adriano", "Batistuta"], fact: "Kaká's 2007 Milan heroics — a long-standing non-European last." },
  },
  {
    id: "we-modric-ballon-2018", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "كم كرة ذهبية فاز مودريتش؟", options: ["واحدة", "واحدة (2018)", "اثنتان", "صفر"], fact: "2018 — الوحيد الذي كسر احتكار ميسي-رونالدو في عقد كامل." },
    en: { q: "How many Ballon d'Or for Modrić?", options: ["One", "One (2018)", "Two", "None"], fact: "2018 — he alone broke the Messi-Ronaldo decade." },
  },
  {
    id: "we-suarez-liverpool-barca", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من انتقل من ليفربول لبرشلونة 2014 وسجل 25 هدفاً في أول موسم كامل؟", options: ["سواريز", "كوتينهو", "ماسييلاو", "ألبارو"], fact: "سواريز وصل بعد الحظر وتشكل MSN التاريخي مع ميسي ونيمار." },
    en: { q: "Who moved Liverpool → Barcelona in 2014 and hit 25 goals?", options: ["Suárez", "Coutinho", "Mascherano", "Malcom"], fact: "Suárez completed the historic MSN with Messi & Neymar." },
  },
  {
    id: "we-aguero-93-20", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من سجل هدف اللقب 93:20 لمدينة مانشستر 2012؟", options: ["تيفي", "سيرجيو أغويرو", "بالوتيلي", "ناسري"], fact: "«أغويرووو» — أشهر هدف في تاريخ البريميرليج، لقب بثوانٍ." },
    en: { q: "Who scored City's 93:20 title-winner in 2012?", options: ["Tevez", "Sergio Agüero", "Balotelli", "Nasri"], fact: "'AGUEROOOO' — the most dramatic PL title ever." },
  },
  {
    id: "we-henry-bergkamp", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من الهولندي الفنان في أرسنال؟", options: ["دينيس بيرغكامب", "روبن فان بيرسي", "مارك أوفرمارز", "كلارينس سيدورف"], fact: "بيرغكامب «الرجل الجليدي» — لمسته الأولى للكرة فن." },
    en: { q: "Arsenal's Dutch artist?", options: ["Dennis Bergkamp", "Van Persie", "Overmars", "Seedorf"], fact: "The 'Iceman' — his first touch was poetry." },
  },
  {
    id: "we-gerrard-istanbul", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من قاد ليفربول في معجزة إستنبول 2005؟", options: ["كاراغر", "ستيفن جيرارد", "ألونسو", "فولر"], fact: "جيرارد سجّل الهدف الأول للعودة ورفع الكأس لاحقاً — قائد الأسطورة." },
    en: { q: "Who captained Liverpool in Istanbul 2005?", options: ["Carragher", "Steven Gerrard", "Alonso", "Hamann"], fact: "Gerrard scored the comeback's opener and lifted the cup." },
  },
  {
    id: "we-terry-lampard", category: "players", difficulty: "medium", answer: 0,
    ar: { q: "من هداف تشيلسي التاريخي؟", options: ["فرانك لامبارد", "ديدييه دروغبا", "جون تيري", "إدين هازارد"], fact: "لامبارد 211 هدفاً — صانع الأرقام لوسط ميدان." },
    en: { q: "Chelsea's all-time top scorer?", options: ["Frank Lampard", "Drogba", "John Terry", "Hazard"], fact: "Lampard's 211 — a midfielder's scoring miracle." },
  },
  {
    id: "we-puyol-barca", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من قائد برشلونة المثالي في العصر الذهبي؟", options: ["تشافي", "كارلوس بويول", "بوسكيتس", "بيليتو"], fact: "بويول — الشعر المجعد والقلب العائد، قائد الثلاثية." },
    en: { q: "Barcelona's golden-era defensive captain?", options: ["Xavi", "Carles Puyol", "Busquets", "Piqué"], fact: "Puyol — the mane and the heart, treble captain." },
  },
  {
    id: "we-casillas-real", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "من حارس ريال مدريد الأسطوري إيكر؟", options: ["إيكر كاسياس", "بويول", "دييغو لوبيز", "نافاس"], fact: "كاسياس «سان إيكر» — أكثر حارس تتويجاً بألقاب دولية." },
    en: { q: "Real Madrid's legendary keeper Iker…?", options: ["Casillas", "Diego López", "Navas", "Courtois"], fact: "'San Iker' — the most decorated keeper of his era." },
  },
  {
    id: "we-rooney-united", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من هداف مانشستر يونايتد التاريخي؟", options: ["بوبي تشارلتون", "واين روني", "دينيس لو", "فان بيرسي"], fact: "روني 253 هدفاً — تجاوز تشارلتون وأصبح الأسطورة الأحدث." },
    en: { q: "Manchester United's all-time top scorer?", options: ["Bobby Charlton", "Wayne Rooney", "Denis Law", "Van Persie"], fact: "Rooney's 253 — passing Charlton to make modern history." },
  },
  {
    id: "we-drogba-chelsea", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "من أسطورة تشيلسي الإفريقية في النهائيات؟", options: ["ديدييه دروغبا", "إيتو", "صلاح", "أوسيمين"], fact: "دروغبا سجّل في 9 نهائيات — من قلب المدرج إلى الكؤوس." },
    en: { q: "Chelsea's iconic African finals hero?", options: ["Didier Drogba", "Eto'o", "Salah", "Osimhen"], fact: "Drogba scored in nine finals — big-game DNA." },
  },
  {
    id: "we-eto-titles", category: "players", difficulty: "hard", answer: 1,
    ar: { q: "كم مرة فاز صامويل إيتو بلقب أفضل لاعب أفريقي؟", options: ["مرتين", "أربع مرات", "ثلاث مرات", "خمس مرات"], fact: "إيتو أربعة جوائز — وهو الوحيد بثلاثية متتالية مع نادٍ إسباني." },
    en: { q: "How many African Player of the Year awards for Eto'o?", options: ["Two", "Four", "Three", "Five"], fact: "Four awards — plus back-to-back trebles in Spain." },
  },

  // ——— الأساطير ———
  {
    id: "we-pele-1000", category: "legends", difficulty: "medium", answer: 0,
    ar: { q: "من سجل «ألف هدف» في مسيرته (بما فيها الودية)؟", options: ["بيليه", "روماريتو", "ميسي", "فيرنك بوشكاش"], fact: "بيليه تجاوز 1000 هدف شاملاً الودية — رقم احتفالي لا رسمي." },
    en: { q: "Who reached '1,000 goals' (including friendlies)?", options: ["Pelé", "Romário", "Messi", "Puskás"], fact: "Pelé's 1,000+ counted friendlies — a celebratory, not official, tally." },
  },
  {
    id: "we-maradona-hand", category: "legends", difficulty: "easy", answer: 1,
    ar: { q: "ما اسم هدف مارادونا الشهير ضد إنجلترا 1986؟", options: ["هدف القرن", "يد الله", "هدف الميليناريوم", "الجسر"], fact: "«يد الله» في نفس المباراة التي سجل فيها «هدف القرن» — قطبان في شوط واحد." },
    en: { q: "Maradona's infamous 1986 goal vs England?", options: ["Goal of the Century", "Hand of God", "The Solo", "The Flick"], fact: "'Hand of God' — same match as his 'Goal of the Century'." },
  },
  {
    id: "we-cruyff-number14", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "لماذا اشتهر كرويف بالرقم 14؟", options: ["ارتداه خارج النظام في 1974", "لأنه قائد", "رقم ولادته", "لم يحب الأرقام"], fact: "كرويف رفض نظام الترقيم الثابت وطلب 14 — فصار أيقونته." },
    en: { q: "Why is Cruyff linked to number 14?", options: ["He chose it outside the system in 1974", "Captaincy", "Birth year", "He disliked numbers"], fact: "He broke the fixed-number rule, asked for 14 — it became his brand." },
  },
  {
    id: "we-beckenbauer-der", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "ما لقب فرانز بيكنباور؟", options: ["الفيلسوف", "القيصر", "العجن", "الجنرال"], fact: "«القيصر» — لأنه حكم الملعب كما يحكم القياصرة." },
    en: { q: "Franz Beckenbauer's nickname?", options: ["The Philosopher", "Der Kaiser", "The General", "The Professor"], fact: "'The Kaiser' — he ruled the pitch like an emperor." },
  },
  {
    id: "we-eusebio-benfica", category: "legends", difficulty: "medium", answer: 0,
    ar: { q: "من أسطورة بنفيكا البرتغالية الأفريقية المولد؟", options: ["أوزيبيو", "ماريو كولونا", "نونو غوميش", "رودريغو"], fact: "أوزيبيو من موزمبيق — هداف بنفيكا وأوروبا في الستينيات." },
    en: { q: "Benfica's Mozambique-born legend?", options: ["Eusébio", "Mário Coluna", "Nuno Gomes", "Rui Costa"], fact: "Eusébio — Benfica and Europe's scoring king of the 60s." },
  },
  {
    id: "we-puskas-left", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "ما لقب فيرينك بوشكاش؟", options: ["الجالوبينو", "الرائد الجالوب", "العميد", "القائد"], fact: "«الرائد الجالوب» — ضابط في الجيش المجري وأصحاب اليسرى الذهبية." },
    en: { q: "Ferenc Puskás's nickname?", options: ["The Galloper", "The Galloping Major", "The Dean", "The Commander"], fact: "'The Galloping Major' — Hungarian army officer, golden left foot." },
  },
  {
    id: "we-di-stefano-5cups", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "كم كأس أوروبا متتالية فاز دي ستيفانو مع ريال؟", options: ["خمسة (1956-60)", "ثلاثة", "أربعة", "ستة"], fact: "خمسة نهائيات متتالية وسجل في كل منها — إنجاز لم يُكرر." },
    en: { q: "How many straight European Cups for Di Stéfano?", options: ["Five (1956-60)", "Three", "Four", "Six"], fact: "Five finals, scored in every one — never repeated." },
  },
  {
    id: "we-garrincha-bent", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "ما لقب غارينشا البرازيلي؟", options: ["السهم", "الفرحة / الطائر المرح", "الظل", "الصمت"], fact: "«الفرحة» — لعب بساقين ملتويتين وأصبح أبرع مراوغ في التاريخ." },
    en: { q: "Garrincha's nickname?", options: ["The Arrow", "The Joy of the People", "The Shadow", "The Silent"], fact: "Born with bent legs, he became the game's greatest dribbler." },
  },
  {
    id: "we-yashin-black", category: "legends", difficulty: "easy", answer: 0,
    ar: { q: "من الحارس الوحيد الفائز بالكرة الذهبية؟", options: ["ليف ياشين", "بوفون", "زوف", "نوير"], fact: "ياشين السوفييتي 1963 — «العنكبوت الأسود» الوحيد بالجائزة." },
    en: { q: "The only goalkeeper to win the Ballon d'Or?", options: ["Lev Yashin", "Buffon", "Zoff", "Neuer"], fact: "USSR's Yashin, 1963 — the 'Black Spider' stands alone." },
  },
  {
    id: "we-bobby-moore-66", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "من قائد إنجلترا في مونديال 1966؟", options: ["بوبي تشارلتون", "بوبي مور", "جيوف هيرست", "غوردون بانكس"], fact: "بوبي مور — المدافع الأنيق الذي رفع الكأس من الملكة." },
    en: { q: "England's captain in 1966?", options: ["Bobby Charlton", "Bobby Moore", "Geoff Hurst", "Gordon Banks"], fact: "Bobby Moore — the elegant defender who took the Queen's trophy." },
  },
  {
    id: "we-gordon-banks-save", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "أشهر تصدٍ في تاريخ المونديال كان ضد رأسية من؟", options: ["بيليه (بانكس 1970)", "روبيرتو", "مولر", "كرويف"], fact: "بانكس صدّ رأسية بيليه المحققة في 1970 — «أعظم تصدٍ في التاريخ»." },
    en: { q: "The greatest World Cup save denied whom?", options: ["Pelé (Banks 1970)", "Riva", "Müller", "Cruyff"], fact: "Banks somehow kept out Pelé's certain header in 1970." },
  },
  {
    id: "we-ferenc-puskas-award", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "جائزة بوشكاش تُمنح لأفضل ماذا؟", options: ["حارس", "هدف", "صانع ألعاب", "مدرب"], fact: "جائزة أفضل هدف في العالم سنوياً — من 2009 باسم بوشكاش." },
    en: { q: "The Puskás Award honours the best…?", options: ["Keeper", "Goal", "Playmaker", "Coach"], fact: "Goal of the Year, awarded since 2009 in his name." },
  },
  {
    id: "we-just-fontaine-13", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "من سجل 13 هدفاً في مونديال واحد (رقم قياسي)؟", options: ["جاست فونتين 1958", "مولر", "كولوفا", "بيليه"], fact: "فونتين الفرنسي 1958 — 13 هدفاً في 6 مباريات، رقم ما زال قائماً." },
    en: { q: "Who scored 13 goals in a single World Cup?", options: ["Just Fontaine 1958", "Müller", "Kocsis", "Pelé"], fact: "France's Fontaine, 1958: 13 in six matches — still unmatched." },
  },
  {
    id: "we-alberto-goal", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من سجل أشهر هدف جماعي في نهائي مونديال 1970؟", options: ["جايرزينهو", "كارلوس ألبرتو", "بيليه", "توستاو"], fact: "هدف كارلوس ألبرتو الختامي في نهائي 1970 — تسديدة مثالية لخط كامل." },
    en: { q: "Who finished the famous 1970 final team move?", options: ["Jairzinho", "Carlos Alberto", "Pelé", "Tostão"], fact: "Captain Carlos Alberto's thunderbolt — football's greatest team goal." },
  },
  {
    id: "we-matthaus-5wc", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "من أول لاعب يشارك في خمسة مونديالات؟", options: ["لوثار ماتيوس", "ميسي", "كريستيانو", "بوفون"], fact: "ماتيوس الألماني 1982-1998 — ورفع الكأس 1990 كقائد." },
    en: { q: "First player at five World Cups?", options: ["Lothar Matthäus", "Messi", "Cristiano", "Buffon"], fact: "Germany's Matthäus, 1982-98 — lifting the 1990 cup as captain." },
  },
  {
    id: "we-rivaldo-volley", category: "legends", difficulty: "medium", answer: 0,
    ar: { q: "من سجل ثلاثية برازيلية بلافيوليس 2002 بركلات طويلة؟", options: ["ريفالدو", "رونالدينيو", "كاكا", "أموروسو"], fact: "ريفالدو — يساره الشهير ثني الكرات من خارج المنطقة." },
    en: { q: "Who scored Brazil's iconic long-range goals in 2002?", options: ["Rivaldo", "Ronaldinho", "Kaká", "Amoroso"], fact: "Rivaldo's golden left foot bent everything from distance." },
  },
  {
    id: "we-nedved-ballon", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من التشيكي الفائز بالكرة الذهبية 2003؟", options: ["روزيتي", "بافيل نيدفيد", "روسيسكي", "كولر"], fact: "نيدفيد «المحرك التشيكي» — قاد يوفنتوس لنهائي الأبطال 2003." },
    en: { q: "The Czech who won the 2003 Ballon d'Or?", options: ["Rosický", "Pavel Nedvěd", "Rezníček", "Koller"], fact: "Nedvěd — the Czech engine driving Juve to the 2003 final." },
  },
  {
    id: "we-shevchenko-2004", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "من الأوكراني الفائز بالكرة الذهبية 2004؟", options: ["أندريه شيفتشينكو", "ريفالدو", "فورونين", "تيموشينكو"], fact: "شيفتشينكو قاد ميلان للسكوديتو وأصبح أول أوكراني بالجائزة." },
    en: { q: "Ukraine's 2004 Ballon d'Or winner?", options: ["Andriy Shevchenko", "Rebrov", "Voronin", "Tymoshchuk"], fact: "Shevchenko's Milan title season — Ukraine's first winner." },
  },
  {
    id: "we-nedved-juve", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من المدافع الفرنسي الشهير بقميص «ميتس» في يوفنتوس؟", options: ["بلان", "ليلى ثورام", "ديسايي", "بلانك"], fact: "ثورام وديسايي — الحائط الفرنسي الذي حرس دفاع يوفنتوس بعد المونديال." },
    en: { q: "Juventus' French defensive wall post-1998?", options: ["Blanc", "Thuram & Desailly", "Blanc & Deschamps", "Petit"], fact: "Thuram and Desailly guarded the Old Lady's back line." },
  },
  {
    id: "we-inzaghi-offside", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "من المهاجم الإيطالي الشهير بـ«الخط التسلل الذكي»؟", options: ["فيليبو إنزاغي", "كريستيان فييري", "دلف بييرو", "توثيو"], fact: "إنزاغي «سوبر بيبو» — عاش على خط التسلل بحدس فريد." },
    en: { q: "Italy's offside-line genius striker?", options: ["Filippo Inzaghi", "Vieri", "Del Piero", "Totti"], fact: "'Super Pippo' lived on the shoulder of the last defender." },
  },

  // ——— الكرة العربية ———
  {
    id: "we-ahly-zamalek-derby", category: "arab", difficulty: "easy", answer: 0,
    ar: { q: "أي ديربي عربي يُعد الأقدم والأكثر جماهيرية؟", options: ["ديربي القاهرة (الأهلي-الزمالك)", "ديربي الرياض", "ديربي الدار البيضاء", "ديربي تونس"], fact: "ديربي القاهرة منذ 1917 — ملايين المتابعين في أفريقيا والشرق الأوسط." },
    en: { q: "Arab football's oldest, biggest derby?", options: ["Cairo Derby (Ahly-Zamalek)", "Riyadh Derby", "Casablanca Derby", "Tunis Derby"], fact: "Since 1917 — watched by millions across Africa and the Middle East." },
  },
  {
    id: "we-hilal-nassr-derby", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "ما اسم ديربي الرياض بين الهلال والنصر؟", options: ["ديربي جدة", "ديربي الرياض (الكلاسيكو السعودي)", "ديربي الشرقية", "ديربي الساحل"], fact: "أشهر ديربي سعودي — الجوكر الأخضر يشتعل عند لقاء العميد والزعيم." },
    en: { q: "Al-Hilal vs Al-Nassr's derby name?", options: ["Jeddah Derby", "Riyadh Derby", "Eastern Derby", "Coast Derby"], fact: "Saudi football's hottest fixture." },
  },
  {
    id: "we-itihad-black-yellow", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "من نادي «العميد» السعودي؟", options: ["الاتحاد", "الأهلي", "الشباب", "الوحدة"], fact: "الاتحاد جدة «العميد» — الأقدم والأعنف جماهيريةً في جدة." },
    en: { q: "Saudi club nicknamed 'The Dean'?", options: ["Ittihad", "Ahli", "Shabab", "Wehda"], fact: "Jeddah's Ittihad — the oldest and loudest in town." },
  },
  {
    id: "we-wydad-red", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "من نادي «الوداد» المغربي بمدرجه الأحمر؟", options: ["الرجاء", "الوداد البيضاوي", "الجيش الملكي", "المغرب الفاسي"], fact: "الوداد البيضاوي — الأحمر والأبيض ومالك كؤوس أفريقية." },
    en: { q: "Morocco's red-and-white Casablanca giant?", options: ["Raja", "Wydad AC", "FAR", "MAS"], fact: "Wydad — African champions multiple times." },
  },
  {
    id: "we-esperance-blood", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "من نادي «باب سويلة» التونسي الشهير؟", options: ["الترجي", "الصفاقسي", "النجم الساحلي", "الحمامات"], fact: "الترجي التونسي — «المخالب الدامية» ومالك أكبر جمهور في تونس." },
    en: { q: "Tunisia's Bab Souika giant?", options: ["Espérance", "CS Sfaxien", "Étoile", "Club Africain"], fact: "Espérance — Tunisia's best-supported club." },
  },
  {
    id: "we-algeria-1990-host", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "من استضاف وفاز بكأس أفريقيا 1990؟", options: ["نيجيريا", "الجزائر", "مصر", "الكاميرون"], fact: "الجزائر على أرضها — بجيل ماجر وبلومي وزيدان الجيل الصاعد." },
    en: { q: "Who hosted and won AFCON 1990?", options: ["Nigeria", "Algeria", "Egypt", "Cameroon"], fact: "Algeria at home — Madjer's golden generation." },
  },
  {
    id: "we-morocco-1970-host", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من أول دولة عربية تستضيف كأس العالم؟", options: ["لا أحد حتى 2022", "قطر 2022", "المغرب (محاولة 1994)", "مصر (محاولة 2010)"], fact: "قطر 2022 — أول عربي وأول دولة خليجية تستضيف المونديال." },
    en: { q: "First Arab nation to host a World Cup?", options: ["None before 2022", "Qatar 2022", "Morocco's 1994 bid", "Egypt's 2010 bid"], fact: "Qatar 2022 — the Arab world's first hosting." },
  },
  {
    id: "we-salah-egypt-2018", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "هل سجل صلاح في مونديال 2018؟", options: ["نعم — هدفان", "هدف واحد", "ثلاثة", "لم يسجل"], fact: "صلاح سجل ضد روسيا والسعودية — عاد من إصابة الكتف ليفعلها." },
    en: { q: "Did Salah score at the 2018 World Cup?", options: ["Yes — twice", "Once", "Three times", "No"], fact: "Goals vs Russia and Saudi Arabia — after recovering from a shoulder injury." },
  },
  {
    id: "we-mahrez-man-city", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "لأي نادٍ انضم رياض محرز من ليستر 2018؟", options: ["ليفربول", "مانشستر سيتي", "تشيلسي", "أرسنال"], fact: "محرز للسيتزنز — وساهم في خمسة ألقاب بريميرليج متتالية." },
    en: { q: "Mahrez left Leicester in 2018 for…?", options: ["Liverpool", "Manchester City", "Chelsea", "Arsenal"], fact: "City — winning multiple Premier League titles." },
  },
  {
    id: "we-osimhen-nigeria", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "من نجم نابولي النيجيري صاحب الحذاء الذهبي الإيطالي 2023؟", options: ["فيكتور أوسيمين", "أوكونكو", "تشوكوو", "دياوزوبا"], fact: "أوسيمين قاد نابولي لأول سكوديتو منذ 1990 — 26 هدفاً." },
    en: { q: "Napoli's Nigerian Serie A top scorer of 2023?", options: ["Victor Osimhen", "Okonkwo", "Chukwu", "Diazzopa"], fact: "Osimhen's 26 goals drove Napoli's first Scudetto since 1990." },
  },
  {
    id: "we-hakimi-psg-morocco", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "من الظهير المغربي في باريس سان جيرمان؟", options: ["زياش", "أشرف حكيمي", "بونو", "المنصوري"], fact: "حكيمي — أحد أسرع أظهرة العالم وصانع تاريخ المغرب." },
    en: { q: "Morocco's PSG right-back?", options: ["Ziyech", "Achraf Hakimi", "Bounou", "El Mansouri"], fact: "Hakimi — among the world's fastest full-backs." },
  },
  {
    id: "we-bounou-morocco", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "من حارس المغرب بطل القفازات في مونديال 2022؟", options: ["ياسين بونو", "المنصوري", "أمين", "شقيري"], fact: "بونو «بونو» — تصدى لترجيحات إسبانيا وحرس الشباك في النصف الأول." },
    en: { q: "Morocco's heroic 2022 goalkeeper?", options: ["Yassine Bounou", "El Mansouri", "Amine", "Chikri"], fact: "'Bono' saved Spain's penalties and kept a historic clean-sheet run." },
  },
  {
    id: "we-saudi-2022-argentina", category: "arab", difficulty: "easy", answer: 1,
    ar: { q: "من هزم الأرجنتين في مونديال قطر؟", options: ["المغرب", "السعودية", "الجزائر", "تونس"], fact: "الأخضر السعودي 2-1 — أعظم مفاجأة في المونديال بأكمله." },
    en: { q: "Who stunned Argentina at Qatar 2022?", options: ["Morocco", "Saudi Arabia", "Algeria", "Tunisia"], fact: "The Green Falcons 2-1 — the tournament's biggest shock." },
  },
  {
    id: "we-majed-alnassr", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "من «سفير الملوك» في الكرة السعودية؟", options: ["سعيد العويران", "ماجد عبدالله", "سامي الجابر", "ياسر القحطاني"], fact: "ماجد عبدالله لعب 21 عاماً للنصر فقط — أيقونة خليجية." },
    en: { q: "Saudi football's 'Kings Ambassador'?", options: ["Al-Owairan", "Majed Abdullah", "Al-Jaber", "Al-Qahtani"], fact: "Majed: 21 years at Al-Nassr — a Gulf icon." },
  },
  {
    id: "we-zamalek-white", category: "arab", difficulty: "easy", answer: 0,
    ar: { q: "ما لقب الزمالك المصري؟", options: ["القلعة البيضاء", "القلعة الحمراء", "الأحمر", "السماوي"], fact: "«القلعة البيضاء» — ثاني أكثر الأندية أفريقية تتويجاً." },
    en: { q: "Zamalek's nickname?", options: ["The White Castle", "The Red Castle", "The Reds", "The Sky Blues"], fact: "The White Castle — Africa's second-most decorated club." },
  },
  {
    id: "we-iraq-2007-captain", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من قائد العراق في لقب كأس آسيا 2007؟", options: ["أحمد راضي", "يونس محمود", "ناشات أكرم", "حوار ملا"], fact: "يونس محمود — قاد الأسود لأسطورة كأس آسيا 2007 وسجل الهدف الحاسم." },
    en: { q: "Iraq's 2007 Asian Cup-winning captain?", options: ["Ahmed Radhi", "Younis Mahmoud", "Nashat Akram", "Hawar Mulla"], fact: "Younis lifted the cup and scored the decisive goal." },
  },
  {
    id: "we-kuwait-1980-host", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "من استضاف وكسب كأس آسيا 1980؟", options: ["الكويت", "العراق", "قطر", "البحرين"], fact: "الكويت على أرضها — لقب خليجي تاريخي واحد في آسيا." },
    en: { q: "Who hosted and won the 1980 Asian Cup?", options: ["Kuwait", "Iraq", "Qatar", "Bahrain"], fact: "Kuwait at home — a historic Gulf Asian crown." },
  },
  {
    id: "we-oman-gulf-first", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من فاز بكأس الخليج العربي للمرة الأولى في 2009؟", options: ["الإمارات", "عُمان", "البحرين", "الكويت"], fact: "عُمان فازت بأول خليجي لها في مسقط — جيل ذهبي إقليمي." },
    en: { q: "Who won their first Gulf Cup in 2009?", options: ["UAE", "Oman", "Bahrain", "Kuwait"], fact: "Oman claimed it at home in Muscat." },
  },
  {
    id: "we-bahrain-gulf", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "من فاز بكأس الخليج 2019 (الخليجي 24)؟", options: ["البحرين", "السعودية", "عُمان", "قطر"], fact: "البحرين فازت بأول لقب لها في الدوحة — المفاجأة الخليجية." },
    en: { q: "Who won the 2019 Gulf Cup (24th edition)?", options: ["Bahrain", "Saudi Arabia", "Oman", "Qatar"], fact: "Bahrain's first title, won in Doha — a Gulf surprise." },
  },
];
