/**
 * PenaltyArena — دوري ركلات الترجيح الحي (1v1 أو ضد حاسوب TiQ)
 * تدفق كامل: Matchmaking → تسديد بمؤقت 5 ثوانٍ → نتائج لحظية → ترتيب مباشر
 * كل الأسئلة والحالات تأتي من Supabase (Realtime) — لا نصوص ثابتة للأسئلة.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, Swords, Timer, Trophy, Zap } from "lucide-react";
import {
  fetchMyPenaltyStats,
  fetchPenaltyLeaders,
  fetchPenaltyQuestion,
  fetchRoom,
  joinQueue,
  startBotMatch,
  subscribeRoom,
  takeShot,
  type PenaltyLeaderRow,
  type PenaltyRoomRow,
  type RoomQuestion,
  type Session,
} from "../lib/backend";
import {
  mySlot,
  opponentName,
  SHOT_WINDOW_MS,
  summarize,
  type MatchSummary,
  type ShotOutcome,
} from "../domain/penaltyEngine";
import { t, type Lang, type TKey } from "../lib/i18n";
import { sfx, buzz } from "../lib/feedback";
import { prefsStore } from "../stores/prefsStore";
import { cn } from "../utils/cn";
import { Button } from "./ui/primitives";
import { BallMark, CheckBadge, CrossBadge } from "./Icons";
import { LocalPenalty } from "./LocalPenalty";

type Phase = "lobby" | "waiting" | "playing" | "result";

/** الوضع النشط داخل الساحة: سحابي أو محلي */
type ArenaMode = "cloud" | "local";

interface Props {
  session: Session | null;
  lang: Lang;
  onRequireAuth: () => void;
}

/** سؤال محلي مخبأ حسب الـ id */
function useQuestionCache(lang: Lang) {
  const cache = useRef(new Map<string, RoomQuestion>());
  return useCallback(
    async (id: string): Promise<RoomQuestion | null> => {
      const hit = cache.current.get(id);
      if (hit) return hit;
      const q = await fetchPenaltyQuestion(id, lang);
      if (q) cache.current.set(id, q);
      return q;
    },
    [lang],
  );
}

