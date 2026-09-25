/**
 * Cup Engine — كأس العالم TiQ (إعادة بناء كاملة)
 * اللاعب يختار منتخبه ويبقى به حتى النهاية. خروج مغلوب حقيقي:
 * خسارة = إقصاء فوري مع محاكاة بقية البطولة. تعادل = ركلات ترجيح.
 * المحرك نقي بالكامل — بلا I/O — وقابل للاختبار.
 */

import { fnv1a } from "../core/date";
import { readJSON, writeJSON } from "../core/storage";
import { QUESTIONS } from "../data/questions";
import { localizeQuestion } from "./dailyEngine";
import type { Lang, LocalizedQuestion } from "./types";

/* ============================================================
 *  المنتخبات المشاركة — 16 منتخبًا
 * ============================================================ */

export interface CupTeam {
  id: string;
  ar: string;
  en: string;
  /** قوة الفريق 60-95 تؤثر على أداء الخصم الذكي */
  strength: number;
  c1: string;
  c2: string;
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
  return CUP_TEAMS.find((tm) => tm.id === id) ?? CUP_TEAMS[0]!;
}

export function teamName(team: CupTeam, lang: Lang): string {
  return lang === "ar" ? team.ar : team.en;
}

/* ============================================================
 *  الأدوار
 * ============================================================ */

export const ROUND_NAMES = ["r16", "qf", "sf", "final"] as const;
export type CupRound = (typeof ROUND_NAMES)[number];

export const ROUNDS_PER_CUP = 4;

export const MATCHES_PER_ROUND: Record<CupRound, number> = {
  r16: 8,
  qf: 4,
  sf: 2,
  final: 1,
};

function nextRound(r: CupRound): CupRound {
  return r === "r16" ? "qf" : r === "qf" ? "sf" : "final";
}

/* ============================================================
 *  حالة البطولة
 * ============================================================ */

export interface CupMatch {
  home: string;
  away: string;
  homeGoals: number | null;
  awayGoals: number | null;
  /** حُسمت بالترجيح؟ */
  viaPenalties?: boolean;
  /** من فاز فعليًا (ضروري للترجيح — الهدفان متساويان هناك) */
  winner?: string;
}

export interface CupState {
  seed: number;
  /** فريق اللاعب — ثابت طوال البطولة */
  myTeamId: string;
  round: CupRound;
  matchIndex: number;
  bracket: Record<CupRound, CupMatch[]>;
  /** أهداف المباراة الحالية */
  myGoals: number;
  oppGoals: number;
  /** اللقب إن اكتملت البطولة */
  champion: string | null;
  /** أُقصي اللاعب؟ (خسارته في مباراة قبل النهاية) */
  eliminated: boolean;
}

/** خلط مثبت بالبذرة */
export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const arr = [...items];
  let s = seed >>> 0 || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/** بناء شجرة دور الـ16 */
function buildR16(seed: number): CupMatch[] {
  const ordered = seededShuffle(CUP_TEAMS, seed);
  const matches: CupMatch[] = [];
  for (let i = 0; i < 8; i++) {
    matches.push({ home: ordered[i]!.id, away: ordered[15 - i]!.id, homeGoals: null, awayGoals: null });
  }
  return matches;
}

/** بطولة جديدة — اللاعب يختار فريقه (يُقعد صاحب أرض دائمًا) */
export function newCup(myTeamId: string, seed = Math.floor(Math.random() * 0xffffffff)): CupState {
  const team = teamById(myTeamId);
  const r16 = buildR16(seed);
  // ضع فريق اللاعب صاحب أرض في أول ظهور له
  const idx = r16.findIndex((m) => m.home === team.id || m.away === team.id);
  if (idx !== -1) {
    const m = r16[idx]!;
    if (m.away === team.id) r16[idx] = { home: team.id, away: m.home, homeGoals: null, awayGoals: null };
  } else {
    r16[0] = { home: team.id, away: r16[0]!.home, homeGoals: null, awayGoals: null };
  }
  return {
    seed,
    myTeamId: team.id,
    round: "r16",
    matchIndex: idx === -1 ? 0 : idx,
    bracket: { r16, qf: [], sf: [], final: [] },
    myGoals: 0,
    oppGoals: 0,
    champion: null,
    eliminated: false,
  };
}

