/** ============================================================
 *  Prefs Store — تفضيلات المستخدم (ثيم/صوت/لغة/تذكير/اهتزاز)
 *  تحفظ في مفتاح واحد وتطبق آثارها الجانبية فورًا.
 *  ============================================================ */

import { createStore, type Store } from "../core/store";
import { readJSON, writeJSON } from "../core/storage";
import { STORE_KEYS } from "../core/config";
import type { Lang, Prefs, Theme } from "../domain/types";

const DEFAULTS: Prefs = {
  theme: "system",
  sound: true,
  lang: "ar",
  reminder: true,
  haptics: true,
  guest: false,
};

function load(): Prefs {
  return { ...DEFAULTS, ...readJSON<Partial<Prefs>>(STORE_KEYS.prefs, {}) };
}

/** تطبيق اللغة والاتجاه على المستند */
function applyLangSideEffect(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

interface PrefsStore extends Store<Prefs> {
  setTheme(theme: Theme): void;
  setSound(on: boolean): void;
  setLang(lang: Lang): void;
  setReminder(on: boolean): void;
  setHaptics(on: boolean): void;
  setGuest(guest: boolean): void;
  isDark(): boolean;
  toggleDark(): void;
}

export const prefsStore: PrefsStore = (() => {
  const initial = load();
  const base = createStore<Prefs>(initial);

  function persist(p: Prefs) {
    writeJSON(STORE_KEYS.prefs, p);
  }

  const store: PrefsStore = {
    getState: base.getState,
    subscribe: base.subscribe,
    update: base.update,
    replace(next) {
      base.replace(next);
      persist(next);
      applyLangSideEffect(next.lang);
    },
    setTheme(theme) {
      this.replace({ ...base.getState(), theme });
    },
    setSound(sound) {
      this.replace({ ...base.getState(), sound });
    },
    setLang(lang) {
      this.replace({ ...base.getState(), lang });
    },
    setReminder(reminder) {
      this.replace({ ...base.getState(), reminder });
    },
    setHaptics(haptics) {
      this.replace({ ...base.getState(), haptics });
    },
    setGuest(guest) {
      this.replace({ ...base.getState(), guest });
    },
    isDark() {
      const { theme } = base.getState();
      return (
        theme === "dark" ||
        (theme === "system" &&
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    },
    toggleDark() {
      const dark = this.isDark();
      this.setTheme(dark ? "light" : "dark");
    },
  };

  applyLangSideEffect(initial.lang);
  return store;
})();
