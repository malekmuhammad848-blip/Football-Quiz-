/**
 * validateQuestions — مُدقِّق ميكانيكي لبنك الأسئلة
 * يكشف: معرّفات مكررة، خيارات مكررة داخل السؤال، إجابة خارج النطاق،
 * أسئلة يكون فيها خياران متطابقين (يُربك اللاعب)، وأسئلة قصيرة جدًا.
 * التشغيل: bun scripts/validateQuestions.ts
 */

import { QUESTIONS } from "../src/data/questions";

let errors = 0;
let warnings = 0;

const ids = new Map<string, number>();
const seenQs = new Map<string, string>();

for (const q of QUESTIONS) {
  // 1) معرفات مكررة
  const n = ids.get(q.id) ?? 0;
  ids.set(q.id, n + 1);
  if (n > 0) {
    console.error(`❌ DUPLICATE ID: ${q.id} (appears ${n + 1}×)`);
    errors++;
  }

  for (const lang of ["ar", "en"] as const) {
    const c = q[lang];
    // 2) إجابة خارج النطاق
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) {
      console.error(`❌ BAD ANSWER INDEX: ${q.id} [${lang}] answer=${q.answer}`);
      errors++;
    }
    if (c.options.length !== 4) {
      console.error(`❌ NOT 4 OPTIONS: ${q.id} [${lang}] has ${c.options.length}`);
      errors++;
    }
    // 3) خيارات متطابقة داخل السؤال
    for (let i = 0; i < c.options.length; i++) {
      for (let j = i + 1; j < c.options.length; j++) {
        if (c.options[i]!.trim() === c.options[j]!.trim()) {
          console.error(`❌ DUPLICATE OPTIONS: ${q.id} [${lang}] "${c.options[i]}" == "${c.options[j]}"`);
          errors++;
        }
      }
    }
    // 4) نص سؤال قصير جدًا أو فارغ
    if (c.q.trim().length < 8) {
      console.error(`❌ QUESTION TOO SHORT: ${q.id} [${lang}] "${c.q}"`);
      errors++;
    }
    // 5) fact مفقود
    if (!c.fact || c.fact.trim().length < 10) {
      console.warn(`⚠️  FACT MISSING/SHORT: ${q.id} [${lang}]`);
      warnings++;
    }
  }

  // 6) السؤال نفسه مكرر (نفس نص AR)
  const key = q.ar.q.trim();
  const prev = seenQs.get(key);
  if (prev) {
    console.warn(`⚠️  DUPLICATE QUESTION TEXT: "${q.ar.q}" — in ${prev} AND ${q.id}`);
    warnings++;
  } else {
    seenQs.set(key, q.id);
  }
}

// 7) سؤال بطل + سؤال تكرار بصري: نفس الفن البصري يُستخدم في سؤالين بإجابتين مختلفتين
const visualOwners = new Map<string, string>();
for (const q of QUESTIONS) {
  if (!q.visual) continue;
  const vKey = `${q.visual.kind}:${q.visual.ref}`;
  const correctName = q.en.options[q.answer];
  const prev = visualOwners.get(vKey);
  if (prev && prev !== correctName) {
    console.error(`❌ VISUAL CONFLICT: ${vKey} claimed by "${prev}" AND "${correctName}" (${q.id})`);
    errors++;
  } else {
    visualOwners.set(vKey, correctName);
  }
}

console.log(`\n📊 BANK: ${QUESTIONS.length} questions · ${errors} errors · ${warnings} warnings`);
if (errors > 0) process.exit(1);
