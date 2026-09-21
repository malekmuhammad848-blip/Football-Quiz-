/** ============================================================
 *  StickerCard — بطاقات ملصقات بأسلوب FIFA Ultimate Team
 *  فن SVG يدوي عالي الجودة:
 *   kit   → قميص بأكمام حقيقية + أنماط (خطوط عمودية/وشاح/حلقات) + رقم الظهر
 *   flag  → علم دقيق لكل منتخب (شمس الأرجنتين، معيّن البرازيل، نجمة المغرب...)
 *   badge → درع نادٍ بشعار مميز يدويًا (تاج ريال، بلاوقرانا، شيطان يونايتد...)
 *  الإطار يتوهج حسب الندرة — بطاقة كاملة مثل بطاقات FUT الأصلية.
 *  ============================================================ */

import { Lock } from "lucide-react";
import { STICKERS, type Rarity, type Sticker } from "../domain/season";
import { cn } from "../utils/cn";

const RARITY_FRAME: Record<Rarity, { border: string; glow: string; label: string; grad: string }> = {
  common: { border: "#94a3b8", glow: "none", label: "#64748b", grad: "linear-gradient(160deg,#e2e8f0,#cbd5e1)" },
  rare: { border: "#38bdf8", glow: "0 0 14px rgba(56,189,248,0.4)", label: "#0369a1", grad: "linear-gradient(160deg,#e0f2fe,#bae6fd)" },
  epic: { border: "#a855f7", glow: "0 0 16px rgba(168,85,247,0.45)", label: "#7e22ce", grad: "linear-gradient(160deg,#f3e8ff,#e9d5ff)" },
  legendary: { border: "#fbbf24", glow: "0 0 18px rgba(251,191,36,0.55)", label: "#b45309", grad: "linear-gradient(160deg,#fef3c7,#fde68a)" },
};

/* ============================================================
 *  فن القميص — قميص حقيقي بأكمام وياقة ورقم
 * ============================================================ */

/** جسم القميص بأكمام — قاعدة مشتركة */
function KitBase({ c1, c2 }: { c1: string; c2: string }) {
  return (
    <>
      {/* الأكمام */}
      <path d="M14 12 L8 15 L11.5 21 L14.5 19.2 Z" fill={c2} stroke="#00000022" strokeWidth="0.5" />
      <path d="M34 12 L40 15 L36.5 21 L33.5 19.2 Z" fill={c2} stroke="#00000022" strokeWidth="0.5" />
      {/* الجسم */}
      <path
        d="M14 12 L20 9.5 L28 9.5 L34 12 L34 38 Q34 39.5 32.5 39.5 L15.5 39.5 Q14 39.5 14 38 Z"
        fill={c1}
        stroke="#00000025"
        strokeWidth="0.6"
      />
      {/* الياقة */}
      <path d="M20 9.5 L24 14 L28 9.5" fill="none" stroke={c2} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 9.5 L24 14 L28 9.5" fill="none" stroke="#ffffff30" strokeWidth="0.5" />
    </>
  );
}

/** قميص كامل حسب النمط والرقم */
function KitArt({ sticker }: { sticker: Sticker }) {
  const { c1, c2, pattern = "solid", number } = sticker;
  const darkText = isLight(c1) ? "#1e293b" : "#ffffff";
  const numColor = isLight(c2) ? "#1e293b" : "#ffffff";

  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={`kit-${sticker.id}`}>
          <path d="M14 12 L20 9.5 L28 9.5 L34 12 L34 38 Q34 39.5 32.5 39.5 L15.5 39.5 Q14 39.5 14 38 Z" />
        </clipPath>
      </defs>

      {/* الجسم + الأنماط داخل القص */}
      <g clipPath={`url(#kit-${sticker.id})`}>
        <KitBase c1={c1} c2={c2} />
        {pattern === "stripes" && (
          <g>
            <rect x="16.5" y="6" width="3.5" height="36" fill={c2} />
            <rect x="23.5" y="6" width="3.5" height="36" fill={c2} />
            <rect x="30.5" y="6" width="3.5" height="36" fill={c2} />
          </g>
        )}
        {pattern === "hoops" && (
          <g>
            <rect x="12" y="16" width="24" height="4" fill={c2} />
            <rect x="12" y="24" width="24" height="4" fill={c2} />
            <rect x="12" y="32" width="24" height="4" fill={c2} />
          </g>
        )}
        {pattern === "sash" && (
          <path d="M10 38 L34 8 L38 12 L14 42 Z" fill={c2} opacity="0.92" />
        )}
      </g>

      {/* رقم القميص على الصدر */}
      {number !== undefined && (
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          fill={pattern === "solid" ? numColor : darkText}
          stroke="#00000018"
          strokeWidth="0.4"
        >
          {number}
        </text>
      )}
    </svg>
  );
}

