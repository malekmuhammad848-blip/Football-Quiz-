import { useCallback, useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { Settings, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { questions } from "./data/questions";
import { phrases, pick } from "./data/phrases";
import { sound } from "./lib/sound";
import {
  getQuestionForToday,
  getStats,
  getSoundEnabled,
  getTheme,
  getHistory,
  hasAnsweredToday,
  recordAnswer,
  resetAll,
  setSoundEnabled,
  setTheme,
  type Stats,
  type Theme,
} from "./lib/store";
import { supabaseConfigured } from "./lib/supabase";
import { auth, profile } from "./lib/backend";
import { isNative, isReminderEnabled, initReminderLifecycle, scheduleDailyReminder, setReminderEnabled } from "./lib/notifications";
import { QuestionCard } from "./components/QuestionCard";
import { ResultPanel } from "./components/ResultPanels";
import { SettingsSheet } from "./components/SettingsSheet";
import { StreakOrb } from "./components/StreakOrb";
import { WeekStrip } from "./components/WeekStrip";
import { AuthPanel } from "./components/AuthPanel";
import { cn } from "./utils/cn";

export default function App() {
  const today = useMemo(() => getQuestionForToday(questions), []);
  const history = useMemo(getHistory, []);

  const [stats, setStats] = useState<Stats>(() => getStats());
  const [selected, setSelected] = useState<number | null>(() =>
    hasAnsweredToday(today.dateKey) ? (history[today.dateKey] ?? null) : null,
  );
  const [phrase, setPhrase] = useState("");
  const [milestone, setMilestone] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => getSoundEnabled());
  const [theme, setThemeState] = useState<Theme>(() => getTheme());
  const [session, setSession] = useState<Session | null>(null);
  const [reminder, setReminder] = useState(() => isReminderEnabled());

  // جلسة المستخدم
  useEffect(() => {
    if (!supabaseConfigured) return;
    void auth.getSession().then(setSession);
    const sub = auth.onChange(setSession);
    return () => sub.unsubscribe();
  }, []);

  // عند تسجيل الدخول: دمج الإحصائيات السحابية مع المحلية ثم رفع الدمج
  useEffect(() => {
    if (!session?.user || !supabaseConfigured) return;
    let cancelled = false;
    void (async () => {
      try {
        const merged = await profile.pullAndMerge(stats, session.user);
        if (cancelled) return;
        setStats(merged);
        await profile.pushStats(session.user, merged);
      } catch {
        /* المزامنة اختيارية */
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  // الإشعارات: جدولة فورية + إعادة جدولة عند الاستئناف (حتى يصل الإشعار يوميًا 10 مساءً)
  useEffect(() => {
    initReminderLifecycle();
  }, []);

  const buzz = useCallback(
    (correct: boolean) => {
      if (!isNative) return;
      void Haptics.impact({ style: correct ? ImpactStyle.Medium : ImpactStyle.Heavy });
    },
    [],
  );

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return;
      setSelected(index);
      const result = recordAnswer(today.dateKey, index, today.question.answer);
      setStats(result.stats);
      setMilestone(result.milestone);
      setPhrase(pick(result.correct ? phrases.win : phrases.lose));

      buzz(result.correct);
      if (result.correct) {
        sound.correct(soundOn);
        void confetti({
          particleCount: 200,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#10b981", "#fbbf24", "#ffffff", "#34d399"],
        });
      } else {
        sound.wrong(soundOn);
      }
      if (result.milestone) {
        sound.streak(soundOn, result.stats.streak);
        setTimeout(() => {
          void confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.4 },
            colors: ["#fbbf24", "#f59e0b"],
          });
        }, 400);
      }

      if (session?.user && supabaseConfigured) {
        void profile.pushStats(session.user, result.stats);
        void profile.saveDailyAnswer(session.user, today.dateKey, index, result.correct);
      }
    },
    [selected, today, soundOn, session, buzz],
  );

  const shareResult = () => {
    const emoji = selected === today.question.answer ? "✅" : "❌";
    const text = `⚽ TiQ — سؤال اليوم\n${emoji} ${today.question.q}\n🔥 سلسلتي: ${stats.streak} يوم\nجرّب أنت أيضًا!`;
    if (navigator.share) {
      void navigator.share({ title: "TiQ ⚽", text });
    } else {
      void navigator.clipboard?.writeText(text);
      alert("تم نسخ النتيجة! 📋");
    }
  };

  const handleReset = () => {
    resetAll();
    location.reload();
  };

  const changeSound = (on: boolean) => {
    setSoundOn(on);
    setSoundEnabled(on);
  };

  const changeTheme = (t: Theme) => {
    setThemeState(t);
    setTheme(t);
  };

  const changeReminder = (on: boolean) => {
    setReminder(on);
    setReminderEnabled(on);
    if (on) void scheduleDailyReminder();
  };

  const alreadyAnswered = selected !== null;

  // خريطة نتائج آخر 7 أيام لشريط الأسبوع
  const weekAnswers = useMemo(() => {
    const map: Record<string, boolean> = {};
    const correctIndex = today.question.answer;
    for (const [day, sel] of Object.entries(history)) {
      if (typeof sel === "number") map[day] = sel === correctIndex;
    }
    return map;
  }, [history, today]);

  return (
    <div className="pitch-lines flex min-h-dvh flex-col">
      {/* الشريط العلوي */}
      <header className="flex items-center justify-between px-5 pt-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          <img src="/icon.png" alt="TiQ" className="size-11 rounded-2xl shadow-lg" />
          <div className="leading-tight">
            <h1 className="bg-gradient-to-l from-grass-600 to-gold bg-clip-text text-xl font-black text-transparent dark:from-grass-400 dark:to-gold">
              TiQ
            </h1>
            <p className="text-[11px] font-bold opacity-60">سؤال الكرة اليومي</p>
          </div>
        </motion.div>
        <div className="flex items-center gap-3">
          <StreakOrb streak={stats.streak} best={stats.best} />
          {alreadyAnswered && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={shareResult}
              aria-label="شارك نتيجتك"
              className="glass-card rounded-full p-2.5 shadow-sm transition-transform hover:scale-105"
            >
              <Share2 className="size-5" />
            </motion.button>
          )}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="الإعدادات"
            className="glass-card rounded-full p-2.5 shadow-sm transition-colors hover:bg-ink/5"
          >
            <Settings className="size-5" />
          </button>
        </div>
      </header>

      {/* المحتوى */}
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-5 px-5 py-8 sm:px-8">
        <QuestionCard
          question={today.question}
          selected={selected}
          onSelect={handleSelect}
        />

        {alreadyAnswered && (
          <ResultPanel
            question={today.question}
            selected={selected}
            phrase={phrase || "إجابة اليوم محفوظة ✅"}
            milestone={milestone}
          />
        )}

        <WeekStrip answers={weekAnswers} />

        {alreadyAnswered && (
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "المباريات", value: `${stats.playedCount}`, icon: "🎮" },
              { label: "أهداف", value: `${stats.correctCount}`, icon: "⚽" },
              {
                label: "الدقة",
                value: `${Math.round((stats.correctCount / Math.max(stats.playedCount, 1)) * 100)}%`,
                icon: "🎯",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card rounded-2xl p-3 shadow-sm"
              >
                <p className="text-xl font-black text-grass-700 dark:text-grass-400">
                  {s.icon} {s.value}
                </p>
                <p className="text-xs font-bold opacity-60">{s.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {supabaseConfigured && <AuthPanel session={session} />}

        {alreadyAnswered && (
          <p className={cn("text-center text-sm font-bold opacity-50")}>
            🗓️ سؤال جديد عند منتصف الليل — استعد!
          </p>
        )}
      </main>

      <footer className="pb-6 text-center">
        <p className="text-xs font-bold opacity-50">
          صُنع بحب ⚽ TiQ — تطوير <span className="text-grass-600 dark:text-grass-400">Malek</span>
        </p>
      </footer>

      <SettingsSheet
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        soundOn={soundOn}
        onSoundChange={changeSound}
        theme={theme}
        onThemeChange={changeTheme}
        reminder={reminder}
        onReminderChange={changeReminder}
        onReset={handleReset}
      />
    </div>
  );
}
