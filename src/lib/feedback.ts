/** ============================================================
 *  Feedback — أصوات + اهتزاز + كونفيتي
 *  كل التأثيرات في وحدة واحدة، مُدارة من متجر التفضيلات.
 *  ============================================================ */

import { Haptics, ImpactStyle } from "@capacitor/haptics";

// ---------- الصوت (Web Audio) ----------

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = "sine", volume = 0.15) {
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

export const sfx = {
  correct: () => {
    tone(523.25, 0, 0.15);
    tone(659.25, 0.12, 0.15);
    tone(783.99, 0.24, 0.3);
  },
  wrong: () => {
    tone(196, 0, 0.25, "sawtooth", 0.08);
    tone(146.83, 0.15, 0.35, "sawtooth", 0.08);
  },
  streak: (level = 0) => {
    const base = 440 * Math.pow(1.12, Math.min(level, 8));
    tone(base, 0, 0.12, "triangle", 0.1);
    tone(base * 1.5, 0.1, 0.2, "triangle", 0.1);
  },
  tap: () => tone(880, 0, 0.05, "square", 0.03),
  levelUp: () => {
    tone(523.25, 0, 0.12, "triangle", 0.12);
    tone(659.25, 0.1, 0.12, "triangle", 0.12);
    tone(783.99, 0.2, 0.12, "triangle", 0.12);
    tone(1046.5, 0.3, 0.35, "triangle", 0.14);
  },
  unlock: () => {
    tone(880, 0, 0.1, "triangle", 0.1);
    tone(1174.66, 0.08, 0.25, "triangle", 0.12);
  },
};

// ---------- الاهتزاز ----------

export async function buzz(kind: "light" | "medium" | "heavy"): Promise<void> {
  try {
    const style = kind === "light" ? ImpactStyle.Light : kind === "medium" ? ImpactStyle.Medium : ImpactStyle.Heavy;
    await Haptics.impact({ style });
  } catch {
    /* غير مدعوم */
  }
}

// ---------- الكونفيتي ----------

export async function celebrate(colors: string[] = ["#10b981", "#fbbf24", "#ffffff"], heavy = false): Promise<void> {
  try {
    const confetti = (await import("canvas-confetti")).default;
    void confetti({
      particleCount: heavy ? 130 : 70,
      spread: heavy ? 85 : 65,
      startVelocity: heavy ? 40 : 32,
      disableForReducedMotion: true,
      origin: { y: 0.65 },
      colors,
    });
  } catch {
    /* غير متوفر */
  }
}
