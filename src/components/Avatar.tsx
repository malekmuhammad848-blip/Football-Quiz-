/**
 * Avatar — أفاتار دائري بإطار الدوري
 * الأفاتار مرسوم SVG محليًا — يظهر دائمًا بلا أي اعتماد خارجي.
 * fallback: الكرة — لا حرف أول ولا فراغ أبدًا.
 */

import { leagueFor } from "../domain/leagues";
import { cn } from "../utils/cn";
import { AvatarArt } from "./AvatarArt";

interface Props {
  /** متروك للتوافق — الأفاتار مرسوم الآن ولا يحتاج اسمًا */
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  ring?: boolean;
  xp?: number;
  /** معرف الأفاتار المختار */
  avatarId?: string | null;
}

const SIZES = {
  sm: { box: "size-9", pad: "p-[2px]" },
  md: { box: "size-12", pad: "p-[2.5px]" },
  lg: { box: "size-16", pad: "p-[3px]" },
  xl: { box: "size-28", pad: "p-[4px]" },
} as const;

export function Avatar({ name: _name, size = "md", ring = true, xp = 0, avatarId }: Props) {
  const s = SIZES[size];
  const league = leagueFor(xp);

  return (
    <div
      className={cn(
        "rounded-full",
        ring && cn("bg-gradient-to-br", league.ring),
        s.pad,
      )}
      style={ring ? { boxShadow: `0 0 24px ${league.glow}` } : undefined}
    >
      <AvatarArt id={avatarId} className={cn("flex items-center justify-center overflow-hidden rounded-full p-1", s.box)} />
    </div>
  );
}
