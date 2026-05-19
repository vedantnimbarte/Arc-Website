"use client";

import { useEffect, useRef, useState } from "react";

type Pane = {
  id: string;
  index: string;
  title: string;
  body: string;
  caption: string;
};

const PANES: Pane[] = [
  {
    id: "terminal",
    index: "I",
    title: "A terminal that reads the room.",
    body: "PTY-backed shells with command intelligence. ARC understands the prompt, the error, the context — and offers the next move.",
    caption: "live shell · streaming · 60fps",
  },
  {
    id: "chat",
    index: "II",
    title: "Chat is a first-class surface.",
    body: "Multi-turn conversations with workspace context, file attachments, and inline tool execution. Streaming everywhere.",
    caption: "multi-turn · multi-modal",
  },
  {
    id: "editor",
    index: "III",
    title: "The editor that thinks alongside you.",
    body: "CodeMirror 6 with LSP, inline AI completions, conflict-aware writes, and per-language settings.",
    caption: "CodeMirror 6 · LSP · 70+ langs",
  },
  {
    id: "search",
    index: "IV",
    title: "Search that understands intent.",
    body: "Full-text search backed by SQLite FTS5, augmented by vector embeddings. Find by meaning, not just by string.",
    caption: "FTS5 + vectors · 1M files",
  },
  {
    id: "agents",
    index: "V",
    title: "Agents you actually trust.",
    body: "Six approval modes from full-auto to per-tool. Agents run in scoped workspaces with full audit logs.",
    caption: "scoped · audited · interruptible",
  },
  {
    id: "git",
    index: "VI",
    title: "Git, but spoken aloud.",
    body: "Diffs, blame, and history that the agent reads before it writes. Your commit messages stop being lies.",
    caption: "libgit2 · diff · blame",
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.max(0, Math.min(1, -rect.top / total));
      const idx = Math.min(PANES.length - 1, Math.floor(scrolled * PANES.length));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* spacer to give scroll length */}
      <div style={{ height: `${PANES.length * 90}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
            <SectionMarker n="004" label="PRODUCT · IN FRAMES" />

            <div className="mt-6 grid lg:grid-cols-12 gap-10 items-center">
              {/* Left: text */}
              <div className="lg:col-span-5">
                <div className="font-mono text-[12px] uppercase tracking-wider-mono text-silver-500 mb-4">
                  Frame · {PANES[active].index} / VI
                </div>

                <div className="relative h-[280px]">
                  {PANES.map((p, i) => (
                    <div
                      key={p.id}
                      className="absolute inset-0 transition-all duration-700 ease-out-expo"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: `translateY(${(i - active) * 24}px)`,
                      }}
                    >
                      <h3 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-5 text-silver-400 text-[16px] leading-relaxed max-w-md">
                        {p.body}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                        {p.caption}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Indicator dots */}
                <div className="mt-6 flex items-center gap-2">
                  {PANES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all ${
                        i === active ? "w-12 bg-silver-100" : "w-3 bg-silver-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: visual */}
              <div className="lg:col-span-7">
                <div className="relative metal-border aspect-[16/11] overflow-hidden">
                  {PANES.map((p, i) => (
                    <ShowcasePane key={p.id} id={p.id} active={i === active} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcasePane({ id, active }: { id: string; active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-out-expo ${
        active ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
      }`}
    >
      {id === "terminal" && <TerminalPane />}
      {id === "chat" && <ChatPane />}
      {id === "editor" && <EditorPane />}
      {id === "search" && <SearchPane />}
      {id === "agents" && <AgentsPane />}
      {id === "git" && <GitPane />}
    </div>
  );
}

/* ───────────── Individual mock panes ───────────── */

function ChromeBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-gradient-to-b from-ink-700 to-ink-800">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1f1f1f]" />
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1f1f1f]" />
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-silver-200 to-silver-500" />
      </div>
      <div className="ml-2 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
        {label}
      </div>
      <div className="ml-auto text-[9px] font-mono uppercase tracking-wider-mono text-silver-700">
        ARC · v0.4.2
      </div>
    </div>
  );
}

function TerminalPane() {
  return (
    <div className="h-full flex flex-col bg-[#040404]">
      <ChromeBar label="zsh · main · ~/proj/arc" />
      <div className="flex-1 font-mono text-[12.5px] leading-[1.7] p-5 text-silver-300 overflow-hidden">
        <div className="text-silver-500">$ arc init</div>
        <div className="text-silver-400">→ workspace indexed · 12,408 files · 2.1s</div>
        <div className="text-silver-400">→ providers: openai · anthropic · ollama</div>
        <div className="text-silver-400">→ ready</div>
        <div className="mt-3 text-emerald-400">● ~/proj/arc › <span className="text-silver-50">deploy preview</span></div>
        <div className="mt-1 text-silver-500">  arc · understands intent → invoking deploy.sh</div>
        <div className="mt-1 text-silver-300">  ✓ build · 1.2s</div>
        <div className="text-silver-300">  ✓ uploaded · 4.4 MB</div>
        <div className="text-silver-300">  ✓ live · <span className="text-silver-100 underline">arc-preview-q7.fly.dev</span></div>
        <div className="mt-3 text-emerald-400">● ~/proj/arc › <span className="inline-block w-2 h-4 bg-silver-200 align-middle animate-blink" /></div>
      </div>
    </div>
  );
}

