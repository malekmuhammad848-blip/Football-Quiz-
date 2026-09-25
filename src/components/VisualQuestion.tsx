/** ============================================================
 *  VisualQuestion — سؤال بصري: «لمن هذا الطقم/العلم/الشعار؟»
 *  يعرض فنًا مرسومًا حقيقيًا من مكتبة VisualArt حسب المواصفة
 *  المرافقة للسؤال (kind + ref) — الفن يخص صاحب الإجابة دائمًا.
 *  أسئلة التدريب المولّدة تظل تعمل عبر الملصقات (sticker).
 *  ============================================================ */

import type { Sticker } from "../domain/season";
import { STICKERS } from "../domain/season";
import { StickerArt } from "./StickerCard";
import { VisualArt, type VisualSpec } from "./VisualArt";
import { cn } from "../utils/cn";

interface Props {
  /** مواصفة فن مباشرة (من حقل visual في السؤال) */
  spec?: VisualSpec;
  /** ملصق من بنك الموسم (أسئلة التدريب المولّدة) */
  sticker?: Sticker;
  /** نص السؤال المطبوع */
  prompt: string;
  className?: string;
}

export { StickerArt, VisualArt };
export type { VisualSpec };

export function VisualQuestion({ spec, sticker, prompt, className }: Props) {
  return (
    <div className={className}>
      <p className={cn("text-center text-xs font-black uppercase tracking-widest text-faint", prompt ? "mb-3" : "hidden")}>
        {prompt}
      </p>
      <div className="flex justify-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div
            className="absolute -inset-5 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(251,191,36,0.18), transparent)" }}
          />
          {spec ? (
            <VisualArt spec={spec} className="relative h-36 w-36" />
          ) : sticker ? (
            <StickerArt sticker={sticker} className="relative h-36 w-36" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

/**
 * نص السؤال الصحيح حسب نوع الفن — علم لا يُسأل عنه كأنه طقم!
 * (كان «أي منتخب يمثله هذا العلم؟» يظهر بعنوان «لمن هذا الطقم؟»)
 */
export function visualPromptFor(
  kind: "kit" | "flag" | "badge" | "sticker",
  lang: "ar" | "en",
): string {
  const L = {
    ar: {
      kit: "لمن هذا الطقم؟",
      flag: "أي منتخب يمثله هذا العلم؟",
      badge: "أي نادٍ يحمل هذا الشعار؟",
      sticker: "أي نادٍ أو منتخب هذا؟",
    },
    en: {
      kit: "Whose kit is this?",
      flag: "Which nation does this flag represent?",
      badge: "Which club bears this crest?",
      sticker: "Which club or nation is this?",
    },
  } as const;
  return L[lang][kind];
}

/**
 * تحويل سؤال عادي إلى بصري — **آمنة تمامًا**: يعمل فقط عندما تكون
 * إجابة السؤال النصي نفسها صاحبة الملصق. لا يعرض أبدًا بطاقة لا تطابق الإجابة
 * (كان هذا سبب «أجيب ليفربول ويقول ريال مدريد خطأ»).
 */
export function makeVisual(
  options: string[],
  answerIndex: number,
  lang: "ar" | "en",
): { sticker: Sticker; options: string[]; answer: number } | null {
  // الملصق الصحيح فقط: بطاقة صاحب الإجابة الصحيحة — أو لا بطاقة إطلاقًا
  const name = (options[answerIndex] ?? "").trim();
  const st = STICKERS.find((s) => (lang === "ar" ? s.ar : s.en) === name);
  return st ? { sticker: st, options, answer: answerIndex } : null;
}

/** عشوائية مثبتة بالبذرة — نفس النتيجة دائمًا لنفس البذرة */
function seededPick<T>(arr: readonly T[], seed: number): T {
  let s = seed >>> 0 || 1;
  s = (Math.imul(s, 48271) + 11) >>> 0;
  return arr[s % arr.length]!;
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const a = [...items];
  let s = seed >>> 0 || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export interface GeneratedVisual {
  sticker: Sticker;
  options: string[];
  answer: number;
}

/**
 * توليد سؤال بصري مضمون من بنك الملصقات — يشتغل دائمًا.
 * يعرض طقم/علم/شعار ملصق والخيارات أسماء 4 ملصقات من نفس النوع.
 * حتمي بالبذرة: نفس الجلسة ترى نفس الأسئلة البصرية.
 */
export function buildVisualQuestion(lang: "ar" | "en", seed: number): GeneratedVisual {
  const sticker = seededPick(STICKERS, seed);
  const sameKind = STICKERS.filter((s) => s.kind === sticker.kind && s.id !== sticker.id);
  const distractors = seededShuffle([...sameKind], seed * 31 + 7).slice(0, 3);
  const name = (s: Sticker) => (lang === "ar" ? s.ar : s.en);

  const options = seededShuffle([name(sticker), ...distractors.map(name)], seed * 7 + 3);
  return { sticker, options, answer: options.indexOf(name(sticker)) };
}
