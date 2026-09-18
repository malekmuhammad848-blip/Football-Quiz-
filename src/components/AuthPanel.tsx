import { useState } from "react";
import { LogIn, LogOut, Mail, UserPlus } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { auth } from "../lib/backend";
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
        setNotice("تم إنشاء الحساب! تحقق من بريدك إذا كان التفعيل مطلوبًا، ثم سجّل الدخول.");
      } else {
        const { error } = await auth.signIn(email.trim(), password);
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setBusy(false);
    }
  };

  if (session) {
    const name =
      (session.user.user_metadata?.display_name as string | undefined) ??
      session.user.email?.split("@")[0] ??
      "لاعب";
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface p-4 shadow-sm border border-grass-600/10">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-grass-600 text-lg font-black text-white">
            {name.slice(0, 1).toUpperCase()}
          </span>
          <div className="leading-tight">
            <p className="font-bold">{name}</p>
            <p className="text-xs opacity-60">مرحبًا بك مجددًا ⚽</p>
          </div>
        </div>
        <button
          onClick={() => void auth.signOut()}
          className="flex items-center gap-1.5 rounded-xl border border-ink/10 px-3 py-2 text-sm font-bold hover:bg-ink/5"
        >
          <LogOut className="size-4" />
          خروج
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface p-5 shadow-sm border border-grass-600/10">
      <div className="mb-4 flex rounded-xl bg-ink/5 p-1 text-sm font-bold">
        {(["signin", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 rounded-lg py-2 transition-colors",
              mode === m ? "bg-surface shadow text-grass-700 dark:text-grass-500" : "opacity-60",
            )}
          >
            {m === "signin" ? "تسجيل الدخول" : "حساب جديد"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm font-bold opacity-70">البريد الإلكتروني</span>
          <div className="flex items-center gap-2 rounded-xl border border-ink/10 px-3 py-2.5 focus-within:border-grass-500">
            <Mail className="size-4 opacity-50" />
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
          <span className="mb-1 block text-sm font-bold opacity-70">كلمة المرور</span>
          <div className="flex items-center gap-2 rounded-xl border border-ink/10 px-3 py-2.5 focus-within:border-grass-500">
            <LogIn className="size-4 opacity-50" />
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

        {error && <p className="text-sm font-bold text-red-500">{error}</p>}
        {notice && <p className="text-sm font-bold text-grass-600 dark:text-grass-500">{notice}</p>}

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-grass-600 py-3 font-black text-white transition-colors hover:bg-grass-700 disabled:opacity-50"
        >
          <UserPlus className="size-4" />
          {busy ? "جارٍ..." : mode === "signin" ? "دخول" : "إنشاء الحساب"}
        </button>
      </form>
    </div>
  );
}
