/**
 * StickerCard — بطاقات ملصقات بأسلوب FIFA Ultimate Team
 * فن SVG يدوي عالي الدقة (viewBox 120) — أطقم بأرقام وأكمام وياقة حقيقية،
 * أعلام رسمية بدقتها، شعارات أندية مميزة. مقاس موحّد في كل الأماكن.
 */

import { Lock } from "lucide-react";
import { STICKERS, type Rarity, type Sticker } from "../domain/season";
import { cn } from "../utils/cn";

const RARITY_FRAME: Record<
  Rarity,
  { border: string; glow: string; label: string; grad: string }
> = {
  common: {
    border: "#94a3b8",
    glow: "none",
    label: "#64748b",
    grad: "linear-gradient(160deg,#eef2f7,#cbd5e1)",
  },
  rare: {
    border: "#38bdf8",
    glow: "0 0 16px rgba(56,189,248,0.45)",
    label: "#0369a1",
    grad: "linear-gradient(160deg,#e0f2fe,#bae6fd)",
  },
  epic: {
    border: "#a855f7",
    glow: "0 0 18px rgba(168,85,247,0.5)",
    label: "#7e22ce",
    grad: "linear-gradient(160deg,#f3e8ff,#e9d5ff)",
  },
  legendary: {
    border: "#fbbf24",
    glow: "0 0 20px rgba(251,191,36,0.6)",
    label: "#b45309",
    grad: "linear-gradient(160deg,#fef3c7,#fde68a)",
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
 *  فن القميص — قميص واقعي (viewBox 120)
 * ============================================================ */

/** مسار جسم القميص: كتفان + جسم يتسع للياقة والرقم */
const KIT_BODY =
  "M28 22 L44 14 L76 14 L92 22 L92 96 Q92 101 87 101 L33 101 Q28 101 28 96 Z";

function KitArt({ sticker }: { sticker: Sticker }) {
  const { c1, c2, pattern = "solid", number } = sticker;
  const uid = `k${sticker.id}`;
  const numColor = isLight(c1) ? "#1e293b" : "#ffffff";

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={`${uid}-clip`}>
          <path d={KIT_BODY} />
        </clipPath>
        <linearGradient id={`${uid}-sh`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* الأكمام — أوسع وأوضح */}
      <path d="M28 22 L8 32 L18 50 L30 44 Z" fill={c2} stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" />
      <path d="M92 22 L112 32 L102 50 L90 44 Z" fill={c2} stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" />
      {/* حافة الكم */}
      <path d="M8 32 L18 50" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" />
      <path d="M112 32 L102 50" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" />

      {/* الجسم */}
      <path d={KIT_BODY} fill={c1} stroke="rgba(0,0,0,0.25)" strokeWidth="1.6" />

      {/* الأنماط داخل القص */}
      <g clipPath={`url(#${uid}-clip)`}>
        {pattern === "stripes" && (
          <g fill={c2}>
            <rect x="36" y="10" width="9" height="95" />
            <rect x="56" y="10" width="9" height="95" />
            <rect x="76" y="10" width="9" height="95" />
          </g>
        )}
        {pattern === "hoops" && (
          <g fill={c2}>
            <rect x="24" y="34" width="72" height="10" />
            <rect x="24" y="56" width="72" height="10" />
            <rect x="24" y="78" width="72" height="10" />
          </g>
        )}
        {pattern === "sash" && <path d="M16 106 L86 6 L108 24 L38 124 Z" fill={c2} opacity="0.95" />}
        {/* ظل القماش */}
        <path d={KIT_BODY} fill={`url(#${uid}-sh)`} />
      </g>

      {/* الياقة V */}
      <path d="M44 14 L60 26 L76 14" fill="none" stroke={c2} strokeWidth="4" strokeLinejoin="round" />
      <path d="M44 14 L60 26 L76 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinejoin="round" />

      {/* الرقم — كبير وواضح */}
      {number !== undefined && (
        <text
          x="60"
          y="76"
          textAnchor="middle"
          fontSize="34"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          fill={numColor}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1"
        >
          {number}
        </text>
      )}
    </svg>
  );
}

/* ============================================================
 *  فن الأعلام — أعلام رسمية (viewBox 120)
 * ============================================================ */

function FlagArt({ sticker }: { sticker: Sticker }) {
  const { flagStyle, c1 } = sticker;

  const inner = (() => {
    switch (flagStyle) {
      case "argentina":
        return (
          <>
            <rect x="10" y="22" width="100" height="76" fill="#74acdf" />
            <rect x="10" y="48" width="100" height="24" fill="#ffffff" />
            <circle cx="60" cy="60" r="9" fill="#f6b40e" stroke="#85340a" strokeWidth="1.6" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i * Math.PI) / 6;
              return (
                <line
                  key={i}
                  x1={60 + Math.cos(a) * 10}
                  y1={60 + Math.sin(a) * 10}
                  x2={60 + Math.cos(a) * 14}
                  y2={60 + Math.sin(a) * 14}
                  stroke="#f6b40e"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx="60" cy="60" r="2.4" fill="#85340a" />
          </>
        );
      case "brazil":
        return (
          <>
            <rect x="10" y="22" width="100" height="76" fill="#009c3b" />
            <path d="M60 32 L102 60 L60 88 L18 60 Z" fill="#ffdf00" />
            <circle cx="60" cy="60" r="17" fill="#002776" />
            <path d="M44 56 Q60 50 76 59" stroke="#ffffff" strokeWidth="3.6" fill="none" strokeLinecap="round" />
          </>
        );
      case "france":
        return (
          <>
            <rect x="10" y="22" width="33.3" height="76" fill="#002395" />
            <rect x="43.3" y="22" width="33.4" height="76" fill="#ffffff" />
            <rect x="76.7" y="22" width="33.3" height="76" fill="#ed2939" />
          </>
        );
      case "morocco":
        return (
          <>
            <rect x="10" y="22" width="100" height="76" fill="#c1272d" />
            <path
              d="M60 38 L64.5 52.5 L79.5 52.5 L67.3 61.5 L72 76 L60 67 L48 76 L52.7 61.5 L40.5 52.5 L55.5 52.5 Z"
              fill="none"
              stroke="#006233"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
          </>
        );
      case "germany":
        return (
          <>
            <rect x="10" y="22" width="100" height="25.3" fill="#111111" />
            <rect x="10" y="47.3" width="100" height="25.4" fill="#dd0000" />
            <rect x="10" y="72.7" width="100" height="25.3" fill="#ffce00" />
          </>
        );
      case "spain":
        return (
          <>
            <rect x="10" y="22" width="100" height="76" fill="#c60b1e" />
            <rect x="10" y="48" width="100" height="24" fill="#ffc400" />
            <rect x="17" y="51" width="10" height="18" rx="1.5" fill="#ad1519" />
            <rect x="19.5" y="55" width="5" height="4" fill="#ffc400" />
          </>
        );
      default:
        return (
          <>
            <rect x="10" y="22" width="100" height="38" fill={c1} />
            <rect x="10" y="60" width="100" height="38" fill={c1} opacity="0.6" />
          </>
        );
    }
  })();

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={`f-${sticker.id}`}>
          <rect x="10" y="22" width="100" height="76" rx="5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#f-${sticker.id})`}>{inner}</g>
      <rect x="10" y="22" width="100" height="76" rx="5" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2.4" />
      <rect x="5" y="16" width="3.6" height="88" rx="1.8" fill="rgba(0,0,0,0.3)" />
    </svg>
  );
}

