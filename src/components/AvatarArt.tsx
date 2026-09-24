/**
 * AvatarArt — 7 شخصيات كرتونية، **كل شخصية مختلفة جذريًا**
 * اللاعب: شعر منعش وقميص أخضر · الحارس: قفازات مرفوعة وقلنسوة
 * الكابتن: قبعة وشريط كابتن · الذهبي: نظارة ذهبية وشعر مصفف
 * النجمة: نجمة شعر وصمّام أذن · الأسطورة: لحية بيضاء وسوار
 * الإمبراطور: تاج ذهبي وعباءة فخمة. تعبيرات وألوان فريدة لكل واحدة.
 *
 * إصلاح عيوب الصورة: كل نسخة SVG تستخدم معرّفات فريدة عبر useId —
 * سابقًا كانت المعرّفات ثابتة (av-bg…) فتتعارض النسخ المتزامنة
 * (بروفايل + ورقة التخصيص معًا) فيتلفت التدرج/القص وتظهر صورة تالفة.
 */

import { memo, useId, type ComponentType } from "react";

export interface AvatarDef {
  id: string;
  ar: string;
  en: string;
  skin: string;
  hair: string;
  kit: [string, string];
  min_xp: number;
}

export const AVATARS: readonly AvatarDef[] = [
  { id: "classic", ar: "اللاعب", en: "Striker", skin: "#f2c9a0", hair: "#3b2a1a", kit: ["#16a34a", "#ffffff"], min_xp: 0 },
  { id: "keeper", ar: "الحارس", en: "Keeper", skin: "#e8b98c", hair: "#111827", kit: ["#0ea5e9", "#0c4a6e"], min_xp: 0 },
  { id: "captain", ar: "الكابتن", en: "Captain", skin: "#c98d5e", hair: "#1f1210", kit: ["#dc2626", "#ffffff"], min_xp: 100 },
  { id: "golden", ar: "الذهبي", en: "Golden", skin: "#f2c9a0", hair: "#b45309", kit: ["#eab308", "#7c2d12"], min_xp: 400 },
  { id: "star", ar: "النجمة", en: "Star", skin: "#8d5a3a", hair: "#111111", kit: ["#a855f7", "#f3e8ff"], min_xp: 800 },
  { id: "legend", ar: "الأسطورة", en: "Legend", skin: "#e8b98c", hair: "#e5e7eb", kit: ["#f43f5e", "#881337"], min_xp: 1500 },
  { id: "emperor", ar: "الإمبراطور", en: "Emperor", skin: "#d9a066", hair: "#18181b", kit: ["#0f172a", "#fbbf24"], min_xp: 3000 },
];

/** معرّفات الكطالوج القديم — تُطابَق بأقرب شخصية حتى لا يفقد المستخدمون اختيارهم */
const LEGACY_MAP: Record<string, string> = {
  ball: "classic",
  gloves: "keeper",
  boot: "classic",
  whistle: "captain",
  crown: "emperor",
  trophy: "golden",
  star: "star",
};

/** يطبّع المعرف: معروف مباشرة، قديم يُترجم، غير معروف يرتد للاعب */
export function normalizeAvatarId(id: string | null | undefined): string {
  if (!id) return AVATARS[0]!.id;
  if (AVATARS.some((a) => a.id === id)) return id;
  return LEGACY_MAP[id] ?? AVATARS[0]!.id;
}

export function avatarDef(id: string | null | undefined): AvatarDef {
  const norm = normalizeAvatarId(id);
  return AVATARS.find((a) => a.id === norm) ?? AVATARS[0]!;
}

export function avatarLabel(id: string | null | undefined, lang: "ar" | "en"): string {
  const def = avatarDef(id);
  return lang === "ar" ? def.ar : def.en;
}

/* ============================================================
 *  الشخصيات — كل واحدة مرسومة مستقلة بالكامل (viewBox 64)
 *  كل المعرّفات لاحقة بـ uid فريد لكل نسخة مثبتة
 * ============================================================ */

