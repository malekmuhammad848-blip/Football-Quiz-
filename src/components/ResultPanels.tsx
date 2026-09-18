import { motion } from "framer-motion";
import type { Question } from "../data/questions";
import { t } from "../lib/i18n";
import { CheckBadge, CrossBadge, TrophyMark } from "./Icons";

interface ResultProps {
  question: Question;
  selected: number;
  phrase: string;
  milestone: string | null;
}

export function ResultPanel({ question, selected, phrase, milestone }: ResultProps) {
  const correct = selected === question.answer;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-3 sm:space-y-4"
    >
      <div className="flex items-center gap-3 text-lg font-extrabold sm:text-2xl">
        {correct ? (
          <CheckBadge className="size-9 shrink-0 sm:size-11" />
        ) : (
          <CrossBadge className="size-9 shrink-0 sm:size-11" />
        )}
        <span>{phrase}</span>
      </div>

      {!correct && (
        <p className="text-sm font-bold text-red-500 sm:text-base">
          {t("correctAnswerIs")}: {question.options[question.answer]}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="glass-card rounded-2xl p-3.5 shadow-sm sm:p-4"
      >
        <p className="flex items-start gap-2 text-xs leading-6 opacity-80 sm:text-sm">
          <span className="mt-0.5 shrink-0 text-base">💡</span>
          {question.fact}
        </p>
      </motion.div>

      {milestone && (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-l from-gold/30 to-gold/10 px-4 py-2.5 shadow sm:text-base"
        >
          <TrophyMark className="size-7 shrink-0 sm:size-8" />
          <span className="text-sm font-black text-ink">{t(milestone)}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
