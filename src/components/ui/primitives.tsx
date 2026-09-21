/** ============================================================
 *  UI primitives — عناصر واجهة أساسية قابلة لإعادة الاستخدام
 *  ============================================================ */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/** البطاقة الزجاجية — عنصر الهوية البصري */
export function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("glass-card rounded-3xl", className)}>{children}</div>;
}

/** مفتاح تبديل (switch) بتحريك سلس */
export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200",
        on ? "bg-grass-500" : "bg-ghost",
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute top-0.5 size-6 rounded-full bg-white shadow"
        style={{ insetInlineStart: on ? 22 : 2 }}
      />
    </button>
  );
}

/** مجموعة اختيار مقسمة (segmented control) */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex rounded-2xl bg-ink/5 p-1 dark:bg-white/10", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "relative flex-1 rounded-xl px-2 py-2 text-xs font-bold transition-all duration-150 sm:text-sm",
            value === o.value
              ? "bg-surface text-grass-700 shadow-sm dark:text-grass-400"
              : "opacity-60 hover:opacity-90",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** شارة صغيرة */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "grass" | "gold" | "danger";
  className?: string;
}) {
  const tones = {
    neutral: "bg-ink/5 text-ink/70 dark:bg-white/10 dark:text-white/70",
    grass: "bg-grass-500/10 text-grass-700 dark:text-grass-400",
    gold: "bg-gold/20 text-amber-700 dark:text-amber-300",
    danger: "bg-red-500/10 text-red-600 dark:text-red-400",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black sm:text-xs", tones[tone], className)}>
      {children}
    </span>
  );
}

/** زر مع أنماط جاهزة */
type ButtonVariant = "primary" | "ghost" | "danger" | "gold";

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const variants = {
    primary: "bg-gradient-to-l from-grass-600 to-grass-500 text-white shadow-md hover:brightness-110 active:brightness-95",
    ghost: "border border-line hover:bg-ink/5 dark:hover:bg-white/5",
    danger: "border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-500/10",
    gold: "bg-gradient-to-l from-amber-500 to-gold text-amber-950 shadow-md hover:brightness-105",
  } as const;
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base",
        variants[variant],
        className,
      )}
    />
  );
}

/** صف إعداد: أيقونة + عنوان + وصف + تحكم */
export function SettingRow({
  icon,
  title,
  subtitle,
  control,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  control: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-grass-500/10 text-grass-700 dark:text-grass-400">
          {icon}
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-bold">{title}</p>
          {subtitle && <p className="truncate text-[11px] font-medium opacity-50">{subtitle}</p>}
        </div>
      </div>
      {control}
    </div>
  );
}

/** شريط تقدم رأسي/أفقي مع تلوين ذهبي */
export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-white/10", className)}>
      <motion.div
        className="h-full rounded-full bg-gradient-to-l from-grass-500 to-gold"
        initial={false}
        animate={{ width: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