/** اللاعب — شعر منعش بعروق وابتسامة عريضة وقميص أخضر بياقة */
const StrikerFace = memo(function StrikerFace() {
  const u = useId();
  const bg = `av-bg-${u}`;
  const clip = `av-c-${u}`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clip}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34d399" /><stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${bg})`} />
      <g clipPath={`url(#${clip})`}>
        <path d="M10 64 Q10 46 22 44 L32 50 L42 44 Q54 46 54 64 Z" fill="#16a34a" />
        <path d="M22 44 L32 50 L42 44 L42 49 L32 55 L22 49 Z" fill="#ffffff" opacity="0.9" />
        {/* شعر منعش بأعراف */}
        <path d="M18 26 Q17 12 32 11.5 Q47 12 46 26 Q46 20 41 17 Q38 20 32 19.5 Q26 20 23 17 Q18 20 18 26 Z" fill="#3b2a1a" />
        <path d="M22 14 L20 10 M27 12.5 L26 8 M33 12 L34 8 M39 12.5 L41 9" stroke="#3b2a1a" strokeWidth="2.4" strokeLinecap="round" />
        <ellipse cx="32" cy="28" rx="13" ry="13.5" fill="#f2c9a0" />
        <circle cx="19" cy="28" r="2.8" fill="#f2c9a0" /><circle cx="45" cy="28" r="2.8" fill="#f2c9a0" />
        {/* عيون مبهجة */}
        <ellipse cx="26.5" cy="28" rx="2.4" ry="2.8" fill="#1f2937" /><ellipse cx="37.5" cy="28" rx="2.4" ry="2.8" fill="#1f2937" />
        <circle cx="27.3" cy="27" r="0.8" fill="#fff" /><circle cx="38.3" cy="27" r="0.8" fill="#fff" />
        <path d="M23.5 24.5 Q26.5 23 29.5 24.5" stroke="#3b2a1a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M34.5 24.5 Q37.5 23 40.5 24.5" stroke="#3b2a1a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* ابتسامة عريضة بأسنان */}
        <path d="M26.5 34.5 Q32 40.5 37.5 34.5 Q32 37 26.5 34.5 Z" fill="#7f1d1d" />
        <path d="M27.5 35.2 Q32 39.5 36.5 35.2 L36.3 36.5 Q32 40 27.7 36.5 Z" fill="#ffffff" />
        <circle cx="22" cy="32.5" r="2.2" fill="#fb7185" opacity="0.4" /><circle cx="42" cy="32.5" r="2.2" fill="#fb7185" opacity="0.4" />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    </svg>
  );
});

