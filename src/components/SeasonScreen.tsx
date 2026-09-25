/** ============================================================
 *  SeasonScreen — الموسم التقييمي
 *  فتح الحزم سينمائي تلقائي: ترقّب مع اهتزاز وشرارات ← انفجار
 *  ضوئي ← كل البطاقات تُقلب بتتابع سريع (CSS على GPU) ← ملخص.
 *  لا نقر على كل بطاقة — لمسة واحدة تكشف الحزمة كاملة.
 *  ============================================================ */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coins as CoinsIcon, Lock, Sparkles, TrendingUp, X } from "lucide-react";
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
import { stadium, chordBright } from "../lib/stadium";
import { sfx } from "../lib/feedback";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { ProgressBar } from "./ui/primitives";
import { StickerAlbum, StickerCard } from "./StickerCard";
import { CoinMark, PackArt } from "./Icons";
import type { Rarity } from "../domain/season";

interface Props {
  lang: Lang;
}

/** مراحل الفتح السينمائي */
type OpenPhase = "idle" | "charging" | "burst" | "reveal" | "summary";

const RARITY_ORDER: Record<Rarity, number> = { common: 0, rare: 1, epic: 2, legendary: 3 };

const RARITY_NAME: Record<Rarity, { ar: string; en: string }> = {
  common: { ar: "عادي", en: "Common" },
  rare: { ar: "نادر", en: "Rare" },
  epic: { ar: "ملحمي", en: "Epic" },
  legendary: { ar: "أسطوري", en: "Legendary" },
};

/** تأخير ظهور كل بطاقة — الأغلى يظهر أولاً */
function cardDelay(i: number, total: number, bestIndex: number): number {
  // البطاقة الأعلى ندرة تُكشف أولاً (لحظة الذروة)، ثم الباقي بتتابع 140ms
  if (i === bestIndex) return 0.12;
  const order = i < bestIndex ? i : i - 1;
  return 0.34 + order * 0.14 + (total > 4 ? 0 : 0.05);
}

