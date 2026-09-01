/**
 * ARC's real panels, rebuilt in DOM so they stay crisp inside the 3D scene
 * and at any zoom. Greys come from the app's own "ARC Dark" theme.
 * Each panel is pure markup — no state, safe to render many times.
 */

import type { ReactNode } from "react";

/* ── shared chrome ─────────────────────────────────────────────────── */

export function PanelShell({
  title,
  right,
  children,
  className = "",
}: {
  title: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`app-window flex h-full flex-col ${className}`}>
      <div className="app-chrome flex shrink-0 items-center justify-between px-3 py-[7px]">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-subtle">
          {title}
        </span>
        {right}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function Dot({ tone = "live" }: { tone?: "live" | "warn" | "gone" }) {
  const color = tone === "live" ? "bg-live" : tone === "warn" ? "bg-warn" : "bg-gone";
  return <span className={`inline-block h-[5px] w-[5px] rounded-full ${color}`} />;
}

/* ── 1. File tree — git status decorations, the way ARC decorates them ── */

type Entry = { depth: number; name: string; kind: "dir" | "file"; git?: "M" | "A" | "U"; active?: boolean };

const TREE: Entry[] = [
  { depth: 0, name: "rust", kind: "dir" },
  { depth: 1, name: "arc-pty", kind: "dir" },
  { depth: 2, name: "src/lib.rs", kind: "file", git: "M" },
  { depth: 2, name: "src/session.rs", kind: "file", active: true, git: "M" },
  { depth: 1, name: "arc-filesystem", kind: "dir" },
  { depth: 2, name: "src/index.rs", kind: "file" },
  { depth: 2, name: "src/watch.rs", kind: "file", git: "A" },
  { depth: 1, name: "arc-git", kind: "dir" },
  { depth: 2, name: "src/blame.rs", kind: "file" },
  { depth: 0, name: "apps/frontend", kind: "dir" },
  { depth: 1, name: "src/App.tsx", kind: "file", git: "U" },
  { depth: 1, name: "src/themes", kind: "dir" },
  { depth: 0, name: "Cargo.toml", kind: "file" },
];

const GIT_TONE = { M: "text-warn", A: "text-live", U: "text-gone" } as const;

export function FileTreePanel() {
  return (
    <PanelShell title="Explorer" right={<span className="font-mono text-[9px] text-fg-faint">main</span>}>
      <div className="app-mono px-1.5 py-1.5">
        {TREE.map((e, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 rounded px-1.5 py-[1.5px] ${
              e.active ? "bg-white/[0.07] text-fg" : "text-fg-muted"
            }`}
            style={{ paddingLeft: `${6 + e.depth * 11}px` }}
          >
            <span className={`shrink-0 text-[8px] ${e.kind === "dir" ? "text-fg-faint" : "text-transparent"}`}>
              ▾
            </span>
            <span className={`truncate ${e.kind === "dir" ? "text-fg-muted" : ""}`}>{e.name}</span>
            {e.git && (
              <span className={`ml-auto shrink-0 pr-1 text-[9px] font-medium ${GIT_TONE[e.git]}`}>
                {e.git}
              </span>
            )}
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

/* ── 2. Editor — CodeMirror 6 with LSP diagnostics ────────────────── */

type Tok = { t: string; c?: "kw" | "fn" | "str" | "num" | "com" | "ty" };

const CODE: Tok[][] = [
  [{ t: "use ", c: "kw" }, { t: "portable_pty" }, { t: "::{", c: "com" }, { t: "CommandBuilder" }, { t: ", " }, { t: "PtySize" }, { t: "};", c: "com" }],
  [],
  [{ t: "/// Spawn a shell and hand back the writer half.", c: "com" }],
  [{ t: "pub async fn ", c: "kw" }, { t: "spawn", c: "fn" }, { t: "(cfg: &" }, { t: "PtyConfig", c: "ty" }, { t: ") -> " }, { t: "Result", c: "ty" }, { t: "<" }, { t: "Session", c: "ty" }, { t: "> {" }],
  [{ t: "    let ", c: "kw" }, { t: "pair = pty_system." }, { t: "openpty", c: "fn" }, { t: "(" }, { t: "PtySize", c: "ty" }, { t: " {" }],
  [{ t: "        rows: cfg.rows, cols: cfg.cols," }],
  [{ t: "        pixel_width: " }, { t: "0", c: "num" }, { t: ", pixel_height: " }, { t: "0", c: "num" }, { t: "," }],
  [{ t: "    })?;" }],
  [],
  [{ t: "    let mut ", c: "kw" }, { t: "cmd = " }, { t: "CommandBuilder", c: "ty" }, { t: "::" }, { t: "new", c: "fn" }, { t: "(&cfg.shell);" }],
  [{ t: "    cmd." }, { t: "cwd", c: "fn" }, { t: "(&cfg.cwd);" }],
  [{ t: "    cmd." }, { t: "env", c: "fn" }, { t: "(" }, { t: '"TERM"', c: "str" }, { t: ", " }, { t: '"xterm-256color"', c: "str" }, { t: ");" }],
  [],
  [{ t: "    " }, { t: "Ok", c: "fn" }, { t: "(" }, { t: "Session", c: "ty" }, { t: "::" }, { t: "from", c: "fn" }, { t: "(pair, cmd)." }, { t: "await", c: "kw" }, { t: "?)" }],
  [{ t: "}" }],
];

const TOK_COLOR: Record<string, string> = {
  kw: "text-[#C3C7D1]",
  fn: "text-[#E4E6EA]",
  str: "text-[#9FB89C]",
  num: "text-[#D9B278]",
  com: "text-fg-faint",
  ty: "text-[#AEB4C4]",
};

export function EditorPanel() {
  return (
    <PanelShell
      title="session.rs"
      right={
        <span className="flex items-center gap-1.5">
          <Dot tone="warn" />
          <span className="font-mono text-[9px] text-fg-faint">rust-analyzer</span>
        </span>
      }
    >
      <div className="app-mono flex px-0 py-1.5">
        <div className="shrink-0 select-none px-2 text-right text-fg-faint">
          {CODE.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="min-w-0 flex-1 pr-3">
          {CODE.map((line, i) => (
            <div key={i} className={`whitespace-pre ${i === 4 ? "bg-white/[0.035]" : ""}`}>
              {line.length === 0 ? (
                " "
              ) : (
                line.map((tok, j) => (
                  <span key={j} className={tok.c ? TOK_COLOR[tok.c] : "text-fg-muted"}>
                    {tok.t}
                  </span>
                ))
              )}
              {i === 4 && <span className="ml-px inline-block h-[11px] w-[1.5px] translate-y-[2px] bg-accent" />}
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

/* ── 3. Terminal — a real PTY session, real output ────────────────── */

type TermLine = { kind: "prompt" | "out" | "ok" | "dim"; text: string };

const TERM: TermLine[] = [
  { kind: "prompt", text: "cargo check --workspace" },
  { kind: "dim", text: "    Checking arc-pty v0.3.0" },
  { kind: "dim", text: "    Checking arc-filesystem v0.3.0" },
  { kind: "dim", text: "    Checking arc-git v0.3.0" },
  { kind: "ok", text: "    Finished dev profile in 4.21s" },
  { kind: "prompt", text: "pnpm test" },
  { kind: "out", text: " ✓ src/state/tabs.test.ts (18)" },
  { kind: "out", text: " ✓ src/lib/theme.test.ts (24)" },
  { kind: "ok", text: " Test Files  12 passed (12)" },
];

export function TerminalPanel() {
  return (
    <PanelShell
      title="zsh — arc"
      right={
        <span className="flex items-center gap-1.5">
          <Dot />
          <span className="font-mono text-[9px] text-fg-faint">pty</span>
        </span>
      }
    >
      <div className="app-mono h-full bg-[#0E0E10] px-3 py-2">
        {TERM.map((l, i) =>
          l.kind === "prompt" ? (
            <div key={i} className="flex gap-1.5 pt-1 first:pt-0">
              <span className="text-live">❯</span>
              <span className="text-fg">{l.text}</span>
            </div>
          ) : (
            <div
              key={i}
              className={
                l.kind === "ok" ? "text-live" : l.kind === "dim" ? "text-fg-faint" : "text-fg-muted"
              }
            >
              {l.text}
            </div>
          )
        )}
        <div className="flex gap-1.5 pt-1">
          <span className="text-live">❯</span>
          <span className="inline-block h-[11px] w-[6px] translate-y-[3px] animate-caret bg-accent" />
        </div>
      </div>
    </PanelShell>
  );
}

/* ── 4. Source control — staged, unstaged, commit box ─────────────── */

const CHANGES = [
  { file: "rust/arc-pty/src/session.rs", git: "M" as const, staged: true },
  { file: "rust/arc-pty/src/lib.rs", git: "M" as const, staged: true },
  { file: "rust/arc-filesystem/src/watch.rs", git: "A" as const, staged: false },
  { file: "apps/frontend/src/App.tsx", git: "U" as const, staged: false },
];

export function SourcePanel() {
  const staged = CHANGES.filter((c) => c.staged);
  const unstaged = CHANGES.filter((c) => !c.staged);
  return (
    <PanelShell
      title="Source Control"
      right={<span className="font-mono text-[9px] text-fg-faint">↑2 ↓0</span>}
    >
      <div className="flex h-full flex-col">
        <div className="app-mono flex-1 px-2 py-1.5">
          <Group label={`Staged · ${staged.length}`} rows={staged} />
          <Group label={`Changes · ${unstaged.length}`} rows={unstaged} />
        </div>
        <div className="shrink-0 border-t border-white/[0.05] p-2">
          <div className="rounded border border-white/[0.07] bg-black/30 px-2 py-1.5">
            <span className="font-mono text-[10px] text-fg-muted">
              fix(pty): keep scrollback across relaunch
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="rounded bg-white/[0.09] px-2 py-[3px] font-mono text-[9px] text-fg">
              Commit
            </span>
            <span className="font-mono text-[9px] text-fg-faint">signed · -S</span>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function Group({ label, rows }: { label: string; rows: typeof CHANGES }) {
  return (
    <div className="mb-1.5">
      <div className="px-1 py-[3px] font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
        {label}
      </div>
      {rows.map((r) => (
        <div key={r.file} className="flex items-center gap-1.5 px-1 py-[1.5px] text-fg-muted">
          <span className="truncate">{r.file.split("/").pop()}</span>
          <span className="truncate text-[9px] text-fg-faint">{r.file.split("/").slice(0, -1).join("/")}</span>
          <span className={`ml-auto shrink-0 text-[9px] font-medium ${GIT_TONE[r.git]}`}>{r.git}</span>
        </div>
      ))}
    </div>
  );
}

/* ── The assembled window — all four panels in ARC's real layout ───── */

export function AssembledWindow({ className = "" }: { className?: string }) {
  return (
    <div className={`app-window flex h-full flex-col ${className}`}>
      <div className="app-chrome flex shrink-0 items-center gap-2.5 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-[9px] w-[9px] rounded-full bg-[#3a3a3e]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#3a3a3e]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#3a3a3e]" />
        </div>
        <span className="mx-auto font-mono text-[9.5px] uppercase tracking-[0.16em] text-fg-subtle">
          arc — ~/Arc — main
        </span>
        <span className="flex items-center gap-1.5">
          <Dot />
          <span className="font-mono text-[9px] text-fg-faint">v0.3.0</span>
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[22%_1fr_26%]">
        <div className="min-h-0 border-r border-white/[0.05]">
          <FileTreePanel />
        </div>
        <div className="grid min-h-0 grid-rows-[1fr_38%]">
          <div className="min-h-0 border-b border-white/[0.05]">
            <EditorPanel />
          </div>
          <div className="min-h-0">
            <TerminalPanel />
          </div>
        </div>
        <div className="min-h-0 border-l border-white/[0.05]">
          <SourcePanel />
        </div>
      </div>
    </div>
  );
}

export const PANELS = [
  { id: "tree", name: "File tree", Component: FileTreePanel },
  { id: "editor", name: "Editor", Component: EditorPanel },
  { id: "terminal", name: "Terminal", Component: TerminalPanel },
  { id: "source", name: "Source control", Component: SourcePanel },
] as const;
