import Link from "next/link";

export const metadata = {
  title: "Features — ARC",
  description: "Deep dive into ARC's terminal, AI runtime, editor, memory, MCP, and git intelligence.",
};

type Block = {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: { label: string; detail: string }[];
  specs: [string, string][];
};

const BLOCKS: Block[] = [
  {
    index: "01",
    eyebrow: "Surface · Terminal",
    title: "A terminal that streams thought, not just text.",
    description:
      "ARC's terminal is a real PTY — not a shim. It runs your shell of choice with native ANSI, sixel, and 60fps redraw. Then it adds intelligence: a palette that explains output, a coach that recovers from errors, and agents that act on what you see.",
    bullets: [
      { label: "PTY-backed runtime", detail: "Real teletype semantics. Your tools work as expected." },
      { label: "Multi-shell", detail: "zsh, bash, fish, pwsh — selected per workspace." },
      { label: "Streaming", detail: "60fps even under heavy stdout. Backpressure handled." },
      { label: "ANSI + sixel", detail: "Full color, images in terminal, true-color throughout." },
    ],
    specs: [
      ["Renderer", "GPU-accelerated"],
      ["Latency", "≤2 frames"],
      ["Shells", "4 native · 12 detected"],
      ["Sessions", "∞ tabs · ∞ splits"],
    ],
  },
  {
    index: "02",
    eyebrow: "Runtime · AI",
    title: "An orchestrator that routes intelligently.",
    description:
      "The AI runtime is the heart of ARC. It manages providers, tokens, context windows, and tool calls — and it routes work to the model best suited for it. Long context? Claude. Cheap autocomplete? local. Codegen at scale? GPT.",
    bullets: [
      { label: "Provider matrix", detail: "OpenAI, Anthropic, Google, Mistral, Ollama, vLLM." },
      { label: "Streaming everywhere", detail: "Tokens, tool calls, deltas — all backpressured." },
      { label: "Context windowing", detail: "Adaptive RAG, compaction, recency weighting." },
      { label: "Routing", detail: "Per-task model selection via policy or prompt." },
    ],
    specs: [
      ["Providers", "9 first-party"],
      ["Max context", "200K tokens"],
      ["Throughput", "12.4k tok/s"],
      ["P99 latency", "18ms"],
    ],
  },
  {
    index: "03",
    eyebrow: "Surface · Editor",
    title: "An editor that pairs with you, not over you.",
    description:
      "Built on CodeMirror 6, ARC's editor has full LSP, multi-cursor, persistent undo, and conflict-aware writes. Inline completions stream from the same runtime your agents use — so the suggestions know your repo.",
    bullets: [
      { label: "CodeMirror 6", detail: "Tree-sitter syntax, semantic tokens." },
      { label: "LSP", detail: "70+ languages bundled. Add more in seconds." },
      { label: "Inline AI", detail: "Streaming completions, ⏎ to accept." },
      { label: "Conflict-aware", detail: "Optimistic writes that resolve cleanly." },
    ],
    specs: [
      ["Languages", "70+"],
      ["LSP servers", "auto-detected"],
      ["Undo depth", "10k"],
      ["File limit", "unbounded"],
    ],
  },
  {
    index: "04",
    eyebrow: "System · Memory",
    title: "Memory that grows with the workspace.",
    description:
      "ARC indexes your code with SQLite FTS5 and augments it with vector embeddings. Search across millions of files in milliseconds. Recall what you were doing yesterday, last week, or last quarter — scoped to project.",
    bullets: [
      { label: "FTS5", detail: "Lexical search, 1M files, 2s cold scan." },
      { label: "Vector recall", detail: "Semantic similarity, on-device by default." },
      { label: "Workspace memory", detail: "Conversation continuity across sessions." },
      { label: "Session history", detail: "Full audit, exportable, encrypted at rest." },
    ],
    specs: [
      ["Index", "SQLite FTS5"],
      ["Embeddings", "BGE / nomic"],
      ["Scan time", "2.1s · 1M files"],
      ["Storage", "encrypted · local"],
    ],
  },
  {
    index: "05",
    eyebrow: "Bridge · MCP",
    title: "Tools you already trust, agents you can extend.",
    description:
      "Model Context Protocol turns any service into a callable tool. ARC ships an MCP bridge that connects to stdio and SSE servers — bring your linters, your databases, your APIs.",
    bullets: [
      { label: "MCP 1.0", detail: "stdio and SSE transports supported." },
      { label: "Multi-server", detail: "Orchestrate tools across many servers." },
      { label: "Approval gates", detail: "Per-tool, per-call, or never-ask modes." },
      { label: "Registry", detail: "Browse and install community tools." },
    ],
    specs: [
      ["Servers", "142 listed"],
      ["Transports", "stdio · sse"],
      ["Approvals", "6 modes"],
      ["Audit", "full log"],
    ],
  },
  {
    index: "06",
    eyebrow: "Engine · Git",
    title: "Git that the agent reads before it writes.",
    description:
      "ARC ships libgit2 natively. Diffs, blame, status, log — all instant, all queryable by agents. Your commit messages stop being lies because the agent already knows what changed.",
    bullets: [
      { label: "libgit2 native", detail: "No shell-out. No race conditions." },
      { label: "Diff engine", detail: "Word, line, block — your pick." },
      { label: "Blame as context", detail: "Agents understand authorship." },
      { label: "Status streaming", detail: "Live updates as files change." },
    ],
    specs: [
      ["Backend", "libgit2"],
      ["Diff modes", "5"],
      ["Status", "live"],
      ["Repos", "any size"],
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="relative pt-32 pb-20">
      {/* hero strip */}
      <section className="relative py-16 border-b border-white/[0.04]">
        <div className="absolute inset-0 blueprint-grid blueprint-fade opacity-50" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-8">
            <span className="text-silver-300">§</span>
            <span className="w-8 h-px bg-silver-700" />
            <span>FEATURES · 06 SUBSYSTEMS</span>
          </div>
          <h1 className="font-serif text-hero tracking-[-0.035em] max-w-4xl">
            Every layer{" "}
            <em className="italic font-normal text-silver-300">composable.</em>
            <br />
            Every layer <span className="metal-text font-semibold">measurable.</span>
          </h1>
          <p className="mt-8 text-silver-400 text-[17px] max-w-xl leading-relaxed">
            ARC is built like an operating system: composed primitives with clean contracts.
            Read the spec, hot-swap the parts, ship faster.
          </p>
        </div>
      </section>

      {/* feature blocks */}
      {BLOCKS.map((b, i) => (
        <FeatureBlock key={b.index} block={b} flipped={i % 2 === 1} />
      ))}

      {/* CTA strip */}
      <section className="relative py-24 border-t border-white/[0.04] mt-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-3">
              READY · ⌘ ↓
            </div>
            <h2 className="font-serif text-section tracking-tight">
              Read the spec.{" "}
              <em className="italic text-silver-400 font-normal">Then run it.</em>
            </h2>
          </div>
          <div className="flex gap-3">
            <Link href="/docs" className="btn-ghost px-5 py-3 rounded-full text-[14px]">
              Documentation
            </Link>
            <Link href="/download" className="btn-metal px-5 py-3 rounded-full text-[14px]">
              Download ARC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureBlock({ block, flipped }: { block: Block; flipped: boolean }) {
  return (
    <section className="relative py-24 border-b border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className={`grid lg:grid-cols-12 gap-10 items-start ${flipped ? "lg:[direction:rtl]" : ""}`}>
          {/* left text */}
          <div className="lg:col-span-7 [direction:ltr]">
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-4">
              <span className="text-silver-300">§ {block.index}</span>
              <span className="w-8 h-px bg-silver-700" />
              <span>{block.eyebrow}</span>
            </div>
            <h2 className="font-serif text-section tracking-tight max-w-2xl">
              {block.title}
            </h2>
            <p className="mt-5 text-silver-400 text-[16.5px] leading-relaxed max-w-xl">
              {block.description}
            </p>

            <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {block.bullets.map((b) => (
                <li key={b.label} className="border-l border-silver-700/60 pl-4">
                  <div className="text-[14px] text-silver-100 font-medium">{b.label}</div>
                  <div className="text-[13px] text-silver-500 mt-1 leading-relaxed">{b.detail}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* right spec card */}
          <div className="lg:col-span-5 [direction:ltr]">
            <div className="metal-border p-6 relative">
              <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 mb-4 flex items-center justify-between">
                <span>Spec sheet</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/[0.05] rounded overflow-hidden">
                {block.specs.map(([k, v]) => (
                  <div key={k} className="bg-ink-950 p-4">
                    <div className="text-[9px] font-mono uppercase tracking-wider-mono text-silver-500">{k}</div>
                    <div className="font-serif text-[19px] text-silver-100 mt-1">{v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/[0.06] text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 flex items-center justify-between">
                <span>verified · 2026-05-14</span>
                <Link href="/docs" className="text-silver-200 hover:text-white">read spec →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
