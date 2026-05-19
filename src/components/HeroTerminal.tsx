"use client";

import { useEffect, useState } from "react";

/**
 * Cinematic animated terminal showing a realistic AI agent session.
 * Streams lines like a live PTY, with prompts, thinking steps, tool calls,
 * and file diffs. Loops infinitely.
 */

type LineKind =
  | "prompt"
  | "user"
  | "agent"
  | "tool"
  | "diff-add"
  | "diff-del"
  | "info"
  | "ok"
  | "stream"
  | "blank"
  | "ruler";

type Line = {
  kind: LineKind;
  text: string;
  delay?: number; // ms before this line appears
  typed?: boolean; // type out character by character
};

const SCRIPT: Line[] = [
  { kind: "info", text: "arc 0.4.2 · session 8a7c9d2f · runtime: us-east-1", delay: 0 },
  { kind: "ruler", text: "", delay: 80 },
  { kind: "prompt", text: "~/proj/payments-svc", delay: 150 },
  { kind: "user", text: "/agent refactor StripeAdapter to use async webhooks", delay: 200, typed: true },
  { kind: "blank", text: "", delay: 300 },
  { kind: "agent", text: "→ planning", delay: 250 },
  { kind: "stream", text: "  · scanning workspace ↦ 1,284 files indexed", delay: 250 },
  { kind: "stream", text: "  · located src/adapters/stripe.ts (412 LOC)", delay: 280 },
  { kind: "stream", text: "  · 3 call sites · 2 test files · 1 doc", delay: 280 },
  { kind: "agent", text: "→ proposing 4 changes", delay: 300 },
  { kind: "blank", text: "", delay: 100 },
  { kind: "tool", text: "edit src/adapters/stripe.ts", delay: 250 },
  { kind: "diff-del", text: "- function handleEvent(evt: Stripe.Event) {", delay: 180 },
  { kind: "diff-add", text: "+ async function handleEvent(evt: Stripe.Event) {", delay: 180 },
  { kind: "diff-del", text: "-   return process(evt);", delay: 180 },
  { kind: "diff-add", text: "+   const ack = await queue.enqueue(evt);", delay: 180 },
  { kind: "diff-add", text: "+   return ack.id;", delay: 180 },
  { kind: "blank", text: "", delay: 100 },
  { kind: "tool", text: "run pnpm test stripe", delay: 280 },
  { kind: "stream", text: "  ✓ 14 passed · 0 failed · 1.3s", delay: 400 },
  { kind: "ok", text: "✓ changes verified · awaiting approval", delay: 220 },
];

export default function HeroTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i <= SCRIPT.length; i++) {
          if (cancelled) return;
          setVisibleCount(i);
          await new Promise((r) => setTimeout(r, SCRIPT[i]?.delay ?? 240));
        }
        await new Promise((r) => setTimeout(r, 2400));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* outer metal frame */}
      <div className="metal-border rounded-2xl overflow-hidden shadow-[0_30px_120px_-30px_rgba(0,0,0,0.9)]">
        {/* corner accents */}
        <CornerAccents />

        {/* chrome */}
        <div className="relative flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-gradient-to-b from-ink-700 to-ink-800">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1f1f1f] border border-black/40" />
            <span className="w-3 h-3 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1f1f1f] border border-black/40" />
            <span className="w-3 h-3 rounded-full bg-gradient-to-b from-silver-200 to-silver-500 border border-black/40 shadow-[0_0_8px_rgba(192,192,192,0.4)]" />
          </div>

          <div className="flex-1 mx-2 px-3 py-1 rounded bg-black/40 border border-white/[0.04] text-[11px] font-mono text-silver-400 tracking-wider-mono uppercase truncate">
            arc · payments-svc · main · agent-1
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            STREAM
          </div>
        </div>

        {/* body */}
        <div className="relative bg-gradient-to-b from-[#070707] to-[#020202] overflow-hidden">
          <div className="scanline" />

          <div className="relative px-5 py-5 font-mono text-[13px] leading-[1.65] min-h-[440px] max-h-[480px] overflow-hidden">
            <div className="space-y-0.5">
              {SCRIPT.slice(0, visibleCount).map((line, idx) => (
                <TerminalLine key={idx} line={line} isLast={idx === visibleCount - 1} />
              ))}
              <CursorLine show={visibleCount >= SCRIPT.length} />
            </div>

            {/* fade-out gradient at top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#040404] to-transparent" />
          </div>

          {/* technical annotations on edges */}
          <div className="absolute top-3 right-4 flex flex-col items-end gap-1 text-[9px] font-mono uppercase tracking-wider-mono text-silver-700">
            <span>TKN · 14,302</span>
            <span>LAT · 18ms</span>
            <span>CTX · 64K</span>
          </div>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] bg-black/40 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
          <div className="flex items-center gap-4">
            <span className="text-silver-300">claude-opus-4-7</span>
            <span>main</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
          <div className="flex items-center gap-2">
            <span>STREAMING</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
          </div>
        </div>
      </div>

      {/* floating chips around the panel */}
      <FloatingChip className="absolute -top-4 -left-4" tone="silver">
        <span className="font-mono text-[10px] tracking-wider-mono uppercase">PTY backed</span>
      </FloatingChip>

      <FloatingChip className="absolute top-1/3 -right-5" tone="dark">
        <span className="text-[10px] font-mono tracking-wider-mono uppercase text-emerald-300">
          ● Live diff
        </span>
      </FloatingChip>

      <FloatingChip className="absolute -bottom-3 right-12" tone="dark">
        <span className="font-mono text-[10px] tracking-wider-mono uppercase text-silver-300">
          ⌘K · agent palette
        </span>
      </FloatingChip>
    </div>
  );
}

