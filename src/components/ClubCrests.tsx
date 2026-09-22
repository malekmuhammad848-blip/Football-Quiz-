/**
 * ClubCrests — شعارات أندية واقعية عالية الدقة (viewBox 240)
 * كل شعار مرسوم بعناية فائقة ليطابق الشعار الأصلي قدر الإمكان:
 * ريال (تاج + شريط قطري + قلعة) · برشلونة (الأرباع الأربعة + سان جوردي)
 * يونايتد (الشيطان) · بايرن (الحلقات + أطواق الراين) · ليفربول (الليفر فيرنيولا)
 * الهلال (الهلال والنجمة) · يوفنتوس (الخطوط الثلاثة + Taurus) · إنتر (الدائرة الذهبية)
 * ميلان (النصفان + صليب سانت أمبروز) · أرسنال (المدفع الغربي) · تشيلسي (العصا)
 * سيتي (الصقر الفصيحي) · أتلتيكو (الدب والفراولة) · الأهلي (النسر الذهبي)
 */

export function RealCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="rm-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd54a" />
          <stop offset="0.5" stopColor="#f5b91e" />
          <stop offset="1" stopColor="#c8860a" />
        </linearGradient>
        <linearGradient id="rm-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d6fc2" />
          <stop offset="1" stopColor="#003d7d" />
        </linearGradient>
      </defs>

      {/* التاج الكبير */}
      <g>
        <path d="M85 62 L85 30 L102 44 L120 22 L138 44 L155 30 L155 62 Z" fill="url(#rm-gold)" stroke="#8a5c08" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="85" cy="27" r="6" fill="url(#rm-gold)" stroke="#8a5c08" strokeWidth="2" />
        <circle cx="120" cy="18" r="7" fill="url(#rm-gold)" stroke="#8a5c08" strokeWidth="2" />
        <circle cx="155" cy="27" r="6" fill="url(#rm-gold)" stroke="#8a5c08" strokeWidth="2" />
        {/* جواهر التاج */}
        <circle cx="102" cy="46" r="3.4" fill="#e53935" />
        <circle cx="138" cy="46" r="3.4" fill="#e53935" />
        <circle cx="120" cy="50" r="3.8" fill="#2e7d32" />
        <path d="M85 56 H155" stroke="#8a5c08" strokeWidth="2.4" />
      </g>

      {/* الدرع الرئيسي */}
      <path d="M120 66 L186 84 V138 C186 172 160 198 120 214 C80 198 54 172 54 138 V84 Z" fill="#ffffff" stroke="url(#rm-gold)" strokeWidth="7" />

      {/* الشريط القُطري الذهبي */}
      <clipPath id="rm-clip">
        <path d="M120 66 L186 84 V138 C186 172 160 198 120 214 C80 198 54 172 54 138 V84 Z" />
      </clipPath>
      <g clipPath="url(#rm-clip)">
        <path d="M54 100 L186 178 L186 196 L54 118 Z" fill="url(#rm-gold)" opacity="0.9" />
        <path d="M54 96 L186 174" stroke="#8a5c08" strokeWidth="1.6" opacity="0.6" />
        <path d="M54 122 L186 200" stroke="#8a5c08" strokeWidth="1.6" opacity="0.6" />
      </g>

      {/* القلعة الزرقاء (كستيا) */}
      <g>
        <path d="M84 128 L120 106 L156 128 V162 L120 186 L84 162 Z" fill="url(#rm-blue)" stroke="#002d5c" strokeWidth="2.4" />
        {/* أبراج القلعة الثلاثة */}
        <rect x="90" y="132" width="12" height="20" rx="2" fill="#ffffff" />
        <rect x="114" y="132" width="12" height="20" rx="2" fill="#ffffff" />
        <rect x="138" y="132" width="12" height="20" rx="2" fill="#ffffff" />
        {/* شرفات الأبراج */}
        <path d="M90 132 h4 v-4 h4 v4 M114 132 h4 v-4 h4 v4 M138 132 h4 v-4 h4 v4" fill="#ffffff" />
        {/* البوابة */}
        <path d="M108 172 Q120 158 132 172 V186 H108 Z" fill="#ffffff" />
      </g>

      {/* كرة القدم في الأعلى */}
      <circle cx="120" cy="94" r="14" fill="#ffffff" stroke="#003d7d" strokeWidth="2.2" />
      <path d="M120 84 L129 91 L125.5 101 H114.5 L111 91 Z" fill="#003d7d" />
    </svg>
  );
}

