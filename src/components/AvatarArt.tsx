/**
 * AvatarArt — أفاتارات كرة قدم مرسومة SVG (لا تعتمد على أي مصدر خارجي)
 * لكل أفاتار هوية بصرية كاملة: خلفية متدرجة + رمز مرسوم يدويًا بدقة.
 * تعمل بلا إنترنت، بلا جداول Supabase، بلا فشل — تظهر دائمًا.
 */

export interface AvatarDef {
  id: string;
  ar: string;
  en: string;
  /** خلفية متدرجة CSS */
  bg: string;
  /** XP المطلوب لفتحه */
  min_xp: number;
}

export const AVATARS: readonly AvatarDef[] = [
  { id: "ball", ar: "الكرة", en: "Ball", bg: "linear-gradient(135deg,#16a34a,#065f46)", min_xp: 0 },
  { id: "gloves", ar: "الحارس", en: "Keeper", bg: "linear-gradient(135deg,#0ea5e9,#1e40af)", min_xp: 0 },
  { id: "boot", ar: "ال収", en: "Boot", bg: "linear-gradient(135deg,#f59e0b,#b45309)", min_xp: 0 },
  { id: "captain", ar: "الكابتن", en: "Captain", bg: "linear-gradient(135deg,#ef4444,#991b1b)", min_xp: 100 },
  { id: "trophy", ar: "الكأس", en: "Trophy", bg: "linear-gradient(135deg,#eab308,#854d0e)", min_xp: 400 },
  { id: "crown", ar: "التاج", en: "Crown", bg: "linear-gradient(135deg,#a855f7,#6b21a8)", min_xp: 800 },
  { id: "legend", ar: "الأسطورة", en: "Legend", bg: "linear-gradient(135deg,#f43f5e,#881337)", min_xp: 1500 },
  { id: "golden", ar: "الذهبي", en: "Golden", bg: "linear-gradient(135deg,#fbbf24,#92400e)", min_xp: 3000 },
];

export function avatarDef(id: string | null | undefined): AvatarDef {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0]!;
}

export function avatarLabel(id: string | null | undefined, lang: "ar" | "en"): string {
  const def = avatarDef(id);
  return lang === "ar" ? def.ar : def.en;
}

/* ============================================================
 *  الرسومات — كل أفاتار SVG viewBox 64 مرسوم بدقة
 * ============================================================ */

function BallIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <circle cx="32" cy="32" r="22" fill="#ffffff" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
      {/* الخماسية المركزية */}
      <path d="M32 20l10.4 7.6-4 12.2H25.6l-4-12.2L32 20z" fill="#111827" />
      {/* الخماسيات المحيطة */}
      <path d="M32 10v10" stroke="#111827" strokeWidth="2.4" />
      <path d="M12.5 27.5l9.5 3.5" stroke="#111827" strokeWidth="2.4" />
      <path d="M51.5 27.5l-9.5 3.5" stroke="#111827" strokeWidth="2.4" />
      <path d="M20 53l5.5-9.5" stroke="#111827" strokeWidth="2.4" />
      <path d="M44 53l-5.5-9.5" stroke="#111827" strokeWidth="2.4" />
    </svg>
  );
}

function GlovesIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      {/* القفاز الأيسر */}
      <path
        d="M20 18c0-3 2-5 5-5s5 2 5 5v14c0 2-1 3-3 3h-4c-2 0-3-1-3-3V18z"
        fill="#f8fafc" stroke="#0c4a6e" strokeWidth="2"
      />
      <path d="M20 26l-5 3c-2 1-2 4 0 5l5 3" fill="#f8fafc" stroke="#0c4a6e" strokeWidth="2" />
      {/* القفاز الأيمن */}
      <path
        d="M34 18c0-3 2-5 5-5s5 2 5 5v14c0 2-1 3-3 3h-4c-2 0-3-1-3-3V18z"
        fill="#f8fafc" stroke="#0c4a6e" strokeWidth="2"
      />
      <path d="M44 26l5 3c2 1 2 4 0 5l-5 3" fill="#f8fafc" stroke="#0c4a6e" strokeWidth="2" />
      {/* خطوط المعصم */}
      <rect x="21" y="35" width="8" height="9" rx="2" fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="1.6" />
      <rect x="35" y="35" width="8" height="9" rx="2" fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="1.6" />
    </svg>
  );
}

function BootIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <path
        d="M12 38c0-2 1.6-3.6 3.6-3.6H26c6 0 9-4 13-4 6 0 12 4 13 10 .6 3.4-1.4 5.6-4.5 5.6H16c-2.4 0-4-1.8-4-4v-4z"
        fill="#fbbf24" stroke="#78350f" strokeWidth="2"
      />
      <path d="M12 44h40" stroke="#78350f" strokeWidth="2.4" />
      {/* النعل والمسامير */}
      <path d="M14 48h36" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 51v3M28 51v3M38 51v3M46 51v3" stroke="#1c1917" strokeWidth="2.4" strokeLinecap="round" />
      {/* الشرائط */}
      <path d="M22 34l6-2M26 36l6-2" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
      {/* وميض */}
      <path d="M47 22l1.8 3.6 3.9.5-2.9 2.7.7 3.9-3.5-1.9-3.5 1.9.7-3.9-2.9-2.7 3.9-.5L47 22z" fill="#fef08a" />
    </svg>
  );
}

function CaptainIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      {/* درع */}
      <path d="M32 8l20 6v18c0 12-8.5 20-20 24C20.5 52 12 44 12 32V14l20-6z" fill="#f8fafc" stroke="#7f1d1d" strokeWidth="2.4" />
      {/* شريط الكابتن */}
      <rect x="20" y="24" width="24" height="10" rx="2" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.6" />
      <path d="M23 29h18" stroke="#fecaca" strokeWidth="1.6" strokeDasharray="3 2.4" />
      {/* نجمة */}
      <path d="M32 38l2.2 4.4 4.9.7-3.5 3.4.8 4.9-4.4-2.3-4.4 2.3.8-4.9-3.5-3.4 4.9-.7L32 38z" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="av-tr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde047" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <path d="M20 12h24v12a12 12 0 01-24 0V12z" fill="url(#av-tr)" stroke="#78350f" strokeWidth="2.2" />
      <path d="M20 14h-8v4a9 9 0 009 9M44 14h8v4a9 9 0 01-9 9" stroke="#78350f" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M29 34h6v7h-6z" fill="#92400e" />
      <rect x="20" y="41" width="24" height="7" rx="2" fill="url(#av-tr)" stroke="#78350f" strokeWidth="2" />
      {/* لمعة */}
      <path d="M24 15c0 5 1 9 3 11" stroke="#fffbeb" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="av-cw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9d5ff" />
          <stop offset="1" stopColor="#7e22ce" />
        </linearGradient>
      </defs>
      <path d="M12 26l8 6 12-14 12 14 8-6-4 22H16l-4-22z" fill="url(#av-cw)" stroke="#581c87" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="14" y="48" width="36" height="6" rx="2" fill="#6b21a8" stroke="#581c87" strokeWidth="1.6" />
      {/* جواهر */}
      <circle cx="24" cy="36" r="2.4" fill="#f43f5e" />
      <circle cx="32" cy="36" r="2.4" fill="#22d3ee" />
      <circle cx="40" cy="36" r="2.4" fill="#4ade80" />
      <circle cx="12" cy="24" r="2.6" fill="#fbbf24" />
      <circle cx="52" cy="24" r="2.6" fill="#fbbf24" />
    </svg>
  );
}

function LegendIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="av-lg" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#fecdd3" />
          <stop offset="1" stopColor="#be123c" />
        </radialGradient>
      </defs>
      {/* لهب أسطوري */}
      <path
        d="M32 6c2 8-4 11-8 16-4 5-7 10-7 17a15 15 0 0030 0c0-6-2.5-11-6-15-1 3-3 5-5.5 6 1-9-1-18-3.5-24z"
        fill="url(#av-lg)" stroke="#881337" strokeWidth="2"
      />
      <path d="M32 58a8 8 0 01-8-8c0-4 2-6.5 4-8.5 1.5-1.5 3-3 4-5 4 3.5 8 8 8 13.5a8 8 0 01-8 8z" fill="#fda4af" opacity="0.95" />
      {/* نجمة داخل اللهب */}
      <path d="M32 40l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L32 40z" fill="#fff1f2" />
    </svg>
  );
}

function GoldenIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="av-gd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fef08a" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#92400e" />
        </linearGradient>
      </defs>
      {/* الكرة الذهبية */}
      <circle cx="32" cy="30" r="18" fill="url(#av-gd)" stroke="#78350f" strokeWidth="2.2" />
      <path d="M32 18l7.8 5.7-3 9.3H27.2l-3-9.3L32 18z" fill="#78350f" opacity="0.85" />
      <path d="M32 12v6M15.5 25l6.5 2.3M48.5 25L42 27.3M21 47l4-7M43 47l-4-7" stroke="#78350f" strokeWidth="1.8" />
      {/* قاعدة */}
      <rect x="24" y="48" width="16" height="5" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1.4" />
      {/* لمعات */}
      <path d="M22 20c-2 3-3 6-3 9" stroke="#fffbeb" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      <circle cx="24" cy="17" r="1.6" fill="#fffbeb" />
    </svg>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  ball: BallIcon,
  gloves: GlovesIcon,
  boot: BootIcon,
  captain: CaptainIcon,
  trophy: TrophyIcon,
  crown: CrownIcon,
  legend: LegendIcon,
  golden: GoldenIcon,
};

/** يرسم الأفاتار المطلوب — يرتد للكرة عند أي معرف غير معروف */
export function AvatarArt({ id, className }: { id: string | null | undefined; className?: string }) {
  const def = avatarDef(id);
  const Art = ART[def.id] ?? BallIcon;
  return (
    <div
      className={className}
      style={{ background: def.bg, borderRadius: "inherit" }}
    >
      <Art />
    </div>
  );
}
