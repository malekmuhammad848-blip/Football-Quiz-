/**
 * Cup Engine — كأس العالم TiQ
 * بطولة خروج المغلوب: 16 منتخبًا → ثمن → ربع → نصف → النهائي.
 * كل مباراة: 4 أسئلة، إجابة صحيحة = هدف لك، خطأ/انتهاء وقت = هدف للخصم.
 * المحرك نقي بالكامل (pure) — بلا I/O، وقابل للاختبار.
 */

import { fnv1a } from "../core/date";
import { readJSON, writeJSON } from "../core/storage";
import { QUESTIONS } from "../data/questions";
import { localizeQuestion } from "./dailyEngine";
import type { Lang, LocalizedQuestion } from "./types";

/* ============================================================
 *  المنتخبات المشاركة — 16 منتخبًا بألوان وهمية للرسم
 * ============================================================ */

export interface CupTeam {
  id: string;
  ar: string;
  en: string;
  /** قوة الفريق 60-95 تؤثر على أداء الخصم الذكي */
  strength: number;
  /** لونان للقميص المرسوم في الواجهة */
  c1: string;
  c2: string;
  /** قصات القميص: solid | stripes | hoops | sash */
  pattern: "solid" | "stripes" | "hoops" | "sash";
}

export const CUP_TEAMS: readonly CupTeam[] = [
  { id: "br", ar: "البرازيل", en: "Brazil", strength: 92, c1: "#ffdc26", c2: "#1d9e4b", pattern: "solid" },
  { id: "ar", ar: "الأرجنتين", en: "Argentina", strength: 93, c1: "#75aadb", c2: "#ffffff", pattern: "stripes" },
  { id: "fr", ar: "فرنسا", en: "France", strength: 92, c1: "#1a2f6e", c2: "#d00a2e", pattern: "solid" },
  { id: "en", ar: "إنجلترا", en: "England", strength: 88, c1: "#ffffff", c2: "#1a2f6e", pattern: "solid" },
  { id: "es", ar: "إسبانيا", en: "Spain", strength: 90, c1: "#c60b1e", c2: "#ffc400", pattern: "solid" },
  { id: "de", ar: "ألمانيا", en: "Germany", strength: 87, c1: "#ffffff", c2: "#111111", pattern: "hoops" },
  { id: "pt", ar: "البرتغال", en: "Portugal", strength: 88, c1: "#b01c2e", c2: "#0b6e2e", pattern: "solid" },
  { id: "nl", ar: "هولندا", en: "Netherlands", strength: 87, c1: "#f36c21", c2: "#1a2f6e", pattern: "solid" },
  { id: "it", ar: "إيطاليا", en: "Italy", strength: 85, c1: "#1a2f6e", c2: "#ffffff", pattern: "hoops" },
  { id: "ma", ar: "المغرب", en: "Morocco", strength: 86, c1: "#b01c2e", c2: "#0b6e4f", pattern: "sash" },
  { id: "be", ar: "بلجيكا", en: "Belgium", strength: 84, c1: "#b01c2e", c2: "#fdda24", pattern: "sash" },
  { id: "hr", ar: "كرواتيا", en: "Croatia", strength: 85, c1: "#ffffff", c2: "#d00a2e", pattern: "hoops" },
  { id: "uy", ar: "أوروغواي", en: "Uruguay", strength: 83, c1: "#5cbfe8", c2: "#111111", pattern: "solid" },
  { id: "sa", ar: "السعودية", en: "Saudi Arabia", strength: 78, c1: "#ffffff", c2: "#0b6e2e", pattern: "solid" },
  { id: "jp", ar: "اليابان", en: "Japan", strength: 82, c1: "#1a2f6e", c2: "#ffffff", pattern: "stripes" },
  { id: "us", ar: "أمريكا", en: "USA", strength: 80, c1: "#ffffff", c2: "#1a2f6e", pattern: "sash" },
] as const;

export function teamById(id: string): CupTeam {
  return CUP_TEAMS.find((t) => t.id === id) ?? CUP_TEAMS[0]!;
}

export function teamName(t: CupTeam, lang: Lang): string {
  return lang === "ar" ? t.ar : t.en;
}

/* ============================================================
 *  الأدوار
 * ============================================================ */

export const ROUND_NAMES = ["r16", "qf", "sf", "final"] as const;
export type CupRound = (typeof ROUND_NAMES)[number];

export const ROUNDS_PER_CUP = 4;

/** كل دور يلعب 4 مباريات (16 → 8 → 4 → 2 → بطل) */
export const MATCHES_PER_ROUND: Record<CupRound, number> = {
  r16: 8,
  qf: 4,
  sf: 2,
  final: 1,
};

/* ============================================================
 *  حالة البطولة
 * ============================================================ */

export interface CupMatch {
  /** معرفان للفريقين */
  home: string;
  away: string;
  /** أهداف بعد انتهاء المباراة (null = لم تلعب بعد) */
  homeGoals: number | null;
  awayGoals: number | null;
}

