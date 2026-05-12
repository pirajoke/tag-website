"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-full overflow-x-clip bg-ivory">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0.18, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.18, y: -8 }}
          transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={`${pathname}-smoke`}
        aria-hidden="true"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(245,240,232,0.86) 0%, rgba(245,240,232,0.58) 38%, rgba(42,33,24,0.16) 74%, rgba(42,33,24,0) 100%)",
        }}
      />
    </div>
  );
}
