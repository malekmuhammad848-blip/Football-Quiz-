/** ============================================================
 *  RushMode — السلسلة السريعة: 60 ثانية من الأدرينالين
 *  كل صحيح = +2 ثانية ونقاط كومبو تتضاعف. الخطأ يحرق 3 ثوانٍ.
 *  أفضل نتيجة محفوظة دائمًا على الجهاز.
 *  ============================================================ */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, RotateCcw, Timer, TrendingUp, Zap } from "lucide-react";
import { RUSH, buildRushSet, loadRushRecord, roundSeed, rushPoints, rushXp, saveRushResult, type RushRecord } from "../domain/rushEngine";
import { progressStore } from "../stores/progressStore";
import { prefsStore } from "../stores/prefsStore";
import { sfx, buzz, celebrate } from "../lib/feedback";
import { stadium } from "../lib/stadium";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { Button } from "./ui/primitives";
import { CheckBadge, CrossBadge, ZapMark } from "./Icons";

interface Props {
  lang: Lang;
}

type Phase = "ready" | "playing" | "done";

export function RushMode({ lang }: Props) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [record, setRecord] = useState<RushRecord>(() => loadRushRecord());
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [msLeft, setMsLeft] = useState(RUSH.durationSec * 1000);
  const [bestBeaten, setBestBeaten] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const setRef = useRef<{ seed: number }>({ seed: 0 });
  const lockRef = useRef(false);
  const deadlineRef = useRef(0);
  const endedRef = useRef(false);

  const questions = useMemo(
    () => (phase === "ready" ? [] : buildRushSet(lang, setRef.current.seed)),
    [phase, lang],
  );

  const current = questions[qIndex];

  const finish = useCallback(
    (finalScore: number, finalCorrect: number) => {
      if (endedRef.current) return;
      endedRef.current = true;
      const { record: rec, bestBeaten: beaten } = saveRushResult(finalScore, finalCorrect);
      setRecord(rec);
      setBestBeaten(beaten);
      const xp = rushXp(finalScore);
      setXpEarned(xp);
      if (xp > 0) progressStore.addXp(xp);
      if (prefsStore.getState().sound) {
        if (beaten) sfx.unlock();
        stadium.whistle(); // صفارة نهاية المباراة
        if (finalScore >= 100) void celebrate(["#fbbf24", "#10b981", "#ffffff"], true);
      }
      setPhase("done");
    },
    [],
  );

  // ——— المؤقت الرئيسي ———
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      const left = deadlineRef.current - Date.now();
      setMsLeft(Math.max(0, left));
      if (left <= 0) {
        finish(score, correctCount);
      }
    }, 100);
    return () => clearInterval(id);
  }, [phase, score, correctCount, finish]);

  const start = () => {
    setRef.current.seed = roundSeed();
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setCorrectCount(0);
    setBestBeaten(false);
    setXpEarned(0);
    lockRef.current = false;
    endedRef.current = false;
    deadlineRef.current = Date.now() + RUSH.durationSec * 1000;
    setMsLeft(RUSH.durationSec * 1000);
    setPhase("playing");
  };

  const choose = (i: number) => {
    if (lockRef.current || phase !== "playing" || !current) return;
    lockRef.current = true;
    setSelected(i);

    const correct = i === current.answer;
    const soundOn = prefsStore.getState().sound;
    const hapticsOn = prefsStore.getState().haptics;

    if (correct) {
      const pts = rushPoints(combo);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setBestCombo((b) => Math.max(b, newCombo));
      setScore((s) => s + pts);
      setCorrectCount((c) => c + 1);
      // +2 ثانية مكافأة
      deadlineRef.current += RUSH.bonusSec * 1000;
      if (soundOn) {
        sfx.correct();
        stadium.correct(); // هللة مع كل هدف
      }
      if (hapticsOn) void buzz("light");
      if (newCombo > 0 && newCombo % RUSH.comboStep === 0 && soundOn) sfx.streak(Math.min(newCombo / 3, 8));
    } else {
      setCombo(0);
      // -3 ثوانٍ عقاب
      deadlineRef.current -= RUSH.penaltySec * 1000;
      if (soundOn) {
        sfx.wrong();
        stadium.aww(); // همهمة إحباط الجمهور
      }
      if (hapticsOn) void buzz("heavy");
    }

    setTimeout(() => {
      setSelected(null);
      lockRef.current = false;
      setQIndex((q) => q + 1);
    }, correct ? 350 : 700);
  };

  const seconds = Math.ceil(msLeft / 1000);
  const urgent = seconds <= 10;
  const comboMult = (1 + Math.floor(combo / RUSH.comboStep) * 0.5).toFixed(1);

  return (
    <div className="space-y-3">
      {/* شريط العلوي: الوقت + النقاط */}
      <div className="grid grid-cols-3 gap-2">
        <div
          className={cn(
            "glass-card flex flex-col items-center rounded-2xl py-2.5",
            urgent && phase === "playing" && "border-red-500/40 bg-red-500/5",
          )}
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-faint">TIME</p>
          <p
            className={cn(
              "flex items-center gap-1 text-xl font-black tabular-nums",
              urgent ? "animate-pulse text-red-500" : "text-gold",
            )}
          >
            <Timer className="size-4" />
            {seconds}s
          </p>
        </div>
        <div className="glass-card flex flex-col items-center rounded-2xl py-2.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-faint">{t(lang, "rushScore")}</p>
          <p className="flex items-center gap-1 text-xl font-black tabular-nums text-grass-600 dark:text-grass-400">
            <Zap className="size-4" />
            {score}
          </p>
        </div>
        <div className="glass-card flex flex-col items-center rounded-2xl py-2.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-faint">COMBO</p>
          <p
            className={cn(
              "text-xl font-black tabular-nums transition-all",
              combo >= RUSH.comboStep ? "text-orange-500" : "text-faint",
            )}
          >
            ×{comboMult}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === "ready" && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="relative overflow-hidden rounded-3xl border border-card-edge bg-card-soft p-6 text-center"
          >
            <div className="pointer-events-none absolute -top-14 -end-10 size-36 rounded-full bg-gold/20 blur-3xl" />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="mx-auto w-fit"
            >
              <ZapMark className="size-16" />
            </motion.div>
            <h3 className="mt-3 text-xl font-black">{t(lang, "rushTitle")}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-6 text-soft">{t(lang, "rushDesc")}</p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-black text-amber-600 dark:text-amber-300">
                🔥 {t(lang, "rushBest")}: {record.best}
              </span>
              {record.matches > 0 && (
                <span className="rounded-full bg-grass-500/15 px-3 py-1 text-xs font-black text-grass-700 dark:text-grass-400">
                  {record.matches} × {t(lang, "rushRounds")}
                </span>
              )}
            </div>

            <Button onClick={start} variant="gold" className="mx-auto mt-5 px-10">
              <Play className="size-4" />
              {t(lang, "rushStart")}
            </Button>
          </motion.div>
        )}

        {phase === "playing" && current && (
          <motion.div
            key={current.id + String(qIndex)}
            initial={{ opacity: 0, x: lang === "ar" ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === "ar" ? 24 : -24 }}
            transition={{ duration: 0.16 }}
            className="space-y-3"
          >
            {/* شريط الكومبو */}
            {combo >= 2 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-orange-500/25 to-gold/20 py-1.5"
              >
                <TrendingUp className="size-4 text-orange-500" />
                <span className="text-xs font-black text-orange-600 dark:text-orange-300">
                  {t(lang, "rushCombo")} {combo}!
                </span>
              </motion.div>
            )}

            <div className="glass-card rounded-3xl p-4 sm:p-5">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-black dark:bg-white/10">
                  #{qIndex + 1}
                </span>
              </div>
              <h3 className="text-base leading-7 font-extrabold sm:text-lg sm:leading-8">{current.q}</h3>
              <div className="mt-3 grid gap-2">
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
                        "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-start text-sm font-semibold transition-colors duration-100",
                        "border-line hover:border-gold hover:bg-gold/5",
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
            </div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-card-edge bg-card-soft p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 11 }}
              className="mx-auto w-fit"
            >
              <ZapMark className="size-16" />
            </motion.div>
            <p className="mt-3 text-sm font-bold text-soft">
              {score >= record.best && score > 0 ? t(lang, "rushGreat") : t(lang, "rushOver")}
            </p>
            <p className="mt-1 text-6xl font-black tabular-nums text-gold">{score}</p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-ink/5 py-2 dark:bg-white/5">
                <p className="text-lg font-black tabular-nums">{correctCount}</p>
                <p className="text-[10px] font-bold text-faint">{t(lang, "rushCorrect")}</p>
              </div>
              <div className="rounded-xl bg-ink/5 py-2 dark:bg-white/5">
                <p className="text-lg font-black tabular-nums text-orange-500">×{bestCombo}</p>
                <p className="text-[10px] font-bold text-faint">{t(lang, "rushBestCombo")}</p>
              </div>
              <div className="rounded-xl bg-ink/5 py-2 dark:bg-white/5">
                <p className="text-lg font-black tabular-nums text-gold">{record.best}</p>
                <p className="text-[10px] font-bold text-faint">{t(lang, "rushBest")}</p>
              </div>
            </div>

            {xpEarned > 0 && (
              <p className="mt-3 text-sm font-black text-amber-600 dark:text-amber-300">
                +{xpEarned} XP
              </p>
            )}
            {bestBeaten && (
              <p className="mt-1 text-xs font-black text-grass-600 dark:text-grass-400">
                🏆 {t(lang, "rushNewBest")}
              </p>
            )}

            <Button onClick={start} className="mx-auto mt-5 px-10">
              <RotateCcw className="size-4" />
              {t(lang, "rushAgain")}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