function isLight(hex: string): boolean {
  try {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160;
  } catch {
    return false;
  }
}

/* ============================================================
 *  فن الأعلام — علم دقيق لكل منتخب
 * ============================================================ */

function FlagArt({ sticker }: { sticker: Sticker }) {
  const { flagStyle, c1 } = sticker;
  const frame = (
    <>
      <rect x="4" y="10" width="40" height="28" rx="3" fill="#ffffff" stroke="#00000025" strokeWidth="1" />
      <clipPath id={`flag-${sticker.id}`}>
        <rect x="5" y="11" width="38" height="26" rx="2" />
      </clipPath>
    </>
  );

  const inner = (() => {
    switch (flagStyle) {
      case "argentina":
        return (
          <g clipPath={`url(#flag-${sticker.id})`}>
            <rect x="5" y="11" width="38" height="26" fill="#74acdf" />
            <rect x="5" y="19.3" width="38" height="9.3" fill="#ffffff" />
            <circle cx="24" cy="24" r="3" fill="#f6b40e" stroke="#85340a" strokeWidth="0.7" />
            <circle cx="24" cy="24" r="1" fill="#85340a" />
          </g>
        );
      case "brazil":
        return (
          <g clipPath={`url(#flag-${sticker.id})`}>
            <rect x="5" y="11" width="38" height="26" fill="#009c3b" />
            <path d="M24 14.5 L37 24 L24 33.5 L11 24 Z" fill="#ffdf00" />
            <circle cx="24" cy="24" r="6.2" fill="#002776" />
            <path d="M18.2 22.5 Q24 20.5 29.8 23.5" stroke="#ffffff" strokeWidth="1.4" fill="none" />
          </g>
        );
      case "france":
        return (
          <g clipPath={`url(#flag-${sticker.id})`}>
            <rect x="5" y="11" width="12.7" height="26" fill="#002395" />
            <rect x="17.7" y="11" width="12.6" height="26" fill="#ffffff" />
            <rect x="30.3" y="11" width="12.7" height="26" fill="#ed2939" />
          </g>
        );
      case "morocco":
        return (
          <g clipPath={`url(#flag-${sticker.id})`}>
            <rect x="5" y="11" width="38" height="26" fill="#c1272d" />
            <path
              d="M24 18.5 L25.4 22 L29 22 L26.2 24.2 L27.2 27.6 L24 25.5 L20.8 27.6 L21.8 24.2 L19 22 L22.6 22 Z"
              fill="none"
              stroke="#006233"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          </g>
        );
      case "germany":
        return (
          <g clipPath={`url(#flag-${sticker.id})`}>
            <rect x="5" y="11" width="38" height="8.7" fill="#111111" />
            <rect x="5" y="19.7" width="38" height="8.7" fill="#dd0000" />
            <rect x="5" y="28.4" width="38" height="8.6" fill="#ffce00" />
          </g>
        );
      case "spain":
        return (
          <g clipPath={`url(#flag-${sticker.id})`}>
            <rect x="5" y="11" width="38" height="26" fill="#c60b1e" />
            <rect x="5" y="18.5" width="38" height="11" fill="#ffc400" />
            <rect x="9" y="20.5" width="4" height="7" fill="#ad1519" opacity="0.85" />
          </g>
        );
      default:
        // علم عام: لونا الطقم أفقيًا
        return (
          <g clipPath={`url(#flag-${sticker.id})`}>
            <rect x="5" y="11" width="38" height="13" fill={c1} />
            <rect x="5" y="24" width="38" height="13" fill={c1} opacity="0.65" />
          </g>
        );
    }
  })();

  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      {frame}
      {inner}
    </svg>
  );
}

/* ============================================================
 *  فن الشعارات — درع نادٍ بشعار يدوي مميز
 * ============================================================ */

