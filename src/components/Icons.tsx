/**
 * أيقونات TiQ المرسومة يدويًا — SVG داخل التطبيق بدل الإيموجي
 * لتناسق كامل مع هوية التطبيق (أخضر/ذهبي).
 */

interface IconProps {
  className?: string;
}

/** شارة إجابة صحيحة: دائرة خضراء متدرجة + علامة صح */
export function CheckBadge({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="ck-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="21" fill="url(#ck-g)" />
      <circle cx="24" cy="24" r="21" stroke="#065f46" strokeOpacity="0.3" strokeWidth="2" />
      <path
        d="M14 24.5l6.5 6.5L34 17.5"
        stroke="#fff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** شارة إجابة خاطئة: دائرة حمراء متدرجة + علامة X */
export function CrossBadge({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="cr-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f87171" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="21" fill="url(#cr-g)" />
      <circle cx="24" cy="24" r="21" stroke="#7f1d1d" strokeOpacity="0.3" strokeWidth="2" />
      <path
        d="M17 17l14 14M31 17L17 31"
        stroke="#fff"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** نار حقيقية متدرجة — لشريط السلسلة */
export function FlameMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="fl-g" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#fde047" />
          <stop offset="0.45" stopColor="#fb923c" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="fl-core" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#fef9c3" />
          <stop offset="1" stopColor="#fdba74" />
        </linearGradient>
      </defs>
      {/* اللهب الخارجي */}
      <path
        d="M12 2.5c.4 3-1.3 4.6-3 6.4C7.2 10.8 5.5 12.8 5.5 16a6.5 6.5 0 0013 0c0-2.4-1-4.4-2.4-6.1-.5 1.2-1.2 2-2.1 2.4.4-3.6-.3-7.3-2-9.8z"
        fill="url(#fl-g)"
      />
      {/* القلب الداخلي */}
      <path
        d="M12 21a3.6 3.6 0 01-3.6-3.6c0-1.5.8-2.6 1.8-3.6.7-.7 1.4-1.4 1.8-2.4 1.6 1.5 3.6 3.3 3.6 6A3.6 3.6 0 0112 21z"
        fill="url(#fl-core)"
        fillOpacity="0.9"
      />
    </svg>
  );
}

/** كأس ذهبي — لمراحل السلسلة */
export function TrophyMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="tr-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde047" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path
        d="M14 8h20v10a10 10 0 01-20 0V8z"
        fill="url(#tr-g)"
        stroke="#92400e"
        strokeWidth="2"
      />
      <path
        d="M14 10H8v3a7 7 0 007 7M34 10h6v3a7 7 0 01-7 7"
        stroke="#92400e"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M21 27h6v5h-6z" fill="#b45309" />
      <rect x="15" y="32" width="18" height="5" rx="1.5" fill="url(#tr-g)" stroke="#92400e" strokeWidth="2" />
    </svg>
  );
}

/** كرة قدم صغيرة — للإحصائيات */
export function BallMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#fff" stroke="#065f46" strokeWidth="1.6" />
      <path d="M12 7.5l4 2.9-1.5 4.6h-5L8 10.4 12 7.5z" fill="#065f46" />
      <path
        d="M12 3v4.5M4.2 9.6l4.1 1.3M6.5 18.4l3-3.2M17.5 18.4l-3-3.2M19.8 9.6l-4.1 1.3"
        stroke="#065f46"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** هدف/دقة */
export function TargetMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="#059669" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.8" stroke="#d97706" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.8" fill="#065f46" />
    </svg>
  );
}

/** وحدة تحكم — عدد المباريات */
export function PadMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 8h10a5 5 0 015 5.5c-.2 1.8-1.7 3-3.3 3-1 0-1.9-.5-2.5-1.3L15 13.5H9l-1.2 1.7c-.6.8-1.5 1.3-2.5 1.3C3.7 16.5 2.2 15.3 2 13.5A5 5 0 017 8z"
        fill="#059669"
        fillOpacity="0.15"
        stroke="#059669"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 11v3M6.5 12.5h3" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="15.5" cy="11.5" r="1" fill="#d97706" />
      <circle cx="17.8" cy="13.5" r="1" fill="#d97706" />
    </svg>
  );
}
