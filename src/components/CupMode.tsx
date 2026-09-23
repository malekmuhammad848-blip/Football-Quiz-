/**
 * CupMode — كأس العالم TiQ: بطولة خروج مغلوب تفاعلية كاملة
 * تدفق: اختيار منتخبك → شجرة البطولة → مباراة (4 أسئلة) → نتيجة
 * → تعادل؟ ترجيح حاسم (سؤالان) → شجرة تتطور → لقب أو إقصاء.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, X } from "lucide-react";
import {
  ROUND_NAMES,
  answerResult,
  currentMatch,
  finishMatch,
  matchQuestions,
  newCup,
  oppTeam,
  pkQuestions,
  playerGoalsInCup,
  recordCupResult,
  roundWinXp,
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
import { t, tr, type Lang } from "../lib/i18n";
import type { LocalizedQuestion } from "../domain/types";
import { cn } from "../utils/cn";
import { Button } from "./ui/primitives";
import { CheckBadge, CrossBadge, TrophyMark } from "./Icons";
import { VisualQuestion } from "./VisualQuestion";
import { FlagByRef } from "./VisualArt";

interface Props {
  lang: Lang;
  soundOn: boolean;
  hapticsOn: boolean;
  onExit: () => void;
}

const ROUND_LABEL: Record<CupRound, { ar: string; en: string }> = {
  r16: { ar: "ثمن النهائي", en: "Round of 16" },
  qf: { ar: "ربع النهائي", en: "Quarter-final" },
  sf: { ar: "نصف النهائي", en: "Semi-final" },
  final: { ar: "النهائي", en: "Final" },
};

/** شارة المنتخب المصغّرة — علم وطني حقيقي مرسوم */
function TeamCrest({ teamId, size = 40 }: { teamId: string; size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="shrink-0">
      <FlagByRef ref={teamId} className="h-full w-full" />
    </div>
  );
}

type Phase = "pick" | "bracket" | "playing" | "matchOver" | "pks" | "pksResult" | "champion" | "eliminated";