/** المباراة الحالية للاعب (أو null لو أُقصي أو انتهت البطولة) */
export function currentMatch(cup: CupState): CupMatch | null {
  if (cup.champion || cup.eliminated) return null;
  const ms = cup.bracket[cup.round];
  return ms[cup.matchIndex] ?? null;
}

export function myTeam(cup: CupState): CupTeam {
  return teamById(cup.myTeamId);
}

export function oppTeam(cup: CupState): CupTeam | null {
  const m = currentMatch(cup);
  if (!m) return null;
  return teamById(m.home === cup.myTeamId ? m.away : m.home);
}

/* ============================================================
 *  أسئلة المباراة — 4 أسئلة من البنك مختارة بالبذرة
 * ============================================================ */

export function matchQuestions(cup: CupState, lang: Lang): LocalizedQuestion[] {
  const seed = fnv1a(`${cup.seed}:${cup.round}:${cup.matchIndex}`);
  const idx: number[] = [];
  let s = seed >>> 0 || 1;
  while (idx.length < 4 && idx.length < QUESTIONS.length) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const i = s % QUESTIONS.length;
    if (!idx.includes(i)) idx.push(i);
  }
  return idx.map((i, k) => localizeQuestion(QUESTIONS[i]!, lang, seed + k * 7919));
}

/* ============================================================
 *  ركلات الترجيح عند التعادل
 * ============================================================ */

export interface PkResult {
  won: boolean;
  myCorrect: number;
  oppCorrect: number;
}

/** سؤالا الترجيح الحاسمان عند التعادل */
export function pkQuestions(cup: CupState, lang: Lang): [LocalizedQuestion, LocalizedQuestion] {
  const seed = fnv1a(`${cup.seed}:${cup.round}:${cup.matchIndex}:pk`);
  const idx: number[] = [];
  let s = seed >>> 0 || 1;
  while (idx.length < 2 && idx.length < QUESTIONS.length) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const i = s % QUESTIONS.length;
    if (!idx.includes(i)) idx.push(i);
  }
  return idx.map((i, k) => localizeQuestion(QUESTIONS[i]!, lang, seed + k * 31)) as [LocalizedQuestion, LocalizedQuestion];
}

/** حسم الترجيح: إجاباتك مقابل أداء الخصم حسب قوته */
export function resolvePk(cup: CupState, myCorrect: number): PkResult {
  const opp = oppTeam(cup);
  const strength = opp?.strength ?? 85;
  const rollSeed = fnv1a(`${cup.seed}:${cup.round}:${cup.matchIndex}:pkOpp`);
  const r1 = (rollSeed % 1000) / 1000;
  const r2 = ((rollSeed >>> 10) % 1000) / 1000;
  const oppCorrect = (r1 < strength / 130 ? 1 : 0) + (r2 < strength / 160 ? 1 : 0);
  return { won: myCorrect > oppCorrect || (myCorrect === oppCorrect && r1 < 0.5), myCorrect, oppCorrect };
}

/* ============================================================
 *  منطق الأهداف
 * ============================================================ */

