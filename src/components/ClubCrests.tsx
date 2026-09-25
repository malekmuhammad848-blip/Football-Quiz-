/**
 * ClubCrests — مكتبة شعارات الأندية (نسخة v3 المطوّرة)
 * ============================================================
 * كل شعار مرسوم يدويًا بعشرات الطبقات: تدرجات، ظلال، حدود داخلية،
 * ونصوص — ليقترب قدر الإمكان من الهوية الحقيقية للنادي.
 *
 * أهم إصلاح هندسي: **كل نسخة من الشعار تحصل على معرّفات SVG فريدة**
 * عبر useId — المعرفات المكررة كانت تُفسد التدرجات والقص في كل الشعارات
 * المعروضة معًا (سبب رئيسي في «اختفاء» الشعارات أو ظهورها ملطخة).
 *
 * الفهارس: ريال · برشلونة · يونايتد · بايرن · ليفربول · الهلال · يوفنتوس
 * إنتر · ميلان · أرسنال · تشيلسي · سيتي · أتلتيكو · الأهلي · PSG
 * دورتموند · بوكا · فلامنغو
 * ============================================================
 */

import { useId } from "react";
import type { JSX } from "react";

/** تطبيع معرّف React إلى نص آمن لعناصر SVG */
function safeId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9]/g, "");
}

/** نجمة خماسية بمقاس ولون */
function star5(cx: number, cy: number, r: number, fill: string, stroke?: string, sw = 1): JSX.Element {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const b = a + Math.PI / 5;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`);
    pts.push(`${(cx + Math.cos(b) * r * 0.42).toFixed(2)},${(cy + Math.sin(b) * r * 0.42).toFixed(2)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />;
}

/* ============================================================
 *  ريال مدريد — تاج بأقواس + قلعة بثلاثة أبراج + وشاح ذهبي قطري
 * ============================================================ */
export function RealCrest() {
  const uid = safeId(useId());
  const g = `rmg-${uid}`;
  const b = `rmb-${uid}`;
  const c = `rmc-${uid}`;
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.45" stopColor="#f0b429" />
          <stop offset="1" stopColor="#b57b0a" />
        </linearGradient>
        <linearGradient id={b} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a7ac9" />
          <stop offset="1" stopColor="#0a3d7c" />
        </linearGradient>
        <clipPath id={c}>
          <path d="M120 62 L188 82 V140 C188 176 158 202 120 218 C82 202 52 176 52 140 V82 Z" />
        </clipPath>
      </defs>

      {/* — التاج الملكي — */}
      <g>
        <path d="M76 44 C76 30 88 27 95 35 C99 23 111 21 120 29 C129 21 141 23 145 35 C152 27 164 30 164 44 Z" fill={`url(#${g})`} stroke="#8a5c08" strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="74" y="43" width="92" height="16" rx="3.5" fill={`url(#${g})`} stroke="#8a5c08" strokeWidth="2.4" />
        <rect x="117" y="6" width="6" height="15" rx="1.5" fill={`url(#${g})`} stroke="#8a5c08" strokeWidth="1.4" />
        <rect x="111" y="10" width="18" height="5" rx="1.5" fill={`url(#${g})`} stroke="#8a5c08" strokeWidth="1.4" />
        <circle cx="76" cy="42" r="4" fill="#fff8e1" stroke="#8a5c08" strokeWidth="1.4" />
        <circle cx="95" cy="33" r="3.4" fill="#fff8e1" stroke="#8a5c08" strokeWidth="1.4" />
        <circle cx="120" cy="27" r="3.8" fill="#fff8e1" stroke="#8a5c08" strokeWidth="1.4" />
        <circle cx="145" cy="33" r="3.4" fill="#fff8e1" stroke="#8a5c08" strokeWidth="1.4" />
        <circle cx="164" cy="42" r="4" fill="#fff8e1" stroke="#8a5c08" strokeWidth="1.4" />
        <circle cx="90" cy="51" r="3.6" fill="#d32f2f" stroke="#7c1414" strokeWidth="1" />
        <circle cx="120" cy="51" r="4.4" fill="#2e7d32" stroke="#123d14" strokeWidth="1" />
        <circle cx="150" cy="51" r="3.6" fill="#d32f2f" stroke="#7c1414" strokeWidth="1" />
      </g>

      {/* — الدرع الأبيض — */}
      <path d="M120 62 L188 82 V140 C188 176 158 202 120 218 C82 202 52 176 52 140 V82 Z" fill="#ffffff" stroke={`url(#${g})`} strokeWidth="7" />
      <path d="M120 72 L179 89 V139 C179 168 154 190 120 204 C86 190 61 168 61 139 V89 Z" fill="none" stroke="#e3b64f" strokeWidth="1.6" opacity="0.9" />

      {/* — الوشاح الذهبي القطري — */}
      <g clipPath={`url(#${c})`}>
        <path d="M52 108 L188 166 L188 194 L52 136 Z" fill={`url(#${g})`} opacity="0.93" />
        <path d="M52 108 L188 166" stroke="#8a5c08" strokeWidth="1.8" opacity="0.7" />
        <path d="M52 136 L188 194" stroke="#8a5c08" strokeWidth="1.8" opacity="0.7" />
      </g>

      {/* — القلعة الزرقاء — */}
      <g>
        <path d="M86 130 L120 110 L154 130 V164 L120 186 L86 164 Z" fill={`url(#${b})`} stroke="#06305e" strokeWidth="2.6" strokeLinejoin="round" />
        {[94, 114, 134].map((x) => (
          <g key={x}>
            <rect x={x} y="134" width="12" height="24" rx="1.5" fill="#ffffff" />
            <path d={`M${x} 134 h3 v-4 h3 v4 h3 v-4 h3 v4`} fill="#ffffff" stroke="#0a3d7c" strokeWidth="0.8" />
          </g>
        ))}
        <rect x="99" y="140" width="3.6" height="7" rx="1.6" fill="#0a3d7c" />
        <rect x="137.4" y="140" width="3.6" height="7" rx="1.6" fill="#0a3d7c" />
        <path d="M111 176 Q120 165 129 176 V186 H111 Z" fill="#ffffff" />
      </g>

      {/* — الكرة العلوية — */}
      <circle cx="120" cy="94" r="13" fill="#ffffff" stroke="#0a3d7c" strokeWidth="2.2" />
      <path d="M120 85.5 L127.5 91 L124.6 100 H115.4 L112.5 91 Z" fill="#0a3d7c" />
      <path d="M112 89 L104 92 M128 89 L136 92 M117 100 L114 107 M123 100 L126 107" stroke="#0a3d7c" strokeWidth="1.4" />
    </svg>
  );
}

