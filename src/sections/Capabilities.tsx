"use client";

import { useRef } from "react";
import { Reveal, Section } from "@/components/Section";

/** Everything here ships in v0.3.0. Nothing is planned or aspirational. */
const CAPABILITIES = [
  {
    title: "A real terminal",
    body: "xterm.js over portable-pty — bash, zsh, PowerShell, cmd, Nu, WSL. GPU rendering, named profiles, and scrollback that survives a relaunch.",
    meta: "WebGL · OSC 133 · ⌘F find",
  },
  {
    title: "Editor with language services",
    body: "CodeMirror 6 with syntax highlighting, multi-cursor, optional Vim mode, and LSP for diagnostics, hover, rename and format-on-save.",
    meta: "CodeMirror 6 · LSP · file watching",
  },
  {
    title: "Git, all the way down",
    body: "Diffs, blame, staging, tags, remotes, stashes, worktrees, interactive rebase, cherry-pick and GitHub PRs. Bisect and the reflog are both browsable.",
    meta: "signing · force-with-lease · reflog",
  },
  {
    title: "Conflicts, one hunk at a time",
    body: "A merge conflict opens in a three-way view. Take ours, theirs, both, or hand-edit the result — then it writes and stages the file.",
    meta: "three-way · stages on resolve",
  },
  {
    title: "Search that reads the repo",
    body: "BM25 full-text search backed by a tantivy index, plus literal find-and-replace across the workspace, previewed per file before anything is written.",
    meta: "tantivy · preview before write",
  },
  {
    title: "SSH and remote workspaces",
    body: "Pure-Rust SSH with saved hosts and key management. Mount a host over SFTP as the workspace root and edit remote files in place.",
    meta: "russh · russh-sftp",
  },
  {
    title: "Databases and HTTP",
    body: "Query PostgreSQL, MySQL and SQLite from a tab. A Postman-style REST client handles collections, environments and history.",
    meta: "sqlx · OS credential vault",
  },
  {
    title: "Problems and tests",
    body: "Runs your project's own checkers — tsc, cargo check, ESLint, Ruff, go vet — and turns the output into rows that open the offending line. Test suites run from the sidebar.",
    meta: "vitest · jest · pytest · cargo · go",
  },
  {
    title: "Agents, if you want them",
    body: "Drive your installed Claude Code CLI from a panel, with per-tool approval prompts. Thirteen agent CLIs launch in a terminal tab. Entirely optional — ARC runs without any of it.",
    meta: "optional · nothing to connect",
  },
];

export default function Capabilities() {
  return (
    <Section
      label="What it does"
      title="Nine things you kept in other windows."
      aside="Every capability below is in v0.3.0 today. Where a feature depends on something external, it says so and sits out rather than misreporting."
    >
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 90} className="h-full">
            <Card {...c} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Card({ title, body, meta }: { title: string; body: string; meta: string }) {
  const ref = useRef<HTMLElement>(null);

  /* A few degrees toward the cursor — enough to feel like an object,
     not enough to fight the text. */
  const tilt = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(6px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div className="tilt-scene h-full">
      <article
        ref={ref}
        onPointerMove={tilt}
        onPointerLeave={reset}
        className="tilt surface surface-hover flex h-full flex-col p-7"
      >
        <h3 className="display text-[19px] tracking-[-0.02em]">{title}</h3>
        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-fg-muted">{body}</p>
        <p className="label mt-6 border-t border-edge-hair pt-4">{meta}</p>
      </article>
    </div>
  );
}