export function CupMode({ lang, soundOn, hapticsOn, onExit }: Props) {
  const [cup, setCup] = useState<CupState | null>(null);
  const [phase, setPhase] = useState<Phase>("pick");
  const [qs, setQs] = useState<LocalizedQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<{ correct: boolean; oppScored: boolean } | null>(null);
  const [pkState, setPkState] = useState<{ qs: [LocalizedQuestion, LocalizedQuestion]; idx: number; myCorrect: number; selected: number | null } | null>(null);
  const [winXp, setWinXp] = useState(0);
  /** نتيجة آخر مباراة انتهت — تُلتقط لحظة الانتهاء قبل تقدّم الشجرة (إصلاح شاشة النتيجة) */
  const [lastMatch, setLastMatch] = useState<{
    round: CupRound;
    my: number;
    their: number;
    oppId: string;
    viaPks: boolean;
    won: boolean;
  } | null>(null);

  const match = cup ? currentMatch(cup) : null;
  const opp = cup ? oppTeam(cup) : null;

  /* ——— اختيار المنتخب ——— */
  const pick = (teamId: string) => {
    const fresh = newCup(teamId);
    setCup(fresh);
    saveCup(fresh);
    setPhase("bracket");
    if (soundOn) sfx.levelUp();
  };

  const startMatch = () => {
    if (!cup) return;
    setQs(matchQuestions(cup, lang));
    setQIndex(0);
    setSelected(null);
    setLastResult(null);
    setPhase("playing");
  };

  const choose = (i: number) => {
    if (!cup || selected !== null || !qs[qIndex]) return;
    setSelected(i);
    const correct = i === qs[qIndex]!.answer;
    const next = answerResult(cup, qIndex + 1, correct);
    setCup(next);
    saveCup(next);
    setLastResult({ correct, oppScored: next.oppGoals > cup.oppGoals });
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
    if (!cup || selected === null || phase !== "playing") return;
    if (qIndex + 1 < qs.length) {
      setQIndex((q) => q + 1);
      setSelected(null);
      setLastResult(null);
      return;
    }
    // انتهت المباراة — نلتقط النتيجة الفعلية قبل أي تقدّم في الشجرة
    // (كان الخلل: شاشة النتيجة تقرأ من دور الشجرة «الحالي» بعد تقدّمه فتعرض مباراة لم تُلعب)
    const myFinal = cup.myGoals;
    const oppFinal = cup.oppGoals;
    const playedRound = cup.round;
    const oppId = opp?.id ?? "";
    const won = myFinal > oppFinal;
    const draw = myFinal === oppFinal;
    if (won) {
      const xp = roundWinXp(playedRound);
      setWinXp(xp);
      progressStore.addXp(xp);
      const finished = finishMatch(cup);
      setCup(finished);
      saveCup(finished);
      if (finished.champion) recordCupResult(finished);
      setLastMatch({ round: playedRound, my: myFinal, their: oppFinal, oppId, viaPks: false, won: true });
      setPhase(finished.champion ? "champion" : "matchOver");
      if (soundOn) stadium.whistle();
    } else if (draw) {
      // ركلات الترجيح — تُحسم النتيجة النهائية في nextPk
      setLastMatch({ round: playedRound, my: myFinal, their: oppFinal, oppId, viaPks: true, won: false });
      setPkState({ qs: pkQuestions(cup, lang), idx: 0, myCorrect: 0, selected: null });
      setPhase("pks");
      if (soundOn) sfx.levelUp();
    } else {
      const finished = finishMatch(cup);
      setCup(finished);
      saveCup(finished);
      if (finished.champion) recordCupResult(finished);
      setLastMatch({ round: playedRound, my: myFinal, their: oppFinal, oppId, viaPks: false, won: false });
      setPhase("matchOver"); // نعرض النتيجة أولًا ثم شاشة الإقصاء عبر continueAfterMatch
      if (soundOn) stadium.whistle();
    }
  };

  /* ——— ركلات الترجيح ——— */
  const choosePk = (i: number) => {
    if (!pkState || pkState.selected !== null || !cup) return;
    const q = pkState.qs[pkState.idx]!;
    const correct = i === q.answer;
    const myCorrect = pkState.myCorrect + (correct ? 1 : 0);
    setSelected(i);
    setPkState({ ...pkState, selected: i, myCorrect });
    progressStore.trackCategory(q.category, correct);
    if (correct) progressStore.addXp(5);
    if (soundOn) (correct ? sfx.correct : sfx.wrong)();
    if (hapticsOn && navigator.vibrate) navigator.vibrate(correct ? 40 : 90);
  };

  const nextPk = () => {
    if (!pkState || !cup) return;
    if (pkState.idx + 1 < 2) {
      setPkState({ ...pkState, idx: pkState.idx + 1, selected: null });
      return;
    }
    const result = finishMatch(cup, pkState.myCorrect);
    setCup(result);
    saveCup(result);
    setWinXp(0);
    const pkWon = !result.eliminated;
    setLastMatch((prev) =>
      prev
        ? { ...prev, won: pkWon }
        : { round: cup.round, my: cup.myGoals, their: cup.oppGoals, oppId: opp?.id ?? "", viaPks: true, won: pkWon },
    );
    // حسم الترجيح: إذا لم يُقص اللاعب فقد فاز بالترجيح
    const pkXp = pkWon ? Math.max(8, Math.round(roundWinXp(cup.round) / 2)) : 0;
    if (pkXp > 0) {
      setWinXp(pkXp);
      progressStore.addXp(pkXp);
      questsStore.track("trainMaster");
    }
    if (pkWon) {
      setPhase("matchOver");
    } else {
      setPhase("matchOver"); // نعرض نتيجة المباراة أولًا ثم الإقصاء
    }
    if (result.champion) recordCupResult(result);
    if (soundOn) (result.eliminated ? sfx.wrong : stadium.goal)();
  };

  const continueAfterMatch = () => {
    if (!cup) return;
    const done = lastMatch ? !lastMatch.won : cup.champion === null && cup.eliminated;
    setLastMatch(null);
    if (done || cup.eliminated) {
      setPhase("eliminated");
    } else if (cup.champion) {
      setPhase("champion");
    } else {
      setPhase("bracket");
    }
  };

  const quit = () => {
    if (soundOn) sfx.tap();
    onExit();
  };

  /* ============================================================
   *  الشاشات
   * ============================================================ */

  /* ——— 1) اختيار المنتخب ——— */
  if (phase === "pick" || !cup) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="glass-card relative w-full overflow-hidden rounded-3xl p-5 shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-400" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <TrophyMark className="size-9" />
            <div className="leading-tight">
              <p className="text-base font-black">{t(lang, "cupTitle")}</p>
              <p className="text-[11px] font-bold opacity-55">{t(lang, "cupPickDesc")}</p>
            </div>
          </div>
          <button onClick={quit} aria-label={t(lang, "close")} className="rounded-full p-2 transition-colors hover:bg-ink/5 dark:hover:bg-white/10">
            <X className="size-4.5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {["br", "ar", "fr", "en", "es", "de", "pt", "nl", "it", "ma", "be", "hr", "uy", "sa", "jp", "us"].map((id) => (
            <button
              key={id}
              onClick={() => pick(id)}
              className="flex flex-col items-center gap-1 rounded-2xl border border-line bg-ghost p-2 transition-all hover:border-gold/50 hover:shadow-md active:scale-95"
            >
              <TeamCrest teamId={id} size={34} />
              <span className="w-full truncate text-center text-[9px] font-black">{teamName(teamById(id), lang)}</span>
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  /* ——— 2) شجرة البطولة ——— */
  if (phase === "bracket") {
    const myTeam = teamById(cup.myTeamId);
    const oppNow = oppTeam(cup);
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="glass-card relative w-full overflow-hidden rounded-3xl p-5 shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-400" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TeamCrest teamId={cup.myTeamId} size={30} />
            <div className="leading-tight">
              <p className="text-sm font-black">{teamName(myTeam, lang)}</p>
              <p className="text-[10px] font-bold opacity-55">{ROUND_LABEL[cup.round][lang]} · {t(lang, "cupMatch")}</p>
            </div>
          </div>
          <button onClick={quit} aria-label={t(lang, "close")} className="rounded-full p-2 transition-colors hover:bg-ink/5 dark:hover:bg-white/10">
            <X className="size-4.5" />
          </button>
        </div>

        {/* شريط الأدوار */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {ROUND_NAMES.map((r, idx) => {
            const cur = ROUND_NAMES.indexOf(cup.round);
            return (
              <div key={r} className="flex items-center gap-1">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-black transition-colors",
                    idx < cur && "bg-grass-500/20 text-grass-600 dark:text-grass-400",
                    idx === cur && "bg-gold/25 text-amber-700 dark:text-amber-300 ring-1 ring-gold/50",
                    idx > cur && "bg-ink/5 text-faint dark:bg-white/5",
                  )}
                >
                  {ROUND_LABEL[r][lang]}
                </span>
                {idx < ROUND_NAMES.length - 1 && <span className="text-faint">·</span>}
              </div>
            );
          })}
        </div>

        {/* مباراتك القادمة */}
        {oppNow && match ? (
          <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gold">{t(lang, "cupYourNext")}</p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <TeamCrest teamId={match.home} size={48} />
                <p className="max-w-20 truncate text-[11px] font-black">{teamName(teamById(match.home), lang)}</p>
              </div>
              <p className="text-2xl font-black text-gold">VS</p>
              <div className="flex flex-col items-center gap-1">
                <TeamCrest teamId={match.away} size={48} />
                <p className="max-w-20 truncate text-[11px] font-black">{teamName(teamById(match.away), lang)}</p>
              </div>
            </div>
            <p className="mt-3 text-xs font-bold opacity-60">{t(lang, "cupMatchDesc")}</p>
          </div>
        ) : null}

        {/* شجرة مصغرة: الفائزون الحاليون */}
        <div className="mt-4 space-y-2">
          {ROUND_NAMES.map((r) => {
            const ms = cup.bracket[r] ?? [];
            if (ms.length === 0) return null;
            return (
              <div key={r} className="rounded-xl border border-line bg-ghost p-2.5">
                <p className="mb-1.5 text-[9px] font-black uppercase tracking-widest opacity-50">{ROUND_LABEL[r][lang]}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {ms.map((m, i) => (
                    <div key={i} className={cn("flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-bold", m.home === cup.myTeamId || m.away === cup.myTeamId ? "bg-gold/15 ring-1 ring-gold/40" : "bg-ink/5 dark:bg-white/5")}>
                      <TeamCrest teamId={m.home} size={16} />
                      <span className="truncate">{teamName(teamById(m.home), lang)}</span>
                      <span className="tabular-nums opacity-60">{m.homeGoals ?? "–"}:{m.awayGoals ?? "–"}</span>
                      <TeamCrest teamId={m.away} size={16} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Button onClick={startMatch} className="mt-5 w-full">
          {t(lang, "cupPlayMatch")}
        </Button>
      </motion.div>
    );
  }

  /* ——— البطل ——— */
  if (phase === "champion" && cup.champion) {
    const champ = teamById(cup.champion);
    const goals = playerGoalsInCup(cup);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="glass-card relative w-full overflow-hidden rounded-3xl p-6 text-center shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-gold via-yellow-300 to-gold" />
        <motion.div animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mx-auto w-fit">
          <TrophyMark className="size-24" />
        </motion.div>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.3em] text-gold">{t(lang, "cupChampion")}</p>
        <div className="mx-auto mt-3 w-fit rounded-full bg-gold/10 p-3 ring-2 ring-gold/50">
          <TeamCrest teamId={champ.id} size={72} />
        </div>
        <p className="mt-2 text-2xl font-black">{teamName(champ, lang)}</p>
        <p className="mt-1 text-sm font-bold opacity-60">{t(lang, "cupChampionYou")}</p>
        <div className="mx-auto mt-4 grid w-fit grid-cols-2 gap-2">
          <div className="rounded-xl bg-ghost px-4 py-2">
            <p className="text-lg font-black text-gold">{goals}</p>
            <p className="text-[9px] font-bold opacity-55">{t(lang, "cupGoals")}</p>
          </div>
          <div className="rounded-xl bg-ghost px-4 py-2">
            <p className="text-lg font-black text-gold">4</p>
            <p className="text-[9px] font-bold opacity-55">{t(lang, "cupRounds")}</p>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <Button onClick={() => { setCup(null); setPhase("pick"); }} className="flex-1">{t(lang, "cupAgain")}</Button>
          <Button variant="ghost" onClick={quit} className="flex-1">{t(lang, "close")}</Button>
        </div>
      </motion.div>
    );
  }

  /* ——— الإقصاء ——— */
  if (phase === "eliminated" && cup.champion) {
    const champ = teamById(cup.champion);
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card relative w-full overflow-hidden rounded-3xl p-5 text-center shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-red-400 to-red-600" />
        <p className="text-xs font-black uppercase tracking-widest text-red-500">{t(lang, "cupEliminated")}</p>
        <div className="mx-auto mt-4 w-fit opacity-80">
          <TeamCrest teamId={cup.myTeamId} size={56} />
        </div>
        <p className="mt-2 text-base font-black">{tr(t(lang, "cupEliminatedDesc"), { team: teamName(teamById(cup.myTeamId), lang) })}</p>
        <div className="mt-5 rounded-2xl border border-line bg-ghost p-3">
          <p className="text-[10px] font-bold opacity-55">{t(lang, "cupChampionIs")}</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <TeamCrest teamId={champ.id} size={28} />
            <p className="text-sm font-black">{teamName(champ, lang)}</p>
            <Crown className="size-4 text-gold" />
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <Button onClick={() => { setCup(null); setPhase("pick"); }} className="flex-1">{t(lang, "cupAgain")}</Button>
          <Button variant="ghost" onClick={quit} className="flex-1">{t(lang, "close")}</Button>
        </div>
      </motion.div>
    );
  }

  /* ——— نتيجة المباراة — تُعرض من lastMatch الملتقطة لحظة الانتهاء ——— */
  if ((phase === "matchOver" || phase === "pksResult") && lastMatch) {
    const oppT = lastMatch.oppId ? teamById(lastMatch.oppId) : null;
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card relative w-full overflow-hidden rounded-3xl p-5 shadow-lg">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-400" />
        <p className="text-center text-xs font-black uppercase tracking-widest opacity-55">
          {ROUND_LABEL[lastMatch.round][lang]} · {t(lang, "cupMatchOver")}
        </p>
        <div className="mt-4 flex items-center justify-center gap-5">
          <div className="flex flex-col items-center gap-1.5">
            <TeamCrest teamId={cup!.myTeamId} size={52} />
            <p className="max-w-24 truncate text-[11px] font-black">{teamName(teamById(cup!.myTeamId), lang)}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black tabular-nums">{lastMatch.my} - {lastMatch.their}</p>
            {lastMatch.viaPks && <p className="mt-1 text-[10px] font-black text-gold">{t(lang, "cupViaPks")}</p>}
          </div>
          {oppT && (
            <div className="flex flex-col items-center gap-1.5">
              <TeamCrest teamId={oppT.id} size={52} />
              <p className="max-w-24 truncate text-[11px] font-black">{teamName(oppT, lang)}</p>
            </div>
          )}
        </div>
        {winXp > 0 && (
          <p className="mt-3 text-center text-sm font-black text-grass-600 dark:text-grass-400">+{winXp} XP</p>
        )}
        <p className="mt-2 text-center text-sm font-black" style={{ color: lastMatch.won ? undefined : "#ef4444" }}>
          {lastMatch.won ? t(lang, "cupMatchWon") : t(lang, "cupMatchLost")}
        </p>
        <Button onClick={continueAfterMatch} className="mt-4 w-full">
          {lastMatch.won ? t(lang, "cupNextMatch") : t(lang, "cupSeeExit")}
        </Button>
      </motion.div>
    );
  }

  /* ——— ركلات الترجيح ——— */
  if (phase === "pks" && pkState) {
    const q = pkState.qs[pkState.idx]!;
    const revealed = pkState.selected !== null;
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card relative w-full overflow-hidden rounded-3xl p-4 shadow-lg sm:p-6">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-rose-400 via-red-400 to-rose-400" />
        <div className="mb-3 text-center">
          <p className="text-sm font-black text-red-500">🥁 {t(lang, "cupPksTitle")}</p>
          <p className="text-[11px] font-bold opacity-55">{t(lang, "cupPksDesc")} · {t(lang, "question")} {pkState.idx + 1}/2</p>
        </div>
        <p className="mb-3 text-center text-base font-extrabold leading-7">{q.q}</p>
        {q.visual && <VisualQuestion spec={q.visual} prompt="" className="mb-3" />}
        <div className="grid gap-2">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer;
            const isSelected = pkState.selected === i;
            return (
              <button
                key={i}
                onClick={() => choosePk(i)}
                disabled={revealed}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-start text-sm font-semibold transition-colors duration-150",
                  "border-line hover:border-rose-400 hover:bg-rose-500/5",
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
          <Button onClick={nextPk} className="mt-4 w-full">
            {pkState.idx + 1 < 2 ? t(lang, "trainNext") : t(lang, "cupPkShoot")}
          </Button>
        )}
      </motion.div>
    );
  }

  /* ——— اللعب ——— */
  if (!q0(qs, qIndex) || !match || !opp) return null;
  const q = qs[qIndex]!;
  const revealed = selected !== null;
  const iAmHome = match.home === cup.myTeamId;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="glass-card relative w-full overflow-hidden rounded-3xl p-4 shadow-lg sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-400" />

      {/* ترويسة المباراة */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <TeamCrest teamId={iAmHome ? match.home : match.away} size={40} />
          <p className="max-w-full truncate text-[10px] font-black">{teamName(teamById(cup.myTeamId), lang)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-black tabular-nums text-gold">{cup.myGoals} - {cup.oppGoals}</p>
          <p className="text-[9px] font-bold uppercase tracking-wider opacity-50">
            {ROUND_LABEL[cup.round][lang]} · {t(lang, "question")} {qIndex + 1}/4
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <TeamCrest teamId={iAmHome ? match.away : match.home} size={40} />
          <p className="max-w-full truncate text-[10px] font-black">{teamName(opp, lang)}</p>
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
          {q.visual && <VisualQuestion spec={q.visual} prompt="" className="mb-3" />}
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
              {lastResult && !lastResult.correct && (
                <p className={cn("rounded-xl px-3 py-2 text-center text-xs font-black", lastResult.oppScored ? "bg-red-500/10 text-red-500" : "bg-grass-500/10 text-grass-600 dark:text-grass-400")}>
                  {lastResult.oppScored ? t(lang, "cupOppScored") : t(lang, "cupOppMissed")}
                </p>
              )}
              {lastResult?.correct && (
                <p className="rounded-xl bg-grass-500/10 px-3 py-2 text-center text-xs font-black text-grass-600 dark:text-grass-400">
                  {lastResult.oppScored ? t(lang, "cupGoalAndOpp") : t(lang, "cupCleanGoal")}
                </p>
              )}
              <Button onClick={nextQuestion} className="w-full">
                {qIndex + 1 < qs.length ? t(lang, "trainNext") : t(lang, "cupEndMatch")}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/** مساعد صغير */
function q0(qs: LocalizedQuestion[], i: number): LocalizedQuestion | null {
  return qs[i] ?? null;
}

/** ملخص إنجاز البطولة */
export function CupSummaryLine({ cup, lang }: { cup: CupState; lang: Lang }) {
  const played = ROUND_NAMES.reduce((n, r) => n + (cup.bracket[r]?.filter((m) => m.homeGoals !== null).length ?? 0), 0);
  return (
    <p className="text-center text-[10px] font-bold opacity-50">
      {t(lang, "cupProgress")}: {played}/15
    </p>
  );
}
