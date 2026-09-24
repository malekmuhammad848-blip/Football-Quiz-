/** ============================================================
 *  Stadium Audio — المحرك الصوتي الموحد للتطبيق كله (v3 ناعم)
 *  سياق Web Audio واحد فقط (تُشارَك مع feedback.ts).
 *
 *  فلسفة v3: أصوات قصيرة دافئة ومريحة — بلا خشونة ولا ازدحام:
 *  - الماستر منخفض (0.5) حتى لا يُصمّ الآذان على مكبرات الهاتف
 *  - بوق الهدف مثلث ناعم بدل الموجة المسننة الحادة
 *  - الهتاف خلفية هادئة فقط — لا يطغى أبدًا على النغمات
 *  - صافرة أهدأ وأقصر، طبول أقل ونعومة
 *  ============================================================ */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

/** الماستر النهائي — قيمة مريحة لمكبرات الهاتف */
const MASTER_GAIN = 0.5;

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
    master.gain.value = MASTER_GAIN;
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
 *  طبقات الملعب — كلها خلفية هادئة لا تطغى
 * ============================================================ */

/**
 * هتاف جماهير هادئ: طبقتا ضوضاء مُرشّحة تتضخم وتتلاشى بنعومة.
 * المستوى الافتراضي منخفض عمدًا — خلفية لا صخب.
 */
export function crowdCheer(dur = 1.4, vol = 0.16): void {
  const c = getCtx();
  if (!c || !master) return;
  const t0 = c.currentTime;
  const buf = getNoise(c);
  if (!buf) return;

  const layers: Array<{ f: number; q: number; v: number; attack: number; hold: number }> = [
    { f: 300, q: 0.6, v: vol * 0.6, attack: 0.22, hold: dur * 0.4 },
    { f: 800, q: 0.7, v: vol * 0.3, attack: 0.16, hold: dur * 0.32 },
  ];
  for (const L of layers) {
    const src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.playbackRate.value = 0.92 + Math.random() * 0.2;

    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = L.f;
    bp.Q.value = L.q;

    // انتفاخ تردد لطيف — يشبه فتح الحلق دون حدّة
    bp.frequency.setValueAtTime(L.f * 0.85, t0);
    bp.frequency.linearRampToValueAtTime(L.f * 1.15, t0 + L.attack + L.hold);
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

/** تأوه خيبة هادئ: ضوضاء هابطة منخفضة قصيرة */
export function crowdAww(dur = 0.9, vol = 0.12): void {
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
  bp.frequency.setValueAtTime(700, t0);
  bp.frequency.exponentialRampToValueAtTime(320, t0 + dur);
  bp.Q.value = 0.8;

  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.12);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  src.connect(bp).connect(g).connect(master);
  src.start(t0, Math.random() * 1.5);
  src.stop(t0 + dur + 0.1);
}

/** طبلة ملعب هادئة: توم عميق قصير + قشطرة خفيفة */
export function drumHit(start: number, pitch = 90, vol = 0.26, snap = true): void {
  const c = getCtx();
  if (!c || !master) return;
  const t = c.currentTime + start;

  // جسم الطبلة: جيب هابط
  const osc = c.createOscillator();
  const og = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(pitch * 1.6, t);
  osc.frequency.exponentialRampToValueAtTime(pitch * 0.6, t + 0.2);
  og.gain.setValueAtTime(vol, t);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
  osc.connect(og).connect(master);
  osc.start(t);
  osc.stop(t + 0.32);

  if (!snap) return;
  // القشطرة: ضوضاء قصيرة هادئة
  const buf = getNoise(c);
  if (!buf) return;
  const src = c.createBufferSource();
  src.buffer = buf;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 3600;
  const ng = c.createGain();
  ng.gain.setValueAtTime(vol * 0.22, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
  src.connect(hp).connect(ng).connect(master);
  src.start(t, Math.random());
  src.stop(t + 0.1);
}

/** إيقاع طبول هادئ: ثلاث ضربات فقط متدرجة — بلا صخب */
export function stadiumDrums(): void {
  drumHit(0, 95, 0.26);
  drumHit(0.18, 95, 0.22);
  drumHit(0.36, 120, 0.3);
  crowdCheer(1.2, 0.07);
}

/** طقطقة نقر واجهة واقعية — نقرة خفيفة عريضة تسمع في التطبيقات الأصلية */
export function uiClick(): void {
  const c = getCtx();
  if (!c || !master) return;
  const t0 = c.currentTime;
  const buf = getNoise(c);
  if (!buf) return;
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2400;
  bp.Q.value = 1.6;
  const g = c.createGain();
  g.gain.setValueAtTime(0.07, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.05);
  src.connect(bp).connect(g).connect(master);
  src.start(t0, Math.random());
  src.stop(t0 + 0.06);
}

/**
 * صوت الكرة في الشبكة — «شْوِيش» واقعي: ضوضاء عريضة النطاق
 * ترتد قليلًا ثم تخفت سريعًا (الارتداد المميز لتأرجح الشبكة).
 */
export function netSwish(): void {
  const c = getCtx();
  if (!c || !master) return;
  const t0 = c.currentTime;
  const buf = getNoise(c);
  if (!buf) return;

  const src = c.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  src.playbackRate.value = 1.4 + Math.random() * 0.3;

  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(1400, t0);
  bp.frequency.exponentialRampToValueAtTime(3600, t0 + 0.08);
  bp.frequency.exponentialRampToValueAtTime(900, t0 + 0.3);
  bp.Q.value = 0.9;

  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.025);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.32);

  src.connect(bp).connect(g).connect(master);
  src.start(t0, Math.random() * 1.5);
  src.stop(t0 + 0.4);
}

