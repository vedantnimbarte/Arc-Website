"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { REPO } from "@/lib/arc";
import { EASE } from "@/components/Section";

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
    <MotionConfig reducedMotion="user">
      <motion.header
        className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-5"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div
          className={`mx-auto max-w-[1180px] overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl transition-shadow duration-500 ${
            lifted || open
              ? "shadow-[0_0_0_1px_rgba(13,15,16,0.06),0_14px_36px_-16px_rgba(13,15,16,0.28)]"
              : "shadow-[0_0_0_1px_rgba(13,15,16,0.05)]"
          }`}
        >
          <nav className="flex h-14 items-center justify-between pl-4 pr-2.5">
            <Link href="/" className="flex items-center gap-2" aria-label="ARC home">
              <Mark />
              <span className="display text-[17px] tracking-[-0.02em]">ARC</span>
              <span className="hidden rounded-md bg-ink/[0.05] px-1.5 py-px font-mono text-[10.5px] text-fg-muted sm:inline-block">
                v{version}
              </span>
            </Link>

            <div className="hidden items-center gap-8 text-[13.5px] md:flex">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="nav-link" data-active={path === l.href}>
                  {l.label}
                </Link>
              ))}
              <Link href={REPO} className="nav-link">
                GitHub
              </Link>
            </div>

            <Link href="/download" className="btn btn-primary hidden !px-4 !py-2 !text-[13px] md:inline-flex">
              Download
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center text-fg md:hidden"
              onClick={() => setOpen((s) => !s)}
            >
              <span className="flex flex-col gap-[5px]">
                <span
                  className={`block h-px w-5 bg-current transition-transform duration-300 ${
                    open ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </nav>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="drawer"
                className="md:hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="flex flex-col gap-1 border-t border-edge-hair px-2.5 pb-3 pt-2 text-[15px]">
                  {[...LINKS, { href: REPO, label: "GitHub" }].map((l) => (
                    <Link key={l.label} href={l.href} className="rounded-xl px-2 py-2.5 text-fg-muted hover:bg-ink/[0.04]">
                      {l.label}
                    </Link>
                  ))}
                  <Link href="/download" className="btn btn-primary mt-2 justify-center !py-2.5 !text-[14px]">
                    Download
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </MotionConfig>
  );
}

/** The mark: an arc closing over a terminal caret. */
export function Mark({ size = 22, tone = "#0D0F10" }: { size?: number; tone?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.6 19.2A10 10 0 1 1 20.4 19.2" stroke={tone} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 10.4l3 2.6-3 2.6" stroke={tone} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.6 16.2h2.6" stroke={tone} strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
