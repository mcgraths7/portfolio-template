# Build plan

A CMS-driven portfolio template powered by [Sorbet](https://github.com/mcgraths7/sorbet).
The CMS dictates **page layout** — which sections, in what order, in which
variant — as well as **content**. A scaffold script stands the content model up
and seeds it from a named persona template.

**Decisions:** vendored tarballs for distribution · Next.js App Router ·
Sanity (see Phase 2 for why it replaced Contentful) · four personas (software
engineer, graphic designer, photographer, writer/editor).

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
- **Programmatic scrolling silently no-ops** — `scrollTo`, `scrollIntoView` and
  element `scrollTop` all leave the pane at 0. The only way to view deep
  content is a `translateY` shift.
- **Style writes don't apply before same-call measurements.** Setting
  `style.transform` then reading `getBoundingClientRect()` in the same
  `javascript_tool` call measures the OLD state. Use `offsetTop` (transform-
  independent) or split write and read across calls.
- **Captures blank unpredictably beyond ~5000px of translateY shift**, even
  with content filling the frame. Verify deep-page content with DOM and
  computed-style assertions instead of insisting on pixels — a running
  animation's `animationPlayState` is better evidence than a screenshot
  anyway.

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

## Phase 2 — Sanity foundation

Contentful was the original choice; Sanity replaced it at this point, before any
CMS-specific code existed. The reason is that items 8–10 below were *machinery to
work around Contentful* — a hand-built content model as code, an idempotent API
sync script, and a type generator, all to get schema-as-code onto a platform that
does not do it natively. Sanity defines schema in code as its normal mode, so
that work mostly disappears rather than being written and then maintained.

What that buys, beyond less code: the Studio embeds in this app at `/studio`, so
the template ships with its own editor and deploys as one thing rather than
sending someone off to configure a second service. The image pipeline does
hotspot and crop, which matters most for exactly the personas where CMS-sized
images meet fixed frames. And GROQ has no query-complexity budget, which retires
that entire class of concern.

### 7. Sanity project + credentials

You create the project and an API token; I can't create accounts or handle
tokens. `.env.local` is gitignored and push protection is on, so a committed
credential is rejected at push time.

Needed: project ID, dataset (`production`), and a token with write access for
seeding. The read path for published content needs no token.

> **Browser check:** none — no UI yet.

### 8. Schema in code

Sanity schemas under `sanity/schemas/`, which *are* the source of truth rather
than a description of one held elsewhere. Same architecture we wanted, minus the
sync layer.

`page` carries an ordered `sections` array of blocks — that array is how the CMS
dictates layout. Twelve section types, each with a `variant` enum; five linked
document types (`project`, `experience`, `writing`, `testimonial`, `skillGroup`);
one `siteSettings` singleton carrying the Sorbet preset and nav.

Blocks are Sanity's native shape for this, so the editor gets a real ordered list
with per-type forms, rather than Contentful's flat list of linked entries.

> **Browser check:** open the Studio and add a section by hand. This is the first
> time a human sees whether the model makes sense to *edit*, which is a different
> question from whether it makes sense to render.

### 9. Embed the Studio at `/studio`

Mount Sanity Studio inside the Next app. Schema changes ship with a deploy, so
there is no separate provisioning step and no way for the model and the code to
drift apart.

> **Browser check:** the Studio loads, authenticates, and lists the document
> types. Watch for CSS bleed in both directions — the Studio ships its own
> styling and Sorbet's stylesheet is global, so `@layer` boundaries or route
> isolation may need attention.

### 10. Generated types

`sanity typegen` derives TypeScript types from the schema *and* from the GROQ
queries, so a query and its result type cannot disagree. Wire it into
`typecheck` so a schema edit that breaks a query fails CI.

## Phase 3 — Templates and seeding

### 11. Template format + seeding engine

`templates/<persona>.ts` declares the theme preset, the page composition, and
sample content, typechecked against the generated schema types. The engine writes
through `@sanity/client` in a transaction, using deterministic document IDs so a
re-run updates rather than duplicates. Assets upload first, since documents
reference them. `--clean` undoes a seed.

Deterministic IDs are what make this idempotent — no separate upsert protocol to
design, which was most of the old item 9.

### 12. First template end-to-end: software engineer

> **Browser check:** the seeded documents in the Studio — content that reads like
> a real portfolio, not lorem ipsum, because this is what every persona is
> judged against. Confirm a second run of the seed changes nothing.

## Phase 4 — Rendering

### 13. Fetch layer

GROQ queries returning the generated section union, with references resolved by
projection. Published vs draft via perspective, so preview is a parameter rather
than a second code path.

No complexity budget to manage here — that was a Contentful constraint and it
left with it. The thing to watch instead is **fetching whole documents when a
projection would do**: GROQ will happily return everything, and a section only
ever needs its own fields.

### 14. Section registry + first two sections

The core mechanism: content type → component, then a switch on `variant`.
Unknown type or variant renders loudly in dev and is skipped in production.
Hero and ProjectGrid first — between them they exercise the variant switch and
linked-entry rendering.

> **Browser check:** reorder sections in the Studio and reload — the page
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

### 18. Draft preview + revalidation

Next draft mode against the `previewDrafts` perspective; a Sanity webhook
revalidates on publish. Sanity's Presentation tool can also put the live site
side by side with the editor, with click-to-edit — worth wiring here, since
in-context editing was the main thing Storyblok would have won on.

> **Browser check:** edit and publish in the Studio, then reload the live page
> without redeploying. Confirm a draft is visible in preview and *not* in
> production. If Presentation is wired, confirm clicking an element opens the
> right field.

### 19. Deploy

Vercel, env vars configured.

> **Browser check:** the deployed site, on a real phone as well as a desktop
> viewport. A clean CI build from the committed tarballs is the other half.

### 20. Document it

README covering setup, the scaffold command, adding a section type or persona,
and re-vendoring Sorbet.

---

## Phase 6 — Studio experience (deferred)

Sanity Studio is itself a React app, so the editing experience is not fixed —
gaps can be closed by writing components. That is the answer to the one thing
Storyblok would have done better, and it is why the CMS choice came down to
schema-as-code: the schema win is permanent, the editing gap is closable.

Deferred deliberately, not forgotten. Everything here is **code we own** and
keep working across Studio upgrades, so it earns its place when the editing
experience actually needs it — after real content exists and a real person has
tried to arrange a page. Ranked by value.

### 21. Previews on every section block

The default rendering of an array of twelve section types is a list of
near-identical rows, which is *worse* for arranging a page than what Contentful
would have given. A `prepare` per section type turns that same array into a
readable page outline:

```
Hero · split · "Steven McGrath"
Projects · masonry · 6 items
Experience · timeline · 4 roles
```

Highest value of anything in this phase: it is most of the difference between a
model that makes sense to render and one that makes sense to edit.

### 22. A visual variant picker

`variant` is the mechanism the whole architecture rests on, and as a dropdown of
strings — `split`, `centered`, `portrait`, `fullBleed` — it means nothing to a
non-developer. As four small layout diagrams it explains itself.

One custom input component, reused across all twelve section types.

### 23. Structure Builder

`siteSettings` as a genuine singleton rather than a list containing one item;
documents grouped rather than dropped in a flat sidebar. Papercuts, but they are
the first thing anyone sees.

### 24. Presentation / click-to-edit

Closes the Storyblok gap most directly: click an element on the live page, land
on the field that produces it. Mostly configuration plus stega data attributes
on the front end rather than building an editor, so it is cheaper than it
sounds. Overlaps with step 18 — do the draft-preview wiring there first, then
this on top.

> **Note:** verify the Studio component APIs against current Sanity docs when
> starting any of these. That area moves faster than the rest of the platform,
> and this plan will be stale.

**What customization cannot reach:** Storyblok is visual-first by architecture;
Sanity is form-first with a preview alongside. These get close, and 24 gets
closer, but the editor's mental model stays "fill in fields" rather than "edit
the page". For someone maintaining their own portfolio a few times a year, that
is a fine trade — worth revisiting only if that assumption turns out wrong.

---

## Risks

- **Re-vendoring friction.** Every Sorbet change needs a re-pack and commit.
  Fine while iterating; if it grates, switching to a real registry changes only
  the dependency specifier.
- **Layout-from-CMS has a ceiling.** Section order plus per-section variants
  covers a lot; arbitrary nesting does not. When a persona wants something the
  variants can't express, widen the variant rather than special-casing in code.
- **Sanity free-tier limits** — 3 users, 500k API requests/month, 5 GB assets,
  1 GB bandwidth. Comfortable for a portfolio, but the seeding script uploads
  assets on every persona, so `--clean` mattering is partly about not accreting
  orphaned images.
- **GROQ is a new language** to whoever maintains this. Keep queries in one
  place with the generated types beside them, rather than scattered inline.
