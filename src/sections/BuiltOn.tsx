/**
 * The libraries ARC is actually built on. Not customers, not partners —
 * the dependency list, which is the only "logo wall" an open-source tool
 * has any business showing.
 */

const STACK = [
  "Tauri 2",
  "Rust",
  "portable-pty",
  "tokio",
  "tantivy",
  "russh",
  "sqlx",
  "SQLite",
  "React 18",
  "CodeMirror 6",
  "xterm.js",
  "Zustand",
  "Vite",
  "Tailwind",
];

export default function BuiltOn() {
  return (
    <section className="relative overflow-hidden border-y border-edge-hair py-16">
      <div className="mx-auto mb-9 max-w-content px-6 lg:px-10">
        <p className="label text-center">Standing on</p>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-void to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-void to-transparent"
        />

        <ul className="flex w-max animate-rail hover:[animation-play-state:paused]">
          {[...STACK, ...STACK].map((name, i) => (
            <li
              key={i}
              className="flex shrink-0 items-center gap-3 px-8 text-[19px] text-fg-subtle transition-colors hover:text-fg"
            >
              <span className="h-1 w-1 rounded-full bg-accent-dim" aria-hidden />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
