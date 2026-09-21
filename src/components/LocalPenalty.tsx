/**
 * LocalPenalty — ركلات ترجيح محلية 100% (أوفلاين)
 * 5 تسديدات × 5 ثوانٍ، ثلاث زوايا، حارس AI يتعلم قراءتك.
 * بلا تسجيل دخول ولا إنترنت — النتائج على الجهاز + XP.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Goal, Hand, Play, RotateCcw, Timer } from "lucide-react";
import {
  LOCAL_PENALTY,
  applyMatch,
  keeperPick,
  loadPenaltyRecord,
  makeRng,
  matchXp,
  shotResult,
  type LocalPenaltyRecord,
  type Zone,
} from "../domain/localPenalty";
import { t, type Lang } from "../lib/i18n";
import { sfx, buzz } from "../lib/feedback";
import { prefsStore } from "../stores/prefsStore";
import { progressStore } from "../stores/progressStore";
import { questsStore } from "../stores/questsStore";
import { cn } from "../utils/cn";
import { Button } from "./ui/primitives";
import { BallMark, CheckBadge, CrossBadge } from "./Icons";

type Phase = "ready" | "shooting" | "done";

interface Props {
  lang: Lang;
  /** منح XP المحلي (يعمل حتى بلا حساب — يُرفع عند تسجيل الدخول) */
  onXpGain?: (xp: number) => void;
}

/** خريطة الزوايا: عرض البطاقات حسب الاتجاه */
const ZONE_META: { zone: Zone; icon: typeof Goal; key: "zoneLeft" | "zoneMiddle" | "zoneRight" }[] = [
  { zone: 0, icon: Goal, key: "zoneLeft" },
  { zone: 1, icon: Hand, key: "zoneMiddle" },
  { zone: 2, icon: Goal, key: "zoneRight" },
];