/** الحارس — قلنسوة كابوش + قفازان مرفوعان جانب الوجه + نظارة رياضية */
const KeeperFace = memo(function KeeperFace() {
  const u = useId();
  const bg = `kp-bg-${u}`;
  const clip = `kp-c-${u}`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clip}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38bdf8" /><stop offset="1" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${bg})`} />
      <g clipPath={`url(#${clip})`}>
        <path d="M10 64 Q10 47 24 45 L32 50 L40 45 Q54 47 54 64 Z" fill="#0ea5e9" />
        {/* خطوط القميص */}
        <path d="M16 52 H48 M14 58 H50" stroke="#e0f2fe" strokeWidth="2.4" opacity="0.6" />
        {/* القفاز الأيسر مرفوع */}
        <g transform="translate(13,30) rotate(-18)">
          <rect x="-4" y="-7" width="8" height="14" rx="3.4" fill="#f8fafc" stroke="#0c4a6e" strokeWidth="1.6" />
          <path d="M-4 -3 L-8 -1 Q-10 0.5 -8 2.5 L-4 4" fill="#f8fafc" stroke="#0c4a6e" strokeWidth="1.4" />
        </g>
        {/* القفاز الأيمن مرفوع */}
        <g transform="translate(51,30) rotate(18)">
          <rect x="-4" y="-7" width="8" height="14" rx="3.4" fill="#f8fafc" stroke="#0c4a6e" strokeWidth="1.6" />
          <path d="M4 -3 L8 -1 Q10 0.5 8 2.5 L4 4" fill="#f8fafc" stroke="#0c4a6e" strokeWidth="1.4" />
        </g>
        {/* القلنسوة (كاب) */}
        <path d="M18 24 Q17 10 32 9.5 Q47 10 46 24 L46 18 Q46 12 40 12.5 Q32 11 24 12.5 Q18 12 18 18 Z" fill="#111827" />
        <ellipse cx="32" cy="28" rx="13" ry="13.5" fill="#e8b98c" />
        <path d="M18.5 24 Q18 11 32 10.5 Q46 11 45.5 24 Q45 17 40 15.5 Q32 14.5 24 15.5 Q19 17 18.5 24 Z" fill="#111827" />
        {/* نظارة رياضية */}
        <rect x="21" y="25" width="9" height="6" rx="3" fill="rgba(17,24,39,0.85)" stroke="#0c4a6e" strokeWidth="1.2" />
        <rect x="34" y="25" width="9" height="6" rx="3" fill="rgba(17,24,39,0.85)" stroke="#0c4a6e" strokeWidth="1.2" />
        <path d="M30 27.5 H34" stroke="#0c4a6e" strokeWidth="1.6" />
        {/* لمعة النظارة */}
        <path d="M23 26.5 L27 26.5 M36 26.5 L40 26.5" stroke="#93c5fd" strokeWidth="1" opacity="0.8" />
        {/* ابتسامة حاسمة */}
        <path d="M27 36 Q32 39.5 37 36" stroke="#7c2d12" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M32 30.5 Q31.2 32.5 32.6 33" stroke="rgba(0,0,0,0.25)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    </svg>
  );
});

/** الكابتن — قبعة سوداء مقلوبة + شريط كابتن أحمر على الذراع */
const CaptainFace = memo(function CaptainFace() {
  const u = useId();
  const bg = `cp-bg-${u}`;
  const clip = `cp-c-${u}`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clip}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f87171" /><stop offset="1" stopColor="#991b1b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${bg})`} />
      <g clipPath={`url(#${clip})`}>
        {/* ذراع بشريط الكابتن */}
        <path d="M44 50 Q52 44 56 48 L56 64 L40 64 Z" fill="#c98d5e" />
        <rect x="46" y="50" width="10" height="5" rx="1.6" fill="#dc2626" transform="rotate(12 51 52)" />
        <path d="M10 64 Q10 46 22 44 L32 50 L42 44 Q54 46 54 64 Z" fill="#dc2626" />
        <path d="M22 44 L32 50 L42 44 L42 49 L32 55 L22 49 Z" fill="#ffffff" opacity="0.92" />
        {/* القبعة المقلوبة */}
        <path d="M19 23 Q19 11 32 10.5 Q45 11 45 23 Z" fill="#1f2937" />
        <rect x="17" y="21" width="30" height="4.4" rx="2.2" fill="#111827" />
        <path d="M45 22 L52 20 L52 24 L45 25 Z" fill="#1f2937" />
        {/* شعار القبعة */}
        <circle cx="32" cy="17" r="2.6" fill="#dc2626" stroke="#fca5a5" strokeWidth="0.8" />
        <ellipse cx="32" cy="29" rx="13" ry="13" fill="#c98d5e" />
        <circle cx="19.5" cy="29" r="2.6" fill="#c98d5e" /><circle cx="44.5" cy="29" r="2.6" fill="#c98d5e" />
        {/* نظرة واثقة — حواجب مرفوعة */}
        <path d="M23.5 24 Q27 22.2 30 24" stroke="#1f1210" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <path d="M34 24 Q37 22.2 40.5 24" stroke="#1f1210" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <ellipse cx="26.5" cy="28.5" rx="2.3" ry="2.6" fill="#1f2937" /><ellipse cx="37.5" cy="28.5" rx="2.3" ry="2.6" fill="#1f2937" />
        <circle cx="27.2" cy="27.6" r="0.7" fill="#fff" /><circle cx="38.2" cy="27.6" r="0.7" fill="#fff" />
        {/* ابتسامة جانبية (smirk) */}
        <path d="M28 36 Q32.5 38.5 37 35.5" stroke="#7c2d12" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M32 31 Q31 32.6 32.5 33.2" stroke="rgba(0,0,0,0.25)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <circle cx="22.5" cy="32" r="2" fill="#fbbf24" opacity="0.35" /><circle cx="41.5" cy="32" r="2" fill="#fbbf24" opacity="0.35" />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    </svg>
  );
});

