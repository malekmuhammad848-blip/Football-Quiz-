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
        "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-lg",
        "glass-card",
      )}
      title={`سلسلتك الحالية ${streak} — أفضل سلسلة ${best}`}
    >
      {/* هالة نارية */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ repeat: Infinity, duration: 2 + (1 - heat) * 2 }}
        style={{
          background: `radial-gradient(circle, oklch(${0.6 + heat * 0.25} 0.22 45 / ${0.2 + heat * 0.35}) 0%, transparent 70%)`,
        }}
      />
      <motion.span
        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, repeatDelay: 2 + (1 - heat) * 4, duration: 0.6 }}
        className="relative"
        style={{ color: `oklch(${0.55 + heat * 0.3} 0.22 45)` }}
      >
        <Flame className="size-5" />
      </motion.span>
      <span className="relative">{streak}</span>
      <span className="relative text-xs font-medium opacity-60">/ أفضل {best}</span>
    </motion.div>
  );
}
