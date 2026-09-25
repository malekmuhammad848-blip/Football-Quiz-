/**
 * فحص ملكية الفن البصري في بنك الأسئلة الثابت:
 * كل سؤال بصري يجب أن تكون إجابته الصحيحة هي مالك الفن المعروض
 * (العلم الهولندي لا يجوز أن يكون اسم الإجابة إنجلترا!).
 * تشغيل: bun scripts/visualOwnerCheck.ts
 */
import { QUESTIONS } from "../src/data/questions";

/** المالك الحقيقي لكل علم مرسوم — بالإنجليزية والعربية */
const FLAG_OWNER: Record<string, { en: string[]; ar: string[] }> = {
  brazil: { en: ["Brazil"], ar: ["البرازيل"] },
  argentina: { en: ["Argentina"], ar: ["الأرجنتين"] },
  france: { en: ["France"], ar: ["فرنسا"] },
  morocco: { en: ["Morocco"], ar: ["المغرب"] },
  germany: { en: ["Germany"], ar: ["ألمانيا"] },
  spain: { en: ["Spain"], ar: ["إسبانيا"] },
  england: { en: ["England"], ar: ["إنجلترا"] },
  portugal: { en: ["Portugal"], ar: ["البرتغال"] },
  netherlands: { en: ["Netherlands", "Holland"], ar: ["هولندا"] },
  italy: { en: ["Italy", "Italia"], ar: ["إيطاليا"] },
  croatia: { en: ["Croatia"], ar: ["كرواتيا"] },
  uruguay: { en: ["Uruguay"], ar: ["أوروغواي"] },
  qatar: { en: ["Qatar"], ar: ["قطر"] },
  egypt: { en: ["Egypt"], ar: ["مصر"] },
  saudi: { en: ["Saudi Arabia", "KSA"], ar: ["السعودية"] },
};

/** المالك الحقيقي لكل شعار نادٍ مرسوم */
const BADGE_OWNER: Record<string, { en: string[]; ar: string[] }> = {
  real: { en: ["Real Madrid"], ar: ["ريال مدريد"] },
  barca: { en: ["Barcelona"], ar: ["برشلونة"] },
  united: { en: ["Manchester United"], ar: ["مانشستر يونايتد", "مان يونايتد"] },
  bayern: { en: ["Bayern Munich", "FC Bayern"], ar: ["بايرن ميونخ", "بايرن"] },
  liverpool: { en: ["Liverpool"], ar: ["ليفربول"] },
  hilal: { en: ["Al Hilal"], ar: ["الهلال"] },
  juventus: { en: ["Juventus"], ar: ["يوفنتوس"] },
  inter: { en: ["Inter", "Inter Milan", "Internazionale"], ar: ["إنتر", "إنتر ميلان"] },
  milan: { en: ["Milan", "AC Milan"], ar: ["ميلان", "ميلانو"] },
  arsenal: { en: ["Arsenal"], ar: ["آرسنال", "أرسنال"] },
  chelsea: { en: ["Chelsea"], ar: ["تشيلسي"] },
  city: { en: ["Manchester City"], ar: ["مانشستر سيتي", "مان سيتي"] },
  atletico: { en: ["Atlético Madrid", "Atletico Madrid"], ar: ["أتلتيكو مدريد", "أتلتيكو"] },
  ahly: { en: ["Al Ahly"], ar: ["الأهلي"] },
  psg: { en: ["Paris Saint-Germain", "PSG"], ar: ["باريس سان جيرمان"] },
  dortmund: { en: ["Borussia Dortmund"], ar: ["بوروسيا دورتموند", "دورتموند"] },
  boca: { en: ["Boca Juniors"], ar: ["بوكا جونيورز"] },
  flamengo: { en: ["Flamengo"], ar: ["فلامنغو"] },
};

