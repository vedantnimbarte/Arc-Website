import Link from "next/link";
import DocSearch from "@/components/DocSearch";

type Section = {
  title: string;
  items: { id: string; label: string }[];
};

const NAV: Section[] = [
  {
    title: "Getting started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "install", label: "Install ARC" },
      { id: "first-session", label: "Your first session" },
      { id: "concepts", label: "Core concepts" },
    ],
  },
  {
    title: "Runtime",
    items: [
      { id: "terminal", label: "Terminal · PTY" },
      { id: "ai-runtime", label: "AI runtime" },
      { id: "editor", label: "Editor · CodeMirror" },
      { id: "memory", label: "Memory system" },
    ],
  },
  {
    title: "Agents",
    items: [
      { id: "agent-spec", label: "Agent spec" },
      { id: "approval-gates", label: "Approval gates" },
      { id: "tool-calls", label: "Tool calls" },
      { id: "multi-agent", label: "Multi-agent" },
    ],
  },
  {
    title: "Extending",
    items: [
      { id: "mcp", label: "MCP bridge" },
      { id: "providers", label: "Custom providers" },
      { id: "plugins", label: "Plugins" },
      { id: "cli", label: "CLI reference" },
    ],
  },
];

export const metadata = {
  title: "Documentation — ARC",
  description: "Read the manual. Ship the system. ARC documentation, searchable.",
};

