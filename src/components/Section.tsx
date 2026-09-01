"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/reveal";

/**
 * Every section opens the same way: a quiet label, a headline, an optional
 * aside. No numbering — these sections are a set, not a sequence, and
 * numbering them would claim an order the content doesn't have.
 */
export function Section({
  label,
  title,
  aside,
  children,
  className = "",
  wide = false,
}: {
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section className={`py-section ${className}`}>
      <div className={`mx-auto px-6 lg:px-10 ${wide ? "max-w-frame" : "max-w-content"}`}>
        <Reveal>
          <p className="label">{label}</p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="display max-w-[19ch] text-display">{title}</h2>
            {aside && <p className="max-w-sm text-[15px] leading-relaxed text-fg-muted">{aside}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/** Eases its children up into place the first time they come into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
