"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { REPO, VERSION } from "@/lib/arc";
import { useReducedMotion, useScrollProgress } from "@/lib/reveal";
import { AssembledWindow } from "@/components/workspace/Panels";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });

/** Whether the given element is anywhere in the viewport right now. */
function useOnScreen(ref: React.RefObject<HTMLElement>) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setOn(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return on;
}

/** WebGL can be absent (old browser, blocklisted driver, headless). Ask once. */
function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setOk(Boolean(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

export default function Hero() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const onStage = useOnScreen(ref);
  const reduced = useReducedMotion();
  const webgl = useWebGL();
  const live = useRef(0);

  // The scene samples this every frame; keep it off React's render path.
  live.current = progress;

  const spatial = webgl === true && !reduced;
  const fade = Math.min(1, progress * 2.3);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── the workspace, filling the stage ─────────────────── */}
        <div className="absolute inset-0 z-0">
          {spatial ? (
            <HeroScene progress={live} active={onStage} />
          ) : (
            <StaticWorkspace ready={webgl !== null} />
          )}
        </div>

        {/* ambient pool behind the headline — keeps type legible over the slabs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[56%] bg-[radial-gradient(ellipse_70%_100%_at_50%_18%,rgba(8,8,10,0.92)_24%,rgba(8,8,10,0.5)_54%,transparent_78%)]"
        />

        {/* ── copy, in front of the panels ─────────────────────── */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[11vh] z-20 px-6 text-center sm:top-[14vh] lg:px-10"
          style={{
            opacity: 1 - fade,
            transform: `translate3d(0, ${-progress * 70}px, 0)`,
            visibility: fade >= 1 ? "hidden" : "visible",
          }}
        >
          <div className="pointer-events-auto mx-auto max-w-content">
            <Link
              href={`${REPO}/releases/tag/v${VERSION}`}
              className="label inline-flex items-center gap-2.5 rounded-full border border-edge-hair bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-edge-line hover:text-fg"
            >
              <span className="inline-block h-1.5 w-1.5 animate-breathe rounded-full bg-live" />
              v{VERSION} is out
            </Link>

            <h1 className="display mt-6 text-hero">
              Your shell, and
              <br />
              everything around it.
            </h1>

            <p className="mx-auto mt-5 max-w-[42ch] text-lead text-fg-muted sm:mt-6">
              A desktop workspace built on a real PTY. Terminal, editor, git, SSH,
              databases and a REST client — one window, no tab-switching.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
              <Link href="/download" className="btn btn-primary">
                Download for free
              </Link>
              <Link href={REPO} className="btn btn-quiet">
                View source
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── the caption reports what the panels are doing ─────── */}
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-void via-void/85 to-transparent pt-14">
          <div className="mx-auto w-full max-w-frame px-6 pb-6 lg:px-10">
            <div className="hairline" />
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="label whitespace-nowrap">
                {progress > 0.74 ? "one window" : progress > 0.3 ? "assembling" : "four panels"}
              </span>
              <span className="label hidden truncate sm:block">
                Tauri 2 · Rust · React · MIT licensed
              </span>
              <span className="label whitespace-nowrap">
                {spatial ? "scroll to assemble" : `arc ${VERSION}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Reduced motion, or no WebGL: the same window, already assembled. */
function StaticWorkspace({ ready }: { ready: boolean }) {
  return (
    <div className="tilt-scene absolute inset-x-0 bottom-[6%] top-[46%] flex justify-center px-6">
      <div
        className={`w-full max-w-[1120px] transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "perspective(1600px) rotateX(7deg)" }}
      >
        <div className="surface h-full overflow-hidden rounded-window p-1.5">
          <AssembledWindow className="rounded-[12px]" />
        </div>
      </div>
    </div>
  );
}
