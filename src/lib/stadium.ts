/** ============================================================
 *  Stadium Audio v2 — صوتيات نظيفة وخفيفة
 *  الإصلاحات الجذرية:
 *  1) كل عقدة تنتهي بـ stop() زمني صريح + onended disconnect — صفر تسريب
 *     (النسخة القديمة كانت تتراكم عقدها فتُثقل الصفحة مع كل نقرة)
 *  2) أصوات نقية قصيرة بأسلوب ألعاب الهواتف (نغمات مرقّبة) بدل الضجيج
 *     المركّب الرخيص — أجمل للأذن وأخف 10×
 *  3) حد أدنى بين الأصوات (throttle 80ms) — لا تراكم عند النقر السريع
 *  4) AudioContext واحد + كسب رئيسي + جاهزية كسول
 *  ============================================================ */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let lastPlay = 0;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();
    master ??= (() => {
      const g = ctx!.createGain();
      g.gain.value = 0.7;
      g.connect(ctx!.destination);
      return g;
    })();
    return ctx;
  } catch {
    return null;
  }
}

/** تنظيف تلقائي: نحرر العقد بعد انتهائها — لا تراكم ولا تسريب */
function tracked<T extends AudioNode>(node: T): T {
  node.addEventListener?.(
    "ended" as never,
    () => {
      try {
        node.disconnect();
      } catch {
        /* تم مسبقًا */
      }
    },
    { once: true },
  );
  return node;
}

interface ToneSpec {
  /** تردد البداية */
  f0: number;
  /** تردد النهاية (اختياري — انزلاق) */
  f1?: number;
  /** بداية بالنسبة للصفر */
  at?: number;
  dur: number;
  type?: OscillatorType;
  vol?: number;
}

/** نغمة واحدة متتبَّعة — تُنظف نفسها */
function playTone(spec: ToneSpec): void {
  const c = getCtx();
  if (!c || !master) return;
  const start = c.currentTime + (spec.at ?? 0);
  const end = start + spec.dur;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = spec.type ?? "sine";
  osc.frequency.setValueAtTime(spec.f0, start);
  if (spec.f1 !== undefined) osc.frequency.exponentialRampToValueAtTime(Math.max(1, spec.f1), end);
  const v = spec.vol ?? 0.14;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(v, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(gain).connect(master);
  osc.start(start);
  osc.stop(end + 0.02);
  tracked(osc);
}

/** دقة خفيفة: مثلثات مرقّبة بأسلوب Duolingo */
function chimeCorrect(): void {
  playTone({ f0: 659.25, dur: 0.09, type: "triangle", vol: 0.16 });
  playTone({ f0: 987.77, at: 0.07, dur: 0.16, type: "triangle", vol: 0.16 });
}

/** خطأ لطيف: نغمتان هابطتان قصيرتان */
function chimeWrong(): void {
  playTone({ f0: 330, f1: 220, dur: 0.16, type: "triangle", vol: 0.13 });
  playTone({ f0: 220, f1: 150, at: 0.1, dur: 0.22, type: "triangle", vol: 0.11 });
}

/** صفارة حكم حقيقية: تردد عالٍ مع تعديل سريع (warble) — دفعة واحدة */
function whistleBlast(): void {
  const c = getCtx();
  if (!c || !master) return;
  const now = c.currentTime;
  const dur = 0.62;

  const osc = c.createOscillator();
  osc.type = "square";
  osc.frequency.value = 2200;

  // الاهتزاز السريع = طابع الصفارة الحقيقي
  const lfo = c.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 42;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 320;
  lfo.connect(lfoGain).connect(osc.frequency);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  gain.gain.setValueAtTime(0.12, now + dur - 0.1);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  osc.connect(gain).connect(master);
  osc.start(now);
  osc.stop(now + dur + 0.02);
  lfo.start(now);
  lfo.stop(now + dur + 0.02);
  tracked(osc);
  tracked(lfo);
}

/** صفارة نهاية: ثلاث دفعات سريعة */
function whistleTriple(): void {
  for (const off of [0, 0.26, 0.52]) {
    setTimeout(() => whistleBlast(), off * 1000);
  }
}

/** drum توقف خفيف بضربتين فقط — ترقب قبل كشف الحزمة */
function drumsLight(): void {
  playTone({ f0: 140, f1: 60, dur: 0.14, type: "sine", vol: 0.2 });
  playTone({ f0: 140, f1: 60, at: 0.2, dur: 0.14, type: "sine", vol: 0.2 });
  playTone({ f0: 180, f1: 40, at: 0.42, dur: 0.3, type: "sine", vol: 0.25 });
}

/** أصداء واجهة خفيفة */
const sfxMap = {
  goal: () => {
    // صعود سريع ثماني النغمات — لحظة الكشف/الهدف
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => playTone({ f0: f, at: i * 0.07, dur: 0.12, type: "triangle", vol: 0.15 }));
    playTone({ f0: 1318.5, at: 0.3, dur: 0.35, type: "triangle", vol: 0.17 });
  },
  correct: chimeCorrect,
  aww: chimeWrong,
  whistle: whistleTriple,
  drums: drumsLight,
};

export const stadium = {
  goal: () => {
    const now = performance.now();
    if (now - lastPlay < 80) return;
    lastPlay = now;
    sfxMap.goal();
  },
  correct: () => {
    const now = performance.now();
    if (now - lastPlay < 80) return;
    lastPlay = now;
    chimeCorrect();
  },
  small: () => {
    const now = performance.now();
    if (now - lastPlay < 80) return;
    lastPlay = now;
    playTone({ f0: 784, dur: 0.08, type: "triangle", vol: 0.1 });
  },
  aww: () => {
    const now = performance.now();
    if (now - lastPlay < 80) return;
    lastPlay = now;
    chimeWrong();
  },
  whistle: () => {
    const now = performance.now();
    if (now - lastPlay < 300) return;
    lastPlay = now;
    whistleTriple();
  },
  drums: () => {
    const now = performance.now();
    if (now - lastPlay < 300) return;
    lastPlay = now;
    drumsLight();
  },
};

/** تهيئة مسبقة عند أول لمسة (متطلبات المتصفح للصوت) */
export function primeStadiumAudio(): void {
  getCtx();
}
