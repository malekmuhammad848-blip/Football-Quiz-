/**
 * Catalogs — كتالوجات الأفاتارات والتاغات مع تخزين مؤقت محلي
 * تُجلب من Supabase مرة واحدة وتُخزَّن على الجهاز، وعند أي فشل
 * (لا شبكة/جداول غير موجودة/ضيف) تُستخدم النسخة المخزنة أو الاحتياطية.
 */

import { readJSON, writeJSON } from "../core/storage";
import { FALLBACK_AVATARS, FALLBACK_TAGS, type AvatarOption, type TagOption } from "../domain/customization";
import { fetchAvatarCatalog, fetchTagCatalog } from "./backend";

const CACHE_KEY = "tiq:catalogs";

interface CatalogCache {
  avatars: AvatarOption[];
  tags: TagOption[];
  fetchedAt: number;
}

/** مدة صلاحية الذاكرة المؤقتة: 6 ساعات */
const TTL_MS = 6 * 60 * 60 * 1000;

function readCache(): CatalogCache | null {
  const c = readJSON<CatalogCache | null>(CACHE_KEY, null);
  if (!c || !Array.isArray(c.avatars) || !Array.isArray(c.tags)) return null;
  if (c.avatars.length === 0 || c.tags.length === 0) return null;
  return c;
}

function writeCache(c: CatalogCache): void {
  writeJSON(CACHE_KEY, c);
}

/** كتالوجات فورية (من الكاش أو الاحتياطي) — للعرض قبل أي شبكة */
export function instantCatalogs(): { avatars: AvatarOption[]; tags: TagOption[] } {
  const c = readCache();
  return {
    avatars: c?.avatars ?? FALLBACK_AVATARS,
    tags: c?.tags ?? FALLBACK_TAGS,
  };
}

/**
 * يضمن وجود كتالوجات: فورية من الكاش، ثم تحديث من الشبكة في الخلفية.
 * تستدعى من نقطة واحدة عند إقلاع التطبيق.
 */
export async function ensureCatalogs(force = false): Promise<void> {
  const cached = readCache();
  if (!force && cached && Date.now() - cached.fetchedAt < TTL_MS) return;
  try {
    const [avatars, tags] = await Promise.all([fetchAvatarCatalog(), fetchTagCatalog()]);
    // fetchAvatarCatalog/fetchTagCatalog يعيدان الاحتياطي عند الفشل —
    // نكتب الكاش فقط إن بدت البيانات حقيقية (ليست الاحتياطية نفسها)
    const isFallbackA = avatars === FALLBACK_AVATARS;
    const isFallbackT = tags === FALLBACK_TAGS;
    if (!isFallbackA || !isFallbackT) {
      writeCache({ avatars, tags, fetchedAt: Date.now() });
    }
  } catch {
    /* الكاش/الاحتياطي يكفي */
  }
}