/** الذهبي — نظارة ذهبية + شعر مصفف للخلف لامع */
const GoldenFace = memo(function GoldenFace() {
  const u = useId();
  const bg = `gd-bg-${u}`;
  const clip = `gd-c-${u}`;
  const hair = `gd-hair-${u}`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clip}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fcd34d" /><stop offset="1" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id={hair} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d97706" /><stop offset="1" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${bg})`} />
      <g clipPath={`url(#${clip})`}>
        <path d="M10 64 Q10 46 22 44 L32 50 L42 44 Q54 46 54 64 Z" fill="#eab308" />
        <path d="M22 44 L32 50 L42 44 L42 49 L32 55 L22 49 Z" fill="#7c2d12" />
        {/* شعر مصفف للخلف بلمعان */}
        <path d="M19 25 Q18 12 32 11 Q46 12 45 25 Q45 18 40 16 Q32 14.5 24 16 Q19 18 19 25 Z" fill={`url(#${hair})`} />
        <path d="M24 14.5 Q28 13 32 13 M36 13.4 Q40 14 43 16" stroke="#fde68a" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.85" />
        <ellipse cx="32" cy="28.5" rx="13" ry="13.2" fill="#f2c9a0" />
        {/* نظارة ذهبية أنيقة */}
        <circle cx="26" cy="28" r="4.4" fill="rgba(254,243,199,0.25)" stroke="#d4af37" strokeWidth="1.8" />
        <circle cx="38" cy="28" r="4.4" fill="rgba(254,243,199,0.25)" stroke="#d4af37" strokeWidth="1.8" />
        <path d="M30.4 28 H33.6" stroke="#d4af37" strokeWidth="1.8" />
        <path d="M21.6 27 L18.5 26 M42.4 27 L45.5 26" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" />
        {/* عيون خلف النظارة */}
        <ellipse cx="26" cy="28" rx="1.8" ry="2.2" fill="#1f2937" /><ellipse cx="38" cy="28" rx="1.8" ry="2.2" fill="#1f2937" />
        {/* ابتسامة راقية */}
        <path d="M27.5 36 Q32 39 36.5 36" stroke="#7c2d12" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <path d="M32 31 Q31.2 32.8 32.6 33.3" stroke="rgba(0,0,0,0.25)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        {/* لمعة نجمة صغيرة على الخد */}
        <path d="M42.5 33.5 l1 2.2 2.4.3-1.8 1.7.5 2.4-2.1-1.2-2.1 1.2.5-2.4-1.8-1.7 2.4-.3 Z" fill="#fef3c7" />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    </svg>
  );
});

