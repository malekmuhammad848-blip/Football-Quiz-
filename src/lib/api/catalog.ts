/**
 * Catalog API — كتالوجات الأفاتار والتاغ
 * الأفاتارات: **مرسومة داخل التطبيق** (AvatarArt) — تُعاد محليًا دائمًا بلا شبكة.
 * التاغات: تُجلب من Supabase مع احتياطي محلي دائم.
 */

import { supabase } from "../supabase";
import { FALLBACK_AVATARS, FALLBACK_TAGS, type AvatarOption, type TagOption } from "../../domain/customization";

export type { AvatarOption, TagOption };
export { FALLBACK_AVATARS, FALLBACK_TAGS };

/**
 * كتالوج الأفاتارات محلي بالكامل — الفن يعيش داخل التطبيق
 * ولا يمكن أن يفشل أو يفرغ مهما حدث (لا شبكة/لا جداول/ضيف).
 */
export async function fetchAvatarCatalog(): Promise<AvatarOption[]> {
  return FALLBACK_AVATARS;
}

export async function fetchTagCatalog(): Promise<TagOption[]> {
  try {
    const { data, error } = await supabase
      .from("tag_catalog")
      .select("*")
      .order("sort", { ascending: true });
    if (error) throw error;
    const rows = (data ?? []).filter((r) => r && typeof r === "object" && (r as TagOption).id);
    return rows.length > 0 ? (rows as TagOption[]) : FALLBACK_TAGS;
  } catch {
    return FALLBACK_TAGS;
  }
}
