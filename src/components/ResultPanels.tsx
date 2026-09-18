import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Question } from "../data/questions";

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
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="space-y-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-3 text-2xl font-extrabold"
      >
        {correct ? (
          <CheckCircle2 className="size-9 text-grass-500 drop-shadow" />
        ) : (
          <XCircle className="size-9 text-red-500 drop-shadow" />
        )}
        <span>{phrase}</span>
      </motion.div>

      {!correct && (
        <p className="text-base font-bold text-red-500">
          الإجابة الصحيحة: {question.options[question.answer]}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-4 shadow-sm"
      >
        <p className="text-sm leading-7 opacity-80">💡 {question.fact}</p>
      </motion.div>

      {milestone && (
        <motion.p
          initial={{ scale: 0.6, rotate: -3 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 12 }}
          className="rounded-2xl bg-gradient-to-l from-gold/30 to-gold/10 px-4 py-3 text-center font-black text-ink shadow"
        >
          🏅 {milestone}
        </motion.p>
      )}
    </motion.div>
  );
}
