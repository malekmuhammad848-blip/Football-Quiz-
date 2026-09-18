import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import {
  LocalNotifications,
  type PermissionStatus,
} from "@capacitor/local-notifications";

const REMINDER_ID = 1001;
const REMINDER_KEY = "fq:dailyReminder";
const REMINDER_HOUR = 22; // 10 مساءً
const REMINDER_MINUTE = 0;

/** هل نعمل داخل تطبيق أندرويد/iOS أصلي؟ */
export const isNative = Capacitor.isNativePlatform();

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

/** هل التذكير اليومي مفعّل؟ (افتراضيًا: مفعّل) */
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
 * جدولة تذكير يومي عند الساعة 10 مساءً.
 * تُستدعى عند فتح التطبيق وعند استئنافه حتى تبقى الموعد دائمًا في المستقبل.
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
          title: "⚽ TiQ — سؤال الكرة",
          body: "سؤال الليلة جاهز! افتح التطبيق واحفظ سلسلتك 🔥",
          schedule: {
            at: atNextOccurrence(REMINDER_HOUR, REMINDER_MINUTE),
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
    await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] });
  } catch {
    /* تجاهل */
  }
}

/**
 * تهيئة دورة حياة الإشعارات على الأجهزة الأصلية:
 * - جدولة فورية عند الإقلاع
 * - إعادة الجدولة عند كل استئناف للتطبيق (النظام قد يلغي المنبهات بعد إعادة التشغيل)
 * - الاستماع لتفعيل الإشعار (يفتح التطبيق)
 */
export function initReminderLifecycle(): void {
  if (!isNative) return;
  void scheduleDailyReminder();
  App.addListener("resume", () => {
    void scheduleDailyReminder();
  });
  App.addListener("appStateChange", (state) => {
    if (state.isActive) void scheduleDailyReminder();
  });
}
