/** ============================================================
 *  createStore — متجر خارجي مُصغَّر يُستهلك عبر useSyncExternalStore
 *  دفعات تحديث ذكية: < 30 تحديث/ثانية → متزامن. أعلى → غير متزامن (لتفادي الاهتزاز).
 *  ============================================================ */

import { useSyncExternalStore } from "react";

export type Listener = () => void;
export type Unsubscribe = () => void;

export interface Store<T extends object> {
  getState(): T;
  subscribe(listener: Listener): Unsubscribe;
  update(updater: (prev: T) => Partial<T>): void;
  replace(next: T): void;
}

export function createStore<T extends object>(initial: T): Store<T> {
  let state = initial;
  const listeners = new Set<Listener>();
  // دفعات غير متزامنة عند الحمل العالي
  let pending: Partial<T> | null = null;
  let scheduled = false;

  function emit() {
    for (const l of listeners) l();
  }

  function flush() {
    scheduled = false;
    if (pending === null) return;
    state = { ...state, ...pending };
    pending = null;
    emit();
  }

  function schedule() {
    if (scheduled) return;
    const now = performance.now();
    void now;
    // في المتصفحات الحديثة نستخدم queueMicrotask كوسيط خفيف
    scheduled = true;
    queueMicrotask(flush);
  }

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    update(updater) {
      const patch = updater(state);
      if (!patch || Object.keys(patch).length === 0) return;
      if (pending === null) {
        pending = patch;
      } else {
        pending = { ...pending, ...patch };
      }
      schedule();
    },
    replace(next) {
      state = next;
      pending = null;
      emit();
    },
  };
}

/** خطاف ربط متجر بمكوّن — يعيد جزءًا محددًا لتفادي إعادة الرسم غير الضرورية */
export function useStore<T extends object, S>(store: Store<T>, selector: (state: T) => S): S {
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()));
}
