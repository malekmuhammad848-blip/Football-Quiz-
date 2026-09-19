/** ============================================================
 *  ResultPanel — نتيجة إجابة اليوم
 *  ============================================================ */

import { AnimatePresence, motion } from "framer-motion";
import type { LocalizedQuestion } from "../domain/types";
import { t, type Lang } from "../lib/i18n";
import { CheckBadge, CrossBadge, TrophyMark } from "./Icons";

interface Props {
  question: LocalizedQuestion;
  selected: number;
  phrase: string;
  milestone: string | null;
  xpGained: number;
  leveledUp: boolean;
  levelName: string;
  lang: Lang;
}

export function ResultPanel({
  question,
  selected,
  phrase,
  milestone,
  xpGained,
  leveledUp,
  levelName,
  lang,
}: Props) {
  const correct = selected === question.answer;

  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="space-y-3">
      <div className="flex items-center gap-3">
        {correct ? (
          <CheckBadge className="size-10 shrink-0 sm:size-12" />
        ) : (
          <CrossBadge className="size-10 shrink-0 sm:size-12" />
        )}
        <div className="min-w-0">
          <p className="text-base font-extrabold sm:text-xl">{phrase}</p>
          {xpGained > 0 && (
            <p className="text-xs font-black text-amber-600 dark:text-amber-300">+{xpGained} XP</p>
          )}
        </div>
      </div>

      {!correct && (
        <p className="text-sm font-bold text-red-500">
          {t(lang, "correctAnswerIs")}: {question.options[question.answer]}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
        className="glass-card rounded-2xl p-3.5"
      >
        <p className="flex items-start gap-2 text-xs leading-6 opacity-80 sm:text-sm">
          <span className="mt-0.5 inline-block size-1.5 shrink-0 rounded-full bg-gold" />
          {question.fact}
        </p>
      </motion.div>

      <AnimatePresence>
        {milestone && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-l from-gold/30 to-gold/10 px-4 py-2.5 shadow"
          >
            <TrophyMark className="size-7 shrink-0 sm:size-8" />
            <span className="text-sm font-black">{t(lang, milestone as never)}</span>
          </motion.div>
        )}
        {leveledUp && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-grass-500/30 to-grass-500/10 px-4 py-2.5 shadow"
          >
            <span className="text-sm font-black text-grass-700 dark:text-grass-400">
              {t(lang, "levelUp")} {t(lang, "newLevel")} — {levelName}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

