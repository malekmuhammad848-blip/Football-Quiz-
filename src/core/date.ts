/** ============================================================
 *  Date utils — مفتاح اليوم (محلي) وفروق الأيام
 *  ============================================================ */

/** مفتاح تاريخ محلي YYYY-MM-DD (يعتمد توقيت الجهاز) */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** عدد الأيام بين مفتاحين (a → b) */
export function daysBetween(a: string, b: string): number {
  const ta = new Date(`${a}T00:00:00`).getTime();
  const tb = new Date(`${b}T00:00:00`).getTime();
  return Math.round((tb - ta) / 86_400_000);
}

/** مفتاح الأمس */
export function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
}

/** آخر N مفاتيح أيام (الأقدم أولًا) */
export function lastNDayKeys(n: number, end: Date = new Date()): string[] {
  const keys: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    keys.push(dayKey(d));
  }
  return keys;
}

/** تجزئة FNV-1a — توزيع ثابت لسؤال اليوم */
export function fnv1a(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}
