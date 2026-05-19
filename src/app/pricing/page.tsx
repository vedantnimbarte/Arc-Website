import Link from "next/link";

export const metadata = {
  title: "Pricing — ARC",
  description: "Free for individuals. Pro for power users. Team for organizations.",
};

type Plan = {
  index: string;
  name: string;
  tagline: string;
  price: string;
  unit: string;
  cta: { label: string; href: string };
  ctaVariant: "metal" | "ghost";
  emphasis?: boolean;
  features: string[];
  caption: string;
};

const PLANS: Plan[] = [
  {
    index: "01",
    name: "Free",
    tagline: "For the individual engineer.",
    price: "$0",
    unit: "/ forever",
    cta: { label: "Download", href: "/download" },
    ctaVariant: "ghost",
    features: [
      "Local AI (Ollama, MLX)",
      "BYOK for cloud providers",
      "PTY-backed terminal",
      "CodeMirror editor + LSP",
      "Memory · FTS index",
      "1 active agent",
      "Community support",
    ],
    caption: "No credit card · No telemetry · No nags.",
  },
  {
    index: "02",
    name: "Pro",
    tagline: "For developers who run agents.",
    price: "$20",
    unit: "/ month",
    cta: { label: "Start 14-day trial", href: "/download" },
    ctaVariant: "metal",
    emphasis: true,
    features: [
      "Everything in Free",
      "Cloud AI (ARC routing)",
      "Unlimited agents · parallel",
      "Vector memory + recall",
      "MCP registry · 142 servers",
      "Approval gate orchestration",
      "Priority support · 24h",
    ],
    caption: "Cancel anytime · Annual billing saves 20%.",
  },
  {
    index: "03",
    name: "Team",
    tagline: "For organizations.",
    price: "$40",
    unit: "/ user / mo",
    cta: { label: "Contact sales", href: "#" },
    ctaVariant: "ghost",
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "Team memory · cross-repo",
      "SSO (SAML · Okta · Azure)",
      "Audit logs · SOC 2 reports",
      "Private MCP registry",
      "Dedicated support engineer",
    ],
    caption: "Custom pricing for 50+ seats.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative pt-32 pb-20">
      <section className="relative py-12">
        <div className="absolute inset-0 blueprint-grid blueprint-fade opacity-40 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-8">
            <span className="text-silver-300">§</span>
            <span className="w-8 h-px bg-silver-700" />
            <span>PRICING · TRANSPARENT BY DEFAULT</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end mb-20">
            <h1 className="lg:col-span-7 font-serif text-hero tracking-[-0.035em]">
              Pay for{" "}
              <em className="italic font-normal text-silver-300">power,</em>
              <br />
              not for{" "}
              <span className="metal-text font-semibold">promise.</span>
            </h1>
            <p className="lg:col-span-5 text-silver-400 text-[16px] leading-relaxed max-w-md">
              Every plan ships the same runtime. The difference is scale, support, and the keys we manage for you.
              Local-first by default. Always.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-wider-mono text-silver-500">
            <span>Annual saves 20% · Switch plans anytime</span>
            <span>All prices in USD · Tax may apply</span>
          </div>
        </div>
      </section>

      {/* compare */}
      <section className="relative py-20 border-t border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <h2 className="font-serif text-section tracking-tight mb-12">
            Compare in detail.
          </h2>
          <CompareTable />
        </div>
      </section>

      {/* faq */}
      <section className="relative py-20 border-t border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 mb-3">
              § FAQ · QUESTIONS WE GET
            </div>
            <h2 className="font-serif text-section tracking-tight">
              Reasonable doubts.{" "}
              <em className="italic text-silver-400 font-normal">Straight answers.</em>
            </h2>
          </div>
          <div className="lg:col-span-8 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {FAQ.map((q, i) => (
              <details key={i} className="group py-6">
                <summary className="flex items-start gap-4 cursor-pointer list-none">
                  <span className="text-[11px] font-mono uppercase tracking-wider-mono text-silver-500 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-serif text-[22px] tracking-tight text-silver-100 group-open:metal-text-static">
                    {q.q}
                  </span>
                  <span className="text-silver-400 text-[18px] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="pl-12 pr-8 mt-3 text-silver-400 text-[15px] leading-relaxed">
                  {q.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className={`metal-border relative p-8 ${plan.emphasis ? "lg:-translate-y-3 ring-1 ring-silver-300/20" : ""}`}>
      {plan.emphasis && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-b from-silver-100 to-silver-300 text-ink-950 text-[10px] font-mono uppercase tracking-wider-mono shadow-[0_8px_24px_-6px_rgba(220,220,220,0.4)]">
          ▲ recommended
        </div>
      )}

      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider-mono text-silver-500">
        <span>PLAN · {plan.index}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
      </div>

      <div className="mt-5 font-serif text-[34px] tracking-tight text-silver-50">{plan.name}</div>
      <div className="mt-1 text-silver-400 text-[14px]">{plan.tagline}</div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-serif text-[56px] leading-none metal-text-static">{plan.price}</span>
        <span className="text-silver-500 text-[13px] font-mono uppercase tracking-wider-mono">{plan.unit}</span>
      </div>

      <Link
        href={plan.cta.href}
        className={`mt-7 w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full text-[14px] ${plan.ctaVariant === "metal" ? "btn-metal" : "btn-ghost"}`}
      >
        {plan.cta.label}
      </Link>

      <ul className="mt-8 space-y-3 text-[14px] text-silver-200">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="mt-1 text-silver-400">›</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-5 border-t border-white/[0.06] text-[11px] text-silver-500 leading-relaxed">
        {plan.caption}
      </div>
    </div>
  );
}

