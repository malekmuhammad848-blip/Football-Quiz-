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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 text-2xl font-extrabold">
        {correct ? (
          <CheckCircle2 className="size-8 text-grass-500" />
        ) : (
          <XCircle className="size-8 text-red-500" />
        )}
        <span>{phrase}</span>
      </div>

      {!correct && (
        <p className="text-base font-semibold text-red-500">
          الإجابة الصحيحة: {question.options[question.answer]}
        </p>
      )}

      <div className="rounded-2xl bg-surface p-4 shadow-sm border border-grass-600/10">
        <p className="text-sm leading-7 opacity-80">💡 {question.fact}</p>
      </div>

      {milestone && (
        <motion.p
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="rounded-xl bg-gold/20 px-4 py-2 text-center font-bold text-ink"
        >
          🏅 {milestone}
        </motion.p>
      )}
    </motion.div>
  );
}
