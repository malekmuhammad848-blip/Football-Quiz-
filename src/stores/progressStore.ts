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

const DATA_VERSION = 3;

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
  });
  if (stored) return withUnlocked(stored);
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
  }): { before: Progress; after: Progress; newUnlocks: Achievement[]; leveledUp: boolean };
  /** إضافة XP مباشر (ترجيح محلي/مكافآت) — يعيد ما إذا كان هناك ترقية */
  addXp(amount: number): { before: Progress; after: Progress; leveledUp: boolean };
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
    addXp(amount) {
      if (amount <= 0) return { before: base.getState(), after: base.getState(), leveledUp: false };
      const before = base.getState();
      const after = withUnlocked({ ...before, xp: before.xp + amount });
      base.replace(after);
      persist(after);
      const leveledUp = levelFor(after.xp).index > levelFor(before.xp).index;
      return { before, after, leveledUp };
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
        unlocked: [...new Set([...local.unlocked, ...(remote.unlocked ?? [])])],
        history: { ...remote.history, ...local.history },
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
