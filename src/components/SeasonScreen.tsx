/** ============================================================
 *  SeasonScreen — الموسم التقييمي
 *  الحزم تُشترى بالعملات 🪙 (لا تلمس XP)، والملصقات المكررة
 *  تُباع لعملات إضافية. أنيميشن كشف ملصق-بل-ملصق، ألبوم يُكمل باللعب.
 *  ============================================================ */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coins as CoinsIcon, Lock, PackageOpen, Sparkles, TrendingUp } from "lucide-react";
import {
  PACKS,
  TOTAL_STICKERS,
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
import { PACK_PRICES, COINS, sellValue, formatCoins } from "../domain/coinEconomy";
import { STICKERS as STICKERS_LIST } from "../domain/season";
import { progressStore } from "../stores/progressStore";
import { prefsStore } from "../stores/prefsStore";
import { useStore } from "../core/store";
import { stadium } from "../lib/stadium";
import { sfx } from "../lib/feedback";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { ProgressBar } from "./ui/primitives";
import { StickerAlbum, StickerCard } from "./StickerCard";

interface Props {
  lang: Lang;
}

type Reveal = { sticker: Sticker; isNew: boolean; seq?: number } | null;

export function SeasonScreen({ lang }: Props) {
  const [season, setSeason] = useState<SeasonState>(() => seedStarterPack(loadSeason()));
  // رصيد تفاعلي — كان يُقرأ مرة واحدة عبر getState فلا تُحدَّث الواجهة عند كسب/صرف العملات
  const coins = useStore(progressStore, (s) => s.coins);
  const [opening, setOpening] = useState<PackDef | null>(null);
  const [revealQueue, setRevealQueue] = useState<Reveal[]>([]);
  const [currentReveal, setCurrentReveal] = useState<Reveal>(null);
  /** رقم تتابعي للكشف — مفتاح أنيميشن فريد حتى مع ملصقات مكررة في نفس الحزمة */
  const revealSeqRef = useRef(0);
  const [soldToast, setSoldToast] = useState<string | null>(null);
  const soldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** قفل إجراء الشراء — يمنع الخصم المزدوج على النقر السريع/المزدوج قبل تحديث الواجهة */
  const purchaseLockRef = useRef(false);
  const [needCoinsToast, setNeedCoinsToast] = useState<string | null>(null);
  const needCoinsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // تنظيف مؤقت رسالة البيع/نقص العملات عند الخروج من الشاشة (كان يُحدّث مكوّنًا مُلغى تركيبه)
  useEffect(() => {
    return () => {
      if (soldTimer.current) clearTimeout(soldTimer.current);
      if (needCoinsTimer.current) clearTimeout(needCoinsTimer.current);
    };
  }, []);

  // بذر الحزمة الافتتاحية مرة واحدة + حفظ فوري (كان يُعاد بذرها في كل إقلاع — خطأ)
  useEffect(() => {
    const s = seedStarterPack(loadSeason());
    saveSeason(s);
    setSeason(s);
  }, []);

  const total = TOTAL_STICKERS;
  const got = ownedCount(season);
  const score = collectionScore(season);

  const doOpen = (pack: PackDef) => {
    // حماية الشراء المزدوج: لا فتح أثناء كشف ملصق، ولا نقرات متزامنة على نفس الحزمة
    if (purchaseLockRef.current || opening || currentReveal || revealQueue.length > 0) return;
    purchaseLockRef.current = true;

    const cost = PACK_PRICES[pack.id] ?? pack.costXp;
    // الشراء بالعملات — لا يلمس XP إطلاقًا؛ رسالة واضحة عند نقص الرصيد بدل الفشل الصامت
    if (!progressStore.spendCoins(cost)) {
      purchaseLockRef.current = false;
      setNeedCoinsToast(
        lang === "ar"
          ? `تحتاج ${cost - coins} 🪙 إضافية — اجمعها من المهام والألعاب`
          : `You need ${cost - coins} more 🪙 — earn them from quests and games`,
      );
      if (needCoinsTimer.current) clearTimeout(needCoinsTimer.current);
      needCoinsTimer.current = setTimeout(() => setNeedCoinsToast(null), 2600);
      return;
    }

    const pulled = openPack(pack.id);

    // نحسب من أحدث حالة محفوظة (وليس نسخة الرندر) — يمنع فقدان الملصقات
    const current = loadSeason();
    const queue: Reveal[] = pulled.map((st) => ({
      sticker: st,
      isNew: (current.owned[st.id] ?? 0) === 0,
      seq: revealSeqRef.current++,
    }));
    const owned = { ...current.owned };
    let newCount = 0;
    for (const st of pulled) {
      if ((owned[st.id] ?? 0) === 0) newCount++;
      owned[st.id] = (owned[st.id] ?? 0) + 1;
    }
    const next = { ...current, owned };
    saveSeason(next);
    setSeason(next);
    setRevealQueue(queue);
    // مكافأة صغيرة لكل ملصق جديد يُكتشف (خارج setState — آمن مع StrictMode)
    if (newCount > 0) progressStore.addCoins(COINS.newSticker * newCount);

    setOpening(pack);
    setCurrentReveal(null);
    if (prefsStore.getState().sound) stadium.drums();
    // فُتحت الحزمة — نرفع القفل (تُكمل الحماية عبر opening/revealQueue)
    purchaseLockRef.current = false;
  };

  /** بيع كل النسخ الزائدة دفعة واحدة */
  const sellAllDupes = () => {
    // نقرأ الحالة المحفوظة مباشرة — بلا side effects داخل setState (آمن مع StrictMode)
    const current = loadSeason();
    const owned = { ...current.owned };
    let earned = 0;
    for (const st of STICKERS_LIST) {
      const n = owned[st.id] ?? 0;
      if (n > 1) {
        earned += sellValue(st.rarity) * (n - 1);
        owned[st.id] = 1;
      }
    }
    if (earned <= 0) return;
    const next = { ...current, owned };
    saveSeason(next);
    setSeason(next);
    progressStore.addCoins(earned);
    setSoldToast(lang === "ar" ? `تم البيع! +${earned} 🪙` : `Sold! +${earned} 🪙`);
    if (soldTimer.current) clearTimeout(soldTimer.current);
    soldTimer.current = setTimeout(() => setSoldToast(null), 2600);
    if (prefsStore.getState().sound) sfx.unlock();
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

  /** خريطة الحزمة → نوع الملصق (مطابقة لمحرك الفتح) */
  const packsProgress = useMemo(
    () =>
      PACKS.map((p) => {
        const price = PACK_PRICES[p.id] ?? p.costXp;
        const kindOf: Record<string, Sticker["kind"]> = { legends: "legend", stars: "star", clubs: "club", nations: "nation" };
        const kindPool = STICKERS_LIST.filter((s) => s.kind === kindOf[p.id]);
        const ownedInPool = kindPool.filter((s) => (season.owned[s.id] ?? 0) > 0).length;
        return {
          ...p,
          price,
          affordable: coins >= price,
          ownedInPool,
          poolSize: kindPool.length,
        };
      }),
    [coins, season.owned],
  );

  return (
    <div className="space-y-4">
      {/* ترويسة الموسم + رصيد العملات */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-5 text-center">
        <div className="pointer-events-none absolute -top-16 -start-12 size-40 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(168,85,247,0.14), transparent)" }} />
        <div className="pointer-events-none absolute -bottom-16 -end-12 size-40 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(251,191,36,0.18), transparent)" }} />

        {/* رصيد العملات */}
        <div className="relative mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 shadow-sm">
          <CoinsIcon className="size-4.5 text-amber-500" />
          <span className="text-lg font-black tabular-nums text-amber-600 dark:text-amber-300">
            {formatCoins(coins)}
          </span>
          <span className="text-[10px] font-bold opacity-60">{lang === "ar" ? "عملة" : "coins"}</span>
        </div>

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
        {needCoinsToast && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-red-500/10 px-3 py-2 text-center text-xs font-black text-red-500"
          >
            {needCoinsToast}
          </motion.p>
        )}
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
                🪙 {p.price} · {p.pulls}×
              </span>
              {/* تقدم جمع نوع الحزمة */}
              <span className="text-[9px] font-bold tabular-nums opacity-50">
                {p.ownedInPool}/{p.poolSize} {lang === "ar" ? "مُجمَّع" : "collected"}
              </span>
              {luckLabel(p.luck, lang) && (
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[9px] font-black text-purple-500 dark:text-purple-300">
                  {luckLabel(p.luck, lang)}
                </span>
              )}
            </motion.button>
          ))}
        </div>
        <p className="text-center text-[10px] font-bold opacity-40">{t(lang, "packsHint")}</p>
      </section>

      {/* بيع المكررات */}
      <DupesPanel season={season} lang={lang} onSellAll={sellAllDupes} soldToast={soldToast} />

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
                  key={currentReveal.seq ?? currentReveal.sticker.id}
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
                      {lang === "ar" ? "جديد!" : "NEW!"} +{COINS.newSticker} 🪙
                    </motion.span>
                  )}
                  <div className="w-64">
                    <StickerCard sticker={currentReveal.sticker} copies={1} lang={lang} />
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

