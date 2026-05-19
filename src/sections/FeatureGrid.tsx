import { ReactNode } from "react";

type Feature = {
  index: string;
  title: string;
  description: string;
  meta: string[];
  glyph: ReactNode;
};

const FEATURES: Feature[] = [
  {
    index: "01",
    title: "AI Terminal",
    description:
      "A real PTY-backed shell with command intelligence woven in. ARC anticipates intent, explains output, and recovers from errors.",
    meta: ["PTY · zsh · bash · pwsh", "Streaming · 60fps"],
    glyph: <TerminalGlyph />,
  },
  {
    index: "02",
    title: "Multi-Agent Runtime",
    description:
      "Autonomous coding agents with approval-based tool orchestration. Run dozens in parallel, scoped to projects.",
    meta: ["Tool calling · MCP", "Approval gates · 6 modes"],
    glyph: <AgentGlyph />,
  },
  {
    index: "03",
    title: "Embedded Editor",
    description:
      "CodeMirror 6 with full language services, inline AI completions, and conflict-aware persistence.",
    meta: ["LSP · 70+ langs", "Inline · streaming"],
    glyph: <EditorGlyph />,
  },
  {
    index: "04",
    title: "File Intelligence",
    description:
      "Indexed FTS and vector search across your workspace. Ask in natural language; ARC navigates the tree.",
    meta: ["FTS5 + vector", "1M files · 2s scan"],
    glyph: <SearchGlyph />,
  },
  {
    index: "05",
    title: "Git Intelligence",
    description:
      "First-class diffs, blame, and commit insights. Agents understand the history before they edit.",
    meta: ["libgit2", "Diff · blame · status"],
    glyph: <GitGlyph />,
  },
  {
    index: "06",
    title: "MCP Integration",
    description:
      "Bridge to any Model Context Protocol server. Agents extend themselves with the tools you already trust.",
    meta: ["MCP 1.0 · stdio · sse", "Multi-server orchestration"],
    glyph: <MCPGlyph />,
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionMarker n="002" label="CAPABILITIES · WHAT IT DOES" />

        <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <h2 className="font-serif text-display tracking-tight max-w-3xl">
            One runtime.{" "}
            <em className="italic text-silver-400 font-normal">
              Six surfaces.
            </em>{" "}
            <br className="hidden md:block" />
            Built for engineers who refuse to context-switch.
          </h2>
          <p className="text-silver-400 max-w-sm text-[15px] leading-relaxed">
            Each capability is composable and accessible from anywhere — palette,
            keybinding, or natural language.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <FeatureCard key={f.index} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="metal-border group relative p-7 transition-transform duration-500 hover:-translate-y-1">
      {/* corner ticks */}
      <span className="absolute top-2 left-2 w-2 h-2 border-l border-t border-silver-300/30" />
      <span className="absolute top-2 right-2 w-2 h-2 border-r border-t border-silver-300/30" />
      <span className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-silver-300/30" />
      <span className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-silver-300/30" />

      {/* index */}
      <div className="flex items-center justify-between mb-7">
        <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
          ARC // {feature.index}
        </div>
        <div className="w-8 h-8 rounded-md border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-silver-400 group-hover:text-silver-100 group-hover:border-white/20 transition-all">
          {feature.glyph}
        </div>
      </div>

      <h3 className="font-serif text-[26px] leading-[1.1] tracking-tight text-silver-50">
        {feature.title}
      </h3>

      <p className="mt-3 text-silver-400 text-[14.5px] leading-relaxed">
        {feature.description}
      </p>

      <div className="mt-8 pt-4 border-t border-white/[0.05] flex flex-wrap gap-x-4 gap-y-1.5">
        {feature.meta.map((m) => (
          <span
            key={m}
            className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500"
          >
            {m}
          </span>
        ))}
      </div>

      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(220,220,220,0.06),transparent_60%)]" />
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

/* ─── glyphs ─── */
function TerminalGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5l3 3-3 3" />
      <path d="M8 11h5" />
    </svg>
  );
}
function AgentGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="8" cy="5" r="1.5" />
      <circle cx="4" cy="11" r="1.5" />
      <circle cx="12" cy="11" r="1.5" />
      <path d="M8 6.5v3M6.5 10L7 9.5M9.5 10L9 9.5" strokeLinecap="round" />
    </svg>
  );
}
function EditorGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M3 4h10M3 8h6M3 12h8" />
    </svg>
  );
}
function SearchGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="7" cy="7" r="4" />
      <path d="M10 10l3 3" strokeLinecap="round" />
    </svg>
  );
}
function GitGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="12" cy="8" r="1.5" />
      <path d="M4 5.5v5M5.5 4h3a3 3 0 013 3v0" strokeLinecap="round" />
    </svg>
  );
}
function MCPGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2.5" y="2.5" width="4" height="4" />
      <rect x="9.5" y="2.5" width="4" height="4" />
      <rect x="2.5" y="9.5" width="4" height="4" />
      <rect x="9.5" y="9.5" width="4" height="4" />
      <path d="M6.5 4.5h3M6.5 11.5h3M4.5 6.5v3M11.5 6.5v3" strokeLinecap="round" />
    </svg>
  );
}
