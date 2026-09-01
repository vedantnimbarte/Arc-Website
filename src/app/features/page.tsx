import Link from "next/link";
import { Reveal } from "@/components/Section";
import { REPO, VERSION } from "@/lib/arc";

export const metadata = {
  title: "Features",
  description: `Everything ARC v${VERSION} ships: PTY terminal, CodeMirror editor, git, SSH, databases, REST client, problems panel, test explorer and containers.`,
};

/** Grouped exactly as the app groups them, so the page maps onto the UI. */
const GROUPS = [
  {
    name: "Terminal",
    intro: "xterm.js over portable-pty. A real shell, not an emulation of one.",
    items: [
      ["Shells", "bash, zsh, PowerShell, cmd, Nu, WSL, or a custom binary"],
      ["Rendering", "GPU (WebGL) rendering with a find bar on ⌘F / Ctrl+Shift+F"],
      ["Profiles", "Named shell + args + cwd + env, saved and reusable"],
      ["Scrollback", "Survives a relaunch; per-tab command history via OSC 133"],
      ["Safety", "Smart-paste warnings and long-command notifications"],
      ["Links", "File paths in output are clickable and open in the editor"],
    ],
  },
  {
    name: "Editor",
    intro: "CodeMirror 6, with language services when a server is available.",
    items: [
      ["Editing", "Syntax highlighting, multi-cursor, optional Vim mode"],
      ["LSP", "Diagnostics, hover, completion, go-to-definition, find references"],
      ["Refactoring", "Rename across the workspace, and format-on-save"],
      ["Watching", "Real-time file watching, so external edits show up"],
      ["Scratch buffers", "⇧⌘N opens a throwaway file that still saves and restores"],
    ],
  },
  {
    name: "Files and search",
    intro: "A tree that knows what git thinks, and an index that knows what's inside.",
    items: [
      ["Tree", "Browse, open and manage files with git status decorations"],
      ["Search", "BM25 full-text search backed by a tantivy index"],
      ["Replace", "Literal find-and-replace across the workspace, previewed per file"],
    ],
  },
  {
    name: "Git",
    intro: "The source control panel is the home for every git view.",
    items: [
      ["Inspect", "Branch status, diffs, logs, blame, tags, remotes, submodules"],
      ["Commit", "Staging, signing (-S) and sign-off (-s)"],
      ["Push", "A rejected push offers force-with-lease rather than just failing"],
      ["Rebase", "Interactive rebase with reword and edit as well as squash, fixup and drop"],
      ["Recover", "The reflog is browsable, so a bad reset is one click from undone"],
      ["Bisect", "Name a good and a bad commit, mark each checkout, get the culprit"],
      ["Conflicts", "Three-way view: take ours, theirs, both, or hand-edit — then it stages"],
      ["GitHub", "Pull requests from the UI"],
    ],
  },
  {
    name: "Remote and data",
    intro: "Other machines and other databases, without leaving the window.",
    items: [
      ["SSH", "Pure-Rust client (russh) with saved hosts, key generation and import"],
      ["Remote workspaces", "Mount a saved host over SFTP as the workspace root"],
      ["Databases", "PostgreSQL, MySQL and SQLite: table list, SQL editor, results grid"],
      ["REST client", "Postman-style collections, environments and history"],
      ["Credentials", "Passwords go to the OS credential vault, never the database"],
    ],
  },
  {
    name: "Project health",
    intro: "The whole-project answers that per-file language servers can't give.",
    items: [
      ["Problems", "Runs tsc, cargo check, ESLint, Ruff and go vet; rows open the line"],
      ["Tests", "Discovers vitest, jest, pytest, cargo test and go test; runs any of them"],
      ["Containers", "Docker containers grouped by compose project, with start/stop/restart"],
    ],
  },
  {
    name: "Making it yours",
    intro: "Every shortcut is rebindable and every colour is replaceable.",
    items: [
      ["Keymaps", "One click swaps the whole set to a VS Code or JetBrains preset"],
      ["Themes", "Bundled dark and light plus Catppuccin, or import your own"],
      ["VS Code themes", "Import directly — the text ramp is re-solved to clear WCAG AA"],
      ["Layout", "Split panes, tab groups, and session state persisted to SQLite"],
      ["Updates", "Checks on launch, installs in place, minisign-verified"],
    ],
  },
  {
    name: "Agents, optionally",
    intro: "None of this is required. ARC ships and runs without any of it.",
    items: [
      ["Claude Code", "Drive your installed CLI from a panel, with per-tool approval prompts"],
      ["Wingman", "Connect a wingman serve daemon for a pilot board and review queue"],
      ["CLI launcher", "Thirteen agent CLIs open in a terminal tab if they're on your PATH"],
      ["Agent review", "Snapshots what was already dirty, so you see only what the agent changed"],
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="pb-16 pt-40">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <Reveal>
            <p className="label">Features</p>
            <h1 className="display mt-6 max-w-[18ch] text-display">
              Everything in v{VERSION}, listed plainly.
            </h1>
            <p className="mt-6 max-w-[54ch] text-lead text-fg-muted">
              No roadmap items mixed in. If it&apos;s on this page it works today —
              and where it depends on something external, the app says so rather
              than pretending.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-section">
        <div className="mx-auto max-w-frame px-6 lg:px-10">
          <div className="space-y-4">
            {GROUPS.map((g, i) => (
              <Reveal key={g.name} delay={Math.min(i, 3) * 70}>
                <article className="surface overflow-hidden">
                  <header className="flex flex-col gap-2 border-b border-edge-hair px-7 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <h2 className="display shrink-0 text-[22px] tracking-[-0.025em]">{g.name}</h2>
                    <p className="text-[14px] text-fg-muted sm:text-right">{g.intro}</p>
                  </header>
                  <dl className="divide-y divide-edge-hair">
                    {g.items.map(([term, detail]) => (
                      <div
                        key={term}
                        className="grid gap-1 px-7 py-4 sm:grid-cols-[190px_1fr] sm:gap-6"
                      >
                        <dt className="label pt-[3px]">{term}</dt>
                        <dd className="text-[14.5px] leading-relaxed text-fg-muted">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link href="/download" className="btn btn-primary">
                Download v{VERSION}
              </Link>
              <Link href={REPO} className="btn btn-quiet">
                Read the source
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
