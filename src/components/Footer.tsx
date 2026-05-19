import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/download", label: "Download" },
      { href: "/docs", label: "Documentation" },
      { href: "#", label: "Changelog" },
    ],
  },
  {
    title: "Engineering",
    links: [
      { href: "#", label: "Architecture" },
      { href: "#", label: "Runtime spec" },
      { href: "#", label: "Provider matrix" },
      { href: "#", label: "MCP servers" },
      { href: "#", label: "Open source" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "#", label: "Discord" },
      { href: "#", label: "GitHub" },
      { href: "#", label: "Roadmap" },
      { href: "#", label: "Feature voting" },
      { href: "#", label: "Discussions" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Press kit" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06] bg-gradient-to-b from-ink-950 to-black">
      <div className="absolute inset-0 blueprint-grid blueprint-fade opacity-30 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Top — wordmark + manifest */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          <div className="lg:col-span-5">
            <div className="font-serif text-[42px] md:text-[56px] leading-[0.95] tracking-tight">
              <span className="metal-text-static">ARC</span>
              <span className="italic text-silver-400"> — </span>
              <span className="text-silver-100">
                the
                <br />
                <em className="italic font-medium">operating layer</em>
                <br />
                for developers.
              </span>
            </div>
            <p className="mt-6 max-w-md text-silver-400 text-[15px] leading-relaxed">
              Terminal, editor, agents, memory, and orchestration — unified into a single
              intelligent runtime. Engineered for the next decade of software.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span>All systems operational</span>
              <span className="mx-2 text-silver-700">·</span>
              <span>p99 18ms</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-4">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-silver-200 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — version / legal strip */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
            <span>ARC SYSTEMS · 2026</span>
            <span className="text-silver-700">/</span>
            <span>BUILD 8a7c9d2f</span>
            <span className="text-silver-700">/</span>
            <span>RUNTIME v0.4.2</span>
            <span className="text-silver-700">/</span>
            <span>NODE us-east-1</span>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
            Engineered in the open. Signed and verified.
          </div>
        </div>

        {/* huge wordmark — editorial sign-off */}
        <div className="mt-16 select-none">
          <div className="font-serif text-[clamp(5rem,18vw,16rem)] leading-[0.8] tracking-tighter metal-text-static opacity-[0.08]">
            ARC
          </div>
        </div>
      </div>
    </footer>
  );
}
