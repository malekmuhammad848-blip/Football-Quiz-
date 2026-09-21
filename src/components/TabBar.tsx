/**
 * TabBar — شريط تنقل سفلي بأسلوب ألعاب الهواتف
 * اليوم · الترجيح · الفعاليات · البروفايل
 */

import { motion } from "framer-motion";
import { CalendarDays, Home, Sparkles, User, Volleyball } from "lucide-react";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";

export type TabId = "today" | "penalty" | "events" | "season" | "profile";

const TABS: { id: TabId; icon: typeof Home; key: "tabToday" | "tabPenalty" | "tabEvents" | "tabSeason" | "tabProfile" }[] = [
  { id: "today", icon: Home, key: "tabToday" },
  { id: "penalty", icon: Volleyball, key: "tabPenalty" },
  { id: "events", icon: CalendarDays, key: "tabEvents" },
  { id: "season", icon: Sparkles, key: "tabSeason" },
  { id: "profile", icon: User, key: "tabProfile" },
];

export function TabBar({ active, onChange, lang }: { active: TabId; onChange: (t: TabId) => void; lang: Lang }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-card-edge bg-nav"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 10px)" }}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pt-1.5">
        {TABS.map(({ id, icon: Icon, key }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              aria-label={t(lang, key)}
              className="relative flex min-w-16 flex-col items-center gap-0.5 px-3 py-1"
            >
              {isActive && (
                <motion.span
                  layoutId="tabGlow"
                  className="absolute -top-1.5 h-1 w-8 rounded-full bg-gradient-to-l from-grass-500 to-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={cn("size-5 transition-colors", isActive ? "text-gold" : "text-faint")} />
              <span className={cn("text-[10px] font-black transition-colors", isActive ? "text-gold" : "text-faint")}>
                {t(lang, key)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
