"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/** The page's one easing: quick out of the gate, long settle. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Out of focus, into focus: the reference's signature move. Content starts
 * blurred and a few pixels low, then sharpens into place. Blur and opacity
 * still run under reduced motion (MotionConfig drops only the movement).
 */
export const blurIn: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
  // `delay` (seconds) comes in through `custom`. Left unset, a parent's
  // staggerChildren supplies it — setting 0 here would override the stagger.
  shown: (delay?: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, ...(delay ? { delay } : {}) },
    transitionEnd: { filter: "none" },
  }),
};

/** Fades its children into focus the first time they come into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={blurIn}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      custom={delay / 1000}
    >
      {children}
    </motion.div>
  );
}

/** A grid or list whose children come into focus one after another. */
export function Stagger({
  children,
  className = "",
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ shown: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={blurIn}>
      {children}
    </motion.div>
  );
}

/**
 * Every section opens the same way: a two-line headline whose second line
 * steps back in grey, and an optional aside on the right.
 */
export function Section({
  title,
  sub,
  aside,
  children,
  className = "",
  wide = false,
}: {
  title: ReactNode;
  sub?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section className={`py-section ${className}`}>
      <div className={`mx-auto px-5 sm:px-6 lg:px-10 ${wide ? "max-w-frame" : "max-w-content"}`}>
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="display max-w-[20ch] text-display">
              {title}
              {sub && (
                <>
                  <br />
                  <span className="text-fg-subtle">{sub}</span>
                </>
              )}
            </h2>
            {aside && <p className="max-w-[34ch] text-[15px] leading-relaxed text-fg-muted">{aside}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