/** المالك الحقيقي لكل طقم مرسوم (الطقم يخص اللاعب عبر ناديه أو منتخبه) */
const KIT_OWNER_CLUB: Record<string, { en: string[]; ar: string[] }> = {
  "real-kit": { en: ["Real Madrid"], ar: ["ريال مدريد"] },
  "barca-kit": { en: ["Barcelona", "Messi"], ar: ["برشلونة", "ميسي"] },
  "atleti-kit": { en: ["Atlético Madrid", "Atletico Madrid", "Griezmann"], ar: ["أتلتيكو مدريد", "جريزمان"] },
  "united-kit": { en: ["Manchester United", "Ronaldo"], ar: ["مانشستر يونايتد", "رونالدو"] },
  "city-kit": { en: ["Manchester City", "Haaland"], ar: ["مانشستر سيتي", "هالاند"] },
  "liverpool-kit": { en: ["Liverpool", "Salah"], ar: ["ليفربول", "صلاح"] },
  "arsenal-kit": { en: ["Arsenal"], ar: ["آرسنال", "أرسنال"] },
  "chelsea-kit": { en: ["Chelsea"], ar: ["تشيلسي"] },
  "bayern-kit": { en: ["Bayern Munich", "FC Bayern", "Kane"], ar: ["بايرن ميونخ", "كين"] },
  "dortmund-kit": { en: ["Borussia Dortmund"], ar: ["بوروسيا دورتموند", "دورتموند"] },
  "flamengo-kit": { en: ["Flamengo"], ar: ["فلامنغو"] },
  "juve-kit": { en: ["Juventus"], ar: ["يوفنتوس"] },
  "milan-kit": { en: ["Milan", "AC Milan"], ar: ["ميلان"] },
  "inter-kit": { en: ["Inter", "Inter Milan"], ar: ["إنتر"] },
  "psg-kit": { en: ["Paris Saint-Germain", "PSG", "Mbappé"], ar: ["باريس سان جيرمان", "مبابي"] },
  "boca-kit": { en: ["Boca Juniors"], ar: ["بوكا جونيورز"] },
  "ahly-kit": { en: ["Al Ahly"], ar: ["الأهلي"] },
  "hilal-kit": { en: ["Al Hilal"], ar: ["الهلال"] },
};
const KIT_OWNER_NATION: Record<string, { en: string[]; ar: string[] }> = {
  "argentina-kit": { en: ["Argentina", "Messi", "Maradona"], ar: ["الأرجنتين", "ميسي", "مارادونا"] },
  "brazil-kit": { en: ["Brazil", "Pelé", "Garrincha", "Ronaldinho"], ar: ["البرازيل", "بيليه", "غارينشا", "رونالدينيو"] },
  "morocco-kit": { en: ["Morocco", "Hakimi"], ar: ["المغرب", "حكيمي"] },
};

let bugs = 0;
const report = (m: string) => {
  console.error("❌ " + m);
  bugs++;
};

for (const q of QUESTIONS) {
  if (!q.visual) continue;
  const ans = q.en.options[q.answer];
  const ansAr = q.ar.options[q.answer];
  let owners: { en: string[]; ar: string[] } | undefined;
  if (q.visual.kind === "flag") owners = FLAG_OWNER[q.visual.ref];
  else if (q.visual.kind === "badge") owners = BADGE_OWNER[q.visual.ref];
  else owners = KIT_OWNER_CLUB[q.visual.ref] ?? KIT_OWNER_NATION[q.visual.ref];

  if (!owners) {
    report(`${q.id}: فن غير معروف ${q.visual.kind}:${q.visual.ref}`);
    continue;
  }
  if (!owners.en.includes(ans)) {
    report(`${q.id}: ${q.visual.kind}:${q.visual.ref} — الإجابة «${ans}» ليست مالك الفن (المالكون: ${owners.en.join(", ")})`);
  }
  if (!owners.ar.includes(ansAr)) {
    report(`${q.id}[ar]: الإجابة العربية «${ansAr}» ليست ضمن مالكي ${q.visual.ref}`);
  }
}

console.log(`\n🎨 ${QUESTIONS.filter((q) => q.visual).length} سؤالًا بصريًا · ${bugs} خطأ`);
process.exit(bugs === 0 ? 0 : 1);
