/** ============================================================
 *  AchievementsPanel — شبكة الإنجازات
 *  ============================================================ */

import { motion } from "framer-motion";
import { t, type Lang } from "../lib/i18n";
import type { Progress } from "../domain/types";
import { ACHIEVEMENTS } from "../domain/progression";
import { ACHIEVEMENTS_BY_ID } from "../stores/progressStore";
import { cn } from "../utils/cn";
import { ACHIEVEMENT_ICONS } from "./Icons";

const NAME_KEYS: Record<string, { ar: string; en: string }> = {
  achFirstGoal: { ar: "أول هدف", en: "First Goal" },
  achFiveCorrect: { ar: "خماسية", en: "High Five" },
  achTwentyCorrect: { ar: "العلامة العشرين", en: "Twenty Up" },
  achStreak3: { ar: "شرارة", en: "Spark" },
  achStreak7: { ar: "اشتعال", en: "On Fire" },
  achStreak30: { ar: "وحيب", en: "Immortal" },
  achVeteran10: { ar: "محارب قديم", en: "Veteran" },
  achVeteran50: { ar: "الخمسون", en: "Half Century" },
  achLevelPro: { ar: "محترف", en: "Pro" },
  achLevelLegend: { ar: "الأسطورة", en: "The Legend" },
};

export function AchievementsPanel({ progress, lang }: { progress: Progress; lang: Lang }) {
  return (
    <section className="glass-card rounded-2xl p-3.5 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-black">{t(lang, "achievements")}</h3>
        <span className="text-xs font-bold tabular-nums opacity-50">
          {progress.unlocked.length} / {ACHIEVEMENTS.length}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {ACHIEVEMENTS.map((a, i) => {
          const unlocked = progress.unlocked.includes(a.id);
          const Icon = ACHIEVEMENT_ICONS[a.icon];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              title={
                unlocked
                  ? NAME_KEYS[`ach${a.id.charAt(0).toUpperCase()}${a.id.slice(1)}`]?.[lang] ?? a.id
                  : t(lang, "achievementsLocked")
              }
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border transition-all duration-200",
                unlocked
                  ? "border-gold/40 bg-gold/10 shadow-sm"
                  : "border-line bg-ink/5 opacity-40 grayscale dark:bg-white/5",
              )}
            >
              <Icon className={cn("size-5 sm:size-6", !unlocked && "opacity-50")} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/** إشعار إنجاز جديد — يظهر لحظة الفتح */
export function UnlockToast({ achievementId, lang }: { achievementId: string; lang: Lang }) {
  const a = ACHIEVEMENTS_BY_ID[achievementId];
  if (!a) return null;
  const Icon = ACHIEVEMENT_ICONS[a.icon];
  const name = NAME_KEYS[`ach${a.id.charAt(0).toUpperCase()}${a.id.slice(1)}`]?.[lang] ?? a.id;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      className="glass-card pointer-events-none fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-xs items-center gap-3 rounded-2xl border-gold/40 p-3 shadow-xl"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gold/20">
        <Icon className="size-7" />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-xs font-black text-amber-600 dark:text-amber-300">{t(lang, "achievements")}</p>
        <p className="truncate text-sm font-bold">{name}</p>
      </div>
    </motion.div>
  );
}
