"use client";

import type { ReactNode } from "react";
import { Section, Stagger, StaggerItem } from "@/components/Section";

/* ── Line drawings, one per capability. Same pen everywhere: ink stroke,
      white fill, in a 180×110 box. ─────────────────────────────────── */

const pen = { stroke: "#0D0F10", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Win({ x = 30, y = 14, w = 120, h = 82, children }: { x?: number; y?: number; w?: number; h?: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#fff" {...pen} />
      <path d={`M${x} ${y + 15}h${w}`} {...pen} strokeOpacity=".25" />
      <circle cx={x + 9} cy={y + 7.5} r="2" fill="#0D0F10" fillOpacity=".25" />
      <circle cx={x + 16} cy={y + 7.5} r="2" fill="#0D0F10" fillOpacity=".25" />
      {children}
    </g>
  );
}

const ART: Record<string, ReactNode> = {
  terminal: (
    <Win>
      <path d="M42 46l8 6-8 6" {...pen} />
      <path d="M56 58h34" {...pen} strokeOpacity=".35" />
      <path d="M42 72h52M42 82h30" {...pen} strokeOpacity=".2" />
      <rect x="78" y="76" width="7" height="11" fill="#0D0F10" />
    </Win>
  ),
  editor: (
    <Win>
      <path d="M42 42h40M42 52h58M42 62h30M42 72h48" {...pen} strokeOpacity=".3" />
      <path d="M72 66q3 3 6 0t6 0 6 0 6 0" stroke="#E8776D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <rect x="92" y="70" width="64" height="24" rx="6" fill="#fff" {...pen} />
      <path d="M100 79h40M100 86h26" {...pen} strokeOpacity=".3" />
    </Win>
  ),
  git: (
    <g>
      <path d="M60 18v74" {...pen} />
      <path d="M60 36c0 18 50 10 50 30v8" {...pen} />
      <path d="M110 74c0 10-50 6-50 18" {...pen} strokeDasharray="3 4" strokeOpacity=".5" />
      {[18, 48, 92].map((y) => (
        <circle key={y} cx="60" cy={y} r="6" fill="#fff" {...pen} />
      ))}
      <circle cx="110" cy="66" r="6" fill="#0D0F10" />
    </g>
  ),
  conflict: (
    <g>
      <rect x="22" y="22" width="42" height="66" rx="6" fill="#fff" {...pen} strokeOpacity=".4" />
      <rect x="116" y="22" width="42" height="66" rx="6" fill="#fff" {...pen} strokeOpacity=".4" />
      <rect x="69" y="14" width="42" height="82" rx="6" fill="#fff" {...pen} />
      <rect x="76" y="44" width="28" height="14" rx="3" fill="#0D0F10" />
      <path d="M30 40h26M30 50h20M124 40h26M124 50h18M76 30h26M76 70h20M76 80h24" {...pen} strokeOpacity=".3" />
    </g>
  ),
  search: (
    <g>
      <rect x="30" y="16" width="100" height="78" rx="8" fill="#fff" {...pen} strokeOpacity=".5" />
      <path d="M42 32h60M42 44h44M42 56h70M42 68h36M42 80h52" {...pen} strokeOpacity=".22" />
      <circle cx="116" cy="62" r="18" fill="#fff" fillOpacity=".85" {...pen} />
      <path d="M129 75l14 14" {...pen} strokeWidth="2.6" />
    </g>
  ),
  ssh: (
    <g>
      <Win x={14} y={30} w={62} h={50} />
      <Win x={104} y={30} w={62} h={50} />
      <path d="M78 55h24" {...pen} strokeDasharray="3 4" />
      <rect x="83" y="49" width="14" height="12" rx="2.5" fill="#0D0F10" />
      <path d="M86 49v-4a4 4 0 018 0v4" {...pen} fill="none" />
    </g>
  ),
  data: (
    <g>
      <ellipse cx="62" cy="28" rx="30" ry="9" fill="#fff" {...pen} />
      <path d="M32 28v52c0 5 13.4 9 30 9s30-4 30-9V28" fill="#fff" {...pen} />
      <path d="M32 46c0 5 13.4 9 30 9s30-4 30-9M32 63c0 5 13.4 9 30 9s30-4 30-9" {...pen} strokeOpacity=".35" />
      <path d="M118 36c-6 0-6 4-6 9s0 8-5 10c5 2 5 5 5 10s0 9 6 9M146 36c6 0 6 4 6 9s0 8 5 10c-5 2-5 5-5 10s0 9-6 9" {...pen} fill="none" />
    </g>
  ),
  problems: (
    <g>
      <rect x="40" y="14" width="100" height="82" rx="8" fill="#fff" {...pen} />
      {[30, 50, 70].map((y, i) => (
        <g key={y}>
          {i < 2 ? (
            <path d={`M52 ${y}l4 4 8-8`} {...pen} />
          ) : (
            <path d={`M53 ${y - 4}l8 8m0-8l-8 8`} stroke="#E8776D" strokeWidth="1.4" strokeLinecap="round" />
          )}
          <path d={`M72 ${y}h${i === 2 ? 50 : 40}`} {...pen} strokeOpacity=".3" />
        </g>
      ))}
      <path d="M52 86h28" {...pen} strokeOpacity=".2" />
    </g>
  ),
  agents: (
    <g>
      <rect x="34" y="40" width="56" height="30" rx="15" fill="#fff" {...pen} />
      <circle cx="49" cy="55" r="10" fill="#fff" {...pen} />
      <path d="M104 34h44a8 8 0 018 8v18a8 8 0 01-8 8h-30l-10 9v-9h-4a8 8 0 01-8-8V42a8 8 0 018-8z" fill="#fff" {...pen} strokeOpacity=".45" />
      <path d="M110 46h30M110 55h20" {...pen} strokeOpacity=".25" />
    </g>
  ),
};

/** Everything here ships in v0.3.0. Nothing is planned or aspirational. */
const CAPABILITIES = [
  {
    art: "terminal",
    title: "A real terminal",
    body: "xterm.js over portable-pty: bash, zsh, PowerShell, cmd, Nu, WSL. GPU rendering, named profiles, and scrollback that survives a relaunch.",
  },
  {
    art: "editor",
    title: "Editor with language services",
    body: "CodeMirror 6 with multi-cursor, optional Vim mode, and LSP for diagnostics, hover, rename and format-on-save.",
  },
  {
    art: "git",
    title: "Git, all the way down",
    body: "Diffs, blame, staging, stashes, worktrees, interactive rebase, cherry-pick and GitHub PRs. Bisect and the reflog are browsable.",
  },
  {
    art: "conflict",
    title: "Conflicts, one hunk at a time",
    body: "A merge conflict opens in a three-way view. Take ours, theirs, both, or hand-edit. Then it writes and stages the file.",
  },
  {
    art: "search",
    title: "Search that reads the repo",
    body: "BM25 full-text search on a tantivy index, plus find-and-replace across the workspace, previewed per file before anything is written.",
  },
  {
    art: "ssh",
    title: "SSH and remote workspaces",
    body: "Pure-Rust SSH with saved hosts and key management. Mount a host over SFTP as the workspace root and edit files in place.",
  },
  {
    art: "data",
    title: "Databases and HTTP",
    body: "Query PostgreSQL, MySQL and SQLite from a tab. A REST client handles collections, environments and history.",
  },
  {
    art: "problems",
    title: "Problems and tests",
    body: "Runs tsc, cargo check, ESLint, Ruff and go vet, and turns the output into rows that open the line. Test suites run from the sidebar.",
  },
  {
    art: "agents",
    title: "Agents, if you want them",
    body: "Drive your installed Claude Code CLI from a panel, with per-tool approval. Entirely optional: ARC runs without any of it.",
  },
];

export default function Capabilities() {
  return (
    <Section
      title="Nine things you kept"
      sub="in other windows."
      aside="Every one of these is in v0.3.0 today. Where a feature depends on something external, it says so."
    >
      <Stagger className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {CAPABILITIES.map((c) => (
          <StaggerItem key={c.title} className="h-full">
            <article className="surface flex h-full flex-col p-2">
              <div className="well grid h-[150px] place-items-center">
                <svg viewBox="0 0 180 110" className="h-[110px] w-[180px]" fill="none" aria-hidden>
                  {ART[c.art]}
                </svg>
              </div>
              <div className="px-3 pb-3 pt-4">
                <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">{c.body}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
