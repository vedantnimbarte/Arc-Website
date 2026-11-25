"use client";

import { MotionConfig, motion } from "framer-motion";
import { EASE } from "@/components/Section";

/**
 * Re-mounts on every route change, so each page comes into focus the same
 * way the sections do. `reducedMotion="user"` drops movement for visitors
 * who asked for less, everywhere below this point.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
