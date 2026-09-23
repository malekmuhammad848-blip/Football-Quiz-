/**
 * VisualArt — مكتبة الفنون البصرية للأسئلة والكأس
 * - أعلام 16 منتخبًا مرسومة بدقة (خطوط حقيقية + شموس + دروع + كانطونات)
 * - أطقم 18 ناديًا ببنية قميص كاملة (ياقة + أكمام + أنماط + رقم)
 * - الشعارات تُفوَّض إلى مكتبة ClubCrests الواقعية
 * كل شيء SVG محلي بلا شبكة ولا صور خارجية.
 */

import type { ReactElement } from "react";
import { CREST_ART } from "./ClubCrests";

/* ============================================================
 *  الأعلام — بارامترية: خطوط + عناصر فوقية
 * ============================================================ */

interface Stripe {
  axis: "v" | "h";
  color: string;
  /** الحجم النسبي من 100 (أفقي) أو 76 (عمودي) */
  size: number;
}

interface FlagDef {
  /** لون الخلفية (للأعلام ذات العنصر المركزي) */
  bg?: string;
  stripes?: Stripe[];
  /** عناصر خاصة مرسومة فوق الخطوط (شمس، درع، صليب...) */
  overlay?: ReactElement;
}

const W = 100;
const H = 76;
const FX = 10;
const FY = 22;

function stripeShapes(stripes: Stripe[]): ReactElement[] {
  const out: ReactElement[] = [];
  let vOffset = 0;
  let hOffset = 0;
  for (const s of stripes) {
    if (s.axis === "v") {
      out.push(<rect key={`v${vOffset}`} x={FX + vOffset} y={FY} width={(s.size / 100) * W} height={H} fill={s.color} />);
      vOffset += (s.size / 100) * W;
    } else {
      out.push(<rect key={`h${hOffset}`} x={FX} y={FY + hOffset} width={W} height={(s.size / 76) * H} fill={s.color} />);
      hOffset += (s.size / 76) * H;
    }
  }
  return out;
}

