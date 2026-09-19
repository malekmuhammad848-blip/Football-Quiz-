/** ============================================================
 *  WeekStrip — آخر 7 أيام: صح/خطأ/بلا إجابة
 *  ============================================================ */

import { motion } from "framer-motion";
import { lastNDayKeys } from "../core/date";
import { dayNames, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { CheckBadge, CrossBadge } from "./Icons";

interface Props {
  /** مفتاح اليوم → هل الإجابة صحيحة؟ (غياب المفتاح = بلا إجابة) */
  results: Record<string, boolean>;
  lang: Lang;
}

export function WeekStrip({ results, lang }: Props) {
  const keys = lastNDayKeys(7);

  return (
    <section className="glass-card rounded-2xl px-2 py-3 sm:px-3">
      <div className="flex items-center justify-between gap-1">
        {keys.map((key, i) => {
          const isToday = i === 6;
          const result = results[key];
          const d = new Date(`${key}T00:00:00`);
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <span
                className={cn(
                  "text-[9px] font-bold opacity-60 sm:text-[10px]",
                  isToday && "text-grass-600 opacity-100 dark:text-grass-400",
                )}
              >
                {dayNames[lang][d.getDay()]}
              </span>
              {result === true ? (
                <CheckBadge className="size-7 sm:size-8" />
              ) : result === false ? (
                <CrossBadge className="size-7 sm:size-8" />
              ) : (
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full bg-ink/5 text-xs font-black text-ink/30 sm:size-8 dark:bg-white/10 dark:text-white/30",
                    isToday && "ring-2 ring-grass-500/50",
                  )}
                >
                  {d.getDate()}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