export function LocalPenalty({ lang, onXpGain }: Props) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [record, setRecord] = useState<LocalPenaltyRecord>(() => loadPenaltyRecord());
  const [shotIdx, setShotIdx] = useState(0);
  const [results, setResults] = useState<("goal" | "save" | "timeout")[]>([]);
  const [picked, setPicked] = useState<Zone | null>(null);
  const [keeper, setKeeper] = useState<Zone | null>(null);
  const [msLeft, setMsLeft] = useState<number>(LOCAL_PENALTY.shotMs);
  const [xpGained, setXpGained] = useState(0);
  const [bestBeaten, setBestBeaten] = useState(false);

  const myLastRef = useRef<Zone | null>(null);
  const pickedRef = useRef<Zone | null>(null);
  const rng = useMemo(() => makeRng(), []);

  const soundOn = () => prefsStore.getState().sound;
  const hapticsOn = () => prefsStore.getState().haptics;

  const goals = results.filter((r) => r === "goal").length;

  const start = () => {
    setShotIdx(0);
    setResults([]);
    setPicked(null);
    setKeeper(null);
    setXpGained(0);
    setBestBeaten(false);
    myLastRef.current = null;
    setPhase("shooting");
  };

  // ——— مؤقت التسديدة ———
  useEffect(() => {
    if (phase !== "shooting" || pickedRef.current !== null) return;
    const deadline = Date.now() + LOCAL_PENALTY.shotMs;
    const id = setInterval(() => {
      const left = Math.max(0, deadline - Date.now());
      setMsLeft(left);
      if (left === 0 && pickedRef.current === null) {
        resolveShot(null);
      }
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, shotIdx]);

  /** حسم التسديدة: اختيار اللاعب أو مهلة */
  const resolveShot = useCallback(
    (zone: Zone | null) => {
      if (pickedRef.current !== null) return; // حُسمت بالفعل
      pickedRef.current = zone;
      setPicked(zone);

      const k = keeperPick(rng, myLastRef.current);
      setKeeper(k);
      myLastRef.current = zone;

      const res = shotResult(zone, k);
      setResults((prev) => [...prev, res]);

      if (res === "goal") questsStore.track("penaltyAce"); // تتبع مهمة الترجيح
      if (soundOn()) (res === "goal" ? sfx.correct : sfx.wrong)();
      if (hapticsOn()) void buzz(res === "goal" ? "medium" : "heavy");

      const isLast = shotIdx + 1 >= LOCAL_PENALTY.shots;
      setTimeout(
        () => {
          pickedRef.current = null;
          setPicked(null);
          setKeeper(null);
          if (isLast) {
            // النهاية: حساب المكافآت وحفظ السجل
            const total = results.filter((r) => r === "goal").length + (res === "goal" ? 1 : 0);
            const { record: rec, bestBeaten: beaten } = applyMatch(loadPenaltyRecord(), total);
            setRecord(rec);
            setBestBeaten(beaten);
            const xp = matchXp(total);
            if (xp > 0) {
              setXpGained(xp);
              progressStore.addXp(xp);
              onXpGain?.(xp);
              if (soundOn() && total >= 3) sfx.levelUp();
              if (beaten && soundOn()) sfx.unlock();
            }
            setPhase("done");
          } else {
            setShotIdx((s) => s + 1);
            setMsLeft(LOCAL_PENALTY.shotMs);
          }
        },
        res === "timeout" ? 700 : 1200,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shotIdx, results, rng, onXpGain],
  );

  const choose = (zone: Zone) => {
    if (pickedRef.current !== null || phase !== "shooting") return;
    resolveShot(zone);
  };

  const urgent = msLeft <= 1500;
  const seconds = Math.ceil(msLeft / 1000);

  return (
    <div className="space-y-4">
      {/* لوحة النتيجة */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-3xl border border-card-edge bg-card-soft px-4 py-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-faint">
            {t(lang, "penaltyYou")}
          </p>
          <p className="text-2xl font-black tabular-nums text-gold">{goals}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-faint">
            {t(lang, "penaltyShot")} {Math.min(shotIdx + 1, LOCAL_PENALTY.shots)}/{LOCAL_PENALTY.shots}
          </p>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            {Array.from({ length: LOCAL_PENALTY.shots }, (_, i) => {
              const r = results[i];
              return (
                <span
                  key={i}
                  className={cn(
                    "size-2 rounded-full",
                    r === "goal" ? "bg-grass-400" : r ? "bg-red-400" : "bg-ghost",
                  )}
                />
              );
            })}
          </div>
        </div>
        <div className="text-end">
          <p className="text-[10px] font-black uppercase tracking-widest text-faint">
            {t(lang, "penaltyKeeper")}
          </p>
          <p className="text-2xl font-black tabular-nums text-cyan-300">
            {results.filter((r) => r !== "goal").length}
          </p>
        </div>
      </div>

      {/* شريط المؤقت */}
      {phase === "shooting" && (
        <div className="relative h-2 overflow-hidden rounded-full bg-ghost">
          <motion.div
            className={cn("h-full rounded-full", urgent ? "bg-red-500" : "bg-gradient-to-l from-grass-500 to-gold")}
            initial={false}
            animate={{ width: `${(msLeft / LOCAL_PENALTY.shotMs) * 100}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "ready" && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="relative overflow-hidden rounded-3xl border border-card-edge bg-card-soft p-6 text-center"
          >
            <div className="pointer-events-none absolute -top-14 -end-10 size-36 rounded-full bg-grass-500/15 blur-3xl" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: 2, ease: "easeInOut" }}
              className="mx-auto w-fit"
            >
              <BallMark className="size-16" />
            </motion.div>
            <h3 className="mt-4 text-xl font-black">{t(lang, "localPenaltyTitle")}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-6 text-soft">
              {t(lang, "localPenaltyDesc")}
            </p>
            <Button onClick={start} className="mx-auto mt-5 px-8">
              <Play className="size-4" />
              {t(lang, "localPenaltyStart")}
            </Button>

            {/* السجل المحلي */}
            {record.matches > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-card-edge pt-4">
                <div>
                  <p className="text-lg font-black tabular-nums text-gold">{record.bestGoals}</p>
                  <p className="text-[10px] font-bold text-faint">{t(lang, "localPenaltyBest")}</p>
                </div>
                <div>
                  <p className="text-lg font-black tabular-nums text-grass-400">{record.matches}</p>
                  <p className="text-[10px] font-bold text-faint">{t(lang, "localPenaltyMatches")}</p>
                </div>
                <div>
                  <p className="text-lg font-black tabular-nums text-cyan-300">
                    {Math.round((record.totalGoals / (record.matches * LOCAL_PENALTY.shots)) * 100)}%
                  </p>
                  <p className="text-[10px] font-bold text-faint">{t(lang, "localPenaltyRate")}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {phase === "shooting" && (
          <motion.div
            key="shooting"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-3"
          >
            {/* المرمى */}
            <div className="relative overflow-hidden rounded-3xl border border-card-edge bg-card-soft p-4">
              <div className="pointer-events-none absolute inset-x-8 top-2 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />
              {/* مرمى بسيط */}
              <div className="relative mx-auto grid h-32 max-w-xs grid-cols-3 gap-1.5 rounded-t-xl border-x-2 border-t-2 border-white/25 bg-black/20 p-2">
                {ZONE_META.map(({ zone, icon: Icon }) => {
                  const revealed = keeper !== null;
                  const isKeeperHere = revealed && keeper === zone;
                  const isMyPick = picked === zone;
                  const scored = revealed && picked !== null && isMyPick && !isKeeperHere;
                  const savedByMe = revealed && isMyPick && isKeeperHere;
                  const timedOut = revealed && picked === null;
                  return (
                    <motion.button
                      key={zone}
                      whileTap={pickedRef.current === null ? { scale: 0.95 } : undefined}
                      onClick={() => choose(zone)}
                      disabled={pickedRef.current !== null}
                      className={cn(
                        "relative flex items-center justify-center rounded-xl border transition-colors duration-200",
                        isKeeperHere
                          ? "border-cyan-300/60 bg-cyan-400/20"
                          : scored
                            ? "border-grass-400/60 bg-grass-500/25"
                            : isMyPick
                              ? "border-gold/60 bg-gold/15"
                              : timedOut
                                ? "border-white/10 bg-white/[0.02]"
                                : "border-white/15 bg-white/[0.05] hover:border-gold/40 hover:bg-gold/5",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-7 transition-colors",
                          isKeeperHere ? "text-cyan-200" : scored ? "text-grass-200" : "text-white/40",
                        )}
                      />
                      {isKeeperHere && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -end-2 flex size-6 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-black text-[#0b120e]"
                        >
                          🧤
                        </motion.span>
                      )}
                      {scored && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -bottom-2 -end-2"
                        >
                          <CheckBadge className="size-6" />
                        </motion.span>
                      )}
                      {savedByMe && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -bottom-2 -end-2"
                        >
                          <CrossBadge className="size-6" />
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              {/* خط المرمى + الأرض */}
              <div className="mx-auto mt-1 h-2.5 max-w-xs rounded-b bg-gradient-to-b from-white/20 to-transparent" />

              {/* نتيجة التسديدة */}
              <AnimatePresence>
                {pickedRef.current !== null && keeper !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 flex items-center justify-center gap-2"
                  >
                    {results[results.length - 1] === "goal" ? (
                      <>
                        <CheckBadge className="size-8" />
                        <span className="text-lg font-black text-grass-300">{t(lang, "penGoal")}</span>
                      </>
                    ) : results[results.length - 1] === "save" ? (
                      <>
                        <CrossBadge className="size-8" />
                        <span className="text-lg font-black text-cyan-300">{t(lang, "penSaved")}</span>
                      </>
                    ) : (
                      <>
                        <Timer className="size-7 text-red-400" />
                        <span className="text-lg font-black text-red-300">{t(lang, "penTimeout")}</span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* عداد الوقت */}
            <div className="flex items-center justify-center gap-2">
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-black tabular-nums",
                  urgent ? "animate-pulse bg-red-500/20 text-red-300" : "bg-card-soft text-white/70",
                )}
              >
                <Timer className="size-4" />
                {seconds}s
              </span>
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
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="mx-auto w-fit"
            >
              {goals >= 3 ? <BallMark className="size-16" /> : <CrossBadge className="size-16" />}
            </motion.div>
            <p className="mt-4 text-sm font-bold text-soft">
              {goals >= 4 ? t(lang, "localPenaltyGreat") : goals >= 2 ? t(lang, "localPenaltyGood") : t(lang, "localPenaltyBad")}
            </p>
            <p className="mt-1 text-5xl font-black tabular-nums text-gold">
              {goals}
              <span className="text-2xl text-faint">/{LOCAL_PENALTY.shots}</span>
            </p>

            {xpGained > 0 && (
              <p className="mt-2 text-sm font-black text-amber-300">
                +{xpGained} XP {t(lang, "localPenaltyXpEarned")}
              </p>
            )}
            {bestBeaten && (
              <p className="mt-1 text-xs font-black text-grass-300">🏆 {t(lang, "localPenaltyNewBest")}</p>
            )}

            <div className="mt-6 flex gap-2">
              <Button onClick={start} className="flex-1">
                <RotateCcw className="size-4" />
                {t(lang, "localPenaltyAgain")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