/* ============================================================
 *  برشلونة — الأرباع الأربعة الكاملة
 * ============================================================ */
export function BarcaCrest() {
  const uid = safeId(useId());
  const c = `bcc-${uid}`;
  const shield = "M120 8 C148 12 182 18 194 22 V118 C194 166 164 202 120 222 C76 202 46 166 46 118 V22 C58 18 92 12 120 8 Z";
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={c}>
          <path d={shield} />
        </clipPath>
      </defs>

      <path d={shield} fill="#f3c300" stroke="#a50044" strokeWidth="4" />
      <g clipPath={`url(#${c})`}>
        {/* صليب القديس جرجس */}
        <rect x="46" y="8" width="74" height="56" fill="#ffffff" />
        <rect x="78" y="8" width="10" height="56" fill="#db0030" />
        <rect x="46" y="31" width="74" height="10" fill="#db0030" />

        {/* أسنان كتالونيا */}
        <rect x="120" y="8" width="74" height="56" fill="#f3c300" />
        {[124, 138, 152, 166, 180].map((x) => (
          <rect key={x} x={x} y="8" width="8" height="56" fill="#db0030" />
        ))}

        {/* الحزام الذهبي */}
        <rect x="46" y="64" width="148" height="14" fill="#edbb00" stroke="#a50044" strokeWidth="1.6" />

        {/* بلاوقرانا */}
        <rect x="46" y="78" width="148" height="150" fill="#004d98" />
        {[0, 2, 4].map((i) => (
          <rect key={i} x={46 + i * 29.6} y="78" width="14.8" height="150" fill="#a50044" />
        ))}

        {/* الكرة */}
        <circle cx="120" cy="158" r="30" fill="#004d98" />
        <circle cx="120" cy="158" r="30" fill="none" stroke="#edbb00" strokeWidth="4" />
        <path d="M120 144 L133 154 L128 169 H112 L107 154 Z" fill="#ffffff" opacity="0.94" />
        <path d="M120 128 V142 M100 150 L91 143 M140 150 L149 143 M104 182 L97 191 M136 182 L143 191" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
      </g>

      <path d="M120 8 V64 M46 64 H194" stroke="#a50044" strokeWidth="2" opacity="0.6" />
      <path d={shield} fill="none" stroke="#edbb00" strokeWidth="5" />
      <path d={shield} fill="none" stroke="#a50044" strokeWidth="2" />
    </svg>
  );
}

/* ============================================================
 *  مانشستر يونايتد — السفينة + الشيطان الأصفر
 * ============================================================ */