export function BarcaCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      {/* الدرع الجانبي */}
      <path d="M120 10 L200 30 V130 C200 178 168 210 120 228 C72 210 40 178 40 130 V30 Z" fill="#edbb00" stroke="#a50044" strokeWidth="4" />

      {/* الربع الأول: سان جوردي (أعلى يسار) */}
      <clipPath id="bc-clip">
        <path d="M120 10 L200 30 V130 C200 178 168 210 120 228 C72 210 40 178 40 130 V30 Z" />
      </clipPath>
      <g clipPath="url(#bc-clip)">
        <rect x="40" y="10" width="80" height="100" fill="#ffffff" />
        {[52, 66, 80, 94, 108].map((x) => (
          <rect key={x} x={x} y="12" width="8" height="94" fill="#db0030" />
        ))}

        {/* الربع الثاني: بلاوقرانا (أعلى يمين) */}
        <rect x="120" y="10" width="80" height="100" fill="#004d98" />
        {[130, 146, 162, 178, 194].map((x) => (
          <rect key={x} x={x} y="12" width="9" height="94" fill="#a50044" />
        ))}

        {/* الحزام الذهبي */}
        <rect x="40" y="110" width="160" height="22" fill="#edbb00" />
        <rect x="40" y="110" width="160" height="22" fill="none" stroke="#a50044" strokeWidth="2" />

        {/* الربع السفلي: الكرة على خلفية مقلوبة */}
        <rect x="40" y="132" width="160" height="100" fill="#a50044" />
        {/* الكرة */}
        <circle cx="120" cy="182" r="34" fill="#004d98" />
        <path d="M120 148 A34 34 0 0 1 120 216 Z" fill="#a50044" opacity="0" />
        <circle cx="120" cy="182" r="34" fill="none" stroke="#edbb00" strokeWidth="4" />
        {/* خماسيات الكرة */}
        <path d="M120 168 L133 178 L128 194 H112 L107 178 Z" fill="#ffffff" opacity="0.92" />
        <path d="M120 148 L120 162 M99 172 L92 166 M141 172 L148 166 M104 200 L98 208 M136 200 L142 208" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* خطوط فاصلة بين الأرباع */}
      <path d="M120 10 V228 M40 121 H200" stroke="#a50044" strokeWidth="3" opacity="0.55" />
      <path d="M120 10 L200 30 V130 C200 178 168 210 120 228 C72 210 40 178 40 130 V30 Z" fill="none" stroke="#edbb00" strokeWidth="5" />
      <path d="M120 10 L200 30 V130 C200 178 168 210 120 228 C72 210 40 178 40 130 V30 Z" fill="none" stroke="#a50044" strokeWidth="2" />
    </svg>
  );
}

