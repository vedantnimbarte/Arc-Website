type Quote = {
  body: string;
  name: string;
  handle: string;
  role: string;
  code?: string;
};

const QUOTES: Quote[] = [
  {
    body:
      "ARC feels like the first tool that actually treats my shell as a programmable surface. Agents call my CLIs. My CLIs call agents. It just composes.",
    name: "Tova Markland",
    handle: "@tova",
    role: "Staff Engineer · Linear",
  },
  {
    body:
      "Switched our team off four windows of Cursor + iTerm + ChatGPT in a week. The integrated memory across files and shell history is the unlock.",
    name: "Ravi Chandrasekar",
    handle: "@ravi.cs",
    role: "Eng Lead · Stripe",
  },
  {
    body:
      "The approval gates are what made it possible to actually run agents on real code. I trust ARC because it shows me exactly what it's about to do.",
    name: "Maja Nilsson",
    handle: "@majanilsson",
    role: "Founder · Klepton",
    code: "arc agent --scope server/ --approve per-tool",
  },
  {
    body:
      "First terminal where opening a new tab doesn't feel like a context reset. The memory layer remembers what I was doing yesterday.",
    name: "Devon Park",
    handle: "@devonp",
    role: "Principal · Vercel",
  },
  {
    body:
      "We replaced three internal tools with MCP servers wired into ARC. Devs ship 30% more PRs/week. Numbers don't lie.",
    name: "Sami Ortega",
    handle: "@sami.o",
    role: "VP Eng · Railway",
  },
  {
    body:
      "Watching the agent open a diff, write a test, run pnpm, fail, fix itself, and commit — and never leaving my terminal — is the future I was promised.",
    name: "Anders Vogel",
    handle: "@andersv",
    role: "Indie · arc.run/u/andersv",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionMarker n="006" label="EVIDENCE · IN THEIR WORDS" />

        <div className="mt-8 mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-serif text-display tracking-tight max-w-3xl">
            What engineers are saying{" "}
            <em className="italic text-silver-400 font-normal">
              after they stop typing.
            </em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUOTES.map((q, i) => (
            <Card key={i} q={q} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ q, delay }: { q: Quote; delay: number }) {
  return (
    <article
      className="metal-border p-7 relative group hover:-translate-y-1 transition-transform duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="absolute top-2 right-2 text-[9px] font-mono uppercase tracking-wider-mono text-silver-700">
        ⤴ verified
      </span>

      {/* quote mark */}
      <div className="font-serif text-[64px] leading-none text-silver-700 -mt-2">&ldquo;</div>

      <p className="-mt-3 text-silver-100 text-[15px] leading-relaxed">{q.body}</p>

      {q.code && (
        <div className="mt-4 px-3 py-2 rounded bg-black/40 border border-white/[0.06] font-mono text-[11.5px] text-silver-300 overflow-hidden">
          <span className="text-silver-500">$ </span>{q.code}
        </div>
      )}

      <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center gap-3">
        {/* silver avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-silver-200 to-silver-500 flex items-center justify-center text-ink-950 font-semibold text-[13px]">
          {q.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] text-silver-100 font-medium leading-tight">{q.name}</div>
          <div className="text-[11px] font-mono text-silver-500 truncate">{q.handle} · {q.role}</div>
        </div>
      </div>
    </article>
  );
}

function SectionMarker({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
      <span className="text-silver-300">§ {n}</span>
      <span className="w-8 h-px bg-silver-700" />
      <span>{label}</span>
    </div>
  );
}
