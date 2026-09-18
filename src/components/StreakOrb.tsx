import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "../utils/cn";

interface Props {
  streak: number;
  best: number;
}

export function StreakOrb({ streak, best }: Props) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    setPulse((p) => p + 1);
  }, [streak]);

  const heat = Math.min(streak / 30, 1);

  return (
    <motion.div
      key={pulse}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm",
        "bg-surface text-ink border border-grass-600/20",
      )}
      title={`سلسلتك الحالية ${streak} — أفضل سلسلة ${best}`}
    >
      <motion.span
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 2 + (1 - heat) * 4, duration: 0.5 }}
        style={{ color: `oklch(${0.55 + heat * 0.3} 0.2 45)` }}
      >
        <Flame className="size-5" />
      </motion.span>
      <span>{streak}</span>
      <span className="text-xs font-medium opacity-60">/ أفضل {best}</span>
    </motion.div>
  );
}
