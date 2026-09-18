import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellOff, Moon, RotateCcw, Sun, Volume2, VolumeX, X } from "lucide-react";
import type { Theme } from "../lib/store";
import { isNative } from "../lib/notifications";
import { cn } from "../utils/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  soundOn: boolean;
  onSoundChange: (on: boolean) => void;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  reminder: boolean;
  onReminderChange: (on: boolean) => void;
  onReset: () => void;
}

const THEMES: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "نهاري", icon: Sun },
  { value: "dark", label: "ليلي", icon: Moon },
  { value: "system", label: "النظام", icon: RotateCcw },
];

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-surface p-6 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/20" />

            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-extrabold">الإعدادات</h3>
              <button
                onClick={onClose}
                aria-label="إغلاق"
                className="rounded-full p-2 hover:bg-ink/5"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* التذكير اليومي */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 font-bold">
                {reminder ? <Bell className="size-5" /> : <BellOff className="size-5" />}
                <span>
                  تذكير يومي (8 مساءً)
                  <span className="block text-xs font-medium opacity-50">
                    {isNative
                      ? "إشعار على جهازك قبل سؤال اليوم"
                      : "يعمل بالكامل داخل تطبيق الأندرويد"}
                  </span>
                </span>
              </span>
              <Toggle on={reminder} onChange={onReminderChange} />
            </div>

            {/* الصوت */}
            <div className="mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold">
                {soundOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
                المؤثرات الصوتية
              </span>
              <Toggle on={soundOn} onChange={onSoundChange} />
            </div>

            {/* الثيم */}
            <div className="mb-6">
              <p className="mb-2 font-bold">المظهر</p>
              <div className="grid grid-cols-3 gap-2">
                {THEMES.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => onThemeChange(value)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-xs font-bold transition-colors",
                      theme === value
                        ? "border-grass-500 bg-grass-500/10 text-grass-700 dark:text-grass-500"
                        : "border-ink/10 hover:bg-ink/5",
                    )}
                  >
                    <Icon className="size-5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* إعادة التعيين */}
            <button
              onClick={onReset}
              className="w-full rounded-2xl border border-red-300 px-4 py-3 font-bold text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"
            >
              🗑️ إعادة تعيين كل التقدّم
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
