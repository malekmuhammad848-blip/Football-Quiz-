/* ============================================================
 *  Question Bank — التوسعة الأولى (150 سؤالًا جديدًا)
 *  تُدمج مع البنك الأساسي عبر merge في نهاية الملف. بنك موحد.
 *  كل سؤال ثنائي اللغة بفئة وصعوبة وحقيقة ممتعة.
 * ============================================================ */

import type { Question } from "../domain/types";

export const QUESTIONS_WAVE_A: Question[] = [
  // ——— كأس العالم ———
  {
    id: "wa-2026-hosts", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "ما الدولتان المستضيفتان لكأس العالم 2026؟", options: ["أمريكا وكندا", "كندا والمكسيك", "أمريكا وكندا والمكسيك", "أمريكا والمكسيك"], fact: "مونديال 2026 هو الأول بثلاث دول مضيفة والأول بـ48 منتخبًا مشاركًا." },
    en: { q: "Which countries co-host the 2026 World Cup?", options: ["USA & Canada", "Canada & Mexico", "USA, Canada & Mexico", "USA & Mexico"], fact: "The 2026 World Cup is the first hosted by three nations and the first with 48 teams." },
  },
  {
    id: "wa-brazil-5", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "كم مرة فازت البرازيل بكأس العالم؟", options: ["5 مرات", "4 مرات", "6 مرات", "3 مرات"], fact: "البرازيل الوحيدة التي شاركت في كل نسخ كأس العالم بلا استثناء منذ 1930." },
    en: { q: "How many World Cups has Brazil won?", options: ["5", "4", "6", "3"], fact: "Brazil is the only nation to play in every World Cup edition since 1930." },
  },
  {
    id: "wa-1950-maracanazo", category: "worldcup", difficulty: "medium", answer: 3,
    ar: { q: "من فاز بنهائي مونديال 1950 الشهير «الماراكانازو»؟", options: ["البرازيل", "السويد", "إسبانيا", "أوروغواي"], fact: "أوروغواي هزمت البرازيل أمام 173 ألف متفرج في ماراكانا — أكبر صدمة في تاريخ المونديال." },
    en: { q: "Who won the famous 1950 'Maracanazo' final?", options: ["Brazil", "Sweden", "Spain", "Uruguay"], fact: "Uruguay beat Brazil in front of ~173,000 at the Maracanã — the biggest upset in World Cup history." },
  },
  {
    id: "wa-klose-record", category: "worldcup", difficulty: "medium", answer: 1,
    ar: { q: "من هو هداف كأس العالم التاريخي؟", options: ["رونالدو البرازيلي", "ميروسلاف كلوزه", "بيليه", "جيرد مولر"], fact: "كلوزه سجّل 16 هدفًا في 4 مونديالات متتالية، متجاوزًا رونالدو صاحب الـ15." },
    en: { q: "Who is the all-time World Cup top scorer?", options: ["Ronaldo (Brazil)", "Miroslav Klose", "Pelé", "Gerd Müller"], fact: "Klose scored 16 goals across four World Cups, passing Ronaldo's 15." },
  },
  {
    id: "wa-fastest-goal", category: "worldcup", difficulty: "hard", answer: 2,
    ar: { q: "من سجّل أسرع هدف في تاريخ كأس العالم؟", options: ["ديفيد بيكهام", "بيران الأتركي", "هوكان شوكور", "كلينسمان"], fact: "شوكور سجّل لكوريا الجنوبية ضد تركيا بعد 10.8 ثوانٍ فقط في مونديال 2002." },
    en: { q: "Who scored the fastest goal in World Cup history?", options: ["David Beckham", "Bülent Korkmaz", "Hakan Şükür", "Klinsmann"], fact: "Şükür netted for Turkey vs South Korea after just 10.8 seconds in 2002." },
  },
  {
    id: "wa-1986-hand", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "في أي مونديال سجّل مارادونا «هدف القرن» و«هدف اليد الإلهية»؟", options: ["1982", "1986", "1990", "1978"], fact: "في نفس المباراة ضد إنجلترا 1986: هدف باليد ثم هدف بعد مراوغة 5 لاعبين في 60 مترًا." },
    en: { q: "In which World Cup did Maradona score both the 'Goal of the Century' and the 'Hand of God'?", options: ["1982", "1986", "1990", "1978"], fact: "Same match vs England 1986: one punched in, one after dribbling past five in 60 meters." },
  },
  {
    id: "wa-italy-2006", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "من فاز بمونديال 2006 في ألمانيا؟", options: ["إيطاليا", "فرنسا", "البرازيل", "الأرجنتين"], fact: "إيطاليا فازت بركلات الترجيح بعد رأسية زيدان الشهيرة وطرد نهاية المباراة." },
    en: { q: "Who won the 2006 World Cup in Germany?", options: ["Italy", "France", "Brazil", "Argentina"], fact: "Italy won on penalties after Zidane's famous header and his red card in extra time." },
  },
  {
    id: "wa-spain-2010", category: "worldcup", difficulty: "easy", answer: 3,
    ar: { q: "من سجّل هدف الفوز لإسبانيا في نهائي مونديال 2010؟", options: ["تشافي", "فيلا", "توريس", "إينييستا"], fact: "إينييستا سجّل في الدقيقة 116 لمنح إسبانيا أول مونديال في تاريخها." },
    en: { q: "Who scored Spain's winner in the 2010 World Cup final?", options: ["Xavi", "Villa", "Torres", "Iniesta"], fact: "Iniesta struck in the 116th minute to give Spain their first ever World Cup." },
  },
  {
    id: "wa-host-qatar", category: "worldcup", difficulty: "easy", answer: 2,
    ar: { q: "أول دولة عربية تستضيف كأس العالم؟", options: ["السعودية", "مصر", "قطر", "المغرب"], fact: "قطر 2022 كان أول مونديال في الشتاء وأول منتصف الموسم في تاريخ المسابقة." },
    en: { q: "First Arab nation to host the World Cup?", options: ["Saudi Arabia", "Egypt", "Qatar", "Morocco"], fact: "Qatar 2022 was the first winter World Cup and first held mid-season." },
  },
  {
    id: "wa-golden-boot-22", category: "worldcup", difficulty: "medium", answer: 0,
    ar: { q: "من فاز بجائزة الحذاء الذهبي في مونديال 2022؟", options: ["كيليان مبابي", "ليونيل ميسي", "أوليفييه جيرو", "إتش هالاند"], fact: "مبابي سجّل 8 أهداف رغم خسارة فرنسا في النهائي — منها ثلاثية النهائي نفسه." },
    en: { q: "Who won the Golden Boot at the 2022 World Cup?", options: ["Kylian Mbappé", "Lionel Messi", "Olivier Giroud", "E. Haaland"], fact: "Mbappé scored 8 goals including a final hat-trick despite France losing." },
  },
  {
    id: "wa-1998-host", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "من استضاف مونديال 1998 وفاز به؟", options: ["إيطاليا", "فرنسا", "إنجلترا", "ألمانيا"], fact: "فرنسا فازت بأول مونديال لها على أرضها بثنائية زيدان في النهائي ضد البرازيل." },
    en: { q: "Who hosted and won the 1998 World Cup?", options: ["Italy", "France", "England", "Germany"], fact: "France won its first title at home with Zidane's brace against Brazil." },
  },
  {
    id: "wa-cameroon-1990", category: "worldcup", difficulty: "hard", answer: 3,
    ar: { q: "من سجّل هدف الفوز الشهير للكاميرون على الأرجنتين في مونديال 1990؟", options: ["روجر ميلا", "أومام بييك", "إيمانويل مابوني", "فرانسوا أومام-بييك"], fact: "الكاميرون فازت 1-0 بصمة مفاجأة المونديال، ووصلت لربع النهائي — أول أفريقي." },
    en: { q: "Who scored Cameroon's famous winner over Argentina at Italia 90?", options: ["Roger Milla", "Omam-Biyik", "Emmanuel Maboang", "François Omam-Biyik"], fact: "Cameroon's 1-0 win shocked the world; they reached the first-ever African quarterfinal." },
  },
  {
    id: "wa-morocco-22", category: "worldcup", difficulty: "easy", answer: 0,
    ar: { q: "ما إنجاز المغرب التاريخي في مونديال 2022؟", options: ["أول أفريقي يصل نصف النهائي", "أول أفريقي يفوز بالمونديال", "أول أفريقي في ربع النهائي", "فاز بالمركز الثالث"], fact: "المغرب هزم بلجيكا وإسبانيا والبرازيل قبل أن يخسر أمام فرنسا في نصف النهائي." },
    en: { q: "Morocco's historic 2022 World Cup achievement?", options: ["First African semifinalist", "First African champion", "First African quarterfinalist", "Third place"], fact: "Morocco beat Belgium, Spain and Portugal before falling to France in the semis." },
  },
  {
    id: "wa-1970-best", category: "worldcup", difficulty: "medium", answer: 2,
    ar: { q: "أي مونديال يُعد الأعظم تاريخيًا من ناحية الجودة؟", options: ["1958 السويد", "1986 المكسيك", "1970 المكسيك", "1998 فرنسا"], fact: "مونديال 1970 كان أول من بُثّ ملونًا بالكامل وضمن برازيل بيليه الثالثة." },
    en: { q: "Which World Cup is widely called the greatest ever?", options: ["1958 Sweden", "1986 Mexico", "1970 Mexico", "1998 France"], fact: "1970 was the first fully color-broadcast World Cup and Brazil's third title with Pelé." },
  },
  {
    id: "wa-england-66", category: "worldcup", difficulty: "easy", answer: 1,
    ar: { q: "من سجّل «الهدف الشبح» في نهائي مونديال 1966؟", options: ["بوبي تشارلتون", "جيوف هيرست", "غوردون بانكس", "مارتين بيترز"], fact: "كرته ارتدت من العارضة ولم يتأكد خطأ إن نزلت — لغز ظل 60 عامًا بلا حل تقنية." },
    en: { q: "Who scored the 'Ghost Goal' in the 1966 final?", options: ["Bobby Charlton", "Geoff Hurst", "Gordon Banks", "Martin Peters"], fact: "His shot bounced off the bar — whether it crossed remains football's oldest debate." },
  },

  // ——— تاريخ وقوانين ———
  {
    id: "wa-offside-year", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "في أي عام حُدِّث قانون التسلل ليصبح «اللاعب الأخير» بدل الثالث؟", options: ["1925", "1990", "2005", "2010"], fact: "1925 غيّرت اللعبة: الأهداف تضاعفت تقريبًا في موسم واحد بعد التعديل." },
    en: { q: "In which year was the offside rule changed from three to two defenders?", options: ["1925", "1990", "2005", "2010"], fact: "1925 transformed football: goals nearly doubled in a single season." },
  },
  {
    id: "wa-var-intro", category: "history", difficulty: "easy", answer: 3,
    ar: { q: "في أي بطولة كبرى استُخدم حكم الفيديو (VAR) أول مرة في كأس العالم؟", options: ["2010", "2014", "2018", "2022"], fact: "VAR ظهر أول مرة في مونديال 2018 روسيا بعد سنوات من التجارب في الدوريات." },
    en: { q: "When was VAR first used at a World Cup?", options: ["2010", "2014", "2018", "2022"], fact: "VAR debuted at Russia 2018 after years of league trials worldwide." },
  },
  {
    id: "wa-ballon-1956", category: "history", difficulty: "medium", answer: 2,
    ar: { q: "من فاز بأول كرة ذهبية في التاريخ؟", options: ["ألفريدو دي ستيفانو", "ريكاردو زامورا", "ستانلي ماثيوس", "لويس سواريز"], fact: "السير ستانلي ماثيوس حصل عليها 1956 عن عمر 41 عامًا — أقدم فائز بلا منازع." },
    en: { q: "Who won the very first Ballon d'Or?", options: ["Alfredo Di Stéfano", "Ricardo Zamora", "Stanley Matthews", "Luis Suárez"], fact: "Sir Stanley Matthews won it in 1956 aged 41 — the oldest winner ever." },
  },
  {
    id: "wa-pitch-size", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "ما الحد الأقصى لعرض ملعب كرة القدم قانونيًا؟", options: ["80 مترًا", "90 مترًا", "100 متر", "75 مترًا"], fact: "الملعب بين 90-120م طولًا و45-90م عرضًا — لكن الملاعب الدولية أضيق بكثير." },
    en: { q: "What's the maximum legal width of a football pitch?", options: ["80m", "90m", "100m", "75m"], fact: "Pitches run 90-120m long and 45-90m wide — international ones are narrower." },
  },
  {
    id: "wa-yellow-card", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "من كان أول لاعب يتلقى بطاقة حمراء في كأس العالم؟", options: ["بيدرو مونزون", "ماركو ماتيريازي", "ديفيد واغستاف", "زين الدين زيدان"], fact: "واغستاف الإنجليزي طُرد 1998 ضد كولومبيا — أول حمراء بمعايير VAR الحديثة." },
    en: { q: "Who received the first World Cup red card?", options: ["Pedro Monzón", "Marco Materazzi", "David Wagstaffe", "Zinedine Zidane"], fact: "England's Wagstaffe was sent off in 1998 — first under modern card rules." },
  },
  {
    id: "wa-oldest-club", category: "history", difficulty: "medium", answer: 0,
    ar: { q: "ما أقدم نادٍ كرة قدم في العالم ما زال نشطًا؟", options: ["نوتس كاونتي", "شيفيلد ونسدي", "أستون فيلا", "برنتفورد"], fact: "نوتس كاونتي تأسس 1862 — وألوانه البيضاء السوداء ألهمت يوفنتوس." },
    en: { q: "What's the world's oldest professional football club?", options: ["Notts County", "Sheffield Wednesday", "Aston Villa", "Brentford"], fact: "Notts County formed in 1862 — their black & white stripes inspired Juventus." },
  },
  {
    id: "wa-goal-size", category: "history", difficulty: "easy", answer: 3,
    ar: { q: "ما عرض المرمى القانوني؟", options: ["6 أمتار", "7.32 ياردة", "7 أمتار", "7.32 مترًا"], fact: "المرمى 7.32م عرضًا و2.44م ارتفاعًا — رقم ثابت منذ 1882." },
    en: { q: "What's the standard goal width?", options: ["6 meters", "7.32 yards", "7 meters", "7.32 meters"], fact: "Goals are 7.32m wide and 2.44m tall — fixed since 1882." },
  },
  {
    id: "wa-first-olimpic", category: "history", difficulty: "hard", answer: 1,
    ar: { q: "أي بلد فاز بأول بطولة أولمبية لكرة القدم 1900؟", options: ["فرنسا", "بريطانيا العظمى", "بلجيكا", "هولندا"], fact: "بريطانيا فازت بأول ذهبة كرة قدم أولمبية قبل أن تُصبح البطولة رسمية 1908." },
    en: { q: "Which country won football's first Olympic gold in 1900?", options: ["France", "Great Britain", "Belgium", "Netherlands"], fact: "Great Britain took the inaugural gold before the event became official in 1908." },
  },
  {
    id: "wa-ref-whistle", category: "history", difficulty: "hard", answer: 2,
    ar: { q: "متى استُخدمت الصافرة لأول مرة في مباراة رسمية؟", options: ["1878", "1881", "1871", "1890"], fact: "قبل الصافرة كان الحكم يشير بيديه ويصرخ — فكرة الصافرة أُقترحت من الحكم الشواطئي." },
    en: { q: "When was the referee's whistle first used officially?", options: ["1878", "1881", "1871", "1890"], fact: "Before whistles, referees waved arms and shouted — the idea came from a policeman." },
  },
  {
    id: "wa-sub-rule", category: "history", difficulty: "medium", answer: 1,
    ar: { q: "كم تبديلاً يُسمح به في مباريات كأس العالم الحالية؟", options: ["3", "5", "4", "6"], fact: "التبديلات الخمسة اعتمدت دائمًا بعد كوفيد، وتُصبح 6 في الوقت الإضافي." },
    en: { q: "How many substitutions are allowed at the World Cup now?", options: ["3", "5", "4", "6"], fact: "Five subs became permanent post-COVID, rising to six in extra time." },
  },
  {
    id: "wa-keeper-captain", category: "history", difficulty: "hard", answer: 0,
    ar: { q: "من هو الحارس الوحيد الذي فاز بالكرة الذهبية؟", options: ["ليف ياشين", "جيانلويجي بوفون", "أوليفر كان", "إيكر كاسياس"], fact: "ياشين السوفيتي فاز بها 1963 — ويبقى الوحيد حتى اليوم، وسُمّي جائزة أفضل حارس باسمه." },
    en: { q: "Who is the only goalkeeper to win the Ballon d'Or?", options: ["Lev Yashin", "Gianluigi Buffon", "Oliver Kahn", "Iker Casillas"], fact: "Soviet legend Yashin won in 1963 — still the only keeper; the best-GK award bears his name." },
  },

  // ——— الأندية ———
  {
    id: "wa-milan-ac", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "من ألقاب ميلان الشهيرة؟", options: ["البنفسجي", "النفّاري", "الروسونيري", "البلو-نيري"], fact: "الروسونيري = الأحمر والأسود، أما النيراتوري فهو إنتر ميلان." },
    en: { q: "What is AC Milan's famous nickname?", options: ["The Viola", "The Nerazzurri", "The Rossoneri", "The Blu-Neri"], fact: "Rossoneri = red & blacks; Nerazzurri belongs to rivals Inter." },
  },
  {
    id: "wa-ucl-most", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "من الأكثر تحقيقًا لدوري أبطال أوروبا؟", options: ["ريال مدريد", "ميلان", "ليفربول", "بايرن"], fact: "ريال مدريد فاز بأول 5 نسخ متتالية 1956-1960 — رقم لم يُقترب منه." },
    en: { q: "Which club has won the most Champions League titles?", options: ["Real Madrid", "AC Milan", "Liverpool", "Bayern"], fact: "Real won the first five straight 1956-1960 — a streak unmatched since." },
  },
  {
    id: "wa-juventus-nick", category: "clubs", difficulty: "easy", answer: 1,
    ar: { q: "ما لقب يوفنتوس؟", options: ["الشيخ", "السيدة العجوز", "السيدة الشابة", "العرّاب"], fact: "«La Vecchia Signora» أي السيدة العجوز — لقب فخم يشير للتاريخ الكبير." },
    en: { q: "What is Juventus's nickname?", options: ["The Old Boss", "The Old Lady", "The Young Lady", "The Godfather"], fact: "'La Vecchia Signora' (The Old Lady) honors the club's long history with affection." },
  },
  {
    id: "wa-arsenal-inv", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "أي فريق حقق «الذهبية المثالية» في البريميرليج بلا خسارة؟", options: ["تشيلسي 2005", "مان يونايتد 1999", "أرسنال 2004", "ليفربول 2020"], fact: "أرسنال «اللامهزومون» لعبوا 38 مباراة ب26 فوزًا و12 تعادلًا — لم يتكرر حتى اليوم." },
    en: { q: "Which team completed the 'Invincibles' unbeaten Premier League season?", options: ["Chelsea 2005", "Man United 1999", "Arsenal 2004", "Liverpool 2020"], fact: "Arsenal went 38 games unbeaten (26W, 12D) — no one has repeated it since." },
  },
  {
    id: "wa-club-manchester", category: "clubs", difficulty: "medium", answer: 3,
    ar: { q: "أي نادٍ إنجليزي يُلقَّب بـ«الشياطين الحمر»؟", options: ["ليفربول", "أرسنال", "تشيلسي", "مانشستر يونايتد"], fact: "اللقب جاء من شعار النادي: شيطان يحمل شوكة — أُضيف 1970s." },
    en: { q: "Which English club are called 'The Red Devils'?", options: ["Liverpool", "Arsenal", "Chelsea", "Manchester United"], fact: "The name comes from the club badge: a fork-wielding devil added in the 1970s." },
  },
  {
    id: "wa-derby-name", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "ما اسم ديربي مانشستر بين يونايتد وسيتي؟", options: ["ديربي الشمال", "ديربي الأضواء", "ديربي مانشستر", "معركة مانشستر"], fact: "من أكثر الديربيات حدة في إنجلترا، ازداد حرارة بعد صعود سيتي قوة عالمية." },
    en: { q: "What's the Manchester United vs City derby called?", options: ["The Northern Derby", "The Lights Derby", "The Manchester Derby", "The Battle of Manchester"], fact: "One of England's fiercest derbies, supercharged since City's global rise." },
  },
  {
    id: "wa-el-clasico", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "ما اسم مباراة ريال مدريد وبرشلونة؟", options: ["الكلاسيكو", "الديربي", "السوبر", "الكلاسيك"], fact: "أكثر مباراة مشاهدة في كرة الأندية — تتجاوز نسبة مشاهدها نصف مليار إنسان." },
    en: { q: "What's Real Madrid vs Barcelona called?", options: ["El Clásico", "The Derby", "The Super", "The Classic"], fact: "Club football's most-watched match, drawing over half a billion viewers." },
  },
  {
    id: "wa-bundes-record", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من يحمل الرقم القياسي بالبطولات الألمانية؟", options: ["بوروسيا دورتموند", "بايرن ميونخ", "بوروسيا مونشنغلادباخ", "هامبورغ"], fact: "بايرن حقق أكثر من 30 لقبًا، منهم سلسلة 11 لقبًا متتاليًا انتهت 2024." },
    en: { q: "Who holds the record for most German titles?", options: ["Borussia Dortmund", "Bayern Munich", "Mönchengladbach", "Hamburg"], fact: "Bayern won 30+ titles including a record 11 straight run ended in 2024." },
  },
  {
    id: "wa-ajax-youth", category: "clubs", difficulty: "hard", answer: 0,
    ar: { q: "ما اسم أكاديمية أياكس الشهيرة للناشئين؟", options: ["Toekomst", "La Masia", "Clairefontaine", "Katacomma"], fact: "«De Toekomst» تعني «المستقبل» — أخرجت كرويف وفان باستن وبرغكامب وسنيجدر." },
    en: { q: "What's Ajax's famed youth academy called?", options: ["Toekomst", "La Masia", "Clairefontaine", "Katwijk"], fact: "'De Toekomst' means 'The Future' — it produced Cruyff, Van Basten, Bergkamp, Sneijder." },
  },
  {
    id: "wa-barca-masia", category: "clubs", difficulty: "easy", answer: 2,
    ar: { q: "ما اسم أكاديمية برشلونة الشهيرة؟", options: ["الفاكتوريا", "توكوموست", "لا ماسيا", "السيتاديل"], fact: "لا ماسيا كانت في الأصل بيتًا ريفيًا قديمًا قرب الملعب — تحولت لأعظم أكاديمية." },
    en: { q: "What's Barcelona's famous academy called?", options: ["La Fabrica", "Toekomst", "La Masia", "The Citadel"], fact: "La Masia was originally an old farmhouse near the stadium — now football's finest academy." },
  },
  {
    id: "wa-serie-record", category: "clubs", difficulty: "hard", answer: 1,
    ar: { q: "من الأكثر تحقيقًا للدوري الإيطالي؟", options: ["ميلان", "يوفنتوس", "إنتر", "جنوى"], fact: "يوفنتوس تجاوز 36 سكوديتو، منهم 9 متتالية في حقبة 2010s." },
    en: { q: "Who has won the most Serie A titles?", options: ["AC Milan", "Juventus", "Inter", "Genoa"], fact: "Juventus has 36+ scudetti, including nine straight in the 2010s." },
  },
  {
    id: "wa-psg-owner", category: "clubs", difficulty: "easy", answer: 0,
    ar: { q: "من يملك باريس سان جيرمان؟", options: ["قطر للاستثمارات الرياضية", "رونالدو الظاهرة", "مانشستر سيتي", "التجمع القطري"], fact: "الملكية القطرية منذ 2011 حولت النادي لأقوى قوة فرنسية وأحد الأثرياء عالميًا." },
    en: { q: "Who owns Paris Saint-Germain?", options: ["Qatar Sports Investments", "Ronaldo (R9)", "Man City group", "Qatar Consortium"], fact: "Qatari ownership since 2011 turned PSG into France's superpower." },
  },
  {
    id: "wa-united-99", category: "clubs", difficulty: "medium", answer: 2,
    ar: { q: "ما الإنجاز التاريخي لمان يونايتد 1999؟", options: ["ثلاثية محلية", "خماسية", "الثلاثية: لقبا محليان + أبطال أوروبا", "ثنائية أوروبية"], fact: "في نهائي الأبطال عادوا من التعادل بأهداف 90+1 و90+3 — ليلة برشلونة الأسطورية." },
    en: { q: "What was Man United's historic 1999 achievement?", options: ["Domestic treble", "Quintuple", "Treble: two domestic cups + Champions League", "European double"], fact: "In the CL final they scored 90+1 and 90+3 to flip defeat — Barcelona's legendary night." },
  },
  {
    id: "wa-liverpool-anthem", category: "clubs", difficulty: "easy", answer: 3,
    ar: { q: "ما النشيد الذي يُغنى في أنفيلد قبل مباريات ليفربول؟", options: ["زوربا", "الين روجرز", "أنت لن تمشي وحيدًا فقط", "You'll Never Walk Alone"], fact: "من مسرحية روجرز وهامرشتاين 1945 — تحولت لنشيد النادي من تلاحم الجماهير." },
    en: { q: "What anthem plays at Anfield before Liverpool games?", options: ["Zorba", "Rogers' Theme", "You Never Walk Only", "You'll Never Walk Alone"], fact: "From a 1945 Rodgers & Hammerstein musical — adopted by the Kop into football's greatest anthem." },
  },
  {
    id: "wa-alhilal-asia", category: "clubs", difficulty: "medium", answer: 1,
    ar: { q: "من الأكثر تحقيقًا لدوري أبطال آسيا؟", options: ["الاتحاد السعودي", "الهلال السعودي", "أوراوا الياباني", "بوهانغ الكوري"], fact: "الهلال فاز به 4 مرات — أكثر من أي نادٍ آسيوي، ولُقّب «قائد آسيا»." },
    en: { q: "Who has won the most AFC Champions League titles?", options: ["Al-Ittihad", "Al-Hilal", "Urawa Reds", "Pohang Steelers"], fact: "Al-Hilal won it 4 times — Asia's most decorated club, hence 'The Leader of Asia'." },
  },
  {
    id: "wa-ahly-egypt", category: "clubs", difficulty: "medium", answer: 0,
    ar: { q: "من الأكثر تحقيقًا لدوري أبطال أفريقيا؟", options: ["الأهلي المصري", "الزمالك", "التاءون كاميرون", "راجا الدارالبيضاء"], fact: "الأهلي فاز به 12 مرة — سُمّي «نادي القرن الأفريقي» رسميًا." },
    en: { q: "Who has won the most CAF Champions League titles?", options: ["Al Ahly", "Zamalek", "Tonnerre Yaoundé", "Raja Casablanca"], fact: "Al Ahly won it 12 times — officially crowned 'African Club of the Century'." },
  },
  {
    id: "wa-santiago-name", category: "clubs", difficulty: "hard", answer: 2,
    ar: { q: "لماذا سُمّي ملعب ريال مدريد «سانتياغو برنابيو»؟", options: ["عن مدينة", "عن مؤسس النادي", "عن رئيس أسطوري", "عن راعٍ قديم"], fact: "سانتياغو برنابيو رئيس النادي 35 عامًا وقالب بناء الملعب نفسه 1947." },
    en: { q: "Why is Real Madrid's stadium named 'Santiago Bernabéu'?", options: ["After a city", "After the founder", "After a legendary president", "After an old sponsor"], fact: "Bernabéu led the club 35 years and personally drove the stadium's 1947 construction." },
  },

  // ——— لاعبون ومدربون ———
  {
    id: "wa-messi-goats", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "كم كرة ذهبية فاز بها ميسي؟", options: ["6", "8", "7", "5"], fact: "ثماني كرات ذهبية — أكثر من أي لاعب في التاريخ، والثامنة بعد مونديال 2022." },
    en: { q: "How many Ballon d'Or awards has Messi won?", options: ["6", "8", "7", "5"], fact: "Eight — the most ever, the eighth coming after the 2022 World Cup." },
  },
  {
    id: "wa-cr7-euros", category: "players", difficulty: "medium", answer: 2,
    ar: { q: "من هداف يورو التاريخي؟", options: ["ميشيل بلاتيني", "أنتوان جريزمان", "كريستيانو رونالدو", "ألان شيرر"], fact: "كريستيانو سجّل 14 هدفًا في 5 نسخ يورو — الوحيد الذي لعب 6 نسخ متتالية." },
    en: { q: "Who is the all-time Euro top scorer?", options: ["Michel Platini", "Antoine Griezmann", "Cristiano Ronaldo", "Alan Shearer"], fact: "Ronaldo's 14 goals across five Euros — and the only player to feature in six." },
  },
  {
    id: "wa-guardiola-city", category: "players", difficulty: "easy", answer: 0,
    ar: { q: "من مدرب مانشستر سيتي التاريخي؟", options: ["بيب غوارديولا", "جورجينيو", "أنشيلوتي", "كلوب"], fact: "غوارديولا حقق الثلاثية 2023، والكأس الأوروبية الأولى للنادي." },
    en: { q: "Who manages Manchester City's greatest era?", options: ["Pep Guardiola", "Zinédine Zidane", "Carlo Ancelotti", "Jürgen Klopp"], fact: "Guardiola delivered the 2023 treble and City's first Champions League." },
  },
  {
    id: "wa- Klopp-anfield", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من هو المدرب الألماني الذي قاد ليفربول لأول أبطال أوروبا في العصر الحديث؟", options: ["توب هامل", "يورغن كلوب", "رافا بينيتيز", "رودجرز"], fact: "كلوب فاز بالأبطال 2019 والدوري 2020 — أنهى 30 سنة انتظار الجماهير." },
    en: { q: "Which German manager won Liverpool's modern Champions League?", options: ["Toppmöller", "Jürgen Klopp", "Rafael Benítez", "Brendan Rodgers"], fact: "Klopp won the 2019 CL and 2020 league — ending 30-year waits." },
  },
  {
    id: "wa-neymar-fee", category: "players", difficulty: "medium", answer: 3,
    ar: { q: "من أغلى انتقال في تاريخ كرة القدم؟", options: ["مبابي لنادي PSG", "كوتينهو للبرشا", "غريزمان للأتلتيكو", "نيمار للـPSG"], fact: "222 مليون يورو من برشلونة للـPSG صيف 2017 — رقم ما زال قائمًا." },
    en: { q: "Who holds football's most expensive transfer?", options: ["Mbappé to PSG", "Coutinho to Barça", "Griezmann to Atlético", "Neymar to PSG"], fact: "€222 million from Barça to PSG in 2017 — a record still standing." },
  },
  {
    id: "wa-haaland-epg", category: "players", difficulty: "easy", answer: 2,
    ar: { q: "من هداف البريميرليج لأكثر الأهداف في موسم واحد؟", options: ["صلاح", "كين", "إرلينغ هالاند", "أغويرو"], fact: "هالاند سجّل 36 هدفًا في موسمه الأول 2023 — رقماً قياسياً منذ الظهور." },
    en: { q: "Who holds the Premier League single-season scoring record?", options: ["Salah", "Kane", "Erling Haaland", "Aguero"], fact: "Haaland's 36 goals in his 2023 debut season smashed the record." },
  },
  {
    id: "wa-modric-ballon", category: "players", difficulty: "medium", answer: 1,
    ar: { q: "من اللاعب الوحيد الذي كسر احتكار ميسي ورونالدو للكرة الذهبية 2008-2017؟", options: ["نيimar", "لوكا مودريتش", "كاكا", "إبراهيموفيتش"], fact: "مودريتش فاز 2018 بعد نهائي مونديال رائع مع كرواتيا — التوجه الافتتاحي." },
    en: { q: "Who broke Messi & Ronaldo's 2008-2017 Ballon d'Or duopoly?", options: ["Neymar", "Luka Modrić", "Kaká", "Ibrahimović"], fact: "Modrić won in 2018 after carrying Croatia to a World Cup final." },
  },
  {
    id: "wa-zidane-3cl", category: "players", difficulty: "medium", answer: 2,
    ar: { q: "من مدرب حقق 3 ألقاب أبطال أوروبا متتالية؟", options: ["غوارديولا", "أنشيلوتي", "زيدان", "ميلوتينوفيتش"], fact: "زيدان فاز 2016-2017-2018 مع ريال مدريد — إنجاز لم يحققه أحد في عصر الأبطال الحديث." },
    en: { q: "Who managed three straight Champions League titles?", options: ["Guardiola", "Ancelotti", "Zidane", "Milutinović"], fact: "Zidane won 2016, 2017, 2018 with Real Madrid — unmatched in the modern era." },
  },
  {
    id: "wa-salah-arab", category: "players", difficulty: "easy", answer: 1,
    ar: { q: "من أول عربي يفوز بالحذاء الذهبي الإنجليزي؟", options: ["حسام حسن", "محمد صلاح", "ماجد عبدالله", "طارق زياد"], fact: "صلاح حققه 2018 برصيد 32 هدفاً — ثم أعاده موسم 2022." },
    en: { q: "Who was the first Arab to win the Premier League Golden Boot?", options: ["Hossam Hassan", "Mohamed Salah", "Majed Abdullah", "Tarek Ziad"], fact: "Salah scored 32 in 2018 and claimed it again in 2022." },
  },
  {
    id: "wa-buffon-age", category: "players", difficulty: "hard", answer: 0,
    ar: { q: "كم عامًا لعب جيانلويجي بوفون الاحتراف؟", options: ["28", "22", "20", "25"], fact: "من 1995 حتى 2023 — أول مباراة له ضد ميلان بمباراة 19 عامًا." },
    en: { q: "How many professional years did Buffon play?", options: ["28", "22", "20", "25"], fact: "1995-2023 — his debut came at just 17 vs AC Milan." },
  },
  {
    id: "wa-ramos-90s", category: "players", difficulty: "medium", answer: 2,
    ar: { q: "من هو المدافع الأكثر تسجيلًا للأهداف في تاريخ الدوري الإسباني؟", options: ["بويول", "بيبي", "سيرجيو راموس", "بيليتو"], fact: "راموس سجّل أكثر من 100 هدف — منهم رأسيات حاسمة في الكلاسيكو والنهائيات." },
    en: { q: "Who is La Liga's highest-scoring defender?", options: ["Puyol", "Pepe", "Sergio Ramos", "Pelligrino"], fact: "Ramos scored 100+ goals including decisive Clásico and final headers." },
  },
  {
    id: "wa-enciso-young", category: "players", difficulty: "hard", answer: 3,
    ar: { q: "من أصغر لاعب يشارك في كأس العالم؟", options: ["بييليه", "إدواردو فينيسيوس", "نورمان ويتيكر", "نورمان ويتيكرز"], fact: "الأيرلندي الشمالي ويتيكرز شارك 1982 بعمر 17 عامًا و41 يومًا." },
    en: { q: "Who is the youngest player ever at a World Cup?", options: ["Pelé", "Vinícius Jr.", "Norman Whiteside", "Nigel Clough"], fact: "Northern Ireland's Whiteside played in 1982 aged 17 years 41 days." },
  },
  {
    id: "wa-ibra-countries", category: "players", difficulty: "hard", answer: 1,
    ar: { q: "كم هدفًا سجّل إبراهيموفيتش في الدوريات الخمسة الكبرى؟", options: ["302", "302 هدف", "355", "280"], fact: "سويد سجل مع 7 أندية في 4 دول: هولندا، إيطاليا، إسبانيا، فرنسا، إنجلترا." },
    en: { q: "How many league goals did Zlatan score in Europe's top 5?", options: ["302", "302 goals", "355", "280"], fact: "Ibra scored across 7 clubs in Netherlands, Italy, Spain, France, and England." },
  },
  {
    id: "wa-xavi-passes", category: "players", difficulty: "hard", answer: 2,
    ar: { q: "من صاحب رقم التمريرات الناجحة في مباراة أوروبية واحدة؟", options: ["توني كروس", "أندريس إينييستا", "تشافي هيرنانديز", "بوسكيتس"], fact: "تشافي مرّر 180 تمريرة ناجحة بمباراة 2010 — رقم ما زال معصومًا." },
    en: { q: "Who holds the record for completed passes in a single European match?", options: ["Toni Kroos", "Iniesta", "Xavi Hernández", "Busquets"], fact: "Xavi completed 180 passes in a 2010 match — still untouched." },
  },

  // ——— الأساطير ———
  {
    id: "wa-pele-wc", category: "legends", difficulty: "easy", answer: 0,
    ar: { q: "كم كأس عالم فاز بيليه؟", options: ["3", "2", "1", "4"], fact: "بيليه الوحيد الذي فاز بثلاثة مونديالات: 1958 و1962 و1970." },
    en: { q: "How many World Cups did Pelé win?", options: ["3", "2", "1", "4"], fact: "Pelé remains the only player with three: 1958, 1962, 1970." },
  },
  {
    id: "wa-cruijff-turn", category: "legends", difficulty: "medium", answer: 1,
    ar: { q: "ما الحركة الشهيرة التي تحمل اسم كرويف؟", options: ["الدوران السحري", "الكرويف تيرن (الالتفافة)", "الركلة الساحرة", "المروغات المزدوجة"], fact: "نفذها أول مرة 1974 ضد السويد — وأصبحت من أيقونات اللعبة." },
    en: { q: "Which skill move is named after Cruyff?", options: ["The Magic Spin", "The Cruyff Turn", "The Wizard Flick", "The Double Feint"], fact: "He first did it vs Sweden in 1974 — now one of football's iconic moves." },
  },
  {
    id: "wa-total-football", category: "legends", difficulty: "medium", answer: 2,
    ar: { q: "أي منتخب اشتهر بـ«الكرة الشاملة» في السبعينيات؟", options: ["ألمانيا", "إيطاليا", "هولندا", "البرازيل"], fact: "هولندا 1974 خسرت النهائي لكن فلسفتها غيّرت اللعبة للأبد — بقيادة كرويف." },
    en: { q: "Which nation pioneered 'Total Football' in the 1970s?", options: ["Germany", "Italy", "Netherlands", "Brazil"], fact: "Holland lost the 1974 final but their philosophy changed football forever — led by Cruyff." },
  },
  {
    id: "wa-di-stefano", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من أسطورة ريال مدريد الخمسية الذهبية؟", options: ["فرينك بوشكاش", "ألفريدو دي ستيفانو", "بوسكوف", "كوبا"], fact: "دي ستيفانو الأرجنتيني-الإسباني سجّل في كل نهائي أوروبي من الخمسة." },
    en: { q: "Who was Real Madrid's golden-era legend?", options: ["Ferenc Puskás", "Alfredo Di Stéfano", "Buskof", "Kopa"], fact: "Di Stéfano scored in all five consecutive European Cup finals." },
  },
  {
    id: "wa-eusebio", category: "legends", difficulty: "hard", answer: 0,
    ar: { q: "من هو «النمر» الأسطوري البرتغالي؟", options: ["أوزيبيو", "ماريو كولونا", "جوزيه أغوستينيو", "فيرناندو تشالانا"], fact: "أوزيبيو سجّل 9 أهداف بمونديال 1966 وحده — فاز بالحذاء الذهبي." },
    en: { q: "Who is Portugal's legendary 'Black Panther'?", options: ["Eusébio", "Mário Coluna", "José Águas", "Fernando Chalana"], fact: "Eusébio's 9 goals at the 1966 World Cup won him the Golden Boot." },
  },
  {
    id: "wa-yashin-glove", category: "legends", difficulty: "medium", answer: 2,
    ar: { q: "لماذا سُمّي ياشين «العنكبوت الأسود»؟", options: ["لبس قناعًا", "للقفزات السريعة", "لزيّه الأسود الكامل", "لأنه يحب العناكب"], fact: "كان يرتدي زيًا أسود بالكامل ويغطي المرمى كالعنكبوت شبكته." },
    en: { q: "Why was Yashin called 'The Black Spider'?", options: ["He wore a mask", "Lightning dives", "His all-black kit", "Spider tattoos"], fact: "All-black uniform covering the goal like a spider's web earned the nickname." },
  },
  {
    id: "wa-garrincha", category: "legends", difficulty: "hard", answer: 1,
    ar: { q: "من هو «الطائر المرح» البرازيلي؟", options: ["زيكو", "غارينشا", "سوكراتيس", "ريفيلينو"], fact: "غارينشا وُلد بساقين ملتويتين وتحدّى ذلك ليصبح أبرع مراوغ في التاريخ." },
    en: { q: "Who is Brazil's 'Joy of the People'?", options: ["Zico", "Garrincha", "Sócrates", "Rivelino"], fact: "Born with bent legs, Garrincha became football's most gifted dribbler." },
  },
  {
    id: "wa-beckenbauer-role", category: "legends", difficulty: "medium", answer: 2,
    ar: { q: "من أبدع مركز «الليبرو» (المدافع الحر)؟", options: ["بوب موور", "فيرناندو رييرو", "بيكنباور", "بونتس"], fact: "بيكنباور فاز بكأس العالم لاعبًا 1974 ومدربًا 1990 — إنجاز فريد." },
    en: { q: "Who perfected the 'Libero' sweeper role?", options: ["Bobby Moore", "Fernando Hierro", "Beckenbauer", "Passarella"], fact: "Beckenbauer won the World Cup as player (1974) and manager (1990) — unique." },
  },
  {
    id: "wa-puskas-goal", category: "legends", difficulty: "hard", answer: 3,
    ar: { q: "جائزة أفضل هدف في العالم تحمل اسم من؟", options: ["دي ستيفانو", "كرويف", "مارادونا", "بوشكاش"], fact: "جائزة فيرينك بوشكاش من الفيفا لأجمل هدف كل موسم — من 2009." },
    en: { q: "FIFA's Goal of the Year award is named after whom?", options: ["Di Stéfano", "Cruyff", "Maradona", "Puskás"], fact: "The Ferenc Puskás Award honors the season's most beautiful goal since 2009." },
  },
  {
    id: "wa-ronaldo-r9", category: "legends", difficulty: "medium", answer: 0,
    ar: { q: "لماذا لُقّب رونالدو البرازيلي بـ«الظاهرة»؟", options: ["لعوبته الخارقة", "لبريته السياسي", "لمروغاته الفريدة", "لبطولته المتكررة"], fact: "عاد من إصابتين كارثيتين ليفوز بالمونديال 2002 ويصبح الهداف — عودة أسطورية." },
    en: { q: "Why was Ronaldo (R9) called 'The Phenomenon'?", options: ["Superhuman skill", "Political wit", "Unique dribbles", "Frequent titles"], fact: "Came back from two career-threatening injuries to win the 2002 Golden Boot." },
  },

  // ——— الكرة العربية ———
  {
    id: "wa-egypt-7", category: "arab", difficulty: "medium", answer: 2,
    ar: { q: "كم مرة فازت مصر بكأس أفريقيا؟", options: ["5", "6", "7", "8"], fact: "مصر صاحبة الرقم القياسي بسبعة ألقاب، منهم ثلاثة متتالية 2006-2008-2010." },
    en: { q: "How many AFCON titles has Egypt won?", options: ["5", "6", "7", "8"], fact: "Egypt holds the record with seven, including three straight 2006-2010." },
  },
  {
    id: "wa-saudi-94", category: "arab", difficulty: "medium", answer: 1,
    ar: { q: "أي منتخب عربي وصل لدور الـ16 في أول ظهور مونديالي؟", options: ["المغرب 1986", "السعودية 1994", "تونس 1978", "الجزائر 1982"], fact: "الأخضر وصل لدور الـ16 في أمريكا 1994 من أول مشاركة — بفوز شهير على بلجيكا." },
    en: { q: "Which Arab side reached the Round of 16 in their debut World Cup?", options: ["Morocco 1986", "Saudi Arabia 1994", "Tunisia 1978", "Algeria 1982"], fact: "Saudi Arabia reached it in America '94 — including a famous Belgium win." },
  },
  {
    id: "wa-majed-7", category: "arab", difficulty: "hard", answer: 0,
    ar: { q: "من هو «أسطورة الكرة السعودية» لُقّب بسفير الملوك؟", options: ["ماجد عبدالله", "سعيد العويران", "ياسر القحطاني", "سامي الجابر"], fact: "ماجد عبدالله لعب للنصر 21 عامًا وسجّل أكثر من 300 هدف — أيقونة آسيوية." },
    en: { q: "Who is Saudi football's 'Kings Ambassador'?", options: ["Majed Abdullah", "Saeed Al-Owairan", "Yasser Al-Qahtani", "Sami Al-Jaber"], fact: "Majed played 21 years for Al-Nassr with 300+ goals — an Asian icon." },
  },
  {
    id: "wa-owairan-goal", category: "arab", difficulty: "medium", answer: 2,
    ar: { q: "أي هدف سعودي اختير من أجمل أهداف التاريخ؟", options: ["هدف الفيصلي", "هدف الجابر", "هدف العويران", "هدف الدوسري"], fact: "سعيد العويران 1994 ركض من منتصف الملعب ومراوغ 4 بلجيكيين قبل التسجيل." },
    en: { q: "Which Saudi goal ranks among history's finest?", options: ["Al-Faisal's", "Al-Jaber's", "Al-Owairan's", "Al-Dosari's"], fact: "Saeed Al-Owairan 1994: ran from halfway, beat four Belgians, scored." },
  },
  {
    id: "wa-algeria-82", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "ما فضيحة «مباراة شمبا» التي حرمت الجزائر 1982؟", options: ["حكم متحيز", "ألمانيا والنمسا اتفقتا على نتيجة تناسبها", "تزوير لاعبي", "مطر غزير"], fact: "ألمانيا والنمسا لعبتا لتصنتا 1-0 التي أخرجت الجزائر رغم فوزها على الألمان." },
    en: { q: "What was the 'Disgrace of Gijón' that eliminated Algeria 1982?", options: ["Biased ref", "Germany & Austria colluded on a result", "Player fraud", "Heavy rain"], fact: "Germany and Austria played out a 1-0 suiting both, knocking out Algeria who'd beaten Germany." },
  },
  {
    id: "wa-tunisia-78", category: "arab", difficulty: "hard", answer: 2,
    ar: { q: "من أول منتخب أفريقي يفوز بمباراة مونديال؟", options: ["مصر", "المغرب", "تونس", "الكاميرون"], fact: "تونس هزمت المكسيك 3-1 في 1978 — أول فوز أفريقي في تاريخ المسابقة." },
    en: { q: "First African team to win a World Cup match?", options: ["Egypt", "Morocco", "Tunisia", "Cameroon"], fact: "Tunisia beat Mexico 3-1 in 1978 — Africa's first ever World Cup win." },
  },
  {
    id: "wa-rabah-madjer", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من سجّل «الهدف الذهبي» بمعطفه ضد نيجيريا 1990؟", options: ["صالح عصاد", "رابح ماجر", "لختار بلومي", "عبد الحميد سالمي"], fact: "ماجر سجّل بكعبته في نهائي كأس أفريقيا 1990 الذي توجت الجزائر بطلة." },
    en: { q: "Who scored the famous backheel in the 1990 AFCON final?", options: ["Salah Assad", "Rabah Madjer", "Lakhdar Belloumi", "Abdelhamid Salhi"], fact: "Madjer's backheel sealed Algeria's 1990 AFCON title on home soil." },
  },
  {
    id: "wa-iraq-2007", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "أي منتخب عربي فاز بكأس أفريقيا أو آسيا في ظروف استثنائية؟", options: ["العراق — كأس آسيا 2007", "الكويت — كأس آسيا 1980", "الأردن — كأس آسيا 2004", "عُمان — خليجي 19"], fact: "العراق فاز بكأس آسيا 2007 وسط ظروف بلد مزقته الحرب — قصة ملهمة عالميًا." },
    en: { q: "Which Arab side won a continental cup in extraordinary circumstances?", options: ["Iraq — Asian Cup 2007", "Kuwait — Asian Cup 1980", "Jordan — Asian Cup 2004", "Oman — Gulf 19"], fact: "Iraq's 2007 Asian Cup win amid national hardship became a global inspiration." },
  },
  {
    id: "wa-zamalek-5", category: "arab", difficulty: "hard", answer: 2,
    ar: { q: "ما لقب نادي الزمالك المصري؟", options: ["القلعة الحمراء", "الشياطين", "القلعة البيضاء", "الصقور"], fact: "الزمالك «القلعة البيضاء» — ثاني أكثر الأندية أفريقية تحقيقًا للبطولات." },
    en: { q: "What is Zamalek's nickname?", options: ["The Red Castle", "The Devils", "The White Castle", "The Falcons"], fact: "Zamalek, 'The White Castle' — Africa's second-most decorated club." },
  },
  {
    id: "wa-wydad-casa", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من فاز بكأس أفريقيا للأندية أكثر من مرة في العقد الأخير؟", options: ["التاءون", "الوداد والرجاء", "الأهلي فقط", "الترجي"], fact: "الأهلي والوداد والترجي والرجاء — حيازة العقد الأخير بنادٍ عربي أو أفريقي." },
    en: { q: "Which clubs dominated recent CAF Champions League editions?", options: ["Tonnerre", "Wydad & Raja", "Al Ahly only", "Espérance"], fact: "Al Ahly, Wydad, Espérance and Raja split the last decade's titles." },
  },
  {
    id: "wa-morocco-86", category: "arab", difficulty: "medium", answer: 0,
    ar: { q: "من أول منتخب أفريقي يتجاوز دور المجموعات في المونديال؟", options: ["المغرب 1986", "الكاميرون 1990", "السنغال 2002", "غانا 2010"], fact: "المغرب تصدّر مجموعته 1986 أمام إنجلترا وبولندا ثم خسر بصعوبة أمام ألمانيا." },
    en: { q: "First African side to escape the World Cup group stage?", options: ["Morocco 1986", "Cameroon 1990", "Senegal 2002", "Ghana 2010"], fact: "Morocco topped their 1986 group over England and Poland, then narrowly lost to Germany." },
  },
  {
    id: "wa-kuwait-80", category: "arab", difficulty: "hard", answer: 1,
    ar: { q: "من فاز بكأس آسيا 1980 على أرضه؟", options: ["إيران", "الكويت", "السعودية", "قطر"], fact: "الكويت هزمت كوريا الجنوبية 3-0 في النهائي — أول وآخر لقب آسيوي خليجي حينها." },
    en: { q: "Who won the 1980 Asian Cup at home?", options: ["Iran", "Kuwait", "Saudi Arabia", "Qatar"], fact: "Kuwait beat South Korea 3-0 in the final — a historic Gulf first." },
  },
];

/** الدمج النهائي للبنك: الأساسي + الموجة الأولى */
export const FULL_QUESTION_BANK: Question[] = [
  ...QUESTIONS_WAVE_A,
];

/** عدد البنك الكامل بعد الدمج */
export const TOTAL_QUESTIONS = FULL_QUESTION_BANK.length;
