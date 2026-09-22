/** ============================================================
 *  StickerCard — بطاقات ملصقات بأسلوب FIFA Ultimate Team
 *  فن SVG يدوي عالي الدقة (viewBox 96):
 *   kit   → قميص بثلاث طبقات (أكمام/جسم/ياقة) + أنماط حقيقية + رقم
 *   flag  → أعلام رسمية بدقة: شمس الأرجنتين، معيّن البرازيل، نجمة المغرب...
 *   badge → شعارات أندية مميزة يدويًا (تاج ريال، بلاوقرانا، طائر الليفر...)
 *  إطار معدني حسب الندرة + شارة تقييم — بطاقة كاملة.
 *  ============================================================ */

import { Lock } from "lucide-react";
import { STICKERS, type Rarity, type Sticker } from "../domain/season";
import { cn } from "../utils/cn";

const RARITY_FRAME: Record<
  Rarity,
  { border: string; glow: string; label: string; grad: string; sheen: string }
> = {
  common: {
    border: "#94a3b8",
    glow: "none",
    label: "#64748b",
    grad: "linear-gradient(160deg,#eef2f7,#cbd5e1)",
    sheen: "rgba(255,255,255,0.5)",
  },
  rare: {
    border: "#38bdf8",
    glow: "0 0 16px rgba(56,189,248,0.45)",
    label: "#0369a1",
    grad: "linear-gradient(160deg,#e0f2fe,#bae6fd)",
    sheen: "rgba(255,255,255,0.55)",
  },
  epic: {
    border: "#a855f7",
    glow: "0 0 18px rgba(168,85,247,0.5)",
    label: "#7e22ce",
    grad: "linear-gradient(160deg,#f3e8ff,#e9d5ff)",
    sheen: "rgba(255,255,255,0.55)",
  },
  legendary: {
    border: "#fbbf24",
    glow: "0 0 20px rgba(251,191,36,0.6)",
    label: "#b45309",
    grad: "linear-gradient(160deg,#fef3c7,#fde68a)",
    sheen: "rgba(255,255,255,0.6)",
  },
};

function isLight(hex: string): boolean {
  try {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 150;
  } catch {
    return false;
  }
}

/* ============================================================
 *  فن القميص — قميص حقيقي بثلاث طبقات (viewBox 96)
 * ============================================================ */

const KIT_BODY = "M22 18 L36 11 L60 11 L74 18 L74 74 Q74 78 70 78 L26 78 Q22 78 22 74 Z";
const KIT_BODY_CLIP = "M22 18 L36 11 L60 11 L74 18 L74 74 Q74 78 70 78 L26 78 Q22 78 22 74 Z";

function KitArt({ sticker }: { sticker: Sticker }) {
  const { c1, c2, pattern = "solid", number } = sticker;
  const numColor = isLight(c1) ? "#1e293b" : "#ffffff";
  const numStroke = isLight(c1) ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.35)";

  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={`k-${sticker.id}`}>
          <path d={KIT_BODY_CLIP} />
        </clipPath>
        {/* ظل داخلي خفيف يعطي عمق القماش */}
        <linearGradient id={`ksh-${sticker.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* الأكمام */}
      <path d="M22 18 L8 25 L15 38 L24 33 Z" fill={c2} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      <path d="M74 18 L88 25 L81 38 L72 33 Z" fill={c2} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      {/* حافة الكم */}
      <path d="M8 25 L15 38" stroke="rgba(0,0,0,0.25)" strokeWidth="1.4" fill="none" />
      <path d="M88 25 L81 38" stroke="rgba(0,0,0,0.25)" strokeWidth="1.4" fill="none" />

      {/* الجسم */}
      <path d={KIT_BODY} fill={c1} stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" />

      {/* الأنماط داخل قص الجسم */}
      <g clipPath={`url(#k-${sticker.id})`}>
        {pattern === "stripes" && (
          <g fill={c2}>
            <rect x="28" y="6" width="7" height="80" />
            <rect x="44" y="6" width="7" height="80" />
            <rect x="60" y="6" width="7" height="80" />
          </g>
        )}
        {pattern === "hoops" && (
          <g fill={c2}>
            <rect x="18" y="28" width="60" height="8" />
            <rect x="18" y="44" width="60" height="8" />
            <rect x="18" y="60" width="60" height="8" />
          </g>
        )}
        {pattern === "sash" && (
          <path d="M12 82 L70 4 L86 18 L28 96 Z" fill={c2} opacity="0.94" />
        )}
        {/* ظل القماش */}
        <path d={KIT_BODY} fill={`url(#ksh-${sticker.id})`} />
      </g>

      {/* الياقة */}
      <path d="M36 11 L48 20 L60 11" fill="none" stroke={c2} strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 11 L48 20 L60 11" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" strokeLinejoin="round" />

      {/* رقم القميص */}
      {number !== undefined && (
        <text
          x="48"
          y="60"
          textAnchor="middle"
          fontSize="26"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          fill={pattern === "solid" ? numColor : numColor}
          stroke={numStroke}
          strokeWidth="0.8"
        >
          {number}
        </text>
      )}
    </svg>
  );
}

