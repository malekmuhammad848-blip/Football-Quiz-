/** ============================================================
 *  SplashScreen — شاشة إقلاع قصيرة
 *  تظهر فقط لحظة قراءة الجلسة المحفوظة (ملّي ثوانٍ) لمنع وميض
 *  شاشة الترحيب ثم القفز للتطبيق — الإحساس هو سرعة الإقلاع.
 *  ============================================================ */

import { motion } from "framer-motion";
import { APP } from "../core/config";

export function SplashScreen() {
  return (
    <div className="pitch-lines flex min-h-dvh flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.img
          src="/icon.png"
          alt={APP.name}
          className="size-20 rounded-3xl shadow-2xl shadow-grass-700/30"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <h1 className="mt-5 bg-gradient-to-l from-grass-600 to-gold bg-clip-text text-4xl font-black tracking-tight text-transparent dark:from-grass-400 dark:to-gold">
          {APP.name}
        </h1>
        {/* شريط تحميل رفيع */}
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
          <motion.div
            className="h-full w-1/2 rounded-full bg-gradient-to-l from-grass-500 to-gold"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
