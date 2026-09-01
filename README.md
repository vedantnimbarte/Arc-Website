# ARC — website

The marketing site for [ARC](https://github.com/vedantnimbarte/Arc), an open-source
desktop developer workspace built with Tauri and Rust.

Next.js 14 App Router, Tailwind, and a React Three Fiber hero that pulls ARC's four
panels apart in space and reassembles them into the application as you scroll.

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
src/
├── app/
│   ├── layout.tsx          Fonts, metadata, nav + footer shell, skip link
│   ├── page.tsx            Home — composes the seven sections
│   ├── globals.css         Design tokens and every non-utility class
│   ├── features/           Full capability list, grouped as the app groups it
│   ├── docs/               Getting started, guides, links into the repo
│   └── download/           Real v0.3.0 release assets
├── components/
│   ├── Navigation.tsx      Fixed header, mobile drawer
│   ├── Footer.tsx
│   ├── Section.tsx         Shared <Section> and <Reveal> primitives
│   ├── HeroScene.tsx       The WebGL scene (client-only, lazy)
│   └── workspace/
│       └── Panels.tsx      ARC's real panels, rebuilt in DOM
├── lib/
│   ├── arc.ts              Every product fact
│   └── reveal.ts           useReveal, useScrollProgress, useReducedMotion
└── sections/
    ├── Hero.tsx            The exploded workspace
    ├── BuiltOn.tsx         The real dependency stack, as a marquee
    ├── Capabilities.tsx    Nine things that ship today
    ├── TheWindow.tsx       The assembled window, with region hotspots
    ├── Architecture.tsx    The ten crates under rust/
    ├── InTheOpen.tsx       Licence, privacy, signing status
    └── Close.tsx           Download
```

---

## Design system

### Colour

Surfaces are lifted from ARC's own `ARC Dark` theme
(`apps/frontend/src/themes/index.ts` in the app repo), so the panels rendered here are
the same greys as the panels in the application.

| Token | Value | Used for |
|-------|-------|----------|
| `void` | `#08080A` | Page ground — deliberately *below* the app's own base, so a window reads as a lit object resting on the page |
| `base` | `#161618` | Panel bodies (ARC `bgBase`) |
| `chrome` | `#222224` | Title bars (ARC `bgChrome`) |
| `panel` | `#28282A` | Raised surfaces (ARC `bgPanel`) |
| `fg` | `#EEF0F3` | Text (ARC `fgBase`), with `muted` / `subtle` / `faint` below it |
| `accent` | `#C8CAD0` | ARC's own accent silver |
| `live` | `#5BD68C` | **Status only.** Never decoration |

`live`, `warn` and `gone` are semantic. A green dot means something is running; it is
not there to add colour to a dark page.

### Type

| Role | Face | Notes |
|------|------|-------|
| Display | **Archivo** | Variable, `wdth` axis, set to ~112% width and weight 600 via `.display`. Machined rather than editorial |
| Body | **Inter** | 400/500/600 |
| Labels, data, code | **JetBrains Mono** | The font ARC's own terminal ships with |

The scale is in `tailwind.config.ts` as `text-hero`, `text-display`, `text-section` and
`text-lead` — all `clamp()`, so nothing needs a breakpoint to resize.

`.label` is the one-off utility for the uppercase mono eyebrows: 10.5px, `0.16em`
tracking, `fg-subtle`.

### Layout

- `max-w-content` (1240px) for reading columns, `max-w-frame` (1600px) for full-bleed
- `py-section` — `clamp(6rem, 13vw, 11.5rem)` — is the vertical rhythm between sections
- Horizontal padding is always `px-6 lg:px-10`

### Sections are not numbered

The previous design put `§ 001`, `§ 002` markers on every section. They're gone: those
sections are a *set*, not a sequence, and numbering claimed an order the content didn't
have. Numbering survives in exactly one place — the docs getting-started steps, which
genuinely are ordered.

New sections use the shared primitives:

```tsx
<Section label="What it does" title="…" aside="…">
  {cards.map((c, i) => (
    <Reveal key={c.title} delay={(i % 3) * 90} className="h-full">
      <Card {...c} />
    </Reveal>
  ))}
</Section>
```

### Motion

There is no animation library. Motion is `useReveal` (one IntersectionObserver) plus
CSS transitions on a single easing curve, `--ease-soft`.

**`useReveal` carries a 1.6s failsafe.** If an observer is slow or never fires, the
element is shown anyway — content must never be stranded at `opacity: 0` because of a
missed callback. If you write another reveal mechanism, give it the same guarantee.

---

## The hero scene

ARC's pitch is that four tools live in one window. So the page opens with those four
panels pulled apart in space, and reassembles them into the application as you scroll.

**The slabs are real geometry** — `RoundedBox` with a physical material, lit by a key
light from the upper left that matches the light baked into the `.surface` CSS class.
**The panel faces are DOM**, rendered through drei's `<Html transform>`, so the type
stays crisp at any zoom instead of turning into a blurry texture.

Panel positions are in world units in `SLABS`. The assembled arrangement tiles into one
window 6.4 wide by 4.0 tall; the exploded arrangement is a receding fan that leaves the
centre clear for the headline. `Rig` lerps between them on scroll progress.

### Things that will bite you

**R3F v8 silently never renders inside a `position: sticky` container.** The `<canvas>`
mounts at the correct pixel size with a live WebGL context, `useFrame` never ticks,
`onCreated` never fires, and *nothing* draws — not even a `meshBasicMaterial` box at the
origin. There is no console error and no Next.js overlay. The cause is
`react-use-measure`, whose default `scroll: true` never resolves a size in that
position. The fix is one prop:

```tsx
<Canvas resize={{ scroll: false, debounce: 0 }}>
```

**`body { overflow-x: hidden }` compounds it** by turning body into a scroll container.
`globals.css` uses `html { overflow-x: clip }` instead — `clip` doesn't create one.
Don't change this back.

**Keep the scene outside the `<Suspense>` that wraps `<Environment>`.** If the
environment map suspends, a boundary around it will hide every sibling in that boundary,
including the whole scene. Reflections come from `<Lightformer>` children rather than a
downloaded HDRI, so nothing on the page reaches the network for an asset.

**`HTML_UNIT` is a measured constant.** drei lays `<Html transform>` out in its own
CSS3D space whose unit isn't the world unit; `31.6` is the empirical ratio between them.
If faces stop fitting their slabs, re-measure rather than guessing.

### Fallbacks

| Condition | What renders |
|-----------|--------------|
| `prefers-reduced-motion: reduce` | `StaticWorkspace` — the same window, already assembled |
| No WebGL context | `StaticWorkspace` |
| Hero scrolled off screen | Scene stays mounted, `frameloop="never"` — no wasted GPU |
| Viewport under 640px | Cluster sits lower; cursor parallax off under 768px |

`three`, `@react-three/fiber` and `@react-three/drei` are loaded via
`next/dynamic({ ssr: false })`, so they stay out of First Load JS entirely.

---

## Accessibility floor

Meeting these isn't optional in a change:

- Skip link to `#main`, first thing in `<body>`
- `:focus-visible` is restyled, never removed
- `prefers-reduced-motion` disables the WebGL scene, the reveals and the card tilt
- The 3D panel faces are `aria-hidden` — they're decorative duplicates of copy that
  already exists as text
- Region hotspots in `TheWindow` are real `<button>`s with labels, driven by focus as
  well as hover
- The text ramp (`fg` → `muted` → `subtle`) is set by contrast, matching how ARC solves
  its own themes. `faint` is decorative — don't put real copy in it

---

## Performance

From `npm run build`:

| Route | Size | First Load JS |
|-------|------|---------------|
| `/` | 9.01 kB | 103 kB |
| `/docs`, `/download`, `/features` | 1.19 kB | 95.3 kB |

All routes prerender static. Fonts are self-hosted through `next/font/google`, so
there's no render-blocking request to a font CDN.

---

## Before you open a PR

```bash
npx tsc --noEmit
npm run build
```

Then look at it — at 1440×900 and at 375×812, and with reduced motion on. The hero has
three distinct states (exploded, assembling, assembled) and two paths (WebGL and
fallback); a build passing tells you nothing about whether they look right.

---

## Licence

The ARC application is [MIT](https://github.com/vedantnimbarte/Arc/blob/main/LICENSE).
