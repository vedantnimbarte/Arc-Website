import Link from "next/link";

export const metadata = {
  title: "Download — ARC",
  description: "Download ARC for macOS, Windows, or Linux. Signed builds, hash verified.",
};

type Platform = {
  id: "mac" | "win" | "lin";
  index: string;
  name: string;
  detail: string;
  size: string;
  arch: string[];
  hash: string;
  recommended?: boolean;
  glyph: React.ReactNode;
};

const PLATFORMS: Platform[] = [
  {
    id: "mac",
    index: "01",
    name: "macOS",
    detail: "Universal · Apple Silicon + Intel",
    size: "84 MB",
    arch: ["arm64", "x86_64"],
    hash: "8a7c9d2f · 4e1b · b2c1 · …",
    recommended: true,
    glyph: <MacGlyph />,
  },
  {
    id: "win",
    index: "02",
    name: "Windows",
    detail: "MSIX installer · code-signed",
    size: "92 MB",
    arch: ["x86_64"],
    hash: "1f2a8b3c · 4d7e · a9c2 · …",
    glyph: <WinGlyph />,
  },
  {
    id: "lin",
    index: "03",
    name: "Linux",
    detail: "AppImage · deb · rpm · pacman",
    size: "78 MB",
    arch: ["x86_64", "arm64"],
    hash: "9e3d4c0a · 2b6f · 8d11 · …",
    glyph: <LinuxGlyph />,
  },
];