export function UnitedCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="mu-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8362a" />
          <stop offset="1" stopColor="#b31217" />
        </linearGradient>
      </defs>

      {/* الدرع */}
      <path d="M120 14 L192 34 V130 C192 172 164 202 120 222 C76 202 48 172 48 130 V34 Z" fill="url(#mu-red)" stroke="#fbe122" strokeWidth="6" />

      {/* الحدود الداخلية */}
      <path d="M120 26 L182 43 V128 C182 164 158 190 120 208 C82 190 58 164 58 128 V43 Z" fill="none" stroke="#fbe122" strokeWidth="2.4" opacity="0.7" />

      {/* السفينة العلوية */}
      <g transform="translate(120,52)">
        <path d="M-30 4 H30 L24 14 H-24 Z" fill="#fbe122" />
        <path d="M-22 4 V-10 M-14 4 V-14 M-6 4 V-16 M2 4 V-14 M10 4 V-10" stroke="#fbe122" strokeWidth="3" strokeLinecap="round" />
        <path d="M-30 8 H30" stroke="#fbe122" strokeWidth="2" opacity="0.7" />
      </g>

      {/* الشيطان الأصفر — رسم مفصل */}
      <g transform="translate(120,132)">
        {/* الرأس والجسم */}
        <path
          d="M0 -34 C-9 -34 -14 -28 -14 -21 C-24 -18 -30 -11 -30 -2 C-30 8 -23 15 -14 16 C-19 22 -18 31 -12 36 C-6 41 2 41 6 36 C10 41 18 41 24 36 C30 31 31 22 26 16 C35 15 42 8 42 -2 C42 -11 36 -18 26 -21 C26 -28 21 -34 12 -34 Z"
          fill="#fbe122"
          stroke="#8b0000"
          strokeWidth="2.4"
        />
        {/* الشعر الشائك */}
        <path d="M-14 -26 L-24 -40 M-6 -30 L-10 -46 M6 -30 L10 -46 M14 -26 L24 -40" stroke="#fbe122" strokeWidth="4" strokeLinecap="round" />
        {/* العيون */}
        <circle cx="-8" cy="-6" r="4" fill="#8b0000" />
        <circle cx="8" cy="-6" r="4" fill="#8b0000" />
        {/* الفم */}
        <path d="M-10 10 Q0 18 10 10" stroke="#8b0000" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* الشوكة */}
        <path d="M30 12 L46 2 M46 2 L44 10 M46 2 L38 0" stroke="#fbe122" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* الشريط السفلي */}
      <path d="M48 172 H192" stroke="#fbe122" strokeWidth="3" />
      <text x="120" y="206" textAnchor="middle" fontSize="20" fontWeight="900" fontFamily="serif" fill="#fbe122">MANCHESTER</text>
    </svg>
  );
}

export function BayernCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      {/* الحلقة الخارجية */}
      <circle cx="120" cy="120" r="104" fill="#ffffff" stroke="#0066b2" strokeWidth="10" />
      <circle cx="120" cy="120" r="88" fill="none" stroke="#0066b2" strokeWidth="3" />

      {/* الحلقة الزرقاء بالكلمة */}
      <circle cx="120" cy="120" r="96" fill="none" stroke="#0066b2" strokeWidth="14" />
      <text x="120" y="42" textAnchor="middle" fontSize="15" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="3">FC BAYERN</text>
      <text x="120" y="212" textAnchor="middle" fontSize="15" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="3">MÜNCHEN</text>
      <text x="40" y="126" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="serif" fill="#ffffff" transform="rotate(-90 40 126)">1900</text>

      {/* الدائرة الحمراء */}
      <circle cx="120" cy="120" r="74" fill="#dc052d" stroke="#ffffff" strokeWidth="4" />

      {/* الحلقة الداخلية الزرقاء */}
      <circle cx="120" cy="120" r="50" fill="#0066b2" />

      {/* أطواق الراين البيضاء الأفقية */}
      <clipPath id="bay-clip">
        <circle cx="120" cy="120" r="50" />
      </clipPath>
      <g clipPath="url(#bay-clip)">
        <rect x="60" y="110" width="120" height="6" fill="#ffffff" />
        <rect x="60" y="124" width="120" height="6" fill="#ffffff" />
      </g>

      {/* النجمة العلوية */}
      <path
        d="M120 6 L126 22 L143 24 L130.5 36 L134 53 L120 44 L106 53 L109.5 36 L97 24 L114 22 Z"
        fill="#0066b2" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round"
      />
    </svg>
  );
}

