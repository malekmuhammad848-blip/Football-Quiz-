/**
 * نظام مؤثرات صوتية خفيف يعتمد على Web Audio API — بدون ملفات صوتية خارجية.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15,
) {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime + start);
  gain.gain.setValueAtTime(0, audio.currentTime + start);
  gain.gain.linearRampToValueAtTime(volume, audio.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + start + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.05);
}

export const sound = {
  correct(on: boolean) {
    if (!on) return;
    tone(523.25, 0, 0.15);
    tone(659.25, 0.12, 0.15);
    tone(783.99, 0.24, 0.3);
  },
  wrong(on: boolean) {
    if (!on) return;
    tone(196, 0, 0.25, "sawtooth", 0.08);
    tone(146.83, 0.15, 0.35, "sawtooth", 0.08);
  },
  streak(on: boolean, level = 0) {
    if (!on) return;
    const base = 440 * Math.pow(1.12, Math.min(level, 8));
    tone(base, 0, 0.12, "triangle", 0.1);
    tone(base * 1.5, 0.1, 0.2, "triangle", 0.1);
  },
  tick(on: boolean) {
    if (!on) return;
    tone(880, 0, 0.05, "square", 0.03);
  },
};