/* ============================================================
 *  فن الشعارات — دروع أندية (viewBox 120)
 * ============================================================ */

function BadgeArt({ sticker }: { sticker: Sticker }) {
  const { crestStyle, c1, c2 } = sticker;

  switch (crestStyle) {
    case "real":
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
          <path d="M60 12 L100 24 V66 C100 86 85 100 60 110 C35 100 20 86 20 66 V24 Z" fill="#ffffff" stroke="#febe10" strokeWidth="4.5" />
          <path d="M38 58 L60 42 L82 58 L82 78 L60 92 L38 78 Z" fill="#00529f" />
          <path d="M48 70 Q60 60 72 70 L72 80 L60 88 L48 80 Z" fill="#ffffff" />
          <path d="M20 27 L100 68" stroke="#febe10" strokeWidth="4" opacity="0.85" />
          <path d="M34 24 L34 10 L44 17 L53 5 L60 14 L67 5 L76 17 L86 10 L86 24 Z" fill="#febe10" stroke="#b8860b" strokeWidth="1.6" />
          <circle cx="60" cy="4" r="3.2" fill="#febe10" />
        </svg>
      );
    case "barca":
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
          <path d="M60 7 L105 20 V66 C105 86 88 103 60 112 C32 103 15 86 15 66 V20 Z" fill="#a50044" stroke="#ffd700" strokeWidth="3.6" />
          {/* سان جوردي */}
          <path d="M15 20 L60 7 V42 H15 Z" fill="#ffffff" />
          {[20, 30, 40, 50].map((x) => (
            <rect key={x} x={x} y="11" width="5.5" height="31" fill="#ed2939" opacity="0.9" />
          ))}
          {/* بلاوقرانا */}
          <path d="M60 7 L105 20 V42 H60 Z" fill="#004d98" />
          {[68, 79, 90].map((x) => (
            <rect key={x} x={x} y="12" width="7" height="30" fill="#a50044" />
          ))}
          {/* الحزام الذهبي */}
          <rect x="15" y="42" width="90" height="12" fill="#ffd700" />
          {/* الكرة */}
          <circle cx="60" cy="78" r="20" fill="#004d98" />
          <path d="M60 58 A20 20 0 0 1 60 98 Z" fill="#a50044" />
          <circle cx="60" cy="78" r="20" fill="none" stroke="#ffd700" strokeWidth="3" />
        </svg>
      );
    case "united":
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
          <path d="M60 10 L98 21 V68 C98 87 82 100 60 110 C38 100 22 87 22 68 V21 Z" fill="#da291c" stroke="#fbe122" strokeWidth="4.5" />
          <path
            d="M60 38 C53 38 49 43 49 49 C41 51 37 56 37 62 C37 70 42 75 49 76 C45 80 45 86 49 90 C53 94 60 94 64 90 C68 94 75 94 79 90 C83 86 83 80 79 76 C86 75 91 70 91 62 C91 56 87 51 79 49 C79 43 75 38 68 38 Z"
            fill="#fbe122"
            stroke="#8b0000"
            strokeWidth="1.8"
          />
          <path d="M45 41 L37 28 M83 41 L91 28" stroke="#fbe122" strokeWidth="4" strokeLinecap="round" />
          <circle cx="54" cy="58" r="3" fill="#da291c" />
          <circle cx="70" cy="58" r="3" fill="#da291c" />
          <path d="M34 27 H94" stroke="#fbe122" strokeWidth="3.4" />
          <path d="M34 96 H94" stroke="#fbe122" strokeWidth="3.4" />
        </svg>
      );
    case "bayern":
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
          <circle cx="60" cy="60" r="50" fill="#ffffff" stroke="#0066b2" strokeWidth="6.5" />
          <circle cx="60" cy="60" r="38" fill="#dc052d" />
          <circle cx="60" cy="60" r="24" fill="#0066b2" />
          <path d="M60 36 A24 24 0 0 1 84 60 L60 60 Z" fill="#ffffff" opacity="0.3" />
          <path d="M60 60 L84 60 A24 24 0 0 1 60 84 Z" fill="#ffffff" opacity="0.15" />
          <path d="M60 2 L63 10 L71.5 10.8 L65 16.4 L67 25 L60 20.5 L53 25 L55 16.4 L48.5 10.8 L57 10 Z" fill="#0066b2" />
        </svg>
      );
    case "liverpool":
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
          <path d="M60 10 L98 21 V68 C98 87 82 100 60 110 C38 100 22 87 22 68 V21 Z" fill="#c8102e" stroke="#f6eb61" strokeWidth="4.2" />
          <path
            d="M60 38 C54 38 50 43 50 48 L39 52 L50 55 C49 61 51.5 66 56.5 68 L44 80 L56 77.5 L54.5 89 L60 78.5 L65.5 89 L64 77.5 L76 80 L63.5 68 C68.5 66 71 61 70 55 L81 52 L70 48 C70 43 66 38 60 38 Z"
            fill="#f6eb61"
            stroke="#8b0000"
            strokeWidth="1.5"
          />
          <circle cx="55" cy="46.5" r="2.3" fill="#8b0000" />
          <path d="M36 30 H84" stroke="#f6eb61" strokeWidth="3.4" />
        </svg>
      );
    case "hilal":
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
          <circle cx="60" cy="60" r="50" fill="#0b5ec4" stroke="#ffffff" strokeWidth="6.5" />
          <circle cx="60" cy="60" r="38" fill="#ffffff" opacity="0.12" />
          <path d="M69 26 A36 36 0 1 0 69 94 A44 44 0 1 1 69 26 Z" fill="#ffffff" />
          <path d="M78 42 L81.5 52 L92 52 L83.5 58.5 L86.5 69 L78 62.5 L69.5 69 L72.5 58.5 L64 52 L74.5 52 Z" fill="#ffffff" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
          <path d="M60 10 L98 21 V68 C98 87 82 100 60 110 C38 100 22 87 22 68 V21 Z" fill={c1} stroke={c2} strokeWidth="4.5" />
          <path d="M40 54 L60 38 L80 54 V76 L60 90 L40 76 Z" fill={c2} opacity="0.6" />
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
  copies?: number;
  locked?: boolean;
  onClick?: () => void;
}

export function StickerCard({ sticker, copies = 0, locked = false, onClick }: Props) {
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
        "relative flex w-full flex-col items-center gap-1.5 rounded-2xl border-2 p-2.5 pb-2 pt-4 text-center transition-transform active:scale-95",
        owned ? "" : "border-line bg-ink/5 dark:bg-white/5",
        locked && "opacity-45 grayscale",
      )}
    >
      <span
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: owned ? fr.border : "#cbd5e1" }}
      />

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

      {/* الفن — مربع متساوي الأبعاد يملأ العرض */}
      <span className="relative flex aspect-square w-full items-center justify-center">
        <StickerArt
          sticker={sticker}
          className={cn("aspect-square w-full transition-opacity", locked && "opacity-35 grayscale")}
        />
        {locked && <Lock className="absolute size-5 text-ink/50 dark:text-white/50" />}
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