/**
 * بوق هدف ناعم: نغمتان مثلثيتان دافئتان (الجذر + الخامسة)
 * بترنّح تردد خفيف — أقرب لصفير الملعب البعيد من الكلارين اللاذع.
 */
export function goalHorn(dur = 0.7): void {
  const c = getCtx();
  if (!c || !master) return;
  const m = master; // التقاط للنوع داخل الدوال المتداخلة
  const t0 = c.currentTime;

  const freqs = [233.08, 349.23];
  const vols = [0.09, 0.06];
  freqs.forEach((f, i) => {
    const osc = c.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(f * 0.99, t0);
    osc.frequency.linearRampToValueAtTime(f, t0 + 0.06); // صعود لطيف

    // ترنّح ترددي خفيف جدًا — حيوية بلا خشونة
    const vib = c.createOscillator();
    vib.frequency.value = 5;
    const vibG = c.createGain();
    vibG.gain.value = 2.2;
    vib.connect(vibG).connect(osc.frequency);
    vib.start(t0);
    vib.stop(t0 + dur);

    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1400;

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vols[i]!, t0 + 0.07);
    g.gain.setValueAtTime(vols[i]!, t0 + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(lp).connect(g).connect(m);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  });
}

/**
 * صافرة حكّام واقعية: نغمة مزدوجة (شفتان) كما في صافرات الملاعب الحقيقية —
 * 2100 + 2500 هرتز معًا تعطي «الطرقعة» المميزة، مع ترنّح الحبة ونفَس خلفي.
 */