/** أداء الخصم: قوة الفريق + عشوائية البذرة → احتمال يسجل بعد إجابتك */
export function opponentScores(cup: CupState, questionNo: number): boolean {
  const opp = oppTeam(cup);
  if (!opp) return false;
  const strength = opp.strength;
  const rollSeed = fnv1a(`${cup.seed}:${cup.round}:${cup.matchIndex}:${questionNo}:opp`);
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

/* ============================================================
 *  إنهاء المباراة — خروج مغلوب حقيقي + محاكاة بقية الشجرة
 * ============================================================ */

/** XP مكافأة حسب الدور (تُمنح عند الفوز في كل مباراة) */
export function roundWinXp(round: CupRound): number {
  return { r16: 20, qf: 35, sf: 55, final: 100 }[round];
}

/** محاكاة مباراة غير لُعبت بالبذرة حسب قوة الفريقين */
function simulateMatch(seed: number, m: CupMatch): CupMatch {
  const simSeed = fnv1a(`${seed}:sim:${m.home}:${m.away}`);
  const hs = teamById(m.home).strength;
  const as = teamById(m.away).strength;
  const homeWins = (simSeed % 1000) / 1000 < hs / (hs + as);
  // نتيجة واقعية 1-0 / 2-1 / 2-0 / 1-1(ترجيح)
  const variant = (simSeed >>> 10) % 4;
  const scores: Array<[number, number]> = [
    [1, 0],
    [2, 1],
    [2, 0],
    [1, 1],
  ];
  let [hg, ag] = scores[variant]!;
  if (hg === ag) {
    // الترجيح يُسجل كفوز صريح — بدون هدف وهمي
    const pkWinner = homeWins ? m.home : m.away;
    return { ...m, homeGoals: hg, awayGoals: ag, viaPenalties: true, winner: pkWinner };
  }
  if (!homeWins && hg > ag) [hg, ag] = [ag, hg];
  return { ...m, homeGoals: hg, awayGoals: ag, viaPenalties: false, winner: hg > ag ? m.home : m.away };
}

/** إكمال شجرة كاملة حتى البطل — بعد حسم مباراة اللاعب */
function completeBracket(cup: CupState, round: CupRound, matches: CupMatch[]): { champion: string } {
  let cur = matches;
  let r = round;
  while (r !== "final") {
    const winners = cur.map((m) => (m.winner ?? ((m.homeGoals ?? 0) >= (m.awayGoals ?? 0) ? m.home : m.away)));
    const nextMatches: CupMatch[] = [];
    for (let i = 0; i < winners.length; i += 2) {
      nextMatches.push({ home: winners[i]!, away: winners[i + 1] ?? winners[i]!, homeGoals: null, awayGoals: null });
    }
    r = nextRound(r);
    cur = nextMatches.map((m) => (m.homeGoals === null ? simulateMatch(cup.seed + fnv1a(r), m) : m));
  }
  const winners = cur.map((m) => (m.winner ?? ((m.homeGoals ?? 0) >= (m.awayGoals ?? 0) ? m.home : m.away)));
  return { champion: winners[0] ?? "" };
}

export function finishMatch(cup: CupState, myPkCorrect = 0): CupState {
  const m = currentMatch(cup);
  if (!m) return cup;

  const draw = cup.myGoals === cup.oppGoals;
  let iWin = cup.myGoals > cup.oppGoals;
  let viaPks = false;
  if (draw) {
    viaPks = true;
    const pk = resolvePk(cup, myPkCorrect);
    iWin = pk.won;
  }

  const iAmHome = m.home === cup.myTeamId;
  // النتيجة الحقيقية كما لُعبت — لا قلب ولا max/min
  // (كانت تُقلب عند الخسارة: تخسر 0-2 فتُسجَّل 2-0!)
  const myFinal = cup.myGoals;
  const oppFinal = cup.oppGoals;

  const updated: CupMatch = {
    ...m,
    homeGoals: iAmHome ? myFinal : oppFinal,
    awayGoals: iAmHome ? oppFinal : myFinal,
    viaPenalties: viaPks,
    // winner صريح — ضروري للترجيح (الهدفان متساويان) وأي نتيجة متساوية
    winner: iWin ? cup.myTeamId : iAmHome ? m.away : m.home,
  };

  // حسم مباراة اللاعب + محاكاة باقي مباريات الدور
  const roundMatches = cup.bracket[cup.round].map((mm, i) =>
    i === cup.matchIndex ? updated : mm.homeGoals === null ? simulateMatch(cup.seed, mm) : mm,
  );

  const next: CupState = {
    ...cup,
    bracket: { ...cup.bracket, [cup.round]: roundMatches },
    myGoals: 0,
    oppGoals: 0,
  };

  if (!iWin) {
    // إقصاء اللاعب — أكمل الشجرة حتى البطل وسجل النتيجة
    const { champion } = completeBracket(next, cup.round, roundMatches);
    return { ...next, champion, eliminated: true };
  }

  // اللاعب فاز — إذا كان هذا النهائي فهو البطل
  if (cup.round === "final") {
    return { ...next, champion: cup.myTeamId, eliminated: false };
  }

  // راكم الفائزين وابنِ الدور التالي — winner إن وُجد وإلا الهدف الأكبر
  const matchWinner = (mm: CupMatch): string =>
    mm.winner ?? ((mm.homeGoals ?? 0) >= (mm.awayGoals ?? 0) ? mm.home : mm.away);
  const winners = roundMatches.map(matchWinner);
  const nr = nextRound(cup.round);
  const nextMatches: CupMatch[] = [];
  for (let i = 0; i < winners.length; i += 2) {
    nextMatches.push({ home: winners[i]!, away: winners[i + 1] ?? winners[i]!, homeGoals: null, awayGoals: null });
  }
  // اضبط مؤشر مباراة اللاعب في الدور الجديد
  const myIdx = nextMatches.findIndex((mm) => mm.home === cup.myTeamId || mm.away === cup.myTeamId);
  const safeIdx = myIdx === -1 ? 0 : myIdx;
  const bracket = { ...next.bracket, [nr]: nextMatches };
  // إن لم يجد اللاعب (خطأ داخلي) — أكمل الشجرة
  if (myIdx === -1) {
    const { champion } = completeBracket({ ...next, bracket }, nr, nextMatches);
    return { ...next, bracket, round: nr, matchIndex: 0, champion, eliminated: true };
  }
  // الإصلاح الجوهري: أرفق الشجرة الجديدة — كانت تُبنى ولا تُعاد
  // فتبقى bracket[الدور التالي] فارغة وcurrentMatch تعيد null → شاشة فارغة بعد التأهل!
  return { ...next, bracket, round: nr, matchIndex: safeIdx };
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
 *  سجل البطولات
 * ============================================================ */

export interface CupHistoryEntry {
  at: string;
  champion: string;
  playerWon: boolean;
  goals: number;
  matches: number;
}

const HISTORY_KEY = "tiq:cupHistory";
const HISTORY_MAX = 20;

export function loadCupHistory(): CupHistoryEntry[] {
  const h = readJSON<CupHistoryEntry[]>(HISTORY_KEY, []);
  return Array.isArray(h) ? h : [];
}

/** تسجيل نتيجة بطولة منتهية (لقب أو إقصاء) */
export function recordCupResult(cup: CupState): CupHistoryEntry[] {
  if (!cup.champion) return loadCupHistory();
  const matches = ROUND_NAMES.reduce(
    (n, r) => n + (cup.bracket[r]?.filter((m) => m.homeGoals !== null).length ?? 0),
    0,
  );
  const entry: CupHistoryEntry = {
    at: new Date().toISOString(),
    champion: cup.champion,
    playerWon: cup.champion === cup.myTeamId,
    goals: playerGoalsInCup(cup),
    matches,
  };
  const next = [entry, ...loadCupHistory()].slice(0, HISTORY_MAX);
  writeJSON(HISTORY_KEY, next);
  return next;
}

/** إجمالي أهداف اللاعب في البطولة (مبارياته فقط) */
export function playerGoalsInCup(cup: CupState): number {
  let g = 0;
  for (const round of ROUND_NAMES) {
    for (const m of cup.bracket[round] ?? []) {
      if (m.homeGoals === null) continue;
      if (m.home === cup.myTeamId) g += m.homeGoals ?? 0;
      else if (m.away === cup.myTeamId) g += m.awayGoals ?? 0;
    }
  }
  return g;
}

/** إحصائيات مختصرة للبروفايل */
export function cupSummary(): { cups: number; played: number; bestRun: number } {
  const h = loadCupHistory();
  const cups = h.filter((e) => e.playerWon).length;
  const played = h.reduce((n, e) => n + e.matches, 0);
  const bestRun = h.reduce((best, e) => Math.max(best, e.matches), 0);
  return { cups, played, bestRun };
}
