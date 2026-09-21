/** ============================================================
 *  CountdownBadge — مؤقت منتصف الليل معزول في مكوّن صغير
 *  يعيد رسم نفسه فقط (وليس التطبيق كله) كل ثانية — إصلاح أداء حقيقي.
 *  ============================================================ */

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

function msToMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, midnight.getTime() - now.getTime());
}

function format(ms: number): string {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function CountdownBadge({ urgent }: { urgent?: boolean }) {
  const [left, setLeft] = useState(msToMidnight);
  useEffect(() => {
    const id = setInterval(() => setLeft(msToMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={
        urgent
          ? "flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-sm font-black tabular-nums text-red-500 dark:text-red-400"
          : "flex items-center gap-1.5 text-sm font-bold tabular-nums opacity-70"
      }
    >
      <Timer className="size-4" />
      {format(left)}
    </span>
  );
}
