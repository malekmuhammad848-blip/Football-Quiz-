/**
 * Customization — بيانات الأفاتار والتاغ مع احتياطيات محلية
 * إذا فشل جلب الكتالوج من Supabase (جداول غير موجودة، لا شبكة، ضيف)
 * تعرض الواجهة كتالوجًا محليًا احتياطيًا — لا فراغ ولا انهيار أبدًا.
 */

import type { Lang } from "./types";

export interface AvatarOption {
  id: string;
  label_ar: string;
  label_en: string;
  emoji: string;
  min_xp: number;
  sort: number;
}

export interface TagOption {
  id: string;
  label_ar: string;
  label_en: string;
  emoji: string;
  min_xp: number;
  sort: number;
}

/** كتالوج الأفاتارات الاحتياطي — مطابق لبيانات Supabase الأولية */
export const FALLBACK_AVATARS: AvatarOption[] = [
  { id: "ball", label_ar: "كرة", label_en: "Ball", emoji: "⚽", min_xp: 0, sort: 1 },
  { id: "gloves", label_ar: "قفازات", label_en: "Gloves", emoji: "🧤", min_xp: 0, sort: 2 },
  { id: "boot", label_ar: "حذاء", label_en: "Boot", emoji: "👟", min_xp: 0, sort: 3 },
  { id: "whistle", label_ar: "صافرة", label_en: "Whistle", emoji: "📋", min_xp: 100, sort: 4 },
  { id: "crown", label_ar: "تاج", label_en: "Crown", emoji: "👑", min_xp: 400, sort: 5 },
  { id: "trophy", label_ar: "كأس", label_en: "Trophy", emoji: "🏆", min_xp: 800, sort: 6 },
  { id: "star", label_ar: "نجمة", label_en: "Star", emoji: "⭐", min_xp: 1500, sort: 7 },
];

/** كتالوج التاغات الاحتياطي */
export const FALLBACK_TAGS: TagOption[] = [
  { id: "rookie", label_ar: "مبتدئ", label_en: "Rookie", emoji: "🌱", min_xp: 0, sort: 1 },
  { id: "striker", label_ar: "مهاجم", label_en: "Striker", emoji: "⚡", min_xp: 0, sort: 2 },
  { id: "captain", label_ar: "كابتن", label_en: "Captain", emoji: "🎯", min_xp: 400, sort: 3 },
  { id: "legend", label_ar: "أسطورة", label_en: "Legend", emoji: "🔥", min_xp: 1500, sort: 4 },
];

/**
 * يجيب خيار الأفاتار المحفوظ أو أول احتياطي متاح.
 * لا يعيد null أبدًا — الواجهة لا تنهار.
 */
export function resolveAvatar(
  catalog: AvatarOption[] | null,
  savedId: string | null,
  xp: number,
): AvatarOption {
  const list = catalog && catalog.length > 0 ? catalog : FALLBACK_AVATARS;
  const saved = savedId ? list.find((a) => a.id === savedId) : undefined;
  if (saved) return saved;
  // أول عنصر مفتوح حسب XP
  return list.find((a) => xp >= a.min_xp) ?? list[0]!;
}

/** يجيب خيار التاغ المحفوظ أو أول احتياطي متاح */
export function resolveTag(catalog: TagOption[] | null, savedId: string | null, xp: number): TagOption {
  const list = catalog && catalog.length > 0 ? catalog : FALLBACK_TAGS;
  const saved = savedId ? list.find((t) => t.id === savedId) : undefined;
  if (saved) return saved;
  return list.find((t) => xp >= t.min_xp) ?? list[0]!;
}

/** تسمية آمنة حسب اللغة مع fallback للنص */
export function optionLabel(o: { label_ar: string; label_en: string }, lang: Lang): string {
  return (lang === "ar" ? o.label_ar : o.label_en) || o.label_en || o.label_ar || "?";
}
