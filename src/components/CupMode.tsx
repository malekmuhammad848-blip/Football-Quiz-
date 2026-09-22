/**
 * CupMode — كأس العالم TiQ: بطولة خروج المغلوب تفاعلية
 * تدفق: لوحة البطولة → مباراة (4 أسئلة) → نتيجة → الدور التالي → اللقب.
 * كل المنتخبات مرسومة SVG — أطقم وأعلام بلا أي صور خارجية.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  MATCHES_PER_ROUND,
  ROUNDS_PER_CUP,
  ROUND_NAMES,
  currentMatch,
  finishMatch,
  matchQuestions,
  newCup,
  saveCup,
  teamById,
  teamName,
  type CupRound,
  type CupState,
} from "../domain/cupEngine";
import { progressStore } from "../stores/progressStore";
import { questsStore } from "../stores/questsStore";
import { sfx } from "../lib/feedback";
import { stadium } from "../lib/stadium";
import { t, type Lang } from "../lib/i18n";
import type { LocalizedQuestion } from "../domain/types";
import { cn } from "../utils/cn";
import { Button } from "./ui/primitives";
import { CheckBadge, CrossBadge, TrophyMark } from "./Icons";

interface Props {
  lang: Lang;
  soundOn: boolean;
  hapticsOn: boolean;
  onExit: () => void;
}

const ROUND_LABEL: Record<CupRound, { ar: string; en: string }> = {
  r16: { ar: "دور الـ16", en: "Round of 16" },
  qf: { ar: "ربع النهائي", en: "Quarter-final" },
  sf: { ar: "نصف النهائي", en: "Semi-final" },
  final: { ar: "النهائي", en: "Final" },
};

/** شارة القميص المصغّرة للمنتخب */
function TeamCrest({ teamId, size = 40 }: { teamId: string; size?: number }) {
  const team = teamById(teamId);
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden className="shrink-0">
      <path d="M12 10 L20 6 L28 6 L36 10 L36 34 Q36 38 32 40 L16 40 Q12 38 12 34 Z" fill={team.c1} stroke="rgba(0,0,0,0.3)" strokeWidth="1.4" />
      {team.pattern === "stripes" && (
        <g fill={team.c2}>
          <rect x="19" y="6" width="3.5" height="34" />
          <rect x="26" y="6" width="3.5" height="34" />
        </g>
      )}
      {team.pattern === "hoops" && (
        <g fill={team.c2}>
          <rect x="12" y="16" width="24" height="5" />
          <rect x="12" y="26" width="24" height="5" />
        </g>
      )}
      {team.pattern === "sash" && <path d="M10 38 L30 4 L40 12 L20 46 Z" fill={team.c2} opacity="0.9" />}
    </svg>
  );
}

