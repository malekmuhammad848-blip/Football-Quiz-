import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellOff, Moon, RotateCcw, Sun, Volume2, VolumeX, X } from "lucide-react";
import type { Theme } from "../lib/store";
import type { Lang } from "../lib/i18n";
import { t } from "../lib/i18n";
import { isNative } from "../lib/notifications";
import { cn } from "../utils/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  soundOn: boolean;
  onSoundChange: (on: boolean) => void;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  reminder: boolean;
  onReminderChange: (on: boolean) => void;
  onReset: () => void;
}

const THEMES: { value: Theme; labelKey: string; icon: typeof Sun }[] = [
  { value: "light", labelKey: "light", icon: Sun },
  { value: "dark", labelKey: "dark", icon: Moon },
  { value: "system", labelKey: "system", icon: RotateCcw },
];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors",
        on ? "bg-grass-500" : "bg-ink/20",
      )}
    >
      <motion.span
        layout
        className="absolute top-0.5 size-6 rounded-full bg-white shadow"
        style={{ right: on ? 2 : 22 }}
      />
    </button>
  );
}

export function SettingsSheet({
  open,
  onClose,
  soundOn,
  onSoundChange,
  theme,
  onThemeChange,
  lang,
  onLangChange,
  reminder,
  onReminderChange,
  onReset,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-surface p-5 shadow-2xl sm:p-6"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/20" />

            <div className="mb-5 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-extrabold">
                <img src="/icon.png" alt="" className="size-7 rounded-lg" />
                {t("settings")}
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-ink/5"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* اللغة */}
            <div className="mb-5">
              <p className="mb-2 font-bold">Language / اللغة</p>
              <div className="grid grid-cols-2 gap-2">
                {(["ar", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => onLangChange(l)}
                    className={cn(
                      "rounded-2xl border py-2.5 text-sm font-black transition-all",
                      lang === l
                        ? "border-grass-500 bg-grass-500/10 text-grass-700 shadow dark:text-grass-400"
                        : "border-line opacity-60 hover:opacity-100",
                    )}
                  >
                    {l === "ar" ? "🇸🇦 العربية" : "🇬🇧 English"}
                  </button>
                ))}
              </div>
            </div>

            {/* التذكير */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-bold">
                {reminder ? <Bell className="size-5" /> : <BellOff className="size-5" />}
                <span>
                  {t("dailyReminder")}
                  <span className="block text-xs font-medium opacity-50">
                    {t("reminderTime")}
                    {isNative ? "" : " — APK"}
                  </span>
                </span>
              </span>
              <Toggle on={reminder} onChange={onReminderChange} />
            </div>

            {/* الصوت */}
            <div className="mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold">
                {soundOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
                {t("sound")}
              </span>
              <Toggle on={soundOn} onChange={onSoundChange} />
            </div>

            {/* المظهر */}
            <div className="mb-5">
              <p className="mb-2 font-bold">{t("appearance")}</p>
              <div className="grid grid-cols-3 gap-2">
                {THEMES.map(({ value, labelKey, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => onThemeChange(value)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-xs font-bold transition-all",
                      theme === value
                        ? "border-grass-500 bg-grass-500/10 text-grass-700 shadow dark:text-grass-400"
                        : "border-line hover:bg-ink/5",
                    )}
                  >
                    <Icon className="size-5" />
                    {t(labelKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* إعادة التعيين */}
            <button
              onClick={onReset}
              className="w-full rounded-2xl border border-red-300 px-4 py-3 font-bold text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"
            >
              {t("resetProgress")}
            </button>

            <p className="mt-3 text-center text-[11px] font-bold opacity-40">
              {t("version")} — {t("madeBy")}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
