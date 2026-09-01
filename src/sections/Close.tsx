import Link from "next/link";
import { Reveal } from "@/components/Section";
import { REPO, VERSION, RELEASED } from "@/lib/arc";

export default function Close() {
  return (
    <section className="relative overflow-hidden py-section">
      <div
        aria-hidden
        className="wash left-1/2 top-1/4 h-[560px] w-[860px] -translate-x-1/2 animate-drift bg-[radial-gradient(ellipse,rgba(190,198,214,0.09),transparent_66%)]"
      />

      <div className="relative mx-auto max-w-content px-6 text-center lg:px-10">
        <Reveal>
          <p className="label">Get it</p>
          <h2 className="display mx-auto mt-6 max-w-[15ch] text-hero">
            Close the other windows.
          </h2>
          <p className="mx-auto mt-7 max-w-[46ch] text-lead text-fg-muted">
            Free, MIT licensed, and built for macOS, Windows and Linux. No account,
            no key, no trial to start.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/download" className="btn btn-primary !px-7 !py-3.5 !text-[15px]">
              Download v{VERSION}
            </Link>
            <Link href={REPO} className="btn btn-quiet !px-7 !py-3.5 !text-[15px]">
              Star on GitHub
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <p className="label mt-10">
            Released {RELEASED} · macOS 12+ · Windows 10+ · gtk3
          </p>
        </Reveal>
      </div>
    </section>
  );
}