export function LiverpoolCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="liv-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d41330" />
          <stop offset="1" stopColor="#a50f24" />
        </linearGradient>
      </defs>

      {/* الدرع */}
      <path d="M120 12 L190 32 V128 C190 170 162 200 120 220 C78 200 50 170 50 128 V32 Z" fill="url(#liv-red)" stroke="#f6eb61" strokeWidth="6" />
      <path d="M120 24 L180 41 V126 C180 162 156 188 120 206 C84 188 60 162 60 126 V41 Z" fill="none" stroke="#f6eb61" strokeWidth="2" opacity="0.7" />

      {/* تموّج ذهبي علوي */}
      <path d="M60 44 Q75 38 90 44 T120 44 T150 44 T180 44" stroke="#f6eb61" strokeWidth="3" fill="none" opacity="0.6" />

      {/* طائر الليفر — رسم مفصل */}
      <g transform="translate(120,118)">
        {/* الجسم */}
        <path
          d="M4 -46 C-4 -46 -10 -40 -10 -33 L-30 -27 L-10 -22 C-11 -13 -7 -6 0 -3 L-16 20 L-2 14 L-4 30 L4 16 L12 30 L10 14 L24 20 L8 -3 C15 -6 19 -13 18 -22 L38 -27 L18 -33 C18 -40 12 -46 4 -46 Z"
          fill="#f6eb61"
          stroke="#8b0000"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* الرأس والمنقار */}
        <path d="M8 -46 C14 -50 20 -48 22 -42 L14 -38 Z" fill="#f6eb61" stroke="#8b0000" strokeWidth="1.4" />
        {/* العين */}
        <circle cx="10" cy="-38" r="2.4" fill="#8b0000" />
        {/* الريش التفصيلي */}
        <path d="M-6 -18 Q0 -14 6 -18 M-4 -8 Q0 -4 4 -8" stroke="#8b0000" strokeWidth="1.2" fill="none" opacity="0.7" />
      </g>

      {/* الشريطان الذهبيان */}
      <path d="M60 58 H180" stroke="#f6eb61" strokeWidth="3.4" />
      <path d="M60 192 H180" stroke="#f6eb61" strokeWidth="3.4" />
      <text x="120" y="184" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="serif" fill="#f6eb61" letterSpacing="2">EST. 1892</text>
    </svg>
  );
}

export function HilalCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="hl-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1476d2" />
          <stop offset="1" stopColor="#0a3f8f" />
        </linearGradient>
      </defs>

      {/* الدائرة الخارجية */}
      <circle cx="120" cy="120" r="104" fill="url(#hl-blue)" stroke="#ffffff" strokeWidth="9" />
      <circle cx="120" cy="120" r="88" fill="none" stroke="#ffffff" strokeWidth="2.4" opacity="0.65" />

      {/* الهلال الكبير */}
      <path d="M140 40 A82 82 0 1 0 140 200 A96 96 0 1 1 140 40 Z" fill="#ffffff" />

      {/* النجمة */}
      <path
        d="M150 66 L157 87 L179 87 L161 100 L168 122 L150 108 L132 122 L139 100 L121 87 L143 87 Z"
        fill="#ffffff" stroke="#0a3f8f" strokeWidth="1.6" strokeLinejoin="round"
      />

      {/* نص دائري */}
      <text x="120" y="222" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="4">AL HILAL</text>
    </svg>
  );
}