export function UnitedCrest() {
  const uid = safeId(useId());
  const g = `mur-${uid}`;
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8362a" />
          <stop offset="1" stopColor="#a80f16" />
        </linearGradient>
      </defs>

      <path d="M120 14 L192 34 V130 C192 172 164 202 120 222 C76 202 48 172 48 130 V34 Z" fill={`url(#${g})`} stroke="#fbe122" strokeWidth="6" />
      <path d="M120 26 L182 43 V128 C182 164 158 190 120 208 C82 190 58 164 58 128 V43 Z" fill="none" stroke="#fbe122" strokeWidth="2.2" opacity="0.7" />

      {/* السفينة */}
      <g transform="translate(120,56)">
        <path d="M-32 6 H32 L25 17 H-25 Z" fill="#fbe122" stroke="#8b6d00" strokeWidth="1.2" />
        <path d="M-20 6 V-14 M0 6 V-20 M20 6 V-14" stroke="#fbe122" strokeWidth="3" strokeLinecap="round" />
        <path d="M-20 -14 L-27 -8 L-20 -4 Z M0 -20 L-9 -12 L0 -6 Z M20 -14 L13 -8 L20 -4 Z" fill="#fbe122" />
        <path d="M-30 11 H30" stroke="#fbe122" strokeWidth="1.6" opacity="0.75" />
      </g>

      {/* الشيطان */}
      <g transform="translate(120,134)">
        <path
          d="M0 -34 C-9 -34 -14 -28 -14 -21 C-24 -18 -30 -11 -30 -2 C-30 8 -23 15 -14 16 C-19 22 -18 31 -12 36 C-6 41 2 41 6 36 C10 41 18 41 24 36 C30 31 31 22 26 16 C35 15 42 8 42 -2 C42 -11 36 -18 26 -21 C26 -28 21 -34 12 -34 Z"
          fill="#fbe122"
          stroke="#8b0000"
          strokeWidth="2.4"
        />
        <path d="M-14 -26 L-24 -40 M-6 -30 L-10 -46 M6 -30 L10 -46 M14 -26 L24 -40" stroke="#fbe122" strokeWidth="4" strokeLinecap="round" />
        <path d="M30 14 C40 20 44 12 38 6" stroke="#fbe122" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M38 6 L46 2 L42 12 Z" fill="#fbe122" />
        <path d="M-30 -4 L-46 -12" stroke="#fbe122" strokeWidth="3" strokeLinecap="round" />
        <path d="M-46 -12 L-52 -20 M-46 -12 L-44 -22 M-46 -12 L-54 -12" stroke="#fbe122" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M32 -2 L48 -8" stroke="#fbe122" strokeWidth="3" strokeLinecap="round" />
        <path d="M48 -8 L54 -14 M48 -8 L52 -2 M48 -8 L56 -6" stroke="#fbe122" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="-8" cy="-6" r="4" fill="#8b0000" />
        <circle cx="8" cy="-6" r="4" fill="#8b0000" />
        <path d="M-10 10 Q0 18 10 10" stroke="#8b0000" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>

      {/* شريطا الاسم: MANCHESTER أعلى، UNITED أسفل — كما في الشعار الحقيقي */}
      <rect x="66" y="168" width="108" height="15" rx="2" fill="none" stroke="#fbe122" strokeWidth="2" opacity="0.9" />
      <text x="120" y="180" textAnchor="middle" fontSize="11.5" fontWeight="900" fontFamily="serif" fill="#fbe122" letterSpacing="1.5">UNITED</text>
      <text x="120" y="216" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="serif" fill="#fbe122" letterSpacing="2.5">MANCHESTER</text>
    </svg>
  );
}

/* ============================================================
 *  بايرن ميونخ — الحلقة + المركز البافاري بالمعيّنات
 * ============================================================ */
