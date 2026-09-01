import Link from "next/link";
import { REPO, VERSION, RELEASED } from "@/lib/arc";

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
    <footer className="relative border-t border-edge-hair">
      <div className="mx-auto max-w-frame px-6 pb-10 pt-20 lg:px-10">
        <div className="grid gap-12 border-b border-edge-hair pb-14 lg:grid-cols-[1.2fr_1.6fr]">
          <div>
            <p className="display max-w-[18ch] text-[28px] leading-[1.15] tracking-[-0.03em]">
              A terminal, an editor and your git history — in one window.
            </p>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-fg-muted">
              Open source, built with Tauri and Rust. Free for anyone, forever,
              because there is nothing to sell.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="label mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-fg-muted transition-colors hover:text-fg"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            v{VERSION} · released {RELEASED} · MIT
          </p>
          <p className="label">Built in the open</p>
        </div>
      </div>
    </footer>
  );
}
