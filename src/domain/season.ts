/** ============================================================
 *  Season & Stickers — الموسم التقييمي بأسلوب FIFA Ultimate Team
 *  24 ملصقًا في 4 حزم: أساطير · نجوم الحاضر · أندية كبرى · منتخبات.
 *  كل ملصق يرسم نفسه بـ SVG (طقم أو علم) — بلا صور خارجية ولا حقوق.
 *  ============================================================ */

import { readJSON, writeJSON } from "../core/storage";

export type Rarity = "common" | "rare" | "epic" | "legendary";

export type StickerKind = "legend" | "star" | "club" | "nation";

export interface Sticker {
  id: string;
  kind: StickerKind;
  rarity: Rarity;
  /** لون الطقم/الدرع الأساسي والثانوي (يرسمان بـ SVG) */
  c1: string;
  c2: string;
  /** نمط الرسم: kit = قميص، flag = علم، badge = شعار */
  art: "kit" | "flag" | "badge";
  /** نمط أكمام الطقم: solid | stripes (عمودي) | sash (وشاح) | hoops (أفقي) */
  pattern?: "solid" | "stripes" | "sash" | "hoops";
  /** رقم القميص — يظهر على الظهر للاعبين والأساطير */
  number?: number;
  /** معرف رسم علم خاص للمنتخبات (بدقة أعلى من العام) */
  flagStyle?:
    | "argentina" | "brazil" | "france" | "morocco" | "germany" | "spain"
    | "england" | "portugal" | "netherlands" | "italy" | "croatia" | "uruguay";
  /** معرف رسم شعار خاص للنادي (يُرسم يدويًا لكل نادٍ) */
  crestStyle?:
    | "real" | "barca" | "united" | "bayern" | "liverpool" | "hilal"
    | "juventus" | "inter" | "milan" | "arsenal" | "chelsea" | "city"
    | "atletico" | "ahly";
  ar: string;
  en: string;
  /** التقييم من 60 إلى 99 */
  rating: number;
}

export const SEASON_ID = "s1";