export function BayernCrest() {
  const uid = safeId(useId());
  const c = `byc-${uid}`;
  const R = 12.5;
  const lozenges: JSX.Element[] = [];
  for (let row = -5; row <= 5; row++) {
    for (let col = -5; col <= 5; col++) {
      if ((row + col) % 2 !== 0) continue;
      const cx = 120 + col * R;
      const cy = 120 + row * R;
      lozenges.push(
        <path
          key={`${row}-${col}`}
          d={`M${cx} ${cy - R} L${cx + R} ${cy} L${cx} ${cy + R} L${cx - R} ${cy} Z`}
          fill="#0066b2"
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={c}>
          <circle cx="120" cy="120" r="62" />
        </clipPath>
      </defs>

      {/* الحلقة الخارجية بيضاء بنص أزرق — كما في الشعار الرسمي */}
      <circle cx="120" cy="120" r="106" fill="#ffffff" stroke="#0066b2" strokeWidth="3" />
      <circle cx="120" cy="120" r="101" fill="none" stroke="#0066b2" strokeWidth="1.4" opacity="0.55" />
      <text x="120" y="52" textAnchor="middle" fontSize="16" fontWeight="900" fontFamily="serif" fill="#0066b2" letterSpacing="3">FC BAYERN</text>
      <text x="120" y="206" textAnchor="middle" fontSize="16" fontWeight="900" fontFamily="serif" fill="#0066b2" letterSpacing="3">MÜNCHEN</text>
      <text x="40" y="126" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="serif" fill="#0066b2" transform="rotate(-90 40 126)">1900</text>
      {/* معيّنتا بافاريا الصغيرتان على يمين الحلقة */}
      <path d="M203 112 L209 120 L203 128 L197 120 Z" fill="#0066b2" />
      <path d="M203 124 L207 130 L203 136 L199 130 Z" fill="#dc052d" />

      <circle cx="120" cy="120" r="78" fill="#dc052d" stroke="#ffffff" strokeWidth="3" />
      <circle cx="120" cy="120" r="62" fill="#ffffff" />
      <g clipPath={`url(#${c})`}>{lozenges}</g>
      <circle cx="120" cy="120" r="62" fill="none" stroke="#0066b2" strokeWidth="2.5" />
    </svg>
  );
}

/* ============================================================
 *  ليفربول — الدرع الذهبي + الليفر + شعلتا هيلسيبي
 * ============================================================ */
export function LiverpoolCrest() {
  const uid = safeId(useId());
  const g = `lvr-${uid}`;
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d41330" />
          <stop offset="1" stopColor="#9c0e22" />
        </linearGradient>
      </defs>

      <path d="M62 14 H178 V142 C178 186 152 210 120 222 C88 210 62 186 62 142 Z" fill={`url(#${g})`} stroke="#f6eb61" strokeWidth="6" />
      <path d="M72 24 H168 V140 C168 176 146 198 120 208 C94 198 72 176 72 140 Z" fill="none" stroke="#f6eb61" strokeWidth="1.8" opacity="0.65" />

      <rect x="86" y="20" width="68" height="19" rx="9" fill="#f6eb61" stroke="#8b6d00" strokeWidth="1.2" />
      <text x="120" y="34.5" textAnchor="middle" fontSize="12.5" fontWeight="900" fontFamily="serif" fill="#8b0000" letterSpacing="2">L.F.C.</text>

      <g transform="translate(120,116)">
        <path
          d="M4 -46 C-4 -46 -10 -40 -10 -33 L-30 -27 L-10 -22 C-11 -13 -7 -6 0 -3 L-16 20 L-2 14 L-4 30 L4 16 L12 30 L10 14 L24 20 L8 -3 C15 -6 19 -13 18 -22 L38 -27 L18 -33 C18 -40 12 -46 4 -46 Z"
          fill="#f6eb61"
          stroke="#8b0000"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M8 -46 C14 -50 20 -48 22 -42 L14 -38 Z" fill="#f6eb61" stroke="#8b0000" strokeWidth="1.4" />
        <path d="M22 -42 C28 -38 26 -30 20 -28 M22 -42 C30 -44 34 -38 30 -32" stroke="#f6eb61" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="-38" r="2.4" fill="#8b0000" />
        <path d="M-6 -18 Q0 -14 6 -18 M-4 -8 Q0 -4 4 -8" stroke="#8b0000" strokeWidth="1.2" fill="none" opacity="0.7" />
      </g>

      {[
        { x: 92, flip: 1 },
        { x: 148, flip: -1 },
      ].map(({ x, flip }) => (
        <g key={x} transform={`translate(${x},188) scale(${flip},1)`}>
          <path d="M0 12 C-9 4 -7 -7 0 -14 C7 -7 9 4 0 12 Z" fill="#f6eb61" />
          <path d="M0 8 C-4 3 -3 -2 0 -6 C3 -2 4 3 0 8 Z" fill="#d41330" />
        </g>
      ))}
      <text x="120" y="192" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="serif" fill="#f6eb61" letterSpacing="2">EST. 1892</text>
    </svg>
  );
}

/* ============================================================
 *  الهلال السعودي
 * ============================================================ */
export function HilalCrest() {
  const uid = safeId(useId());
  const g = `hlb-${uid}`;
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1c85e0" />
          <stop offset="1" stopColor="#083a80" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="106" fill="#ffffff" />
      <circle cx="120" cy="120" r="99" fill={`url(#${g})`} stroke="#ffffff" strokeWidth="4" />
      <circle cx="120" cy="120" r="90" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.55" />
      <path d="M138 40 A80 80 0 1 0 138 200 A96 96 0 1 1 138 40 Z" fill="#ffffff" />
      {star5(158, 88, 20, "#ffffff", "#083a80", 1.4)}
      <path d="M84 66 A70 70 0 0 0 84 174" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.35" />
      <text x="120" y="224" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="5">AL HILAL</text>
    </svg>
  );
}

/* ============================================================
 *  يوفنتوس — الدرع المخطط + الحزام الذهبي
 * ============================================================ */
export function JuventusCrest() {
  const uid = safeId(useId());
  const c = `jvc-${uid}`;
  const shield = "M120 12 C168 12 192 40 192 96 C192 156 162 210 120 228 C78 210 48 156 48 96 C48 40 72 12 120 12 Z";
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={c}>
          <path d={shield} />
        </clipPath>
      </defs>
      <path d={shield} fill="#ffffff" stroke="#111111" strokeWidth="6" />
      <g clipPath={`url(#${c})`}>
        <rect x="48" y="12" width="144" height="120" fill="#ffffff" />
        {[58, 86, 114, 142, 170].map((x) => (
          <rect key={x} x={x} y="12" width="14" height="120" fill="#111111" />
        ))}
        <rect x="48" y="116" width="144" height="20" fill="#d4af37" stroke="#111111" strokeWidth="2" />
      </g>
      <path d={shield} fill="none" stroke="#111111" strokeWidth="6" />
      <text x="120" y="131" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="serif" fill="#111111" letterSpacing="1">JUVENTUS</text>
      {[88, 120, 152].map((x) => star5(x, 166, 8.5, "#111111"))}
      <text x="120" y="204" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="serif" fill="#111111" letterSpacing="2">1897</text>
    </svg>
  );
}

/* ============================================================
 *  إنتر ميلان
 * ============================================================ */
export function InterCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <circle cx="120" cy="120" r="107" fill="#ffffff" stroke="#0068a8" strokeWidth="6" />
      <circle cx="120" cy="120" r="93" fill="none" stroke="#c8a24b" strokeWidth="7" />
      <circle cx="120" cy="120" r="84" fill="#0068a8" />
      <circle cx="120" cy="120" r="84" fill="none" stroke="#111111" strokeWidth="8" />
      <circle cx="120" cy="120" r="68" fill="#0068a8" stroke="#111111" strokeWidth="5" />
      <text x="120" y="142" textAnchor="middle" fontSize="62" fontWeight="900" fontFamily="serif" fill="#d9c07a" letterSpacing="-4">IM</text>
      <text x="120" y="176" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="serif" fill="#d9c07a" letterSpacing="2">1908</text>
      {/* النجمة الذهبية العلوية — لقب أبطال أوروبا */}
      {star5(120, 30, 14, "#c8a24b", "#8a6d20", 1.6)}
    </svg>
  );
}

