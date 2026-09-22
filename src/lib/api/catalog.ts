/**
 * Catalog API — كتالوجات الأفاتار والتاغ (Supabase + احتياطي محلي دائم)
 * لا تعتمد الواجهة عليها مباشرة — طبقة `customizations` المحلية هي البوابة.
 */

import { supabase } from "../supabase";
import { FALLBACK_AVATARS, FALLBACK_TAGS, type AvatarOption, type TagOption } from "../../domain/customization";

export type { AvatarOption, TagOption };
export { FALLBACK_AVATARS, FALLBACK_TAGS };

export async function fetchAvatarCatalog(): Promise<AvatarOption[]> {
  try {
    const { data, error } = await supabase
      .from("avatar_catalog")
      .select("*")
      .order("sort", { ascending: true });
    if (error) throw error;
    const rows = (data ?? []).filter((r) => r && typeof r === "object" && (r as AvatarOption).id);
    return rows.length > 0 ? (rows as AvatarOption[]) : FALLBACK_AVATARS;
  } catch {
    return FALLBACK_AVATARS;
  }
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
