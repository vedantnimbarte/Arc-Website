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
      title="A Rust workspace"
      sub="with a web front end on top."
      aside="The Tauri shell talks to ten crates over typed invoke calls. Each one owns a subsystem and nothing else."
    >
      <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
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
                    active === i ? "bg-ink/[0.045]" : "hover:bg-ink/[0.025]"
                  }`}
                >
                  <span
                    className={`font-mono text-[13px] transition-colors ${
                      active === i ? "text-fg" : "text-fg-subtle"
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="ml-auto hidden text-right text-[13px] text-fg-subtle sm:block">
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
              <p className="font-mono text-[22px] font-medium tracking-[-0.02em]">{crate.name}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{crate.does}</p>
              <p className="label mt-6 border-t border-edge-hair pt-4">Built on {crate.built}</p>
            </div>

            <div className="surface mt-4 grid divide-y divide-edge-hair overflow-hidden">
              {[
                ["Surface", "React 18 · CodeMirror · xterm.js"],
                ["Shell", "Tauri 2 · typed invoke and listen"],
                ["Subsystems", "10 Rust crates"],
                ["Storage", "SQLite · tantivy index · OS credential vault"],
              ].map(([layer, detail]) => (
                <div key={layer} className="flex items-baseline gap-4 px-6 py-3.5">
                  <span className="w-[86px] shrink-0 text-[13px] font-medium">{layer}</span>
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
