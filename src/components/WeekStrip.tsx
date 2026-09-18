import { motion } from "framer-motion";
import { todayKey } from "../lib/store";
import { currentLang, dayNames } from "../lib/i18n";
import { cn } from "../utils/cn";

interface Props {
  answers: Record<string, boolean>;
}

export function WeekStrip({ answers }: Props) {
  const lang = currentLang();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  return (
    <div className="glass-card flex items-center justify-between gap-1 rounded-2xl px-2 py-3 sm:px-3">
      {days.map((d, i) => {
        const key = todayKey(d);
        const result = answers[key];
        const isToday = i === 6;
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
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
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-full text-xs font-black shadow-sm sm:size-8 sm:text-sm",
                result === true && "bg-gradient-to-br from-grass-400 to-grass-600 text-white",
                result === false && "bg-gradient-to-br from-red-400 to-red-600 text-white",
                result === undefined && "bg-ink/5 text-ink/30 dark:bg-white/10 dark:text-white/30",
                isToday && result === undefined && "ring-2 ring-grass-500/50",
              )}
            >
              {result === undefined ? d.getDate() : result ? "✓" : "✗"}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