/** النجمة — صمّام أذن + نجمة على الشعر + نظرة ساحرة */
const StarFace = memo(function StarFace() {
  const u = useId();
  const bg = `st-bg-${u}`;
  const clip = `st-c-${u}`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clip}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d8b4fe" /><stop offset="1" stopColor="#6b21a8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${bg})`} />
      <g clipPath={`url(#${clip})`}>
        <path d="M10 64 Q10 46 22 44 L32 50 L42 44 Q54 46 54 64 Z" fill="#a855f7" />
        {/* لمعات القميص */}
        <path d="M14 54 L18 52 M46 52 L50 54" stroke="#f3e8ff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        {/* شعر كثيف أسود */}
        <path d="M17 27 Q16 10 32 10 Q48 10 47 27 Q47 34 44 36 Q45 26 40 21 Q32 19 24 21 Q19 26 20 36 Q17 34 17 27 Z" fill="#111111" />
        {/* نجمة ذهبية على الشعر */}
        <path d="M40 16 L41.6 20 L45.8 20.5 L42.7 23.4 L43.5 27.5 L40 25.4 L36.5 27.5 L37.3 23.4 L34.2 20.5 L38.4 20 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="0.8" />
        <ellipse cx="32" cy="29" rx="12.6" ry="13" fill="#8d5a3a" />
        {/* صمّام أذن لامع */}
        <circle cx="19.5" cy="31" r="2.4" fill="#fbbf24" stroke="#92400e" strokeWidth="0.8" />
        <circle cx="44.5" cy="31" r="2.4" fill="#fbbf24" stroke="#92400e" strokeWidth="0.8" />
        {/* عيون ساحرة كبيرة */}
        <ellipse cx="26" cy="28.5" rx="2.8" ry="3.2" fill="#1f2937" /><ellipse cx="38" cy="28.5" rx="2.8" ry="3.2" fill="#1f2937" />
        <circle cx="27" cy="27.4" r="1" fill="#fff" /><circle cx="39" cy="27.4" r="1" fill="#fff" />
        {/* رموش */}
        <path d="M23 26.5 L21.5 25.8 M41 26.5 L42.5 25.8" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
        {/* ابتسامة رقيقة */}
        <path d="M28 36 Q32 38.5 36 36" stroke="#4a1d05" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <circle cx="23" cy="32.5" r="2" fill="#f0abfc" opacity="0.45" /><circle cx="41" cy="32.5" r="2" fill="#f0abfc" opacity="0.45" />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    </svg>
  );
});

/** الأسطورة — لحية بيضاء كاملة + شعر رمادي + نظرة حكيمة */
const LegendFace = memo(function LegendFace() {
  const u = useId();
  const bg = `lg-bg-${u}`;
  const clip = `lg-c-${u}`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clip}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fda4af" /><stop offset="1" stopColor="#9f1239" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${bg})`} />
      <g clipPath={`url(#${clip})`}>
        <path d="M10 64 Q10 46 22 44 L32 50 L42 44 Q54 46 54 64 Z" fill="#f43f5e" />
        <path d="M22 44 L32 50 L42 44 L42 49 L32 55 L22 49 Z" fill="#fecdd3" />
        {/* شعر رمادي منسدل */}
        <path d="M17 30 Q15 10 32 9.5 Q49 10 47 30 L47 38 Q44 34 43 28 Q43 20 38 18 Q32 16.5 26 18 Q21 20 21 28 Q20 34 17 38 Z" fill="#e5e7eb" />
        <ellipse cx="32" cy="28" rx="13" ry="13" fill="#e8b98c" />
        {/* اللحية البيضاء الكاملة */}
        <path d="M20 32 Q19 46 32 48.5 Q45 46 44 32 Q44 40 40 42.5 Q32 45 24 42.5 Q20 40 20 32 Z" fill="#f9fafb" stroke="#d1d5db" strokeWidth="0.8" />
        <path d="M26 38 Q32 42 38 38 L38 44 Q32 47.5 26 44 Z" fill="#f9fafb" />
        {/* شارب */}
        <path d="M25 34.5 Q28.5 33 30 35 M34 35 Q35.5 33 39 34.5" stroke="#f9fafb" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        {/* عيون حكيمة */}
        <path d="M23.5 24.5 Q26.5 23 29.5 24.5" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M34.5 24.5 Q37.5 23 40.5 24.5" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <ellipse cx="26.5" cy="28" rx="2.2" ry="2.5" fill="#374151" /><ellipse cx="37.5" cy="28" rx="2.2" ry="2.5" fill="#374151" />
        {/* تجاعيد لطيفة */}
        <path d="M20.5 26 L22 25 M43.5 26 L42 25" stroke="#d6b28d" strokeWidth="1" strokeLinecap="round" />
        {/* ابتسامة حكيمة */}
        <path d="M28.5 37 Q32 39 35.5 37" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    </svg>
  );
});

