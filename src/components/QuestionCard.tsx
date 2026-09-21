/** ============================================================
 *  QuestionCard — بطاقة سؤال اليوم
 *  ============================================================ */

import { motion } from "framer-motion";
import type { LocalizedQuestion } from "../domain/types";
import { t, type TKey, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { Badge } from "./ui/primitives";
import { CountdownBadge } from "./CountdownBadge";
import { CheckBadge, CrossBadge } from "./Icons";

interface Props {
  question: LocalizedQuestion;
  selected: number | null;
  onSelect: (index: number) => void;
  lang: Lang;
  disabled?: boolean;
}

const LETTERS: Record<Lang, string[]> = {
  ar: ["أ", "ب", "ج", "د"],
  en: ["A", "B", "C", "D"],
};

const CATEGORY_KEY: Record<LocalizedQuestion["category"], TKey> = {
  history: "catHistory",
  worldcup: "catWorldcup",
  clubs: "catClubs",
  players: "catPlayers",
  legends: "catLegends",
  arab: "catArab",
};

const DIFFICULTY_KEY: Record<LocalizedQuestion["difficulty"], TKey> = {
  easy: "difficultyEasy",
  medium: "difficultyMedium",
  hard: "difficultyHard",
};

export function QuestionCard({ question, selected, onSelect, lang, disabled }: Props) {
  const revealed = selected !== null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="glass-card relative w-full overflow-hidden rounded-3xl p-4 shadow-lg shadow-grass-700/10 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-grass-500 via-gold to-grass-500" />

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge tone="grass">{t(lang, CATEGORY_KEY[question.category])}</Badge>
          <Badge tone="gold">{t(lang, DIFFICULTY_KEY[question.difficulty])}</Badge>
        </div>
        {!revealed && <CountdownBadge />}
      </div>

      <h2 className="text-lg leading-8 font-extrabold sm:text-2xl sm:leading-9">{question.q}</h2>

      <div className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isAnswer = i === question.answer;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={
                revealed && isSelected && !isAnswer
                  ? { opacity: 1, y: 0, x: [0, -5, 5, -3, 3, 0] }
                  : { opacity: 1, y: 0, x: 0 }
              }
              transition={{ delay: revealed ? 0 : 0.04 * i, duration: revealed ? 0.35 : 0.18 }}
              whileTap={!revealed ? { scale: 0.985 } : undefined}
              disabled={disabled || revealed}
              onClick={() => onSelect(i)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-start text-sm font-semibold transition-colors duration-150 sm:px-4 sm:py-3.5 sm:text-base",
                "border-line hover:border-grass-500 hover:bg-grass-500/5",
                revealed && isSelected && !isAnswer && "border-red-400 bg-red-500/10 text-red-600 dark:text-red-400",
                revealed && isAnswer && "border-grass-500 bg-grass-500/15 text-grass-700 dark:text-grass-400",
                !revealed && "bg-surface/60",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-black transition-colors duration-150 sm:size-8 sm:text-sm",
                  "bg-gradient-to-br from-grass-500 to-grass-700 text-white shadow",
                  revealed && isAnswer && "from-grass-400 to-grass-600",
                  revealed && isSelected && !isAnswer && "from-red-400 to-red-600",
                )}
              >
                {LETTERS[lang][i]}
              </span>
              <span className="flex-1">{opt}</span>
              {revealed && isAnswer && <CheckBadge className="size-6 shrink-0 sm:size-7" />}
              {revealed && isSelected && !isAnswer && <CrossBadge className="size-6 shrink-0 sm:size-7" />}
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
}
