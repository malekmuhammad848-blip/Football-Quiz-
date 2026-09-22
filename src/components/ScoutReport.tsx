/** ============================================================
 *  ScoutReport — تقرير الكشّاف: إتقانك لكل مجال كروي
 *  حلقة تفاعل ذكية: تُظهر نقاط ضعفك وتدفعك للتدريب عليها —
 *  كل أسئلة التدريب/السرعة/الترجيح تغذي هذا التقرير تلقائيًا.
 *  ============================================================ */

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Crosshair, GraduationCap } from "lucide-react";
import { analyzeMastery, weakestCategory, type CategoryMastery } from "../domain/progression";
import type { Category, Progress } from "../domain/types";
import { t, type Lang, type TKey } from "../lib/i18n";
import { cn } from "../utils/cn";

const CAT_KEY: Record<Category, TKey> = {
  history: "catHistory",
  worldcup: "catWorldcup",
  clubs: "catClubs",
  players: "catPlayers",
  legends: "catLegends",
  arab: "catArab",
};

function masteryColor(acc: number): string {
  if (acc >= 0.8) return "bg-grass-500";
  if (acc >= 0.6) return "bg-gold";
  if (acc >= 0.4) return "bg-orange-400";
  return "bg-red-400";
}

function masteryLabel(acc: number, lang: Lang): string {
  if (acc >= 0.8) return lang === "ar" ? "خبير" : "Expert";
  if (acc >= 0.6) return lang === "ar" ? "قوي" : "Solid";
  if (acc >= 0.4) return lang === "ar" ? "متوسط" : "Average";
  return lang === "ar" ? "ضعيف" : "Weak";
}

interface Props {
  progress: Progress;
  lang: Lang;
  /** الانتقال للتدريب (يفتح وضع التدريب مباشرة) */
  onTrain?: () => void;
}

export function ScoutReport({ progress, lang, onTrain }: Props) {
  const rows = useMemo(() => analyzeMastery(progress.categoryRecord ?? {}), [progress.categoryRecord]);
  const weak = useMemo(() => weakestCategory(progress.categoryRecord ?? {}), [progress.categoryRecord]);
  const totalAnswered = rows.reduce((s, r) => s + r.answered, 0);

  if (totalAnswered === 0) return null;

  const weakCatKey = weak ? CAT_KEY[(weak.category as Category) ?? "history"] : null;

  return (
    <section className="glass-card relative overflow-hidden rounded-3xl p-4 sm:p-5">
      <div className="pointer-events-none absolute -top-12 -end-10 size-32 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(56,189,248,0.12), transparent)" }} />

      <div className="mb-3 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
          <Crosshair className="size-4" />
        </span>
        <div className="leading-tight">
          <h3 className="text-sm font-black">{t(lang, "scoutTitle")}</h3>
          <p className="text-[10px] font-bold opacity-50">{t(lang, "scoutDesc")}</p>
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((r: CategoryMastery, i) => {
          const key = CAT_KEY[(r.category as Category) ?? "history"];
          const pct = Math.round(r.accuracy * 100);
          return (
            <motion.div
              key={r.category}
              initial={{ opacity: 0, x: lang === "ar" ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-20 shrink-0 truncate text-[11px] font-black opacity-80 sm:w-24">
                {t(lang, key)}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/8 dark:bg-white/10">
                <motion.div
                  className={cn("h-full rounded-full", r.answered > 0 ? masteryColor(r.accuracy) : "bg-ghost")}
                  initial={false}
                  animate={{ width: `${r.answered > 0 ? Math.max(6, pct) : 0}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <span className="w-12 shrink-0 text-end text-[10px] font-black tabular-nums opacity-60">
                {r.answered > 0 ? `${pct}%` : "—"}
              </span>
              <span className="hidden w-12 shrink-0 text-[10px] font-bold opacity-40 sm:block">
                {r.answered > 0 ? masteryLabel(r.accuracy, lang) : ""}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* نداء نقطة الضعف */}
      {weak && weakCatKey && (
        <div className="mt-3.5 flex items-center justify-between gap-3 rounded-2xl border border-orange-400/30 bg-orange-400/8 px-3.5 py-2.5">
          <p className="min-w-0 text-xs font-black leading-5">
            <span className="opacity-70">{t(lang, "scoutWeak")}: </span>
            {t(lang, weakCatKey)}
            <span className="ms-1 opacity-60">({Math.round(weak.accuracy * 100)}%)</span>
          </p>
          {onTrain && (
            <button
              onClick={onTrain}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-l from-sky-500 to-sky-600 px-3 py-2 text-[11px] font-black text-white shadow-md transition-transform active:scale-95"
            >
              <GraduationCap className="size-3.5" />
              {t(lang, "scoutTrain")}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