/* ============================================================
 *  ميلان — البيضاوي بالنصفين
 * ============================================================ */
export function MilanCrest() {
  const uid = safeId(useId());
  const c = `mlc-${uid}`;
  // الترتيب الرسمي: يسار الصليب الأحمر لسان جورج، يمين الخطوط الحمراء على أسود
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={c}>
          <ellipse cx="120" cy="120" rx="78" ry="92" />
        </clipPath>
      </defs>
      <circle cx="120" cy="120" r="107" fill="#ffffff" stroke="#111111" strokeWidth="5" />
      <ellipse cx="120" cy="120" rx="78" ry="92" fill="#ffffff" stroke="#111111" strokeWidth="3" />
      <g clipPath={`url(#${c})`}>
        {/* الربع العلوي الأيسر: صليب سان جورج الأحمر على أبيض */}
        <rect x="42" y="28" width="78" height="92" fill="#ffffff" />
        <rect x="72" y="28" width="18" height="92" fill="#b01c2e" />
        <rect x="42" y="66" width="78" height="16" fill="#b01c2e" />
        {/* الربع العلوي الأيمن: الخطوط الحمراء على أسود */}
        <rect x="120" y="28" width="78" height="92" fill="#111111" />
        {[128, 148, 168].map((x) => (
          <rect key={x} x={x} y="28" width="9" height="92" fill="#b01c2e" />
        ))}
        {/* القاع الأبيض الشامل — يحمل الاسم والسنة */}
        <rect x="42" y="120" width="156" height="92" fill="#ffffff" />
      </g>
      <ellipse cx="120" cy="120" rx="78" ry="92" fill="none" stroke="#111111" strokeWidth="3" />
      {/* ACM و1899 في الشريط الأبيض السفلي — كما في الرسمي */}
      <text x="120" y="168" textAnchor="middle" fontSize="24" fontWeight="900" fontFamily="serif" fill="#b01c2e" letterSpacing="3">ACM</text>
      <text x="120" y="196" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="serif" fill="#b01c2e" letterSpacing="2">1899</text>
    </svg>
  );
}

/* ============================================================
 *  أرسنال — الدرع + المدفع
 * ============================================================ */
export function ArsenalCrest() {
  const uid = safeId(useId());
  const g = `arg-${uid}`;
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ef4b3a" />
          <stop offset="1" stopColor="#bd070f" />
        </linearGradient>
      </defs>
      <path d="M120 12 L192 34 V128 C192 172 164 204 120 224 C76 204 48 172 48 128 V34 Z" fill={`url(#${g})`} stroke="#9c824a" strokeWidth="6" />
      <path d="M120 24 L181 43 V126 C181 162 156 190 120 208 C84 190 59 162 59 126 V43 Z" fill="none" stroke="#9c824a" strokeWidth="1.8" opacity="0.75" />
      {star5(120, 40, 9, "#e3c987")}

      <g transform="translate(122,114) rotate(-14)">
        <rect x="-58" y="-8" width="106" height="16" rx="8" fill="#063672" />
        <rect x="-58" y="-8" width="106" height="6" rx="3" fill="#1a4d8f" />
        <rect x="42" y="-10.5" width="9" height="21" rx="3" fill="#063672" />
        <path d="M-58 -8 L-76 0 L-58 8 Z" fill="#063672" />
        <circle cx="-2" cy="26" r="17.5" fill="#063672" stroke="#9c824a" strokeWidth="3" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line
            key={a}
            x1="-2"
            y1="26"
            x2={-2 + Math.cos((a * Math.PI) / 180) * 15}
            y2={26 + Math.sin((a * Math.PI) / 180) * 15}
            stroke="#9c824a"
            strokeWidth="2.2"
          />
        ))}
        <circle cx="-2" cy="26" r="4.4" fill="#e3c987" stroke="#063672" strokeWidth="1.4" />
      </g>

      <path d="M76 166 Q120 154 164 166 L158 188 Q120 178 82 188 Z" fill="#c8a24b" stroke="#8a6d20" strokeWidth="1.6" />
      <text x="120" y="181" textAnchor="middle" fontSize="13.5" fontWeight="900" fontFamily="serif" fill="#063672" letterSpacing="2">ARSENAL</text>
    </svg>
  );
}

/* ============================================================
 *  تشيلسي — الدائرة + الأسد المتواثي + العصا + الوردتان
 * ============================================================ */