function BadgeArt({ sticker }: { sticker: Sticker }) {
  const { crestStyle, c1, c2 } = sticker;

  switch (crestStyle) {
    case "real":
      // تاج ذهبي فوق درع أبيض/أزرق
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path d="M24 8 L38 12.5 V26 C38 33.5 32 39 24 41.5 C16 39 10 33.5 10 26 V12.5 Z" fill="#ffffff" stroke="#febe10" strokeWidth="2" />
          <path d="M24 8 L38 12.5 V26 C38 33.5 32 39 24 41.5 C16 39 10 33.5 10 26 V12.5 Z" fill="url(#realBand)" opacity="0" />
          <path d="M17 22 L24 17 L31 22 L31 30 L24 35 L17 30 Z" fill="#00529f" opacity="0.9" />
          <path d="M20.5 26.5 Q24 23.5 27.5 26.5 L27.5 30.5 L24 32.5 L20.5 30.5 Z" fill="#ffffff" />
          {/* التاج */}
          <path d="M14 11.5 L14 7 L17.5 9 L20 5.5 L24 8.5 L28 5.5 L30.5 9 L34 7 L34 11.5 Z" fill="#febe10" stroke="#b8860b" strokeWidth="0.6" />
          <circle cx="24" cy="3.8" r="1.3" fill="#febe10" />
        </svg>
      );
    case "barca":
      // درع مقسوم: سان جوردي + بلاوقرانا + كرة
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path d="M24 5 L40 9 V26 C40 34 33.5 40.5 24 43 C14.5 40.5 8 34 8 26 V9 Z" fill="#a50044" stroke="#ffd700" strokeWidth="1.4" />
          {/* سان جوردي (الأعلى يسار) */}
          <path d="M8 9 L24 5 V19 H8 Z" fill="#ffffff" />
          {[-1, 0, 1].map((i) => (
            <rect key={i} x={10 + (i + 1) * 4.6} y="6.5" width="1.8" height="12" fill="#ed2939" opacity="0.85" />
          ))}
          {/* بلاوقرانا (الأعلى يمين) */}
          <path d="M24 5 L40 9 V19 H24 Z" fill="#004d98" />
          <rect x="24" y="7" width="3.2" height="12" fill="#a50044" />
          <rect x="30.4" y="7" width="3.2" height="12" fill="#a50044" />
          <rect x="36.8" y="7" width="3.2" height="12" fill="#a50044" />
          {/* الحزام الأصفر */}
          <rect x="8" y="19" width="32" height="4.5" fill="#ffd700" />
          {/* الكرة (الأسفل) */}
          <circle cx="24" cy="31.5" r="7.5" fill="#004d98" />
          <path d="M24 24 A7.5 7.5 0 0 1 24 39 Z" fill="#a50044" />
          <circle cx="24" cy="31.5" r="7.5" fill="none" stroke="#ffd700" strokeWidth="1.2" />
        </svg>
      );
    case "united":
      // درع أحمر وشيطان وخط ذهبي
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path d="M24 6 L39 10 V27 C39 34.5 32.5 40 24 42.5 C15.5 40 9 34.5 9 27 V10 Z" fill="#da291c" stroke="#fbe122" strokeWidth="2" />
          {/* الشيطان */}
          <path
            d="M24 14 C21 14 19.5 16 19.5 18.5 C17 19 15.5 21 15.5 23.5 C15.5 26 17.5 28 20 28.5 C18.5 30 18.5 32.5 20 34 C21.5 35.5 24 35.5 25.5 34 C27 35.5 29.5 35.5 31 34 C32.5 32.5 32.5 30 31 28.5 C33.5 28 35.5 26 35.5 23.5 C35.5 21 34 19 31.5 18.5 C31.5 16 30 14 27 14 Z"
            fill="#fbe122"
            stroke="#8b0000"
            strokeWidth="0.8"
          />
          <circle cx="21.5" cy="22" r="1.2" fill="#da291c" />
          <circle cx="26.5" cy="22" r="1.2" fill="#da291c" />
          {/* الشعار العلوي */}
          <path d="M16 11.5 H32" stroke="#fbe122" strokeWidth="1.4" />
          <path d="M16 36 H32" stroke="#fbe122" strokeWidth="1.4" />
        </svg>
      );
    case "bayern":
      // دائرة بألوان بايرن: أحمر خارجي أزرق داخلي
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <circle cx="24" cy="24" r="19" fill="#ffffff" stroke="#0066b2" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="14.5" fill="#dc052d" />
          <circle cx="24" cy="24" r="9" fill="#0066b2" />
          {/* نجوم بايرن الصغيرة */}
          <circle cx="24" cy="9.5" r="1.6" fill="#0066b2" />
          <circle cx="38.5" cy="24" r="1.6" fill="#0066b2" />
          <circle cx="24" cy="38.5" r="1.6" fill="#0066b2" />
          <circle cx="9.5" cy="24" r="1.6" fill="#0066b2" />
          {/* أطواق الراين */}
          <path d="M24 15 A9 9 0 0 1 33 24 L24 24 Z" fill="#ffffff" opacity="0.22" />
        </svg>
      );
    case "liverpool":
      // درع أحمر بطائر ليفربول ذهبي
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path d="M24 6 L38 10.5 V26 C38 33.5 32 39 24 41.5 C16 39 10 33.5 10 26 V10.5 Z" fill="#c8102e" stroke="#f6eb61" strokeWidth="1.8" />
          {/* طائر الليفر — الطائر الأسطوري */}
          <path
            d="M24 15 C21.5 15 20 16.8 20 19 L16.5 20.5 L20.5 21.5 C20 23.5 21 25.5 23 26.5 L19 31 L23 30 L22.5 34 L24 30.5 L25.5 34 L25 30 L29 31 L25.5 26.5 C27.5 25.5 28.5 23.5 28 21.5 L32 20.5 L28 19 C28 16.8 26.5 15 24 15 Z"
            fill="#f6eb61"
            stroke="#8b0000"
            strokeWidth="0.6"
          />
          <circle cx="22" cy="18.5" r="0.9" fill="#8b0000" />
        </svg>
      );
    case "hilal":
      // دائرة زرقاء بهلال ونجمة
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <circle cx="24" cy="24" r="19" fill="#0b5ec4" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="14.5" fill="#ffffff" opacity="0.12" />
          {/* الهلال */}
          <path
            d="M27 12 A 13 13 0 1 0 27 36 A 15.5 15.5 0 1 1 27 12 Z"
            fill="#ffffff"
          />
          {/* النجمة */}
          <path d="M30 24 l1.8 4 4.2 0.3 -3.2 2.7 1 4.2 -3.8 -2.3 -3.8 2.3 1 -4.2 -3.2 -2.7 4.2 -0.3 Z" fill="#ffffff" transform="translate(-1,-3) scale(0.75) translate(10,10)" />
        </svg>
      );
    default:
      // درع عام
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path d="M24 6 L39 10.5 V26 C39 33.5 32 39 24 41.5 C16 39 10 33.5 10 26 V10.5 Z" fill={c1} stroke={c2} strokeWidth="2" />
          <path d="M17 20 L24 15 L31 20 V28 L24 33 L17 28 Z" fill={c2} opacity="0.55" />
        </svg>
      );
  }
}

