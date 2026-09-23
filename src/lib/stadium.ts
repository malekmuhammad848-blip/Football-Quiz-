/** ============================================================
 *  Stadium Audio — المحرك الصوتي الموحد للتطبيق كله (v2)
 *  سياق Web Audio واحد فقط (تُشارَك مع feedback.ts).
 *
 *  الجديد: طبقات ملعب حقيقية مُصنّعة رقميًا:
 *  - هتاف جماهير يتضخم (ضوضاء مُرشّحة + طبقات الصوت البشري)
 *  - طبول ملعب (توم منخفض + قشطرة)
 *  - بوق هدف (كورد هوائي متذبذب كما في الملاعب الكبرى)
 *  - صافرة حكّام بترنّح الحبة (pea trill)
 *  - تأوه خيبة جماهيري هابط
 *  ============================================================ */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();
    master ??= ctx.createGain();
    master.gain.value = 0.8;
    master.connect(ctx.destination);
    return ctx;
  } catch {
    return null;
  }
}

export function primeAudio(): void {
  // يُستدعى من أول لمسة — يفتح سياق الصوت قبل أول نغمة (بدون تأخير)
  getCtx();
}

/** عازل ضوضاء بيضاء مُخزَّن (2 ثانية) — يُنشأ مرة واحدة */
let noiseBuf: AudioBuffer | null = null;
function getNoise(c: AudioContext): AudioBuffer | null {
  try {
    if (noiseBuf) return noiseBuf;
    const len = c.sampleRate * 2;
    noiseBuf = c.createBuffer(1, len, c.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return noiseBuf;
  } catch {
    return null;
  }
}

interface ToneOpts {
  type?: OscillatorType;
  /** زمن الهجوم بالثواني */
  attack?: number;
  /** معامل توافقية ثانية — يعطي جسمًا خشبيًا (ماريمبا) */
  harmonic?: number;
  harmonicVol?: number;
}

/** نغمة واحدة دافئة: أساس + توافقية خفيفة + تلاشي أسي طبيعي */
function pluckNote(
  freq: number,
  start: number,
  dur: number,
  vol = 0.16,
  opts: ToneOpts = {},
): void {
  const c = getCtx();
  if (!c || !master) return;
  const t = c.currentTime + start;
  const { type = "sine", attack = 0.012, harmonic = 2, harmonicVol = 0.25 } = opts;

  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(master);

  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(g);
  osc.start(t);
  osc.stop(t + dur + 0.05);

  if (harmonicVol > 0 && harmonic > 1) {
    const hg = c.createGain();
    hg.gain.setValueAtTime(0.0001, t);
    hg.gain.exponentialRampToValueAtTime(vol * harmonicVol, t + attack * 0.6);
    hg.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.6);
    hg.connect(master);
    const h = c.createOscillator();
    h.type = "sine";
    h.frequency.value = freq * harmonic;
    h.connect(hg);
    h.start(t);
    h.stop(t + dur * 0.7 + 0.05);
  }
}

/** عمق هادئ — يربط النغمات بالأرض دون خشونة */
function thump(start: number, vol = 0.14): void {
  const c = getCtx();
  if (!c || !master) return;
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(130, t);
  osc.frequency.exponentialRampToValueAtTime(55, t + 0.18);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + 0.28);
}

/* ============================================================
 *  طبقات الملعب الحقيقية
 * ============================================================ */

/**
 * هتاف جماهير: 3 طبقات ضوضاء مُرشّحة تتضخم وتتلاشى —
 * طبقة احتكاك منخفضة (الوقوف) + وسطى (الأصوات) + عالية (الصيحات).
 * randomstart/offset يجعله مختلفًا في كل مرة.
 */
export function crowdCheer(dur = 1.8, vol = 0.34): void {
  const c = getCtx();
  if (!c || !master) return;
  const t0 = c.currentTime;
  const buf = getNoise(c);
  if (!buf) return;

  const layers: Array<{ f: number; q: number; v: number; attack: number; hold: number }> = [
    { f: 220, q: 0.7, v: vol * 0.5, attack: 0.14, hold: dur * 0.45 },
    { f: 650, q: 0.9, v: vol * 0.42, attack: 0.1, hold: dur * 0.4 },
    { f: 1500, q: 1.4, v: vol * 0.2, attack: 0.07, hold: dur * 0.3 },
  ];
  for (const L of layers) {
    const src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.playbackRate.value = 0.9 + Math.random() * 0.25;

    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = L.f;
    bp.Q.value = L.q;

    // تضخّم التردد صعودًا أثناء الهتاف (يشبه فتح الحلق)
    bp.frequency.setValueAtTime(L.f * 0.8, t0);
    bp.frequency.linearRampToValueAtTime(L.f * 1.25, t0 + L.attack + L.hold);
    bp.frequency.linearRampToValueAtTime(L.f * 0.9, t0 + dur);

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(L.v, t0 + L.attack);
    g.gain.setValueAtTime(L.v, t0 + L.attack + L.hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    src.connect(bp).connect(g).connect(master);
    src.start(t0, Math.random() * 1.5);
    src.stop(t0 + dur + 0.1);
  }
}

/** تأوه خيبة: ضوضاء هابطة منخفضة — «أااااه» الجمهور عند إضاعة فرصة */
export function crowdAww(dur = 1.1, vol = 0.22): void {
  const c = getCtx();
  if (!c || !master) return;
  const t0 = c.currentTime;
  const buf = getNoise(c);
  if (!buf) return;

  const src = c.createBufferSource();
  src.buffer = buf;
  src.loop = true;

  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(850, t0);
  bp.frequency.exponentialRampToValueAtTime(320, t0 + dur);
  bp.Q.value = 1.1;

  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.09);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  src.connect(bp).connect(g).connect(master);
  src.start(t0, Math.random() * 1.5);
  src.stop(t0 + dur + 0.1);
}

