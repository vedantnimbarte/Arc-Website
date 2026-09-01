"use client";

import { useState } from "react";
import { Reveal, Section } from "@/components/Section";
import { CRATES } from "@/lib/arc";

/**
 * The Rust workspace, as it exists under rust/. Each row is a real crate.
 * Ordering is the dependency direction — shell at the top, storage at the
 * bottom — which is information, so the rows carry it.
 */
export default function Architecture() {
  const [active, setActive] = useState(0);
  const crate = CRATES[active];

  return (
    <Section
      label="Underneath"
      title="A Rust workspace with a web front end on top."
      aside="The Tauri shell talks to ten crates over typed invoke calls. Each one owns a subsystem and nothing else."
      wide
    >
      <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* the crate list */}
        <Reveal>
          <ul className="surface divide-y divide-edge-hair overflow-hidden">
            {CRATES.map((c, i) => (
              <li key={c.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-baseline gap-4 px-6 py-3.5 text-left transition-colors duration-300 ${
                    active === i ? "bg-white/[0.05]" : "hover:bg-white/[0.025]"
                  }`}
                >
                  <span
                    className={`font-mono text-[13px] transition-colors ${
                      active === i ? "text-fg" : "text-fg-subtle"
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="ml-auto hidden text-right text-[13px] text-fg-faint sm:block">
                    {c.does}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* the detail card, and the layer diagram */}
        <Reveal delay={120}>
          <div className="lg:sticky lg:top-28">
            <div className="surface p-8">
              <p className="label">Crate</p>
              <p className="display mt-3 text-[26px] tracking-[-0.025em]">{crate.name}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{crate.does}</p>
              <p className="label mt-6 border-t border-edge-hair pt-4">Built on {crate.built}</p>
            </div>

            <div className="mt-4 grid gap-px overflow-hidden rounded-panel bg-edge-hair">
              {[
                ["Surface", "React 18 · CodeMirror · xterm.js"],
                ["Shell", "Tauri 2 · typed invoke and listen"],
                ["Subsystems", "10 Rust crates"],
                ["Storage", "SQLite · tantivy index · OS credential vault"],
              ].map(([layer, detail]) => (
                <div key={layer} className="flex items-baseline gap-4 bg-void px-5 py-3.5">
                  <span className="label shrink-0 w-[86px]">{layer}</span>
                  <span className="text-[13.5px] text-fg-muted">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