export function ChelseaCrest() {
  const uid = safeId(useId());
  const g = `chg-${uid}`;
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b6ec2" />
          <stop offset="1" stopColor="#034694" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="106" fill={`url(#${g})`} stroke="#ffffff" strokeWidth="6" />
      <circle cx="120" cy="120" r="92" fill="none" stroke="#d4af37" strokeWidth="2.5" />
      <circle cx="120" cy="116" r="62" fill="#ffffff" />

      <rect x="74" y="72" width="5" height="88" rx="2.5" fill="#d4af37" />
      <path d="M76.5 74 C64 66 62 52 74 48 C82 45 88 52 84 58" stroke="#d4af37" strokeWidth="5" fill="none" strokeLinecap="round" />

      <g transform="translate(128,114)">
        <path
          d="M-14 34 C-22 24 -22 8 -14 0 C-20 -8 -16 -18 -6 -20 L-2 -30 L8 -22 C16 -26 24 -20 24 -10 L18 -2 C28 2 32 12 28 22 L38 18 L36 28 L24 32 C18 40 8 44 -2 40 L-8 48 L-12 38 Z"
          fill="#c8102e"
          stroke="#7c0a1c"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M24 -14 C34 -22 36 -32 28 -38" stroke="#c8102e" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M-10 34 L-12 40 M2 40 L2 46 M14 36 L16 42" stroke="#7c0a1c" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="-1" cy="-14" r="1.8" fill="#ffffff" />
        <path d="M-6 -32 L-3 -38 L0 -33 L3 -39 L6 -33 L9 -38 L10 -31 Z" fill="#d4af37" stroke="#8a6d20" strokeWidth="1" />
      </g>

      {[
        { x: 62, y: 116 },
        { x: 178, y: 116 },
      ].map(({ x, y }) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r="8" fill="#c8102e" stroke="#7c0a1c" strokeWidth="1.2" />
          <circle cx={x} cy={y} r="3" fill="#e35d6a" />
          {[0, 90, 180, 270].map((a) => (
            <circle
              key={a}
              cx={x + Math.cos((a * Math.PI) / 180) * 5}
              cy={y + Math.sin((a * Math.PI) / 180) * 5}
              r="2"
              fill="#c8102e"
              stroke="#7c0a1c"
              strokeWidth="0.7"
            />
          ))}
        </g>
      ))}
      <text x="120" y="206" textAnchor="middle" fontSize="15" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="3">CHELSEA</text>
    </svg>
  );
}

/* ============================================================
 *  مانشستر سيتي — البحّارة
 * ============================================================ */
export function CityCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <circle cx="120" cy="120" r="106" fill="#1c2c5b" stroke="#c8a24b" strokeWidth="6" />
      <circle cx="120" cy="120" r="88" fill="#6cabdd" stroke="#ffffff" strokeWidth="2.5" />
      <circle cx="120" cy="120" r="58" fill="#1c2c5b" />

      <g transform="translate(120,62)">
        <path d="M-20 6 H20 L14 15 H-14 Z" fill="#ffffff" stroke="#1c2c5b" strokeWidth="1" />
        <path d="M0 6 V-12" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M0 -12 L-11 -4 H0 Z M0 -12 L11 -4 H0 Z" fill="#ffffff" />
      </g>

      <g transform="translate(120,118)">
        <path d="M0 -36 C16 -32 26 -18 26 0 C26 20 14 34 0 40 C-14 34 -26 20 -26 0 C-26 -18 -16 -32 0 -36 Z" fill="#d4af37" stroke="#ffffff" strokeWidth="2.4" />
        <path d="M0 -36 C8 -33 12 -26 12 -18 L-12 -18 C-12 -26 -8 -33 0 -36 Z" fill="#1c2c5b" />
        <path d="M7 -31 L18 -27 L8 -22 Z" fill="#d4af37" />
        <circle cx="4" cy="-26" r="2" fill="#ffffff" />
        <path d="M-26 0 C-22 -10 -14 -17 -6 -19 L-9 6 C-16 8 -23 6 -26 0 Z" fill="#1c2c5b" opacity="0.85" />
        <path d="M26 0 C22 -10 14 -17 6 -19 L9 6 C16 8 23 6 26 0 Z" fill="#1c2c5b" opacity="0.85" />
        <path d="M-9 40 L0 52 L9 40 L0 37 Z" fill="#d4af37" stroke="#ffffff" strokeWidth="1.4" />
      </g>

      <g transform="translate(120,178)" stroke="#ffffff" strokeWidth="2.6" fill="none" strokeLinecap="round">
        <path d="M0 -8 V10 M-7 0 H7" />
        <path d="M-10 4 C-10 12 -5 16 0 16 C5 16 10 12 10 4" />
        <circle cx="0" cy="-10" r="2.4" fill="#ffffff" />
      </g>

      <text x="120" y="32" textAnchor="middle" fontSize="11.5" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="2.5">MANCHESTER</text>
      <text x="120" y="218" textAnchor="middle" fontSize="11.5" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="2.5">CITY</text>
    </svg>
  );
}

/* ============================================================
 *  أتلتيكو مدريد — الأرباع + الوشاح + الدب والشجرة
 * ============================================================ */