export function refWhistle(blasts = 1): void {
  const c = getCtx();
  if (!c || !master) return;
  const m = master; // التقاط للنوع داخل الدوال المتداخلة
  const blast = (t0: number, dur: number) => {
    // الشفتان معًا — نغمتان متقاربتان تُنتجان طرقة حقيقية
    for (const [freq, v] of [
      [2100, 0.04],
      [2540, 0.032],
    ] as const) {
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(v, t0 + 0.015);
      g.gain.setValueAtTime(v, t0 + dur - 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      // ترنّح الحبة
      const trem = c.createOscillator();
      trem.frequency.value = 27;
      const tremG = c.createGain();
      tremG.gain.value = v * 0.45;
      trem.connect(tremG).connect(g.gain);
      trem.start(t0);
      trem.stop(t0 + dur);

      osc.connect(g).connect(m);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    }

    // نفَس خلفي خفيف
    const buf = getNoise(c);
    if (buf) {
      const src = c.createBufferSource();
      src.buffer = buf;
      const ng = c.createGain();
      ng.gain.setValueAtTime(0.012, t0);
      ng.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(ng).connect(m);
      src.start(t0, Math.random());
      src.stop(t0 + dur);
    }
  };

  const now = c.currentTime;
  if (blasts === 1) {
    blast(now + 0.02, 0.45);
  } else {
    blast(now + 0.02, 0.15);
    blast(now + 0.24, 0.15);
  }
}

/** صافرة نهاية طويلة واحدة (حكم النهاية الكبرى) */
export function fullTimeWhistle(): void {
  refWhistle(1);
}

/* ============================================================
 *  مكتبة الأصوات — قصيرة دافئة مريحة
 * ============================================================ */

/** نجاح سريع: نغمتا ماريمبا صاعدتان (دو → مي) */
export function chime(): void {
  pluckNote(783.99, 0, 0.2, 0.12, { harmonicVol: 0.2 });
  pluckNote(1046.5, 0.07, 0.28, 0.11);
}

/** كورد نجاح أكمل — للنتائج المهمة */
export function chordBright(): void {
  pluckNote(523.25, 0, 0.28, 0.1);
  pluckNote(659.25, 0.05, 0.3, 0.09);
  pluckNote(783.99, 0.1, 0.36, 0.09);
  pluckNote(1046.5, 0.16, 0.5, 0.1);
  thump(0, 0.07);
}

/** خطأ لطيف: نغمة هابطة واحدة منخفضة — واضحة بلا قسوة */
export function softDud(): void {
  pluckNote(293.66, 0, 0.2, 0.11, { type: "triangle", harmonicVol: 0.1 }); // ره
  pluckNote(246.94, 0.09, 0.28, 0.09, { type: "triangle", harmonicVol: 0.08 }); // سي
}

/**
 * هدف! لحظة ملعب واقعية: الكرة في الشبكة + تضخم جماهيري طبيعي.
 * بلا بوق ولا نغمات مركبة — هذا ما تسمعه فعلاً عند تسجيل هدف.
 */
export function goalMoment(): void {
  netSwish();
  crowdCheer(1.7, 0.15);
  thump(0.02, 0.08);
}

/** فتح حزمة: إيقاع ترقّب قصير — طبلتان + نغمة صاعدة */
export function packOpen(): void {
  drumHit(0, 95, 0.24);
  drumHit(0.22, 110, 0.28);
  pluckNote(392, 0.24, 0.24, 0.1);
  pluckNote(523.25, 0.36, 0.34, 0.11);
  crowdCheer(1.0, 0.06);
}

/** فتح حزمة: أربيجيو متصاعد يبني الترقب ثم يتصاعد */
export function packArp(): void {
  const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
  notes.forEach((f, i) => pluckNote(f, i * 0.075, 0.28, 0.1, { harmonicVol: 0.22 }));
  pluckNote(1318.5, notes.length * 0.075, 0.6, 0.12);
  thump(notes.length * 0.075, 0.11);
}

/** صفير نهاية جولة — نغمتان نظيفتان قصيرتان */
export function whistleNice(): void {
  pluckNote(1396.9, 0, 0.1, 0.08, { type: "triangle", harmonicVol: 0 });
  pluckNote(1760, 0.12, 0.24, 0.09, { type: "triangle", harmonicVol: 0 });
}

/** ترقية مستوى: سلم خماسي كامل صاعد — لحظة احتفال */
export function levelUpArp(): void {
  const notes = [392, 493.88, 587.33, 783.99, 987.77];
  notes.forEach((f, i) => pluckNote(f, i * 0.065, 0.3, 0.1, { harmonicVol: 0.2 }));
  pluckNote(1174.66, 0.36, 0.7, 0.12);
  thump(0.36, 0.12);
}

/** نقر واجهة — نقرة قصيرة واقعية */
export function tapTick(): void {
  uiClick();
}

/** نغمة سلسلة صاعدة حسب المستوى (بنتاتونيك) */
export function streakNote(level: number): void {
  const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5];
  const f = scale[Math.min(level, scale.length - 1)]!;
  pluckNote(f, 0, 0.18, 0.1, { harmonicVol: 0.18 });
  pluckNote(f * 1.5, 0.08, 0.26, 0.08);
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
  /** فتح حزمة — إيقاع ترقّب قصير */
  packOpen: () => packOpen(),
  levelUp: () => levelUpArp(),
  tap: () => tapTick(),
  streak: streakNote,
  /** مباشرة: هتاف جماهير هادئ */
  cheer: (dur?: number, vol?: number) => crowdCheer(dur, vol),
  /** مباشرة: بوق هدف ناعم */
  horn: (dur?: number) => goalHorn(dur),
  /** مباشرة: طبول ملعب هادئة */
  hitDrums: () => stadiumDrums(),
  /** مباشرة: صافرة الحكّام */
  refWhistle: (blasts?: number) => refWhistle(blasts),
};
