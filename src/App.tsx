import { useCallback, useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { Moon, Settings, Share2, Sun } from "lucide-react";
import { motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { questions } from "./data/questions";
import { phraseSets, pick } from "./data/phrases";
import { sound } from "./lib/sound";
import { applyLang, currentLang, t, type Lang } from "./lib/i18n";
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
import {
  isNative,
  isReminderEnabled,
  initReminderLifecycle,
  scheduleDailyReminder,
  setReminderEnabled,
} from "./lib/notifications";
import { QuestionCard } from "./components/QuestionCard";
import { ResultPanel } from "./components/ResultPanels";
import { SettingsSheet } from "./components/SettingsSheet";
import { StreakOrb } from "./components/StreakOrb";
import { WeekStrip } from "./components/WeekStrip";
import { AuthPanel } from "./components/AuthPanel";
import { BallMark, PadMark, TargetMark } from "./components/Icons";

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
  const [lang, setLangState] = useState<Lang>(() => currentLang());
  const [session, setSession] = useState<Session | null>(null);
  const [reminder, setReminder] = useState(() => isReminderEnabled());
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  // جلسة المستخدم
  useEffect(() => {
    if (!supabaseConfigured) return;
    void auth.getSession().then(setSession);
    const sub = auth.onChange(setSession);
    return () => sub.unsubscribe();
  }, []);

  // مزامنة الإحصائيات عند تسجيل الدخول
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

  // الإشعارات: جدولة فورية + إعادة جدولة عند الاستئناف
  useEffect(() => {
    initReminderLifecycle();
  }, []);

  // الوضع الداكن: مزامنة الحالة مع الصفحة
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && mq.matches);
      root.classList.toggle("dark", dark);
      setIsDark(dark);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  const buzz = useCallback((correct: boolean) => {
    if (!isNative) return;
    void Haptics.impact({ style: correct ? ImpactStyle.Medium : ImpactStyle.Heavy });
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return;
      setSelected(index);
      const result = recordAnswer(today.dateKey, index, today.question.answer);
      setStats(result.stats);
      setMilestone(result.milestone);
      setPhrase(pick(phraseSets[currentLang()][result.correct ? "win" : "lose"]));

      buzz(result.correct);
      if (result.correct) {
        sound.correct(soundOn);
        // كونفيتي خفيف (أقل جزيئات = أسرع)
        void confetti({
          particleCount: 70,
          spread: 65,
          startVelocity: 32,
          disableForReducedMotion: true,
          origin: { y: 0.65 },
          colors: ["#10b981", "#fbbf24", "#ffffff"],
        });
      } else {
        sound.wrong(soundOn);
      }
      if (result.milestone) {
        sound.streak(soundOn, result.stats.streak);
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
    const text = `⚽ TiQ — ${t("todayQuestion")}\n${emoji} ${today.question.q}\n🔥 ${t("myStreak")}: ${stats.streak} ${t("day")}\n${t("shareBody")}`;
    if (navigator.share) {
      void navigator.share({ title: t("shareTitle"), text });
    } else {
      void navigator.clipboard?.writeText(text);
      alert(t("copied"));
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

  const changeTheme = (th: Theme) => {
    setThemeState(th);
    setTheme(th);
  };

  const changeLang = (l: Lang) => {
    setLangState(applyLang(l));
  };

  const toggleQuickTheme = () => {
    changeTheme(isDark ? "light" : "dark");
  };

  const changeReminder = (on: boolean) => {
    setReminder(on);
    setReminderEnabled(on);
    if (on) void scheduleDailyReminder();
  };

  const alreadyAnswered = selected !== null;

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
      {/* الشريط العلوي — آمن تحت شريط حالة النظام (safe-area) */}
      <header
        className="flex items-center justify-between gap-2 px-3 sm:px-8 sm:pt-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <img src="/icon.png" alt="TiQ" className="size-9 shrink-0 rounded-xl shadow sm:size-11" />
          <div className="min-w-0 leading-tight">
            <h1 className="bg-gradient-to-l from-grass-600 to-gold bg-clip-text text-lg font-black text-transparent sm:text-xl dark:from-grass-400 dark:to-gold">
              TiQ
            </h1>
            <p className="truncate text-[10px] font-bold opacity-60 sm:text-[11px]">{t("tagline")}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => changeLang(lang === "ar" ? "en" : "ar")}
            aria-label="Language"
            className="glass-card flex h-9 items-center rounded-full px-2.5 text-xs font-black shadow-sm sm:h-10 sm:px-3"
          >
            {lang === "ar" ? "EN" : "ع"}
          </button>

          <button
            onClick={toggleQuickTheme}
            aria-label={t("appearance")}
            className="glass-card flex h-9 w-9 items-center justify-center rounded-full shadow-sm sm:h-10 sm:w-10"
          >
            {isDark ? <Sun className="size-4 sm:size-5" /> : <Moon className="size-4 sm:size-5" />}
          </button>

          {alreadyAnswered && (
            <button
              onClick={shareResult}
              aria-label="Share"
              className="glass-card hidden h-9 w-9 items-center justify-center rounded-full shadow-sm sm:flex sm:h-10 sm:w-10"
            >
              <Share2 className="size-4 sm:size-5" />
            </button>
          )}

          <button
            onClick={() => setSettingsOpen(true)}
            aria-label={t("settings")}
            className="glass-card flex h-9 w-9 items-center justify-center rounded-full shadow-sm sm:h-10 sm:w-10"
          >
            <Settings className="size-4 sm:size-5" />
          </button>
        </div>
      </header>

      {/* السلسلة */}
      <div className="mt-3 flex justify-center px-3 sm:mt-4">
        <StreakOrb streak={stats.streak} best={stats.best} />
      </div>

      {/* المحتوى */}
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-5 px-3 py-6 sm:px-8 sm:py-8">
        <QuestionCard question={today.question} selected={selected} onSelect={handleSelect} />

        {alreadyAnswered && (
          <ResultPanel
            question={today.question}
            selected={selected}
            phrase={phrase || t("savedAnswer")}
            milestone={milestone}
          />
        )}

        <WeekStrip answers={weekAnswers} />

        {alreadyAnswered && (
          <div className="grid grid-cols-3 gap-2 text-center sm:gap-3">
            {[
              { label: t("matches"), value: `${stats.playedCount}`, Icon: PadMark },
              { label: t("goals"), value: `${stats.correctCount}`, Icon: BallMark },
              {
                label: t("accuracy"),
                value: `${Math.round((stats.correctCount / Math.max(stats.playedCount, 1)) * 100)}%`,
                Icon: TargetMark,
              },
            ].map(({ label, value, Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="glass-card rounded-2xl p-2.5 shadow-sm sm:p-3"
              >
                <p className="flex items-center justify-center gap-1.5 text-lg font-black text-grass-700 sm:text-xl dark:text-grass-400">
                  <Icon className="size-4 sm:size-5" />
                  {value}
                </p>
                <p className="text-[10px] font-bold opacity-60 sm:text-xs">{label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {supabaseConfigured && <AuthPanel session={session} />}

        {alreadyAnswered && (
          <p className="text-center text-sm font-bold opacity-50">{t("backTomorrow")}</p>
        )}
      </main>

      <footer
        className="pb-4 text-center sm:pb-6"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}
      >
        <p className="text-xs font-bold opacity-50">{t("madeBy")}</p>
      </footer>

      <SettingsSheet
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        soundOn={soundOn}
        onSoundChange={changeSound}
        theme={theme}
        onThemeChange={changeTheme}
        lang={lang}
        onLangChange={changeLang}
        reminder={reminder}
        onReminderChange={changeReminder}
        onReset={handleReset}
      />
    </div>
  );
}
