/** ============================================================
 *  ProfileScreen — ملف اللاعب بأسلوب FIFA/Duolingo
 *  أفاتار بإطار الدوري + شارات مقفولة بتلميحات + إحصائيات + حالة الدوري.
 *  ============================================================ */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Pencil, Trophy, X } from "lucide-react";
import { levelFor } from "../domain/progression";
import { leagueFor, nextLeague, leagueProgress, leagueName, LEAGUES } from "../domain/leagues";
import { BADGES } from "../domain/badges";
import { ACHIEVEMENT_ICONS } from "./Icons";
import { useProgress, usePrefs } from "../hooks/useAppStores";
import { prefsStore } from "../stores/prefsStore";
import { authService, authServiceExtra, type Session } from "../lib/backend";
import { t } from "../lib/i18n";
import { supabaseConfigured } from "../lib/supabase";
import { cn } from "../utils/cn";
import { Button, ProgressBar } from "./ui/primitives";
import { Avatar } from "./Avatar";
import { LeaderboardSheet } from "./LeaderboardSheet";

interface Props {
  session: Session | null;
  onClose: () => void;
}

export function ProfileScreen({ session, onClose }: Props) {
  const progress = useProgress();
  const prefs = usePrefs();
  const lang = prefs.lang;

  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [boardOpen, setBoardOpen] = useState(false);

  const lvl = levelFor(progress.xp);
  const league = leagueFor(progress.xp);
  const next = nextLeague(progress.xp);
  const accuracy = Math.round((progress.correctCount / Math.max(progress.playedCount, 1)) * 100);

  const displayName = useMemo(() => {
    const meta = (session?.user.user_metadata ?? {}) as Record<string, unknown>;
    const cloud =
      (meta.display_name as string | undefined) ??
      (meta.full_name as string | undefined) ??
      (meta.name as string | undefined);
    return cloud?.trim() || prefs.playerName.trim() || session?.user.email?.split("@")[0] || "Player";
  }, [session, prefs.playerName]);

  const rankName = useMemo(() => `${leagueName(league, lang)} · ${lvl.name}`, [league, lang, lvl.name]);

  const startEdit = () => {
    setDraftName(displayName);
    setEditing(true);
  };

  const saveName = () => {
    const clean = draftName.trim();
    if (clean.length < 2) return;
    prefsStore.setPlayerName(clean);
    if (session) void authServiceExtra.updateDisplayName(clean);
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#070d09] text-white"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
    >
      {/* شريط علوي */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between bg-[#070d09]/90 px-4 backdrop-blur-sm"
        style={{ paddingTop: "max(env(safe-area-inset-top), 12px)", paddingBottom: 12 }}
      >
        <h2 className="text-lg font-black">{t(lang, "profile")}</h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-md space-y-5 px-4 pt-2">
        {/* ——— الترويسة الشخصية ——— */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 text-center">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-[80px]"
            style={{ background: league.glow }}
          />

          <div className="relative mx-auto w-fit">
            <Avatar name={displayName} size="xl" ring />
          </div>

          {editing ? (
            <div className="mx-auto mt-4 flex max-w-xs items-center gap-2">
              <input
                autoFocus
                value={draftName}
                maxLength={24}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                className="h-10 w-full rounded-xl border border-white/15 bg-black/40 px-3 text-center text-sm font-bold outline-none focus:border-grass-400"
              />
              <button onClick={saveName} aria-label="Save" className="rounded-xl bg-grass-500 p-2.5 transition-colors hover:bg-grass-400">
                <Check className="size-4 text-white" />
              </button>
              <button onClick={() => setEditing(false)} aria-label="Cancel" className="rounded-xl bg-white/10 p-2.5 transition-colors hover:bg-white/20">
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <>
              <h3 className="mt-4 truncate text-2xl font-black">{displayName}</h3>
              <p className={cn("mt-0.5 text-sm font-black", league.accent)}>{rankName}</p>
              <button
                onClick={startEdit}
                className="mx-auto mt-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-white/80 transition-colors hover:bg-white/10"
              >
                <Pencil className="size-3.5" />
                {t(lang, "editProfile")}
              </button>
            </>
          )}

          {/* تقدم الدوري */}
          {next && (
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold">
                <span className={league.accent}>{leagueName(league, lang)}</span>
                <span className="text-white/50">
                  {t(lang, "leagueNext")}: {leagueName(next, lang)}
                </span>
              </div>
              <ProgressBar value={leagueProgress(progress.xp)} className="bg-white/10" />
            </div>
          )}
        </section>

        {/* ——— الإحصائيات ——— */}
        <section className="grid grid-cols-2 gap-3">
          {[
            { label: t(lang, "totalXp"), value: `${progress.xp}`, tone: "text-gold" },
            {
              label: t(lang, "currentStreak"),
              value: `${progress.streak}`,
              suffix: t(lang, "days"),
              flame: true,
              tone: "text-orange-400",
            },
            { label: t(lang, "accuracyRate"), value: `${accuracy}%`, tone: "text-grass-400" },
            { label: t(lang, "trophies"), value: `${progress.unlocked.length}`, tone: "text-cyan-300" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center"
            >
              <p className={cn("text-2xl font-black tabular-nums", s.tone)}>
                {s.value}
                {s.flame && " 🔥"}
              </p>
              <p className="mt-0.5 text-[11px] font-bold text-white/55">
                {s.suffix ? `${s.suffix} ${s.label}` : s.label}
              </p>
            </motion.div>
          ))}
        </section>

        {/* ——— الشارات ——— */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
          <h4 className="mb-3 text-sm font-black text-white/85">{t(lang, "achievements")}</h4>
          <div className="grid grid-cols-5 gap-2.5">
            {BADGES.map((b, i) => {
              const unlocked = progress.unlocked.includes(b.id);
              const Icon = ACHIEVEMENT_ICONS[b.icon];
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.04 * i }}
                  title={unlocked ? b.hint[lang] : `🔒 ${b.hint[lang]}`}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-2xl border transition-all",
                    unlocked
                      ? "border-gold/40 bg-gradient-to-b from-gold/20 to-transparent shadow-[0_0_16px_rgba(251,191,36,0.15)]"
                      : "border-white/10 bg-white/[0.03]",
                  )}
                >
                  <Icon className={cn("size-6", unlocked ? "" : "opacity-30 grayscale")} />
                  {!unlocked && (
                    <span className="absolute -bottom-1 -end-1 flex size-5 items-center justify-center rounded-full bg-[#1a241d] shadow">
                      <Lock className="size-3 text-white/60" />
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
          {/* تلميح أول شارة مقفلة */}
          {(() => {
            const locked = BADGES.find((b) => !progress.unlocked.includes(b.id));
            if (!locked) return null;
            return (
              <p className="mt-3 text-center text-[11px] font-medium text-white/45">
                🔒 {locked.hint[lang]}
              </p>
            );
          })()}
        </section>

        {/* ——— حالة الدوري ——— */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-l from-white/[0.07] to-white/[0.02]">
          <div className={cn("h-1.5 bg-gradient-to-l", league.ring)} />
          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-white/45">
                  {t(lang, "currentLeague")}
                </p>
                <p className={cn("mt-0.5 truncate text-lg font-black", league.accent)}>
                  {leagueName(league, lang)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {LEAGUES.map((l) => (
                  <span
                    key={l.id}
                    title={leagueName(l, lang)}
                    className={cn(
                      "size-2.5 rounded-full transition-all",
                      l.id === league.id ? cn("scale-125 bg-gradient-to-r", l.ring) : "bg-white/15",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl bg-black/30 px-3.5 py-2.5">
              <p className="text-xs font-bold text-white/70">
                🟢 <span className={league.accent}>{t(lang, "promotionZone")}</span>
              </p>
              <button
                onClick={() => (supabaseConfigured ? setBoardOpen(true) : undefined)}
                disabled={!supabaseConfigured}
                className="flex shrink-0 items-center gap-1 text-xs font-black text-grass-400 transition-colors hover:text-grass-300 disabled:opacity-40"
              >
                <Trophy className="size-3.5" />
                {t(lang, "viewBoard")}
              </button>
            </div>
            {!supabaseConfigured && (
              <p className="mt-2 text-center text-[10px] font-medium text-white/35">{t(lang, "noCloud")}</p>
            )}
          </div>
        </section>

        {/* تسجيل الخروج للمسجلين */}
        {session && (
          <Button
            variant="ghost"
            className="w-full border-white/15 text-white/70 hover:bg-white/5"
            onClick={() => void authService.signOut()}
          >
            {t(lang, "logout")}
          </Button>
        )}
      </div>

      <LeaderboardSheet open={boardOpen} onClose={() => setBoardOpen(false)} session={session} lang={lang} />
    </motion.div>
  );
}
