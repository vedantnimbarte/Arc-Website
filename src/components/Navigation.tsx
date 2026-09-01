"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { REPO } from "@/lib/arc";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/docs", label: "Docs" },
  { href: "/download", label: "Download" },
];

export default function Navigation({ version }: { version: string }) {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        lifted ? "border-b border-edge-hair bg-void/72 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-frame items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ARC home">
          <Mark />
          <span className="display text-[19px] tracking-[-0.02em]">ARC</span>
          <span className="label hidden rounded border border-edge-hair px-1.5 py-px sm:inline-block">
            v{version}
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-[14px] md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              data-active={path === l.href}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link href={REPO} className="label transition-colors hover:text-fg">
            GitHub ↗
          </Link>
          <Link href="/download" className="btn btn-primary !px-4 !py-2 !text-[13px]">
            Download
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="p-1 text-fg md:hidden"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="flex flex-col gap-[5px]">
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span className={`block h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-edge-hair bg-void/95 backdrop-blur-xl transition-[max-height,border] duration-500 ease-soft md:hidden ${
          open ? "max-h-72 border-b" : "max-h-0 border-b-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-5 text-[15px]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-fg-muted">
              {l.label}
            </Link>
          ))}
          <Link href={REPO} className="text-fg-muted">
            GitHub ↗
          </Link>
          <Link href="/download" className="btn btn-primary self-start !py-2 !text-[13px]">
            Download
          </Link>
        </div>
      </div>
    </header>
  );
}

/** The mark: an arc closing over a terminal caret. */
function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.6 19.2A10 10 0 1 1 20.4 19.2"
        stroke="url(#arcg)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M9 10.4l3 2.6-3 2.6" stroke="#EEF0F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.6 16.2h2.6" stroke="#8B8D95" strokeWidth="1.6" strokeLinecap="round" />
      <defs>
        <linearGradient id="arcg" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F2F3F5" />
          <stop offset="0.55" stopColor="#8B8D95" />
          <stop offset="1" stopColor="#EEF0F3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
