/**
 * PlayerCard — بطاقة اللاعب الشخصية بأسلوب FUT
 * التقييم يتطور مع XP: من 60 (برونزي) حتى 99 (أسطوري) — هيكل من 3 مراحل.
 * كل شيء مرسوم SVG محليًا — بدون أي صور خارجية.
 */

import { levelFor } from "../domain/progression";
import { leagueFor } from "../domain/leagues";
import { avatarLabel } from "./AvatarArt";
import type { Lang } from "../domain/types";
import { cn } from "../utils/cn";
import { AvatarArt } from "./AvatarArt";

interface Props {
  /** اسم اللاعب */
  name: string;
  /** معرف الأفاتار المختار */
  avatarId: string | null;
  /** XP الكلي — يحدد التقييم والمستوى */
  xp: number;
  lang: Lang;
  className?: string;
}

/** التقييم من XP: 60 عند الصفر، +39 لكل مستوى تقريبًا حتى 99 */
export function ratingForXp(xp: number): number {
  const lvl = levelFor(xp);
  return Math.min(99, 60 + lvl.index * 4 + Math.floor((xp % 150) / 40));
}

/** المرحلة من التقييم */
export function tierOf(rating: number): "bronze" | "silver" | "gold" | "elite" {
  if (rating < 70) return "bronze";
  if (rating < 80) return "silver";
  if (rating < 90) return "gold";
  return "elite";
}

const TIER_STYLE = {
  bronze: {
    frame: "linear-gradient(160deg,#b07846,#6b3f1d)",
    text: "#fde8d0",
    glow: "none",
    sheen: "rgba(255,255,255,0.14)",
  },
  silver: {
    frame: "linear-gradient(160deg,#d8dde3,#8e979f)",
    text: "#1e293b",
    glow: "0 0 14px rgba(200,210,220,0.35)",
    sheen: "rgba(255,255,255,0.3)",
  },
  gold: {
    frame: "linear-gradient(160deg,#f5d67b,#a67c1a)",
    text: "#3a2a05",
    glow: "0 0 18px rgba(245,214,123,0.5)",
    sheen: "rgba(255,255,255,0.4)",
  },
  elite: {
    frame: "linear-gradient(160deg,#b9f2ef,#2aa9c9,#7a5cff)",
    text: "#ffffff",
    glow: "0 0 22px rgba(80,200,255,0.55)",
    sheen: "rgba(255,255,255,0.45)",
  },
} as const;

export function PlayerCard({ name, avatarId, xp, lang, className }: Props) {
  const rating = ratingForXp(xp);
  const tier = tierOf(rating);
  const style = TIER_STYLE[tier];
  const lvl = levelFor(xp);
  const league = leagueFor(xp);
  const avatarName = avatarLabel(avatarId, lang);

  const stats = [
    { key: "xp", label: lang === "ar" ? "XP" : "XP", value: xp },
    { key: "league", label: lang === "ar" ? "الدوري" : "League", value: league.id },
    { key: "level", label: lang === "ar" ? "المستوى" : "Level", value: lvl.current },
  ];

  return (
    <div
      className={cn("relative mx-auto w-full max-w-[240px]", className)}
      style={{ filter: `drop-shadow(0 12px 24px rgba(0,0,0,0.35))` }}
    >
      {/* الإطار */}
      <div
        className="relative overflow-hidden rounded-[22px] p-[3px]"
        style={{ background: style.frame, boxShadow: style.glow }}
      >
        <div
          className="relative flex aspect-[3/4] flex-col items-center overflow-hidden rounded-[19px] px-3 pt-5 pb-4"
          style={{ background: style.frame }}
        >
          {/* لمعة قطرية */}
          <div
            className="pointer-events-none absolute -inset-y-8 -start-1/3 w-2/3 rotate-12"
            style={{ background: `linear-gradient(90deg, transparent, ${style.sheen}, transparent)` }}
          />

          {/* الأفاتار — شخصية مرسومة محليًا */}
          <div className="relative w-24">
            <AvatarArt id={avatarId} className="aspect-square w-full overflow-hidden rounded-full shadow-lg ring-2 ring-white/40" />
          </div>

          {/* التقييم الضخم */}
          <p
            className="mt-2 text-5xl leading-none font-black tabular-nums"
            style={{ color: style.text, textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
          >
            {rating}
          </p>

          {/* الاسم */}
          <p
            className="mt-1.5 max-w-full truncate text-center text-sm font-black"
            style={{ color: style.text }}
          >
            {name || (lang === "ar" ? "لاعب" : "Player")}
          </p>

          {/* خط فاصل */}
          <div className="my-2 h-px w-3/4" style={{ background: style.text, opacity: 0.25 }} />

          {/* الإحصائيات */}
          <div className="flex w-full items-start justify-between px-1">
            {stats.map((s) => (
              <div key={s.key} className="flex flex-col items-center">
                <p className="text-[9px] font-black uppercase tracking-wide opacity-70" style={{ color: style.text }}>
                  {s.label}
                </p>
                <p className="text-xs font-black" style={{ color: style.text }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* اسم الأفاتار أسفل */}
          <p className="mt-auto text-[10px] font-bold opacity-80" style={{ color: style.text }}>
            {avatarName}
          </p>
        </div>
      </div>

      {/* شريط المرحلة */}
      <div className="mt-2 flex items-center justify-center">
        <span
          className={cn(
            "rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest",
            tier === "bronze" && "bg-amber-700/15 text-amber-700 dark:text-amber-400",
            tier === "silver" && "bg-slate-400/15 text-slate-600 dark:text-slate-300",
            tier === "gold" && "bg-yellow-500/20 text-amber-700 dark:text-amber-300",
            tier === "elite" && "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
          )}
        >
          {tier === "bronze" && (lang === "ar" ? "برونزية" : "Bronze")}
          {tier === "silver" && (lang === "ar" ? "فضية" : "Silver")}
          {tier === "gold" && (lang === "ar" ? "ذهبية" : "Gold")}
          {tier === "elite" && (lang === "ar" ? "نخبة" : "Elite")}
        </span>
      </div>
    </div>
  );
}
