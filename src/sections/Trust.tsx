const LOGOS = [
  "OpenAI",
  "Anthropic",
  "Ollama",
  "Tauri",
  "Rust",
  "React",
  "TypeScript",
  "Vercel",
  "Stripe",
  "Linear",
];

export default function Trust() {
  return (
    <section className="relative py-20 border-y border-white/[0.04] bg-black/40 overflow-hidden">
      {/* fade gradients on edges */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-ink-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-ink-950 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <div className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
            ◇ Engineered on a foundation of open systems ◇
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="marquee-track">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <LogoTile key={i} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoTile({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 shrink-0 px-10 group">
      <span className="w-1.5 h-1.5 rounded-full bg-silver-600 group-hover:bg-silver-200 transition-colors" />
      <span className="font-serif text-[26px] tracking-tight metal-text-static opacity-70 group-hover:opacity-100 transition-opacity">
        {name}
      </span>
    </div>
  );
}