/* ============================================================
 *  فن الأعلام — أعلام رسمية بدقة (viewBox 96)
 * ============================================================ */

function FlagArt({ sticker }: { sticker: Sticker }) {
  const { flagStyle, c1 } = sticker;

  const inner = (() => {
    switch (flagStyle) {
      case "argentina":
        return (
          <>
            <rect x="8" y="18" width="80" height="60" fill="#74acdf" />
            <rect x="8" y="38" width="80" height="20" fill="#ffffff" />
            {/* شمس مايو */}
            <circle cx="48" cy="48" r="7.5" fill="#f6b40e" stroke="#85340a" strokeWidth="1.4" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i * Math.PI) / 6;
              const x1 = 48 + Math.cos(a) * 8.2;
              const y1 = 48 + Math.sin(a) * 8.2;
              const x2 = 48 + Math.cos(a) * 11.5;
              const y2 = 48 + Math.sin(a) * 11.5;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f6b40e" strokeWidth="1.6" strokeLinecap="round" />;
            })}
            <circle cx="48" cy="48" r="2" fill="#85340a" />
          </>
        );
      case "brazil":
        return (
          <>
            <rect x="8" y="18" width="80" height="60" fill="#009c3b" />
            <path d="M48 25 L82 48 L48 71 L14 48 Z" fill="#ffdf00" />
            <circle cx="48" cy="48" r="14" fill="#002776" />
            <path d="M35 44.5 Q48 40 61 47.5" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "france":
        return (
          <>
            <rect x="8" y="18" width="26.7" height="60" fill="#002395" />
            <rect x="34.7" y="18" width="26.6" height="60" fill="#ffffff" />
            <rect x="61.3" y="18" width="26.7" height="60" fill="#ed2939" />
          </>
        );
      case "morocco":
        return (
          <>
            <rect x="8" y="18" width="80" height="60" fill="#c1272d" />
            {/* نجمة خماسية خضراء مفرغة — النجمة الحقيقية */}
            <path
              d="M48 30 L51.5 41.5 L63.5 41.5 L53.8 48.7 L57.5 60.5 L48 53.2 L38.5 60.5 L42.2 48.7 L32.5 41.5 L44.5 41.5 Z"
              fill="none"
              stroke="#006233"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
          </>
        );
      case "germany":
        return (
          <>
            <rect x="8" y="18" width="80" height="20" fill="#111111" />
            <rect x="8" y="38" width="80" height="20" fill="#dd0000" />
            <rect x="8" y="58" width="80" height="20" fill="#ffce00" />
          </>
        );
      case "spain":
        return (
          <>
            <rect x="8" y="18" width="80" height="60" fill="#c60b1e" />
            <rect x="8" y="39" width="80" height="18" fill="#ffc400" />
            {/* شعار مبسط يسار الشريط */}
            <rect x="14" y="42" width="8" height="12" rx="1" fill="#ad1519" />
            <rect x="16" y="45" width="4" height="3" fill="#ffc400" />
          </>
        );
      default:
        return (
          <>
            <rect x="8" y="18" width="80" height="30" fill={c1} />
            <rect x="8" y="48" width="80" height="30" fill={c1} opacity="0.6" />
          </>
        );
    }
  })();

  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={`f-${sticker.id}`}>
          <rect x="8" y="18" width="80" height="60" rx="4" />
        </clipPath>
      </defs>
      <g clipPath={`url(#f-${sticker.id})`}>{inner}</g>
      {/* إطار العلم */}
      <rect x="8" y="18" width="80" height="60" rx="4" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
      {/* سارية صغيرة */}
      <rect x="4" y="14" width="3" height="70" rx="1.5" fill="rgba(0,0,0,0.28)" />
    </svg>
  );
}