export const STICKERS: readonly Sticker[] = [
  // ——— أساطير (legendary/epic) ———
  { id: "pele", kind: "legend", rarity: "legendary", c1: "#ffdc26", c2: "#1d4ed8", art: "kit", pattern: "solid", number: 10, ar: "بيليه", en: "Pelé", rating: 99 },
  { id: "maradona", kind: "legend", rarity: "legendary", c1: "#75aadb", c2: "#ffffff", art: "kit", pattern: "stripes", number: 10, ar: "مارادونا", en: "Maradona", rating: 98 },
  { id: "cruyff", kind: "legend", rarity: "epic", c1: "#a5001e", c2: "#ffffff", art: "kit", pattern: "hoops", number: 14, ar: "كرويف", en: "Cruyff", rating: 96 },
  { id: "zidane", kind: "legend", rarity: "epic", c1: "#1a2f6e", c2: "#ffffff", art: "kit", pattern: "sash", number: 10, ar: "زيدان", en: "Zidane", rating: 95 },
  { id: "ronaldo-nazario", kind: "legend", rarity: "epic", c1: "#ffdc26", c2: "#1d9e4b", art: "kit", pattern: "solid", number: 9, ar: "الظاهرة", en: "R9", rating: 96 },
  { id: "beckenbauer", kind: "legend", rarity: "rare", c1: "#ffffff", c2: "#111111", art: "kit", pattern: "solid", number: 5, ar: "بيكنباور", en: "Beckenbauer", rating: 93 },

  // ——— نجوم الحاضر ———
  { id: "messi", kind: "star", rarity: "legendary", c1: "#75aadb", c2: "#ffffff", art: "kit", pattern: "stripes", number: 10, ar: "ميسي", en: "Messi", rating: 98 },
  { id: "cr7", kind: "star", rarity: "legendary", c1: "#b01c2e", c2: "#0b5e2e", art: "kit", pattern: "solid", number: 7, ar: "رونالدو", en: "Ronaldo", rating: 97 },
  { id: "mbappe", kind: "star", rarity: "epic", c1: "#1a2f6e", c2: "#d00a2e", art: "kit", pattern: "sash", number: 10, ar: "مبابي", en: "Mbappé", rating: 95 },
  { id: "haaland", kind: "star", rarity: "epic", c1: "#6cabdd", c2: "#111111", art: "kit", pattern: "solid", number: 9, ar: "هالاند", en: "Haaland", rating: 94 },
  { id: "bellingham", kind: "star", rarity: "rare", c1: "#ffffff", c2: "#b01c2e", art: "kit", pattern: "solid", number: 5, ar: "بيلينغهام", en: "Bellingham", rating: 93 },
  { id: "salah", kind: "star", rarity: "epic", c1: "#c8102e", c2: "#00b2a9", art: "kit", pattern: "solid", number: 11, ar: "صلاح", en: "Salah", rating: 94 },

  // ——— أندية كبرى (شارات) ———
  { id: "real-madrid", kind: "club", rarity: "epic", c1: "#ffffff", c2: "#febe10", art: "badge", crestStyle: "real", ar: "ريال مدريد", en: "Real Madrid", rating: 95 },
  { id: "barcelona", kind: "club", rarity: "epic", c1: "#a50044", c2: "#004d98", art: "badge", crestStyle: "barca", ar: "برشلونة", en: "Barcelona", rating: 94 },
  { id: "man-utd", kind: "club", rarity: "rare", c1: "#da291c", c2: "#fbe122", art: "badge", crestStyle: "united", ar: "مان يونايتد", en: "Man United", rating: 90 },
  { id: "bayern", kind: "club", rarity: "epic", c1: "#dc052d", c2: "#0066b2", art: "badge", crestStyle: "bayern", ar: "بايرن", en: "Bayern", rating: 93 },
  { id: "liverpool", kind: "club", rarity: "rare", c1: "#c8102e", c2: "#00b2a9", art: "badge", crestStyle: "liverpool", ar: "ليفربول", en: "Liverpool", rating: 91 },
  { id: "al-hilal", kind: "club", rarity: "rare", c1: "#0b5ec4", c2: "#ffffff", art: "badge", crestStyle: "hilal", ar: "الهلال", en: "Al Hilal", rating: 88 },

  // ——— منتخبات (أعلام) ———
  { id: "argentina", kind: "nation", rarity: "epic", c1: "#75aadb", c2: "#ffffff", art: "flag", flagStyle: "argentina", ar: "الأرجنتين", en: "Argentina", rating: 96 },
  { id: "brazil", kind: "nation", rarity: "epic", c1: "#009c3b", c2: "#ffdf00", art: "flag", flagStyle: "brazil", ar: "البرازيل", en: "Brazil", rating: 95 },
  { id: "france", kind: "nation", rarity: "epic", c1: "#1a2f6e", c2: "#d00a2e", art: "flag", flagStyle: "france", ar: "فرنسا", en: "France", rating: 95 },
  { id: "morocco", kind: "nation", rarity: "rare", c1: "#b01c2e", c2: "#0b6e4f", art: "flag", flagStyle: "morocco", ar: "المغرب", en: "Morocco", rating: 89 },
  { id: "germany", kind: "nation", rarity: "rare", c1: "#111111", c2: "#dd0000", art: "flag", flagStyle: "germany", ar: "ألمانيا", en: "Germany", rating: 90 },
  { id: "spain", kind: "nation", rarity: "rare", c1: "#c60b1e", c2: "#ffc400", art: "flag", flagStyle: "spain", ar: "إسبانيا", en: "Spain", rating: 92 },

  // ——— الموسم الموسّع: أساطير إضافية ———
  { id: "yashin", kind: "legend", rarity: "legendary", c1: "#111111", c2: "#94a3b8", art: "kit", pattern: "solid", number: 1, ar: "ياشين", en: "Yashin", rating: 97 },
  { id: "puskas", kind: "legend", rarity: "epic", c1: "#ffffff", c2: "#b01c2e", art: "kit", pattern: "hoops", number: 10, ar: "بوشكاش", en: "Puskás", rating: 95 },
  { id: "eusebio", kind: "legend", rarity: "epic", c1: "#b01c2e", c2: "#ffffff", art: "kit", pattern: "solid", number: 10, ar: "أوزيبيو", en: "Eusébio", rating: 94 },
  { id: "garrincha", kind: "legend", rarity: "epic", c1: "#ffdc26", c2: "#1d9e4b", art: "kit", pattern: "stripes", number: 7, ar: "غارينشا", en: "Garrincha", rating: 95 },
  { id: "van-basten", kind: "legend", rarity: "epic", c1: "#f36c21", c2: "#ffffff", art: "kit", pattern: "solid", number: 9, ar: "فان باستن", en: "Van Basten", rating: 94 },
  { id: "matthaus", kind: "legend", rarity: "rare", c1: "#ffffff", c2: "#111111", art: "kit", pattern: "solid", number: 10, ar: "ماتيوس", en: "Matthäus", rating: 92 },
  { id: "romario", kind: "legend", rarity: "rare", c1: "#ffdc26", c2: "#1d9e4b", art: "kit", pattern: "solid", number: 11, ar: "روماريو", en: "Romário", rating: 93 },
  { id: "rivaldo", kind: "legend", rarity: "rare", c1: "#ffdc26", c2: "#1d9e4b", art: "kit", pattern: "solid", number: 10, ar: "ريفالدو", en: "Rivaldo", rating: 92 },
  { id: "ronaldinho", kind: "legend", rarity: "legendary", c1: "#ffdc26", c2: "#1d9e4b", art: "kit", pattern: "solid", number: 10, ar: "رونالدينيو", en: "Ronaldinho", rating: 96 },

  // ——— نجوم إضافيون ———
  { id: "kane", kind: "star", rarity: "epic", c1: "#ffffff", c2: "#1a2f6e", art: "kit", pattern: "solid", number: 9, ar: "كين", en: "Kane", rating: 93 },
  { id: "kdb", kind: "star", rarity: "epic", c1: "#6cabdd", c2: "#ffffff", art: "kit", pattern: "solid", number: 17, ar: "دي بروين", en: "De Bruyne", rating: 94 },
  { id: "modric", kind: "star", rarity: "epic", c1: "#ffffff", c2: "#d00a2e", art: "kit", pattern: "hoops", number: 10, ar: "مودريتش", en: "Modrić", rating: 93 },
  { id: "lewandowski", kind: "star", rarity: "epic", c1: "#ffffff", c2: "#d00a2e", art: "kit", pattern: "sash", number: 9, ar: "ليفاندوفسكي", en: "Lewandowski", rating: 93 },
  { id: "benzema", kind: "star", rarity: "epic", c1: "#ffffff", c2: "#febe10", art: "kit", pattern: "solid", number: 9, ar: "بنزيما", en: "Benzema", rating: 94 },
  { id: "neymar", kind: "star", rarity: "epic", c1: "#ffdc26", c2: "#1d9e4b", art: "kit", pattern: "solid", number: 10, ar: "نيمار", en: "Neymar", rating: 93 },
  { id: "vinicius", kind: "star", rarity: "rare", c1: "#ffffff", c2: "#febe10", art: "kit", pattern: "solid", number: 7, ar: "فينيسيوس", en: "Vinícius", rating: 92 },
  { id: "bellingham-star", kind: "star", rarity: "rare", c1: "#ffffff", c2: "#1a2f6e", art: "kit", pattern: "solid", number: 5, ar: "بيلينغهام", en: "Bellingham", rating: 92 },
  { id: "yamal", kind: "star", rarity: "rare", c1: "#a50044", c2: "#004d98", art: "kit", pattern: "stripes", number: 19, ar: "يامال", en: "Yamal", rating: 91 },

  // ——— أندية إضافية ———
  { id: "juventus", kind: "club", rarity: "rare", c1: "#111111", c2: "#ffffff", art: "badge", crestStyle: "juventus", ar: "يوفنتوس", en: "Juventus", rating: 92 },
  { id: "inter", kind: "club", rarity: "rare", c1: "#1a2f6e", c2: "#111111", art: "badge", crestStyle: "inter", ar: "إنتر", en: "Inter", rating: 91 },
  { id: "ac-milan", kind: "club", rarity: "rare", c1: "#b01c2e", c2: "#111111", art: "badge", crestStyle: "milan", ar: "ميلان", en: "AC Milan", rating: 92 },
  { id: "arsenal", kind: "club", rarity: "rare", c1: "#ef0107", c2: "#ffffff", art: "badge", crestStyle: "arsenal", ar: "أرسنال", en: "Arsenal", rating: 91 },
  { id: "chelsea", kind: "club", rarity: "common", c1: "#034694", c2: "#ffffff", art: "badge", crestStyle: "chelsea", ar: "تشيلسي", en: "Chelsea", rating: 89 },
  { id: "man-city", kind: "club", rarity: "epic", c1: "#6cabdd", c2: "#ffffff", art: "badge", crestStyle: "city", ar: "مان سيتي", en: "Man City", rating: 94 },
  { id: "atletico", kind: "club", rarity: "common", c1: "#cb3524", c2: "#ffffff", art: "badge", crestStyle: "atletico", ar: "أتلتيكو", en: "Atlético", rating: 89 },
  { id: "al-ahly", kind: "club", rarity: "rare", c1: "#b01c2e", c2: "#ffffff", art: "badge", crestStyle: "ahly", ar: "الأهلي", en: "Al Ahly", rating: 89 },

  // ——— منتخبات إضافية ———
  { id: "england", kind: "nation", rarity: "rare", c1: "#ffffff", c2: "#1a2f6e", art: "flag", flagStyle: "england", ar: "إنجلترا", en: "England", rating: 91 },
  { id: "portugal", kind: "nation", rarity: "epic", c1: "#b01c2e", c2: "#0b6e2e", art: "flag", flagStyle: "portugal", ar: "البرتغال", en: "Portugal", rating: 92 },
  { id: "netherlands", kind: "nation", rarity: "rare", c1: "#f36c21", c2: "#1a2f6e", art: "flag", flagStyle: "netherlands", ar: "هولندا", en: "Netherlands", rating: 90 },
  { id: "italy", kind: "nation", rarity: "rare", c1: "#1a2f6e", c2: "#ffffff", art: "flag", flagStyle: "italy", ar: "إيطاليا", en: "Italy", rating: 90 },
  { id: "croatia", kind: "nation", rarity: "common", c1: "#ffffff", c2: "#d00a2e", art: "flag", flagStyle: "croatia", ar: "كرواتيا", en: "Croatia", rating: 88 },
  { id: "uruguay", kind: "nation", rarity: "common", c1: "#5cbfe8", c2: "#111111", art: "flag", flagStyle: "uruguay", ar: "أوروغواي", en: "Uruguay", rating: 87 },
] as const;

