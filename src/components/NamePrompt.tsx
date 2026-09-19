/** ============================================================
 *  NamePrompt — خطوة اختيار اسم اللاعب (بعد أول دخول بحساب)
 *  ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import { t, type Lang } from "../lib/i18n";
import { setDisplayName, displayNameOf, type Session } from "../lib/backend";
import { Button } from "./ui/primitives";

interface Props {
  session: Session;
  lang: Lang;
  onDone: () => void;
}

export function NamePrompt({ session, lang, onDone }: Props) {
  const [name, setName] = useState(displayNameOf(session.user) ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = name.trim();
    if (clean.length < 2) return;
    setBusy(true);
    setError(null);
    try {
      await setDisplayName(session.user, clean);
      onDone();
    } catch {
      setError(t(lang, "unexpectedError"));
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mx-auto w-full max-w-md rounded-3xl p-6 text-center"
    >
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-grass-500 to-grass-700 text-xl font-black text-white shadow-lg">
        {name.trim().slice(0, 1).toUpperCase() || "⚽"}
      </div>
      <h2 className="text-xl font-black">{t(lang, "nameTitle")}</h2>
      <p className="mt-1 text-xs font-medium opacity-60">{t(lang, "nameHint")}</p>

      <form onSubmit={submit} className="mt-5 space-y-3">
        <input
          type="text"
          required
          minLength={2}
          maxLength={24}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t(lang, "namePlaceholder")}
          className="h-12 w-full rounded-2xl border border-line bg-surface/60 px-4 text-center text-base font-bold outline-none transition-colors focus:border-grass-500"
        />
        {error && <p className="text-xs font-bold text-red-500">{error}</p>}
        <Button type="submit" disabled={busy || name.trim().length < 2} className="h-12 w-full">
          {busy ? t(lang, "busy") : t(lang, "startPlaying")}
        </Button>
      </form>
    </motion.div>
  );
}