/** شمس ذهبية بأشعة — للأرجنتين وأوروغواي */
function Sun({ cx, cy, r = 8 }: { cx: number; cy: number; r?: number }) {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * r}
        y1={cy + Math.sin(a) * r}
        x2={cx + Math.cos(a) * (r + 4)}
        y2={cy + Math.sin(a) * (r + 4)}
        stroke="#f6b40e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    );
  });
  return (
    <g>
      {rays}
      <circle cx={cx} cy={cy} r={r - 1.4} fill="#f6b40e" stroke="#85340a" strokeWidth="1.2" />
      <circle cx={cx - r / 3} cy={cy - 1} r="0.9" fill="#85340a" />
      <circle cx={cx + r / 3} cy={cy - 1} r="0.9" fill="#85340a" />
      <path d={`M${cx - 3} ${cy + 2.4} Q${cx} ${cy + 4.4} ${cx + 3} ${cy + 2.4}`} stroke="#85340a" strokeWidth="1" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** نجمة خماسية مصغرة */
function Star({ cx, cy, r, fill = "#ffffff" }: { cx: number; cy: number; r: number; fill?: string }) {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const b = a + Math.PI / 5;
    pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
    pts.push(`${cx + Math.cos(b) * (r * 0.42)},${cy + Math.sin(b) * (r * 0.42)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} />;
}

/** درع صغير — للبرتغال */
function MiniShield({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path d={`M${cx - 11} ${cy - 12} L${cx + 11} ${cy - 8} V${cy + 4} Q${cx + 11} ${cy + 10} ${cx} ${cy + 13} Q${cx - 11} ${cy + 10} ${cx - 11} ${cy + 4} Z`} fill="#da291c" stroke="#ffd700" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="5" fill="#ffffff" stroke="#046a38" strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r="2" fill="#da291c" />
    </g>
  );
}

/** لوح شطرنجي كرواتي */
function Checker({ x, y }: { x: number; y: number }) {
  const cells: ReactElement[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      cells.push(
        (r + c) % 2 === 0 ? (
          <rect key={`${r}${c}`} x={x + c * 5} y={y + r * 5} width="5" height="5" fill="#d00a2e" />
        ) : (
          <rect key={`${r}${c}`} x={x + c * 5} y={y + r * 5} width="5" height="5" fill="#ffffff" stroke="#d00a2e" strokeWidth="0.4" />
        ),
      );
    }
  }
  return (
    <g>
      {cells}
      <rect x={x - 1.2} y={y - 1.2} width={20 + 2.4} height={20 + 2.4} rx="2" fill="none" stroke="#d00a2e" strokeWidth="1.6" />
    </g>
  );
}

/** خنجر/آية مبسطة — السعودية (خط أبيض + سيف) */
function SaudiEmblem() {
  return (
    <g>
      <path d="M28 52 Q40 47 52 51 Q66 55 74 51" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M26 56 H64 L72 53.5 L70 57.5 L64 58.5 H26 Z" fill="#ffffff" />
    </g>
  );
}

export const FLAG_ART: Record<string, FlagDef> = {
  brazil: {
    bg: "#009c3b",
    overlay: (
      <g>
        <path d={`M${FX + W / 2} ${FY + 8} L${FX + W - 10} ${FY + H / 2} L${FX + W / 2} ${FY + H - 8} L${FX + 10} ${FY + H / 2} Z`} fill="#ffdf00" />
        <circle cx={FX + W / 2} cy={FY + H / 2} r="15" fill="#002776" />
        <path d={`M${FX + 34} ${FY + 33} Q${FX + W / 2} ${FY + 27} ${FX + 66} ${FY + 36}`} stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  argentina: {
    stripes: [
      { axis: "h", color: "#74acdf", size: 25.3 },
      { axis: "h", color: "#ffffff", size: 25.4 },
      { axis: "h", color: "#74acdf", size: 25.3 },
    ],
    overlay: <Sun cx={FX + W / 2} cy={FY + H / 2} r={8.5} />,
  },
  france: {
    stripes: [
      { axis: "v", color: "#002395", size: 33.3 },
      { axis: "v", color: "#ffffff", size: 33.4 },
      { axis: "v", color: "#ed2939", size: 33.3 },
    ],
  },
  england: {
    bg: "#ffffff",
    overlay: (
      <g>
        <rect x={FX + W / 2 - 8} y={FY} width="16" height={H} fill="#ce1124" />
        <rect x={FX} y={FY + H / 2 - 8} width={W} height="16" fill="#ce1124" />
      </g>
    ),
  },
  spain: {
    stripes: [
      { axis: "h", color: "#c60b1e", size: 25 },
      { axis: "h", color: "#ffc400", size: 50 },
      { axis: "h", color: "#c60b1e", size: 25 },
    ],
    overlay: (
      <g>
        <rect x={FX + 7} y={FY + H / 2 - 9} width="9" height="18" rx="1.5" fill="#ad1519" />
        <rect x={FX + 9.5} y={FY + H / 2 - 4} width="4.5" height="4" fill="#ffc400" />
      </g>
    ),
  },
  germany: {
    stripes: [
      { axis: "h", color: "#111111", size: 25.3 },
      { axis: "h", color: "#dd0000", size: 25.4 },
      { axis: "h", color: "#ffce00", size: 25.3 },
    ],
  },
  portugal: {
    stripes: [
      { axis: "v", color: "#046a38", size: 40 },
      { axis: "v", color: "#da291c", size: 60 },
    ],
    overlay: <MiniShield cx={FX + W * 0.4} cy={FY + H / 2} />,
  },
  netherlands: {
    stripes: [
      { axis: "h", color: "#ae1c28", size: 25.3 },
      { axis: "h", color: "#ffffff", size: 25.4 },
      { axis: "h", color: "#21468b", size: 25.3 },
    ],
  },
  italy: {
    stripes: [
      { axis: "v", color: "#008c45", size: 33.3 },
      { axis: "v", color: "#ffffff", size: 33.4 },
      { axis: "v", color: "#cd212a", size: 33.3 },
    ],
  },
  morocco: {
    bg: "#c1272d",
    overlay: (
      <path
        d={`M${FX + W / 2} ${FY + 16} L${FX + W / 2 + 4.5} ${FY + 30.5} L${FX + W / 2 + 19.5} ${FY + 30.5} L${FX + W / 2 + 7.3} ${FY + 39.5} L${FX + W / 2 + 12} ${FY + 54} L${FX + W / 2} ${FY + 45} L${FX + W / 2 - 12} ${FY + 54} L${FX + W / 2 - 7.3} ${FY + 39.5} L${FX + W / 2 - 19.5} ${FY + 30.5} L${FX + W / 2 - 4.5} ${FY + 30.5} Z`}
        fill="none"
        stroke="#006233"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
    ),
  },
  croatia: {
    stripes: [
      { axis: "h", color: "#ff0000", size: 25.3 },
      { axis: "h", color: "#ffffff", size: 25.4 },
      { axis: "h", color: "#171796", size: 25.3 },
    ],
    overlay: <Checker x={FX + 36} y={FY + 26} />,
  },
  uruguay: {
    bg: "#ffffff",
    overlay: (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={FX} y={FY + i * 19} width="56" height="9.5" fill="#0038a8" />
        ))}
        <rect x={FX} y={FY} width="38" height="28.5" fill="#ffffff" />
        <Sun cx={FX + 19} cy={FY + 14} r={7} />
      </g>
    ),
  },
  belgium: {
    stripes: [
      { axis: "v", color: "#000000", size: 33.3 },
      { axis: "v", color: "#fdda24", size: 33.4 },
      { axis: "v", color: "#ef3340", size: 33.3 },
    ],
  },
  japan: {
    bg: "#ffffff",
    overlay: (
      <g>
        <circle cx={FX + W / 2} cy={FY + H / 2} r="16" fill="#bc002d" />
        <circle cx={FX + W / 2} cy={FY + H / 2} r="16" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      </g>
    ),
  },
  saudi: {
    bg: "#006c35",
    overlay: <SaudiEmblem />,
  },
  usa: {
    bg: "#ffffff",
    overlay: (
      <g>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={FX} y={FY + i * 13} width={W} height="6.5" fill="#b22234" />
        ))}
        <rect x={FX} y={FY} width="44" height="33" fill="#3c3b6e" />
        {Array.from({ length: 12 }, (_, i) => (
          <Star key={i} cx={FX + 7 + (i % 4) * 10} cy={FY + 6 + Math.floor(i / 4) * 10} r={2.6} />
        ))}
      </g>
    ),
  },
  egypt: {
    stripes: [
      { axis: "h", color: "#ce1126", size: 25.3 },
      { axis: "h", color: "#ffffff", size: 25.4 },
      { axis: "h", color: "#000000", size: 25.3 },
    ],
    overlay: (
      <path
        d={`M${FX + W / 2 - 7} ${FY + H / 2 + 6} L${FX + W / 2 - 4} ${FY + H / 2 - 5} L${FX + W / 2} ${FY + H / 2 - 8} L${FX + W / 2 + 4} ${FY + H / 2 - 5} L${FX + W / 2 + 7} ${FY + H / 2 + 6} Z`}
        fill="#c09300"
      />
    ),
  },
  qatar: {
    bg: "#ffffff",
    overlay: (
      <g>
        <rect x={FX + 34} y={FY} width={W - 34} height={H} fill="#8d1b3d" />
        {/* التسنين الأبيض */}
        {Array.from({ length: 9 }, (_, i) => {
          const y = FY + i * (H / 9);
          return <path key={i} d={`M${FX + 34} ${y} L${FX + 26} ${y + H / 18} L${FX + 34} ${y + H / 9} Z`} fill="#ffffff" />;
        })}
      </g>
    ),
  },
};

/** معرفات الكأس القصيرة → أعلام */
const CUP_FLAG_REF: Record<string, string> = {
  br: "brazil", ar: "argentina", fr: "france", en: "england",
  es: "spain", de: "germany", pt: "portugal", nl: "netherlands",
  it: "italy", ma: "morocco", be: "belgium", hr: "croatia",
  uy: "uruguay", sa: "saudi", jp: "japan", us: "usa",
};

/** رسم علم كامل بإطار وسارية داخل viewBox 120×120 */
export function FlagByRef({ ref: flagRef, className }: { ref: string; className?: string }) {
  const key = CUP_FLAG_REF[flagRef] ?? flagRef;
  const def = FLAG_ART[key];
  return (
    <svg viewBox="0 0 120 120" className={className ?? "h-full w-full"} aria-hidden>
      <defs>
        <clipPath id={`vf-${key}`}>
          <rect x={FX} y={FY} width={W} height={H} rx="5" />
        </clipPath>
        <linearGradient id={`vfg-${key}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#vf-${key})`}>
        <rect x={FX} y={FY} width={W} height={H} fill={def?.bg ?? "#94a3b8"} />
        {def?.stripes ? stripeShapes(def.stripes) : null}
        {def?.overlay}
        <rect x={FX} y={FY} width={W} height={H} fill={`url(#vfg-${key})`} />
      </g>
      <rect x={FX} y={FY} width={W} height={H} rx="5" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="2.4" />
      <circle cx="6.8" cy="13" r="4" fill="#d4af37" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <rect x="5" y="16" width="3.6" height="88" rx="1.8" fill="rgba(0,0,0,0.3)" />
    </svg>
  );
}

/* ============================================================
 *  الأطقم — بنية قميص كاملة بارامترية
 * ============================================================ */

export interface KitDef {
  c1: string;
  c2: string;
  pattern: "solid" | "stripes" | "hoops" | "sash";
  number?: number;
  /** شارة صدر: مفتاح شعار من CREST_ART أو لون */
  crest?: string;
}

export const KIT_ART: Record<string, KitDef> = {
  "real-kit": { c1: "#ffffff", c2: "#febe10", pattern: "solid", number: 7, crest: "real" },
  "barca-kit": { c1: "#a50044", c2: "#004d98", pattern: "stripes", number: 10, crest: "barca" },
  "atleti-kit": { c1: "#ffffff", c2: "#cb3524", pattern: "stripes", number: 9, crest: "atletico" },
  "united-kit": { c1: "#da291c", c2: "#fbe122", pattern: "solid", number: 7, crest: "united" },
  "city-kit": { c1: "#6cabdd", c2: "#ffffff", pattern: "solid", number: 17, crest: "city" },
  "liverpool-kit": { c1: "#c8102e", c2: "#00b2a9", pattern: "solid", number: 11, crest: "liverpool" },
  "arsenal-kit": { c1: "#ef0107", c2: "#ffffff", pattern: "solid", number: 7, crest: "arsenal" },
  "chelsea-kit": { c1: "#034694", c2: "#ffffff", pattern: "solid", number: 8, crest: "chelsea" },
  "bayern-kit": { c1: "#dc052d", c2: "#ffffff", pattern: "solid", number: 9, crest: "bayern" },
  "dortmund-kit": { c1: "#fde100", c2: "#111111", pattern: "stripes", number: 9, crest: "dortmund" },
  "flamengo-kit": { c1: "#c52613", c2: "#111111", pattern: "hoops", number: 10, crest: "flamengo" },
  "juve-kit": { c1: "#ffffff", c2: "#111111", pattern: "stripes", number: 10, crest: "juventus" },
  "milan-kit": { c1: "#b01c2e", c2: "#111111", pattern: "stripes", number: 10, crest: "milan" },
  "inter-kit": { c1: "#1a2f6e", c2: "#111111", pattern: "stripes", number: 9, crest: "inter" },
  "psg-kit": { c1: "#004170", c2: "#da291c", pattern: "sash", number: 7, crest: "psg" },
  "boca-kit": { c1: "#103f79", c2: "#ffdc26", pattern: "sash", number: 10, crest: "boca" },
  "ahly-kit": { c1: "#d42a2a", c2: "#ffffff", pattern: "solid", number: 9, crest: "ahly" },
  "hilal-kit": { c1: "#0b5ec4", c2: "#ffffff", pattern: "solid", number: 9 },
  "argentina-kit": { c1: "#75aadb", c2: "#ffffff", pattern: "stripes", number: 10 },
  "brazil-kit": { c1: "#ffdc26", c2: "#1d9e4b", pattern: "solid", number: 10 },
  "morocco-kit": { c1: "#b01c2e", c2: "#0b6e4f", pattern: "sash", number: 7 },
};

const KIT_BODY = "M28 22 L44 14 L76 14 L92 22 L92 96 Q92 101 87 101 L33 101 Q28 101 28 96 Z";

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

/** رسم قميص كامل — يُستخدم للأسئلة البصرية والملصقات */
export function KitByRef({ kit, className }: { kit: KitDef; className?: string }) {
  const { c1, c2, pattern, number, crest } = kit;
  const numColor = isLight(c1) ? "#1e293b" : "#ffffff";
  const uid = `vk-${c1}${c2}${pattern}${number ?? ""}`.replace(/[^a-zA-Z0-9]/g, "");
  const CrestComp = crest ? CREST_ART[crest] : undefined;

  return (
    <svg viewBox="0 0 120 120" className={className ?? "h-full w-full"} aria-hidden>
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

      {/* الأكمام */}
      <path d="M28 22 L8 32 L18 50 L30 44 Z" fill={c2} stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" />
      <path d="M92 22 L112 32 L102 50 L90 44 Z" fill={c2} stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" />
      <path d="M8 32 L18 50" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" />
      <path d="M112 32 L102 50" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" />

      {/* الجسم */}
      <path d={KIT_BODY} fill={c1} stroke="rgba(0,0,0,0.25)" strokeWidth="1.6" />

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
        <path d={KIT_BODY} fill={`url(#${uid}-sh)`} />
      </g>

      {/* الياقة */}
      <path d="M44 14 L60 26 L76 14" fill="none" stroke={c2} strokeWidth="4" strokeLinejoin="round" />
      <path d="M44 14 L60 26 L76 14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinejoin="round" />

      {/* الرقم */}
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

      {/* شعار الصدر — كبير وواضح */}
      {CrestComp ? (
        <g transform="translate(40 25) scale(0.17)">
          <CrestComp />
        </g>
      ) : (
        <rect x="40" y="30" width="7" height="7" rx="1.4" fill={c2} stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
      )}
      {/* لمعة صانع الملابس */}
      <circle cx="82" cy="33.5" r="3.4" fill={c2} stroke="rgba(0,0,0,0.2)" strokeWidth="0.7" />
    </svg>
  );
}

/* ============================================================
 *  البوابة الموحدة: kind + ref
 * ============================================================ */

export interface VisualSpec {
  kind: "kit" | "flag" | "badge";
  ref: string;
}

/** شارة نادٍ بمقاس 120 من مكتبة ClubCrests */
function BadgeByRef({ badgeRef, className }: { badgeRef: string; className?: string }) {
  const Comp = CREST_ART[badgeRef];
  if (!Comp) {
    return (
      <svg viewBox="0 0 120 120" className={className ?? "h-full w-full"} aria-hidden>
        <path d="M60 10 L98 21 V68 C98 87 82 100 60 110 C38 100 22 87 22 68 V21 Z" fill="#475569" stroke="#94a3b8" strokeWidth="4" />
      </svg>
    );
  }
  return (
    <div className={className}>
      <Comp />
    </div>
  );
}

/** يعرض أي فن بصري بالمواصفة الموحدة */
export function VisualArt({ spec, className }: { spec: VisualSpec; className?: string }) {
  if (spec.kind === "flag") return <FlagByRef ref={spec.ref} className={className} />;
  if (spec.kind === "kit") {
    const kit = KIT_ART[spec.ref];
    return kit ? <KitByRef kit={kit} className={className} /> : null;
  }
  return <BadgeByRef badgeRef={spec.ref} className={className} />;
}
