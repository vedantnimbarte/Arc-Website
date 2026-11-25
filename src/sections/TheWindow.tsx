"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, Reveal } from "@/components/Section";
import { AssembledWindow } from "@/components/workspace/Panels";

/** The four regions of the window, in the order they sit on screen. */
const REGIONS = [
  {
    id: "tree",
    name: "File tree",
    body: "Git status decorations on every row, so you can see what changed without leaving the tree.",
    // left / top / width / height as % of the window, for the highlight box
    box: [0, 0, 22, 100],
  },
  {
    id: "editor",
    name: "Editor",
    body: "CodeMirror 6 with LSP diagnostics, hover and rename. Format-on-save if the server offers it.",
    box: [22, 0, 52, 62],
  },
  {
    id: "terminal",
    name: "Terminal",
    body: "A real PTY, not an emulated one. Your shell, your profile, your scrollback.",
    box: [22, 62, 52, 38],
  },
  {
    id: "source",
    name: "Source control",
    body: "Stage hunks, sign commits, push. A rejected push offers force-with-lease rather than failing.",
    box: [74, 0, 26, 100],
  },
] as const;

export default function TheWindow() {
  const [active, setActive] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  /* The window lies back slightly and stands up as it scrolls into place. */
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "start 0.25"] });
  const tilt = useTransform(scrollYProgress, [0, 1], [10, 0]);

  const region = REGIONS.find((r) => r.id === active);

  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="on-dark mx-auto max-w-[1400px] overflow-hidden rounded-stage bg-ink px-5 pt-14 sm:px-10 sm:pt-20 lg:px-16">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="display max-w-[18ch] text-display lg:max-w-[24ch]">
              This is the whole application.
              <br />
              <span className="text-fg-subtle">No second window.</span>
            </h2>
            <p className="max-w-[36ch] text-[15px] leading-relaxed text-fg-muted lg:pt-2">
              No separate git app, no database client on the side. Point at a
              region of the window to see what it does.
            </p>
          </div>
        </Reveal>

        <motion.div
          ref={frameRef}
          className="mt-12 [perspective:2200px] sm:mt-16"
          initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <motion.div className="window-frame !shadow-none" style={{ rotateX: tilt, transformOrigin: "50% 100%" }}>
            {/* Below ~760px the three columns stop being legible, so the
                window scrolls sideways inside its frame instead of shrinking. */}
            <div className="overflow-x-auto rounded-[12px]">
              <div className="relative aspect-[16/10] w-full min-w-[760px] overflow-hidden rounded-[12px] sm:aspect-[16/9]">
                <AssembledWindow />

                {/* Hotspots sit over the window; each dims everything else. */}
                {REGIONS.map((r) => {
                  const [l, t, w, h] = r.box;
                  const on = active === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onMouseEnter={() => setActive(r.id)}
                      onFocus={() => setActive(r.id)}
                      onMouseLeave={() => setActive(null)}
                      onBlur={() => setActive(null)}
                      aria-label={r.name}
                      className="absolute transition-all duration-500 ease-soft"
                      style={{
                        left: `${l}%`,
                        top: `${t}%`,
                        width: `${w}%`,
                        height: `${h}%`,
                        background: on ? "rgba(200,202,208,0.07)" : "transparent",
                        boxShadow: on ? "inset 0 0 0 1px rgba(200,202,208,0.5)" : "none",
                        opacity: active && !on ? 0.35 : 1,
                      }}
                    >
                      <span
                        className="absolute left-2 top-2 rounded-md bg-black/80 px-2 py-0.5 text-[12px] text-fg backdrop-blur-sm transition-opacity duration-300"
                        style={{ opacity: on ? 1 : 0 }}
                      >
                        {r.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* The caption is one live line rather than four static ones. */}
        <div className="flex min-h-[112px] flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-6">
          <span className="shrink-0 text-[13px] font-medium text-fg">{region ? region.name : "Four regions"}</span>
          <p className="text-[14.5px] leading-relaxed text-fg-muted">
            {region
              ? region.body
              : "One process, one window, one set of keybindings, all of it rebindable, with VS Code and JetBrains presets a click away."}
          </p>
        </div>
      </div>
    </section>
  );
}
