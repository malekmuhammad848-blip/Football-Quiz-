/** ============================================================
 *  LevelUpBurst — احتفال ترقية المستوى كامل الشاشة
 *  يظهر لحظة الترقية: وميض ذهبي + شارة المستوى + وابل كونفيتي.
 *  ============================================================ */

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StarMark } from "./Icons";

interface Props {
  open: boolean;
  level: number;
  levelName: string;
  onClose: () => void;
}

export function LevelUpBurst({ open, level, levelName, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    void import("canvas-confetti").then((m) => {
      // وابل مزدوج من الجهتين
      m.default({ particleCount: 90, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: ["#fbbf24", "#10b981", "#ffffff"] });
      m.default({ particleCount: 90, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: ["#fbbf24", "#10b981", "#ffffff"] });
    });
    const id = setTimeout(onClose, 2600);
    return () => clearTimeout(id);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.5, y: 40, rotate: -6 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="relative mx-4 flex w-full max-w-xs flex-col items-center gap-3 rounded-[2rem] border border-gold/50 bg-surface p-8 text-center shadow-2xl"
          >
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(251,191,36,0.22), transparent)" }} />

            <motion.div
              animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.4 }}
            >
              <StarMark className="size-20" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-xs font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300"
            >
              Level {level}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-gradient-to-l from-grass-600 to-gold bg-clip-text text-3xl font-black text-transparent dark:from-grass-400"
            >
              {levelName}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-bold opacity-60"
            >
              + استمر في اللمعان ⚽
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
