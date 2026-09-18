import { Capacitor } from "@capacitor/core";
import {
  LocalNotifications,
  type PermissionStatus,
} from "@capacitor/local-notifications";

const REMINDER_ID = 1001;
const REMINDER_KEY = "fq:dailyReminder";

/** هل نعمل داخل تطبيق أندرويد/iOS أصلي؟ */
export const isNative = Capacitor.isNativePlatform();

function atNext(hour: number, minute: number): Date {
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

/** هل التذكير اليومي مفعّل؟ (افتراضيًا: مفعّل بعد منح الإذن) */
export function isReminderEnabled(): boolean {
  try {
    return localStorage.getItem(REMINDER_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setReminderEnabled(on: boolean) {
  try {
    localStorage.setItem(REMINDER_KEY, on ? "on" : "off");
  } catch {
    /* تجاهل */
  }
  if (!on) void cancelReminder();
}

/**
 * جدولة تذكير يومي عند الساعة 20:00 بسؤال اليوم.
 * على الويب يعمل فقط إذا دعم المتصفح الإشعارات المحلية (محدود) —
 * التجربة الكاملة متاحة في تطبيق الأندرويد (APK).
 */
export async function scheduleDailyReminder(): Promise<boolean> {
  if (!isReminderEnabled()) return false;
  try {
    const perm = await requestPermissions();
    if (perm.display !== "granted") return false;

    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] });
    await LocalNotifications.schedule({
      notifications: [
        {
          id: REMINDER_ID,
          title: "⚽ سؤال الكرة اليومي",
          body: "سؤال جديد بانتظارك! حافظ على سلسلتك 🔥",
          schedule: { at: atNext(20, 0), allowWhileIdle: true, repeats: true, every: "day" },
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
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] });
  } catch {
    /* تجاهل */
  }
}