export interface CupState {
  /** البذرة: نفس البذرة = نفس البطولة (سؤال اليوم مثلاً) أو بذرة عشوائية */
  seed: number;
  round: CupRound;
  matchIndex: number;
  /** شجرة المباريات لكل دور */
  bracket: Record<CupRound, CupMatch[]>;
  /** أهداف اللاعب في المباراة الحالية */
  myGoals: number;
  oppGoals: number;
  /** اللقب إن اكتملت البطولة */
  champion: string | null;
}

/** ترتيب المشاركين بالبذرة وتقسيمهم (1ض16، 8ض9...) */
function buildBracket(seed: number): Record<CupRound, CupMatch[]> {
  const ordered = [...CUP_TEAMS];
  // خلط مثبت بالبذرة
  let s = seed >>> 0 || 1;
  for (let i = ordered.length - 1; i > 0; i--) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const j = s % (i + 1);
    [ordered[i], ordered[j]] = [ordered[j]!, ordered[i]!];
  }

  const r16: CupMatch[] = [];
  for (let i = 0; i < 8; i++) {
    r16.push({ home: ordered[i]!.id, away: ordered[15 - i]!.id, homeGoals: null, awayGoals: null });
  }
  return { r16, qf: [], sf: [], final: [] };
}

/** بطولة جديدة */
export function newCup(seed = Math.floor(Math.random() * 0xffffffff)): CupState {
  return {
    seed,
    round: "r16",
    matchIndex: 0,
    bracket: buildBracket(seed),
    myGoals: 0,
    oppGoals: 0,
    champion: null,
  };
}

/** المباراة الحالية (أو null لو البطولة انتهت) */
export function currentMatch(cup: CupState): CupMatch | null {
  if (cup.champion) return null;
  const ms = cup.bracket[cup.round];
  return ms[cup.matchIndex] ?? null;
}

/** فريق اللاعب = صاحب الأرض دائمًا في هذا التصميم المبسط */
export function myTeam(cup: CupState): string | null {
  return currentMatch(cup)?.home ?? null;
}

export function oppTeam(cup: CupState): string | null {
  return currentMatch(cup)?.away ?? null;
}

/* ============================================================
 *  أسئلة المباراة — 4 أسئلة من البنك مختارة بالبذرة
 * ============================================================ */

export function matchQuestions(cup: CupState, lang: Lang): LocalizedQuestion[] {
  const seed = fnv1a(`${cup.seed}:${cup.round}:${cup.matchIndex}`);
  const idx: number[] = [];
  let s = seed >>> 0 || 1;
  while (idx.length < 4) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const i = s % QUESTIONS.length;
    if (!idx.includes(i)) idx.push(i);
  }
  return idx.map((i, k) => localizeQuestion(QUESTIONS[i]!, lang, seed + k * 7919));
}

/* ============================================================
 *  منطق الهدف — نقاء كامل
 * ============================================================ */

/** أداء الخصم: قوة الفريق + عشوائية البذرة → احتمال يسجل بعد إجابتك */
export function opponentScores(cup: CupState, questionNo: number): boolean {
  const opp = oppTeam(cup);
  if (!opp) return false;
  const strength = teamById(opp).strength;
  const rollSeed = fnv1a(`${cup.seed}:${cup.round}:${cup.matchIndex}:${questionNo}:opp`);
  // قوة 92 → ~62% يسجل، قوة 78 → ~48%
  const base = 0.35 + (strength / 100) * 0.35;
  return (rollSeed % 1000) / 1000 < base;
}

/** نتيجة إجابة: صحيحة = هدف لك + الخصم قد يسجل؛ خطأ = الخصم يسجل غالبًا */
export function answerResult(cup: CupState, questionNo: number, correct: boolean): CupState {
  let my = cup.myGoals;
  let opp = cup.oppGoals;

  if (correct) {
    my += 1;
    if (opponentScores(cup, questionNo)) opp += 1;
  } else {
    if (opponentScores(cup, questionNo)) opp += 1;
  }

  return { ...cup, myGoals: my, oppGoals: opp };
}

