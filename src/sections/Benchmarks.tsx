"use client";

import { useEffect, useRef, useState } from "react";

type Metric = {
  label: string;
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  caption: string;
};

const METRICS: Metric[] = [
  { label: "Cold start", to: 0.4, suffix: "s", decimals: 1, caption: "boot to interactive" },
  { label: "First token", to: 18, suffix: "ms", caption: "agent stream init" },
  { label: "Index throughput", to: 12, suffix: "k/s", caption: "files indexed" },
  { label: "Providers", to: 9, suffix: "+", caption: "OpenAI · Claude · …" },
  { label: "MCP servers", to: 142, suffix: "", caption: "tools available" },
  { label: "Context window", to: 200, suffix: "K", caption: "max tokens" },
];

export default function Benchmarks() {
  return (
    <section className="relative py-28 border-y border-white/[0.04] bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950">
      <div className="absolute inset-0 blueprint-grid blueprint-fade opacity-30 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionMarker n="005" label="BENCHMARKS · MEASURED, NOT MARKETED" />

        <div className="mt-8 mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-display tracking-tight max-w-2xl">
            Speed isn&apos;t a feature.{" "}
            <em className="italic text-silver-400 font-normal">
              It&apos;s the floor.
            </em>
          </h2>
          <p className="text-silver-400 max-w-sm text-[15px] leading-relaxed">
            All numbers are measured on a baseline M2 Air. Sources and methodology in the docs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {METRICS.map((m, i) => (
            <MetricCell key={i} m={m} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
          <span>Methodology · arc.run/bench</span>
          <span>Sample size · 10,000 runs · stdev published</span>
          <span>Last verified · 2026-05-14</span>
        </div>
      </div>
    </section>
  );
}

function MetricCell({ m }: { m: Metric }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !seen.current) {
            seen.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(m.to * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [m.to]);

  const formatted = m.decimals ? value.toFixed(m.decimals) : Math.round(value);

  return (
    <div ref={ref} className="relative bg-ink-950 p-8 group hover:bg-ink-900 transition-colors">
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
        <span>{m.label}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
      </div>
      <div className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight metal-text-static">
        {m.prefix}{formatted}<span className="text-silver-300">{m.suffix}</span>
      </div>
      <div className="mt-3 text-[13px] text-silver-400">{m.caption}</div>

      {/* progress bar */}
      <div className="mt-6 h-px bg-white/[0.06] overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-silver-200 to-transparent transition-all"
          style={{ width: `${(value / m.to) * 100}%`, transitionDuration: "1500ms" }}
        />
      </div>
    </div>
  );
}

function SectionMarker({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
      <span className="text-silver-300">§ {n}</span>
      <span className="w-8 h-px bg-silver-700" />
      <span>{label}</span>
    </div>
  );
}
