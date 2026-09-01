"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Section";
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
  const [tilt, setTilt] = useState(7);

  /* The window lies back slightly and stands up as it scrolls into place. */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return setTilt(0);
    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const seen =
        1 - Math.max(0, Math.min(1, (r.top - 80) / window.innerHeight));
      setTilt(9 * (1 - seen));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const region = REGIONS.find((r) => r.id === active);

  return (
    <section className="py-section">
      <div className="mx-auto max-w-frame px-6 lg:px-10">
        <Reveal>
          <p className="label">Assembled</p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="display max-w-[17ch] text-display">
              This is the whole application.
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-fg-muted">
              No hidden second window, no separate git app. Point at a region to
              see what it does.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div ref={frameRef} className="tilt-scene mt-14">
            <div
              className="surface overflow-hidden rounded-window p-2 transition-transform duration-300 ease-soft"
              style={{
                transform: `perspective(2200px) rotateX(${tilt.toFixed(2)}deg)`,
              }}
            >
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
                          background: on
                            ? "rgba(200,202,208,0.07)"
                            : "transparent",
                          boxShadow: on
                            ? "inset 0 0 0 1px rgba(200,202,208,0.5)"
                            : "none",
                          opacity: active && !on ? 0.35 : 1,
                        }}
                      >
                        <span
                          className="label absolute left-2 top-2 rounded bg-void/85 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300"
                          style={{ opacity: on ? 1 : 0, color: "var(--fg)" }}
                        >
                          {r.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The caption is one live line rather than four static ones. */}
        <Reveal delay={200}>
          <div className="mt-8 flex flex-col gap-3 border-t border-edge-hair pt-5 sm:flex-row sm:items-baseline sm:gap-6">
            <span className="label shrink-0">
              {region ? region.name : "Four regions"}
            </span>
            <p className="text-[15px] leading-relaxed text-fg-muted">
              {region
                ? region.body
                : "One process, one window, one set of keybindings — all of it rebindable, with VS Code and JetBrains presets a click away."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