/** إنهاء المباراة وحسم الفائز */
export function finishMatch(cup: CupState): CupState {
  const m = currentMatch(cup);
  if (!m) return cup;
  const homeGoals = Math.max(cup.myGoals, cup.oppGoals);
  const awayGoals = Math.min(cup.myGoals, cup.oppGoals);
  // لو تعادل: ركلة ترجيح — نصف البذرة يفصل
  let homeWin = cup.myGoals > cup.oppGoals;
  if (cup.myGoals === cup.oppGoals) {
    const pkSeed = fnv1a(`${cup.seed}:${cup.round}:${cup.matchIndex}:pk`);
    homeWin = pkSeed % 2 === 0;
  }

  const next: CupState = {
    ...cup,
    bracket: {
      ...cup.bracket,
      [cup.round]: cup.bracket[cup.round].map((mm, i) =>
        i === cup.matchIndex ? { ...mm, homeGoals: homeWin ? homeGoals : awayGoals, awayGoals: homeWin ? awayGoals : homeGoals } : mm,
      ),
    },
    myGoals: 0,
    oppGoals: 0,
  };

  // تقدم الفهرس أو الدور
  const roundMatches = MATCHES_PER_ROUND[next.round];
  if (next.matchIndex + 1 < roundMatches) {
    return { ...next, matchIndex: next.matchIndex + 1 };
  }

  // انتهى الدور — راكم الفائزين واحسب الدور التالي
  const winners = next.bracket[next.round].map((mm) =>
    (mm.homeGoals ?? 0) >= (mm.awayGoals ?? 0) ? mm.home : mm.away,
  );

  if (next.round === "final") {
    return { ...next, champion: winners[0] ?? m.home };
  }

  const nextRound = next.round === "r16" ? "qf" : next.round === "qf" ? "sf" : "final";
  const nextMatches: CupMatch[] = [];
  for (let i = 0; i < winners.length; i += 2) {
    nextMatches.push({ home: winners[i]!, away: winners[i + 1] ?? winners[i]!, homeGoals: null, awayGoals: null });
  }
  return {
    ...next,
    round: nextRound,
    matchIndex: 0,
    bracket: { ...next.bracket, [nextRound]: nextMatches },
  };
}

/** إجمالي أهداف اللاعب بالبطولة */
export function totalGoals(cup: CupState): number {
  let g = 0;
  for (const round of ROUND_NAMES) {
    for (const m of cup.bracket[round] ?? []) {
      // أهداف اللاعب = أهداف صاحب الأرض في مبارياته (مبسط)
      if (m.homeGoals !== null) g += m.homeGoals ?? 0;
    }
  }
  return g;
}

/* ============================================================
 *  التخزين المحلي
 * ============================================================ */

const KEY = "tiq:cup";

export function loadCup(): CupState | null {
  return readJSON<CupState | null>(KEY, null);
}

export function saveCup(cup: CupState): void {
  writeJSON(KEY, cup);
}

export function clearCup(): void {
  writeJSON(KEY, null);
}

/* ============================================================
 *  سجل البطولات — ألقاب وأهداف تظهر في البروفايل
 * ============================================================ */

export interface CupHistoryEntry {
  /** تاريخ إكمال البطولة (ISO) */
  at: string;
  /** معرف البطل */
  champion: string;
  /** هل اللاعب هو البطل؟ */
  playerWon: boolean;
  /** إجمالي أهداف اللاعب بالبطولة */
  goals: number;
  /** عدد المباريات اللُعبت */
  matches: number;
}

const HISTORY_KEY = "tiq:cupHistory";
const HISTORY_MAX = 20;

export function loadCupHistory(): CupHistoryEntry[] {
  const h = readJSON<CupHistoryEntry[]>(HISTORY_KEY, []);
  return Array.isArray(h) ? h : [];
}

/** تسجيل نتيجة بطولة منتهية — يعيد السجل المحدث */
export function recordCupResult(cup: CupState): CupHistoryEntry[] {
  if (!cup.champion) return loadCupHistory();
  const goals = totalGoals(cup);
  const matches = ROUND_NAMES.reduce(
    (n, r) => n + (cup.bracket[r]?.filter((m) => m.homeGoals !== null).length ?? 0),
    0,
  );
  const entry: CupHistoryEntry = {
    at: new Date().toISOString(),
    champion: cup.champion,
    playerWon: cup.champion === myTeamId(cup),
    goals,
    matches,
  };
  const next = [entry, ...loadCupHistory()].slice(0, HISTORY_MAX);
  writeJSON(HISTORY_KEY, next);
  return next;
}

/** معرف فريق اللاعب من آخر مباراة لُعبت (البطل إن فاز هو) */
function myTeamId(cup: CupState): string {
  // في هذا التصميم اللاعب دائمًا صاحب الأرض في مباراته الأخيرة قبل البطل
  const finalMatch = cup.bracket.final[0];
  if (finalMatch && finalMatch.homeGoals !== null) return finalMatch.home;
  return cup.champion ?? "";
}

/** إحصائيات مختصرة للبروفايل */
export function cupSummary(): { cups: number; finals: number; played: number; bestRun: number } {
  const h = loadCupHistory();
  const cups = h.filter((e) => e.playerWon).length;
  // نهائي = بطولة وصل فيها النهائي (كل البطولات المسجلة أكملت على الأقل نصف النهائي)
  const finals = h.length;
  const played = h.reduce((n, e) => n + e.matches, 0);
  const bestRun = h.reduce((best, e) => Math.max(best, e.matches), 0);
  return { cups, finals, played, bestRun };
}