export function PenaltyArena({ session, lang, onRequireAuth }: Props) {
  const [mode, setMode] = useState<ArenaMode>("local");
  const [phase, setPhase] = useState<Phase>("lobby");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [room, setRoom] = useState<PenaltyRoomRow | null>(null);
  const [question, setQuestion] = useState<RoomQuestion | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<ShotOutcome | null>(null);
  const [summary, setSummary] = useState<MatchSummary | null>(null);
  const [msLeft, setMsLeft] = useState(SHOT_WINDOW_MS);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ wins: number; losses: number; shots: number; goals: number } | null>(null);
  const [leaders, setLeaders] = useState<PenaltyLeaderRow[] | null>(null);

  const getQuestion = useQuestionCache(lang);
  const lastShotRef = useRef(0);
  const outcomeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const meId = session?.user.id ?? null;

  const soundOn = prefsStore.getState().sound;

  // ——— تحميل الإحصائيات والترتيب في اللوبي ———
  const refreshStats = useCallback(async () => {
    if (!meId) return;
    try {
      const [s, l] = await Promise.all([
        fetchMyPenaltyStats(meId),
        fetchPenaltyLeaders().catch(() => null),
      ]);
      setStats(s);
      setLeaders(l);
    } catch {
      /* اللوبي يشتغل بدون إحصائيات */
    }
  }, [meId]);

  useEffect(() => {
    if (phase === "lobby" && meId) void refreshStats();
  }, [phase, meId, refreshStats]);

  // ——— الاشتراك في الغرفة ———
  useEffect(() => {
    if (!roomId) return;
    let alive = true;

    // جلب فوري أول (حتى لا ننتظر أول حدث)
    void fetchRoom(roomId).then((r) => {
      if (alive && r) setRoom(r);
    });

    const unsub = subscribeRoom(roomId, (next) => {
      if (!alive) return;
      setRoom((prev) => {
        // إذا رجعت إجابتي إلى null = جولة جديدة
        if (prev && next.round > prev.round) {
          setPicked(null);
          setOutcome(null);
        }
        return next;
      });
    });

    return () => {
      alive = false;
      unsub();
    };
  }, [roomId]);

  // ——— التفاعل مع تغيّر حالة الغرفة ———
  useEffect(() => {
    if (!room) return;

    if (room.status === "waiting" && phase !== "waiting") {
      setPhase("waiting");
    }

    if (room.status === "shooting") {
      if (phase !== "playing") setPhase("playing");
      // جلب السؤال الحالي إن تغيّر
      if (room.question_id && (!question || question.id !== room.question_id)) {
        void getQuestion(room.question_id).then((q) => setQuestion(q));
      }
    }

    if (room.status === "finished" && phase !== "result" && meId) {
      setSummary(summarize(room, meId));
      setPhase("result");
      const won = room.winner === meId;
      const draw = room.winner === null;
      if (soundOn) (won ? sfx.levelUp : draw ? sfx.tap : sfx.wrong)();
      if (won && prefsStore.getState().haptics) void buzz("medium");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.status, room?.round, room?.question_id, room?.winner, meId]);

  // ——— مؤقت نافذة التسديد ———
  useEffect(() => {
    if (phase !== "playing" || !room || room.status !== "shooting") return;
    const deadline = room.deadline ? new Date(room.deadline).getTime() : Date.now() + SHOT_WINDOW_MS;
    const id = setInterval(() => {
      const left = Math.max(0, deadline - Date.now());
      setMsLeft(left);
      if (left === 0 && picked === null && Date.now() - lastShotRef.current > 1500) {
        // مهلة — تسديد تلقائي فاشل
        lastShotRef.current = Date.now();
        setPicked(null);
        setOutcome("timeout");
        if (soundOn) sfx.wrong();
        void takeShot(room.id, -1, SHOT_WINDOW_MS).catch(() => undefined);
      }
    }, 100);
    return () => clearInterval(id);
  }, [phase, room, picked, soundOn]);

  // ——— عرض نتيجة تسديدي ثم إرسالها فعليًا ———
  const shoot = useCallback(
    (choice: number) => {
      if (!room || picked !== null || phase !== "playing") return;
      const now = Date.now();
      if (now - lastShotRef.current < 250) return; // debounce
      lastShotRef.current = now;

      setPicked(choice);
      const hit = choice === question?.correct;
      const res: ShotOutcome = hit ? "goal" : "miss";
      setOutcome(res);
      if (soundOn) (hit ? sfx.correct : sfx.wrong)();
      if (prefsStore.getState().haptics) void buzz(hit ? "medium" : "heavy");

      const timeMs = room.deadline ? Math.max(0, SHOT_WINDOW_MS - (new Date(room.deadline).getTime() - now)) : SHOT_WINDOW_MS;
      void takeShot(room.id, choice, timeMs).catch((e) => {
        setError(e instanceof Error ? e.message : "shot-failed");
      });

      // إخفاء النتيجة بعد لحظة (الجولة التالية تصفّرها عبر Realtime)
      if (outcomeTimer.current) clearTimeout(outcomeTimer.current);
      outcomeTimer.current = setTimeout(() => setOutcome(null), 1600);
    },
    [room, picked, phase, question, soundOn],
  );

  useEffect(() => () => {
    if (outcomeTimer.current) clearTimeout(outcomeTimer.current);
  }, []);

  // ——— إجراءات ———
  const enterQueue = async () => {
    if (!session) {
      onRequireAuth();
      return;
    }
    setError(null);
    try {
      const id = await joinQueue(displayName(session, lang));
      setRoomId(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "queue-failed");
    }
  };

  const playBot = async () => {
    if (!session) {
      onRequireAuth();
      return;
    }
    setError(null);
    try {
      const id = await startBotMatch(displayName(session, lang));
      setRoomId(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "bot-failed");
    }
  };

  const leaveMatch = () => {
    setPhase("lobby");
    setRoomId(null);
    setRoom(null);
    setQuestion(null);
    setPicked(null);
    setOutcome(null);
    setSummary(null);
    void refreshStats();
  };

  // الوضع المحلي لا يحتاج سحابة إطلاقًا
  if (mode === "local") {
    return (
      <div className="space-y-4">
        <ModeSwitch mode={mode} onChange={setMode} lang={lang} />
        <LocalPenalty lang={lang} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ModeSwitch mode={mode} onChange={setMode} lang={lang} />
      <AnimatePresence mode="wait">
        {phase === "lobby" && (
          <motion.div key="lobby" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Lobby
              lang={lang}
              session={session}
              stats={stats}
              leaders={leaders}
              error={error}
              onQueue={enterQueue}
              onBot={playBot}
              onLocal={() => setMode("local")}
            />
          </motion.div>
        )}

        {phase === "waiting" && (
          <motion.div key="waiting" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <WaitingRoom lang={lang} roomId={roomId} onCancel={leaveMatch} />
          </motion.div>
        )}

        {phase === "playing" && room && (
          <motion.div key="playing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <MatchStage
              room={room}
              question={question}
              picked={picked}
              outcome={outcome}
              msLeft={msLeft}
              meId={meId}
              lang={lang}
              onShoot={shoot}
            />
          </motion.div>
        )}

        {phase === "result" && summary && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <ResultCard summary={summary} lang={lang} onDone={leaveMatch} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** مفتاح التبديل بين الوضع المحلي والسحابي */
function ModeSwitch({
  mode,
  onChange,
  lang,
}: {
  mode: ArenaMode;
  onChange: (m: ArenaMode) => void;
  lang: Lang;
}) {
  const options: { id: ArenaMode; label: string }[] = [
    { id: "local", label: t(lang, "penaltyLocal") },
    { id: "cloud", label: t(lang, "penaltyOnline") },
  ];
  return (
    <div className="flex rounded-2xl border border-card-edge bg-card-soft p-1">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "flex-1 rounded-xl py-2 text-xs font-black transition-all sm:text-sm",
            mode === o.id
              ? "bg-gradient-to-l from-grass-600 to-grass-500 text-white shadow"
              : "text-soft hover:text-white",
          )
          }
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function displayName(session: Session, lang: Lang): string {
  const meta = (session.user.user_metadata ?? {}) as Record<string, unknown>;
  const name = (meta.display_name as string | undefined) ?? (meta.full_name as string | undefined) ?? (meta.name as string | undefined);
  return name?.trim() || session.user.email?.split("@")[0] || (lang === "ar" ? "لاعب" : "Player");
}

/* ============================================================
 * اللوبي — الدخول + الإحصائيات + الترتيب المباشر
 * ============================================================ */

function Lobby({
  lang,
  session,
  stats,
  leaders,
  error,
  onQueue,
  onBot,
  onLocal,
}: {
  lang: Lang;
  session: Session | null;
  stats: { wins: number; losses: number; shots: number; goals: number } | null;
  leaders: PenaltyLeaderRow[] | null;
  error: string | null;
  onQueue: () => void;
  onBot: () => void;
  onLocal: () => void;
}) {
  const accuracy = stats && stats.shots > 0 ? Math.round((stats.goals / stats.shots) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* بطاقة الدخول */}
      <div className="relative overflow-hidden rounded-3xl border border-card-edge bg-gradient-to-b from-grass-500/15 to-transparent p-5">
        <div className="pointer-events-none absolute -top-16 -end-16 size-40 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.18), transparent)" }} />
        <div className="relative">
          <div className="flex items-center gap-2 text-gold">
            <Swords className="size-5" />
            <h3 className="text-lg font-black">{t(lang, "penaltyTitle")}</h3>
          </div>
          <p className="mt-1 text-sm font-medium text-soft">{t(lang, "penaltyDesc")}</p>

          {session ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Button onClick={onBot} className="w-full">
                <Zap className="size-4" />
                {t(lang, "penaltyQuick")}
              </Button>
              <Button onClick={onQueue} variant="gold" className="w-full">
                <Crosshair className="size-4" />
                {t(lang, "penaltyQueue")}
              </Button>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <p className="text-center text-xs font-bold text-soft">{t(lang, "penaltyNeedAuth")}</p>
              <Button onClick={onLocal} className="w-full">
                <Zap className="size-4" />
                {t(lang, "penaltyPlayOffline")}
              </Button>
            </div>
          )}

          {error && <p className="mt-3 text-center text-xs font-bold text-red-400">{error}</p>}
        </div>
      </div>

      {/* إحصائيات الترجيح */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: t(lang, "penWins"), value: stats?.wins ?? 0, tone: "text-grass-400" },
          { label: t(lang, "penGoals"), value: stats?.goals ?? 0, tone: "text-gold" },
          { label: t(lang, "penAccuracy"), value: `${accuracy}%`, tone: "text-cyan-300" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-3 text-center">
            <p className={cn("text-xl font-black tabular-nums", s.tone)}>{s.value}</p>
            <p className="text-[10px] font-bold opacity-60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ترتيب الترجيح المباشر */}
      {leaders && leaders.length > 0 && (
        <div className="rounded-3xl border border-card-edge bg-card-soft p-4">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="size-4 text-gold" />
            <h4 className="text-sm font-black text-ink">{t(lang, "penBoard")}</h4>
          </div>
          <ol className="space-y-1.5">
            {leaders.slice(0, 8).map((r, i) => (
              <li key={r.user_id} className="flex items-center gap-3 rounded-xl bg-card-soft px-3 py-2">
                <span className="w-6 text-center text-xs font-black tabular-nums text-soft">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-bold">{r.display_name}</span>
                <span className="text-xs font-black tabular-nums text-grass-400">{r.wins}W</span>
                <span className="text-xs font-bold tabular-nums text-gold">{r.goal_rate}%</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* ============================================================
 * غرفة الانتظار — بحث عن خصم حقيقي
 * ============================================================ */

function WaitingRoom({ lang, roomId, onCancel }: { lang: Lang; roomId: string | null; onCancel: () => void }) {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? "" : `${d}.`)), 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-8 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
        className="mx-auto w-fit"
      >
        <BallMark className="size-14" />
      </motion.div>
      <h3 className="mt-4 text-lg font-black">{t(lang, "penaltySearching")}{dots}</h3>
      <p className="mt-1 text-sm text-soft">{t(lang, "penaltySearchingHint")}</p>
      <Button variant="ghost" onClick={onCancel} className="mx-auto mt-5 px-6">
        {t(lang, "close")}
      </Button>
      {roomId && <p className="mt-3 text-[10px] font-mono text-faint">{roomId.slice(0, 8)}</p>}
    </div>
  );
}

/* ============================================================
 * ساحة المباراة — الشبكة + السؤال + المؤقت
 * ============================================================ */

function MatchStage({
  room,
  question,
  picked,
  outcome,
  msLeft,
  meId,
  lang,
  onShoot,
}: {
  room: PenaltyRoomRow;
  question: RoomQuestion | null;
  picked: number | null;
  outcome: ShotOutcome | null;
  msLeft: number;
  meId: string | null;
  lang: Lang;
  onShoot: (choice: number) => void;
}) {
  const slot = meId ? mySlot(room, meId) : 1;
  const myScore = slot === 1 ? room.p1_score : room.p2_score;
  const oppScore = slot === 1 ? room.p2_score : room.p1_score;
  const myAnswer = slot === 1 ? room.p1_answer : room.p2_answer;
  const oppAnswer = slot === 1 ? room.p2_answer : room.p1_answer;
  const myName = slot === 1 ? room.p1_name : (room.p2_name ?? "TiQ Bot");
  const opp = opponentName(room, meId ?? room.p1);
  const seconds = Math.ceil(msLeft / 1000);
  const urgent = seconds <= 2;
  const locked = picked !== null || myAnswer !== null;

  // خريطة النتائج لكل جولة (دوائر)
  const rounds = Array.from({ length: room.total_rounds }, (_, i) => i + 1);

  return (
    <div className="space-y-3">
      {/* لوحة النتيجة */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-3xl border border-card-edge bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-4 py-3">
        <PlayerSide name={myName} score={myScore} you align={lang === "ar" ? "right" : "left"} />
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-faint">
            {t(lang, "penaltyRound")} {room.round}/{room.total_rounds}
          </p>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            {rounds.map((r) => {
              const done = r < room.round || (r === room.round && myAnswer !== null && oppAnswer !== null);
              const myHit = r === room.round ? (outcome === "goal" || (myAnswer !== null && myAnswer === question?.correct)) : null;
              void done; void myHit;
              return <span key={r} className={cn("size-1.5 rounded-full", r <= room.round ? "bg-gold" : "bg-ghost")} />;
            })}
          </div>
        </div>
        <PlayerSide name={opp} score={oppScore} align={lang === "ar" ? "left" : "right"} />
      </div>

      {/* المؤقت */}
      <div className="relative h-2 overflow-hidden rounded-full bg-ghost">
        <motion.div
          className={cn("h-full rounded-full", urgent ? "bg-red-500" : "bg-gradient-to-l from-grass-500 to-gold")}
          style={{ width: `${Math.min(100, (msLeft / SHOT_WINDOW_MS) * 100)}%` }}
        />
      </div>

      {/* السؤال */}
      {question && (
        <div className="rounded-3xl border border-card-edge bg-card-soft p-4">
          <div className="flex items-center justify-between gap-2">
            <span className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black", urgent ? "bg-red-500/20 text-red-300" : "bg-ghost text-soft")}>
              <Timer className={cn("size-3", urgent && "animate-pulse")} />
              {seconds}s
            </span>
            <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-black text-gold">
              {t(lang, `difficulty${question.difficulty === "easy" ? "Easy" : question.difficulty === "medium" ? "Medium" : "Hard"}` as TKey)}
            </span>
          </div>

          <h4 className="mt-3 text-base font-black leading-snug">{question.q}</h4>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {question.options.map((opt, i) => {
              const n = i + 1;
              const isMine = picked === n || (myAnswer === n && picked === null);
              const revealed = outcome !== null || (myAnswer !== null && oppAnswer !== null);
              const isCorrect = revealed && n === question.correct;
              const isWrongPick = revealed && isMine && n !== question.correct;
              return (
                <motion.button
                  key={n}
                  whileTap={{ scale: locked ? 1 : 0.97 }}
                  disabled={locked}
                  onClick={() => onShoot(n)}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl border px-3 py-3 text-start text-sm font-bold transition-colors",
                    isCorrect
                      ? "border-grass-400/60 bg-grass-500/20 text-grass-200"
                      : isWrongPick
                        ? "border-red-400/60 bg-red-500/20 text-red-200"
                        : isMine
                          ? "border-gold/50 bg-gold/10"
                          : locked
                            ? "border-card-edge bg-card-soft opacity-50"
                            : "border-card-edge bg-ghost hover:border-gold/40 hover:bg-gold/5",
                  )}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-ghost text-[11px] font-black text-soft">
                    {n}
                  </span>
                  <span className="min-w-0 flex-1">{opt}</span>
                  {isCorrect && <CheckBadge className="size-5 shrink-0" />}
                  {isWrongPick && <CrossBadge className="size-5 shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* نتيجة التسديد الكبيرة */}
          <AnimatePresence>
            {outcome && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="mt-3 flex items-center justify-center gap-2 rounded-2xl py-3"
                style={{
                  background:
                    outcome === "goal"
                      ? "linear-gradient(90deg, rgba(52,211,153,0.15), transparent)"
                      : "linear-gradient(90deg, rgba(239,68,68,0.15), transparent)",
                }}
              >
                {outcome === "goal" ? (
                  <>
                    <CheckBadge className="size-9" />
                    <span className="text-xl font-black text-grass-300">{t(lang, "penGoal")}</span>
                  </>
                ) : outcome === "timeout" ? (
                  <>
                    <Timer className="size-8 text-red-400" />
                    <span className="text-xl font-black text-red-300">{t(lang, "penTimeout")}</span>
                  </>
                ) : (
                  <>
                    <CrossBadge className="size-9" />
                    <span className="text-xl font-black text-red-300">{t(lang, "penSaved")}</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function PlayerSide({ name, score, you, align }: { name: string; score: number; you?: boolean; align: "left" | "right" }) {
  return (
    <div className={cn("min-w-0", align === "left" ? "text-left" : "text-right")}>
      <p className="truncate text-sm font-black">
        {name}
        {you && <span className="ms-1 text-[10px] font-black text-grass-400">•</span>}
      </p>
      <p className="text-2xl font-black tabular-nums text-gold">{score}</p>
    </div>
  );
}

/* ============================================================
 * بطاقة النتيجة النهائية
 * ============================================================ */

function ResultCard({ summary, lang, onDone }: { summary: MatchSummary; lang: Lang; onDone: () => void }) {
  const title = summary.won ? t(lang, "penWon") : summary.draw ? t(lang, "penDraw") : t(lang, "penLost");
  return (
    <div className="rounded-3xl border border-card-edge bg-gradient-to-b from-white/[0.08] to-transparent p-8 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12 }}
        className="mx-auto w-fit"
      >
        {summary.won ? (
          <Trophy className="size-16 text-gold" />
        ) : (
          <CrossBadge className="size-16" />
        )}
      </motion.div>
      <h3 className="mt-4 text-2xl font-black">{title}</h3>
      <p className="mt-2 text-4xl font-black tabular-nums">
        <span className="text-grass-400">{summary.myScore}</span>
        <span className="mx-2 text-white/30">-</span>
        <span className="text-red-300">{summary.oppScore}</span>
      </p>
      <Button onClick={onDone} className="mx-auto mt-6 px-8">
        {t(lang, "penBackToLobby")}
      </Button>
    </div>
  );
}