export function JuventusCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      {/* الدرع الأنيق */}
      <path d="M120 12 L186 32 V126 C186 168 158 200 120 220 C82 200 54 168 54 126 V32 Z" fill="#ffffff" stroke="#111111" strokeWidth="7" />

      {/* الخطوط الثلاثة العلوية */}
      <clipPath id="juv-clip">
        <path d="M120 12 L186 32 V126 C186 168 158 200 120 220 C82 200 54 168 54 126 V32 Z" />
      </clipPath>
      <g clipPath="url(#juv-clip)">
        <path d="M120 12 L186 32 V70 L120 70 Z" fill="#111111" />
        <path d="M54 32 L120 12 V70 L54 70 Z" fill="#ffffff" stroke="#111111" strokeWidth="2" />
        {/* الخط الوسطي */}
        <rect x="114" y="12" width="12" height="58" fill="#111111" />
      </g>

      {/* تاج صغير علوي */}
      <path d="M96 20 L102 8 L111 16 L120 4 L129 16 L138 8 L144 20 Z" fill="#111111" />

      {/* الثور Taurus الشهير */}
      <g transform="translate(120,128)" fill="#111111">
        {/* رأس الثور الجانبي */}
        <path d="M-34 8 C-34 -8 -22 -20 -6 -20 L8 -20 C24 -20 34 -8 34 8 C34 18 28 26 18 26 L18 12 C18 4 12 -2 4 -2 L-6 -2 C-14 -2 -20 4 -20 12 L-20 26 C-30 26 -34 18 -34 8 Z" />
        {/* القرنان */}
        <path d="M8 -20 C14 -30 24 -34 34 -30 C28 -24 22 -20 16 -16" fill="#111111" />
        <path d="M-6 -20 C-2 -28 4 -32 10 -34 C8 -26 4 -22 0 -18" fill="#111111" />
        {/* العين */}
        <circle cx="16" cy="-6" r="2.6" fill="#ffffff" />
        {/* الأنف */}
        <circle cx="28" cy="12" r="2" fill="#ffffff" opacity="0.55" />
      </g>

      {/* النجوم الثلاث */}
      {[86, 120, 154].map((x, i) => (
        <path
          key={i}
          d={`M${x} 186 l3.4 7 7.8 1-5.6 5.5 1.4 7.7-7-3.7-7 3.7 1.4-7.7-5.6-5.5 7.8-1 Z`}
          fill="#111111"
        />
      ))}
    </svg>
  );
}

export function InterCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      {/* الدائرة الخارجية */}
      <circle cx="120" cy="120" r="104" fill="#ffffff" stroke="#0068a8" strokeWidth="7" />

      {/* الحلقة الذهبية الخارجية */}
      <circle cx="120" cy="120" r="92" fill="none" stroke="#a98d4b" strokeWidth="6" />

      {/* الدائرة الزرقاء الداخلية */}
      <circle cx="120" cy="120" r="80" fill="#0068a8" />

      {/* الحلقة السوداء المتقطعة */}
      <circle cx="120" cy="120" r="80" fill="none" stroke="#111111" strokeWidth="7" strokeDasharray="38 12" />

      {/* الحرف I الذهبي */}
      <text x="120" y="150" textAnchor="middle" fontSize="88" fontWeight="900" fontFamily="serif" fill="#ffffff" stroke="#a98d4b" strokeWidth="2.4">I</text>

      {/* سنة التأسيس */}
      <text x="120" y="184" textAnchor="middle" fontSize="17" fontWeight="900" fontFamily="serif" fill="#d9c07a" letterSpacing="2">1908</text>

      {/* نجمة علوية */}
      <path d="M120 14 L126 30 L143 32 L130 44 L134 61 L120 52 L106 61 L110 44 L97 32 L114 30 Z" fill="#0068a8" stroke="#a98d4b" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function MilanCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      {/* الدائرة الخارجية */}
      <circle cx="120" cy="120" r="104" fill="#ffffff" stroke="#111111" strokeWidth="6" />

      {/* النصفان: أحمر يسار، أسود يمين */}
      <clipPath id="mil-clip">
        <circle cx="120" cy="120" r="86" />
      </clipPath>
      <g clipPath="url(#mil-clip)">
        <rect x="34" y="34" width="86" height="172" fill="#b01c2e" />
        <rect x="120" y="34" width="86" height="172" fill="#111111" />
      </g>
      <circle cx="120" cy="120" r="86" fill="none" stroke="#111111" strokeWidth="3.4" />

      {/* صليب سانت أمبروز — ميلانو */}
      <g fill="#ffffff">
        <rect x="113" y="52" width="14" height="70" rx="3" />
        <rect x="85" y="80" width="70" height="14" rx="3" />
      </g>

      {/* النجمة والكأس الصغيرتان */}
      <path d="M120 34 L124.5 45 L136 46 L127 54 L130 66 L120 59 L110 66 L113 54 L104 46 L115.5 45 Z" fill="#ffffff" opacity="0.95" />

      {/* AC و MILAN */}
      <text x="120" y="152" textAnchor="middle" fontSize="20" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="3">ACM</text>
      <text x="120" y="176" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="2">1899</text>
    </svg>
  );
}