export function SeasonScreen({ lang }: Props) {
  const [season, setSeason] = useState<SeasonState>(() => seedStarterPack(loadSeason()));
  // رصيد تفاعلي — كان يُقرأ مرة واحدة عبر getState فلا تُحدَّث الواجهة عند كسب/صرف العملات
  const coins = useStore(progressStore, (s) => s.coins);
  const [opening, setOpening] = useState<PackDef | null>(null);
  const [phase, setPhase] = useState<OpenPhase>("idle");
  /** بطاقات الحزمة الجارية — مرتبة بحيث الأغلى أولاً */
  const [pulls, setPulls] = useState<Sticker[]>([]);
  const [pulledBefore, setPulledBefore] = useState<Set<string>>(new Set());
  const [soldToast, setSoldToast] = useState<string | null>(null);
  const soldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** قفل إجراء الشراء — يمنع الخصم المزدوج على النقر السريع/المزدوج قبل تحديث الواجهة */
  const purchaseLockRef = useRef(false);
  const [needCoinsToast, setNeedCoinsToast] = useState<string | null>(null);
  const needCoinsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** مؤقتات الفتح — تُنظف عند الخروج من الشاشة */
  const phaseTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // تنظيف المؤقتات عند الخروج (كان يُحدّث مكوّنًا مُلغى تركيبه)
  useEffect(() => {
    return () => {
      if (soldTimer.current) clearTimeout(soldTimer.current);
      if (needCoinsTimer.current) clearTimeout(needCoinsTimer.current);
      for (const t of phaseTimers.current) clearTimeout(t);
      phaseTimers.current = [];
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

  /** إضافة مؤقت مع تنظيف ذاتي */
  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    phaseTimers.current.push(id);
  };

  /** أفضل بطاقة (الأغلى ندرة) — تُكشف أولاً وتتوهج */
  const bestIndex = useMemo(() => {
    let bi = 0;
    let best = -1;
    pulls.forEach((p, i) => {
      const r = RARITY_ORDER[p.rarity];
      if (r > best) {
        best = r;
        bi = i;
      }
    });
    return bi;
  }, [pulls]);

  const hasLegendary = pulls.some((p) => p.rarity === "legendary");
  const hasEpic = pulls.some((p) => p.rarity === "epic");

  const doOpen = (pack: PackDef) => {
    if (purchaseLockRef.current || opening) return;
    purchaseLockRef.current = true;

    const cost = PACK_PRICES[pack.id] ?? pack.costXp;
    if (!progressStore.spendCoins(cost)) {
      purchaseLockRef.current = false;
      setNeedCoinsToast(
        lang === "ar"
          ? `تحتاج ${cost - coins} عملة إضافية — اجمعها من المهام والألعاب`
          : `You need ${cost - coins} more coins — earn them from quests and games`,
      );
      if (needCoinsTimer.current) clearTimeout(needCoinsTimer.current);
      needCoinsTimer.current = setTimeout(() => setNeedCoinsToast(null), 2600);
      return;
    }

    // نحسب من أحدث حالة محفوظة (وليس نسخة الرندر) — يمنع فقدان الملصقات
    const current = loadSeason();
    const pulled = openPack(pack.id);
    const before = new Set<string>();
    for (const st of pulled) if ((current.owned[st.id] ?? 0) === 0) before.add(st.id);

    const owned = { ...current.owned };
    let newCount = 0;
    for (const st of pulled) {
      if ((owned[st.id] ?? 0) === 0) newCount++;
      owned[st.id] = (owned[st.id] ?? 0) + 1;
    }
    const next = { ...current, owned };
    saveSeason(next);
    setSeason(next);

    // ——— التسلسل السينمائي ———
    setPulls(pulled);
    setPulledBefore(before);
    setOpening(pack);
    setPhase("charging"); // 1. ترقّب: اهتزاز + شرارات + هالة
    if (prefsStore.getState().sound) stadium.packOpen();
    if (prefsStore.getState().haptics && navigator.vibrate) navigator.vibrate([40, 60, 40, 60, 40]);

    const chargeMs = 1500;
    later(() => {
      // 2. الانفجار: وميض أبيض + صوت الذروة
      setPhase("burst");
      const st = prefsStore.getState();
      if (st.sound) {
        if (hasLegendaryRefs.current) stadium.cheer(1.6, 0.18);
        else if (hasEpicRefs.current) stadium.horn(0.6);
        else chordBright();
      }
      if (st.haptics && navigator.vibrate) navigator.vibrate(hasLegendaryRefs.current ? [80, 40, 120] : 60);
    }, chargeMs);

    later(() => {
      // 3. الكشف: البطاقات تطير وتنقلب تلقائيًا (CSS delays)
      setPhase("reveal");
    }, chargeMs + 520);

    purchaseLockRef.current = false;
  };

  /** مراجع تُقرأ لحظة الانفجار — تفادي حالة قديمة داخل setTimeout */
  const hasLegendaryRefs = useRef(hasLegendary);
  const hasEpicRefs = useRef(hasEpic);
  useEffect(() => {
    hasLegendaryRefs.current = hasLegendary;
    hasEpicRefs.current = hasEpic;
  }, [hasLegendary, hasEpic]);

  const closeFlow = () => {
    for (const t of phaseTimers.current) clearTimeout(t);
    phaseTimers.current = [];
    setOpening(null);
    setPhase("idle");
    setPulls([]);
  };

  /** النقر أثناء الكشف = تخطي كل التأخيرات (class على الحاوية) */
  const revealWrapRef = useRef<HTMLDivElement | null>(null);
  const skipReveal = () => {
    if (phase !== "reveal") return;
    revealWrapRef.current?.classList.add("pk-skip");
    if (prefsStore.getState().sound) sfx.tap();
  };

  /** بيع كل النسخ الزائدة دفعة واحدة */
  const sellAllDupes = () => {
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
    setSoldToast(lang === "ar" ? `تم البيع! +${formatCoins(earned)}` : `Sold! +${formatCoins(earned)}`);
    if (soldTimer.current) clearTimeout(soldTimer.current);
    soldTimer.current = setTimeout(() => setSoldToast(null), 2600);
    if (prefsStore.getState().sound) sfx.unlock();
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

  const newCount = pulls.filter((p) => pulledBefore.has(p.id)).length;

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
                className="block w-fit"
              >
                <PackArt id={p.id} className="size-14 drop-shadow-md" />
              </motion.span>
              <p className="text-xs font-black">{lang === "ar" ? p.ar : p.en}</p>
              <span
                className={cn(
                  "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black",
                  p.affordable ? "bg-gold/25 text-amber-700 dark:text-amber-200" : "bg-ink/10 text-faint dark:bg-white/10",
                )}
              >
                <CoinMark className="size-3.5" /> {p.price} · {p.pulls}×
                {p.affordable ? null : <Lock className="size-3" />}
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

      {/* ============================================================
          التسلسل السينمائي لفتح الحزمة — طبقة واحدة، حركات CSS
          ============================================================ */}
      <AnimatePresence>
        {opening && phase !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-black/85"
            onClick={() => {
              if (phase === "reveal") skipReveal();
              else if (phase === "summary") closeFlow();
            }}
          >
            {/* زر إغلاق دائم أعلى الشاشة */}
            {(phase === "reveal" || phase === "summary") && (
              <button
                onClick={closeFlow}
                aria-label={lang === "ar" ? "إغلاق" : "Close"}
                className="absolute top-4 end-4 z-20 rounded-full bg-white/10 p-2.5 text-white/80 backdrop-blur transition-colors hover:bg-white/20"
              >
                <X className="size-5" />
              </button>
            )}

            {/* ——— 1) الترقّب: الحزمة تهتز وتتوهج والشرارات تصعد ——— */}
            {phase === "charging" && (
              <div className="relative flex flex-col items-center">
                <div className="pk-aura" />
                {/* شرارات حول الحزمة */}
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="pk-spark"
                    style={{
                      left: `${12 + (i % 4) * 25}%`,
                      top: `${20 + Math.floor(i / 4) * 45}%`,
                      animationDelay: `${i * 0.13}s`,
                    }}
                  />
                ))}
                <div className="pk-shake relative">
                  <PackArt id={opening.id} className="size-40 drop-shadow-2xl" />
                </div>
                <p className="mt-8 animate-pulse text-sm font-black text-white/85">
                  {lang === "ar" ? "افتح..." : "Opening..."}
                </p>
              </div>
            )}

            {/* ——— 2) الانفجار: وميض ضوئي ——— */}
            {phase === "burst" && (
              <div className="pk-flash" />
            )}

            {/* ——— 3) الكشف: كل البطاقات تطير وتنقلب تلقائيًا ——— */}
            {phase === "reveal" && (
              <div
                ref={revealWrapRef}
                className="flex max-h-full w-full max-w-sm flex-col items-center gap-3 overflow-y-auto px-4 py-10"
              >
                <p className="pk-card-in text-xs font-black uppercase tracking-[0.3em] text-gold" style={{ animationDelay: "0.05s" }}>
                  {lang === "ar" ? "محتويات الحزمة" : "PACK CONTENTS"}
                </p>
                <div className="grid w-full grid-cols-2 gap-2.5">
                  {pulls.map((st, i) => (
                    <div
                      key={`${st.id}-${i}`}
                      className={cn("relative", i === bestIndex ? "pk-best" : "pk-card-in")}
                      style={{ animationDelay: `${cardDelay(i, pulls.length, bestIndex)}s` }}
                    >
                      <StickerCard sticker={st} copies={1} lang={lang} />
                      {pulledBefore.has(st.id) && (
                        <span
                          className="pk-new-tag absolute -top-1.5 -end-1.5 rounded-full bg-grass-500 px-2 py-0.5 text-[9px] font-black text-white shadow-lg"
                          style={{ animationDelay: `${cardDelay(i, pulls.length, bestIndex) + 0.3}s` }}
                        >
                          {lang === "ar" ? "جديد" : "NEW"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* أزرار الملخص تظهر بعد آخر بطاقة */}
                <button
                  onClick={() => {
                    setPhase("summary");
                    if (prefsStore.getState().sound) sfx.unlock();
                  }}
                  className="pk-card-in mt-3 rounded-2xl bg-gradient-to-l from-amber-500 to-gold px-8 py-3 text-sm font-black text-amber-950 shadow-xl transition-all hover:brightness-105 active:scale-95"
                  style={{ animationDelay: `${cardDelay(pulls.length - 1, pulls.length, bestIndex) + 0.35}s` }}
                >
                  {lang === "ar" ? "المتابعة" : "Continue"}
                </button>
              </div>
            )}

            {/* ——— 4) الملخص النهائي ——— */}
            {phase === "summary" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="mx-4 w-full max-w-sm rounded-3xl border border-gold/30 bg-gradient-to-b from-[#141c16] to-[#0a0f0b] p-6 text-center shadow-2xl"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">
                  {lang === "ar" ? "ملخص الحزمة" : "PACK SUMMARY"}
                </p>
                <p className="mt-2 text-4xl font-black text-white">{pulls.length}×</p>
                <p className="text-xs font-bold text-white/50">{lang === "ar" ? "ملصقات" : "stickers"}</p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-grass-500/15 p-3">
                    <p className="text-2xl font-black text-grass-400">+{newCount}</p>
                    <p className="text-[10px] font-bold text-white/60">{lang === "ar" ? "جديد" : "New"}</p>
                  </div>
                  <div className="rounded-2xl bg-gold/15 p-3">
                    <p className="flex items-center justify-center gap-1 text-2xl font-black text-gold">
                      +{COINS.newSticker * newCount}
                      <CoinMark className="size-4" />
                    </p>
                    <p className="text-[10px] font-bold text-white/60">{lang === "ar" ? "عملات مكتسبة" : "Coins earned"}</p>
                  </div>
                </div>

                {/* أندر بطاقة */}
                {pulls[bestIndex] && (
                  <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-white/5 p-3">
                    <div className="size-16 shrink-0">
                      <StickerCard sticker={pulls[bestIndex]!} copies={1} lang={lang} />
                    </div>
                    <div className="text-start">
                      <p className="text-sm font-black text-white">
                        {lang === "ar" ? pulls[bestIndex]!.ar : pulls[bestIndex]!.en}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          hasLegendary ? "text-gold" : hasEpic ? "text-purple-400" : "text-white/50",
                        )}
                      >
                        {RARITY_NAME[pulls[bestIndex]!.rarity][lang]}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={closeFlow}
                  className="mt-5 w-full rounded-2xl bg-gradient-to-l from-amber-500 to-gold py-3 text-sm font-black text-amber-950 shadow-lg transition-all hover:brightness-105 active:scale-95"
                >
                  {lang === "ar" ? "رائع!" : "Awesome!"}
                </button>
              </motion.div>
            )}
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
                ? `${dupes.items.length} نوعاً · قيمتها ${formatCoins(dupes.totalValue)}`
                : `${dupes.items.length} types · worth ${formatCoins(dupes.totalValue)}`}
            </p>
          </div>
        </div>
        <button
          onClick={onSellAll}
          className="shrink-0 rounded-xl bg-gradient-to-l from-amber-500 to-gold px-3.5 py-2 text-xs font-black text-amber-950 shadow-md transition-all hover:brightness-105 active:scale-95"
        >
          {lang === "ar" ? `بيع الكل +${formatCoins(dupes.totalValue)}` : `Sell all +${formatCoins(dupes.totalValue)}`}
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
