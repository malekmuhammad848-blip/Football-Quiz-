/**
 * Avatar — أفاتار دائري بإطار الدوري
 * لا يعتمد على شبكة إطلاقًا: إيموجي أو حرف أول — مع fallback آمن.
 */

import { leagueFor } from "../domain/leagues";
import { cn } from "../utils/cn";

interface Props {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  ring?: boolean;
  xp?: number; // لتحديد لون الإطار من الدوري (افتراضي 0)
  /** إيموجي الأفاتار المختار (اختياري) */
  emojiOverride?: string;
}

const SIZES = {
  sm: { box: "size-9", text: "text-sm", pad: "p-[2px]" },
  md: { box: "size-12", text: "text-lg", pad: "p-[2.5px]" },
  lg: { box: "size-16", text: "text-xl", pad: "p-[3px]" },
  xl: { box: "size-28", text: "text-4xl", pad: "p-[4px]" },
} as const;

export function Avatar({ name, size = "md", ring = true, xp = 0, emojiOverride }: Props) {
  const s = SIZES[size];
  const league = leagueFor(xp);
  // fallback آمن: إيموجي مختار ← حرف أول ← كرة
  const emoji = typeof emojiOverride === "string" && emojiOverride.trim() ? emojiOverride : null;
  const initial =
    typeof name === "string" && name.trim() ? name.trim().slice(0, 1).toUpperCase() : null;
  const content = emoji ?? initial ?? "⚽";

  return (
    <div
      className={cn(
        "rounded-full",
        ring && cn("bg-gradient-to-br", league.ring),
        s.pad,
      )}
      style={ring ? { boxShadow: `0 0 24px ${league.glow}` } : undefined}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-[#0d1610] font-black text-white",
          s.box,
          emoji ? "text-2xl" : s.text,
        )}
      >
        {content}
      </div>
    </div>
  );
}
