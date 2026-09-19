/** ============================================================
 *  SettingsSheet — الإعدادات كاملة (Bottom Sheet)
 *  ============================================================ */

import { Bell, BellOff, Languages, Moon, RotateCcw, Sun, Vibrate, Volume2, VolumeX } from "lucide-react";
import type { Lang, Theme } from "../domain/types";
import { t } from "../lib/i18n";
import { isNative } from "../lib/notifications";
import { prefsStore } from "../stores/prefsStore";
import { Sheet } from "./ui/Sheet";
import { Button, Segmented, SettingRow, Toggle } from "./ui/primitives";
import { useSyncExternalStore } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
}

export function SettingsSheet({ open, onClose, onReset }: Props) {
  const prefs = useSyncExternalStore(prefsStore.subscribe, prefsStore.getState);
  const lang = prefs.lang;

  return (
    <Sheet open={open} onClose={onClose} title={t(lang, "settings")}>
      <div className="space-y-4">
        {/* اللغة */}
        <SettingRow
          icon={<Languages className="size-4.5" />}
          title="Language / اللغة"
          control={
            <Segmented
              className="w-36"
              value={prefs.lang}
              onChange={(l) => prefsStore.setLang(l as Lang)}
              options={[
                { value: "ar", label: "ع" },
                { value: "en", label: "EN" },
              ]}
            />
          }
        />

        {/* التذكير */}
        <SettingRow
          icon={prefs.reminder ? <Bell className="size-4.5" /> : <BellOff className="size-4.5" />}
          title={t(lang, "dailyReminder")}
          subtitle={isNative ? t(lang, "reminderTime") : `${t(lang, "reminderTime")} — APK`}
          control={<Toggle on={prefs.reminder} onChange={(on) => prefsStore.setReminder(on)} />}
        />

        {/* الصوت */}
        <SettingRow
          icon={prefs.sound ? <Volume2 className="size-4.5" /> : <VolumeX className="size-4.5" />}
          title={t(lang, "sound")}
          control={<Toggle on={prefs.sound} onChange={(on) => prefsStore.setSound(on)} />}
        />

        {/* الاهتزاز */}
        {isNative && (
          <SettingRow
            icon={<Vibrate className="size-4.5" />}
            title={t(lang, "haptics")}
            control={<Toggle on={prefs.haptics} onChange={(on) => prefsStore.setHaptics(on)} />}
          />
        )}

        {/* المظهر */}
        <div>
          <p className="mb-1.5 text-sm font-bold">{t(lang, "appearance")}</p>
          <Segmented
            value={prefs.theme}
            onChange={(v) => prefsStore.setTheme(v as Theme)}
            options={[
              { value: "light", label: <span className="flex items-center justify-center gap-1"><Sun className="size-3.5" />{t(lang, "light")}</span> },
              { value: "dark", label: <span className="flex items-center justify-center gap-1"><Moon className="size-3.5" />{t(lang, "dark")}</span> },
              { value: "system", label: t(lang, "system") },
            ]}
          />
        </div>

        <Button variant="danger" onClick={onReset} className="w-full">
          <RotateCcw className="size-4" />
          {t(lang, "resetProgress")}
        </Button>

        <p className="text-center text-[11px] font-bold opacity-40">TiQ v3.0 — {t(lang, "madeBy")}</p>
      </div>
    </Sheet>
  );
}