/* ============================================================
 *  البطاقة الكاملة
 * ============================================================ */

export function StickerArt({ sticker, className }: { sticker: Sticker; className?: string }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      {sticker.art === "kit" && <KitArt sticker={sticker} />}
      {sticker.art === "flag" && <FlagArt sticker={sticker} />}
      {sticker.art === "badge" && <BadgeArt sticker={sticker} />}
    </div>
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
        background: owned ? fr.grad : undefined,
        borderColor: owned ? fr.border : undefined,
        boxShadow: owned ? fr.glow : undefined,
      }}
      className={cn(
        "relative flex flex-col items-center gap-1.5 rounded-2xl border-2 p-2.5 pb-2 text-center transition-transform active:scale-95",
        SIZES[size],
        owned ? "" : "border-line bg-ink/5 dark:bg-white/5",
        locked && "opacity-45 grayscale",
      )}
    >
      {/* شريط الندرة العلوي */}
      <span
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: owned ? fr.border : "#cbd5e1" }}
      />

      {/* التقييم */}
      <span
        className="absolute -top-1.5 -start-1.5 flex size-7 items-center justify-center rounded-full text-[11px] font-black text-white shadow-md"
        style={{ backgroundColor: owned ? fr.label : "#94a3b8" }}
      >
        {sticker.rating}
      </span>

      {copies > 1 && (
        <span className="absolute -top-1.5 -end-1.5 rounded-full bg-grass-600 px-1.5 py-0.5 text-[9px] font-black text-white shadow">
          ×{copies}
        </span>
      )}

      {/* الفن — يظهر دائمًا واضحًا، المقفل فقط يُعتم */}
      <span className="relative flex h-14 items-center justify-center pt-1.5">
        <StickerArt
          sticker={sticker}
          className={cn("h-14 w-14 transition-opacity", locked && "opacity-35 grayscale")}
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
