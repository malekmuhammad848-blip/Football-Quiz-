/** ============================================================
 *  StatsGrid — إحصائيات اللاعب الثلاث
 *  ============================================================ */

import { motion } from "framer-motion";
import { t, type Lang } from "../lib/i18n";
import { BallMark, PadMark, TargetMark } from "./Icons";

export function StatsGrid({
  played,
  correct,
  lang,
}: {
  played: number;
  correct: number;
  lang: Lang;
}) {
  const accuracy = Math.round((correct / Math.max(played, 1)) * 100);
  const items = [
    { label: t(lang, "matches"), value: played, Icon: PadMark },
    { label: t(lang, "goals"), value: correct, Icon: BallMark },
    { label: t(lang, "accuracy"), value: `${accuracy}%`, Icon: TargetMark },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {items.map(({ label, value, Icon }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 * i }}
          className="glass-card rounded-2xl p-2.5 text-center sm:p-3"
        >
          <p className="flex items-center justify-center gap-1.5 text-lg font-black text-grass-700 sm:text-xl dark:text-grass-400">
            <Icon className="size-4 sm:size-5" />
            {value}
          </p>
          <p className="text-[10px] font-bold opacity-60 sm:text-xs">{label}</p>
        </motion.div>
      ))}
    </div>
  );
}
