/** ============================================================
 *  TiQ App — الجذر
 *  ============================================================ */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { APP } from "./core/config";
import { dayKey, daysBetween } from "./core/date";
import { getDailyQuestion, localizeQuestion } from "./domain/dailyEngine";
import { fnv1a } from "./core/date";
import { QUESTIONS } from "./data/questions";
import { levelFor } from "./domain/progression";
import { useProgress, usePrefs, useSession, useIsDark, useLang } from "./hooks/useAppStores";
import { questsStore } from "./stores/questsStore";
import { prefsStore } from "./stores/prefsStore";
import { progressStore } from "./stores/progressStore";
import { supabaseConfigured } from "./lib/supabase";
import { pullProfile, pushProgress, saveDailyAnswer, type Session } from "./lib/backend";
import { sfx, buzz, celebrate } from "./lib/feedback";
import { initReminderLifecycle, isNative, scheduleDailyReminder, cancelReminder } from "./lib/notifications";
import { pickPhrase, t, type Lang } from "./lib/i18n";
import { AppHeader } from "./components/AppHeader";
import { QuestionCard } from "./components/QuestionCard";
import { DailyQuests } from "./components/DailyQuests";
import { LevelUpBurst } from "./components/LevelUpBurst";
import { RushMode } from "./components/RushMode";
import { GrassGrid } from "./components/GrassGrid";
import { SeasonScreen } from "./components/SeasonScreen";
import { ShieldMark } from "./components/Icons";
import { ResultPanel } from "./components/ResultPanels";
import { SettingsSheet } from "./components/SettingsSheet";
import { StreakOrb } from "./components/StreakOrb";
import { StatsGrid } from "./components/StatsGrid";
import { LevelBar } from "./components/LevelBar";
import { AchievementsPanel, UnlockToast } from "./components/AchievementsPanel";
import { TrainingMode } from "./components/TrainingMode";
import { AuthPanel } from "./components/AuthPanel";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { NamePrompt } from "./components/NamePrompt";
import { ProfileScreen } from "./components/ProfileScreen";
import { PenaltyArena } from "./components/PenaltyArena";
import { TabBar, type TabId } from "./components/TabBar";
import { Badge, Button } from "./components/ui/primitives";
import { initAuthUrlOpen, displayNameOf } from "./lib/backend";

const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100] as const;

