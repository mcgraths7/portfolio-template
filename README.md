# portfolio-template

A CMS-driven portfolio template. [Contentful](https://www.contentful.com)
dictates both the **content** and the **page layout**; the code maps each
section's content type and `variant` onto a composition of
[Sorbet](https://github.com/mcgraths7/sorbet) components.

A scaffold script stands the content model up from scratch and seeds it from a
named persona template — software engineer, graphic designer, photographer,
writer — so a new portfolio is one command away from real content.

## Status

Under construction. Working through the plan in order:

- [x] Next.js App Router skeleton
- [x] Vendor Sorbet and render something from it
- [ ] Theme + provider wiring
- [ ] Contentful space and credentials
- [ ] Content model as code, and the sync script
- [ ] Template format and the seeding engine
- [ ] Fetch layer
- [ ] Section registry and the sections themselves
- [ ] The four persona templates
- [ ] SEO, draft preview, deploy

## Contributing

`main` is protected by the "Protect main" ruleset: pull requests only, no
force-push, no deletion. All work goes branch → commit → push → PR.

## Requirements

Node 24 (see `.nvmrc`) and pnpm via corepack.

## Development

```bash
pnpm install
pnpm dev
```

Then <http://localhost:5186>.

```bash
pnpm build       # production build
pnpm typecheck   # tsc --noEmit
```

## Sorbet is vendored, not installed

Sorbet is unpublished, so its two packages are committed here as tarballs in
`vendor/` and installed with `file:` specifiers. No registry and no auth are
involved, and CI or a deploy builds from what is checked in.

To pull in Sorbet changes:

```bash
pnpm sync:sorbet                       # expects ../sorbet
SORBET_DIR=~/code/sorbet pnpm sync:sorbet
```

`pnpm-workspace.yaml` carries an `overrides` entry redirecting
`@sorbet/design-system` to the vendored tarball. It is load-bearing: packing
rewrites the component library's `workspace:*` dependency to a plain version,
so without the redirect pnpm looks for it on npm and the install 404s. Two
traps worth knowing — pnpm 11 reads `overrides` only from
`pnpm-workspace.yaml`, ignoring them in `package.json` with a warning; and
`--ignore-workspace` skips that file, so never install with it here.

## Notes

Sorbet owns styling — there is no Tailwind and no CSS modules here. The system
stylesheet and the active theme preset provide the reset, the design tokens and
every component's styles; `src/app/globals.css` is for the rare thing a site
genuinely needs on top.

Components split across the React Server Component boundary: layout primitives,
typography, cards and link-flavoured buttons render on the server with no client
bundle, while interactive pieces carry their own `"use client"`. `src/app/page.tsx`
is a Server Component demonstrating both halves.

There is no linter configured yet, deliberately — bring your own, or wait for a
baseline worth editing.
