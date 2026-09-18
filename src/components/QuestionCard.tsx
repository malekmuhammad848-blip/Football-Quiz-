import { motion } from "framer-motion";
import type { Question } from "../data/questions";
import { cn } from "../utils/cn";

interface Props {
  question: Question;
  selected: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

const LETTERS = ["أ", "ب", "ج", "د"];

export function QuestionCard({ question, selected, onSelect, disabled }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-3xl bg-surface p-6 shadow-lg shadow-grass-700/5 border border-grass-600/10"
    >
      <h2 className="text-xl leading-9 font-extrabold sm:text-2xl">{question.q}</h2>

      <div className="mt-6 grid gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isAnswer = i === question.answer;
          const revealed = selected !== null;

          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              disabled={disabled || revealed}
              onClick={() => onSelect(i)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-right text-base font-semibold transition-colors sm:text-lg",
                "border-grass-600/15 hover:border-grass-500 hover:bg-grass-500/5",
                revealed && isSelected && !isAnswer && "border-red-400 bg-red-500/10 text-red-600 dark:text-red-400",
                revealed && isAnswer && "border-grass-500 bg-grass-500/15 text-grass-700 dark:text-grass-500",
                !revealed && "bg-pitch text-ink",
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-black",
                  "bg-grass-600 text-white",
                  revealed && isAnswer && "bg-grass-500",
                  revealed && isSelected && !isAnswer && "bg-red-500",
                )}
              >
                {LETTERS[i]}
              </span>
              <span className="flex-1">{opt}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