/* ============================================================
 *  فن الشعارات — دروع أندية مميزة يدويًا (viewBox 96)
 * ============================================================ */

function BadgeArt({ sticker }: { sticker: Sticker }) {
  const { crestStyle, c1, c2 } = sticker;

  switch (crestStyle) {
    case "real":
      return (
        <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
          {/* الدرع */}
          <path d="M48 10 L80 20 V52 C80 68 68 80 48 88 C28 80 16 68 16 52 V20 Z" fill="#ffffff" stroke="#febe10" strokeWidth="3.5" />
          {/* القلعة/القلب الأزرق */}
          <path d="M30 46 L48 34 L66 46 L66 62 L48 74 L30 62 Z" fill="#00529f" />
          <path d="M38 56 Q48 48 58 56 L58 64 L48 70 L38 64 Z" fill="#ffffff" />
          {/* الشريط القُطري */}
          <path d="M16 22 L80 54" stroke="#febe10" strokeWidth="3" opacity="0.85" />
          {/* التاج */}
          <path d="M28 20 L28 9 L36 14 L43 5 L48 12 L53 5 L60 14 L68 9 L68 20 Z" fill="#febe10" stroke="#b8860b" strokeWidth="1.2" />
          <circle cx="48" cy="4" r="2.6" fill="#febe10" />
        </svg>
      );
    case "barca":
      return (
        <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
          <path d="M48 6 L84 16 V52 C84 68 70 82 48 90 C26 82 12 68 12 52 V16 Z" fill="#a50044" stroke="#ffd700" strokeWidth="2.8" />
          {/* سان جوردي — أعلى يسار */}
          <path d="M12 16 L48 6 V34 H12 Z" fill="#ffffff" />
          {[16, 24, 32].map((x) => (
            <rect key={x} x={x} y="9" width="4.5" height="25" fill="#ed2939" opacity="0.9" />
          ))}
          {/* بلاوقرانا — أعلى يمين */}
          <path d="M48 6 L84 16 V34 H48 Z" fill="#004d98" />
          {[54, 64, 74].map((x) => (
            <rect key={x} x={x} y="9" width="5.5" height="25" fill="#a50044" />
          ))}
          {/* الحزام الذهبي */}
          <rect x="12" y="34" width="72" height="9" fill="#ffd700" />
          {/* الكرة */}
          <circle cx="48" cy="62" r="16" fill="#004d98" />
          <path d="M48 46 A16 16 0 0 1 48 78 Z" fill="#a50044" />
          <circle cx="48" cy="62" r="16" fill="none" stroke="#ffd700" strokeWidth="2.4" />
        </svg>
      );
    case "united":
      return (
        <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
          <path d="M48 8 L78 17 V54 C78 69 66 80 48 88 C30 80 18 69 18 54 V17 Z" fill="#da291c" stroke="#fbe122" strokeWidth="3.5" />
          {/* الشيطان الأصفر */}
          <path
            d="M48 30 C42 30 39 34 39 39 C33 41 30 45 30 50 C30 56 34 60 40 61 C37 64 37 69 40 72 C43 75 48 75 51 72 C54 75 59 75 62 72 C65 69 65 64 62 61 C68 60 72 56 72 50 C72 45 69 41 63 39 C63 34 60 30 54 30 Z"
            fill="#fbe122"
            stroke="#8b0000"
            strokeWidth="1.4"
          />
          <path d="M36 32 L30 22 M68 32 L74 22" stroke="#fbe122" strokeWidth="3" strokeLinecap="round" />
          <circle cx="43" cy="46" r="2.4" fill="#da291c" />
          <circle cx="55" cy="46" r="2.4" fill="#da291c" />
          <path d="M28 22 H68" stroke="#fbe122" strokeWidth="2.6" />
          <path d="M28 76 H68" stroke="#fbe122" strokeWidth="2.6" />
        </svg>
      );
    case "bayern":
      return (
        <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
          <circle cx="48" cy="48" r="40" fill="#ffffff" stroke="#0066b2" strokeWidth="5" />
          <circle cx="48" cy="48" r="30" fill="#dc052d" />
          <circle cx="48" cy="48" r="19" fill="#0066b2" />
          {/* أطواق الراين */}
          <path d="M48 29 A19 19 0 0 1 67 48 L48 48 Z" fill="#ffffff" opacity="0.25" />
          <path d="M48 48 L67 48 A19 19 0 0 1 48 67 Z" fill="#ffffff" opacity="0.12" />
          {/* نجمة بايرن العلوية */}
          <path d="M48 2 L50.5 8 L57 8.6 L52 13 L53.5 19.5 L48 16 L42.5 19.5 L44 13 L39 8.6 L45.5 8 Z" fill="#0066b2" />
        </svg>
      );
    case "liverpool":
      return (
        <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
          <path d="M48 8 L78 17 V54 C78 69 66 80 48 88 C30 80 18 69 18 54 V17 Z" fill="#c8102e" stroke="#f6eb61" strokeWidth="3.2" />
          {/* طائر الليفر */}
          <path
            d="M48 30 C43 30 40 34 40 38 L32 41 L40 43.5 C39 48 41 52 45 54 L36 63 L45 61 L44 70 L48 62 L52 70 L51 61 L60 63 L51 54 C55 52 57 48 56 43.5 L64 41 L56 38 C56 34 53 30 48 30 Z"
            fill="#f6eb61"
            stroke="#8b0000"
            strokeWidth="1.2"
          />
          <circle cx="44" cy="37" r="1.8" fill="#8b0000" />
          <path d="M30 24 H66" stroke="#f6eb61" strokeWidth="2.6" />
        </svg>
      );
    case "hilal":
      return (
        <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
          <circle cx="48" cy="48" r="40" fill="#0b5ec4" stroke="#ffffff" strokeWidth="5" />
          <circle cx="48" cy="48" r="30" fill="#ffffff" opacity="0.1" />
          {/* الهلال */}
          <path d="M55 22 A28 28 0 1 0 55 74 A34 34 0 1 1 55 22 Z" fill="#ffffff" />
          {/* النجمة */}
          <path d="M62 34 L64.5 41.5 L72.5 41.5 L66 46.2 L68.5 54 L62 49.2 L55.5 54 L58 46.2 L51.5 41.5 L59.5 41.5 Z" fill="#ffffff" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
          <path d="M48 8 L78 17 V54 C78 69 66 80 48 88 C30 80 18 69 18 54 V17 Z" fill={c1} stroke={c2} strokeWidth="3.5" />
          <path d="M32 42 L48 30 L64 42 V58 L48 70 L32 58 Z" fill={c2} opacity="0.6" />
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
  lg: "w-48",
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

      {/* الفن — أكبر وأوضح: h-20 بدل h-14 */}
      <span className="relative flex h-20 w-20 items-center justify-center pt-1.5">
        <StickerArt
          sticker={sticker}
          className={cn("h-20 w-20 transition-opacity", locked && "opacity-35 grayscale")}
        />
        {locked && <Lock className="absolute size-4 text-ink/50 dark:text-white/50" />}
      </span>

      <span className={cn("max-w-full truncate text-[10px] font-black leading-tight", !owned && "opacity-40")}>
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
