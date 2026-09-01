import Link from "next/link";
import { Reveal } from "@/components/Section";
import {
  BUILDS,
  DOWNLOAD_BASE,
  RELEASE_URL,
  RELEASED,
  REPO,
  REQUIREMENTS,
  VERSION,
} from "@/lib/arc";

export const metadata = {
  title: "Download",
  description: `Download ARC v${VERSION} for macOS, Windows or Linux. Free and MIT licensed.`,
};

const PLATFORMS = [
  { id: "mac" as const, name: "macOS", requirement: REQUIREMENTS.mac, glyph: <MacMark /> },
  { id: "windows" as const, name: "Windows", requirement: REQUIREMENTS.windows, glyph: <WinMark /> },
  { id: "linux" as const, name: "Linux", requirement: REQUIREMENTS.linux, glyph: <LinuxMark /> },
];

export default function DownloadPage() {
  return (
    <>
      <section className="pb-16 pt-40">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <Reveal>
            <p className="label">Download</p>
            <h1 className="display mt-6 max-w-[16ch] text-display">
              Free, and about 15 MB.
            </h1>
            <p className="mt-6 max-w-[52ch] text-lead text-fg-muted">
              Builds for all three platforms come straight from the v{VERSION} GitHub
              release, published {RELEASED}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-section">
        <div className="mx-auto max-w-frame px-6 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-3">
            {PLATFORMS.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} className="h-full">
                <article className="surface flex h-full flex-col p-7">
                  <div className="flex items-start justify-between">
                    <span className="text-fg-subtle">{p.glyph}</span>
                    <span className="label">{BUILDS[p.id].length} formats</span>
                  </div>

                  <h2 className="display mt-6 text-[24px] tracking-[-0.025em]">{p.name}</h2>
                  <p className="mt-2 text-[13.5px] text-fg-muted">{p.requirement}</p>

                  <ul className="mt-7 flex-1 space-y-px overflow-hidden rounded-panel border border-edge-hair">
                    {BUILDS[p.id].map((b, j) => (
                      <li key={b.file}>
                        <a
                          href={`${DOWNLOAD_BASE}/${b.file}`}
                          className={`flex items-baseline gap-3 px-4 py-3 transition-colors hover:bg-white/[0.05] ${
                            j === 0 ? "bg-white/[0.03]" : ""
                          }`}
                        >
                          <span className="text-[14px] text-fg">{b.label}</span>
                          <span className="label ml-auto shrink-0">{b.size}</span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <p className="label mt-5">{BUILDS[p.id][0].arch}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="surface mt-4 flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="display text-[19px] tracking-[-0.02em]">
                  First run will warn you
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">
                  These installers aren&apos;t OS code-signed yet, so macOS and Windows
                  both flag them. The release notes carry the bypass for each. In-app
                  updates are a separate matter — those are minisign-verified against
                  the key baked into your build before anything runs.
                </p>
              </div>
              <Link href={RELEASE_URL} className="btn btn-quiet shrink-0">
                Release notes
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="surface mt-4 flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="display text-[19px] tracking-[-0.02em]">
                  Or build from source
                </h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">
                  Node 20+, pnpm 9 and Rust 1.80+. No signing warning, and you get the
                  branch you want.
                </p>
              </div>
              <code className="shrink-0 rounded-panel border border-edge-hair bg-black/40 px-4 py-3 font-mono text-[12.5px] text-fg-muted">
                <span className="text-fg-faint">$ </span>pnpm install &amp;&amp; pnpm tauri:dev
              </code>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="label mt-8 text-center">
              Every asset above lives at{" "}
              <Link href={`${REPO}/releases`} className="underline underline-offset-4 hover:text-fg">
                github.com/vedantnimbarte/Arc/releases
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function MacMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.1 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.1 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.4s-2.3-.9-2.3-3.3zM14 5.7c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z" />
    </svg>
  );
}

function WinMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 5.6l7.3-1v7.1H3V5.6zm0 12.8l7.3 1v-7H3v6zm8.4 1.2L21 21V12.7h-9.6v6.9zM11.4 3v7.7H21V2l-9.6 1z" />
    </svg>
  );
}

function LinuxMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 2.6c-2.3 0-3.4 1.9-3.3 4 .1 1.9-.2 2.9-1 4.2-1 1.6-2 3.2-2 4.7 0 1.2.7 1.8 1.5 1.8.6 0 .8.4 1 .9.4 1 1.7 2.2 3.8 2.2s3.4-1.2 3.8-2.2c.2-.5.4-.9 1-.9.8 0 1.5-.6 1.5-1.8 0-1.5-1-3.1-2-4.7-.8-1.3-1.1-2.3-1-4.2.1-2.1-1-4-3.3-4z" />
      <circle cx="10.3" cy="7.4" r=".9" fill="currentColor" stroke="none" />
      <circle cx="13.7" cy="7.4" r=".9" fill="currentColor" stroke="none" />
      <path d="M10.8 10.2c.7.6 1.7.6 2.4 0" />
    </svg>
  );
}