/** الإمبراطور — تاج ذهبي بجواهر + عباءة فاخرة + نظرة قوية */
const EmperorFace = memo(function EmperorFace() {
  const u = useId();
  const bg = `em-bg-${u}`;
  const clip = `em-c-${u}`;
  const gold = `em-gold-${u}`;
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clip}><circle cx="32" cy="32" r="30" /></clipPath>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#475569" /><stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" /><stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${bg})`} />
      <g clipPath={`url(#${clip})`}>
        {/* العباءة الفاخرة */}
        <path d="M8 64 Q8 45 22 43 L32 50 L42 43 Q56 45 56 64 Z" fill="#0f172a" />
        <path d="M22 43 L32 50 L42 43 L42 49 L32 56 L22 49 Z" fill={`url(#${gold})`} />
        {/* فرو العباءة */}
        <path d="M10 58 Q20 52 32 52 Q44 52 54 58" stroke="#64748b" strokeWidth="3" fill="none" opacity="0.6" />
        {/* شعر أسود أنيق */}
        <path d="M18 26 Q17.5 12 32 11.5 Q46.5 12 46 26 Q46 19 41 16.5 Q32 15 23 16.5 Q18 19 18 26 Z" fill="#18181b" />
        {/* التاج الذهبي */}
        <path d="M22 14 L26 6 L30 11 L32 4 L34 11 L38 6 L42 14 Z" fill={`url(#${gold})`} stroke="#92400e" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="22" y="13" width="20" height="3.6" rx="1.4" fill={`url(#${gold})`} stroke="#92400e" strokeWidth="1" />
        <circle cx="27" cy="14.8" r="1.2" fill="#e53935" /><circle cx="32" cy="14.8" r="1.2" fill="#22d3ee" /><circle cx="37" cy="14.8" r="1.2" fill="#4ade80" />
        <ellipse cx="32" cy="29" rx="13" ry="13" fill="#d9a066" />
        {/* عيون قوية */}
        <path d="M23 24.5 Q26.5 22.8 30 24.3" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M34 24.3 Q37.5 22.8 41 24.5" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <ellipse cx="26.5" cy="28.5" rx="2.4" ry="2.7" fill="#111111" /><ellipse cx="37.5" cy="28.5" rx="2.4" ry="2.7" fill="#111111" />
        <circle cx="27.3" cy="27.5" r="0.8" fill="#fff" /><circle cx="38.3" cy="27.5" r="0.8" fill="#fff" />
        {/* ابتسامة قوية */}
        <path d="M27.5 36 Q32 39.5 36.5 36" stroke="#5d1f0a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M32 31 Q31.2 32.8 32.6 33.3" stroke="rgba(0,0,0,0.28)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <circle cx="22" cy="32.5" r="2.2" fill="#f59e0b" opacity="0.35" /><circle cx="42" cy="32.5" r="2.2" fill="#f59e0b" opacity="0.35" />
      </g>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(251,191,36,0.55)" strokeWidth="2.4" />
    </svg>
  );
});

const ART: Record<string, ComponentType> = {
  classic: StrikerFace,
  keeper: KeeperFace,
  captain: CaptainFace,
  golden: GoldenFace,
  star: StarFace,
  legend: LegendFace,
  emperor: EmperorFace,
};

/** يرسم الأفاتار المطلوب — يطبّع المعرف أولًا ثم يرسم الشخصية الفريدة */
export const AvatarArt = memo(function AvatarArt({ id, className }: { id: string | null | undefined; className?: string }) {
  const Art: ComponentType = ART[normalizeAvatarId(id)] ?? StrikerFace;
  return (
    <div className={className} style={{ borderRadius: "inherit", background: "transparent" }}>
      <Art />
    </div>
  );
});
