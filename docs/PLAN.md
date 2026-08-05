# Build plan

A Contentful-driven portfolio template powered by [Sorbet](https://github.com/mcgraths7/sorbet).
The CMS dictates **page layout** — which sections, in what order, in which
variant — as well as **content**. A scaffold script stands the content model up
and seeds it from a named persona template.

**Decisions:** vendored tarballs for distribution · Next.js App Router ·
Contentful · four personas (software engineer, graphic designer, photographer,
writer/editor).

---

## Two rules that shape every step

### 1. Sorbet gets fixed upstream, generally

Sorbet is under active development, and this template is the first thing to
consume it from outside its own monorepo. It will keep surfacing gaps. When it
does:

- **Fix it in Sorbet, not here.** A workaround in this repo leaves the bug in
  place for every other consumer, and leaves us maintaining a divergence.
- **Fix the general case, not our case.** `ToastProvider` was not "broken for
  this template" — it was broken for every SSR consumer. The fix should read
  like it was always meant to be that way.
- **Add a regression test to Sorbet's own checks**, aimed at the *class* of
  bug rather than the instance, so the next one fails a build instead of a
  page. `check:consumable` now server-renders all 115 components because of one
  portal.
- **Re-vendor with `pnpm sync:sorbet`** and confirm the fix in the browser here.
- If something genuinely is portfolio-specific, it belongs in this repo — but
  that should be the rare case, and worth saying out loud when it happens.

### 2. Compiling is not working

A green build says the types line up. It does not say the page renders, that it
survives hydration, or that anything is usable. The `ToastProvider` bug passed
type-check, lint, the `"use client"` gate, and the import check — and 500'd the
moment a browser asked for the page.

So: **every step that renders something gets checked in the browser**, not just
built. The steps below carry a **Browser check** line saying what specifically
to look at, and a **Sorbet risk** line naming what is most likely to break.

Known hazards in this environment, worth remembering when a check looks wrong:

- Screenshots come out **blank whenever the page is scrolled** (`scrollY > 0`).
  Verify with DOM geometry, or shift the content up, rather than concluding the
  page is broken.
- `read_page` lists **hidden elements** — both tab panels show even when one is
  `display: none`. Read the DOM state to know what is actually visible.
- rAF, `ResizeObserver` and scroll events **starve between tool calls**. Take a
  screenshot to pump a frame, then read state.
- Each `javascript_tool` call **implicitly clicks the page**, dismissing open
  popovers. Do the action in one call and read the result in the next.

---

## Phase 0 — Make Sorbet consumable ✅

| # | Item | State |
| --- | --- | --- |
| 1 | `"use client"` on the 37 interactive modules, plus a gate that enforces the split | [sorbet#67](https://github.com/mcgraths7/sorbet/pull/67) |
| 2 | `pack:vendor` — build and pack the tarballs an outside project vendors | [sorbet#68](https://github.com/mcgraths7/sorbet/pull/68) |
| 3 | `check:consumable` — prove the packages work outside the monorepo | [sorbet#69](https://github.com/mcgraths7/sorbet/pull/69) |

Two traps found here, both now guarded and documented:
`pnpm pack` rewrites `workspace:*` to a bare version, so the consumer needs an
`overrides` redirect; and pnpm 11 reads `overrides` only from
`pnpm-workspace.yaml`, ignoring them in `package.json` — while
`--ignore-workspace` skips that file entirely.

## Phase 1 — Skeleton

| # | Item | State |
| --- | --- | --- |
| 4 | Next.js App Router skeleton, Sorbet-ready | done |
| 5 | Vendor Sorbet, render across the RSC boundary | done |
| 6 | Theme + provider wiring | done |

### 6. Theme + provider wiring

Providers in one client boundary that takes `children`, so the page tree stays
server-rendered. An inline script in `<head>` applies the saved theme before
first paint. A three-mode control (system/light/dark), since "follow the OS" is
a real choice a toggle cannot express.

`<html>` must **not** carry a default `data-theme`: Sorbet's dark rule is
`:root:not([data-theme="light"])` inside a `prefers-color-scheme` query, so a
hardcoded default pins every visitor to light and breaks system mode. Next's own
guide suggests one — it assumes a different CSS shape.

> **Browser check:** no flash when a stored choice differs from the OS setting
> (set `localStorage` and hard-reload, both directions); no hydration warning in
> the console; page content still present in `curl` output, proving the client
> boundary didn't swallow the server tree; all three modes actually switch.
>
> **Sorbet risk:** realised twice. `ToastProvider` needed
> [sorbet#70](https://github.com/mcgraths7/sorbet/pull/70) for portalling to
> `document.body` during render, and `ThemeProvider` needed
> [sorbet#71](https://github.com/mcgraths7/sorbet/pull/71) for reading
> `localStorage` in a `useState` initializer — a hydration mismatch that left
> the theme control showing "System" while the stored choice was "Light".
>
> The second one is the instructive one: it threw nothing, logged nothing
> obvious, and built clean. Only comparing the control against storage in a
> browser found it. Expect more of this shape, and check state against its
> source rather than trusting that a page looks right.

## Phase 2 — Contentful foundation

### 7. Space + credentials

You create the space and a Content Management API token; I can't create accounts
or handle tokens. `.env*` is gitignored and push protection is on, so a
committed credential is rejected at push time.

> **Browser check:** none — no UI yet.

### 8. Content model as code

TypeScript definitions as the single source of truth, driving the sync script,
the generated renderer types, and typechecking of the seed templates. Mirrors
how Sorbet's tokens generate its Sass.

`page` carries an ordered `sections` array linking to any section type — that
array is how the CMS dictates layout. Twelve section types, each with a `variant`
enum; five linked entry types.

**Set explicit link-count validations on every rich text field.** A rich text
field's GraphQL complexity is the *maximum* its validations permit, defaulting to
1000 — at 20 sections that is 20,000 against an 11,000 budget, and a hard failure
before anything real is fetched.

> **Browser check:** none — but verify the content types in the Contentful web
> app, which is the first time a human sees whether the model makes sense.

### 9. Idempotent content-type sync

`scaffold sync` creates or updates content types via the CMA. Re-runnable
without error or duplication.

### 10. Generated TS types

Emitted from the same definitions, including the discriminated union of section
types.

## Phase 3 — Templates and seeding

### 11. Template format + seeding engine

`templates/<persona>.ts` declares the theme preset, the page composition, and
sample content. The engine upserts entries, resolves links in dependency order,
uploads placeholder assets, and publishes. `--clean` undoes a seed.

### 12. First template end-to-end: software engineer

> **Browser check:** the seeded entries in Contentful — content that reads like
> a real portfolio, not lorem ipsum, because this is what every persona is
> judged against.

## Phase 4 — Rendering

### 13. Fetch layer

Typed fetching with link resolution, returning the generated section union.
Draft vs published via the preview token.

**Always set an explicit `limit` on every collection field.** Omitted or `0`
defaults to 100, and nested collections multiply — one forgotten limit is
100 × 100 against a budget of 11,000. Assert on the
`X-Contentful-Graphql-Query-Cost` response header so cost is a number we watch
rather than a cliff we walk off; with SSG these run at build time, so
`TOO_COMPLEX_QUERY` breaks a deploy rather than slowing a page.

### 14. Section registry + first two sections

The core mechanism: content type → component, then a switch on `variant`.
Unknown type or variant renders loudly in dev and is skipped in production.
Hero and ProjectGrid first — between them they exercise the variant switch and
linked-entry rendering.

> **Browser check:** reorder sections in Contentful and reload — the page
> reorders. Change a hero's `variant` — the layout changes with no code edit.
> That round trip *is* the feature; nothing else proves it.
>
> **Sorbet risk:** first real use of `Frame` and image handling. Watch for
> layout shift and aspect-ratio handling with CMS-sized images.

### 15. Remaining sections

The other ten, composed strictly from Sorbet primitives. Anything that can't be
built from the library is a genuine gap — log it against Sorbet rather than
reaching for a bespoke `<div>`.

> **Browser check:** every section in every variant, at mobile and desktop
> widths. Keyboard-navigate anything interactive.
>
> **Sorbet risk:** the highest of any step — this mounts most of the library
> for the first time. `Masonry` and `Marquee` use `ResizeObserver`, `Carousel`
> uses `IntersectionObserver`, `Menu` and the pickers use the Popover API,
> `Modal` and `Drawer` use native `<dialog>`. All server-render cleanly, but
> "renders on the server" and "behaves after hydration" are different claims —
> and observers starve between tool calls, so pump a frame before reading state.

### 16. Remaining three personas

Graphic designer, photographer, writer/editor — new template files only. If a
persona needs a code change beyond a new variant, the section model is too rigid
and should be widened.

> **Browser check:** each persona seeded and rendered end to end. They should
> look genuinely different, not recoloured.
>
> **Sorbet risk:** photographer leans hardest on `Masonry`, `Carousel` and
> `Frame` — the gallery-heavy path is where layout bugs will show.

## Phase 5 — Production

### 17. SEO, metadata, sitemap

Per-page metadata from the CMS, OG images, `sitemap.xml`, `robots.txt`.

> **Browser check:** view source, not the rendered page — metadata correctness
> is a question about the HTML.

### 18. Draft preview + webhook revalidation

Next draft mode against the preview API; a Contentful webhook revalidates on
publish.

> **Browser check:** edit and publish in Contentful, then reload the live page
> without redeploying. Also confirm a draft is visible in preview and *not* in
> production.

### 19. Deploy

Vercel, env vars configured.

> **Browser check:** the deployed site, on a real phone as well as a desktop
> viewport. A clean CI build from the committed tarballs is the other half.

### 20. Document it

README covering setup, the scaffold command, adding a section type or persona,
and re-vendoring Sorbet.

---

## Risks

- **Re-vendoring friction.** Every Sorbet change needs a re-pack and commit.
  Fine while iterating; if it grates, switching to a real registry changes only
  the dependency specifier.
- **Layout-from-CMS has a ceiling.** Section order plus per-section variants
  covers a lot; arbitrary nesting does not. When a persona wants something the
  variants can't express, widen the variant rather than special-casing in code.
- **Contentful free-tier limits** on content types and locales. The model is
  ~19 types, comfortably inside, but confirm once the space exists.