function CompareTable() {
  const rows: [string, string, string, string][] = [
    ["Active agents", "1", "Unlimited", "Unlimited · pooled"],
    ["Cloud AI routing", "BYOK", "Included", "Included + custom"],
    ["Vector memory", "—", "✓", "✓ · shared"],
    ["Workspaces", "Local", "Local + sync", "Shared · multi-user"],
    ["MCP servers", "Community", "Registry", "Private registry"],
    ["SSO / SAML", "—", "—", "✓"],
    ["Audit logs", "Local", "Local", "Exportable · SIEM"],
    ["Support", "Community", "24h email", "Dedicated engineer"],
  ];
  return (
    <div className="metal-border overflow-hidden">
      <div className="grid grid-cols-4 gap-px bg-white/[0.06] text-[12px]">
        {/* header */}
        <Cell head>Feature</Cell>
        <Cell head>Free</Cell>
        <Cell head emphasis>Pro</Cell>
        <Cell head>Team</Cell>
        {rows.map((r) => (
          <RowGroup key={r[0]} cells={r} />
        ))}
      </div>
    </div>
  );
}

function RowGroup({ cells }: { cells: [string, string, string, string] }) {
  return (
    <>
      <Cell label>{cells[0]}</Cell>
      <Cell>{cells[1]}</Cell>
      <Cell emphasis>{cells[2]}</Cell>
      <Cell>{cells[3]}</Cell>
    </>
  );
}

function Cell({
  children,
  head,
  label,
  emphasis,
}: {
  children: React.ReactNode;
  head?: boolean;
  label?: boolean;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`bg-ink-950 px-5 py-4 ${head ? "text-[10px] font-mono uppercase tracking-wider-mono text-silver-500" : ""} ${label ? "text-silver-300" : "text-silver-100"} ${emphasis && !head ? "bg-white/[0.02]" : ""} ${emphasis && head ? "text-silver-100" : ""}`}
    >
      {children}
    </div>
  );
}

const FAQ = [
  {
    q: "Does ARC send my code to the cloud?",
    a: "Never by default. ARC is local-first. Cloud AI requests are opt-in per workspace, and only when you choose a cloud provider as your model. Memory, indices, and history stay on your machine.",
  },
  {
    q: "Can I bring my own API keys?",
    a: "Yes — even on Free. ARC supports OpenAI, Anthropic, Google, Mistral, and any OpenAI-compatible endpoint. We never proxy your keys.",
  },
  {
    q: "What models can I run locally?",
    a: "Anything Ollama or MLX supports. ARC auto-detects models on your machine and routes appropriate work locally to save you cost and latency.",
  },
  {
    q: "Is there an enterprise SLA?",
    a: "On Team and above. We offer 99.9% uptime SLAs, custom DPAs, SOC 2 Type II reports, and dedicated support engineers.",
  },
  {
    q: "How do agent approvals work?",
    a: "Six modes ranging from full-auto to per-tool. Every tool call is auditable. You can revoke permission at any time, and agents pause cleanly.",
  },
];
