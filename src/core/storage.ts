/** ============================================================
 *  IndexedStorage — طبقة تخزين آمنة مع نُسَخ (versions) وترحيل تلقائي
 *  ============================================================ */

interface Versioned<T> {
  v: number;
  data: T;
}

/** واجهة التخزين — تسمح باستبدال localStorage بذاكرة (اختبارات/SSR) */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  keys(): string[];
}

/** تخزين الذاكرة كبديل آمن عند حجب localStorage */
function memoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
    keys: () => [...map.keys()],
  };
}

function resolveStorage(): StorageLike {
  try {
    const probe = "__tiq_probe__";
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return {
      getItem: (k) => localStorage.getItem(k),
      setItem: (k, v) => localStorage.setItem(k, v),
      removeItem: (k) => localStorage.removeItem(k),
      keys: () => Object.keys(localStorage),
    };
  } catch {
    return memoryStorage();
  }
}

export const storage: StorageLike = resolveStorage();

/** قراءة JSON آمنة بقيمة افتراضية */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = storage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/** كتابة JSON آمنة */
export function writeJSON(key: string, value: unknown): void {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    /* التخزين ممتلئ أو محجوب — نتجاهل بهدوء */
  }
}

/**
 * قراءة بيانات مُنَسَّخة:
 * - لا يوجد مفتاح → يعيد null (يتقرر المُستهلك ما يفعله).
 * - نسخة مطابقة → البيانات كما هي.
 * - نسخة أقدم → تمرّ عبر سلسلة الترحيلات المعرّفة في migrations.
 */
export function loadVersioned<T>(
  key: string,
  version: number,
  migrations: Record<number, (raw: unknown) => unknown>,
): T | null {
  const raw = readJSON<Versioned<unknown> | null>(key, null);
  if (raw === null || typeof raw !== "object" || !("v" in raw)) return null;

  let data = raw.data;
  let v = Number(raw.v);
  while (v < version) {
    const step = migrations[v];
    if (!step) return null; // لا مسار ترحيل — نبدأ من الصفر
    data = step(data);
    v += 1;
  }
  return v === version ? (data as T) : null;
}

/** حفظ بيانات مع رقم النسخة الحالية */
export function saveVersioned<T>(key: string, version: number, data: T): void {
  writeJSON(key, { v: version, data } satisfies Versioned<T>);
}

/** حذف كل المفاتيح القديمة (بعد نجاح الترحيل) */
export function purgeLegacy(prefix: string): void {
  for (const k of storage.keys()) {
    if (k.startsWith(prefix)) storage.removeItem(k);
  }
}
