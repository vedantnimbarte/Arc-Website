import Link from "next/link";
import { Reveal } from "@/components/Section";
import { REPO, VERSION } from "@/lib/arc";

export const metadata = {
  title: "Docs",
  description:
    "Install ARC, run it from source, connect an SSH host or a database, and wire up the optional agent panels.",
};

type Step = { n: string; title: string; body: string; code?: string };

const START: Step[] = [
  {
    n: "01",
    title: "Install it",
    body: "Grab the build for your platform, or clone and run it. Both paths need nothing else installed.",
    code: "git clone https://github.com/vedantnimbarte/Arc.git\ncd arc\npnpm install\npnpm tauri:dev",
  },
  {
    n: "02",
    title: "Open a workspace",
    body: "Point ARC at a folder. The file tree indexes it in the background — that index is what powers search — and git decorations appear as soon as it reads the repo.",
  },
  {
    n: "03",
    title: "Make the keys yours",
    body: "Settings → Keymaps swaps the whole set to a VS Code or JetBrains preset, and every individual shortcut is rebindable from there.",
  },
];

const GUIDES = [
  {
    title: "Run the frontend alone",
    body: "Vite serves the UI in a browser at 127.0.0.1:5173. PTY and filesystem features are stubbed, so it's for UI work only.",
    code: "pnpm dev",
  },
  {
    title: "Connect an SSH host",
    body: "Save a host in Settings → SSH, then mount it as the workspace root over SFTP. Git, content search, LSP and the task runner sit out on a remote root; use an SSH terminal tab for those.",
  },
  {
    title: "Query a database",
    body: "Add a connection and open it in a tab. Only user@host is stored beside the connection — the password goes to your OS credential vault.",
  },
  {
    title: "Turn on Claude Code",
    body: "If the claude CLI is on your PATH, the sidebar panel drives it. Each tool call that needs permission pauses on an approve/deny prompt showing the actual command. Mode and spend cap live in Settings → Claude Code.",
  },
  {
    title: "Connect Wingman",
    body: "Run the daemon and point Settings → Wingman at it. A token is only needed when it binds a non-loopback address.",
    code: "wingman serve   # 127.0.0.1:8787",
  },
  {
    title: "Check before you PR",
    body: "The three commands CI runs, in the order it runs them.",
    code: "pnpm typecheck\ncargo check --workspace\npnpm test",
  },
];

const REFERENCES = [
  { href: `${REPO}#readme`, label: "README", detail: "Full feature list and tech stack" },
  { href: `${REPO}/blob/main/CONTRIBUTING.md`, label: "CONTRIBUTING", detail: "How to propose a change" },
  { href: `${REPO}/blob/main/SECURITY.md`, label: "SECURITY", detail: "Reporting a vulnerability" },
  { href: `${REPO}/releases`, label: "Releases", detail: "Every build and its notes" },
  { href: `${REPO}/issues`, label: "Issues", detail: "The real roadmap" },
];

export default function DocsPage() {
  return (
    <>
      <section className="pb-16 pt-40">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <Reveal>
            <p className="label">Docs</p>
            <h1 className="display mt-6 max-w-[16ch] text-display">
              Running in about a minute.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-fg-muted">
              ARC v{VERSION} needs Node 20+, pnpm 9 and Rust 1.80+ to build, and
              nothing at all to run.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Getting started is a genuine sequence, so these steps are numbered. */}
      <section className="pb-20">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <div className="space-y-4">
            {START.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <article className="surface grid gap-5 p-7 sm:grid-cols-[52px_1fr]">
                  <span className="label pt-1">{s.n}</span>
                  <div>
                    <h2 className="display text-[20px] tracking-[-0.02em]">{s.title}</h2>
                    <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-fg-muted">
                      {s.body}
                    </p>
                    {s.code && <Code>{s.code}</Code>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-frame px-6 lg:px-10">
          <Reveal>
            <p className="label">Guides</p>
            <h2 className="display mt-5 text-section">The things people ask next.</h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {GUIDES.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 80} className="h-full">
                <article className="surface flex h-full flex-col p-7">
                  <h3 className="display text-[18px] tracking-[-0.02em]">{g.title}</h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-fg-muted">
                    {g.body}
                  </p>
                  {g.code && <Code>{g.code}</Code>}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-section">
        <div className="mx-auto max-w-frame px-6 lg:px-10">
          <Reveal>
            <p className="label">In the repository</p>
            <ul className="surface mt-6 divide-y divide-edge-hair overflow-hidden">
              {REFERENCES.map((r) => (
                <li key={r.label}>
                  <Link
                    href={r.href}
                    className="flex items-baseline gap-4 px-7 py-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="font-mono text-[13.5px] text-fg">{r.label}</span>
                    <span className="text-[13.5px] text-fg-muted">{r.detail}</span>
                    <span className="label ml-auto shrink-0" aria-hidden>
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-panel border border-edge-hair bg-black/40 px-4 py-3 font-mono text-[12.5px] leading-[1.8] text-fg-muted">
      {children.split("\n").map((line) => (
        <div key={line}>
          <span className="select-none text-fg-faint">$ </span>
          {line}
        </div>
      ))}
    </pre>
  );
}
