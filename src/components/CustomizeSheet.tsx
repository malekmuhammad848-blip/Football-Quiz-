/**
 * CustomizeSheet — اختيار الأفاتار والتاغ من كتالوجات Supabase
 * العناصر المقفولة (XP غير كافٍ) تظهر باهتة مع الحد المطلوب.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { fetchAvatarCatalog, fetchMyProfileMeta, fetchTagCatalog, authServiceExtra, type AvatarOption, type TagOption } from "../lib/backend";
import type { Session } from "@supabase/supabase-js";
import { t, tr, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { Sheet } from "./ui/Sheet";

interface Props {
  open: boolean;
  onClose: () => void;
  session: Session;
  xp: number;
  lang: Lang;
  onSaved: (avatarId: string, tagId: string) => void;
}

export function CustomizeSheet({ open, onClose, session, xp, lang, onSaved }: Props) {
  const [avatars, setAvatars] = useState<AvatarOption[] | null>(null);
  const [tags, setTags] = useState<TagOption[] | null>(null);
  const [selAvatar, setSelAvatar] = useState<string>("");
  const [selTag, setSelTag] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    void (async () => {
      const [a, tg, mine] = await Promise.all([
        fetchAvatarCatalog().catch(() => []),
        fetchTagCatalog().catch(() => []),
        fetchMyProfileMeta(session.user.id).catch(() => null),
      ]);
      setAvatars(a);
      setTags(tg);
      setSelAvatar(mine?.avatar_id ?? a[0]?.id ?? "");
      setSelTag(mine?.tag_id ?? tg[0]?.id ?? "");
    })();
  }, [open, session.user.id]);

  const save = async () => {
    setSaving(true);
    const ok = await authServiceExtra.updateAvatarTag(selAvatar, selTag);
    setSaving(false);
    if (ok) onSaved(selAvatar, selTag);
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title={t(lang, "customize")}>
      <div className="space-y-5">
        {/* الأفاتارات */}
        <section>
          <h4 className="mb-2 text-xs font-black uppercase tracking-wide text-white/50">{t(lang, "avatar")}</h4>
          <div className="grid grid-cols-4 gap-2">
            {(avatars ?? []).map((a) => {
              const locked = xp < a.min_xp;
              const active = selAvatar === a.id;
              return (
                <motion.button
                  key={a.id}
                  whileTap={{ scale: locked ? 1 : 0.92 }}
                  disabled={locked}
                  onClick={() => setSelAvatar(a.id)}
                  className={cn(
                    "relative flex aspect-square flex-col items-center justify-center gap-0.5 rounded-2xl border text-center transition-colors",
                    active
                      ? "border-gold/60 bg-gold/15"
                      : locked
                        ? "border-white/8 bg-white/[0.02] opacity-40"
                        : "border-white/12 bg-white/[0.05] hover:border-gold/30",
                  )}
                >
                  <span className="text-2xl">{a.emoji}</span>
                  <span className="max-w-full truncate px-1 text-[9px] font-bold text-white/60">
                    {lang === "ar" ? a.label_ar : a.label_en}
                  </span>
                  {locked && (
                    <span className="absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#1a241d] shadow">
                      <Lock className="size-2.5 text-white/60" />
                    </span>
                  )}
                </motion.button>
              );
            })}
            {avatars === null && [...Array(4)].map((_, i) => <div key={i} className="aspect-square animate-pulse rounded-2xl bg-white/5" />)}
          </div>
        </section>

        {/* التاغات */}
        <section>
          <h4 className="mb-2 text-xs font-black uppercase tracking-wide text-white/50">{t(lang, "tags")}</h4>
          <div className="flex flex-wrap gap-2">
            {(tags ?? []).map((tg) => {
              const locked = xp < tg.min_xp;
              const active = selTag === tg.id;
              return (
                <motion.button
                  key={tg.id}
                  whileTap={{ scale: locked ? 1 : 0.95 }}
                  disabled={locked}
                  onClick={() => setSelTag(tg.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-black transition-colors",
                    active
                      ? "border-gold/60 bg-gold/15 text-gold"
                      : locked
                        ? "border-white/8 bg-white/[0.02] text-white/30"
                        : "border-white/12 bg-white/[0.05] text-white/75 hover:border-gold/30",
                  )}
                >
                  <span>{tg.emoji}</span>
                  {lang === "ar" ? tg.label_ar : tg.label_en}
                  {locked && <Lock className="size-3 opacity-60" />}
                  {locked && <span className="text-[9px] font-bold opacity-70">{tr("{n} XP", { n: tg.min_xp })}</span>}
                </motion.button>
              );
            })}
          </div>
        </section>

        <button
          onClick={() => void save()}
          disabled={saving}
          className="w-full rounded-2xl bg-gradient-to-l from-grass-600 to-grass-500 py-3 text-sm font-black text-white shadow-md transition-all active:brightness-95 disabled:opacity-50"
        >
          {saving ? t(lang, "busy") : t(lang, "save")}
        </button>
      </div>
    </Sheet>
  );
}