export function ArsenalCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="ars-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ef4b3a" />
          <stop offset="1" stopColor="#c1070f" />
        </linearGradient>
      </defs>

      {/* الدرع */}
      <path d="M120 12 L190 32 V126 C190 168 162 200 120 220 C78 200 50 170 50 126 V32 Z" fill="url(#ars-red)" stroke="#063672" strokeWidth="6" />
      <path d="M120 24 L180 41 V124 C180 160 156 186 120 206 C84 186 60 160 60 124 V41 Z" fill="none" stroke="#063672" strokeWidth="2" opacity="0.65" />

      {/* الشعار الذهبي أعلى */}
      <path d="M84 34 Q120 22 156 34 L150 50 Q120 40 90 50 Z" fill="#9c824a" opacity="0.9" />

      {/* المدفع الغربي الشهير */}
      <g transform="translate(120,116) rotate(-18)">
        {/* السبطانة */}
        <rect x="-52" y="-7" width="86" height="15" rx="7" fill="#063672" />
        <rect x="-52" y="-7" width="86" height="6" rx="3" fill="#1a4d8f" />
        {/* فتحة السبطانة */}
        <circle cx="36" cy="0.5" r="5.4" fill="#0a2a52" />
        {/* المؤخرة */}
        <path d="M-52 -7 L-66 -2 Q-70 0 -66 3 L-52 8 Z" fill="#063672" />
        {/* العجلة الكبيرة */}
        <circle cx="-14" cy="18" r="15" fill="#063672" />
        <circle cx="-14" cy="18" r="15" fill="none" stroke="#9c824a" strokeWidth="3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="-14" y1="18" x2={-14 + Math.cos((a * Math.PI) / 180) * 13} y2={18 + Math.sin((a * Math.PI) / 180) * 13} stroke="#9c824a" strokeWidth="2" />
        ))}
        <circle cx="-14" cy="18" r="4" fill="#9c824a" />
      </g>

      {/* النص */}
      <text x="120" y="186" textAnchor="middle" fontSize="17" fontWeight="900" fontFamily="serif" fill="#063672" letterSpacing="3">ARSENAL</text>
    </svg>
  );
}

export function ChelseaCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="chl-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b6ec2" />
          <stop offset="1" stopColor="#034694" />
        </linearGradient>
      </defs>

      {/* الدرع */}
      <path d="M120 12 L192 34 V130 C192 172 164 202 120 222 C76 202 48 172 48 130 V34 Z" fill="url(#chl-blue)" stroke="#ffffff" strokeWidth="6.5" />
      {/* حلقة داخلية ذهبية */}
      <path d="M120 24 L182 43 V128 C182 164 158 190 120 208 C82 190 58 164 58 128 V43 Z" fill="none" stroke="#d4af37" strokeWidth="2.4" opacity="0.85" />

      {/* الأباطرة الزرقاء الدائرية */}
      <circle cx="120" cy="112" r="44" fill="#ffffff" opacity="0.12" />
      <circle cx="120" cy="112" r="44" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="6 4" />

      {/* العصا الرعوية والكرة */}
      <g>
        <path d="M104 62 C104 56 112 54 114 60 C116 64 112 68 108 68 L108 148" stroke="#d4af37" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="108" cy="58" r="5.4" fill="#d4af37" />
        {/* الكرة الحمراء */}
        <circle cx="134" cy="128" r="11" fill="#e53935" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M134 117 L134 139 M124 122 L144 122" stroke="#ffffff" strokeWidth="1.4" />
      </g>

      {/* الوردة والنجمة */}
      <path d="M136 66 l3 6.4 7 1-5 5 1.2 7-6.2-3.4-6.2 3.4 1.2-7-5-5 7-1 Z" fill="#d4af37" />

      {/* النص */}
      <text x="120" y="184" textAnchor="middle" fontSize="16" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="2">CHELSEA</text>
    </svg>
  );
}

