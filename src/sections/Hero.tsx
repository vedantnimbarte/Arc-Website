import Link from "next/link";
import HeroTerminal from "@/components/HeroTerminal";

export default function Hero() {
  return (
    <section className="relative pt-28 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
      {/* background layers */}
      <div className="absolute inset-0 bg-radial-vignette" />
      <div className="absolute inset-0 blueprint-grid blueprint-fade opacity-60" />

      {/* metallic glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[600px] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,220,220,0.08)_0%,_transparent_55%)]" />
      </div>

      {/* soft drifting glow blobs */}
      <div className="absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,_rgba(192,192,192,0.06)_0%,_transparent_70%)] animate-drift pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,_rgba(120,120,120,0.06)_0%,_transparent_70%)] animate-drift pointer-events-none" style={{ animationDelay: "-15s" }} />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Section marker — § 001 · HERO */}
        <div className="flex items-center gap-3 mb-8 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
          <span className="text-silver-300">§ 001</span>
          <span className="w-8 h-px bg-silver-700" />
          <span>HERO · INTRODUCTION</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: messaging */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* small descriptor chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-300">
                Now in early access · macOS · Windows · Linux
              </span>
            </div>

            {/* Headline — editorial Lora */}
            <h1 className="mt-6 font-serif text-hero font-medium tracking-[-0.035em] text-silver-50">
              The{" "}
              <span className="metal-text font-semibold">AI-native</span>
              <br />
              terminal for
              <br />
              <em className="italic font-normal text-silver-200">modern</em>{" "}
              engineering.
            </h1>

            <p className="mt-7 text-[17px] leading-relaxed text-silver-400 max-w-xl">
              Terminal, editor, agents, memory, and orchestration — unified into a single
              intelligent runtime. ARC turns your shell into a thinking surface.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/download"
                className="btn-metal inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px]"
              >
                <span>Download ARC</span>
                <span className="text-silver-700 text-[12px] font-mono">⌘ ↓</span>
              </Link>
              <Link
                href="/docs"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px]"
              >
                View documentation
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#community"
                className="text-[13px] font-mono uppercase tracking-wider-mono text-silver-400 hover:text-white transition-colors px-2"
              >
                Join community ↗
              </Link>
            </div>

            {/* Tech metadata strip */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["startup", "0.4s"],
                ["first token", "18ms"],
                ["context", "200K"],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
                    {label}
                  </div>
                  <div className="mt-1 font-serif text-[22px] text-silver-100">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: terminal */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <div className="relative">
              {/* annotated dimension lines */}
              <div className="hidden xl:block absolute -left-12 top-8 bottom-8 w-px bg-silver-700/40">
                <div className="absolute -left-1 top-0 w-2 h-px bg-silver-500" />
                <div className="absolute -left-1 bottom-0 w-2 h-px bg-silver-500" />
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-mono uppercase tracking-wider-mono text-silver-600">
                  RUNTIME / 1
                </div>
              </div>
              <HeroTerminal />
            </div>
          </div>
        </div>

        {/* bottom rule + caption — feels like a film slate */}
        <div className="mt-20 flex items-center gap-4">
          <div className="rule flex-1" />
          <div className="text-[10px] font-mono uppercase tracking-wider-mono text-silver-600">
            scroll to capabilities
          </div>
          <div className="rule flex-1" />
        </div>
      </div>
    </section>
  );
}
