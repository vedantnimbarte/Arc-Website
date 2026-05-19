"use client";

import { useState } from "react";

type Node = {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  emphasis?: boolean;
};

type Edge = {
  from: string;
  to: string;
  curve?: number;
};

const NODES: Node[] = [
  { id: "ui", label: "Surface · UI", description: "Tauri shell · React panels · CodeMirror · PTY view", x: 50, y: 8, emphasis: true },
  { id: "runtime", label: "AI Runtime", description: "Streaming orchestrator · token routing · context windowing", x: 50, y: 42, emphasis: true },
  { id: "agents", label: "Agent Pool", description: "Autonomous workers · approval gates · tool calls", x: 18, y: 70 },
  { id: "memory", label: "Memory · FTS + Vector", description: "SQLite FTS5 · embeddings · workspace recall", x: 50, y: 86 },
  { id: "mcp", label: "MCP Bridge", description: "stdio · sse · multi-server orchestration", x: 82, y: 70 },
  { id: "term", label: "PTY Terminal", description: "Real shell · streaming · ANSI · 60fps", x: 12, y: 22 },
  { id: "editor", label: "Editor", description: "CodeMirror 6 · LSP · multi-buffer", x: 88, y: 22 },
  { id: "fs", label: "Filesystem", description: "Watcher · indexer · diff engine", x: 30, y: 60 },
  { id: "git", label: "Git Engine", description: "libgit2 · diff · blame · status", x: 70, y: 60 },
];

const EDGES: Edge[] = [
  { from: "ui", to: "runtime" },
  { from: "ui", to: "term" },
  { from: "ui", to: "editor" },
  { from: "runtime", to: "agents" },
  { from: "runtime", to: "mcp" },
  { from: "runtime", to: "memory" },
  { from: "agents", to: "fs" },
  { from: "agents", to: "git" },
  { from: "mcp", to: "git" },
  { from: "fs", to: "memory" },
  { from: "git", to: "memory" },
];

const PROVIDERS = ["OpenAI", "Anthropic", "Ollama", "Mistral", "Google"];