/** طبلة ملعب: توم عميق + قشطرة قصيرة */
export function drumHit(start: number, pitch = 90, vol = 0.4, snap = true): void {
  const c = getCtx();
  if (!c || !master) return;
  const t = c.currentTime + start;

  // جسم الطبلة: جيب هابط
  const osc = c.createOscillator();
  const og = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(pitch * 1.6, t);
  osc.frequency.exponentialRampToValueAtTime(pitch * 0.6, t + 0.22);
  og.gain.setValueAtTime(vol, t);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  osc.connect(og).connect(master);
  osc.start(t);
  osc.stop(t + 0.34);

  if (!snap) return;
  // القشطرة: ضوضاء قصيرة عالية
  const buf = getNoise(c);
  if (!buf) return;
  const src = c.createBufferSource();
  src.buffer = buf;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 3200;
  const ng = c.createGain();
  ng.gain.setValueAtTime(vol * 0.35, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  src.connect(hp).connect(ng).connect(master);
  src.start(t, Math.random());
  src.stop(t + 0.12);
}

/** إيقاع طبول ملعب: بوم-بوم-كاتشك |
 *  three hits building into the rhythm */
export function stadiumDrums(): void {
  drumHit(0, 95, 0.42);
  drumHit(0.16, 95, 0.34);
  drumHit(0.32, 120, 0.46);
  drumHit(0.44, 120, 0.3);
  drumHit(0.56, 80, 0.5);
  crowdCheer(1.4, 0.16);
}

/**
 * بوق هدف: كورد نحاسي هوائي (مي♭) بتذبذب سريع —
 * صوت أبواق الملاعب الأوروبية عند التسجيل.
 */
export function goalHorn(dur = 1.15): void {
  const c = getCtx();
  if (!c || !master) return;
  const m = master; // التقاط للنوع داخل الدوال المتداخلة
  const t0 = c.currentTime;

  // كورد هوائي: الجذر + الخامسة (233 + 349 هرتز) بتشويش خفيف
  const freqs = [233.08, 349.23, 233.08 * 2];
  const vols = [0.16, 0.11, 0.07];
  freqs.forEach((f, i) => {
    const osc = c.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(f * 0.985, t0);
    osc.frequency.linearRampToValueAtTime(f, t0 + 0.08); // صعود البوق

    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2200;

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vols[i]!, t0 + 0.05);
    g.gain.setValueAtTime(vols[i]!, t0 + dur * 0.75);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    // تذبذب سريع (نفس رجفة الأبواق المضغوطة)
    const lfo = c.createOscillator();
    lfo.frequency.value = 7 + i;
    const lfoG = c.createGain();
    lfoG.gain.value = 0.035;
    lfo.connect(lfoG).connect(g.gain);
    lfo.start(t0);
    lfo.stop(t0 + dur);

    osc.connect(lp).connect(g).connect(m);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  });
}

/**
 * صافرة حكّام حقيقية: صافرة بترنّح الحبة —
 * نغمة عالية ~2400 هرتز معدَّلة اتساعًا بسرعة 28 هرتز (الترنّح)
 * + تشويش نفَس خفيف. نفخة أو نفختين.
 */
export function refWhistle(blasts = 2): void {
  const c = getCtx();
  if (!c || !master) return;
  const m = master; // التقاط للنوع داخل الدوال المتداخلة
  const blast = (t0: number, dur: number) => {
    const osc = c.createOscillator();
    osc.type = "square";
    osc.frequency.value = 2350;

    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2400;
    bp.Q.value = 9;

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.09, t0 + 0.02);
    g.gain.setValueAtTime(0.09, t0 + dur - 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    // ترنّح الحبة: تعديل اتساع سريع
    const trem = c.createOscillator();
    trem.frequency.value = 28;
    const tremG = c.createGain();
    tremG.gain.value = 0.05;
    trem.connect(tremG).connect(g.gain);
    trem.start(t0);
    trem.stop(t0 + dur);

    // نفَس: ضوضاء خفيفة خلف النغمة
    const buf = getNoise(c);
    if (buf) {
      const src = c.createBufferSource();
      src.buffer = buf;
      const ng = c.createGain();
      ng.gain.setValueAtTime(0.02, t0);
      ng.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(ng).connect(m);
      src.start(t0, Math.random());
      src.stop(t0 + dur);
    }

    osc.connect(bp).connect(g).connect(m);
    osc.start(t0);
    osc.stop(t0 + dur);
  };

  const now = c.currentTime;
  if (blasts === 1) {
    blast(now + 0.02, 0.5);
  } else {
    blast(now + 0.02, 0.16);
    blast(now + 0.24, 0.16);
  }
}

