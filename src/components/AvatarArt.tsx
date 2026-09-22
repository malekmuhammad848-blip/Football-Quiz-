/**
 * AvatarArt — أفاتار لاعب رسومي لطيف (وجه + ملامح + قميص)
 * أسلوب الشخصيات من Duolingo: رأس دائري بلون بشرة، عيون، ابتسامة،
 * شعر بلون مميز، وقميص أسفل. كل أفاتار شخصية مختلفة بالشعر والألوان.
 * يظهر دائمًا — بلا شبكة ولا جداول ولا فشل.
 */

export interface AvatarDef {
  id: string;
  ar: string;
  en: string;
  /** لون البشرة */
  skin: string;
  /** لون الشعر */
  hair: string;
  /** ألوان القميص [أساسي، ثانوي] */
  kit: [string, string];
  /** XP المطلوب لفتحه */
  min_xp: number;
}

export const AVATARS: readonly AvatarDef[] = [
  { id: "classic", ar: "اللاعب", en: "Striker", skin: "#f2c9a0", hair: "#3b2a1a", kit: ["#16a34a", "#ffffff"], min_xp: 0 },
  { id: "keeper", ar: "الحارس", en: "Keeper", skin: "#e8b98c", hair: "#111827", kit: ["#0ea5e9", "#0c4a6e"], min_xp: 0 },
  { id: "captain", ar: "الكابتن", en: "Captain", skin: "#c98d5e", hair: "#1f1210", kit: ["#dc2626", "#ffffff"], min_xp: 100 },
  { id: "golden", ar: "الذهبي", en: "Golden", skin: "#f2c9a0", hair: "#b45309", kit: ["#eab308", "#7c2d12"], min_xp: 400 },
  { id: "star", ar: "النجمة", en: "Star", skin: "#8d5a3a", hair: "#111111", kit: ["#a855f7", "#f3e8ff"], min_xp: 800 },
  { id: "legend", ar: "الأسطورة", en: "Legend", skin: "#e8b98c", hair: "#9ca3af", kit: ["#f43f5e", "#881337"], min_xp: 1500 },
  { id: "emperor", ar: "الإمبراطور", en: "Emperor", skin: "#f2c9a0", hair: "#111827", kit: ["#0f172a", "#fbbf24"], min_xp: 3000 },
];

export function avatarDef(id: string | null | undefined): AvatarDef {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0]!;
}

export function avatarLabel(id: string | null | undefined, lang: "ar" | "en"): string {
  const def = avatarDef(id);
  return lang === "ar" ? def.ar : def.en;
}

/* ============================================================
 *  الشخصية — وجه رسومي كامل (viewBox 64)
 *  خلفية دائرية ملوّنة + قميص + رأس + شعر + عيون + ابتسامة
 * ============================================================ */

function PlayerFace({ def }: { def: AvatarDef }) {
  const { skin, hair, kit } = def;
  const uid = `av-${def.id}`;

  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={kit[0]} />
          <stop offset="1" stopColor={kit[1]} stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={`${uid}-skin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skin} />
          <stop offset="1" stopColor={skin} stopOpacity="0.92" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>

      {/* الخلفية الدائرية */}
      <circle cx="32" cy="32" r="30" fill={`url(#${uid}-bg)`} />

      <g clipPath={`url(#${uid}-clip)`}>
        {/* القميص أسفل */}
        <path d="M10 64 Q10 46 22 44 L32 50 L42 44 Q54 46 54 64 Z" fill={kit[0]} />
        {/* ياقة القميص */}
        <path d="M22 44 L32 50 L42 44 L42 48 L32 54 L22 48 Z" fill={kit[1]} opacity="0.85" />

        {/* العنق */}
        <rect x="28" y="38" width="8" height="8" rx="3" fill={skin} />

        {/* الرأس */}
        <ellipse cx="32" cy="27" rx="13.5" ry="14" fill={`url(#${uid}-skin)`} />

        {/* الأذنان */}
        <circle cx="18.5" cy="28" r="3" fill={skin} />
        <circle cx="45.5" cy="28" r="3" fill={skin} />

        {/* الشعر */}
        <path
          d="M18.5 25 Q18 13 32 12.5 Q46 13 45.5 25 Q45.5 20.5 42 18.5 Q38 21 32 20.5 Q26 21 22 18.5 Q18.5 20.5 18.5 25 Z"
          fill={hair}
        />

        {/* العيون */}
        <ellipse cx="26.5" cy="28" rx="2.2" ry="2.6" fill="#1f2937" />
        <ellipse cx="37.5" cy="28" rx="2.2" ry="2.6" fill="#1f2937" />
        {/* لمعة العين */}
        <circle cx="27.2" cy="27.2" r="0.7" fill="#ffffff" />
        <circle cx="38.2" cy="27.2" r="0.7" fill="#ffffff" />
        {/* الحواجب */}
        <path d="M24 24.4 Q26.5 23.2 29 24.4" stroke={hair} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M35 24.4 Q37.5 23.2 40 24.4" stroke={hair} strokeWidth="1.4" strokeLinecap="round" fill="none" />

        {/* الأنف */}
        <path d="M32 30.5 Q31 33 32.6 33.4" stroke="rgba(0,0,0,0.28)" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* الابتسامة */}
        <path d="M27.5 36 Q32 40 36.5 36" stroke="#7c2d12" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* خدّان ورداويان خفيفان */}
        <circle cx="22.5" cy="33" r="2" fill="#f472b6" opacity="0.28" />
        <circle cx="41.5" cy="33" r="2" fill="#f472b6" opacity="0.28" />
      </g>

      {/* الحد الخارجي */}
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
    </svg>
  );
}

const ART: Record<string, React.JSX.Element> = {};

/** يرسم الأفاتار المطلوب — يرتد للاعب الكلاسيكي عند أي معرف غير معروف */
export function AvatarArt({ id, className }: { id: string | null | undefined; className?: string }) {
  const def = avatarDef(id);
  return (
    <div className={className} style={{ borderRadius: "inherit", background: "transparent" }}>
      <PlayerFace def={def} />
    </div>
  );
}

// منع TS من الشكوى على الخريطة الفارغة إن لم تُستخدم
void ART;
