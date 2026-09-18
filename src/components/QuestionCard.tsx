import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import type { Question } from "../data/questions";
import { t, currentLang } from "../lib/i18n";
import { CheckBadge, CrossBadge } from "./Icons";
import { cn } from "../utils/cn";

interface Props {
  question: Question;
  selected: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

const LETTERS = ["أ", "ب", "ج", "د"];
const LETTERS_EN = ["A", "B", "C", "D"];
const DAY_MS = 86_400_000;

function useCountdown() {
  const [left, setLeft] = useState(DAY_MS);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      setLeft(midnight.getTime() - now.getTime());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.max(0, Math.floor(left / 3_600_000));
  const m = Math.max(0, Math.floor((left % 3_600_000) / 60_000));
  const s = Math.max(0, Math.floor((left % 60_000) / 1000));
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function QuestionCard({ question, selected, onSelect, disabled }: Props) {
  const countdown = useCountdown();
  const revealed = selected !== null;
  const isAr = currentLang() === "ar";
  const letters = isAr ? LETTERS : LETTERS_EN;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="glass-card relative w-full overflow-hidden rounded-3xl p-4 shadow-lg shadow-grass-700/10 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-grass-500 via-gold to-grass-500" />

      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-grass-500/10 px-3 py-1 text-xs font-black text-grass-700 dark:text-grass-400">
          {t("todayQuestion")}
        </span>
        {!revealed && (
          <span className="flex items-center gap-1.5 text-sm font-bold tabular-nums opacity-70">
            <Timer className="size-4" />
            {countdown}
          </span>
        )}
      </div>

      <h2 className="text-lg leading-8 font-extrabold sm:text-2xl sm:leading-9">{question.q}</h2>

      <div className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isAnswer = i === question.answer;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={
                revealed && isSelected && !isAnswer
                  ? { opacity: 1, x: [0, -5, 5, -3, 3, 0] }
                  : { opacity: 1, x: 0 }
              }
              transition={{ delay: revealed ? 0 : 0.05 * i, duration: revealed ? 0.35 : 0.2 }}
              whileTap={!revealed ? { scale: 0.98 } : undefined}
              disabled={disabled || revealed}
              onClick={() => onSelect(i)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-right text-sm font-semibold transition-colors duration-150 sm:px-4 sm:py-3.5 sm:text-base",
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
                {letters[i]}
              </span>
              <span className="flex-1">{opt}</span>
              {revealed && isAnswer && <CheckBadge className="size-6 shrink-0 sm:size-7" />}
              {revealed && isSelected && !isAnswer && (
                <CrossBadge className="size-6 shrink-0 sm:size-7" />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