export default function Architecture() {
  const [active, setActive] = useState<string | null>("runtime");

  const activeNode = NODES.find((n) => n.id === active) || NODES[1];

  return (
    <section className="relative py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionMarker n="003" label="ARCHITECTURE · HOW IT FITS" />

        <div className="mt-8 mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-display tracking-tight max-w-2xl">
            A single runtime that{" "}
            <em className="italic text-silver-400 font-normal">orchestrates</em>{" "}
            every layer of your workflow.
          </h2>
          <p className="text-silver-400 max-w-sm text-[15px] leading-relaxed">
            Hover any node to inspect. ARC is composed, not bundled — each subsystem
            speaks a contract, not a coupling.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Diagram */}
          <div className="lg:col-span-8">
            <div className="metal-border relative aspect-[4/3] p-8 overflow-hidden">
              {/* blueprint background */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }} />

              {/* corner reticles */}
              <div className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-wider-mono text-silver-600">⬒ runtime topology</div>
              <div className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-wider-mono text-silver-600">v0.4.2</div>
              <div className="absolute bottom-3 left-3 text-[9px] font-mono uppercase tracking-wider-mono text-silver-600">nodes · {NODES.length}</div>
              <div className="absolute bottom-3 right-3 text-[9px] font-mono uppercase tracking-wider-mono text-silver-600">edges · {EDGES.length}</div>

              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <defs>
                  <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(192,192,192,0.05)" />
                    <stop offset="50%" stopColor="rgba(220,220,220,0.45)" />
                    <stop offset="100%" stopColor="rgba(192,192,192,0.05)" />
                  </linearGradient>
                  <radialGradient id="node-glow">
                    <stop offset="0%" stopColor="rgba(220,220,220,0.5)" />
                    <stop offset="100%" stopColor="rgba(220,220,220,0)" />
                  </radialGradient>
                  <filter id="soft">
                    <feGaussianBlur stdDeviation="0.4" />
                  </filter>
                </defs>

                {/* edges */}
                {EDGES.map((e, i) => {
                  const a = NODES.find((n) => n.id === e.from)!;
                  const b = NODES.find((n) => n.id === e.to)!;
                  const isActive = active === e.from || active === e.to;
                  return (
                    <g key={i}>
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke="url(#edge-grad)"
                        strokeWidth={isActive ? 0.35 : 0.18}
                        opacity={isActive ? 0.9 : 0.4}
                      />
                      {/* traveling pulse */}
                      <circle r="0.6" fill="#E8E8E8" opacity={isActive ? 1 : 0.5}>
                        <animateMotion
                          dur={`${3 + (i % 3)}s`}
                          repeatCount="indefinite"
                          path={`M${a.x},${a.y} L${b.x},${b.y}`}
                          begin={`${i * 0.5}s`}
                        />
                      </circle>
                    </g>
                  );
                })}

                {/* nodes */}
                {NODES.map((n) => {
                  const isActive = active === n.id;
                  return (
                    <g key={n.id} style={{ cursor: "pointer" }} onMouseEnter={() => setActive(n.id)}>
                      {/* glow */}
                      <circle cx={n.x} cy={n.y} r={isActive ? 5 : 3} fill="url(#node-glow)" />
                      {/* outer ring */}
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={n.emphasis ? 2.2 : 1.7}
                        fill="none"
                        stroke={isActive ? "#F5F5F5" : "rgba(192,192,192,0.55)"}
                        strokeWidth={isActive ? 0.35 : 0.2}
                      />
                      {/* inner dot */}
                      <circle cx={n.x} cy={n.y} r={n.emphasis ? 0.9 : 0.6} fill={isActive ? "#FFFFFF" : "#C0C0C0"}>
                        {n.emphasis && (
                          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
                        )}
                      </circle>
                    </g>
                  );
                })}
              </svg>

              {/* HTML node labels positioned absolutely on top */}
              {NODES.map((n) => {
                const isActive = active === n.id;
                return (
                  <button
                    key={n.id}
                    onMouseEnter={() => setActive(n.id)}
                    onFocus={() => setActive(n.id)}
                    className={`absolute -translate-x-1/2 -translate-y-[160%] px-2.5 py-1 rounded backdrop-blur-sm border text-[10px] font-mono uppercase tracking-wider-mono whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-silver-100 text-ink-950 border-white shadow-[0_0_24px_rgba(220,220,220,0.4)]"
                        : "bg-black/60 text-silver-300 border-white/[0.08] hover:border-silver-300/50"
                    }`}
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  >
                    {n.label}
                  </button>
                );
              })}
            </div>

            {/* legend strip */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-silver-100" /> core node
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-px bg-silver-400" /> message flow
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-dot" /> live
                </span>
              </div>
              <span>SCHEMA · 1.0 · LOSSLESS</span>
            </div>
          </div>

          {/* Active node detail panel */}
          <div className="lg:col-span-4">
            <div className="metal-border p-7 relative">
              <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                inspecting · {activeNode.id.toUpperCase()}
              </div>
              <h3 className="font-serif text-[28px] leading-tight tracking-tight text-silver-50">
                {activeNode.label}
              </h3>
              <p className="mt-3 text-silver-300 text-[14.5px] leading-relaxed">
                {activeNode.description}
              </p>

              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 mb-3">
                  Connected providers
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PROVIDERS.map((p) => (
                    <span
                      key={p}
                      className="text-[11px] font-mono px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-silver-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 pt-5 border-t border-white/[0.06]">
                <Stat label="Throughput" value="12.4k tok/s" />
                <Stat label="P99 latency" value="18 ms" />
                <Stat label="Tool calls" value="∞ depth" />
                <Stat label="Approvals" value="6 modes" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] font-mono uppercase tracking-wider-mono text-silver-500">{label}</div>
      <div className="font-serif text-[18px] text-silver-100 mt-0.5">{value}</div>
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
