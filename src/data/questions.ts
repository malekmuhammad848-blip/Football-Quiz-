/** ============================================================
 *  Question Bank — بنك أسئلة ثنائي اللغة مع فئات وصعوبات
 *  كل سؤال له id ثابت (للسجل والتحليلات) وفئة وصعوبة.
 *  ============================================================ */

import type { Question } from "../domain/types";

export const QUESTIONS: Question[] = [
  {
    id: "wc-2022-winner",
    category: "worldcup",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "من فاز بكأس العالم 2022؟",
      options: ["البرازيل", "الأرجنتين", "فرنسا", "ألمانيا"],
      fact: "الأرجنتين فازت في قطر بعد ركلات الترجيح ضد فرنسا في نهائي يُعد من الأعظم على الإطلاق.",
    },
    en: {
      q: "Who won the 2022 World Cup?",
      options: ["Brazil", "Argentina", "France", "Germany"],
      fact: "Argentina won in Qatar after a penalty shootout against France — a final many call the greatest ever.",
    },
  },
  {
    id: "royal-nickname",
    category: "clubs",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "أي نادٍ يُلقَّب بـ«الملكي»؟",
      options: ["برشلونة", "ريال مدريد", "بايرن ميونخ", "أياكس"],
      fact: "ريال مدريد هو الأكثر تحقيقًا لدوري أبطال أوروبا بفارق كبير عن أي نادٍ آخر.",
    },
    en: {
      q: "Which club is nicknamed \"The Royal\"?",
      options: ["Barcelona", "Real Madrid", "Bayern Munich", "Ajax"],
      fact: "Real Madrid holds the record for most European Cup / Champions League titles by a wide margin.",
    },
  },
  {
    id: "players-count",
    category: "history",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "كم عدد لاعبي الفريق داخل الملعب؟",
      options: ["9", "10", "11", "12"],
      fact: "الفريق يتكوّن من 11 لاعبًا بينهم حارس المرمى.",
    },
    en: {
      q: "How many players does a team field on the pitch?",
      options: ["9", "10", "11", "12"],
      fact: "Each team fields 11 players, including the goalkeeper.",
    },
  },
  {
    id: "first-worldcup",
    category: "worldcup",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي دولة استضاف أول كأس عالم عام 1930؟",
      options: ["أوروغواي", "البرازيل", "إيطاليا", "فرنسا"],
      fact: "أوروغواي استضاف وأيضًا فاز بأول نسخة عام 1930 على أرضها.",
    },
    en: {
      q: "Which country hosted the first World Cup in 1930?",
      options: ["Uruguay", "Brazil", "Italy", "France"],
      fact: "Uruguay hosted — and won — the inaugural 1930 World Cup on home soil.",
    },
  },
  {
    id: "pele-black-pearl",
    category: "legends",
    difficulty: "medium",
    answer: 2,
    ar: {
      q: "من هو اللاعب الملقب بـ«الجوهرة السوداء»؟",
      options: ["مارادونا", "كرويف", "بيليه", "أوزيبيو"],
      fact: "بيليه الأسطورة البرازيلية، الوحيد الذي فاز بكأس العالم 3 مرات (1958، 1962، 1970).",
    },
    en: {
      q: "Which player is nicknamed \"The Black Pearl\"?",
      options: ["Maradona", "Cruyff", "Pelé", "Eusébio"],
      fact: "Brazil's Pelé is the only player to win three World Cups (1958, 1962, 1970).",
    },
  },
  {
    id: "red-card-max",
    category: "history",
    difficulty: "medium",
    answer: 1,
    ar: {
      q: "كم بطاقة حمراء يمكن أن يراهن اللاعب الواحد في مباراة واحدة رسميًا؟",
      options: ["بطاقة واحدة", "بطاقتان", "ثلاث بطاقات", "بلا حد"],
      fact: "البطاقة الثانية للمرة الثانية تعني الطرد المباشر — فبطاقتان صفراوان = حمراء.",
    },
    en: {
      q: "How many yellow cards lead to a red card (sending off)?",
      options: ["One", "Two", "Three", "No limit"],
      fact: "A second yellow equals a red — the player is sent off immediately.",
    },
  },
  {
    id: "alhilal-asia",
    category: "arab",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "أي نادٍ عربي هو الأكثر تحقيقًا لدوري أبطال آسيا؟",
      options: ["الهلال", "الاتحاد", "السد", "الأهلي السعودي"],
      fact: "الهلال السعودي فاز بلقب أبطال آسيا 4 مرات — رقم قياسي قاري.",
    },
    en: {
      q: "Which Arab club has won the most AFC Champions League titles?",
      options: ["Al Hilal", "Al Ittihad", "Al Sadd", "Al Ahli"],
      fact: "Saudi Arabia's Al Hilal have won the AFC Champions League a record 4 times.",
    },
  },
  {
    id: "alahly-egypt",
    category: "arab",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "أي نادٍ مصري يُلقَّب بـ«القلعة الحمراء»؟",
      options: ["الزمالك", "الإسماعيلي", "الأهلي", "بيراميدز"],
      fact: "الأهلي المصري هو الأكثر تتويجًا بدوري أبطال أفريقيا في التاريخ.",
    },
    en: {
      q: "Which Egyptian club is nicknamed \"The Red Castle\"?",
      options: ["Zamalek", "Ismaily", "Al Ahly", "Pyramids"],
      fact: "Egypt's Al Ahly is the most successful club in African Champions League history.",
    },
  },
  {
    id: "cr7-ucl",
    category: "players",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "من هو الهداف دوري أبطال أوروبا التاريخي؟",
      options: ["ميسي", "كريستيانو رونالدو", "رأول", "ليفاندوفسكي"],
      fact: "كريستيانو رونالدو سجل أكثر من 140 هدفًا في دوري الأبطال — رقم لم يقترب منه أحد.",
    },
    en: {
      q: "Who is the all-time top scorer in the Champions League?",
      options: ["Messi", "Cristiano Ronaldo", "Raúl", "Lewandowski"],
      fact: "Cristiano Ronaldo scored over 140 Champions League goals — a record no one has come close to.",
    },
  },
  {
    id: "offside-basic",
    category: "history",
    difficulty: "easy",
    answer: 3,
    ar: {
      q: "متى يُحتسب التسلل على المهاجم؟",
      options: ["عند لمسه الكرة بذراعه", "عند ركضه بسرعة", "عند دخوله منطقة الجزاء", "عند تجاوزه آخر مدافع لحظة تمرير الكرة"],
      fact: "التسلل يحتسب لحظة تمرير الكرة، وليس لحظة استلامها.",
    },
    en: {
      q: "When is an attacker offside?",
      options: ["Handling the ball", "Running too fast", "Entering the box", "Beyond the last defender when the ball is passed"],
      fact: "Offside is judged at the moment the ball is played — not when it's received.",
    },
  },
  {
    id: "maracanazo",
    category: "worldcup",
    difficulty: "hard",
    answer: 2,
    ar: {
      q: "ما هو «الماراكانازو»؟",
      options: ["هدف من منتصف الملعب", "طرد 3 لاعبين في مباراة", "هزيمة البرازيل أمام أوروغواي 1950", "تأجيل نهائي بسبب المطر"],
      fact: "في 1950 خسرت البرازيل النهائي أمام أوروغواي على أرضها وبين 200 ألف متفرج — الصدمة الأكبر بتاريخ المونديال.",
    },
    en: {
      q: "What is the \"Maracanazo\"?",
      options: ["A halfway-line goal", "Three red cards in one match", "Brazil's 1950 loss to Uruguay", "A rain-postponed final"],
      fact: "In 1950 Brazil lost the decider to Uruguay at home before ~200,000 fans — the World Cup's biggest shock.",
    },
  },
  {
    id: "golden-boot-2022",
    category: "worldcup",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "من فاز بجائزة الهداف في مونديال 2022؟",
      options: ["كيليان مبابي", "ليونيل ميسي", "أوليفييه جيرو", "ريتشاليسون"],
      fact: "مبابي سجل 8 أهداف في قطر رغم خسارة فرنسا في النهائي.",
    },
    en: {
      q: "Who won the Golden Boot at the 2022 World Cup?",
      options: ["Kylian Mbappé", "Lionel Messi", "Olivier Giroud", "Richarlison"],
      fact: "Mbappé scored 8 goals in Qatar despite France losing the final.",
    },
  },
  {
    id: "camp-nou-capacity",
    category: "clubs",
    difficulty: "hard",
    answer: 1,
    ar: {
      q: "ما هو أكبر ملعب في أوروبا بالسعة؟",
      options: ["وينبلدون", "كامب نو", "سانتياغو برنابيو", "أليانز أرينا"],
      fact: "كامب نو استوعب أكثر من 99 ألف متفرج قبل تجديده — الأكبر في أوروبا.",
    },
    en: {
      q: "Which is Europe's largest stadium by capacity?",
      options: ["Wembley", "Camp Nou", "Santiago Bernabéu", "Allianz Arena"],
      fact: "Camp Nou held over 99,000 fans before its renovation — the largest in Europe.",
    },
  },
  {
    id: "carli-lloyd-half",
    category: "worldcup",
    difficulty: "hard",
    answer: 2,
    ar: {
      q: "من سجل ثلاثية في نهائي كأس العالم للسيدات 2015 من منتصف الملعب؟",
      options: ["ميغان رابينو", "أليكس مورغان", "كارلي لويد", "أليكسيا بوتيلاس"],
      fact: "كارلي لويد سجلت هاتريك في 16 دقيقة فقط في نهائي 2015 — منها هدف من منتصف الملعب.",
    },
    en: {
      q: "Who scored a 2015 Women's World Cup final hat-trick, including from halfway?",
      options: ["Megan Rapinoe", "Alex Morgan", "Carli Lloyd", "Aitana Bonmatí"],
      fact: "Carli Lloyd's hat-trick came in just 16 minutes of the 2015 final — with a halfway-line strike.",
    },
  },
  {
    id: "lewandowski-5min",
    category: "players",
    difficulty: "hard",
    answer: 0,
    ar: {
      q: "من سجل 5 أهداف في 9 دقائق فقط؟",
      options: ["روبرت ليفاندوفسكي", "لوكاكو", "هالاند", "بنزيما"],
      fact: "ليفاندوفسكي دخل بديلًا ضد فولفسبورغ 2015 وسجل خماسية في أسرع وقت في التاريخ.",
    },
    en: {
      q: "Who scored 5 goals in just 9 minutes?",
      options: ["Robert Lewandowski", "Lukaku", "Haaland", "Benzema"],
      fact: "Lewandowski came off the bench vs Wolfsburg in 2015 and scored five — the fastest ever.",
    },
  },
  {
    id: "johan-cruyff-turn",
    category: "legends",
    difficulty: "medium",
    answer: 3,
    ar: {
      q: "أي حركة أسطورية اشتهر بها يوهان كرويف في مونديال 1974؟",
      options: ["المقصية", "اللازو", "روليت مارسيليا", "دورة كرويف"],
      fact: "دورة كرويف (Cruyff Turn) ظهرت أول مرة ضد السويد 1974 وصارت أساسًا في كل مدرسة كرة.",
    },
    en: {
      q: "Which iconic skill did Johan Cruyff debut at the 1974 World Cup?",
      options: ["Elastico", "Rainbow flick", "Marseille turn", "Cruyff Turn"],
      fact: "The Cruyff Turn first appeared against Sweden in 1974 and is now taught worldwide.",
    },
  },
  {
    id: "zidane-headbutt",
    category: "legends",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "ماذا حدث في آخر مباراة رسمية لزيدان؟",
      options: ["سجل هاتريك", "رفع الكأس", "طُرد بضربة رأس", "أصيب مبكرًا"],
      fact: "في نهائي 2006 طُرد زيدان بضربة رأس لماتيراتزي — نهاية مهنية لا تُنسى.",
    },
    en: {
      q: "What happened in Zidane's final professional match?",
      options: ["He scored a hat-trick", "He lifted the trophy", "He was sent off for a headbutt", "He got injured early"],
      fact: "In the 2006 final Zidane was sent off for headbutting Materazzi — an unforgettable ending.",
    },
  },
  {
    id: "messi-copa-2021",
    category: "players",
    difficulty: "medium",
    answer: 1,
    ar: {
      q: "متى فاز ميسي بأول لقب دولي كبير مع الأرجنتين؟",
      options: ["مونديال 2014", "كوبا أمريكا 2021", "الفايناليسيما 2022", "أولمبياد 2008"],
      fact: "كوبا أمريكا 2021 ضد البرازيل في ماراكانا — أول ذهبية دولية لميسي مع الكبار.",
    },
    en: {
      q: "When did Messi win his first major senior title with Argentina?",
      options: ["2014 World Cup", "2021 Copa América", "2022 Finalissima", "2008 Olympics"],
      fact: "The 2021 Copa América at the Maracanã vs Brazil — Messi's first major international trophy.",
    },
  },
  {
    id: "manutd-treble",
    category: "clubs",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "أي نادٍ إنجليزي حقق الثلاثية التاريخية 1999؟",
      options: ["مانشستر يونايتد", "ليفربول", "تشيلسي", "آرسنال"],
      fact: "يونايتد جمع الدوري والكأس والأبطال في موسم واحد — إنجاز لم يتكرر لإنجليزي.",
    },
    en: {
      q: "Which English club completed the historic 1999 treble?",
      options: ["Manchester United", "Liverpool", "Chelsea", "Arsenal"],
      fact: "United won the league, FA Cup, and Champions League in one season — still unique for England.",
    },
  },
  {
    id: "bayern-bundesliga",
    category: "clubs",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "أي نادٍ هو الأكثر تحقيقًا للبوندسليجا الألمانية؟",
      options: ["دورتموند", "بايرن ميونخ", "شالكه", " Leverkusen"],
      fact: "بايرن فاز بالبوندسليجا أكثر من 30 مرة — هيمنة لا مثيل لها.",
    },
    en: {
      q: "Which club has won the most Bundesliga titles?",
      options: ["Dortmund", "Bayern Munich", "Schalke", "Leverkusen"],
      fact: "Bayern have won over 30 Bundesliga titles — unmatched dominance.",
    },
  },
  {
    id: "olimpic-football",
    category: "history",
    difficulty: "medium",
    answer: 2,
    ar: {
      q: "كم عمر اللاعبين المسموح به في أولمبياد كرة القدم (رجال)؟",
      options: ["21 سنة", "23 سنة", "تحت 23 + 3 استثناءات", "بلا حد"],
      fact: "تسمح القائمة بـ3 لاعبين فوق السن في تشكيلة الأولمبياد.",
    },
    en: {
      q: "What is the men's Olympic football age limit?",
      options: ["21", "23", "Under-23 + 3 overage", "No limit"],
      fact: "Squads allow three overage players alongside the under-23 core.",
    },
  },
  {
    id: "var-introduced",
    category: "history",
    difficulty: "medium",
    answer: 1,
    ar: {
      q: "في أي مونديال استُخدم تقنية الـVAR لأول مرة؟",
      options: ["2014 البرازيل", "2018 روسيا", "2010 جنوب أفريقيا", "2022 قطر"],
      fact: "روسيا 2018 كانت أول مونديال بتقنية الفيديو لمساعدة الحكم.",
    },
    en: {
      q: "Which World Cup first used VAR?",
      options: ["2014 Brazil", "2018 Russia", "2010 South Africa", "2022 Qatar"],
      fact: "Russia 2018 was the first World Cup with video assistant referees.",
    },
  },
  {
    id: "african-cup-most",
    category: "arab",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "أي منتخب عربي فاز بكأس أفريقيا أكثر من غيره؟",
      options: ["مصر", "المغرب", "الجزائر", "تونس"],
      fact: "مصر فازت بالكن الأفريقي 7 مرات — الأكثر في القارة.",
    },
    en: {
      q: "Which Arab nation has won the most Africa Cup of Nations titles?",
      options: ["Egypt", "Morocco", "Algeria", "Tunisia"],
      fact: "Egypt have won the AFCON 7 times — a continental record.",
    },
  },
  {
    id: "morocco-2022",
    category: "arab",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "ما هو أعلى إنجاز عربي في تاريخ كأس العالم؟",
      options: ["دور الـ16", "ربع النهائي", "المركز الثالث 2022", "نهائي"],
      fact: "المغرب 2022 صار أول منتخب عربي وإفريقي يبلغ نصف نهائي المونديال.",
    },
    en: {
      q: "What is the best World Cup finish by an Arab nation?",
      options: ["Round of 16", "Quarter-final", "Semi-final (2022)", "Final"],
      fact: "Morocco 2022 became the first Arab and African side to reach a World Cup semi-final.",
    },
  },
  {
    id: "buffon-worldcup",
    category: "legends",
    difficulty: "hard",
    answer: 1,
    ar: {
      q: "من حارس المرمى الذي رفع كأس العالم 2006؟",
      options: ["كاسياس", "بوفون", "كانافارو", "زوبربوهلر"],
      fact: "جانلويجي بوفون كان أساس عرين إيطاليا البطلي في ألمانيا 2006.",
    },
    en: {
      q: "Which goalkeeper lifted the 2006 World Cup with Italy?",
      options: ["Casillas", "Buffon", "Cannavaro", "Zuberbühler"],
      fact: "Gianluigi Buffon anchored Italy's title-winning defense in Germany 2006.",
    },
  },
  {
    id: "most-ucl-clubs",
    category: "clubs",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "أي نادٍ أوروبي فاز بدوري الأبطال أكثر من غيره؟",
      options: ["ريال مدريد", "ميلان", "ليفربول", "بايرن"],
      fact: "ريال مدريد يملك أكثر من 14 لقب أوروبي — ضعف أقرب منافس تقريبًا.",
    },
    en: {
      q: "Which club has won the most European Cups?",
      options: ["Real Madrid", "AC Milan", "Liverpool", "Bayern"],
      fact: "Real Madrid hold 14+ European Cups — nearly double their nearest rival.",
    },
  },
  {
    id: "golden-goal-era",
    category: "history",
    difficulty: "hard",
    answer: 3,
    ar: {
      q: "ما هو «الهدف الذهبي» الذي ألغي لاحقًا؟",
      options: ["أجمل هدف في البطولة", "هدف من ركلة حرة مباشرة", "هدف الافتتاح", "هدف في الوقت الإضافي ينهي المباراة فورًا"],
      fact: "حسمت الفرنسية 1998 والأوروبية 2000 بهذه القاعدة قبل إلغائها 2004.",
    },
    en: {
      q: "What was the \"golden goal\" rule (later scrapped)?",
      options: ["Best goal of the tournament", "A direct free-kick", "The opening goal", "An extra-time goal that ends the match"],
      fact: "Euro 2000's final was decided by it; FIFA scrapped the rule in 2004.",
    },
  },
  {
    id: "ronaldo-nazario",
    category: "legends",
    difficulty: "medium",
    answer: 1,
    ar: {
      q: "من هو «الظاهرة» في كرة القدم؟",
      options: ["رونالدو الأصيل", "رونالدو نازاريو", "روبرتو كارلوس", "رونالدينيو"],
      fact: "رونالدو نازاريو البرازيلي — هداف مونديال 2002 وعودة ملحمية بعد الإصابات.",
    },
    en: {
      q: "Who is known as \"The Phenomenon\" in football?",
      options: ["Cristiano Ronaldo", "Ronaldo Nazário", "Roberto Carlos", "Ronaldinho"],
      fact: "Brazil's Ronaldo Nazário — 2002 World Cup top scorer and an epic comeback story.",
    },
  },
  {
    id: "psg-ligue1",
    category: "clubs",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي نادٍ فرنسي هو الأكثر تحقيقًا للـLigue 1 حديثًا؟",
      options: ["باريس سان جيرمان", "مارسيليا", "ليون", "موناكو"],
      fact: "سان جيرمان هيمن على اللقب الفرنسي بأكثر من 10 مرات منذ 2012.",
    },
    en: {
      q: "Which French club has dominated Ligue 1 recently?",
      options: ["Paris Saint-Germain", "Marseille", "Lyon", "Monaco"],
      fact: "PSG have claimed 10+ Ligue 1 titles since 2012.",
    },
  },
  {
    id: "grealish-hair",
    category: "players",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "من هو أغلى لاعب بريطاني في تاريخ الانتقالات (2021)؟",
      options: ["هاري كين", "جاك جريليش", "ديكلان رايس", "بيلينغهام"],
      fact: "انتقل جريليش لأستون فيلا → مانشستر سيتي بـ100 مليون جنيه إسترليني.",
    },
    en: {
      q: "Who became the most expensive British player in 2021?",
      options: ["Harry Kane", "Jack Grealish", "Declan Rice", "Bellingham"],
      fact: "Grealish moved Aston Villa → Man City for £100m.",
    },
  },
  {
    id: "haaland-debut",
    category: "players",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "من أسرع لاعب يصل 20 هدفًا في الدوري الإنجليزي؟",
      options: ["إيرلينغ هالاند", "صلاح", "كين", "ساكا"],
      fact: "هالاند حطم الرقم في موسمه الأول مع السيتي — 52 هدفًا بكل المسابقات.",
    },
    en: {
      q: "Who reached 20 Premier League goals the fastest?",
      options: ["Erling Haaland", "Salah", "Kane", "Van Dijk"],
      fact: "Haaland shattered the record in his debut City season — 52 goals all competitions.",
    },
  },
  {
    id: "copa-libertadores",
    category: "clubs",
    difficulty: "hard",
    answer: 2,
    ar: {
      q: "أي نادٍ أرجنتيني هو الأكثر تتويجًا بكوبا ليبرتادوريس؟",
      options: ["بوكا جونيورز", "ريفر بليت", "إنديبندينتي", "راسينغ"],
      fact: "إنديبندينتي فاز بالليبرتادوريس 7 مرات — «ملك أمريكا الجنوبية».",
    },
    en: {
      q: "Which Argentine club has won the most Copa Libertadores?",
      options: ["Boca Juniors", "River Plate", "Independiente", "Racing"],
      fact: "Independiente's 7 Libertadores titles earned them \"King of Cups\" status.",
    },
  },
];
