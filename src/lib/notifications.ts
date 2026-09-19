/** ============================================================
 *  Notifications — تذكير يومي 10 مساءً (أصلي فقط)
 *  - طلب الإذن عند التفعيل
 *  - إعادة جدولة عند الإقلاع/الاستئناف (النظام قد يلغي المنبهات)
 *  ============================================================ */

import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { LocalNotifications, type PermissionStatus } from "@capacitor/local-notifications";
import { REMINDER } from "../core/config";
import type { Lang } from "../domain/types";

/** هل نعمل داخل تطبيق أصلي؟ */
export const isNative = Capacitor.isNativePlatform();

const COPY = {
  ar: { title: "TiQ — سؤال الليلة جاهز!", body: "سؤال جديد بانتظارك. افتح التطبيق واحمِ سلسلتك!" },
  en: { title: "TiQ — tonight's question is live!", body: "A new question awaits. Open the app and protect your streak!" },
} as const;

function atNextOccurrence(hour: number, minute: number): Date {
  const now = new Date();
  const next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  return next;
}

export async function checkPermissions(): Promise<PermissionStatus> {
  return LocalNotifications.checkPermissions();
}

export async function requestPermissions(): Promise<PermissionStatus> {
  return LocalNotifications.requestPermissions();
}

export async function scheduleDailyReminder(lang: Lang = "ar"): Promise<boolean> {
  try {
    const perm = await requestPermissions();
    if (perm.display !== "granted") return false;

    await LocalNotifications.cancel({ notifications: [{ id: REMINDER.id }] });
    await LocalNotifications.schedule({
      notifications: [
        {
          id: REMINDER.id,
          title: COPY[lang].title,
          body: COPY[lang].body,
          schedule: {
            at: atNextOccurrence(REMINDER.hour, REMINDER.minute),
            allowWhileIdle: true,
            repeats: true,
            every: "day",
          },
          smallIcon: "ic_launcher",
          largeIcon: "ic_launcher",
        },
      ],
    });
    return true;
  } catch {
    return false;
  }
}

export async function cancelReminder(): Promise<void> {
  try {
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER.id }] });
  } catch {
    /* تجاهل */
  }
}

/**
 * تهيئة دورة حياة الإشعارات على الأجهزة الأصلية:
 * جدولة فورية + إعادة جدولة عند كل استئناف.
 * `enabled` يُقرأ لحظة الاستئناف لاحترام أحدث تفضيل.
 */
export function initReminderLifecycle(getEnabled: () => boolean, getLang: () => Lang): void {
  if (!isNative) return;
  if (getEnabled()) void scheduleDailyReminder(getLang());

  void App.addListener("resume", () => {
    if (getEnabled()) void scheduleDailyReminder(getLang());
    else void cancelReminder();
  });
  void App.addListener("appStateChange", (state) => {
    if (state.isActive) {
      if (getEnabled()) void scheduleDailyReminder(getLang());
    }
  });
}
