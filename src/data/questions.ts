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
      q: "أي بلد فاز بأول كأس عالم في التاريخ؟",
      options: ["الأوروغواي", "إيطاليا", "الأرجنتين", "إنجلترا"],
      fact: "الأوروغواي استضافت نسخة 1930 وفازت بها بعد فوزها على الأرجنتين 4-2 في النهائي.",
    },
    en: {
      q: "Which country won the first ever World Cup?",
      options: ["Uruguay", "Italy", "Argentina", "England"],
      fact: "Uruguay hosted and won the 1930 edition, beating Argentina 4–2 in the final.",
    },
  },
  {
    id: "blaugrana",
    category: "clubs",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي نادٍ يُلقَّب بـ«البلوغرانا»؟",
      options: ["برشلونة", "أتلتيكو مدريد", "فالنسيا", "إشبيلية"],
      fact: "برشلونة (Blaugrana) نسبةً لألوان قميصه الأزرق والعنابي.",
    },
    en: {
      q: "Which club is known as the \"Blaugrana\"?",
      options: ["Barcelona", "Atlético Madrid", "Valencia", "Sevilla"],
      fact: "Barcelona's nickname comes from its blue and garnet shirt colours.",
    },
  },
  {
    id: "goal-of-century",
    category: "legends",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "من سجّل «هدف القرن» في كأس العالم 1986؟",
      options: ["مارادونا", "رونالدو", "زيدان", "فان باستن"],
      fact: "مارادونا سجّله مع الأرجنتين ضد إنجلترا بعد مراوغة خمسة لاعبين في جولة واحدة.",
    },
    en: {
      q: "Who scored the \"Goal of the Century\" at the 1986 World Cup?",
      options: ["Maradona", "Ronaldo", "Zidane", "Van Basten"],
      fact: "Maradona scored it for Argentina against England, dribbling past five players in one run.",
    },
  },
  {
    id: "wc-2018-host",
    category: "worldcup",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي بلد استضاف كأس العالم 2018؟",
      options: ["روسيا", "برازيل", "جنوب أفريقيا", "قطر"],
      fact: "روسيا استضافت نسخة 2018 وفازت فرنسا باللقب الثاني لها.",
    },
    en: {
      q: "Which country hosted the 2018 World Cup?",
      options: ["Russia", "Brazil", "South Africa", "Qatar"],
      fact: "Russia hosted 2018; France lifted their second title.",
    },
  },
  {
    id: "brazil-titles",
    category: "worldcup",
    difficulty: "easy",
    answer: 2,
    ar: {
      q: "كم مرة فازت البرازيل بكأس العالم؟",
      options: ["3", "4", "5", "6"],
      fact: "البرازيل فازت 5 مرات (1958، 1962، 1970، 1994، 2002) وهي الأكثر تحقيقًا.",
    },
    en: {
      q: "How many World Cups has Brazil won?",
      options: ["3", "4", "5", "6"],
      fact: "Brazil has 5 titles (1958, 1962, 1970, 1994, 2002) — the most of any nation.",
    },
  },
  {
    id: "el-clasico",
    category: "clubs",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "أي بطولة يُلعب فيها «الكلاسيكو»؟",
      options: ["الدوري الإنجليزي", "الدوري الإسباني", "الدوري الإيطالي", "الدوري الألماني"],
      fact: "الكلاسيكو هو مواجهة ريال مدريد وبرشلونة في الدوري الإسباني.",
    },
    en: {
      q: "In which league is \"El Clásico\" played?",
      options: ["Premier League", "La Liga", "Serie A", "Bundesliga"],
      fact: "El Clásico is Real Madrid vs Barcelona in Spain's La Liga.",
    },
  },
  {
    id: "first-european-cup",
    category: "clubs",
    difficulty: "medium",
    answer: 1,
    ar: {
      q: "أي نادٍ فاز بأول نسخة من كأس أوروبا؟",
      options: ["بنفيكا", "ريال مدريد", "ميلان", "أياكس"],
      fact: "ريال مدريد فاز بأول خمس نسخ متتالية (1956–1960).",
    },
    en: {
      q: "Which club won the first European Cup?",
      options: ["Benfica", "Real Madrid", "Milan", "Ajax"],
      fact: "Real Madrid won the first five editions in a row (1956–1960).",
    },
  },
  {
    id: "half-length",
    category: "history",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "كم دقيقة مدة الشوط الواحد؟",
      options: ["40 دقيقة", "45 دقيقة", "50 دقيقة", "60 دقيقة"],
      fact: "الشوط 45 دقيقة مع وقت بدل الضائع يحدده الحكم.",
    },
    en: {
      q: "How long is one half of a match?",
      options: ["40 minutes", "45 minutes", "50 minutes", "60 minutes"],
      fact: "A half lasts 45 minutes plus stoppage time decided by the referee.",
    },
  },
  {
    id: "morocco-2022",
    category: "arab",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي بلد عربي وصل إلى نصف نهائي كأس العالم 2022؟",
      options: ["المغرب", "السعودية", "قطر", "تونس"],
      fact: "المغرب كان أول فريق عربي وأفريقي يبلغ نصف نهائي كأس العالم.",
    },
    en: {
      q: "Which Arab nation reached the 2022 World Cup semi-finals?",
      options: ["Morocco", "Saudi Arabia", "Qatar", "Tunisia"],
      fact: "Morocco became the first African and Arab team to reach a World Cup semi-final.",
    },
  },
  {
    id: "ballon-2023",
    category: "players",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "من فاز بالكرة الذهبية 2023؟",
      options: ["ميسي", "هالاند", "مبابي", "بنزيما"],
      fact: "ليونيل ميسي نال الكرة الذهبية الثامنة له عام 2023 — رقم قياسي مطلق.",
    },
    en: {
      q: "Who won the 2023 Ballon d'Or?",
      options: ["Messi", "Haaland", "Mbappé", "Benzema"],
      fact: "Lionel Messi won his record-extending eighth Ballon d'Or in 2023.",
    },
  },
  {
    id: "match-officials",
    category: "history",
    difficulty: "medium",
    answer: 3,
    ar: {
      q: "كم عدد الحكام في مباراة رسمية (ساحة ومساعدان ورابع)؟",
      options: ["حكم واحد", "2", "3", "4"],
      fact: "حكم الساحة ومساعدان والحكم الرابع = 4 مسؤولين.",
    },
    en: {
      q: "How many officials oversee a competitive match?",
      options: ["One", "2", "3", "4"],
      fact: "Referee, two assistants and the fourth official — four in total.",
    },
  },
  {
    id: "ucl-2024",
    category: "clubs",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "من فاز بدوري أبطال أوروبا 2024؟",
      options: ["مانشستر سيتي", "ريال مدريد", "إنتر ميلان", "أرسنال"],
      fact: "ريال مدريد فاز على بوروسيا دورتموند في ويمبلي ولقبه الخامس عشر.",
    },
    en: {
      q: "Who won the 2024 Champions League?",
      options: ["Manchester City", "Real Madrid", "Inter Milan", "Arsenal"],
      fact: "Real Madrid beat Borussia Dortmund at Wembley for a record 15th title.",
    },
  },
  {
    id: "egypt-nickname",
    category: "arab",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "ما لقب منتخب مصر؟",
      options: ["الفراعنة", "الأسود", "النسور", "الصقور"],
      fact: "منتخب مصر «الفراعنة» هو الأكثر تتويجًا بكأس أمم أفريقيا (7 مرات).",
    },
    en: {
      q: "What is Egypt's national team nickname?",
      options: ["The Pharaohs", "The Lions", "The Eagles", "The Falcons"],
      fact: "Egypt's \"Pharaohs\" hold the record for most Africa Cup of Nations titles (7).",
    },
  },
  {
    id: "fastest-goal",
    category: "worldcup",
    difficulty: "hard",
    answer: 0,
    ar: {
      q: "من سجّل أسرع هدف في تاريخ كأس العالم؟",
      options: ["هكان شوكور", "كلينت ديمبسي", "ديفيد بيكهام", "روبن فان بيرسي"],
      fact: "هكان شوكور سجّل بعد 10.8 ثوانٍ فقط ضد كوريا الجنوبية عام 2002.",
    },
    en: {
      q: "Who scored the fastest goal in World Cup history?",
      options: ["Hakan Şükür", "Clint Dempsey", "David Beckham", "Robin van Persie"],
      fact: "Hakan Şükür scored after just 10.8 seconds against South Korea in 2002.",
    },
  },
  {
    id: "euro-2024",
    category: "history",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "من فاز بكأس أمم أوروبا (يورو) 2024؟",
      options: ["إنجلترا", "إسبانيا", "ألمانيا", "إيطاليا"],
      fact: "إسبانيا فازت بيورو 2024 وأصبحت الأكثر تتويجًا في البطولة (4 ألقاب).",
    },
    en: {
      q: "Who won Euro 2024?",
      options: ["England", "Spain", "Germany", "Italy"],
      fact: "Spain won Euro 2024, becoming the tournament's most successful nation (4 titles).",
    },
  },
  {
    id: "asian-cup-record",
    category: "history",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "أي بلد يحمل الرقم القياسي بالفوز بكأس آسيا؟",
      options: ["اليابان", "السعودية", "إيران", "كوريا الجنوبية"],
      fact: "اليابان فازت 4 مرات (1992، 2000، 2004، 2011).",
    },
    en: {
      q: "Which country holds the record for most Asian Cup titles?",
      options: ["Japan", "Saudi Arabia", "Iran", "South Korea"],
      fact: "Japan has won it 4 times (1992, 2000, 2004, 2011).",
    },
  },
  {
    id: "italy-titles",
    category: "worldcup",
    difficulty: "medium",
    answer: 2,
    ar: {
      q: "كم مرة فازت إيطاليا بكأس العالم؟",
      options: ["2", "3", "4", "5"],
      fact: "إيطاليا فازت 4 مرات (1934، 1938، 1982، 2006).",
    },
    en: {
      q: "How many World Cups has Italy won?",
      options: ["2", "3", "4", "5"],
      fact: "Italy has 4 titles (1934, 1938, 1982, 2006).",
    },
  },
  {
    id: "scaloni-2022",
    category: "players",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "من درّب الأرجنتين في لقب كأس العالم 2022؟",
      options: ["ليونيل سكالوني", "مارسيلو بيلسا", "سامبايولي", "أليخاندرو سابيلا"],
      fact: "سكالوني قاد التانغو للقب الأول منذ 1986.",
    },
    en: {
      q: "Who coached Argentina to the 2022 World Cup title?",
      options: ["Lionel Scaloni", "Marcelo Bielsa", "Sampaoli", "Alejandro Sabella"],
      fact: "Scaloni led Argentina to their first title since 1986.",
    },
  },
  {
    id: "wc-1990",
    category: "worldcup",
    difficulty: "hard",
    answer: 0,
    ar: {
      q: "من فاز بكأس العالم 1990؟",
      options: ["ألمانيا الغربية", "الأرجنتين", "إيطاليا", "برازيل"],
      fact: "ألمانيا الغربية حصدت لقبها الثالث في روما 1990 بأفضلية جزاء متأخر.",
    },
    en: {
      q: "Who won the 1990 World Cup?",
      options: ["West Germany", "Argentina", "Italy", "Brazil"],
      fact: "West Germany claimed their third title in Rome 1990 via a late penalty.",
    },
  },
  {
    id: "saudi-nickname",
    category: "arab",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "ما لقب منتخب السعودية؟",
      options: ["الأخضر", "الصقور", "الفراعنة", "الأسود"],
      fact: "«الأخضر» شارك في 6 نهائيات لكأس العالم وأحدث مفاجأة 2022 أمام الأرجنتين.",
    },
    en: {
      q: "What is Saudi Arabia's national team nickname?",
      options: ["The Green Falcons", "The Eagles", "The Pharaohs", "The Lions"],
      fact: "The \"Green Falcons\" have played 6 World Cups and stunned Argentina in 2022.",
    },
  },
  {
    id: "pl-topscorer-2324",
    category: "players",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "من هدّاف الدوري الإنجليزي لموسم 2023/24؟",
      options: ["محمد صلاح", "إيرلينغ هالاند", "كول بالمر", "أوديون إدوارد"],
      fact: "هالاند تُوّج بالحذاء الذهبي لموسمٍ ثانٍ متتالٍ.",
    },
    en: {
      q: "Who was the Premier League top scorer in 2023/24?",
      options: ["Mohamed Salah", "Erling Haaland", "Cole Palmer", "Ollie Watkins"],
      fact: "Haaland claimed the Golden Boot for a second consecutive season.",
    },
  },
  {
    id: "wolves",
    category: "clubs",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي نادٍ يُلقَّب بـ«الذئاب»؟",
      options: ["وولفرهامبتون", "ليفربول", "إيفرتون", "توتنهام"],
      fact: "وولفرهامبتون (Wolves) تعني الذئاب — من أقدم أندية إنجلترا.",
    },
    en: {
      q: "Which club is nicknamed the \"Wolves\"?",
      options: ["Wolverhampton", "Liverpool", "Everton", "Tottenham"],
      fact: "Wolverhampton Wanderers — one of England's oldest clubs.",
    },
  },
  {
    id: "france-titles",
    category: "worldcup",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "كم مرة فازت فرنسا بكأس العالم؟",
      options: ["مرة واحدة", "مرتين", "ثلاث مرات", "أربع مرات"],
      fact: "فرنسا فازت عامي 1998 على أرضها و2018 في روسيا.",
    },
    en: {
      q: "How many World Cups has France won?",
      options: ["Once", "Twice", "Three times", "Four times"],
      fact: "France won at home in 1998 and in Russia 2018.",
    },
  },
  {
    id: "most-ballon-dor",
    category: "legends",
    difficulty: "easy",
    answer: 1,
    ar: {
      q: "من صاحب الرقم القياسي بأكثر كرات ذهبية؟",
      options: ["كريستيانو رونالدو", "ميسي", "بلاتيني", "كرويف"],
      fact: "ميسي يملك 8 كرات ذهبية — أكثر من أي لاعب في التاريخ.",
    },
    en: {
      q: "Who holds the record for most Ballon d'Or awards?",
      options: ["Cristiano Ronaldo", "Messi", "Platini", "Cruyff"],
      fact: "Messi owns 8 Ballon d'Ors — more than anyone in history.",
    },
  },
  {
    id: "second-club-comp",
    category: "history",
    difficulty: "medium",
    answer: 0,
    ar: {
      q: "ما اسم البطولة الأوروبية الثانية للأندية؟",
      options: ["الدوري الأوروبي", "كأس المعارض", "كأس السوبر", "كأس الإنترتوتو"],
      fact: "الدوري الأوروبي (يوروبا ليج) ثاني أهم مسابقة أندية أوروبية.",
    },
    en: {
      q: "What is Europe's second-tier club competition called?",
      options: ["Europa League", "Inter-Cities Fairs Cup", "UEFA Super Cup", "Intertoto Cup"],
      fact: "The Europa League is Europe's second most important club competition.",
    },
  },
  {
    id: "red-devils",
    category: "clubs",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "أي نادٍ يُعرف بـ«الشياطين الحمر»؟",
      options: ["مانشستر يونايتد", "بايرن ميونخ", "أياكس", "بورتو"],
      fact: "الاسم ورثه النادي عن لقب فريق الرغبي المحلي سالفورد.",
    },
    en: {
      q: "Which club is known as the \"Red Devils\"?",
      options: ["Manchester United", "Bayern Munich", "Ajax", "Porto"],
      fact: "United inherited the nickname from local rugby side Salford.",
    },
  },
  {
    id: "salah-nickname",
    category: "arab",
    difficulty: "easy",
    answer: 0,
    ar: {
      q: "بأي لقب يُعرف محمد صلاح عند جمهور ليفربول؟",
      options: ["الملك المصري", "الصاروخ", "النمر", "العملاق"],
      fact: "جمهور ليفربول يُنادي صلاح بلقب «الملك المصري».",
    },
    en: {
      q: "What do Liverpool fans call Mohamed Salah?",
      options: ["The Egyptian King", "The Rocket", "The Tiger", "The Giant"],
      fact: "Anfield chants him as the \"Egyptian King\".",
    },
  },
  {
    id: "panenka",
    category: "legends",
    difficulty: "hard",
    answer: 0,
    ar: {
      q: "لمن تُنسب ركلة «البانينكا» الشهيرة؟",
      options: ["أنطونين بانينكا", "يوهان كرويف", "زيكو", "روبرتو باجيو"],
      fact: "نفّذها التشيكوسلوفاكي بانينكا في نهائي يورو 1976 بركلة تسديدة متوازنة ببراعة.",
    },
    en: {
      q: "The famous \"Panenka\" penalty is named after whom?",
      options: ["Antonín Panenka", "Johan Cruyff", "Zico", "Roberto Baggio"],
      fact: "Czechoslovakia's Panenka chipped it down the middle in the Euro 1976 final.",
    },
  },
  {
    id: "caf-7",
    category: "arab",
    difficulty: "hard",
    answer: 1,
    ar: {
      q: "أي نادٍ عربي فاز بكأس العالم للأندية؟",
      options: ["الأهلي", "الرجاء", "الزمالك", "الفتح"],
      fact: "الرجاء المغربي فاز بكأس العالم للأندية 2022 (نسخة 2023) لأول مرة في تاريخه.",
    },
    en: {
      q: "Which Arab club won the FIFA Club World Cup?",
      options: ["Al Ahly", "Raja Casablanca", "Zamalek", "Al Fateh"],
      fact: "Raja won the 2022 edition (played in 2023) — the first Arab club to lift it.",
    },
  },
];

export const QUESTION_COUNT = QUESTIONS.length;