/** صافرة نهاية طويلة واحدة (حكم النهاية الكبرى) */
export function fullTimeWhistle(): void {
  refWhistle(1);
}

/* ============================================================
 *  مكتبة الأصوات — كلها عزف طبيعي بلا خشونة مجانية
 * ============================================================ */

/** نجاح سريع: نغمتا ماريمبا صاعدتان (دو → مي) */
export function chime(): void {
  pluckNote(783.99, 0, 0.22, 0.15, { harmonicVol: 0.22 });
  pluckNote(1046.5, 0.07, 0.3, 0.14);
}

/** كورد نجاح أكمل — للنتائج المهمة */
export function chordBright(): void {
  pluckNote(523.25, 0, 0.3, 0.12);
  pluckNote(659.25, 0.05, 0.32, 0.11);
  pluckNote(783.99, 0.1, 0.38, 0.11);
  pluckNote(1046.5, 0.16, 0.55, 0.12);
  thump(0, 0.08);
}

/** خطأ لطيف: نغمة هابطة واحدة منخفضة — واضحة بلا قسوة */
export function softDud(): void {
  pluckNote(293.66, 0, 0.22, 0.13, { type: "triangle", harmonicVol: 0.12 }); // ره
  pluckNote(246.94, 0.09, 0.3, 0.11, { type: "triangle", harmonicVol: 0.1 }); // سي
}

/**
 * هدف! لحظة الملعب الكاملة:
 * بوق الهدف + هتاف الجماهير + فانفار نغمي + طبلة.
 */
export function goalMoment(): void {
  crowdCheer(2.2, 0.34);
  goalHorn(1.1);
  pluckNote(392, 0.02, 0.2, 0.13, { harmonicVol: 0.2 });
  pluckNote(523.25, 0.11, 0.22, 0.13);
  pluckNote(659.25, 0.2, 0.24, 0.13);
  pluckNote(783.99, 0.29, 0.5, 0.15);
  drumHit(0.05, 90, 0.4);
  thump(0.29, 0.16);
}

/** فتح حزمة: أربيجيو متصاعد يبني الترقب ثم يتصاعد */
export function packArp(): void {
  const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
  notes.forEach((f, i) => pluckNote(f, i * 0.075, 0.3, 0.12, { harmonicVol: 0.25 }));
  pluckNote(1318.5, notes.length * 0.075, 0.65, 0.14);
  thump(notes.length * 0.075, 0.14);
}

/** صفير نهاية جولة — نغمتان نظيفتان قصيرتان */
export function whistleNice(): void {
  pluckNote(1396.9, 0, 0.1, 0.09, { type: "triangle", harmonicVol: 0 });
  pluckNote(1760, 0.12, 0.26, 0.1, { type: "triangle", harmonicVol: 0 });
}

/** ترقية مستوى: سلم خماسي كامل صاعد — لحظة احتفال */
export function levelUpArp(): void {
  const notes = [392, 493.88, 587.33, 783.99, 987.77];
  notes.forEach((f, i) => pluckNote(f, i * 0.065, 0.34, 0.12, { harmonicVol: 0.22 }));
  pluckNote(1174.66, 0.36, 0.8, 0.14);
  thump(0.36, 0.16);
  pluckNote(1568, 0.4, 0.5, 0.06, { harmonicVol: 0 });
}

/** نقر واجهة — خفيف جدًا */
export function tapTick(): void {
  pluckNote(987.77, 0, 0.06, 0.05, { harmonicVol: 0 });
}

/** نغمة سلسلة صاعدة حسب المستوى (بنتاتونيك) */
export function streakNote(level: number): void {
  const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5];
  const f = scale[Math.min(level, scale.length - 1)]!;
  pluckNote(f, 0, 0.2, 0.12, { harmonicVol: 0.2 });
  pluckNote(f * 1.5, 0.08, 0.3, 0.1);
}

/** واجهة موحدة تُستدعى من مكونات اللعب */
export const stadium = {
  goal: () => goalMoment(),
  /** هدف نصفي — بلا بوق (للنجاحات المتوسطة) */
  correct: () => chime(),
  small: () => chime(),
  aww: () => crowdAww(),
  whistle: () => fullTimeWhistle(),
  drums: () => stadiumDrums(),
  levelUp: () => levelUpArp(),
  tap: () => tapTick(),
  streak: streakNote,
  /** مباشرة: هتاف جماهير */
  cheer: (dur?: number, vol?: number) => crowdCheer(dur, vol),
  /** مباشرة: بوق هدف */
  horn: (dur?: number) => goalHorn(dur),
  /** مباشرة: طبول ملعب */
  hitDrums: () => stadiumDrums(),
  /** مباشرة: صافرة الحكّام (نفخة/نفختان) */
  refWhistle: (blasts?: number) => refWhistle(blasts),
};
