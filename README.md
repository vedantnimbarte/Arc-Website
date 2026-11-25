# ARC — website

The marketing site for [ARC](https://github.com/vedantnimbarte/Arc), an open-source
desktop developer workspace built with Tauri and Rust.

Next.js 14 App Router, Tailwind and Framer Motion. A pale, misty page with ARC's own
dark windows set into it; the hero window rises out of a landscape as the page loads.

**Live:** https://arc-website-black.vercel.app

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Does |
|--------|------|
| `npm run dev` | Dev server with Fast Refresh |
| `npm run build` | Production build; every route prerenders static |
| `npm start` | Serve the production build |
| `npm run lint` | `next lint` |
| `npx tsc --noEmit` | Type-check without emitting |

Node 20+. There is no database, no API route and no environment variable — the whole
site is static.

---

## The one rule

**Nothing goes on this site that the [ARC repo](https://github.com/vedantnimbarte/Arc)
doesn't actually ship.**

This site previously claimed a version that didn't exist, sold pricing tiers for an
MIT-licensed app with no billing code, and carried six named testimonials and a
benchmark table that were invented. All of it is gone. Before adding any claim,
number, logo or quote, check it against the code, the README, or a real GitHub
release. If it isn't in one of those, it doesn't go on the page.

Where a feature depends on something external — the optional Claude Code and Wingman
panels — the copy says so. "Early and rough" is a better line than invented traction.

### Product facts live in one file

Everything version-specific is in [`src/lib/arc.ts`](src/lib/arc.ts): the version,
release date, the real release asset filenames and sizes, platform requirements, and
the ten Rust crates. Nothing else in the codebase hardcodes a version.

**Cutting a release means updating `VERSION` and `RELEASED` there, and nothing else.**
If asset filenames changed, update `BUILDS` too — the sizes come from the GitHub API:

```bash
gh release view v0.3.0 --repo vedantnimbarte/Arc \
  --json assets --jq '.assets[] | select(.name|endswith(".sig")|not)
  | "\(.name)  \((.size/1048576*10|floor)/10) MB"'
```

---

## Structure

```
public/img/                 Two Unsplash photos (credits in the footer)
src/
├── app/
│   ├── layout.tsx          Fonts, metadata, nav + footer shell, skip link
│   ├── template.tsx        Route transition, and MotionConfig for reduced motion
│   ├── page.tsx            Home — composes the sections below
│   ├── globals.css         Colour variables and the component classes
│   ├── features/           Full capability list, grouped as the app groups it
│   ├── docs/               Getting started, guides, links into the repo
│   └── download/           Real v0.3.0 release assets
├── components/
│   ├── Navigation.tsx      Floating header, mobile drawer, the ARC mark
│   ├── Footer.tsx
│   ├── PageHeader.tsx      The landscape header on Features, Docs, Download
│   ├── Section.tsx         <Section>, <Reveal>, <Stagger> and the blurIn variant
│   └── workspace/
│       └── Panels.tsx      ARC's real panels, rebuilt in DOM
├── lib/
│   └── arc.ts              Every product fact
└── sections/
    ├── Hero.tsx            Headline, and the window rising out of the fog
    ├── OneWorkspace.tsx    "Edit. Run. Commit." typed out, and the branch diagram
    ├── TheWindow.tsx       The dark band: the window, with region hotspots
    ├── Capabilities.tsx    Nine things that ship today, each with a line drawing
    ├── Architecture.tsx    The ten crates under rust/
    ├── InTheOpen.tsx       Licence, privacy, signing status
    └── Close.tsx           Download, over the second photo
```

---

## Design system

### Colour

The page is a pale, cool fog. ARC's windows keep the app's own `ARC Dark` greys
(`apps/frontend/src/themes/index.ts` in the app repo), so they read as the real thing
set into the page.

| Token | Value | Used for |
|-------|-------|----------|
| `page` | `#EEF1F1` | Page ground |
| `paper` | `#FFFFFF` | Cards |
| `ink` | `#0D0F10` | Text, primary buttons, the dark band |
| `fg` | CSS variable | Text, with `muted` / `subtle` / `faint` below it |
| `edge` | CSS variable | Hairlines: `hair`, `line`, `lit` |
| `base` / `chrome` / `panel` | `#161618` / `#222224` / `#28282A` | ARC window surfaces |
| `live` | `#5BD68C` | **Status only.** Never decoration |

**`fg`, `edge` and `accent` flip.** They're CSS variables set to ink-on-fog in `:root`
and back to ARC Dark inside `.app-window` and `.on-dark`. That's why `Panels.tsx` uses
plain `text-fg-muted` and still renders light-on-dark. Put `on-dark` on any dark block
(the band, code chips) and the text ramp follows. Variable colours don't take Tailwind
`/alpha` modifiers; use `ink/[0.04]` for tints instead.

### Type

| Role | Face | Notes |
|------|------|-------|
| Display | **Archivo** | Weight 600, tight tracking, via `.display` |
| Body | **Inter** | 400/500/600 |
| Code, the typed headline | **JetBrains Mono** | The font ARC's own terminal ships with |

The scale is in `tailwind.config.ts` as `text-hero`, `text-display`, `text-section` and
`text-lead`, all `clamp()`. Section headlines are two lines; the second steps back in
`fg-subtle` (`<Section title="…" sub="…">`). No uppercase eyebrows.

### Layout

- Big surfaces (hero, the white diagram card, the dark band, the closing banner) are
  `rounded-stage` (28px) and sit 12–20px in from the viewport edge
- Everything else lines up on `max-w-content` (1120px)
- Cards are `.surface` (white, 20px); illustrations sit in a grey `.well` inside them

Component classes live in `@layer components` in `globals.css`, so a Tailwind utility on
the same element (`hidden`, `mt-*`) always wins. Keep new ones in there.

### Motion

Framer Motion, one easing curve (`EASE` in `Section.tsx`, `[0.22, 1, 0.36, 1]`) and one
signature move: **content comes into focus** — `blur(10px)` and 14px low, to sharp and
in place. That's the `blurIn` variant, used by `<Reveal>` and `<Stagger>`.

| Where | What |
|-------|------|
| Every route | Fades in from a blur (`app/template.tsx`) |
| Hero | Badge, both headline lines, lead and buttons focus in on a stagger; then the window rises 160px out of the fog. On scroll the window lifts and the photo falls behind |
| One workspace | Headline types out with a block caret; branches draw out from the centre tile, then dots and labels land |
| Dark band | Window rises in, and stands up from a 10° tilt as it scrolls into place |
| Card grids | Cards focus in one after another |
| Closing banner | Photo parallax, headline focuses in |

`<Reveal delay={ms}>` passes its delay through `custom`. Don't set `delay: 0` in a
variant — it would override a parent's `staggerChildren`.

Framer writes its own `transform`, so an element it animates can't also be centred
with Tailwind's `-translate-x-1/2`: put the translate on a plain wrapper (see
`OneWorkspace.tsx`).

---

## Accessibility floor

Meeting these isn't optional in a change:

- Skip link to `#main`, first thing in `<body>`
- `:focus-visible` is restyled, never removed
- `MotionConfig reducedMotion="user"` drops all movement for visitors who ask; blur and
  opacity fades still run, and CSS animations are cut to nothing
- The hero window is `aria-hidden` — it's a decorative duplicate of copy that already
  exists as text. The typed headline has an `aria-label` with the whole phrase
- Region hotspots in `TheWindow` are real `<button>`s with labels, driven by focus as
  well as hover
- The text ramp (`fg` → `muted` → `subtle`) is set by contrast. `faint` is decorative —
  don't put real copy in it

---

## Performance

From `npm run build`:

| Route | Size | First Load JS |
|-------|------|---------------|
| `/` | 16.1 kB | 152 kB |
| `/docs`, `/download`, `/features` | 0.9 kB | 137 kB |

All routes prerender static. Fonts are self-hosted through `next/font/google`. The two
photos go through `next/image`, so visitors get resized WebP/AVIF, not the 2400px JPEGs.

---

## Before you open a PR

```bash
npx tsc --noEmit
npm run build
```

Then look at it — at 1440×900 and at 375×812, and with reduced motion on. Most of the
page arrives by animation; a passing build tells you nothing about whether it lands.

---

## Licence

The ARC application is [MIT](https://github.com/vedantnimbarte/Arc/blob/main/LICENSE).
