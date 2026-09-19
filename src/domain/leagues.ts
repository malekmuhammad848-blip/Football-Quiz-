/** ============================================================
 *  Leagues — نظام الدوريات (بأسلوب Duolingo/FIFA)
 *  الدوري يُحدَّد من XP التراكمي، وكل دوري له لون إطار أفاتار.
 *  ============================================================ */

export type LeagueId = "bronze" | "silver" | "gold" | "platinum" | "legend";

export interface League {
  id: LeagueId;
  /** أقل XP للانضمام */
  minXp: number;
  ar: string;
  en: string;
  /** تدرج الإطار والألوان */
  ring: string; // كلاس تدرج CSS
  glow: string; // لون التوهج rgba
  accent: string; // لون النص
}

export const LEAGUES: readonly League[] = [
  {
    id: "bronze",
    minXp: 0,
    ar: "دوري البرونز",
    en: "Bronze League",
    ring: "from-amber-700 via-amber-500 to-amber-700",
    glow: "rgba(180,83,9,0.35)",
    accent: "text-amber-500",
  },
  {
    id: "silver",
    minXp: 200,
    ar: "دوري الفضة",
    en: "Silver League",
    ring: "from-slate-400 via-slate-200 to-slate-400",
    glow: "rgba(148,163,184,0.35)",
    accent: "text-slate-300",
  },
  {
    id: "gold",
    minXp: 600,
    ar: "دوري الذهب",
    en: "Gold League",
    ring: "from-yellow-600 via-yellow-300 to-yellow-600",
    glow: "rgba(251,191,36,0.45)",
    accent: "text-yellow-400",
  },
  {
    id: "platinum",
    minXp: 1200,
    ar: "الدوري الممتاز",
    en: "Premier League",
    ring: "from-cyan-400 via-sky-200 to-cyan-400",
    glow: "rgba(103,232,249,0.45)",
    accent: "text-cyan-300",
  },
  {
    id: "legend",
    minXp: 2500,
    ar: "دوري الأساطير",
    en: "Legends League",
    ring: "from-fuchsia-500 via-amber-300 to-fuchsia-500",
    glow: "rgba(232,121,249,0.5)",
    accent: "text-fuchsia-300",
  },
] as const;

/** الدوري الحالي حسب XP */
export function leagueFor(xp: number): League {
  let current = LEAGUES[0]!;
  for (const l of LEAGUES) {
    if (xp >= l.minXp) current = l;
  }
  return current;
}

/** الدوري التالي (إن وجد) */
export function nextLeague(xp: number): League | null {
  return LEAGUES.find((l) => l.minXp > xp) ?? null;
}

/** تقدم الدوري الحالي (0..1) نحو الدوري التالي */
export function leagueProgress(xp: number): number {
  const cur = leagueFor(xp);
  const next = nextLeague(xp);
  if (!next) return 1;
  const span = next.minXp - cur.minXp;
  return Math.min(1, (xp - cur.minXp) / span);
}

/** أسماء الدوريات حسب اللغة */
export function leagueName(l: League, lang: "ar" | "en"): string {
  return lang === "ar" ? l.ar : l.en;
}
