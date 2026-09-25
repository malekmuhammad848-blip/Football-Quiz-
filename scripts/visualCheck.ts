/**
 * فحص آلي للأسئلة البصرية — يتأكد أن الفن المعروض يطابق الإجابة دائمًا
 * تشغيل: bun scripts/visualCheck.ts
 */
import { STICKERS } from "../src/domain/season";
import { buildVisualQuestion, makeVisual } from "../src/components/VisualQuestion";

let bugs = 0;
const report = (m: string) => {
  console.error("❌ " + m);
  bugs++;
};

for (const lang of ["ar", "en"] as const) {
  for (let seed = 1; seed <= 2000; seed++) {
    const g = buildVisualQuestion(lang, seed * 7919 + 13);
    const name = (s: { ar: string; en: string }) => (lang === "ar" ? s.ar : s.en);
    if (!g.options.includes(name(g.sticker))) report(`[${lang}] seed=${seed} اسم الملصق ليس ضمن الخيارات`);
    if (g.options[g.answer] !== name(g.sticker)) report(`[${lang}] seed=${seed} الإجابة لا تطابق الملصق`);
    if (new Set(g.options).size !== 4) report(`[${lang}] seed=${seed} خيارات مكررة: ${g.options}`);
  }
}

const opts = ["ليفربول", "برشلونة", "الهلال", "يوفنتوس"];
const st = makeVisual(opts, 0, "ar");
if (!st || st.sticker.ar !== "ليفربول") report("makeVisual لم يجد ليفربول");

const kinds = new Map<string, number>();
for (const s of STICKERS) kinds.set(s.art, (kinds.get(s.art) ?? 0) + 1);
console.log("sticker arts:", [...kinds]);

console.log(bugs === 0 ? "✅ البصرية سليمة — لا أخطاء" : `💥 ${bugs} خطأ`);
process.exit(bugs === 0 ? 0 : 1);
