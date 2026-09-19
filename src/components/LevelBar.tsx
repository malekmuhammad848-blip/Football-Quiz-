/** ============================================================
 *  LevelBar — شريط المستوى وXP
 *  ============================================================ */

import { motion } from "framer-motion";
import { LEVELS, levelFor } from "../domain/progression";
import { t, tr, type Lang } from "../lib/i18n";
import type { Progress } from "../domain/types";
import { ProgressBar } from "./ui/primitives";
import { StarMark } from "./Icons";

export function LevelBar({ progress, lang }: { progress: Progress; lang: Lang }) {
  const lvl = levelFor(progress.xp);
  const xpInto = progress.xp - LEVELS[lvl.index]!.min;
  const xpNeeded = lvl.next !== null ? lvl.next - LEVELS[lvl.index]!.min : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="glass-card rounded-2xl p-3.5 sm:p-4"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-grass-500 to-grass-700 text-base font-black text-white shadow">
            {lvl.current}
            <StarMark className="absolute -top-1.5 -end-1.5 size-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black">{lvl.name}</p>
            <p className="text-[11px] font-bold opacity-50">
              {t(lang, "level")} {lvl.current}
              {lvl.next !== null && ` · ${progress.xp} ${t(lang, "xp")}`}
            </p>
          </div>
        </div>
        {xpNeeded !== null && (
          <p className="text-[11px] font-bold tabular-nums opacity-60">
            {tr("{x}/{y} XP", { x: xpInto, y: xpNeeded })}
          </p>
        )}
      </div>
      <ProgressBar value={lvl.progress} />
    </motion.section>
  );
}