export type PackId = "legends" | "stars" | "clubs" | "nations";

export interface PackDef {
  id: PackId;
  /** XP المطلوب لفتح الحزمة */
  costXp: number;
  /** عدد الملصقات في الحزمة */
  pulls: number;
  /** مضاعف حظ الندرة: يعيد توزين الاحتمالات */
  luck: number;
  ar: string;
  en: string;
  emoji: string;
}

export const PACKS: readonly PackDef[] = [
  { id: "legends", costXp: 120, pulls: 2, luck: 2.5, ar: "حزمة الأساطير", en: "Legends Pack", emoji: "👑" },
  { id: "stars", costXp: 80, pulls: 2, luck: 1.6, ar: "حزمة النجوم", en: "Stars Pack", emoji: "⭐" },
  { id: "clubs", costXp: 50, pulls: 2, luck: 1, ar: "حزمة الأندية", en: "Clubs Pack", emoji: "🏟️" },
  { id: "nations", costXp: 50, pulls: 2, luck: 1, ar: "حزمة المنتخبات", en: "Nations Pack", emoji: "🌍" },
] as const;

/** أوزان الندرة الأساسية — تعاد المعايرة مع luck */
const RARITY_WEIGHT: Record<Rarity, number> = {
  common: 50,
  rare: 30,
  epic: 15,
  legendary: 5,
};