export default function DocsPage() {
  return (
    <div className="relative pt-28 pb-20">
      <section className="relative py-12 border-b border-white/[0.04]">
        <div className="absolute inset-0 blueprint-grid blueprint-fade opacity-40 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-6">
            <span className="text-silver-300">§</span>
            <span className="w-8 h-px bg-silver-700" />
            <span>DOCS · v0.4.2 · SEARCHABLE</span>
          </div>
          <h1 className="font-serif text-display tracking-[-0.03em] max-w-3xl">
            Read the manual.{" "}
            <em className="italic text-silver-400 font-normal">
              Ship the system.
            </em>
          </h1>
        </div>
      </section>

      <section className="relative py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
            <DocSearch />
            <nav className="mt-8 space-y-7">
              {NAV.map((s) => (
                <div key={s.title}>
                  <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 mb-2.5">
                    {s.title}
                  </div>
                  <ul className="space-y-1.5">
                    {s.items.map((it, i) => (
                      <li key={it.id}>
                        <a
                          href={`#${it.id}`}
                          className={`block px-3 py-1.5 rounded-md text-[13.5px] transition-colors ${
                            i === 0 && s.title === "Getting started"
                              ? "bg-white/[0.05] text-silver-50 border-l border-silver-200"
                              : "text-silver-400 hover:text-silver-50 hover:bg-white/[0.02]"
                          }`}
                        >
                          {it.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Article */}
          <article className="lg:col-span-7 max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-3 flex items-center gap-3">
              <span>Getting started</span>
              <span className="text-silver-700">/</span>
              <span className="text-silver-200">Introduction</span>
            </div>

            <h1 id="introduction" className="font-serif text-[42px] leading-[1.05] tracking-tight">
              Introduction to ARC.
            </h1>
            <p className="mt-5 text-silver-300 text-[16px] leading-relaxed">
              ARC is an AI-native runtime that unifies your terminal, editor, agents, and memory.
              You can think of it as an operating system layer for development — one that
              understands intent, manages context, and runs work autonomously when you let it.
            </p>

            <Callout label="Note">
              ARC is in early access. The runtime is stable, but the API surface changes per
              minor version. Pin your version in production.
            </Callout>

            <h2 className="mt-12 font-serif text-[28px] tracking-tight">Install ARC.</h2>
            <p className="mt-3 text-silver-300 text-[15.5px] leading-relaxed">
              Use the install script. It detects your platform and pulls a signed build.
            </p>

            <CodeBlock language="zsh">
              {`# install\ncurl -fsSL arc.run/install | sh\n\n# verify\narc --version\n# → arc 0.4.2 (build 8a7c9d2f)`}
            </CodeBlock>

            <h2 id="first-session" className="mt-12 font-serif text-[28px] tracking-tight">
              Your first session.
            </h2>
            <p className="mt-3 text-silver-300 text-[15.5px] leading-relaxed">
              Open ARC. From the palette (⌘K), pick <em>New session</em>. ARC will index your
              workspace and prepare an agent. Type a natural-language command — ARC will
              interpret it, propose actions, and stream output back.
            </p>

            <CodeBlock language="zsh">
              {`# in ARC's command palette\n> refactor payments-svc to use async webhooks\n\n# the agent will:\n# 1. scan the workspace\n# 2. locate the relevant files\n# 3. propose edits\n# 4. run tests\n# 5. await your approval`}
            </CodeBlock>

            <h2 id="concepts" className="mt-12 font-serif text-[28px] tracking-tight">
              Core concepts.
            </h2>

            <DocList
              items={[
                {
                  term: "Workspace",
                  def: "A scoped directory ARC indexes, watches, and reasons about. Memory and agents are per-workspace.",
                },
                {
                  term: "Agent",
                  def: "An autonomous worker that can call tools, edit files, and run commands. Always operates inside a workspace.",
                },
                {
                  term: "Tool",
                  def: "A callable capability — built-in or via MCP. Tools are gated by your approval policy.",
                },
                {
                  term: "Memory",
                  def: "A queryable record of files, conversations, and sessions. FTS5 + embeddings, on-device by default.",
                },
              ]}
            />

            <h2 id="approval-gates" className="mt-12 font-serif text-[28px] tracking-tight">
              Approval gates.
            </h2>
            <p className="mt-3 text-silver-300 text-[15.5px] leading-relaxed">
              ARC ships six approval modes. Choose per-workspace, per-agent, or per-tool. The
              default is <em>per-tool</em> — every call requires explicit consent.
            </p>

            <div className="mt-6 metal-border overflow-hidden">
              <table className="w-full text-[13.5px]">
                <thead className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 bg-white/[0.02]">
                  <tr>
                    <th className="text-left px-4 py-3 font-normal">Mode</th>
                    <th className="text-left px-4 py-3 font-normal">Behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {[
                    ["never", "Agent runs without prompts. Use with care."],
                    ["per-tool", "Each new tool requires consent once. (default)"],
                    ["per-call", "Every individual call requires consent."],
                    ["destructive", "Only file-write and network calls prompt."],
                    ["preview", "Agent never executes — just shows the plan."],
                    ["lock", "Agent is paused. No tool calls permitted."],
                  ].map(([m, b]) => (
                    <tr key={m}>
                      <td className="px-4 py-3 font-mono text-silver-100">{m}</td>
                      <td className="px-4 py-3 text-silver-400">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 font-serif text-[28px] tracking-tight">CLI reference.</h2>
            <p className="mt-3 text-silver-300 text-[15.5px] leading-relaxed">
              Most ARC capabilities are also available via the CLI. Pipe agents into shell
              scripts, scope sessions, attach to running runtimes.
            </p>

            <CodeBlock language="zsh">
              {`arc init                  # init workspace\narc agent run "..."       # spawn an ephemeral agent\narc agent ls              # list active agents\narc memory search "..."   # query the index\narc mcp add <server>      # connect an MCP server`}
            </CodeBlock>

            <div className="mt-16 flex items-center justify-between border-t border-white/[0.06] pt-6 text-[13px] text-silver-500">
              <span>Last updated · 2026-05-14</span>
              <Link href="#" className="text-silver-200 hover:text-white">
                Edit on GitHub →
              </Link>
            </div>
          </article>

          {/* Right ToC */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24">
              <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 mb-3">
                On this page
              </div>
              <ul className="space-y-2 text-[12.5px] text-silver-400 border-l border-white/[0.06]">
                {[
                  "introduction",
                  "first-session",
                  "concepts",
                  "approval-gates",
                ].map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className="block pl-3 -ml-px border-l border-transparent hover:border-silver-300 hover:text-silver-100 transition-colors capitalize">
                      {id.replace("-", " ")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 metal-border p-5">
      <div className="flex items-start gap-4">
        <span className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-100 px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] shrink-0">
          {label}
        </span>
        <div className="text-silver-300 text-[14.5px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function CodeBlock({ language, children }: { language: string; children: string }) {
  return (
    <div className="mt-5 metal-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-black/40">
        <span className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">{language}</span>
        <button className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-400 hover:text-white">Copy ⌘C</button>
      </div>
      <pre className="px-5 py-4 font-mono text-[13px] leading-[1.7] text-silver-200 overflow-x-auto">
        {children.split("\n").map((line, i) => (
          <div key={i}>
            {line.startsWith("#") ? <span className="text-silver-600">{line}</span> :
             line.startsWith(">") ? <><span className="text-emerald-400">{line.slice(0, 1)}</span><span>{line.slice(1)}</span></> :
             line.startsWith("→") ? <span className="text-silver-500">{line}</span> :
             line}
          </div>
        ))}
      </pre>
    </div>
  );
}

function DocList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <dl className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {items.map((it) => (
        <div key={it.term} className="py-4 grid grid-cols-12 gap-4">
          <dt className="col-span-3 font-mono text-[12px] uppercase tracking-wider-mono text-silver-300">
            {it.term}
          </dt>
          <dd className="col-span-9 text-silver-400 text-[14.5px] leading-relaxed">
            {it.def}
          </dd>
        </div>
      ))}
    </dl>
  );
}
