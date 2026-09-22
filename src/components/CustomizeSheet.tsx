/**
 * CustomizeSheet — اختيار الأفاتار والتاغ
 * يعمل للجميع: الضيف والمسجل. الحفظ محلي أولًا (فوري ومضمون)،
 * ثم مزامنة سحابية في الخلفية للمسجلين (بلا انتظار ولا فشل ظاهر).
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { updateAvatarTag, type AvatarOption, type TagOption } from "../lib/backend";
import { optionLabel } from "../domain/customization";
import { instantCatalogs } from "../lib/catalogs";
import { prefsStore } from "../stores/prefsStore";
import type { Session } from "@supabase/supabase-js";
import { t, tr, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { Sheet } from "./ui/Sheet";

interface Props {
  open: boolean;
  onClose: () => void;
  session: Session | null;
  xp: number;
  lang: Lang;
}

export function CustomizeSheet({ open, onClose, session, xp, lang }: Props) {
  const [avatars, setAvatars] = useState<AvatarOption[]>(() => instantCatalogs().avatars);
  const [tags, setTags] = useState<TagOption[]>(() => instantCatalogs().tags);
  const [selAvatar, setSelAvatar] = useState("");
  const [selTag, setSelTag] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const instant = instantCatalogs();
    setAvatars(instant.avatars);
    setTags(instant.tags);
    // الاختيار الحالي من التفضيلات المحلية — فوري للجميع
    setSelAvatar(prefsStore.getState().avatarId ?? instant.avatars.find((a) => xp >= a.min_xp)?.id ?? instant.avatars[0]?.id ?? "");
    setSelTag(prefsStore.getState().tagId ?? instant.tags.find((x) => xp >= x.min_xp)?.id ?? instant.tags[0]?.id ?? "");
  }, [open, xp]);

  const save = async () => {
    setSaving(true);
    // 1) حفظ محلي فوري — يظهر في البروفايل والأفاتار لحظيًا للجميع
    prefsStore.setCustomization(selAvatar || null, selTag || null);
    // 2) مزامنة سحابية اختيارية للمسجلين — لا تمنع الإغلاق إن فشلت
    if (session) {
      try {
        await updateAvatarTag(selAvatar, selTag);
      } catch {
        /* المحلي يكفي — ستُزامن لاحقًا */
      }
    }
    setSaving(false);
    onClose();
  };

  return (
    <Sheet open={open} onClose={onClose} title={t(lang, "customize")}>
      <div className="space-y-5">
        {/* الأفاتارات */}
        <section>
          <h4 className="mb-2 text-xs font-black uppercase tracking-wide text-soft">{t(lang, "avatar")}</h4>
          <div className="grid grid-cols-4 gap-2">
            {avatars.map((a) => {
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
                        ? "border-ghost bg-ghost opacity-40"
                        : "border-card-edge bg-ghost hover:border-gold/30",
                  )}
                >
                  <span className="text-2xl" aria-hidden>{a.emoji || "⚽"}</span>
                  <span className="max-w-full truncate px-1 text-[9px] font-bold text-soft">
                    {optionLabel(a, lang)}
                  </span>
                  {locked && (
                    <span className="absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full bg-surface shadow">
                      <Lock className="size-2.5 text-soft" />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* التاغات */}
        <section>
          <h4 className="mb-2 text-xs font-black uppercase tracking-wide text-soft">{t(lang, "tags")}</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tg) => {
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
                        ? "border-ghost bg-ghost text-faint"
                        : "border-card-edge bg-ghost text-soft hover:border-gold/30",
                  )}
                >
                  <span aria-hidden>{tg.emoji || "🏷️"}</span>
                  {optionLabel(tg, lang)}
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
