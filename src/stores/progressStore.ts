/** ============================================================
 *  Progress Store — متجر تقدم اللاعب
 *  تحميل بالترحيل من الإصدار القديم + حفظ تلقائي + عمليات نقيّة.
 *  ============================================================ */

import { createStore, type Store } from "../core/store";
import { loadVersioned, saveVersioned, purgeLegacy } from "../core/storage";
import { STORE_KEYS } from "../core/config";
import {
  applyAnswer,
  emptyProgress,
  levelFor,
  newlyUnlocked,
  type Achievement,
} from "../domain/progression";
import type { Difficulty, Progress } from "../domain/types";

const DATA_VERSION = 4;

/** ترحيل من بيانات v2 (fq:*) القديمة المبعثرة في localStorage */
function migrateFromLegacy(raw: unknown): Progress {
  if (raw && typeof raw === "object") return emptyProgress(); // بيانات v3 تالفة — نبدأ نظيفين
  try {
    const legacy = (key: string): unknown => {
      const v = localStorage.getItem(key);
      return v === null ? null : JSON.parse(v);
    };
    const streak = Number(legacy("fq:streak") ?? 0);
    const best = Number(legacy("fq:best") ?? 0);
    const correctCount = Number(legacy("fq:correctCount") ?? 0);
    const playedCount = Number(legacy("fq:playedCount") ?? 0);
    const history = (legacy("fq:history") ?? {}) as Record<string, number>;
    // تقدير XP القديم: 15 نقطة لكل إجابة صحيحة
    const p = emptyProgress();
    return withUnlockedPublic({
      ...p,
      streak,
      best,
      correctCount,
      playedCount,
      xp: correctCount * 15,
      history: history,
      lastAnswered: (legacy("fq:lastAnswered") as string | null) ?? null,
      streakShields: 0,
    });
  } catch {
    return emptyProgress();
  }
}

import { withUnlocked } from "../domain/progression";
function withUnlockedPublic(p: Progress): Progress {
  return withUnlocked(p);
}

function load(): Progress {
  const stored = loadVersioned<Progress>(STORE_KEYS.data, DATA_VERSION, {
    2: migrateFromLegacy,
    3: (raw) => {
      // v3 → v4: إضافة categoryRecord فارغ و coins = 0
      const p = (raw ?? {}) as Partial<Progress>;
      return { ...p, categoryRecord: p.categoryRecord ?? {}, coins: 0 };
    },
  });
  if (stored) {
    return withUnlocked({
      ...emptyProgress(),
      ...stored,
      streakShields: stored.streakShields ?? 0,
      coins: (stored as Partial<Progress>).coins ?? 0,
      categoryRecord: stored.categoryRecord ?? {},
    });
  }
  const migrated = migrateFromLegacy(undefined);
  purgeLegacy("fq:");
  return migrated;
}

interface ProgressStore extends Store<Progress> {
  answer(input: {
    dateKey: string;
    questionId: string;
    selected: number;
    correct: boolean;
    difficulty: Difficulty;
    category?: string;
  }): { before: Progress; after: Progress; newUnlocks: Achievement[]; leveledUp: boolean };
  /** إضافة XP مباشر (ترجيح محلي/مكافآت) — يعيد ما إذا كان هناك ترقية */
  addXp(amount: number): { before: Progress; after: Progress; leveledUp: boolean };
  /** إضافة عملات (مهام/ألعاب/بيع مكررات) */
  addCoins(amount: number): { before: Progress; after: Progress; coinsGained: number };
  /** صرف عملات (شراء حزم) — يعيد false إن كان الرصيد غير كافٍ */
  spendCoins(amount: number): boolean;
  /** تتبع إتقان فئة من أوضاع اللعب الجانبية (تدريب/سرعة/ترجيح) */
  trackCategory(category: string, correct: boolean): void;
  hydrate(remote: Partial<Progress>): void;
  export(): Progress;
  reset(): void;
}

function persist(p: Progress) {
  saveVersioned(STORE_KEYS.data, DATA_VERSION, p);
}