export function AtleticoCrest() {
  const uid = safeId(useId());
  const c = `atc-${uid}`;
  const shield = "M120 12 L190 32 V126 C190 168 162 200 120 220 C78 200 50 168 50 126 V32 Z";
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={c}>
          <path d={shield} />
        </clipPath>
      </defs>
      <path d={shield} fill="#ffffff" stroke="#262e62" strokeWidth="6" />
      <g clipPath={`url(#${c})`}>
        <rect x="50" y="12" width="70" height="104" fill="#cb3524" />
        <rect x="120" y="116" width="70" height="104" fill="#cb3524" />
        <path d="M50 46 L188 170 L188 202 L50 78 Z" fill="#1a2f6e" />
      </g>
      <path d={shield} fill="none" stroke="#262e62" strokeWidth="6" />
      <path d="M120 12 V220 M50 116 H190" stroke="#262e62" strokeWidth="2" opacity="0.5" />

      <g transform="translate(120,66)">
        <path d="M8 -6 C0 -14 -12 -14 -18 -6 C-24 0 -22 10 -14 12 L8 12 C14 8 14 -1 8 -6 Z" fill="#3f7d3a" />
        <rect x="-5" y="12" width="5" height="9" fill="#7a4a21" />
        <g transform="translate(-22,4)">
          <ellipse cx="0" cy="8" rx="11" ry="7.5" fill="#7a4a21" />
          <circle cx="-8" cy="-2" r="5" fill="#7a4a21" />
          <circle cx="-11" cy="-6" r="1.6" fill="#7a4a21" />
          <circle cx="-5.4" cy="-6" r="1.6" fill="#7a4a21" />
          <circle cx="-9.4" cy="-2.6" r="0.9" fill="#111111" />
          <path d="M-7 14 L-7 20 M-2 15 L-2 21 M4 15 L4 21 M8 13 L9 19" stroke="#5d3617" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      </g>

      {[64, 84, 104, 120, 136, 156, 176].map((x, i) => star5(x, 100 - Math.abs(i - 3) * 3.2, 4.6, "#ffffff"))}

      <text x="120" y="206" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="serif" fill="#262e62" letterSpacing="3">ATM</text>
    </svg>
  );
}

/* ============================================================
 *  الأهلي المصري — النسر الذهبي
 * ============================================================ */
export function AhlyCrest() {
  const uid = safeId(useId());
  const g = `ahg-${uid}`;
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d42a2a" />
          <stop offset="1" stopColor="#8a1010" />
        </linearGradient>
      </defs>
      <path d="M120 12 L190 32 V126 C190 168 162 200 120 220 C78 200 50 168 50 126 V32 Z" fill={`url(#${g})`} stroke="#ffffff" strokeWidth="6" />
      <path d="M120 24 L179 42 V124 C179 160 154 188 120 204 C86 188 61 160 61 124 V42 Z" fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.8" />

      <text x="120" y="42" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="3">AL AHLY</text>

      <g transform="translate(120,120)">
        {[-1, 1].map((side) => (
          <g key={side} transform={`scale(${side},1)`}>
            <path d="M4 -10 C-2 -26 -16 -38 -40 -42 C-30 -30 -26 -20 -26 -10 C-36 -6 -42 4 -40 16 C-28 10 -16 10 -6 16 Z" fill="#d4af37" stroke="#8b6914" strokeWidth="2" strokeLinejoin="round" />
            <path d="M-30 -32 C-24 -24 -22 -18 -22 -12 M-36 -8 C-30 -4 -26 0 -24 4 M-34 10 C-28 8 -22 10 -18 12" stroke="#8b6914" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
          </g>
        ))}
        <ellipse cx="0" cy="10" rx="13" ry="20" fill="#f0cf6e" stroke="#8b6914" strokeWidth="2" />
        <path d="M-6 4 H6 M-7 12 H7 M-6 20 H6" stroke="#8b6914" strokeWidth="1.2" opacity="0.6" />
        <circle cx="0" cy="-18" r="9.5" fill="#f0cf6e" stroke="#8b6914" strokeWidth="2" />
        <path d="M0 -15 L9 -12.5 L0 -9 Z" fill="#8b6914" />
        <circle cx="-3.4" cy="-20" r="1.7" fill="#5d3a00" />
        <circle cx="3.4" cy="-20" r="1.7" fill="#5d3a00" />
        <path d="M-8 30 L0 38 L8 30 L0 26 Z" fill="#d4af37" stroke="#8b6914" strokeWidth="1.4" />
      </g>

      <text x="120" y="198" textAnchor="middle" fontSize="15" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="3">1907</text>
    </svg>
  );
}

/* ============================================================
 *  باريس سان جيرمان
 * ============================================================ */
export function PsgCrest() {
  const uid = safeId(useId());
  const c = `pgc-${uid}`;
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={c}>
          <circle cx="120" cy="120" r="98" />
        </clipPath>
        {/* قوس النص العلوي — اسم النادي يلتف كما في الشعار الرسمي */}
        <path id={`pgt-${uid}`} d="M34 120 A86 86 0 0 1 206 120" fill="none" />
      </defs>
      <circle cx="120" cy="120" r="106" fill="#ffffff" />
      <circle cx="120" cy="120" r="99" fill="#004170" />
      <g clipPath={`url(#${c})`}>
        <rect x="96" y="22" width="48" height="196" fill="#da291c" />
      </g>
      <circle cx="120" cy="120" r="88" fill="none" stroke="#d4af37" strokeWidth="2.5" />

      <g transform="translate(120,104)">
        <path d="M0 -52 C6 -30 12 -8 20 14 L-20 14 C-12 -8 -6 -30 0 -52 Z" fill="#da291c" stroke="#ffffff" strokeWidth="1.6" />
        <rect x="-9" y="-20" width="18" height="5" fill="#ffffff" />
        <rect x="-16" y="2" width="32" height="6" rx="2" fill="#ffffff" />
        <path d="M-20 14 C-10 30 10 30 20 14" stroke="#ffffff" strokeWidth="2.4" fill="none" />
        <path d="M-5 -40 L5 -40 M-8 -28 L8 -28 M-11 -8 L11 -8" stroke="#ffffff" strokeWidth="1.2" />
      </g>

      <path d="M78 140 Q120 158 162 140 L154 156 Q120 170 86 156 Z" fill="#ffffff" />
      <g transform="translate(120,188)" fill="#d4af37">
        <path d="M0 -10 C3 -4 3 2 0 8 C-3 2 -3 -4 0 -10 Z" />
        <path d="M-9 2 C-5 4 -3 6 -2 10 C-7 9 -9 6 -9 2 Z M9 2 C5 4 3 6 2 10 C7 9 9 6 9 2 Z" />
        <rect x="-1.6" y="8" width="3.2" height="7" rx="1.4" />
      </g>

      <text fontSize="12.5" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="1.2">
        <textPath href={`#pgt-${uid}`} startOffset="50%" textAnchor="middle">PARIS SAINT-GERMAIN</textPath>
      </text>
      <text x="120" y="216" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="3">1970</text>
    </svg>
  );
}

