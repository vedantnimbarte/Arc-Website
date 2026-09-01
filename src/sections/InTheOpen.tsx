import Link from "next/link";
import { Reveal, Section } from "@/components/Section";
import { REPO, RELEASE_URL, VERSION } from "@/lib/arc";

const FACTS = [
  {
    head: "MIT licensed",
    body: "Read it, fork it, ship it inside something else. The whole workspace is on GitHub, including the Rust crates.",
    link: { href: `${REPO}/blob/main/LICENSE`, label: "Read the licence" },
  },
  {
    head: "Nothing phones home",
    body: "No telemetry, no account, no key to hand over. SSH passphrases and GitHub tokens go to your OS credential vault, not to a database.",
  },
  {
    head: "Updates are verified",
    body: "The in-app updater checks minisign signatures against the key baked into your build before anything runs. Turn the check off in Settings → About.",
  },
  {
    head: "Installers aren't OS-signed yet",
    body: "macOS and Windows will warn on first run. The release notes carry the bypass. Building from source avoids it entirely.",
    link: { href: RELEASE_URL, label: `v${VERSION} release notes` },
  },
];

export default function InTheOpen() {
  return (
    <Section
      label="In the open"
      title="Early, honest about it, and yours to read."
      aside="ARC is at v0.3.0. Plenty works; some of it is rough. The issue tracker is the accurate roadmap."
    >
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {FACTS.map((f, i) => (
          <Reveal key={f.head} delay={(i % 2) * 90} className="h-full">
            <div className="surface h-full p-7">
              <h3 className="display text-[19px] tracking-[-0.02em]">{f.head}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">{f.body}</p>
              {f.link && (
                <Link
                  href={f.link.href}
                  className="label mt-5 inline-block transition-colors hover:text-fg"
                >
                  {f.link.label} ↗
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <div className="mt-4 surface flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="display text-[19px] tracking-[-0.02em]">Build it yourself</h3>
            <p className="mt-2 text-[14.5px] text-fg-muted">
              Node 20+, pnpm 9 and Rust 1.80+ is the whole prerequisite list.
            </p>
          </div>
          <code className="shrink-0 rounded-panel border border-edge-hair bg-black/40 px-4 py-3 font-mono text-[12.5px] text-fg-muted">
            <span className="text-fg-faint">$ </span>pnpm install && pnpm tauri:dev
          </code>
        </div>
      </Reveal>
    </Section>
  );
}