function ChatPane() {
  return (
    <div className="h-full flex flex-col bg-[#070707]">
      <ChromeBar label="agent · payments-svc · context 64k" />
      <div className="flex-1 p-5 space-y-3 overflow-hidden">
        <Bubble who="me" text="Why is the stripe webhook timing out in prod but not local?" />
        <Bubble who="agent" text="Comparing your Stripe handler against the latest deploy logs. The local config uses sync replies; prod is fronted by a Cloudflare worker with a 10s budget. Your webhook averages 12.4s. Want me to switch it to async queue ack?" />
        <Bubble who="me" text="Yes — propose changes." mono />
        <div className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[12px] font-mono text-silver-400">
          ▸ proposing edit · src/adapters/stripe.ts<br />
          ▸ proposing edit · tests/stripe.spec.ts<br />
          ▸ running pnpm test stripe<br />
          ✓ awaiting approval
        </div>
      </div>
    </div>
  );
}

function Bubble({ who, text, mono }: { who: "me" | "agent"; text: string; mono?: boolean }) {
  const isMe = who === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed ${
          isMe
            ? "bg-silver-100 text-ink-950 rounded-br-md"
            : "bg-white/[0.04] border border-white/[0.06] text-silver-200 rounded-bl-md"
        } ${mono ? "font-mono text-[12px]" : ""}`}
      >
        {text}
      </div>
    </div>
  );
}

function EditorPane() {
  return (
    <div className="h-full flex flex-col bg-[#060606]">
      <ChromeBar label="editor · src/server.ts · LSP attached" />
      <div className="flex-1 flex font-mono text-[12.5px] leading-[1.7]">
        {/* gutter */}
        <div className="w-10 py-4 text-right pr-2 text-silver-700 select-none border-r border-white/[0.04]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div><span className="text-silver-500">import</span> <span className="text-silver-100">{"{ Fastify }"}</span> <span className="text-silver-500">from</span> <span className="text-emerald-300/80">'fastify'</span><span className="text-silver-500">;</span></div>
          <div><span className="text-silver-500">import</span> <span className="text-silver-100">{"{ stripeRouter }"}</span> <span className="text-silver-500">from</span> <span className="text-emerald-300/80">'./adapters/stripe'</span><span className="text-silver-500">;</span></div>
          <div>&nbsp;</div>
          <div><span className="text-silver-500">const</span> <span className="text-silver-100">app</span> <span className="text-silver-500">=</span> <span className="text-silver-100">Fastify</span>({ }<span className="text-silver-500">)</span>;</div>
          <div><span className="text-silver-100">app.register</span>(<span className="text-silver-100">stripeRouter</span>)<span className="text-silver-500">;</span></div>
          <div>&nbsp;</div>
          <div className="bg-emerald-400/[0.05] border-l-2 border-emerald-400/40 -mx-4 pl-4 text-emerald-300/90">
            <span className="text-silver-500 mr-2">+</span>app.<span className="text-silver-100">register</span>(<span className="text-silver-100">queueWorker</span><span className="text-silver-500">,</span> {"{"} <span className="text-silver-400">concurrency:</span> 16 {"}"})<span className="text-silver-500">;</span>
          </div>
          <div>&nbsp;</div>
          <div><span className="text-silver-500">await</span> <span className="text-silver-100">app.listen</span>({ }<span className="text-silver-500">);</span></div>
          <div className="mt-3 text-silver-700 text-[11px]">
            ⌃ inline · accept (⏎) · alt-suggestion (⌥↩)
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPane() {
  return (
    <div className="h-full flex flex-col bg-[#060606]">
      <ChromeBar label="search · workspace" />
      <div className="p-5">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
          <span className="text-silver-500">⌕</span>
          <span className="text-silver-100 text-[14px]">where do we validate webhook signatures?</span>
          <span className="ml-auto text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">⌘K</span>
        </div>
        <div className="mt-5 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 flex justify-between">
          <span>5 results · 1 semantic · 4 lexical</span>
          <span>scanned 12,408 files · 38ms</span>
        </div>
        <div className="mt-4 space-y-2">
          {[
            { file: "src/adapters/stripe.ts", line: 142, snippet: "verifyWebhookSignature(req.body, sig, secret)", match: "semantic" },
            { file: "src/adapters/github.ts", line: 88, snippet: "if (!verifySignature(payload, header)) throw …", match: "lexical" },
            { file: "tests/webhooks.spec.ts", line: 24, snippet: "describe('signature validation', () => { … })", match: "lexical" },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] cursor-pointer">
              <span className={`mt-1 inline-block w-1.5 h-1.5 rounded-full ${r.match === "semantic" ? "bg-silver-100" : "bg-silver-500"}`} />
              <div className="flex-1">
                <div className="text-[12px] font-mono text-silver-200">{r.file}<span className="text-silver-600">:{r.line}</span></div>
                <div className="text-[12px] font-mono text-silver-500 mt-0.5">{r.snippet}</div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-600">{r.match}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentsPane() {
  return (
    <div className="h-full flex flex-col bg-[#060606]">
      <ChromeBar label="agents · 4 active · 2 paused" />
      <div className="p-5 grid grid-cols-2 gap-3">
        {[
          { name: "refactor-stripe", state: "RUNNING", step: "edit stripe.ts", color: "emerald" },
          { name: "audit-deps", state: "AWAITING", step: "needs approval", color: "amber" },
          { name: "scribe", state: "RUNNING", step: "drafting CHANGELOG", color: "emerald" },
          { name: "test-flake", state: "PAUSED", step: "user interrupt", color: "silver" },
        ].map((a, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-mono text-silver-100">{a.name}</span>
              <span className={`text-[9px] font-mono uppercase tracking-wider-mono ${
                a.color === "emerald" ? "text-emerald-300" : a.color === "amber" ? "text-amber-300" : "text-silver-400"
              }`}>● {a.state}</span>
            </div>
            <div className="mt-2 text-[11px] text-silver-500">{a.step}</div>
            <div className="mt-3 h-1 bg-white/[0.04] rounded-full overflow-hidden">
              <div className={`h-full ${
                a.color === "emerald" ? "w-[68%] bg-emerald-400/60" : a.color === "amber" ? "w-[40%] bg-amber-400/60" : "w-[24%] bg-silver-400/60"
              }`} />
            </div>
          </div>
        ))}
        <div className="col-span-2 mt-2 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 flex justify-between">
          <span>Approval mode · per-tool</span>
          <span>Audit log · 1,284 events</span>
        </div>
      </div>
    </div>
  );
}

function GitPane() {
  return (
    <div className="h-full flex flex-col bg-[#060606]">
      <ChromeBar label="git · arc/main · 3 ahead · clean" />
      <div className="flex-1 grid grid-cols-12 font-mono text-[12px]">
        <div className="col-span-5 border-r border-white/[0.05] p-4 space-y-2">
          <div className="text-[10px] uppercase tracking-wider-mono text-silver-500 mb-2">recent commits</div>
          {[
            { h: "8a7c9d2", m: "feat(agent): approval gates", a: "you", t: "2m" },
            { h: "f3a1b88", m: "refactor: stripe → async", a: "agent", t: "8m" },
            { h: "1e2c0a4", m: "chore: bump tauri", a: "you", t: "1h" },
            { h: "b7d420a", m: "fix: PTY race", a: "agent", t: "3h" },
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-silver-300">
              <span className="text-silver-600">{c.h}</span>
              <div className="flex-1">
                <div>{c.m}</div>
                <div className="text-[10px] text-silver-600">{c.a} · {c.t}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-7 p-4">
          <div className="text-[10px] uppercase tracking-wider-mono text-silver-500 mb-2">diff · src/adapters/stripe.ts</div>
          <div className="space-y-0.5 text-[11.5px] leading-[1.7]">
            <div className="text-rose-300/80 pl-2 border-l-2 border-rose-400/40 bg-rose-400/[0.03]">{"- function handleEvent(evt: Stripe.Event) {"}</div>
            <div className="text-emerald-300/90 pl-2 border-l-2 border-emerald-400/40 bg-emerald-400/[0.03]">{"+ async function handleEvent(evt: Stripe.Event) {"}</div>
            <div className="text-silver-500 pl-2">{"    const { id } = evt;"}</div>
            <div className="text-rose-300/80 pl-2 border-l-2 border-rose-400/40 bg-rose-400/[0.03]">-   return process(evt);</div>
            <div className="text-emerald-300/90 pl-2 border-l-2 border-emerald-400/40 bg-emerald-400/[0.03]">+   const ack = await queue.enqueue(evt);</div>
            <div className="text-emerald-300/90 pl-2 border-l-2 border-emerald-400/40 bg-emerald-400/[0.03]">+   return ack.id;</div>
            <div className="text-silver-500 pl-2">{"  }"}</div>
          </div>
        </div>
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
