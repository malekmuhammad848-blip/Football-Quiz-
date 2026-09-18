import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { FlameMark } from "./Icons";

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
      initial={{ scale: 0.94 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={cn("glass-card relative flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold shadow-lg")}
      title={`${streak} / ${best}`}
    >
      <motion.span
        animate={{ scale: [1, 1.18, 1], rotate: [0, -4, 4, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 2.5 - heat, duration: 0.55 }}
        className="relative flex"
      >
        <FlameMark className="size-5 drop-shadow sm:size-6" />
      </motion.span>
      <span className="relative tabular-nums">{streak}</span>
      <span className="relative text-xs font-medium opacity-50">/ {best}</span>
    </motion.div>
  );
}
