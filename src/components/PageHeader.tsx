import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Section";

/** The home hero's landscape, cut short, as the top of every inner page. */
export default function PageHeader({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative isolate overflow-hidden rounded-stage bg-[#d5e0e2] shadow-[0_0_0_1px_rgba(13,15,16,0.05)]">
        <Image
          src="/img/hero-peaks.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[50%_75%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(244,247,247,0.92)_0%,rgba(244,247,247,0.6)_55%,rgba(244,247,247,0.15)_100%)]"
        />
        <div className="px-5 pb-20 pt-32 text-center sm:pb-28 sm:pt-40">
          <Reveal>
            <h1 className="display mx-auto max-w-[18ch] text-display">{title}</h1>
            {children && (
              <p className="mx-auto mt-5 max-w-[52ch] text-lead text-fg-muted">{children}</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
