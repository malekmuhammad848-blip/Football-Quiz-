import { useState } from "react";
import { LogIn, LogOut, Mail, UserPlus } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { auth } from "../lib/backend";
import { t } from "../lib/i18n";
import { cn } from "../utils/cn";

interface Props {
  session: Session | null;
}

type Mode = "signin" | "signup";

export function AuthPanel({ session }: Props) {
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
        const { error } = await auth.signUp(email.trim(), password);
        if (error) throw error;
        setNotice(t("accountCreated"));
      } else {
        const { error } = await auth.signIn(email.trim(), password);
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("unexpectedError"));
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
      <div className="glass-card flex items-center justify-between gap-3 rounded-2xl p-3.5 shadow-sm sm:p-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-grass-500 to-grass-700 text-base font-black text-white sm:size-10 sm:text-lg">
            {name.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold sm:text-base">{name}</p>
            <p className="text-[11px] opacity-60 sm:text-xs">{t("welcomeBack")}</p>
          </div>
        </div>
        <button
          onClick={() => void auth.signOut()}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-bold hover:bg-ink/5 sm:text-sm"
        >
          <LogOut className="size-3.5" />
          {t("logout")}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex rounded-xl bg-ink/5 p-1 text-xs font-bold sm:text-sm">
        {(["signin", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 rounded-lg py-2 transition-colors",
              mode === m ? "bg-surface text-grass-700 shadow dark:text-grass-400" : "opacity-60",
            )}
          >
            {m === "signin" ? t("signIn") : t("signUp")}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-bold opacity-70 sm:text-sm">{t("email")}</span>
          <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 focus-within:border-grass-500">
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
          <span className="mb-1 block text-xs font-bold opacity-70 sm:text-sm">{t("password")}</span>
          <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 focus-within:border-grass-500">
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

        {error && <p className="text-xs font-bold text-red-500 sm:text-sm">{error}</p>}
        {notice && <p className="text-xs font-bold text-grass-600 sm:text-sm dark:text-grass-400">{notice}</p>}

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-grass-600 py-3 text-sm font-black text-white transition-colors hover:bg-grass-700 disabled:opacity-50 sm:text-base"
        >
          <UserPlus className="size-4" />
          {busy ? t("busy") : mode === "signin" ? t("login") : t("createAccount")}
        </button>
      </form>
    </div>
  );
}