/* ============================================================
 *  وصف حظ الندرة لكل حزمة (يعكس مضاعف luck في محرك الفتح)
 *  ============================================================ */
function luckLabel(luck: number, lang: Lang): string | null {
  if (luck >= 2.5) return lang === "ar" ? "حظ أسطوري ×2.5" : "Legendary luck ×2.5";
  if (luck >= 1.6) return lang === "ar" ? "حظ مرتفع ×1.6" : "Boosted luck ×1.6";
  return null;
}

/* ============================================================
 *  لوحة المكررات — عدد النسخ الزائدة وقيمتها بالعملات
 *  ============================================================ */

function DupesPanel({
  season,
  lang,
  onSellAll,
  soldToast,
}: {
  season: SeasonState;
  lang: Lang;
  onSellAll: () => void;
  soldToast: string | null;
}) {
  const dupes = useMemo(() => {
    const items: { sticker: Sticker; extra: number; value: number }[] = [];
    let totalValue = 0;
    for (const st of STICKERS_LIST) {
      const n = season.owned[st.id] ?? 0;
      if (n > 1) {
        const value = sellValue(st.rarity) * (n - 1);
        items.push({ sticker: st, extra: n - 1, value });
        totalValue += value;
      }
    }
    return { items, totalValue };
  }, [season.owned]);

  if (dupes.items.length === 0) return null;

  return (
    <section className="glass-card rounded-3xl p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gold/15 text-amber-600 dark:text-amber-300">
            <TrendingUp className="size-4.5" />
          </span>
          <div className="leading-tight">
            <h3 className="text-sm font-black">{lang === "ar" ? "الملصقات المكررة" : "Duplicate stickers"}</h3>
            <p className="text-[10px] font-bold opacity-50">
              {lang === "ar"
                ? `${dupes.items.length} نوعاً · قيمتها ${formatCoins(dupes.totalValue)} 🪙`
                : `${dupes.items.length} types · worth ${formatCoins(dupes.totalValue)} 🪙`}
            </p>
          </div>
        </div>
        <button
          onClick={onSellAll}
          className="shrink-0 rounded-xl bg-gradient-to-l from-amber-500 to-gold px-3.5 py-2 text-xs font-black text-amber-950 shadow-md transition-all hover:brightness-105 active:scale-95"
        >
          {lang === "ar" ? `بيع الكل +${formatCoins(dupes.totalValue)} 🪙` : `Sell all +${formatCoins(dupes.totalValue)} 🪙`}
        </button>
      </div>

      {/* عيّنة من المكررات (أول 8) */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {dupes.items.slice(0, 8).map(({ sticker, extra }) => (
          <span
            key={sticker.id}
            className="flex items-center gap-1 rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-black dark:bg-white/10"
          >
            {lang === "ar" ? sticker.ar : sticker.en}
            <span className="text-gold">×{extra}</span>
          </span>
        ))}
        {dupes.items.length > 8 && (
          <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-black opacity-60 dark:bg-white/10">
            +{dupes.items.length - 8}
          </span>
        )}
      </div>

      {soldToast && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-xs font-black text-grass-600 dark:text-grass-400"
        >
          {soldToast}
        </motion.p>
      )}
    </section>
  );
}

