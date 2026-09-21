/** ============================================================
 *  StickerCard — ملصق لاعب/نادٍ/منتخب مرسوم SVG بالكامل
 *  الطقم بألوان النادي، العلم بألوان الدولة، الشعار كدرع.
 *  الإطار يتوهج حسب الندرة — بأسلوب بطاقات FUT.
 *  ============================================================ */

import { Lock } from "lucide-react";
import { STICKERS, type Rarity, type Sticker } from "../domain/season";
import { cn } from "../utils/cn";

const RARITY_FRAME: Record<Rarity, { border: string; glow: string; label: string }> = {
  common: { border: "#94a3b8", glow: "none", label: "#64748b" },
  rare: { border: "#38bdf8", glow: "0 0 10px rgba(56,189,248,0.35)", label: "#0284c7" },
  epic: { border: "#a855f7", glow: "0 0 12px rgba(168,85,247,0.45)", label: "#9333ea" },
  legendary: { border: "#fbbf24", glow: "0 0 14px rgba(251,191,36,0.55)", label: "#d97706" },
};

export function StickerArt({ sticker, className }: { sticker: Sticker; className?: string }) {
  const { c1, c2, art } = sticker;
  if (art === "kit") {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden>
        {/* أكمام */}
        <path d="M8 10l6-4h4l2 3 2-3h4l6 4-3 5-3-1.5V34H14V13.5L11 15 8 10z" fill={c1} stroke={c2} strokeWidth="1.4" />
        {/* خط الطقم */}
        <path d="M18 6.2h4v3h-4z" fill={c2} opacity="0.9" />
      </svg>
    );
  }
  if (art === "flag") {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden>
        <rect x="6" y="9" width="28" height="22" rx="2.5" fill={c1} stroke="#00000030" strokeWidth="1" />
        <rect x="6" y="18" width="28" height="4.5" fill={c2} opacity="0.92" />
        <rect x="6" y="26.5" width="28" height="4.5" fill={c1} opacity="0.55" />
      </svg>
    );
  }
  // badge — درع النادي
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 5l13 4.5v11c0 7.5-5.5 12.5-13 14.5C12.5 33 7 28 7 20.5v-11L20 5z" fill={c1} stroke={c2} strokeWidth="1.6" />
      <path d="M20 9l9 3v8c0 5.5-4 9.2-9 10.8-5-1.6-9-5.3-9-10.8v-8l9-3z" fill={c2} opacity="0.35" />
    </svg>
  );
}

interface Props {
  sticker: Sticker;
  /** عدد النسخ المملوكة */
  copies?: number;
  /** عرض مقفل — يظهر ظلًا رماديًا وبطاقة مجهولة */
  locked?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const SIZES = {
  sm: "w-full",
  md: "w-full",
  lg: "w-44",
} as const;

export function StickerCard({ sticker, copies = 0, locked = false, size = "md", onClick }: Props) {
  const fr = RARITY_FRAME[sticker.rarity];
  const owned = copies > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderColor: owned ? fr.border : undefined,
        boxShadow: owned ? fr.glow : undefined,
      }}
      className={cn(
        "relative flex flex-col items-center gap-1 rounded-2xl border-2 p-2.5 text-center transition-transform active:scale-95",
        SIZES[size],
        owned ? "bg-surface" : "border-line bg-ink/5 dark:bg-white/5",
        locked && "opacity-45 grayscale",
      )}
    >
      {/* التقييم */}
      <span
        className="absolute -top-1.5 -start-1.5 flex size-7 items-center justify-center rounded-full text-[11px] font-black text-white shadow"
        style={{ backgroundColor: owned ? fr.label : "#94a3b8" }}
      >
        {sticker.rating}
      </span>

      {copies > 1 && (
        <span className="absolute -top-1.5 -end-1.5 rounded-full bg-grass-600 px-1.5 py-0.5 text-[9px] font-black text-white">
          ×{copies}
        </span>
      )}

      {/* الملصق يظهر دائمًا — المقفل فقط يُعتم ويُضاف قفل صغير */}
      <span className="relative flex h-12 items-center justify-center">
        <StickerArt
          sticker={sticker}
          className={cn("h-12 w-12 transition-opacity", locked && "opacity-35 grayscale")}
        />
        {locked && <Lock className="absolute size-4 text-ink/50 dark:text-white/50" />}
      </span>

      <span className={cn("truncate text-[10px] font-black leading-tight", !owned && "opacity-40")}>
        {sticker.ar}
      </span>
    </button>
  );
}

/** شبكة ألبوم كاملة */
export function StickerAlbum({
  owned,
  lang,
}: {
  owned: Record<string, number>;
  lang: "ar" | "en";
}) {
  const groups: { title: string; items: typeof STICKERS }[] = [
    { title: lang === "ar" ? "الأساطير 👑" : "Legends 👑", items: STICKERS.filter((s) => s.kind === "legend") },
    { title: lang === "ar" ? "نجوم الحاضر ⭐" : "Stars ⭐", items: STICKERS.filter((s) => s.kind === "star") },
    { title: lang === "ar" ? "الأندية 🏟️" : "Clubs 🏟️", items: STICKERS.filter((s) => s.kind === "club") },
    { title: lang === "ar" ? "المنتخبات 🌍" : "Nations 🌍", items: STICKERS.filter((s) => s.kind === "nation") },
  ];

  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <div key={g.title}>
          <p className="mb-2 text-xs font-black opacity-60">{g.title}</p>
          <div className="grid grid-cols-4 gap-2">
            {g.items.map((s) => (
              <StickerCard key={s.id} sticker={s} copies={owned[s.id] ?? 0} locked={(owned[s.id] ?? 0) === 0} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
