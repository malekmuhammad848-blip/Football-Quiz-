/** ============================================================
 *  AppHeader — الشريط العلوي
 *  ============================================================ */

import { Moon, Settings, Sun } from "lucide-react";
import { APP } from "../core/config";
import { t, type Lang } from "../lib/i18n";
import { prefsStore } from "../stores/prefsStore";
import { cn } from "../utils/cn";
import { Avatar } from "./Avatar";

interface Props {
  lang: Lang;
  isDark: boolean;
  playerName: string;
  onToggleLang: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
}

export function AppHeader({ lang, isDark, playerName, onToggleLang, onOpenSettings, onOpenProfile }: Props) {
  return (
    <header
      className="flex items-center justify-between gap-2 px-3 sm:px-8"
      style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <button
          onClick={onOpenProfile}
          aria-label={t(lang, "profile")}
          className="shrink-0 rounded-full transition-transform active:scale-95"
        >
          <Avatar name={playerName || "T"} size="sm" xp={0} />
        </button>
        <div className="min-w-0 leading-tight">
          <h1 className="bg-gradient-to-l from-grass-600 to-gold bg-clip-text text-lg font-black text-transparent sm:text-xl dark:from-grass-400 dark:to-gold">
            {APP.name}
          </h1>
          <p className="truncate text-[10px] font-bold opacity-60 sm:text-[11px]">{t(lang, "tagline")}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <button
          onClick={onToggleLang}
          aria-label="Language"
          className="glass-card flex h-9 items-center rounded-full px-2.5 text-xs font-black shadow-sm transition-transform active:scale-95 sm:h-10 sm:px-3"
        >
          {lang === "ar" ? "EN" : "ع"}
        </button>

        <button
          onClick={() => prefsStore.toggleDark()}
          aria-label={t(lang, "appearance")}
          className="glass-card flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-transform active:scale-95 sm:h-10 sm:w-10"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>

        <button
          onClick={onOpenSettings}
          aria-label={t(lang, "settings")}
          className={cn(
            "glass-card flex h-9 w-9 items-center justify-center rounded-full shadow-sm",
            "transition-transform active:scale-95 sm:h-10 sm:w-10",
          )}
        >
          <Settings className="size-4" />
        </button>
      </div>
    </header>
  );
}
