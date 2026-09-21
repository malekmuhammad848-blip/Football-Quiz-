/** ============================================================
 *  Stadium Audio — المحرك الصوتي الموحد للتطبيق كله
 *  سياق Web Audio واحد فقط (تُشارَك مع feedback.ts) + أدوات عزف
 *  طبيعية: ماريمبا دافئة، ناي ناعم، عمق خفيض التردد.
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
 *  مكتبة الأصوات — كلها عزف طبيعي بلا sawtooth
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

/** هدف! أربع نغمات صاعدة مبهجة + عمق — إحساس ملعب حقيقي */
export function fanfare(): void {
  pluckNote(392, 0, 0.2, 0.13, { harmonicVol: 0.2 }); // صول
  pluckNote(523.25, 0.09, 0.22, 0.13); // دو
  pluckNote(659.25, 0.18, 0.24, 0.13); // مي
  pluckNote(783.99, 0.27, 0.5, 0.15); // صول عالية
  thump(0.27, 0.16);
  pluckNote(1568, 0.3, 0.4, 0.05, { harmonicVol: 0 }); // لمعان علوي خفيف
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
  goal: () => fanfare(),
  correct: () => chime(),
  small: () => chime(),
  aww: () => softDud(),
  whistle: () => whistleNice(),
  drums: () => packArp(),
  levelUp: () => levelUpArp(),
  tap: () => tapTick(),
  streak: streakNote,
};
