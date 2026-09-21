/** ============================================================
 *  Stadium Audio — صوتيات استاد حية مركبة بـ Web Audio
 *  هللة جمهور (ضجيج مفلتر + نبضات) ، جولة صح/خطأ، صفارة نهاية.
 *  بلا ملفات خارجية: كله توليد لحظي خفيف الحجم.
 *  ============================================================ */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;

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
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    return ctx;
  } catch {
    return null;
  }
}

/** مخزن ضجيج أبيض قابل لإعادة الاستخدام (ثانيتان) */
function getNoise(): AudioBuffer | null {
  const c = getCtx();
  if (!c) return null;
  if (noiseBuffer) return noiseBuffer;
  const len = c.sampleRate * 2;
  noiseBuffer = c.createBuffer(1, len, c.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    // ضجيج بني تقريبي — أعمق وأقرب لصوت جمهور حقيقي
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return noiseBuffer;
}

/** هللة جمهور — تصاعد سريع ثم انحلال طويل */
export function crowdRoar(intensity: 1 | 2 | 3 = 2): void {
  const c = getCtx();
  const noise = getNoise();
  if (!c || !noise || !master) return;
  const now = c.currentTime;

  const src = c.createBufferSource();
  src.buffer = noise;
  src.loop = true;

  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(400, now);
  band.frequency.linearRampToValueAtTime(900, now + 0.35);
  band.Q.value = 0.7;

  const gain = c.createGain();
  const peak = intensity === 3 ? 0.55 : intensity === 2 ? 0.38 : 0.25;
  const dur = intensity === 3 ? 2.8 : intensity === 2 ? 2.0 : 1.4;

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

  src.connect(band).connect(gain).connect(master);
  src.start(now);
  src.stop(now + dur + 0.1);

  // طبقة صفير لاصطاف "وووو" الحقيقية
  const whistle = c.createOscillator();
  const wg = c.createGain();
  whistle.type = "sine";
  whistle.frequency.setValueAtTime(1400, now);
  whistle.frequency.linearRampToValueAtTime(1900, now + 0.4);
  wg.gain.setValueAtTime(0.0001, now);
  wg.gain.exponentialRampToValueAtTime(intensity === 3 ? 0.06 : 0.035, now + 0.35);
  wg.gain.exponentialRampToValueAtTime(0.0001, now + dur * 0.8);
  whistle.connect(wg).connect(master);
  whistle.start(now);
  whistle.stop(now + dur);
}

/** خطأ — همهمة إحباط من الجمهور */
export function crowdAww(): void {
  const c = getCtx();
  const noise = getNoise();
  if (!c || !noise || !master) return;
  const now = c.currentTime;

  const src = c.createBufferSource();
  src.buffer = noise;
  src.loop = true;

  const low = c.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.setValueAtTime(600, now);
  low.frequency.linearRampToValueAtTime(250, now + 1.1);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

  src.connect(low).connect(gain).connect(master);
  src.start(now);
  src.stop(now + 1.6);

  // نغمة هابطة "أوه"
  const oh = c.createOscillator();
  const og = c.createGain();
  oh.type = "sawtooth";
  oh.frequency.setValueAtTime(220, now);
  oh.frequency.exponentialRampToValueAtTime(130, now + 0.9);
  og.gain.setValueAtTime(0.0001, now);
  og.gain.exponentialRampToValueAtTime(0.05, now + 0.2);
  og.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
  oh.connect(og).connect(master);
  oh.start(now);
  oh.stop(now + 1.2);
}

/** صفارة حكم — 3 صفيرات قصيرة لنهاية المباراة/الجولة */
export function refereeWhistle(): void {
  const c = getCtx();
  if (!c || !master) return;
  const now = c.currentTime;
  const blasts = [0, 0.28, 0.56];
  for (const off of blasts) {
    const osc = c.createOscillator();
    const g = c.createGain();
    const lfo = c.createOscillator();
    const lg = c.createGain();
    osc.type = "square";
    osc.frequency.value = 2350;
    // اهتزاز الصفارة الحقيقي
    lfo.frequency.value = 38;
    lg.gain.value = 220;
    lfo.connect(lg).connect(osc.frequency);
    g.gain.setValueAtTime(0.0001, now + off);
    g.gain.exponentialRampToValueAtTime(0.09, now + off + 0.02);
    g.gain.setValueAtTime(0.09, now + off + 0.16);
    g.gain.exponentialRampToValueAtTime(0.0001, now + off + 0.22);
    osc.connect(g).connect(master);
    osc.start(now + off);
    osc.stop(now + off + 0.25);
    lfo.start(now + off);
    lfo.stop(now + off + 0.25);
  }
}

/** طبل ملحمي — لحظة كشف الإجابة أو بداية موسم */
export function drumRoll(): void {
  const c = getCtx();
  const noise = getNoise();
  if (!c || !noise || !master) return;
  const now = c.currentTime;
  const hits = 12;
  for (let i = 0; i < hits; i++) {
    const t = now + i * 0.055;
    const src = c.createBufferSource();
    src.buffer = noise;
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 180;
    const g = c.createGain();
    g.gain.setValueAtTime(0.35 - i * 0.02, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    src.connect(f).connect(g).connect(master);
    src.start(t);
    src.stop(t + 0.1);
  }
}

/** واجهة مدمجة تُستدعى من مكونات اللعب */
export const stadium = {
  goal: () => crowdRoar(3),
  correct: () => crowdRoar(2),
  small: () => crowdRoar(1),
  aww: () => crowdAww(),
  whistle: () => refereeWhistle(),
  drums: () => drumRoll(),
};
