"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, blurIn } from "@/components/Section";
import { Mark } from "@/components/Navigation";

const HEADLINE = "EDIT. RUN. COMMIT.";
const TYPE_GAP = 0.055; // seconds per character
const TYPED = HEADLINE.length * TYPE_GAP;

/**
 * The four things wired into ARC, branching out of one window. Geometry is
 * in a 1000×280 box; the SVG stretches to fit and the labels are HTML,
 * placed by percentage, so they stay crisp and readable at any width.
 */
const BRANCHES = [
  { name: "Editor", d: "M452 120 C 410 120, 400 70, 350 70 L 40 70", end: [40, 70], label: [220, 70] },
  { name: "Terminal", d: "M452 160 C 410 160, 400 210, 350 210 L 120 210", end: [120, 210], label: [250, 210] },
  { name: "Git", d: "M548 120 C 590 120, 600 70, 650 70 L 960 70", end: [960, 70], label: [790, 70] },
  { name: "SSH", d: "M548 160 C 590 160, 600 210, 650 210 L 880 210", end: [880, 210], label: [760, 210] },
];

const at = ([x, y]: number[]) => ({ left: `${x / 10}%`, top: `${(y / 280) * 100}%` });

export default function OneWorkspace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const state = inView ? "shown" : "hidden";

  return (
    <section className="px-3 sm:px-5">
      <div
        ref={ref}
        className="surface mx-auto max-w-[1400px] overflow-hidden !rounded-stage px-5 py-16 sm:px-10 sm:py-24"
      >
        {/* typed out, one character at a time, with ARC's block caret */}
        <h2
          aria-label="Edit. Run. Commit."
          className="text-center font-mono text-[clamp(1.05rem,4.4vw,3.25rem)] font-bold tracking-[0.12em]"
        >
          <motion.span
            aria-hidden
            initial="hidden"
            animate={state}
            variants={{ shown: { transition: { staggerChildren: TYPE_GAP } } }}
          >
            {HEADLINE.split("").map((ch, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.01 } } }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.span>
          <span
            aria-hidden
            className="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.12em] animate-caret bg-ink"
          />
        </h2>

        {/* the diagram */}
        <div className="relative mx-auto mt-12 h-[190px] max-w-[1000px] sm:mt-16 sm:h-[260px]">
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 280"
            preserveAspectRatio="none"
            fill="none"
          >
            {BRANCHES.map((b, i) => (
              <motion.path
                key={b.name}
                d={b.d}
                stroke="rgba(13,15,16,0.22)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: TYPED + 0.25 + i * 0.12 }}
              />
            ))}
          </svg>

          {BRANCHES.map((b, i) => {
            const delay = TYPED + 0.25 + i * 0.12;
            return (
              <div key={b.name}>
                {/* plain wrappers centre on the point; motion owns the inner transform */}
                <span aria-hidden className="absolute -translate-x-1/2 -translate-y-1/2" style={at(b.end)}>
                  <motion.span
                    className="block h-[7px] w-[7px] rounded-full bg-ink"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, ease: EASE, delay: delay + 0.95 }}
                  />
                </span>
                <span className="absolute -translate-x-1/2 -translate-y-1/2" style={at(b.label)}>
                  <motion.span
                    className="block whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-[12px] text-fg-muted shadow-[0_0_0_1px_rgba(13,15,16,0.1)]"
                    variants={blurIn}
                    initial="hidden"
                    animate={state}
                    custom={delay + 0.55}
                  >
                    {b.name}
                  </motion.span>
                </span>
              </div>
            );
          })}

          {/* the window everything plugs into */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="grid h-[76px] w-[76px] place-items-center rounded-[22px] bg-gradient-to-b from-white to-[#eef1f1] shadow-[0_0_0_1px_rgba(13,15,16,0.08),0_18px_36px_-16px_rgba(13,15,16,0.35)] sm:h-[96px] sm:w-[96px] sm:rounded-[26px]"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink sm:h-12 sm:w-12">
                <Mark size={24} tone="#fff" />
              </span>
            </motion.div>
          </div>
        </div>

        <motion.p
          className="mx-auto mt-12 max-w-[44ch] text-center text-[15px] leading-relaxed text-fg-muted sm:mt-14"
          variants={blurIn}
          initial="hidden"
          animate={state}
          custom={TYPED + 1.5}
        >
          The editor, a real PTY and source control share one workspace, so the
          file you save is the file your shell runs and the diff shows.
        </motion.p>
      </div>
    </section>
  );
}
