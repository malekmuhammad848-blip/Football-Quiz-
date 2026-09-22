/** ============================================================
 *  TrainingMode — أسئلة سريعة متتالية بلا أثر على السلسلة
 *  25% من الأسئلة تُعرض بصريًا (طقم/علم/شعار) — الوجوه والألوان تُفعّل البصري.
 *  ============================================================ */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, X } from "lucide-react";
import { GAMEPLAY } from "../core/config";
import { QUESTIONS } from "../data/questions";
import { localizeQuestion } from "../domain/dailyEngine";
import { fnv1a } from "../core/date";
import { sfx, buzz } from "../lib/feedback";
import { stadium } from "../lib/stadium";
import { progressStore } from "../stores/progressStore";
import { questsStore } from "../stores/questsStore";
import { t, type Lang } from "../lib/i18n";
import type { LocalizedQuestion } from "../domain/types";
import { cn } from "../utils/cn";
import { Badge, Button } from "./ui/primitives";
import { VisualQuestion, makeVisual, buildVisualQuestion } from "./VisualQuestion";
import { CheckBadge, CrossBadge, TrophyMark } from "./Icons";

interface Props {
  lang: Lang;
  soundOn: boolean;
  hapticsOn: boolean;
  onExit: () => void;
}

interface TrainQ {
  id: string;
  category: LocalizedQuestion["category"];
  difficulty: LocalizedQuestion["difficulty"];
  q: string;
  options: string[];
  answer: number;
  fact: string;
}

function buildSet(lang: Lang, seed: number): TrainQ[] {
  // اختيار عشوائي مثبت بالبذرة من البنك كله
  const indices = QUESTIONS.map((_, i) => i);
  let s = seed >>> 0 || 1;
  for (let i = indices.length - 1; i > 0; i--) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const j = s % (i + 1);
    [indices[i], indices[j]] = [indices[j]!, indices[i]!];
  }
  return indices.slice(0, GAMEPLAY.trainSetSize).map((qi, k) => {
    const lq = localizeQuestion(QUESTIONS[qi]!, lang, seed + k * 7919);
    return { id: lq.id, category: lq.category, q: lq.q, options: lq.options, answer: lq.answer, fact: lq.fact, difficulty: lq.difficulty };
  });
}

export function TrainingMode({ lang, soundOn, hapticsOn, onExit }: Props) {
  // بذرة من الوقت — تدريب مختلف في كل جلسة
  const sessionSeed = useMemo(() => fnv1a(String(Date.now())), []);
  const set = useMemo(() => buildSet(lang, sessionSeed), [lang, sessionSeed]);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const base = set[step];

  // سؤال بصري مضمون: كل سؤال ثالث يُولَّد من بنك الملصقات ذاتيًا
  // (خياراته وإجابته من الملصق نفسه — لا خلط مع السؤال النصي)
  const generatedVisual = useMemo(
    () => (base && step % 3 === 0 ? buildVisualQuestion(lang, sessionSeed + step * 104729) : null),
    [base, step, lang, sessionSeed],
  );

  // السؤال الفعّال: المولّد بصريًا أو النصي الأصلي
  const current: TrainQ | null = useMemo(() => {
    if (generatedVisual) {
      return {
        id: `visual-${step}`,
        category: base?.category ?? "clubs",
        difficulty: base?.difficulty ?? "easy",
        q: t(lang, "visualWhose"),
        options: generatedVisual.options,
        answer: generatedVisual.answer,
        fact: t(lang, "visualFact"),
      };
    }
    return base ?? null;
  }, [generatedVisual, base, step, lang]);

  // إن كان السؤال النصي خياراته أسماء ملصقات مباشرة نعرض البطاقة فوقه
  const matchedVisual = useMemo(
    () => (generatedVisual || !current ? null : makeVisual(current.options, current.answer, lang)),
    [generatedVisual, current],
  );
  const visualSticker = generatedVisual?.sticker ?? matchedVisual?.sticker ?? null;
  const visualPrompt =
    generatedVisual || matchedVisual?.answer === current?.answer
      ? t(lang, "visualWhose")
      : t(lang, "visualWhich");

  if (!current) {
    return null;
  }

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === current.answer;
    if (correct) {
      setScore((s) => s + 1);
      questsStore.track("trainMaster"); // تتبع مهمة التدريب
    }
    // إتقان الفئات — يغذي تقرير الكشّاف
    progressStore.trackCategory(current.category, correct);
    if (soundOn) {
      (correct ? sfx.correct : sfx.wrong)();
      if (correct && visualSticker) stadium.goal(); // فانفار ماريمبا عند كشف البصري الصحيح
    }
    if (hapticsOn) void buzz(correct ? "medium" : "heavy");
  };

  const next = () => {
    if (soundOn) sfx.tap();
    if (step + 1 >= set.length) {
      if (score >= Math.ceil(set.length * 0.6) && soundOn) sfx.levelUp();
      setDone(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="glass-card relative w-full overflow-hidden rounded-3xl p-4 shadow-lg sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-sky-400 via-sky-300 to-sky-400" />

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-300">
            <GraduationCap className="size-4.5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black">{t(lang, "train")}</p>
            <p className="text-[10px] font-bold opacity-50">
              {t(lang, "question")} {step + 1} {t(lang, "trainOf")} {set.length}
            </p>
          </div>
        </div>
        <button
          onClick={onExit}
          aria-label={t(lang, "trainQuit")}
          className="rounded-full p-2 transition-colors hover:bg-ink/5 dark:hover:bg-white/10"
        >
          <X className="size-4.5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-6 text-center"
          >
            <TrophyMark className="size-14" />
            <p className="text-sm font-bold opacity-60">{t(lang, "trainScore")}</p>
            <p className="text-4xl font-black text-grass-600 dark:text-grass-400">
              {score} / {set.length}
            </p>
            <Button onClick={onExit} className="mt-2 w-full">
              {t(lang, "close")}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
          >
            {visualSticker ? (
              <VisualQuestion sticker={visualSticker} prompt={visualPrompt} className="mb-4" />
            ) : (
              <p className="mb-3 text-base leading-7 font-extrabold sm:text-xl sm:leading-8">{current.q}</p>
            )}
            <div className="grid gap-2">
              {current.options.map((opt, i) => {
                const revealed = selected !== null;
                const isSelected = selected === i;
                const isAnswer = i === current.answer;
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={revealed}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-start text-sm font-semibold transition-colors duration-150",
                      "border-line hover:border-sky-400 hover:bg-sky-500/5",
                      revealed && isSelected && !isAnswer && "border-red-400 bg-red-500/10 text-red-600 dark:text-red-400",
                      revealed && isAnswer && "border-grass-500 bg-grass-500/15 text-grass-700 dark:text-grass-400",
                    )}
                  >
                    <span className="flex-1">{opt}</span>
                    {revealed && isAnswer && <CheckBadge className="size-5 shrink-0" />}
                    {revealed && isSelected && !isAnswer && <CrossBadge className="size-5 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="mt-3 space-y-2.5">
                <p className="flex items-start gap-2 text-xs leading-6 opacity-80">
                  <Badge tone="grass">i</Badge>
                  {current.fact}
                </p>
                <Button onClick={next} className="w-full">
                  {step + 1 >= set.length ? t(lang, "trainScore") : t(lang, "trainNext")}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
