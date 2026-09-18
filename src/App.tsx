import { useCallback, useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { Settings } from "lucide-react";
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
import { QuestionCard } from "./components/QuestionCard";
import { ResultPanel } from "./components/ResultPanels";
import { SettingsSheet } from "./components/SettingsSheet";
import { StreakOrb } from "./components/StreakOrb";
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

  // تطبيق الثيم
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && mq.matches);
      root.classList.toggle("dark", dark);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return;
      setSelected(index);
      const result = recordAnswer(today.dateKey, index, today.question.answer);
      setStats(result.stats);
      setMilestone(result.milestone);
      setPhrase(pick(result.correct ? phrases.win : phrases.lose));

      if (result.correct) {
        sound.correct(soundOn);
        void confetti({
          particleCount: 160,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#22c55e", "#eab308", "#ffffff"],
        });
      } else {
        sound.wrong(soundOn);
      }
      if (result.milestone) sound.streak(soundOn, result.stats.streak);
    },
    [selected, today, soundOn],
  );

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

  const alreadyAnswered = selected !== null;

  return (
    <div className="pitch-lines flex min-h-dvh flex-col">
      {/* الشريط العلوي */}
      <header className="flex items-center justify-between px-5 pt-5 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="text-3xl">⚽</span>
          <div className="leading-tight">
            <h1 className="text-lg font-black">سؤال الكرة</h1>
            <p className="text-xs opacity-60">{today.dateKey}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StreakOrb streak={stats.streak} best={stats.best} />
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="الإعدادات"
            className="rounded-full bg-surface p-2.5 shadow-sm border border-grass-600/20 hover:bg-ink/5 transition-colors"
          >
            <Settings className="size-5" />
          </button>
        </div>
      </header>

      {/* المحتوى */}
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-5 py-8 sm:px-8">
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

        {alreadyAnswered && (
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "الأداء", value: `${stats.playedCount}` },
              { label: "صحيحة", value: `${stats.correctCount}` },
              { label: "الدقة", value: `${Math.round((stats.correctCount / Math.max(stats.playedCount, 1)) * 100)}%` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-surface p-3 shadow-sm border border-grass-600/10"
              >
                <p className="text-xl font-black text-grass-700 dark:text-grass-500">
                  {s.value}
                </p>
                <p className="text-xs opacity-60">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {alreadyAnswered && (
          <p className={cn("text-center text-sm opacity-50")}>
            عُد غدًا لسؤال جديد 🗓️ — سؤال اليوم منتهٍ
          </p>
        )}
      </main>

      <footer className="pb-6 text-center text-xs opacity-40">
        صُنع بحب لعشاق كرة القدم ⚽ Football Quiz
      </footer>

      <SettingsSheet
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        soundOn={soundOn}
        onSoundChange={changeSound}
        theme={theme}
        onThemeChange={changeTheme}
        onReset={handleReset}
      />
    </div>
  );
}
