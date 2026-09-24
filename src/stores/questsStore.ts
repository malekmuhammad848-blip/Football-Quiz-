/** ============================================================
 *  Quests Store — متجر المهام اليومية
 *  تحميل محلي + ترحيل يومي + دوال تتبع (track*) تستدعى من الأحداث.
 *  ============================================================ */

import { createStore, type Store } from "../core/store";
import { readJSON, writeJSON } from "../core/storage";
import { STORE_KEYS } from "../core/config";
import { ALL_BONUS_XP, QUEST_DEFS, allComplete, emptyQuests, rollover, type QuestId, type QuestState } from "../domain/quests";
import { COINS } from "../domain/coinEconomy";
import { progressStore } from "./progressStore";

interface QuestsStore extends Store<QuestState> {
  /** تتبع تقدم مهمة (يُهمل إن اكتملت) */
  track(id: QuestId, amount?: number): void;
  /** المطالبة بمكافأة مهمة — يعيد XP الممنوح (0 إذا طُلبت سابقًا) */
  claim(id: QuestId): number;
  /** مطالبة بونص إكمال الكل — يعيد XP (0 إذا طُلب سابقًا) */
  claimAllBonus(): number;
}

function load(): QuestState {
  const stored = readJSON<Partial<QuestState>>(STORE_KEYS.quests, {});
  return rollover({ ...emptyQuests(), ...stored, progress: { ...emptyQuests().progress, ...stored.progress } });
}

function persist(q: QuestState) {
  writeJSON(STORE_KEYS.quests, q);
}

export const questsStore: QuestsStore = (() => {
  const base = createStore<QuestState>(load());

  const store: QuestsStore = {
    getState: base.getState,
    subscribe: base.subscribe,
    update: base.update,
    replace(next) {
      base.replace(next);
      persist(next);
    },
    track(id, amount = 1) {
      const cur = rollover(base.getState());
      if (cur.claimed.includes(id)) return;
      const def = QUEST_DEFS.find((d) => d.id === id);
      if (!def) return;
      const value = cur.progress[id] ?? 0;
      if (value >= def.target) return;
      this.replace({ ...cur, progress: { ...cur.progress, [id]: value + amount } });
    },
    claim(id) {
      const cur = rollover(base.getState());
      if (cur.claimed.includes(id)) return 0;
      const def = QUEST_DEFS.find((d) => d.id === id);
      if (!def || (cur.progress[id] ?? 0) < def.target) return 0;
      this.replace({ ...cur, claimed: [...cur.claimed, id] });
      progressStore.addXp(def.rewardXp);
      // مكافأة عملات المهمة
      const questCoins = COINS.quest[id];
      if (questCoins) progressStore.addCoins(questCoins);
      return def.rewardXp;
    },
    claimAllBonus() {
      const cur = rollover(base.getState());
      if (cur.claimed.includes("streakGuard")) return 0;
      if (!allComplete(cur)) return 0;
      this.replace({ ...cur, claimed: [...cur.claimed, "streakGuard"] });
      progressStore.addXp(ALL_BONUS_XP);
      progressStore.addCoins(COINS.quest.allBonus);
      return ALL_BONUS_XP;
    },
  };
  return store;
})();

/** إعادة تصدير لنوع الزر في الواجهة */
export type { QuestId, QuestState };
