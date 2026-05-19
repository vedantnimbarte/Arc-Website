import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* background — dramatic gradient + grid */}
      <div className="absolute inset-0 bg-radial-vignette" />
      <div className="absolute inset-0 blueprint-grid blueprint-fade opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(220,220,220,0.08)_0%,_transparent_60%)] pointer-events-none animate-drift" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
        <SectionMarker n="007" label="FINAL · YOUR MOVE" />

        <div className="mt-10 mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-300">
            Free for personal use · No credit card
          </span>
        </div>

        <h2 className="font-serif text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.04em]">
          Build at the
          <br />
          <span className="metal-text font-semibold">speed of</span>{" "}
          <em className="italic text-silver-100 font-normal">thought.</em>
        </h2>

        <p className="mt-8 text-silver-400 text-[18px] leading-relaxed max-w-xl mx-auto">
          ARC is free for individuals. Bring your own keys, run local models, or use ours.
          Your code stays on your machine.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/download"
            className="btn-metal inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px]"
          >
            <span>Download for macOS</span>
            <span className="text-silver-700 font-mono text-[12px]">⌘ ↓</span>
          </Link>
          <Link
            href="/download"
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px]"
          >
            Windows · Linux
          </Link>
          <Link
            href="https://github.com"
            className="text-[13px] font-mono uppercase tracking-wider-mono text-silver-400 hover:text-white px-2"
          >
            star on github ↗
          </Link>
        </div>

        {/* small print */}
        <div className="mt-14 grid grid-cols-3 max-w-2xl mx-auto gap-6 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
          <div>
            <div className="text-silver-300">Free tier</div>
            <div className="mt-1 normal-case font-sans text-silver-500">Local + BYOK</div>
          </div>
          <div className="border-x border-white/[0.06]">
            <div className="text-silver-300">14-day Pro</div>
            <div className="mt-1 normal-case font-sans text-silver-500">All features unlocked</div>
          </div>
          <div>
            <div className="text-silver-300">Team plan</div>
            <div className="mt-1 normal-case font-sans text-silver-500">SSO + shared memory</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMarker({ n, label }: { n: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
      <span className="text-silver-300">§ {n}</span>
      <span className="w-8 h-px bg-silver-700" />
      <span>{label}</span>
    </div>
  );
}
