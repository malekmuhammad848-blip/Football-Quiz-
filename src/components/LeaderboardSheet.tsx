/** ============================================================
 *  LeaderboardSheet — الترتيب الأسبوعي (من view في Supabase)
 *  ============================================================ */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchWeeklyLeaderboard, type LeaderRow, type Session } from "../lib/backend";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { Sheet } from "./ui/Sheet";
import { BallMark, FlameMark } from "./Icons";

interface Props {
  open: boolean;
  onClose: () => void;
  session: Session | null;
  lang: Lang;
}

const MEDALS = ["🥇", "🥈", "🥉"] as const;

export function LeaderboardSheet({ open, onClose, session, lang }: Props) {
  const [rows, setRows] = useState<LeaderRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    setRows(null);
    setError(null);
    fetchWeeklyLeaderboard()
      .then((r) => alive && setRows(r))
      .catch((e) => alive && setError(e instanceof Error ? e.message : "error"));
    return () => {
      alive = false;
    };
  }, [open]);

  const myId = session?.user.id;

  return (
    <Sheet open={open} onClose={onClose} title={t(lang, "weeklyBoard")}>
      {rows === null && !error && (
        <div className="space-y-2 py-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-ghost" />
          ))}
        </div>
      )}

      {error && <p className="py-6 text-center text-sm font-bold text-red-400">{error}</p>}

      {rows !== null && rows.length === 0 && (
        <p className="py-6 text-center text-sm font-bold text-soft">{t(lang, "noCloud")}</p>
      )}

      {rows !== null && rows.length > 0 && (
        <ol className="space-y-1.5">
          {rows.map((r, i) => {
            const me = r.user_id === myId;
            return (
              <motion.li
                key={r.user_id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.4) }}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5",
                  me
                    ? "border border-grass-500/40 bg-grass-500/10"
                    : "bg-ghost",
                )}
              >
                <span className="w-8 shrink-0 text-center text-sm font-black tabular-nums text-soft">
                  {r.pos <= 3 ? MEDALS[r.pos - 1] : r.pos}
                </span>
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-sm font-bold",
                    me && "text-grass-300",
                  )}
                >
                  {r.display_name}
                  {me && <span className="ms-1.5 text-[10px] font-black opacity-60">({t(lang, "you")})</span>}
                </span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-bold tabular-nums text-soft">
                  <BallMark className="size-3.5" /> {r.correct_count}
                </span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-bold tabular-nums text-orange-300">
                  <FlameMark className="size-3.5" /> {r.streak}
                </span>
              </motion.li>
            );
          })}
        </ol>
      )}
    </Sheet>
  );
}