/* ============================================================
 *  بوروسيا دورتموند
 * ============================================================ */
export function DortmundCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <circle cx="120" cy="120" r="106" fill="#fde100" stroke="#111111" strokeWidth="5" />
      <circle cx="120" cy="120" r="90" fill="none" stroke="#111111" strokeWidth="15" />
      <circle cx="120" cy="120" r="72" fill="#fde100" stroke="#111111" strokeWidth="3" />

      {/* الاسم على الحلقة السوداء نفسها — أبيض على أسود */}
      <text x="120" y="36" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="2">BORUSSIA</text>
      <path d="M28 120 L36 116 L36 124 Z M212 120 L204 116 L204 124 Z" fill="#ffffff" />
      <text x="120" y="212" textAnchor="middle" fontSize="12.5" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="1">DORTMUND</text>

      {/* الشعار الداخلي: حلقتا 09 المتشابكتان — أكبر وأوضح */}
      <circle cx="104" cy="108" r="27" fill="none" stroke="#111111" strokeWidth="9" />
      <circle cx="136" cy="108" r="27" fill="none" stroke="#111111" strokeWidth="9" />
      <text x="120" y="176" textAnchor="middle" fontSize="26" fontWeight="900" fontFamily="serif" fill="#111111" letterSpacing="1">09</text>
    </svg>
  );
}

/* ============================================================
 *  بوكا جونيورز
 * ============================================================ */
export function BocaCrest() {
  const uid = safeId(useId());
  const c = `bkc-${uid}`;
  const shield = "M120 12 L190 32 V126 C190 170 162 200 120 218 C78 200 50 170 50 126 V32 Z";
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={c}>
          <path d={shield} />
        </clipPath>
      </defs>
      <path d={shield} fill="#103f79" stroke="#f5d020" strokeWidth="6" />
      <g clipPath={`url(#${c})`}>
        <rect x="50" y="96" width="140" height="30" fill="#f5d020" />
        <rect x="50" y="96" width="140" height="3" fill="#0d2c56" />
        <rect x="50" y="123" width="140" height="3" fill="#0d2c56" />
      </g>
      <path d={shield} fill="none" stroke="#f5d020" strokeWidth="6" />
      <path d="M120 22 L190 42" stroke="#ffffff" strokeWidth="1.4" opacity="0.5" />
      <text x="120" y="118" textAnchor="middle" fontSize="20" fontWeight="900" fontFamily="serif" fill="#103f79" letterSpacing="2">CABJ</text>
      {star5(96, 58, 6, "#ffffff")}
      {star5(120, 52, 7, "#f5d020", "#0d2c56", 1)}
      {star5(144, 58, 6, "#ffffff")}
      <text x="120" y="196" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="2">1905</text>
    </svg>
  );
}

/* ============================================================
 *  فلامنغو
 * ============================================================ */
export function FlamengoCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <circle cx="120" cy="120" r="106" fill="#ffffff" stroke="#111111" strokeWidth="4" />
      <circle cx="120" cy="120" r="95" fill="none" stroke="#111111" strokeWidth="11" />
      <circle cx="120" cy="120" r="82" fill="none" stroke="#c52613" strokeWidth="11" />
      <circle cx="120" cy="120" r="70" fill="#ffffff" stroke="#c52613" strokeWidth="2" />
      <text x="120" y="136" textAnchor="middle" fontSize="46" fontWeight="900" fontFamily="serif" fill="#111111" letterSpacing="-2">CRF</text>
      {star5(96, 176, 6, "#c52613")}
      {star5(120, 180, 6, "#111111")}
      {star5(144, 176, 6, "#c52613")}
    </svg>
  );
}

/* ============================================================
 *  السجل الموحّد
 * ============================================================ */
export const CREST_ART: Record<string, () => JSX.Element> = {
  real: RealCrest,
  barca: BarcaCrest,
  united: UnitedCrest,
  bayern: BayernCrest,
  liverpool: LiverpoolCrest,
  hilal: HilalCrest,
  juventus: JuventusCrest,
  inter: InterCrest,
  milan: MilanCrest,
  arsenal: ArsenalCrest,
  chelsea: ChelseaCrest,
  city: CityCrest,
  atletico: AtleticoCrest,
  ahly: AhlyCrest,
  psg: PsgCrest,
  dortmund: DortmundCrest,
  boca: BocaCrest,
  flamengo: FlamengoCrest,
};
