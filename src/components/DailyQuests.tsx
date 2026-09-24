/** ============================================================
 *  DailyQuests — لوحة المهام اليومية بأسلوب Duolingo
 *  3 مهام + بونص إكمال الكل. تُتجدَّد منتصف الليل تلقائيًا.
 *  ============================================================ */

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Circle, Flame, GraduationCap, Gift, Volleyball } from "lucide-react";
import { ALL_BONUS_XP, QUEST_DEFS, allComplete, type QuestDef } from "../domain/quests";
import { COINS } from "../domain/coinEconomy";
import { useStore } from "../core/store";
import { questsStore } from "../stores/questsStore";
import { progressStore } from "../stores/progressStore";
import { sfx } from "../lib/feedback";
import { prefsStore } from "../stores/prefsStore";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { ProgressBar } from "./ui/primitives";
import { CoinMark, ShieldMark } from "./Icons";

const QUEST_ICONS = {
  answerDaily: Volleyball,
  trainMaster: GraduationCap,
  penaltyAce: Flame,
} as const;

function questTitle(lang: Lang, def: QuestDef): string {
  return lang === "ar" ? def.ar.title : def.en.title;
}

function questHint(lang: Lang, def: QuestDef): string {
  return lang === "ar" ? def.ar.hint : def.en.hint;
}

export function DailyQuests({ lang }: { lang: Lang }) {
  const quests = useStore(questsStore, (s) => s);
  const streak = useStore(progressStore, (s) => s.streak);
  const complete = useMemo(() => allComplete(quests), [quests]);

  const onClaim = (id: (typeof QUEST_DEFS)[number]["id"], reward: number) => {
    const got = questsStore.claim(id);
    if (got > 0 && prefsStore.getState().sound) sfx.unlock();
    void reward;
  };

  const onClaimAll = () => {
    const got = questsStore.claimAllBonus();
    if (got > 0 && prefsStore.getState().sound) {
      sfx.levelUp();
      void import("canvas-confetti").then((m) =>
        m.default({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors: ["#fbbf24", "#10b981", "#ffffff"] }),
      );
    }
  };

  return (
    <section className="glass-card relative overflow-hidden rounded-3xl p-4 sm:p-5">
      <div className="pointer-events-none absolute -top-12 -start-10 size-32 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(251,191,36,0.14), transparent)" }} />

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl bg-gold/15 text-amber-600 dark:text-amber-300">
            <Gift className="size-4.5" />
          </span>
          <div className="leading-tight">
            <h3 className="text-sm font-black">{t(lang, "questsTitle")}</h3>
            <p className="text-[10px] font-bold opacity-50">{t(lang, "questsReset")}</p>
          </div>
        </div>
        {streak > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-flame/10 px-2.5 py-1 text-xs font-black text-orange-600 dark:text-orange-300">
            <Flame className="size-3.5" />
            {streak}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {QUEST_DEFS.map((def, i) => {
          const Icon = QUEST_ICONS[def.id as keyof typeof QUEST_ICONS];
          const value = quests.progress[def.id] ?? 0;
          const done = value >= def.target;
          const claimed = quests.claimed.includes(def.id);
          const pct = Math.min(1, value / def.target);

          return (
            <motion.div
              key={def.id}
              initial={{ opacity: 0, x: lang === "ar" ? 12 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-2.5 transition-colors",
                claimed
                  ? "border-grass-500/30 bg-grass-500/5"
                  : done
                    ? "border-gold/40 bg-gold/10"
                    : "border-line bg-surface/50",
              )}
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                  done ? "bg-gold/20 text-amber-600 dark:text-amber-300" : "bg-ink/5 dark:bg-white/10",
                )}
              >
                <Icon className="size-5" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("truncate text-xs font-black sm:text-sm", claimed && "opacity-50 line-through")}>
                    {questTitle(lang, def)}
                  </p>                    <span className="flex shrink-0 items-center gap-1 text-[10px] font-black text-amber-600 tabular-nums dark:text-amber-300">
                      +{def.rewardXp} XP · <CoinMark className="size-3" />+{COINS.quest[def.id] ?? 0}
                    </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <ProgressBar value={pct} className="h-1.5 flex-1" />
                  <span className="shrink-0 text-[10px] font-bold tabular-nums opacity-50">
                    {Math.min(value, def.target)}/{def.target}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[10px] font-medium opacity-40">{questHint(lang, def)}</p>
              </div>

              {done && !claimed && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onClaim(def.id, def.rewardXp)}
                  className="shrink-0 rounded-xl bg-gradient-to-l from-amber-500 to-gold px-3 py-2 text-xs font-black text-amber-950 shadow-md"
                >
                  {t(lang, "claim")}
                </motion.button>
              )}
              {claimed && <CheckCircle2 className="size-5 shrink-0 text-grass-500" />}
              {!done && !claimed && <Circle className="size-5 shrink-0 text-faint" />}
            </motion.div>
          );
        })}
      </div>

      {/* بونص إكمال الكل — يمنح درع سلسلة */}
      <AnimatePresence>
        {complete && !quests.claimed.includes("streakGuard") && (
          <motion.button
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClaimAll}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-gold/50 bg-gradient-to-l from-gold/25 via-gold/15 to-transparent px-4 py-3 shadow-lg"
          >
            <ShieldMark className="size-5" />
            <span className="flex items-center gap-1.5 text-sm font-black text-amber-700 dark:text-amber-200">
              {t(lang, "questsAllBonus")} +{ALL_BONUS_XP} XP · <CoinMark className="size-4" />+{COINS.quest.allBonus} — {t(lang, "questsShieldReward")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
