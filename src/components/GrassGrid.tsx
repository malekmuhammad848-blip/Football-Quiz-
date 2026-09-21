/** ============================================================
 *  GrassGrid — مصفوفة النشاط 30 يومًا (بأسلوب GitHub/Duolingo)
 *  كل مربع = يوم: أخضر فاتح/غامق حسب الأداء، رمادي = بلا إجابة.
 *  ============================================================ */

import { useMemo } from "react";
import { motion } from "framer-motion";
import { lastNDayKeys } from "../core/date";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";

interface Props {
  /** سجل الإجابات: مفتاح اليوم → فهرس الخيار */
  history: Record<string, number>;
  /** الخيارات لكل سؤال — لاستنتاج صح/خطأ (نمرر دوال محسوبة) */
  results: Record<string, boolean>;
  lang: Lang;
}

export function GrassGrid({ history, results, lang }: Props) {
  const keys = useMemo(() => lastNDayKeys(30), []);
  const totalActive = keys.filter((k) => history[k] !== undefined).length;

  return (
    <section className="glass-card rounded-2xl p-3.5 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-black">{t(lang, "grassTitle")}</h3>
        <span className="rounded-full bg-grass-500/10 px-2.5 py-0.5 text-[10px] font-black text-grass-700 tabular-nums dark:text-grass-400">
          {totalActive}/30
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {keys.map((key, i) => {
          const res = results[key];
          const answered = res !== undefined;
          const d = new Date(`${key}T00:00:00`);
          const isToday = i === 29;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.012, 0.5), duration: 0.18 }}
              title={`${key} — ${answered ? (res ? t(lang, "grassWin") : t(lang, "grassLoss")) : t(lang, "grassNone")}`}
              className={cn(
                "size-[calc((100%-16.5rem)/15)] min-w-3.5 flex-1 basis-3.5 aspect-square rounded-[4px] transition-transform hover:scale-125 sm:size-4",
                res === true
                  ? "bg-grass-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                  : res === false
                    ? "bg-red-400/70"
                    : "bg-ink/8 dark:bg-white/8",
                isToday && "ring-2 ring-gold/60",
              )}
              aria-label={`${d.getDate()}: ${answered ? (res ? "correct" : "wrong") : "no answer"}`}
            />
          );
        })}
      </div>
      <div className="mt-2.5 flex items-center justify-end gap-1.5 text-[9px] font-bold text-faint">
        <span>{t(lang, "grassLess")}</span>
        <span className="size-2.5 rounded-[3px] bg-ink/8 dark:bg-white/8" />
        <span className="size-2.5 rounded-[3px] bg-red-400/70" />
        <span className="size-2.5 rounded-[3px] bg-grass-500" />
        <span>{t(lang, "grassMore")}</span>
      </div>
    </section>
  );
}