function pickByRarity(kind: StickerKind, luck: number): Sticker {
  const pool = STICKERS.filter((s) => s.kind === kind);
  const weights = pool.map((s) => {
    const w = RARITY_WEIGHT[s.rarity];
    return s.rarity === "common" || s.rarity === "rare" ? w : w * luck;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    roll -= weights[i]!;
    if (roll <= 0) return pool[i]!;
  }
  return pool[pool.length - 1]!;
}

export function openPack(packId: PackId): Sticker[] {
  const pack = PACKS.find((p) => p.id === packId)!;
  const pulled: Sticker[] = [];
  for (let i = 0; i < pack.pulls; i++) {
    pulled.push(pickByRarity(pack.id as StickerKind, pack.luck));
  }
  return pulled;
}

// ——— حالة الألبوم المحلية ———

export interface SeasonState {
  season: string;
  /** الملصقات المملوكة: id → عدد النسخ */
  owned: Record<string, number>;
  /** مكافآت الافتتاح الأول للموسم */
  seeded: boolean;
}

export function emptySeason(): SeasonState {
  return { season: SEASON_ID, owned: {}, seeded: false };
}

const KEY = "tiq:season";

export function loadSeason(): SeasonState {
  const s = readJSON<Partial<SeasonState>>(KEY, {});
  if (s.season !== SEASON_ID) return emptySeason();
  return { ...emptySeason(), ...s, owned: s.owned ?? {} };
}

export function saveSeason(s: SeasonState): void {
  writeJSON(KEY, s);
}

/** بذر 3 ملصقات افتتاحية — تجربة الإدمان الأولى */
export function seedStarterPack(s: SeasonState): SeasonState {
  if (s.seeded) return s;
  const starters = ["messi", "real-madrid", "argentina"];
  const owned = { ...s.owned };
  for (const id of starters) owned[id] = (owned[id] ?? 0) + 1;
  return { ...s, owned, seeded: true };
}

/** إجمالي الملصقات في الألبوم */
export const TOTAL_STICKERS = STICKERS.length;

/** سجل ملصقات مكررة تتحول لعملات موسمية (نقاط مجموعة) */
export function collectionScore(s: SeasonState): number {
  let score = 0;
  for (const st of STICKERS) {
    const n = s.owned[st.id] ?? 0;
    if (n > 0) {
      score += st.rating * 2;
      if (st.rarity === "legendary") score += 100;
      else if (st.rarity === "epic") score += 50;
      else if (st.rarity === "rare") score += 20;
    }
  }
  return score;
}

export function ownedCount(s: SeasonState): number {
  return STICKERS.filter((st) => (s.owned[st.id] ?? 0) > 0).length;
}
