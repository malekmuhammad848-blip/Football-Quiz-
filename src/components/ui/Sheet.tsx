/** ============================================================
 *  Sheet — نافذة سفلية قابلة لإعادة الاستخدام
 *  ============================================================ */

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Sheet({ open, onClose, title, children, className }: Props) {
  // منع تمرير الخلفية أثناء الفتح
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // إغلاق بمفتاح Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-surface p-5 shadow-2xl sm:p-6",
              className,
            )}
            style={{ paddingBottom: "max(env(safe-area-inset-bottom), 20px)" }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/20" />
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-extrabold">{title}</h3>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-full p-2 transition-colors hover:bg-ink/5 dark:hover:bg-white/10"
                >
                  <X className="size-5" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
