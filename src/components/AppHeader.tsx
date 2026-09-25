/** ============================================================
 *  AppHeader — الشريط العلوي
 *  ============================================================ */

import { memo } from "react";
import { Moon, Settings, Sun } from "lucide-react";
import { formatCoins } from "../domain/coinEconomy";
import { APP } from "../core/config";
import { t, type Lang } from "../lib/i18n";
import { prefsStore } from "../stores/prefsStore";
import { progressStore } from "../stores/progressStore";
import { useStore } from "../core/store";
import { cn } from "../utils/cn";
import { Avatar } from "./Avatar";
import { Coins as CoinsIcon } from "lucide-react";

interface Props {
  lang: Lang;
  isDark: boolean;
  playerName: string;
  onToggleLang: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
}

/** memo: الترويسة لا تحتاج إعادة رسم إلا عند تغيّر العملات/الأفاتار/اللغة/الثيم */
export const AppHeader = memo(function AppHeader({ lang, isDark, onToggleLang, onOpenSettings, onOpenProfile }: Props) {
  const avatarId = useStore(prefsStore, (s) => s.avatarId);
  // مُحدِّدات دقيقة: العملات وXP الحقيقي — الإطار يعتمد على XP الكامل
  // (كان يُقتطع كل 100 فبقى إطار الدوري برونزيًا خارج البروفايل دائمًا!)
  const coins = useStore(progressStore, (s) => s.coins);
  const xp = useStore(progressStore, (s) => Math.floor(s.xp));

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
          <Avatar size="sm" xp={xp} avatarId={avatarId} />
        </button>
        <div className="min-w-0 leading-tight">
          <h1 className="bg-gradient-to-l from-grass-600 to-gold bg-clip-text text-lg font-black text-transparent sm:text-xl dark:from-grass-400 dark:to-gold">
            {APP.name}
          </h1>
          <p className="truncate text-[10px] font-bold opacity-60 sm:text-[11px]">{t(lang, "tagline")}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {/* رصيد العملات — عملة شراء الحزم */}
        <button
          onClick={onOpenProfile}
          aria-label={lang === "ar" ? "رصيد العملات" : "Coin balance"}
          className="glass-card flex h-9 items-center gap-1.5 rounded-full px-2.5 shadow-sm transition-transform active:scale-95 sm:h-10 sm:px-3"
        >
          <CoinsIcon className="size-4 text-amber-500" />
          <span className="text-xs font-black tabular-nums text-amber-600 dark:text-amber-300">{formatCoins(coins)}</span>
        </button>

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
});