export function CupMode({ lang, soundOn, hapticsOn, onExit }: Props) {
  const [cup, setCup] = useState<CupState | null>(null);
  const [qs, setQs] = useState<LocalizedQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<"lobby" | "playing" | "matchOver" | "champion">("lobby");
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const match = cup ? currentMatch(cup) : null;

  const startCup = () => {
    const fresh = newCup();
    setCup(fresh);
    saveCup(fresh);
    setQs(matchQuestions(fresh, lang));
    setQIndex(0);
    setSelected(null);
    setPhase("playing");
    if (soundOn) sfx.levelUp();
  };

  const choose = (i: number) => {
    if (!cup || selected !== null) return;
    setSelected(i);
    const correct = i === qs[qIndex]!.answer;
    setLastCorrect(correct);
    if (correct) {
      questsStore.track("trainMaster");
      progressStore.addXp(8);
    }
    progressStore.trackCategory(qs[qIndex]!.category, correct);
    if (soundOn) {
      if (correct) {
        sfx.correct();
        stadium.goal();
      } else {
        sfx.wrong();
      }
    }
    if (hapticsOn && navigator.vibrate) navigator.vibrate(correct ? 40 : 90);
  };

  const nextQuestion = () => {
    if (!cup) return;
    if (qIndex + 1 < qs.length) {
      setQIndex((q) => q + 1);
      setSelected(null);
      setLastCorrect(null);
      return;
    }
    // انتهت المباراة — احسمها
    const finished = finishMatch(cup);
    setCup(finished);
    saveCup(finished);
    setPhase(finished.champion ? "champion" : "matchOver");
    if (soundOn) stadium.whistle();
  };

  const continueCup = () => {
    if (!cup) return;
    if (cup.champion) {
      setPhase("champion");
      return;
    }
    const freshQs = matchQuestions(cup, lang);
    setQs(freshQs);
    setQIndex(0);
    setSelected(null);
    setLastCorrect(null);
    setPhase("playing");
  };

  const quitCup = () => {
    if (soundOn) sfx.tap();
    onExit();
  };

  /* ——— اللوبي: عرض حالة البطولة ——— */
  if (phase === "lobby" || !cup) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        className="glass-card relative w-full overflow-hidden rounded-3xl p-5 shadow-lg sm:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-400" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <TrophyMark className="size-9" />
            <div className="leading-tight">
              <p className="text-base font-black">{t(lang, "cupTitle")}</p>
              <p className="text-[11px] font-bold opacity-55">{t(lang, "cupDesc")}</p>
            </div>
          </div>
          <button onClick={quitCup} aria-label={t(lang, "close")} className="rounded-full p-2 transition-colors hover:bg-ink/5 dark:hover:bg-white/10">
            <X className="size-4.5" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-line bg-ghost p-4 text-center">
            <p className="text-3xl font-black text-gold">16</p>
            <p className="mt-0.5 text-xs font-bold opacity-60">{t(lang, "cupTeams")}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { n: ROUNDS_PER_CUP, l: t(lang, "cupRounds") },
              { n: 4, l: t(lang, "cupQPerMatch") },
              { n: "1v1", l: t(lang, "cupFormat") },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl border border-line bg-ghost p-3">
                <p className="text-xl font-black">{x.n}</p>
                <p className="text-[10px] font-bold opacity-55">{x.l}</p>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={startCup} className="mt-5 w-full">
          {t(lang, "cupStart")}
        </Button>
      </motion.div>
    );
  }

  /* ——— البطول ——— */
  const home = match ? teamById(match.home) : null;
  const away = match ? teamById(match.away) : null;
  const q = qs[qIndex];
  const revealed = selected !== null;

  /* ——— البطل ——— */
  if (phase === "champion" && cup.champion) {
    const champ = teamById(cup.champion);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card relative w-full overflow-hidden rounded-3xl p-6 text-center shadow-lg"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-gold via-yellow-300 to-gold" />
        <motion.div animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mx-auto w-fit">
          <TrophyMark className="size-24" />
        </motion.div>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.3em] text-gold">{t(lang, "cupChampion")}</p>
        <div className="mx-auto mt-3 w-fit">
          <TeamCrest teamId={champ.id} size={64} />
        </div>
        <p className="mt-2 text-2xl font-black">{teamName(champ, lang)}</p>
        <p className="mt-1 text-sm font-bold opacity-60">{t(lang, "cupChampionYou")}</p>
        <div className="mt-5 flex gap-2">
          <Button onClick={startCup} className="flex-1">{t(lang, "cupAgain")}</Button>
          <Button variant="ghost" onClick={quitCup} className="flex-1">{t(lang, "close")}</Button>
        </div>
      </motion.div>
    );
  }

  /* ——— نتيجة المباراة ——— */
  if (phase === "matchOver" && cup && home && away) {
    const homeGoals = cup.bracket[cup.round][cup.matchIndex]?.homeGoals ?? 0;
    const awayGoals = cup.bracket[cup.round][cup.matchIndex]?.awayGoals ?? 0;
    const won = (homeGoals ?? 0) > (awayGoals ?? 0);
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card w-full rounded-3xl p-5 shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-400" />
        <p className="text-center text-xs font-black uppercase tracking-widest opacity-55">
          {ROUND_LABEL[cup.round][lang]} · {t(lang, "cupMatchOver")}
        </p>
        <div className="mt-4 flex items-center justify-center gap-5">
          <div className="flex flex-col items-center gap-1.5">
            <TeamCrest teamId={home.id} size={52} />
            <p className="text-[11px] font-black">{teamName(home, lang)}</p>
          </div>
          <p className="text-4xl font-black tabular-nums">
            {homeGoals} - {awayGoals}
          </p>
          <div className="flex flex-col items-center gap-1.5">
            <TeamCrest teamId={away.id} size={52} />
            <p className="text-[11px] font-black">{teamName(away, lang)}</p>
          </div>
        </div>
        <p className={cn("mt-4 text-center text-sm font-black", won ? "text-grass-600 dark:text-grass-400" : "text-red-500")}>
          {won ? t(lang, "cupWon") : cup.bracket[cup.round][cup.matchIndex]?.homeGoals === cup.bracket[cup.round][cup.matchIndex]?.awayGoals ? t(lang, "cupDrawWin") : t(lang, "cupLost")}
        </p>
        <Button onClick={continueCup} className="mt-4 w-full">
          {cup.champion ? t(lang, "cupSeeChampion") : t(lang, "cupNextMatch")}
        </Button>
      </motion.div>
    );
  }

  /* ——— اللعب ——— */
  if (!q || !home || !away) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="glass-card relative w-full overflow-hidden rounded-3xl p-4 shadow-lg sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-400" />

      {/* ترويسة المباراة */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <TeamCrest teamId={home.id} size={40} />
          <p className="max-w-full truncate text-[10px] font-black">{teamName(home, lang)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-black tabular-nums text-gold">{cup.myGoals} - {cup.oppGoals}</p>
          <p className="text-[9px] font-bold uppercase tracking-wider opacity-50">
            {ROUND_LABEL[cup.round][lang]} · {t(lang, "question")} {qIndex + 1}/4
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <TeamCrest teamId={away.id} size={40} />
          <p className="max-w-full truncate text-[10px] font-black">{teamName(away, lang)}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${cup.round}-${cup.matchIndex}-${qIndex}`}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.18 }}
        >
          <p className="mb-3 text-center text-base font-extrabold leading-7 sm:text-lg">{q.q}</p>
          <div className="grid gap-2">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isAnswer = i === q.answer;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-start text-sm font-semibold transition-colors duration-150",
                    "border-line hover:border-amber-400 hover:bg-amber-500/5",
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

          {revealed && (
            <div className="mt-3 space-y-2.5">
              <p className="flex items-start gap-2 text-xs leading-6 opacity-80">
                <span className="mt-0.5 font-black text-gold">⚽</span>
                {q.fact}
              </p>
              {lastCorrect === false && (
                <p className="rounded-xl bg-red-500/10 px-3 py-2 text-center text-xs font-black text-red-500">
                  {t(lang, "cupOppScored")}
                </p>
              )}
              <Button onClick={nextQuestion} className="w-full">
                {qIndex + 1 < qs.length ? t(lang, "trainNext") : t(lang, "cupEndMatch")}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* شريط الدور */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {ROUND_NAMES.map((r) => {
          const idx = ROUND_NAMES.indexOf(r);
          const currentIdx = ROUND_NAMES.indexOf(cup.round);
          const done = idx < currentIdx;
          const active = r === cup.round;
          return (
            <div key={r} className="flex items-center gap-1">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-black transition-colors",
                  done && "bg-grass-500/20 text-grass-600 dark:text-grass-400",
                  active && "bg-gold/25 text-amber-700 dark:text-amber-300",
                  !done && !active && "bg-ink/5 text-faint dark:bg-white/5",
                )}
              >
                {ROUND_LABEL[r][lang]}
              </span>
              {idx < ROUND_NAMES.length - 1 && <span className="text-faint">·</span>}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/** ملخص إنجاز البطولة */
export function CupSummaryLine({ cup, lang }: { cup: CupState; lang: Lang }) {
  const played = ROUND_NAMES.reduce((n, r) => n + (cup.bracket[r]?.filter((m) => m.homeGoals !== null).length ?? 0), 0);
  const total = Object.values(MATCHES_PER_ROUND).reduce((a, b) => a + b, 0);
  return (
    <p className="text-center text-[10px] font-bold opacity-50">
      {t(lang, "cupProgress")}: {played}/{total}
    </p>
  );
}
