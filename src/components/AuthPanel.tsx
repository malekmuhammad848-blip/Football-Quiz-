/** ============================================================
 *  AuthPanel — تسجيل الدخول / حساب جديد / حالة المستخدم
 *  ============================================================ */

import { useState } from "react";
import { CloudUpload, LogIn, LogOut, Mail, UserPlus } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { authService } from "../lib/backend";
import { prefsStore } from "../stores/prefsStore";
import { t, type Lang } from "../lib/i18n";
import { cn } from "../utils/cn";
import { Button } from "./ui/primitives";

interface Props {
  session: Session | null;
  lang: Lang;
}

type Mode = "signin" | "signup";

export function AuthPanel({ session, lang }: Props) {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        const { error } = await authService.signUp(email.trim(), password);
        if (error) throw error;
        setNotice(t(lang, "accountCreated"));
      } else {
        const { error } = await authService.signIn(email.trim(), password);
        if (error) throw error;
      }
      // نجاح الدخول يلغي وضع الضيف
      prefsStore.setGuest(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : t(lang, "unexpectedError"));
    } finally {
      setBusy(false);
    }
  };

  if (session) {
    const name =
      (session.user.user_metadata?.display_name as string | undefined) ??
      session.user.email?.split("@")[0] ??
      "Player";
    return (
      <div className="glass-card flex items-center justify-between gap-3 rounded-2xl p-3.5 sm:p-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-grass-500 to-grass-700 text-base font-black text-white sm:size-10">
            {name.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold sm:text-base">{name}</p>
            <p className="flex items-center gap-1 text-[11px] font-bold text-grass-600 opacity-80 dark:text-grass-400">
              <CloudUpload className="size-3" />
              {t(lang, "cloudSynced")}
            </p>
          </div>
        </div>
        <button
          onClick={() => void authService.signOut()}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-bold transition-colors hover:bg-ink/5 dark:hover:bg-white/5"
        >
          <LogOut className="size-3.5" />
          {t(lang, "logout")}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="mb-4 flex rounded-2xl bg-ink/5 p-1 text-xs font-bold sm:text-sm dark:bg-white/10">
        {(["signin", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 rounded-xl py-2 transition-colors",
              mode === m ? "bg-surface text-grass-700 shadow-sm dark:text-grass-400" : "opacity-60",
            )}
          >
            {m === "signin" ? t(lang, "signIn") : t(lang, "signUp")}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-bold opacity-70">{t(lang, "email")}</span>
          <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 transition-colors focus-within:border-grass-500">
            <Mail className="size-4 shrink-0 opacity-50" />
            <input
              type="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold opacity-70">{t(lang, "password")}</span>
          <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 transition-colors focus-within:border-grass-500">
            <LogIn className="size-4 shrink-0 opacity-50" />
            <input
              type="password"
              required
              minLength={6}
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </label>

        {error && <p className="text-xs font-bold text-red-500">{error}</p>}
        {notice && <p className="text-xs font-bold text-grass-600 dark:text-grass-400">{notice}</p>}

        <Button type="submit" disabled={busy} className="w-full">
          <UserPlus className="size-4" />
          {busy ? t(lang, "busy") : mode === "signin" ? t(lang, "login") : t(lang, "createAccount")}
        </Button>
      </form>
    </div>
  );
}
