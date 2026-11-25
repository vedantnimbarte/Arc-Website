"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { REPO, RELEASE_URL, VERSION } from "@/lib/arc";
import { AssembledWindow } from "@/components/workspace/Panels";
import { EASE, Stagger, StaggerItem, blurIn } from "@/components/Section";

const SHELLS = ["bash", "zsh", "PowerShell", "cmd", "Nu", "WSL"];

/**
 * One orchestrated entrance: the copy comes into focus line by line, then
 * ARC's window rises out of the fog. Scrolling lifts the window and lets
 * the landscape fall behind it.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const windowY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const step = (delay: number) => ({
    variants: blurIn,
    initial: "hidden",
    animate: "shown",
    custom: delay,
  });

  return (
    <section ref={ref} className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative isolate overflow-hidden rounded-stage bg-[#d5e0e2] shadow-[0_0_0_1px_rgba(13,15,16,0.05)]">
        {/* the landscape */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ y: photoY }}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <Image
            src="/img/hero-peaks.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_62%]"
          />
        </motion.div>
        {/* fog over the sky, so the type sits on something calm */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(244,247,247,0.92)_0%,rgba(244,247,247,0.55)_38%,rgba(244,247,247,0)_70%)]"
        />

        <div className="px-5 pt-32 text-center sm:pt-40">
          <motion.div {...step(0.15)}>
            <Link
              href={RELEASE_URL}
              className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1 text-[12.5px] text-fg-muted shadow-[0_0_0_1px_rgba(13,15,16,0.06)] backdrop-blur-md transition-colors hover:text-fg"
            >
              <span className="inline-block h-1.5 w-1.5 animate-breathe rounded-full bg-[#2FA866]" />
              v{VERSION} is out
            </Link>
          </motion.div>

          <h1 className="display mx-auto mt-6 text-hero">
            <motion.span className="block" {...step(0.3)}>
              Your shell, and
            </motion.span>
            <motion.span className="block" {...step(0.42)}>
              everything around it.
            </motion.span>
          </h1>

          <motion.p className="mx-auto mt-5 max-w-[46ch] text-lead text-fg-muted" {...step(0.6)}>
            A desktop workspace built on a real PTY. Terminal, editor, git, SSH,
            databases and a REST client, side by side in one window.
          </motion.p>

          <motion.div className="mt-7 flex flex-wrap items-center justify-center gap-2.5" {...step(0.74)}>
            <Link href="/download" className="btn btn-primary">
              Download for free
            </Link>
            <Link href={REPO} className="btn btn-quiet">
              View source
            </Link>
          </motion.div>
        </div>

        {/* the window, cut off by the bottom of the stage */}
        <div className="mt-14 flex h-[clamp(230px,40vw,520px)] justify-center overflow-hidden px-4 sm:mt-16 sm:px-8">
          {/* outer layer follows the scroll, inner layer does the entrance */}
          <motion.div aria-hidden className="w-full min-w-[720px] max-w-[1080px]" style={{ y: windowY }}>
            <motion.div
              className="window-frame h-[clamp(320px,46vw,640px)]"
              initial={{ opacity: 0, y: 160 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.85 }}
            >
              <AssembledWindow className="rounded-[12px]" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* what it runs, under the stage */}
      <Stagger
        className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-7 gap-y-2 px-5 py-8 text-[14px] text-fg-muted"
        gap={0.06}
      >
        <StaggerItem className="w-full text-center text-[12.5px] text-fg-subtle sm:w-auto">
          Runs the shell you already use
        </StaggerItem>
        {SHELLS.map((s) => (
          <StaggerItem key={s} className="flex items-center gap-2">
            <span aria-hidden className="font-mono text-[12px] text-fg-faint">
              ❯
            </span>
            {s}
          </StaggerItem>
        ))}
        <StaggerItem className="text-fg-subtle">or any binary</StaggerItem>
      </Stagger>
    </section>
  );
}
