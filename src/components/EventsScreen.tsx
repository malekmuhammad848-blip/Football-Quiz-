/**
 * EventsScreen — الفعاليات والبطولات الأسبوعية (لايف من Supabase)
 * كل المحتوى (عناوين/جوائز/ألوان/تواريخ) من جدول events — يُحدَّث من اللوحة
 * دون أي تحديث للتطبيق.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Gift, RefreshCcw, Sparkles, Trophy } from "lucide-react";
import { fetchActiveEvents, type EventRow } from "../lib/backend";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";

interface Props {
  lang: Lang;
}

/** من العنوان الكامل إلى الاسم المختصر للنوع */
const KIND_STYLES: Record<EventRow["kind"], { ring: string; bg: string }> = {
  tournament: { ring: "shadow-[0_0_20px_rgba(251,191,36,0.15)]", bg: "from-amber-500/15" },
  challenge: { ring: "shadow-[0_0_20px_rgba(52,211,153,0.12)]", bg: "from-grass-500/15" },
  reward: { ring: "shadow-[0_0_20px_rgba(251,146,60,0.12)]", bg: "from-orange-500/15" },
  season: { ring: "shadow-[0_0_20px_rgba(167,139,250,0.12)]", bg: "from-violet-500/15" },
};

export function EventsScreen({ lang }: Props) {
  const [events, setEvents] = useState<EventRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (silent = false) => {
    if (!silent) setRefreshing(true);
    setError(null);
    try {
      const rows = await fetchActiveEvents();
      setEvents(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "events-failed");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void load();
    // تحديث لايف كل دقيقة (تتغير الفعاليات دون تحديث التطبيق)
    const id = setInterval(() => void load(true), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      {/* الترويسة */}
      <div className="relative overflow-hidden rounded-3xl border border-card-edge bg-gradient-to-b from-gold/15 to-transparent p-5">
        <div className="pointer-events-none absolute -top-14 -start-10 size-36 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2 text-gold">
            <Sparkles className="size-5" />
            <h3 className="text-lg font-black">{t(lang, "eventsTitle")}</h3>
          </div>
          <button
            onClick={() => void load()}
            aria-label="Refresh"
            className="rounded-full bg-ghost p-2 transition-transform active:scale-90"
          >
            <RefreshCcw className={cn("size-4", refreshing && "animate-spin")} />
          </button>
        </div>
        <p className="relative mt-1 text-sm font-medium text-soft">{t(lang, "eventsDesc")}</p>
      </div>

      {/* الحالات */}
      {error && (
        <p className="rounded-2xl bg-red-500/10 py-4 text-center text-sm font-bold text-red-300">{error}</p>
      )}

      {events === null && !error && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-3xl bg-ghost" />
          ))}
        </div>
      )}

      {events !== null && events.length === 0 && (
        <div className="rounded-3xl border border-card-edge bg-card-soft py-10 text-center">
          <CalendarDays className="mx-auto size-10 text-faint" />
          <p className="mt-3 text-sm font-bold text-soft">{t(lang, "eventsEmpty")}</p>
        </div>
      )}

      {/* بطاقات الفعاليات */}
      {events !== null && events.length > 0 && (
        <div className="space-y-3">
          {events.map((ev, i) => (
            <EventCard key={ev.id} ev={ev} lang={lang} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ ev, lang, index }: { ev: EventRow; lang: Lang; index: number }) {
  const title = lang === "ar" ? ev.title_ar : ev.title_en;
  const desc = (lang === "ar" ? ev.desc_ar : ev.desc_en) ?? "";
  const reward = (lang === "ar" ? ev.reward_ar : ev.reward_en) ?? null;
  const cta = (lang === "ar" ? ev.cta_label_ar : ev.cta_label_en) ?? null;
  const ends = new Date(ev.ends_at);
  const daysLeft = Math.max(0, Math.ceil((ends.getTime() - Date.now()) / 86_400_000));
  const style = KIND_STYLES[ev.kind] ?? KIND_STYLES.tournament!;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.5) }}
      className={cn("relative overflow-hidden rounded-3xl border border-card-edge bg-gradient-to-b to-transparent p-4", style.bg, style.ring)}
    >
      {/* شريط لوني بلون الفعالية من قاعدة البيانات */}
      <span className="absolute inset-y-0 start-0 w-1" style={{ background: ev.accent }} />

      <div className="flex items-start gap-3">
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
          style={{ background: `${ev.accent}22`, boxShadow: `0 0 16px ${ev.accent}33` }}
        >
          {ev.emoji}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="min-w-0 flex-1 truncate text-base font-black">{title}</h4>
            {daysLeft <= 3 && (
              <span className="shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-black text-red-300">
                {lang === "ar" ? `${daysLeft} أيام` : `${daysLeft}d left`}
              </span>
            )}
          </div>
          {desc && <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-soft">{desc}</p>}

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {reward && (
              <span className="inline-flex items-center gap-1 rounded-full bg-ghost px-2.5 py-1 text-[10px] font-black text-gold">
                <Gift className="size-3" />
                {reward}
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-ghost px-2.5 py-1 text-[10px] font-bold text-soft">
              <Trophy className="size-3" />
              {ends.toLocaleDateString(lang === "ar" ? "ar" : "en", { day: "numeric", month: "short" })}
            </span>
            {cta && (
              <span
                className="ms-auto cursor-default rounded-full px-3 py-1 text-[11px] font-black"
                style={{ background: ev.accent, color: "#0b120e" }}
              >
                {cta}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