export function CityCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="mc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fc3ea" />
          <stop offset="1" stopColor="#4a90c4" />
        </linearGradient>
      </defs>

      {/* الدرع الدائري */}
      <circle cx="120" cy="120" r="104" fill="url(#mc-sky)" stroke="#ffffff" strokeWidth="8" />
      <circle cx="120" cy="120" r="86" fill="#1c2c5b" />

      {/* الصقر الذهبي الفصيح */}
      <g transform="translate(120,116)">
        {/* الجسم الانسيابي */}
        <path d="M0 -52 C-22 -44 -36 -24 -36 2 C-36 30 -18 48 0 56 C18 48 36 30 36 2 C36 -24 22 -44 0 -52 Z" fill="#6cabdd" />
        {/* الرأس */}
        <path d="M0 -52 C8 -48 14 -40 14 -30 L-14 -30 C-14 -40 -8 -48 0 -52 Z" fill="#1c2c5b" />
        {/* المنقار */}
        <path d="M6 -46 L20 -42 L8 -36 Z" fill="#d4af37" />
        {/* العين */}
        <circle cx="6" cy="-38" r="2.6" fill="#ffffff" />
        {/* الجناحان */}
        <path d="M-36 2 C-30 -8 -22 -14 -12 -16 L-16 8 C-24 10 -32 8 -36 2 Z" fill="#1c2c5b" opacity="0.85" />
        <path d="M36 2 C30 -8 22 -14 12 -16 L16 8 C24 10 32 8 36 2 Z" fill="#1c2c5b" opacity="0.85" />
        {/* الذيل */}
        <path d="M-10 56 L0 70 L10 56 L0 52 Z" fill="#d4af37" />
        {/* الصدر الأبيض */}
        <path d="M0 -16 C10 -14 16 -4 16 8 C16 24 8 36 0 40 C-8 36 -16 24 -16 8 C-16 -4 -10 -14 0 -16 Z" fill="#ffffff" opacity="0.16" />
      </g>

      {/* السهم العلوي */}
      <path d="M120 30 L146 66 L120 56 L94 66 Z" fill="#ffffff" opacity="0.95" />

      {/* النجمة السفلية */}
      <path d="M120 168 L124 179 L136 180 L126.5 188 L129.5 200 L120 193.5 L110.5 200 L113.5 188 L104 180 L116 179 Z" fill="#d4af37" />

      {/* النص الدائري */}
      <text x="120" y="222" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="3">MANCHESTER CITY</text>
    </svg>
  );
}