function TerminalLine({ line, isLast }: { line: Line; isLast: boolean }) {
  switch (line.kind) {
    case "ruler":
      return (
        <div className="my-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      );
    case "blank":
      return <div className="h-2" />;
    case "info":
      return (
        <div className="text-silver-500 text-[11px] tracking-wider-mono uppercase">{line.text}</div>
      );
    case "prompt":
      return (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-emerald-400">●</span>
          <span className="text-silver-400">{line.text}</span>
          <span className="text-silver-700">·</span>
          <span className="text-silver-200">›</span>
        </div>
      );
    case "user":
      return (
        <div className="text-silver-50 pl-5 -mt-[1.65em]">
          <span className="text-silver-700 mr-2">↳</span>
          {line.text}
          {isLast && line.typed && (
            <span className="inline-block w-2 h-4 bg-silver-200 ml-0.5 align-middle animate-blink" />
          )}
        </div>
      );
    case "agent":
      return <div className="text-silver-200">{line.text}</div>;
    case "stream":
      return <div className="text-silver-500">{line.text}</div>;
    case "tool":
      return (
        <div className="my-1">
          <span className="inline-block px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-silver-300 text-[11px]">
            ▸ {line.text}
          </span>
        </div>
      );
    case "diff-add":
      return (
        <div className="text-emerald-300/90 pl-2 border-l-2 border-emerald-400/40 bg-emerald-400/[0.03]">
          {line.text}
        </div>
      );
    case "diff-del":
      return (
        <div className="text-rose-300/80 pl-2 border-l-2 border-rose-400/40 bg-rose-400/[0.03]">
          {line.text}
        </div>
      );
    case "ok":
      return (
        <div className="mt-2 text-emerald-300 font-medium">{line.text}</div>
      );
    default:
      return <div className="text-silver-200">{line.text}</div>;
  }
}

function CursorLine({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="flex items-center gap-2 mt-3">
      <span className="text-emerald-400">●</span>
      <span className="text-silver-400">~/proj/payments-svc</span>
      <span className="text-silver-700">·</span>
      <span className="text-silver-200">›</span>
      <span className="inline-block w-2 h-4 bg-silver-200 align-middle animate-blink" />
    </div>
  );
}

function CornerAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {[
        "top-1.5 left-1.5 border-l border-t",
        "top-1.5 right-1.5 border-r border-t",
        "bottom-1.5 left-1.5 border-l border-b",
        "bottom-1.5 right-1.5 border-r border-b",
      ].map((c, i) => (
        <span
          key={i}
          className={`absolute w-2.5 h-2.5 ${c} border-silver-300/30`}
        />
      ))}
    </div>
  );
}

function FloatingChip({
  className = "",
  tone = "dark",
  children,
}: {
  className?: string;
  tone?: "dark" | "silver";
  children: React.ReactNode;
}) {
  const base =
    tone === "silver"
      ? "bg-gradient-to-b from-silver-200 to-silver-400 text-ink-950 border border-white/40 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)]"
      : "bg-ink-700/90 backdrop-blur-md text-silver-200 border border-white/[0.08] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.8)]";
  return (
    <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full ${base} ${className}`}>
      {children}
    </div>
  );
}
