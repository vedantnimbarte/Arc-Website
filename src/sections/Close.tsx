"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Section";
import { REQUIREMENTS, VERSION } from "@/lib/arc";

export default function Close() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="mx-auto max-w-content px-5 pb-20 pt-4 sm:px-6 lg:px-10">
      <div className="relative isolate overflow-hidden rounded-stage bg-[#c9d2d0] shadow-[0_0_0_1px_rgba(13,15,16,0.05)]">
        <motion.div aria-hidden className="absolute inset-[-10%_0] -z-10" style={{ y: photoY }}>
          <Image src="/img/fog-pines.jpg" alt="" fill sizes="(min-width: 1120px) 1120px, 100vw" className="object-cover object-[50%_40%]" />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(238,241,241,0.82)_0%,rgba(238,241,241,0.35)_55%,rgba(238,241,241,0)_100%)]"
        />

        <div className="px-6 pb-36 pt-20 text-center sm:pb-48 sm:pt-24">
          <Reveal>
            <h2 className="display text-display">
              Close the other windows.
            </h2>
            <p className="mx-auto mt-4 max-w-[40ch] text-[15px] leading-relaxed text-fg-muted">
              Free and MIT licensed. No account, no key, no trial.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Link href="/download" className="btn btn-primary mt-7">
              Download v{VERSION}
            </Link>
          </Reveal>
        </div>
      </div>

      <p className="label mt-5 text-center">
        {REQUIREMENTS.mac}, {REQUIREMENTS.windows.split(" · ")[0]}, or Linux with gtk3
      </p>
    </section>
  );
}
