import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Timer } from "lucide-react";
import type { Question } from "../data/questions";
import { cn } from "../utils/cn";

interface Props {
  question: Question;
  selected: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

const LETTERS = ["أ", "ب", "ج", "د"];
const DAY_MS = 86_400_000;

/** الوقت المتبقي حتى منتصف الليل (لانتهاء سؤال اليوم) */
function useCountdown() {
  const [left, setLeft] = useState(() => DAY_MS - (Date.now() % DAY_MS) - new Date().getTimezoneOffset() * 60_000);
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      setLeft(midnight.getTime() - now.getTime());
    }, 1000);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card relative w-full overflow-hidden rounded-3xl p-6 shadow-xl shadow-grass-700/10"
    >
      {/* شريط علوي متدرج */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-grass-500 via-gold to-grass-500" />

      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-grass-500/10 px-3 py-1 text-xs font-black text-grass-700 dark:text-grass-400">
          سؤال اليوم
        </span>
        {!revealed && (
          <span className="flex items-center gap-1.5 text-sm font-bold tabular-nums opacity-70">
            <Timer className="size-4 animate-pulse" />
            {countdown}
          </span>
        )}
      </div>

      <h2 className="text-xl leading-9 font-extrabold sm:text-2xl">{question.q}</h2>

      <div className="mt-6 grid gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isAnswer = i === question.answer;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={
                revealed && isSelected && !isAnswer
                  ? { opacity: 1, x: [0, -6, 6, -4, 4, 0] }
                  : { opacity: 1, x: 0 }
              }
              transition={{ delay: revealed ? 0 : 0.06 * i, duration: revealed ? 0.4 : 0.3 }}
              whileTap={!revealed ? { scale: 0.97 } : undefined}
              whileHover={!revealed ? { scale: 1.01 } : undefined}
              disabled={disabled || revealed}
              onClick={() => onSelect(i)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-right text-base font-semibold transition-colors sm:text-lg",
                "border-line hover:border-grass-500 hover:bg-grass-500/5",
                revealed && isSelected && !isAnswer && "border-red-400 bg-red-500/10 text-red-600 dark:text-red-400",
                revealed && isAnswer && "border-grass-500 bg-grass-500/15 text-grass-700 dark:text-grass-400",
                !revealed && "bg-surface/60",
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-black transition-colors",
                  "bg-gradient-to-br from-grass-500 to-grass-700 text-white shadow",
                  revealed && isAnswer && "from-grass-400 to-grass-600",
                  revealed && isSelected && !isAnswer && "from-red-400 to-red-600",
                )}
              >
                {LETTERS[i]}
              </span>
              <span className="flex-1">{opt}</span>
              <AnimatePresence>
                {revealed && isAnswer && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xl"
                  >
                    ✅
                  </motion.span>
                )}
                {revealed && isSelected && !isAnswer && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xl"
                  >
                    ❌
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