export default function App() {
  const prefs = usePrefs();
  const lang = useLang();
  const isDark = useIsDark();
  const progress = useProgress();
  const session: Session | null = useSession();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [training, setTraining] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [xpGained, setXpGained] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [unlockToast, setUnlockToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [namePromptDone, setNamePromptDone] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("today");
  const [penaltyAuthPrompt, setPenaltyAuthPrompt] = useState(false);
  const [levelBurst, setLevelBurst] = useState<{ level: number; name: string } | null>(null);

  // سؤال اليوم — ثابت لكل المستخدمين، يُعاد حسابه عند تغيير اللغة
  const daily = useMemo(() => getDailyQuestion(new Date(), lang), [lang]);

  // الإجابة المحفوظة لهذا اليوم (إن وجدت)
  const savedSelection = useMemo(() => {
    if (progress.todayQuestionId === daily.question.id && progress.lastAnswered === daily.dateKey) {
      return progress.history[daily.dateKey] ?? null;
    }
    return null;
  }, [progress, daily]);

  const selected = training ? null : savedSelection;

  // التقاط deep-link المصادقة (أندرويد: عودة Google)
  useEffect(() => {
    initAuthUrlOpen();
  }, []);

  // دورة حياة الإشعارات — يقرأ التفضيل لحظة التنفيذ
  useEffect(() => {
    initReminderLifecycle(
      () => prefsStore.getState().reminder,
      () => prefsStore.getState().lang,
    );
  }, []);

  // جدولة/إلغاء فوري عند تغيير التفضيل
  useEffect(() => {
    if (!isNative) return;
    if (prefs.reminder) void scheduleDailyReminder(prefs.lang);
    else void cancelReminder();
  }, [prefs.reminder, prefs.lang]);

  // مزامنة سحابية عند تسجيل الدخول: جلب ← دمج
  useEffect(() => {
    if (!session?.user || !supabaseConfigured) return;
    let alive = true;
    void (async () => {
      try {
        const remote = await pullProfile(session.user);
        if (!alive || !remote) return;
        progressStore.hydrate(remote);
        await pushProgress(session.user, progressStore.getState());
      } catch {
        /* المزامنة اختيارية */
      }
    })();
    return () => {
      alive = false;
    };
  }, [session?.user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const showUnlockToast = useCallback((id: string) => {
    setUnlockToast(id);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setUnlockToast(null), 3200);
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      if (selected !== null) return;
      const correct = index === daily.question.answer;

      const result = progressStore.answer({
        dateKey: daily.dateKey,
        questionId: daily.question.id,
        selected: index,
        correct,
        difficulty: daily.question.difficulty,
      });

      setXpGained(correct ? result.after.xp - result.before.xp : 0);
      setLeveledUp(result.leveledUp);
      setPhrase(pickPhrase(lang, correct));

      if (prefs.sound) (correct ? sfx.correct : sfx.wrong)();
      if (prefs.haptics && isNative) void buzz(correct ? "medium" : "heavy");
      if (correct) void celebrate(undefined, result.leveledUp);
      if (prefs.sound && result.leveledUp) setTimeout(() => sfx.levelUp(), 350);

      // ترقية المستوى → احتفال كامل الشاشة
      if (result.leveledUp) {
        const after = levelFor(result.after.xp);
        setTimeout(() => setLevelBurst({ level: after.current, name: after.name }), 600);
      }

      // تتبع المهمة: الإجابة على سؤال اليوم
      questsStore.track("answerDaily");

      const newUnlock = result.newUnlocks[0];
      if (newUnlock) {
        if (prefs.sound) setTimeout(() => sfx.unlock(), 500);
        showUnlockToast(newUnlock.id);
      }

      // مزامنة سحابية (غير حاجزة)
      if (session?.user && supabaseConfigured) {
        void pushProgress(session.user, result.after).catch(() => undefined);
        void saveDailyAnswer(session.user, daily.dateKey, index, correct).catch(() => undefined);
      }
    },
    [selected, daily, lang, prefs.sound, prefs.haptics, session, showUnlockToast],
  );

  /** ترقية مستوى من XP جانبي (ترجيح محلي) — يعرض الاحتفال */
  const prevLevelRef = useRef(levelFor(progress.xp).index);
  useEffect(() => {
    const idx = levelFor(progress.xp).index;
    if (idx > prevLevelRef.current) {
      const lvl = levelFor(progress.xp);
      setLevelBurst({ level: lvl.current, name: lvl.name });
      if (prefs.sound) sfx.levelUp();
    }
    prevLevelRef.current = idx;
  }, [progress.xp, prefs.sound]);

  /**
   * نتائج آخر 7 أيام بدقة: نعيد بناء سؤال كل يوم تاريخيًا
   * ونقارن الخيار المحفوظ بالإجابة الصحيحة.
   */
  const weekResults = useMemo(() => {
    const results: Record<string, boolean> = {};
    const today = new Date();
    for (const key of Object.keys(progress.history)) {
      const age = daysBetween(key, dayKey(today));
      if (age < 0 || age > 90) continue;
      const q = QUESTIONS[fnv1a(key) % QUESTIONS.length];
      if (!q) continue;
      // الخيار المحفوظ كان بترتيب معروض بنفس بذرة اليوم
      const lq = localizeQuestion(q, lang, fnv1a(key) ^ 0x9e3779b9);
      const sel = progress.history[key];
      if (typeof sel === "number") results[key] = sel === lq.answer;
    }
    return results;
  }, [progress.history, lang]);

  const milestone = useMemo(() => {
    const hit = STREAK_MILESTONES.find((m) => m === progress.streak);
    return hit ? (`m${hit}` as const) : null;
  }, [progress.streak]);

  const toggleLang = () => prefsStore.setLang(lang === "ar" ? "en" : "ar");

  const handleReset = () => {
    progressStore.reset();
    setSettingsOpen(false);
    location.reload();
  };

  const lvl = levelFor(progress.xp);

  // اسم اللاعب المعروض: الحساب أولًا ثم المحلي
  const playerName = useMemo(() => {
    const meta = (session?.user.user_metadata ?? {}) as Record<string, unknown>;
    const cloud =
      (meta.display_name as string | undefined) ??
      (meta.full_name as string | undefined) ??
      (meta.name as string | undefined);
    return cloud?.trim() || prefs.playerName.trim() || "Player";
  }, [session, prefs.playerName]);

  // ——— تدفق الدخول ———
  // 1) شاشة الترحيب: تظهر لمن لم يدخل ولم يختر الضيف
  const showWelcome = supabaseConfigured && !session && !prefs.guest;
  if (showWelcome) {
    return <WelcomeScreen lang={lang} onDone={() => undefined} />;
  }
  // 2) خطوة اسم اللاعب: بعد أول دخول بحساب بلا اسم
  const needsName = Boolean(session && !displayNameOf(session.user) && !namePromptDone);
  if (needsName && session) {
    return <NamePrompt session={session} lang={lang} onDone={() => setNamePromptDone(true)} />;
  }

  return (
    <div className="pitch-lines flex min-h-dvh flex-col">
      <AppHeader
        lang={lang}
        isDark={isDark}
        playerName={playerName}
        onToggleLang={toggleLang}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenProfile={() => setTab("profile")}
      />

      {/* السلسلة + شارة المزامنة */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 px-3">
        <StreakOrb streak={progress.streak} best={progress.best} lang={lang} />
        {supabaseConfigured && (
          <Badge tone={session ? "grass" : "neutral"} className="hidden sm:inline-flex">
            {session ? t(lang, "cloudSynced") : t(lang, "localOnly")}
          </Badge>
        )}
      </div>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-4 px-3 py-5 sm:gap-5 sm:px-8 sm:py-7">
        {tab === "penalty" ? (
          <PenaltyArena session={session} lang={lang} onRequireAuth={() => setPenaltyAuthPrompt(true)} />
        ) : tab === "season" ? (
          <SeasonScreen lang={lang} xp={progress.xp} />
        ) : tab === "profile" ? (
          <ProfileTab
            session={session}
            lang={lang}
            onOpenLegacyProfile={() => setProfileOpen(true)}
            onGoToday={() => setTab("today")}
          />
        ) : training ? (
          <TrainingMode
            lang={lang}
            soundOn={prefs.sound}
            hapticsOn={prefs.haptics}
            onExit={() => setTraining(false)}
          />
        ) : (
          <>
            <QuestionCard
              question={daily.question}
              selected={selected}
              onSelect={handleSelect}
              lang={lang}
            />

            <DailyQuests lang={lang} />

            {progress.streakShields > 0 && (
              <div className="flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 px-4 py-2.5">
                <ShieldMark className="size-5" />
                <p className="text-xs font-black text-cyan-700 dark:text-cyan-300">{t(lang, "shieldActive")}</p>
              </div>
            )}

            {selected !== null && (
              <ResultPanel
                question={daily.question}
                selected={selected}
                phrase={phrase || t(lang, "savedAnswer")}
                milestone={milestone}
                xpGained={xpGained}
                leveledUp={leveledUp}
                levelName={lvl.name}
                lang={lang}
              />
            )}

            <LevelBar progress={progress} lang={lang} />

            <StatsGrid played={progress.playedCount} correct={progress.correctCount} lang={lang} />

            <RushMode lang={lang} />

            <GrassGrid history={progress.history} results={weekResults} lang={lang} />

            <AchievementsPanel progress={progress} lang={lang} />

            <Button variant="ghost" onClick={() => setTraining(true)} className="w-full">
              <GraduationCap className="size-4" />
              {t(lang, "train")} — {t(lang, "trainDesc")}
            </Button>

            {supabaseConfigured && <AuthPanel session={session} lang={lang} />}

            {selected !== null && (
              <p className="text-center text-sm font-bold opacity-50">{t(lang, "backTomorrow")}</p>
            )}
          </>
        )}
      </main>

      <footer className="pb-4 text-center" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}>
        <p className="text-xs font-bold opacity-50">
          {APP.name} v{APP.version} — {t(lang, "madeBy")}
        </p>
      </footer>

      {/* شريط التنقل السفلي */}
      <div className="h-20" /> {/* مساحة للتبويبات الثابتة */}
      <TabBar active={tab} onChange={setTab} lang={lang} />

      {unlockToast && <UnlockToast achievementId={unlockToast} lang={lang} />}

      <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} onReset={handleReset} />

      <AnimatePresence>
        {profileOpen && <ProfileScreen session={session} onClose={() => setProfileOpen(false)} />}
      </AnimatePresence>

      <LevelUpBurst
        open={levelBurst !== null}
        level={levelBurst?.level ?? 1}
        levelName={levelBurst?.name ?? ""}
        onClose={() => setLevelBurst(null)}
      />

      {/* تنبيه تسجيل الدخول من الترجيح */}
      {penaltyAuthPrompt && !session && (
        <AuthPanel session={null} lang={lang} />)
      }
    </div>
  );
}

/** تبويب الملف — يلفّ ProfileScreen المحتوى في الصفحة الرئيسية */
function ProfileTab({
  session,
  lang,
  onOpenLegacyProfile,
  onGoToday,
}: {
  session: Session | null;
  lang: Lang;
  onOpenLegacyProfile: () => void;
  onGoToday: () => void;
}) {
  return (
    <div className="space-y-4">
      {!session && (
        <div className="rounded-3xl border border-gold/25 bg-gradient-to-b from-gold/10 to-transparent p-5 text-center">
          <p className="text-sm font-bold text-white/70">{t(lang, "noCloud")}</p>
          <p className="mt-1 text-xs font-medium text-white/45">{t(lang, "guestNote")}</p>
          <Button variant="gold" onClick={onGoToday} className="mt-3">
            {t(lang, "tabToday")}
          </Button>
        </div>
      )}
      <ProfileScreen session={session} onClose={onOpenLegacyProfile} embedded />
    </div>
  );
}
