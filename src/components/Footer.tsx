import Link from "next/link";
import { REPO, VERSION, RELEASED } from "@/lib/arc";
import { Mark } from "@/components/Navigation";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/download", label: "Download" },
      { href: "/docs", label: "Documentation" },
      { href: `${REPO}/releases`, label: "Releases" },
    ],
  },
  {
    title: "Source",
    links: [
      { href: REPO, label: "Repository" },
      { href: `${REPO}/blob/main/CONTRIBUTING.md`, label: "Contributing" },
      { href: `${REPO}/blob/main/SECURITY.md`, label: "Security policy" },
      { href: `${REPO}/blob/main/LICENSE`, label: "MIT licence" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: `${REPO}/issues`, label: "Issues" },
      { href: `${REPO}/discussions`, label: "Discussions" },
      { href: `${REPO}/pulls`, label: "Pull requests" },
      { href: "https://github.com/vedantnimbarte/Wingman", label: "Wingman" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-content px-5 pb-10 pt-6 sm:px-6 lg:px-10">
      <div className="grid gap-12 border-t border-edge-line pt-12 lg:grid-cols-[1fr_auto]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2" aria-label="ARC home">
            <Mark size={20} />
            <span className="display text-[16px] tracking-[-0.02em]">ARC</span>
          </Link>
          <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-fg-muted">
            A terminal, an editor and your git history, in one window.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-14 gap-y-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[13.5px] text-fg-muted transition-colors hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          v{VERSION}, released {RELEASED}. MIT licensed.
        </p>
        <p className="label">
          Photos by{" "}
          <a href="https://unsplash.com/@asoggetti" className="underline-offset-4 hover:underline">
            Alessio Soggetti
          </a>{" "}
          and{" "}
          <a href="https://unsplash.com/@inggridkoe" className="underline-offset-4 hover:underline">
            Inggrid Koe
          </a>{" "}
          on Unsplash
        </p>
      </div>
    </footer>
  );
}
