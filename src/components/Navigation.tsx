"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/features", label: "Features" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled
          ? "bg-ink-950/70 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* announcement strip — only when at top */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="flex justify-center items-center gap-3 py-2 text-[11px] font-mono tracking-wider-mono uppercase text-silver-400 border-b border-white/[0.04] bg-black/40">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span>v0.4.2 — Multi-agent orchestration is live</span>
          <Link href="/docs" className="text-silver-200 hover:text-white underline-offset-4 hover:underline">
            Read release →
          </Link>
        </div>
      </div>

      <nav className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo / wordmark */}
        <Link href="/" className="group flex items-center gap-3">
          <Logo />
          <span className="font-serif text-[22px] tracking-tight leading-none">
            <span className="metal-text-static">ARC</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider-mono text-silver-500 border border-silver-700/60 px-1.5 py-0.5 rounded">
            v0.4.2
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-9 text-[14px]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://github.com"
            className="text-[13px] font-mono uppercase tracking-wider-mono text-silver-400 hover:text-white transition-colors"
          >
            GitHub ↗
          </Link>
          <Link
            href="/download"
            className="btn-metal text-[13px] px-4 py-2 rounded-full"
          >
            Download
          </Link>
        </div>

        {/* Mobile */}
        <button
          aria-label="Toggle menu"
          className="md:hidden text-silver-200"
          onClick={() => setOpen((s) => !s)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-ink-950/95 backdrop-blur-xl border-b border-white/[0.06] ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-4 text-[15px]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-silver-100" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="btn-metal text-[13px] px-4 py-2.5 rounded-full self-start"
          >
            Download
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5F5F5" />
          <stop offset="0.5" stopColor="#9A9A9A" />
          <stop offset="1" stopColor="#F0F0F0" />
        </linearGradient>
      </defs>
      {/* Arc mark — a refined "A" formed by two arcs meeting at apex */}
      <path
        d="M14 3 L25 24 H20.5 L18.5 19.6 H9.5 L7.5 24 H3 L14 3 Z M11.2 15.8 H16.8 L14 9.7 Z"
        fill="url(#lg)"
      />
      <circle cx="14" cy="14" r="13.5" stroke="rgba(192,192,192,0.18)" />
    </svg>
  );
}
