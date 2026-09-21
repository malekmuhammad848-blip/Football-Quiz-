/** ============================================================
 *  SeasonScreen — الموسم التقييمي
 *  4 حزم تُفتح بـ XP، أنيميشن كشف ملصق-بل-ملصق، ألبوم يُكمل باللعب.
 *  ============================================================ */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, PackageOpen, Sparkles } from "lucide-react";
import {
  PACKS,
  collectionScore,
  loadSeason,
  openPack,
  ownedCount,
  saveSeason,
  seedStarterPack,
  type PackDef,
  type SeasonState,
  type Sticker,
} from "../domain/season";
import { progressStore } from "../stores/progressStore";
import { prefsStore } from "../stores/prefsStore";
import { stadium } from "../lib/stadium";
import { sfx } from "../lib/feedback";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { ProgressBar } from "./ui/primitives";
import { StickerAlbum, StickerCard } from "./StickerCard";

interface Props {
  lang: Lang;
  xp: number;
}

type Reveal = { sticker: Sticker; isNew: boolean } | null;

export function SeasonScreen({ lang, xp }: Props) {
  const [season, setSeason] = useState<SeasonState>(() => seedStarterPack(loadSeason()));
  const [opening, setOpening] = useState<PackDef | null>(null);
  const [revealQueue, setRevealQueue] = useState<Reveal[]>([]);
  const [currentReveal, setCurrentReveal] = useState<Reveal>(null);

  const total = 24;
  const got = ownedCount(season);
  const score = collectionScore(season);

  const persist = (next: SeasonState) => {
    setSeason(next);
    saveSeason(next);
  };

  const doOpen = (pack: PackDef) => {
    const cost = pack.costXp;
    const p = progressStore.getState();
    if (p.xp < cost) return;
    // خصم XP مباشر عبر replace (addXp لا يقبل سالبًا)
    progressStore.replace({ ...p, xp: p.xp - cost });

    const pulled = openPack(pack.id);
    const queue: Reveal[] = pulled.map((st) => ({
      sticker: st,
      isNew: (season.owned[st.id] ?? 0) === 0,
    }));
    const owned = { ...season.owned };
    for (const st of pulled) owned[st.id] = (owned[st.id] ?? 0) + 1;
    persist({ ...season, owned });

    setOpening(pack);
    setRevealQueue(queue);
    setCurrentReveal(null);
    if (prefsStore.getState().sound) stadium.drums();
  };

  const revealNext = () => {
    if (revealQueue.length === 0) {
      setCurrentReveal(null);
      setOpening(null);
      return;
    }
    const [head, ...rest] = revealQueue;
    setCurrentReveal(head);
    setRevealQueue(rest);
    if (prefsStore.getState().sound) {
      if (head?.isNew) sfx.unlock();
      stadium.goal();
    }
  };

  const packsProgress = useMemo(
    () =>
      PACKS.map((p) => ({
        ...p,
        affordable: xp >= p.costXp,
      })),
    [xp],
  );

  return (
    <div className="space-y-4">
      {/* ترويسة الموسم */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-5 text-center">
        <div className="pointer-events-none absolute -top-16 -start-12 size-40 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(168,85,247,0.14), transparent)" }} />
        <div className="pointer-events-none absolute -bottom-16 -end-12 size-40 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(251,191,36,0.18), transparent)" }} />
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-400">SEASON 1</p>
        <h2 className="mt-1 text-2xl font-black">{t(lang, "seasonTitle")}</h2>
        <p className="mx-auto mt-1.5 max-w-xs text-xs font-bold opacity-50">{t(lang, "seasonDesc")}</p>

        <div className="mx-auto mt-4 max-w-sm">
          <div className="mb-1.5 flex items-center justify-between text-xs font-black">
            <span>
              {got} / {total} {t(lang, "seasonCollected")}
            </span>
            <span className="text-gold">{score} pts</span>
          </div>
          <ProgressBar value={got / total} />
        </div>
      </section>

      {/* الحزم */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-black">{t(lang, "packsTitle")}</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {packsProgress.map((p) => (
            <motion.button
              key={p.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => p.affordable && doOpen(p)}
              disabled={!p.affordable || opening !== null}
              className={cn(
                "relative flex flex-col items-center gap-1.5 rounded-3xl border p-4 text-center transition-all",
                p.affordable
                  ? "border-gold/40 bg-gradient-to-b from-gold/15 to-transparent shadow-lg hover:border-gold"
                  : "border-line bg-ink/5 opacity-55 dark:bg-white/5",
              )}
            >
              <motion.span
                animate={p.affordable && opening === null ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 1.6, repeat: 2 }}
                className="text-4xl"
              >
                {p.emoji}
              </motion.span>
              <p className="text-xs font-black">{lang === "ar" ? p.ar : p.en}</p>
              <span
                className={cn(
                  "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black",
                  p.affordable ? "bg-gold/25 text-amber-700 dark:text-amber-200" : "bg-ink/10 text-faint dark:bg-white/10",
                )}
              >
                {p.affordable ? <PackageOpen className="size-3" /> : <Lock className="size-3" />}
                {p.costXp} XP · {p.pulls}×
              </span>
            </motion.button>
          ))}
        </div>
        <p className="text-center text-[10px] font-bold opacity-40">{t(lang, "packsHint")}</p>
      </section>

      {/* الألبوم */}
      <section className="glass-card rounded-3xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-black">{t(lang, "albumTitle")}</h3>
          <span className="flex items-center gap-1 text-[10px] font-black text-purple-500">
            <Sparkles className="size-3.5" />
            {t(lang, "albumComplete")} {Math.round((got / total) * 100)}%
          </span>
        </div>
        <StickerAlbum owned={season.owned} lang={lang} />
      </section>

      {/* ——— أنيميشن فتح الحزمة ——— */}
      <AnimatePresence>
        {opening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80"
            onClick={revealNext}
          >
            {/* الحزمة قبل الكشف */}
            {!currentReveal && (
              <motion.div
                initial={{ scale: 0.6, rotate: -8 }}
                animate={{ scale: [0.6, 1.05, 1], rotate: [0, -3, 0] }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1, repeat: 3 }}
                  className="text-8xl"
                >
                  {opening.emoji}
                </motion.div>
                <p className="mt-4 animate-pulse text-sm font-black text-white/80">
                  {t(lang, "packTapToOpen")}
                </p>
              </motion.div>
            )}

            {/* كشف الملصق */}
            <AnimatePresence>
              {currentReveal && (
                <motion.div
                  key={currentReveal.sticker.id}
                  initial={{ scale: 0.3, rotateY: 90, opacity: 0 }}
                  animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 17 }}
                  className="flex flex-col items-center gap-3"
                >
                  {currentReveal.isNew && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="rounded-full bg-grass-500 px-4 py-1 text-xs font-black text-white shadow-lg"
                    >
                      NEW!
                    </motion.span>
                  )}
                  <div className="w-56">
                    <StickerCard sticker={currentReveal.sticker} copies={1} size="lg" />
                  </div>
                  <p className="text-lg font-black text-white">{lang === "ar" ? currentReveal.sticker.ar : currentReveal.sticker.en}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    {currentReveal.sticker.rarity}
                  </p>
                  <p className="mt-2 text-xs font-bold text-white/40">{t(lang, "packTapContinue")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
