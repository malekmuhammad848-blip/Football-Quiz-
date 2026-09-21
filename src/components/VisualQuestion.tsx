/** ============================================================
 *  VisualQuestion — سؤال بصري: «من هذا اللاعب؟» بالطقم
 *  نعرض SVG (طقم/علم/شعار) بدل نص السؤال — خمسة من كل بنك.
 *  تُستخدم في وضع التدريب والسرعة كتنويع حي.
 *  ============================================================ */

import type { LocalizedQuestion } from "../domain/types";
import { STICKERS } from "../domain/season";
import { StickerArt } from "./StickerCard";

/** خريطة id السؤال البصري → ملصق العرض */
const VISUAL_IDS: Record<string, string> = {
  "vis-messi-kit": "messi",
  "vis-cr7-kit": "cr7",
  "vis-brazil-flag": "brazil",
  "vis-real-badge": "real-madrid",
  "vis-morocco-flag": "morocco",
};

interface Props {
  question: LocalizedQuestion;
  className?: string;
}

export function isVisualQuestion(id: string): boolean {
  return id in VISUAL_IDS;
}

export function VisualQuestion({ question, className }: Props) {
  const stickerId = VISUAL_IDS[question.id];
  const sticker = STICKERS.find((s) => s.id === stickerId);
  if (!sticker) return null;

  return (
    <div className={className}>
      <p className="mb-3 text-center text-xs font-black uppercase tracking-widest text-faint">
        {question.q}
      </p>
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gold/10 blur-2xl" />
          <StickerArt sticker={sticker} className="relative h-28 w-28 drop-shadow-xl" />
        </div>
      </div>
    </div>
  );
}