export function AtleticoCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      {/* الدرع */}
      <path d="M120 12 L190 32 V126 C190 168 162 200 120 220 C78 200 50 170 50 126 V32 Z" fill="#ffffff" stroke="#262e62" strokeWidth="6" />

      {/* الأرباع: أحمر/أزرق/أحمر/أزرق */}
      <clipPath id="atl-clip">
        <path d="M120 12 L190 32 V126 C190 168 162 200 120 220 C78 200 50 170 50 126 V32 Z" />
      </clipPath>
      <g clipPath="url(#atl-clip)">
        <rect x="50" y="12" width="70" height="104" fill="#cb3524" />
        <rect x="120" y="12" width="70" height="104" fill="#ffffff" />
        <rect x="50" y="116" width="70" height="104" fill="#1a2f6e" />
        <rect x="120" y="116" width="70" height="104" fill="#cb3524" />
      </g>

      {/* الحدود الفاصلة */}
      <path d="M120 12 V220 M50 116 H190" stroke="#262e62" strokeWidth="3" />

      {/* الدب والشجرة — رمز مدريد */}
      <g transform="translate(120,112)">
        {/* الشجرة (الفراولة الشجرية) */}
        <path d="M-6 -14 C-14 -8 -16 2 -12 10 L0 10 L12 10 C16 2 14 -8 6 -14 Z" fill="#3f7d3a" />
        <rect x="-2" y="10" width="4" height="10" fill="#7a4a21" />
        {/* الدب */}
        <g transform="translate(6,4)">
          <ellipse cx="0" cy="6" rx="10" ry="8" fill="#7a4a21" />
          <circle cx="-4" cy="-4" r="5.4" fill="#7a4a21" />
          <circle cx="4" cy="-4" r="5.4" fill="#7a4a21" />
          <circle cx="0" cy="0" r="6.4" fill="#8d5a30" />
          <circle cx="-2.4" cy="-1" r="1.1" fill="#111111" />
          <circle cx="2.4" cy="-1" r="1.1" fill="#111111" />
        </g>
      </g>

      {/* السبعة نجوم */}
      {[62, 84, 106, 128, 150, 172].map((x, i) => (
        <path
          key={i}
          d={`M${x} 40 l2.6 5.6 6.2.8-4.5 4.4 1.1 6.1-5.4-3-5.4 3 1.1-6.1-4.5-4.4 6.2-.8 Z`}
          fill="#ffffff"
        />
      ))}

      {/* الحزام السفلي */}
      <text x="120" y="196" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="serif" fill="#262e62" letterSpacing="2">ATM</text>
    </svg>
  );
}

export function AhlyCrest() {
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="ah-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d42a2a" />
          <stop offset="1" stopColor="#8f1111" />
        </linearGradient>
      </defs>

      {/* الدرع */}
      <path d="M120 12 L190 32 V126 C190 168 162 200 120 220 C78 200 50 170 50 126 V32 Z" fill="url(#ah-red)" stroke="#ffffff" strokeWidth="6" />
      <path d="M120 24 L180 41 V124 C180 160 156 186 120 206 C84 186 60 160 60 124 V41 Z" fill="none" stroke="#d4af37" strokeWidth="2.2" opacity="0.8" />

      {/* النسر الذهبي بجناحين مفتوحين */}
      <g transform="translate(120,112)">
        {/* الجناحان */}
        <path d="M0 -8 C-8 -22 -22 -32 -44 -34 C-34 -22 -28 -12 -26 -2 C-34 2 -38 10 -36 20 C-24 16 -12 16 -4 20 Z" fill="#d4af37" stroke="#8b6914" strokeWidth="2" />
        <path d="M0 -8 C8 -22 22 -32 44 -34 C34 -22 28 -12 26 -2 C34 2 38 10 36 20 C24 16 12 16 4 20 Z" fill="#d4af37" stroke="#8b6914" strokeWidth="2" />
        {/* الجسم */}
        <ellipse cx="0" cy="6" rx="12" ry="18" fill="#f0cf6e" stroke="#8b6914" strokeWidth="2" />
        {/* الرأس */}
        <circle cx="0" cy="-16" r="9" fill="#f0cf6e" stroke="#8b6914" strokeWidth="2" />
        {/* المنقار */}
        <path d="M0 -14 L8 -12 L0 -9 Z" fill="#8b6914" />
        {/* العيون */}
        <circle cx="-3" cy="-18" r="1.6" fill="#5d3a00" />
        <circle cx="3" cy="-18" r="1.6" fill="#5d3a00" />
        {/* الريش */}
        <path d="M-8 2 L8 2 M-8 10 L8 10" stroke="#8b6914" strokeWidth="1.2" opacity="0.6" />
      </g>

      {/* النص */}
      <text x="120" y="192" textAnchor="middle" fontSize="15" fontWeight="900" fontFamily="serif" fill="#ffffff" letterSpacing="2">1907</text>
    </svg>
  );
}

export const CREST_ART: Record<string, () => React.JSX.Element> = {
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
};
