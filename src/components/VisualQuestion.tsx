/** ============================================================
 *  VisualQuestion — سؤال بصري: «لمن هذا الطقم؟»
 *  الإصلاح: بدل خريطة IDs جامدة (تظهر نادرًا)، الآن 25% من أسئلة
 *  التدريب تصبح بصرية بعشوائية حقيقية — الأطقم والأعلام تظهر فعلًا.
 *  ============================================================ */

import { STICKERS, type Sticker } from "../domain/season";
import { StickerArt } from "./StickerCard";

interface Props {
  /** الملصق المستخدم في السؤال */
  sticker: Sticker;
  /** نص السؤال المطبوع */
  prompt: string;
  className?: string;
}

export { StickerArt };

/** هل هذا السؤال بصري؟ (نمرر العلم من المولّد) */
export type VisualFlag = { visual?: Sticker };

export function VisualQuestion({ sticker, prompt, className }: Props) {
  return (
    <div className={className}>
      <p className="mb-3 text-center text-xs font-black uppercase tracking-widest text-faint">
        {prompt}
      </p>
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute -inset-5 rounded-full bg-gold/15 blur-2xl" />
          <StickerArt sticker={sticker} className="relative h-32 w-32 drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * تحويل سؤال عادي إلى بصري: يختار ملصقًا مطابقًا لأحد الخيارات.
 * يعيد null إذا لم يوجد ملصق مطابق (يبقى السؤال نصيًا).
 */
export function makeVisual(
  options: string[],
  answerIndex: number,
  lang: "ar" | "en",
): { sticker: Sticker; options: string[]; answer: number } | null {
  // ابحث عن ملصق مطابق لأحد الخيارات (الإجابة الصحيحة أولًا)
  const find = (name: string) =>
    STICKERS.find((s) => (lang === "ar" ? s.ar : s.en) === name.trim());

  const answerSticker = find(options[answerIndex] ?? "");
  if (answerSticker) {
    return { sticker: answerSticker, options, answer: answerIndex };
  }
  // جرّب أي خيار (سؤال "أي نادٍ/منتخب يمثله الشعار/العلم" معكوس)
  for (let i = 0; i < options.length; i++) {
    const st = find(options[i] ?? "");
    if (st) return { sticker: st, options, answer: i };
  }
  return null;
}