export const progressStore: ProgressStore = (() => {
  const base = createStore<Progress>(load());

  const store: ProgressStore = {
    getState: base.getState,
    subscribe: base.subscribe,
    update: base.update,
    replace(next) {
      base.replace(next);
      persist(next);
    },
    answer(input) {
      const before = base.getState();
      const after = applyAnswer(before, input);
      base.replace(after);
      persist(after);
      const leveledUp = levelFor(after.xp).index > levelFor(before.xp).index;
      return {
        before,
        after,
        newUnlocks: newlyUnlocked(before, after)
          .map((id) => ACHIEVEMENTS_BY_ID[id])
          .filter(Boolean),
        leveledUp,
      };
    },
    trackCategory(category, correct) {
      const cur = base.getState();
      const cr = cur.categoryRecord[category] ?? { a: 0, c: 0 };
      const after: Progress = {
        ...cur,
        categoryRecord: {
          ...cur.categoryRecord,
          [category]: { a: cr.a + 1, c: cr.c + (correct ? 1 : 0) },
        },
      };
      base.replace(after);
      persist(after);
    },
    addXp(amount) {
      if (amount <= 0) return { before: base.getState(), after: base.getState(), leveledUp: false };
      const before = base.getState();
      const after = withUnlocked({ ...before, xp: before.xp + amount });
      base.replace(after);
      persist(after);
      const leveledUp = levelFor(after.xp).index > levelFor(before.xp).index;
      return { before, after, leveledUp };
    },
    addCoins(amount) {
      if (amount <= 0) return { before: base.getState(), after: base.getState(), coinsGained: 0 };
      const before = base.getState();
      const after = withUnlocked({ ...before, coins: before.coins + amount });
      base.replace(after);
      persist(after);
      return { before, after, coinsGained: amount };
    },
    spendCoins(amount) {
      const cur = base.getState();
      if (amount <= 0 || cur.coins < amount) return false;
      const after = withUnlocked({ ...cur, coins: cur.coins - amount });
      base.replace(after);
      persist(after);
      return true;
    },
    hydrate(remote) {
      // دمج: الأعلى يفوز في الأرقام، ويُحفظ التاريخ الأغنى
      const local = base.getState();
      const merged: Progress = {
        ...local,
        streak: Math.max(local.streak, remote.streak ?? 0),
        best: Math.max(local.best, remote.best ?? 0),
        correctCount: Math.max(local.correctCount, remote.correctCount ?? 0),
        playedCount: Math.max(local.playedCount, remote.playedCount ?? 0),
        xp: Math.max(local.xp, remote.xp ?? 0),
        coins: Math.max(local.coins ?? 0, (remote as { coins?: number }).coins ?? 0),
        unlocked: [...new Set([...local.unlocked, ...(remote.unlocked ?? [])])],
        history: { ...remote.history, ...local.history },
        streakShields: Math.max(local.streakShields ?? 0, (remote as { streakShields?: number }).streakShields ?? 0),
        categoryRecord: mergeCategoryRecords(local.categoryRecord, (remote as { categoryRecord?: Progress["categoryRecord"] }).categoryRecord),
      };
      this.replace(withUnlocked(merged));
    },
    export: () => ({ ...base.getState() }),
    reset() {
      this.replace(withUnlocked(emptyProgress()));
    },
  };
  return store;
})();

/** خريطة الإنجازات بالمعرف */
import { ACHIEVEMENTS } from "../domain/progression";
export const ACHIEVEMENTS_BY_ID: Record<string, Achievement> = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a]),
);

/** دمج سجلي الفئات (محلي + سحابي): نجمع الإجابات والصحيحة */
function mergeCategoryRecords(
  local: Progress["categoryRecord"],
  remote: Progress["categoryRecord"] | undefined,
): Progress["categoryRecord"] {
  if (!remote) return local ?? {};
  const merged: Progress["categoryRecord"] = { ...(local ?? {}) };
  for (const [cat, r] of Object.entries(remote)) {
    const l = merged[cat] ?? { a: 0, c: 0 };
    merged[cat] = { a: Math.max(l.a, r.a), c: Math.max(l.c, r.c) };
  }
  return merged;
}
