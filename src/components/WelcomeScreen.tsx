/** ============================================================
 *  WelcomeScreen — شاشة الترحيب/تسجيل الدخول (ثيم داكن فاخر)
 *  شعار متحرك + Google رسمي + ضيف + بريد + شروط الاستخدام.
 *  ============================================================ */

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { APP } from "../core/config";
import { t, type Lang } from "../lib/i18n";
import { supabaseConfigured } from "../lib/supabase";
import { prefsStore } from "../stores/prefsStore";
import { signInWithGoogle, authService } from "../lib/backend";
import { sfx } from "../lib/feedback";
import { cn } from "../utils/cn";
import { Sheet } from "./ui/Sheet";
import { Button } from "./ui/primitives";

/** شعار Google الرسمي بأربع ألوان */
export function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 01-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0012 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 014.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 000 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.97 11.97 0 0012 0 11.99 11.99 0 001.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

/** كرة نابضة بمدار ذهبي — لمحة الهوية */
function PulseBall() {
  return (
    <div className="relative flex size-28 items-center justify-center">
      {/* حلقة مدارية */}
      <motion.div
        className="absolute inset-0 rounded-full border border-gold/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_2px_rgba(251,191,36,0.6)]" />
      </motion.div>
      <motion.div
        className="absolute inset-2 rounded-full border border-grass-500/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-grass-400 shadow-[0_0_10px_2px_rgba(16,185,129,0.5)]" />
      </motion.div>
      {/* الكرة */}
      <motion.img
        src="/icon.png"
        alt={APP.name}
        className="size-20 rounded-3xl shadow-2xl shadow-grass-700/40"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

interface Props {
  lang: Lang;
  onDone: () => void;
}

export function WelcomeScreen({ lang, onDone }: Props) {
  const [termsOpen, setTermsOpen] = useState(false);
  const [busy, setBusy] = useState<"google" | "email" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const rtl = lang === "ar";
  const Chevron = rtl ? ChevronLeft : ChevronRight;

  const playTap = () => sfx.tap();

  const handleGoogle = async () => {
    playTap();
    if (!supabaseConfigured) {
      setError(t(lang, "authNotReady"));
      return;
    }
    setBusy("google");
    setError(null);
    const res = await signInWithGoogle();
    if (res.error) setError(res.error);
    // الويب: سيعاد التوجيه؛ الأصلي: تعود الجلسة عبر deep-link ويلتقطها App
    setBusy(null);
  };

  const handleGuest = () => {
    playTap();
    prefsStore.setGuest(true);
    onDone();
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseConfigured) {
      setError(t(lang, "authNotReady"));
      return;
    }
    setBusy("email");
    setError(null);
    try {
      const { error } = await authService.signIn(email.trim(), password);
      if (error) throw error;
      // نجاح الويب: onAuthStateChange سيلتقطها. الأصلي: session arrives via listener
    } catch (err) {
      setError(err instanceof Error ? err.message : t(lang, "unexpectedError"));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-[#070d09] text-white">
      {/* توهجات الخلفية */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-grass-500/20 blur-[110px]" />
        <div className="absolute bottom-0 right-[-15%] h-80 w-80 rounded-full bg-gold/10 blur-[100px]" />
        <div className="absolute inset-0 pitch-lines opacity-40" />
        {/* خطوط ملعب خفيفة */}
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
      </div>

      {/* المحتوى */}
      <div
        className="relative z-10 flex w-full max-w-md flex-1 flex-col items-center px-6 text-center"
        style={{ paddingTop: "max(env(safe-area-inset-top), 48px)", paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
      >
        {/* الشعار */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <PulseBall />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-black tracking-tight text-transparent"
        >
          {APP.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-2.5 max-w-xs text-sm leading-6 font-medium text-white/60"
        >
          {t(lang, "taglineHero")}
        </motion.p>

        {/* الأزرار */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-auto w-full space-y-3 pt-10"
        >
          {/* Google */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => void handleGoogle()}
            disabled={busy !== null}
            className={cn(
              "flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white text-[15px] font-bold text-[#1f2937] shadow-xl shadow-black/30",
              "transition-all hover:bg-white/95 active:brightness-95",
              busy === "google" && "opacity-70",
            )}
          >
            <GoogleLogo className="size-5" />
            {busy === "google" ? t(lang, "busy") : t(lang, "continueGoogle")}
          </motion.button>

          {/* بريد إلكتروني (قابل للطي) */}
          {showEmail ? (
            <form onSubmit={handleEmail} className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
              <input
                type="email"
                required
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-grass-400"
              />
              <input
                type="password"
                required
                minLength={6}
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-grass-400"
              />
              <button
                type="submit"
                disabled={busy !== null}
                className="h-11 w-full rounded-xl bg-gradient-to-l from-grass-600 to-grass-500 text-sm font-black text-white shadow-lg transition-all hover:brightness-110 disabled:opacity-50"
              >
                {busy === "email" ? t(lang, "busy") : t(lang, "login")}
              </button>
            </form>
          ) : (
            <button
              onClick={() => {
                playTap();
                setShowEmail(true);
              }}
              className="flex h-11 w-full items-center justify-center gap-2 text-sm font-bold text-white/55 transition-colors hover:text-white/85"
            >
              <Mail className="size-4" />
              {t(lang, "orEmail")}
            </button>
          )}

          {/* ضيف */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGuest}
            className="group flex w-full flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className="flex items-center gap-1.5 text-sm font-black text-white/85">
              {t(lang, "guest")}
              <Chevron className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </span>
            <span className="text-[11px] leading-4 font-medium text-white/40">{t(lang, "guestNote")}</span>
          </motion.button>

          {error && <p className="text-xs font-bold text-red-400">{error}</p>}

          {/* الشروط */}
          <p className="pt-2 text-[11px] leading-5 text-white/35">
            {t(lang, "termsIntro")}{" "}
            <button onClick={() => setTermsOpen(true)} className="font-bold text-white/60 underline decoration-white/30 underline-offset-2 hover:text-white">
              {t(lang, "terms")}
            </button>{" "}
            {t(lang, "and")}{" "}
            <button onClick={() => setTermsOpen(true)} className="font-bold text-white/60 underline decoration-white/30 underline-offset-2 hover:text-white">
              {t(lang, "privacy")}
            </button>
          </p>
        </motion.div>
      </div>

      {/* نافذة الشروط */}
      <Sheet open={termsOpen} onClose={() => setTermsOpen(false)} title={t(lang, "termsTitle")}>
        <p className="whitespace-pre-line text-sm leading-7 text-white/70" dir={rtl ? "rtl" : "ltr"}>
          {t(lang, "termsBody")}
        </p>
        <Button onClick={() => setTermsOpen(false)} className="mt-5 w-full">
          {t(lang, "close")}
        </Button>
      </Sheet>
    </div>
  );
}