export default function DownloadPage() {
  return (
    <div className="relative pt-32 pb-20">
      <section className="relative py-16 border-b border-white/[0.04]">
        <div className="absolute inset-0 blueprint-grid blueprint-fade opacity-50" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-8">
            <span className="text-silver-300">§</span>
            <span className="w-8 h-px bg-silver-700" />
            <span>DOWNLOAD · v0.4.2 · BUILD 8a7c9d2f</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <h1 className="lg:col-span-8 font-serif text-hero tracking-[-0.035em]">
              Get ARC on your{" "}
              <em className="italic font-normal text-silver-300">machine</em>
              <br />
              in <span className="metal-text font-semibold">90 seconds.</span>
            </h1>
            <div className="lg:col-span-4 text-silver-400 text-[15px] leading-relaxed">
              <p>All builds are signed and notarized. SHA-256 hashes are published below — verify before you run.</p>
              <p className="mt-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
                Release notes · 2026-05-14 · 14 day stable channel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* platform cards */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-5">
            {PLATFORMS.map((p) => (
              <PlatformCard key={p.id} p={p} />
            ))}
          </div>

          {/* CLI install */}
          <div className="mt-10 metal-border p-7">
            <div className="grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 mb-2">
                  PREFER A ONE-LINER?
                </div>
                <h3 className="font-serif text-[28px] tracking-tight">Install via shell.</h3>
                <p className="text-silver-400 text-[14px] mt-2 leading-relaxed">
                  Bootstraps the correct package for your OS. Inspect the script before piping into sh.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="bg-black/60 border border-white/[0.06] rounded-lg p-4 font-mono text-[13px] leading-relaxed overflow-x-auto">
                  <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-wider-mono text-silver-500">
                    <span>terminal · zsh</span>
                    <span>⌘C</span>
                  </div>
                  <div><span className="text-silver-500">$</span> <span className="text-silver-100">curl -fsSL arc.run/install</span> <span className="text-silver-500">|</span> <span className="text-silver-100">sh</span></div>
                  <div className="mt-2"><span className="text-silver-500">$</span> <span className="text-silver-100">arc --version</span></div>
                  <div className="text-silver-400">  arc 0.4.2 (build 8a7c9d2f)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* release notes */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-3">
              § RELEASE NOTES
            </div>
            <h2 className="font-serif text-section tracking-tight">
              What&apos;s new in{" "}
              <em className="italic text-silver-300 font-normal">v0.4.2.</em>
            </h2>
            <p className="mt-4 text-silver-400 text-[14px] leading-relaxed">
              Multi-agent orchestration is now stable. Memory recall is 4x faster.
              MCP transport added SSE. Read the full changelog →
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {RELEASE.map((r, i) => (
              <div key={i} className="py-5 flex items-start gap-6">
                <div className="w-24 shrink-0 text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
                  {r.tag}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] text-silver-100">{r.title}</div>
                  <div className="text-[13px] text-silver-500 mt-1">{r.body}</div>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-700">
                  {r.commit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PlatformCard({ p }: { p: Platform }) {
  return (
    <div className="metal-border p-7 relative">
      {p.recommended && (
        <div className="absolute -top-3 left-7 px-2.5 py-1 rounded-full bg-gradient-to-b from-silver-100 to-silver-300 text-ink-950 text-[10px] font-mono uppercase tracking-wider-mono shadow-[0_6px_18px_-4px_rgba(220,220,220,0.4)]">
          DETECTED · YOUR OS
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
          PLATFORM · {p.index}
        </div>
        <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-silver-200">
          {p.glyph}
        </div>
      </div>

      <h3 className="font-serif text-[32px] tracking-tight">{p.name}</h3>
      <p className="text-silver-400 text-[13.5px] mt-1">{p.detail}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-wider-mono text-silver-500">Size</div>
          <div className="font-serif text-[18px] text-silver-100 mt-0.5">{p.size}</div>
        </div>
        <div>
          <div className="text-[9px] font-mono uppercase tracking-wider-mono text-silver-500">Arch</div>
          <div className="flex gap-1.5 mt-1">
            {p.arch.map((a) => (
              <span key={a} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-silver-300">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="#"
        className="mt-7 w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full text-[14px] btn-metal"
      >
        Download · {p.name}
        <span className="text-ink-950/60 font-mono text-[12px]">⌘ ↓</span>
      </Link>

      <div className="mt-5 pt-4 border-t border-white/[0.06] text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
        <div className="flex justify-between">
          <span>SHA-256</span>
          <span className="text-silver-400">verify ↗</span>
        </div>
        <div className="mt-1 text-silver-700 truncate normal-case font-mono">{p.hash}</div>
      </div>
    </div>
  );
}

const RELEASE = [
  { tag: "feat", title: "Multi-agent orchestration · stable", body: "Run dozens of agents in parallel with shared memory and approval gates.", commit: "8a7c9d2f" },
  { tag: "perf", title: "Memory recall 4× faster", body: "New BGE-small embedding model and vector quantization.", commit: "f3a1b88" },
  { tag: "feat", title: "MCP · SSE transport", body: "Connect to remote MCP servers over server-sent events.", commit: "1e2c0a4" },
  { tag: "fix", title: "PTY race condition on Windows", body: "Fixed a flicker when resizing splits under heavy stdout.", commit: "b7d420a" },
  { tag: "chore", title: "Tauri 2.1 · libgit2 1.8", body: "Routine bumps across native deps.", commit: "9c8e0a4" },
];

function MacGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.3 8.7c0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.2-1.2-.9-.1-1.8.6-2.3.6-.5 0-1.2-.5-2-.5-1 0-2 .6-2.5 1.6-1.1 1.9-.3 4.7.8 6.2.5.7 1.1 1.6 2 1.5.8 0 1.1-.5 2.1-.5s1.2.5 2.1.5c.9 0 1.4-.7 1.9-1.5.6-.8.9-1.7.9-1.7s-1.7-.7-1.7-2.7zM9.8 4.3c.4-.6.7-1.3.6-2-.7 0-1.4.4-1.9 1-.4.5-.8 1.3-.7 2 .8.1 1.5-.4 2-1z" /></svg>
  );
}
function WinGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M0 3.3L6.5 2.4v6H0V3.3zM7.2 2.3L16 1v7.4H7.2V2.3zM0 8.6h6.5v6L0 13.7V8.6zM7.2 8.6H16v7L7.2 14.4V8.6z" /></svg>
  );
}
function LinuxGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <ellipse cx="8" cy="6" rx="3" ry="3.5" />
      <circle cx="6.8" cy="5.5" r="0.4" fill="currentColor" />
      <circle cx="9.2" cy="5.5" r="0.4" fill="currentColor" />
      <path d="M5 9c-1 1.5-1.5 3-1.5 4 0 1.4 2 2 4.5 2s4.5-.6 4.5-2c0-1-.5-2.5-1.5-4" />
    </svg>
  );
}
