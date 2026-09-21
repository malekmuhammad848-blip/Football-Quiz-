/** ============================================================
 *  StreakOrb — كبسولة السلسلة
 *  ============================================================ */

import { motion } from "framer-motion";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { FlameMark } from "./Icons";

interface Props {
  streak: number;
  best: number;
  lang: Lang;
}

export function StreakOrb({ streak, best, lang }: Props) {
  const heat = Math.min(streak / 30, 1);

  return (
    <div
      className={cn(
        "glass-card flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold shadow-lg",
        streak >= 3 && "border-gold/40",
      )}
      title={`${t(lang, "myStreak")}: ${streak} / ${best}`}
    >
      {/* نبضة خفيفة بلا تكرار لانهائي — يوفر GPU */}
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 0.55, repeat: 3, repeatDelay: Math.max(1, 2.5 - heat * 2) }}
        className="flex"
      >
        <FlameMark className="size-5 sm:size-6" />
      </motion.span>
      <span className="tabular-nums">{streak}</span>
      <span className="text-xs font-medium opacity-50">/ {best}</span>
    </div>
  );
}
