/** ============================================================
 *  Feedback — أصوات + اهتزاز + كونفيتي
 *  كل التأثيرات في وحدة واحدة، مُدارة من متجر التفضيلات.
 *  الصوت يمر عبر محرك stadium.ts الموحد — سياق AudioContext واحد.
 *  ============================================================ */

import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { chime, softDud, levelUpArp, tapTick, streakNote } from "./stadium";

export { primeAudio } from "./stadium";

export const sfx = {
  correct: () => chime(),
  wrong: () => softDud(),
  streak: (level = 0) => streakNote(level),
  tap: () => tapTick(),
  levelUp: () => levelUpArp(),
  unlock: () => {
    chime();
    setTimeout(() => chime(), 160);
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
      particleCount: heavy ? 120 : 65,
      spread: heavy ? 80 : 60,
      startVelocity: heavy ? 38 : 30,
      disableForReducedMotion: true,
      origin: { y: 0.65 },
      colors,
    });
  } catch {
    /* غير متوفر */
  }
}
