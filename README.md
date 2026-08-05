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
- [ ] Vendor Sorbet and render something from it
- [ ] Theme + provider wiring
- [ ] Contentful space and credentials
- [ ] Content model as code, and the sync script
- [ ] Template format and the seeding engine
- [ ] Fetch layer
- [ ] Section registry and the sections themselves
- [ ] The four persona templates
- [ ] SEO, draft preview, deploy

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

## Notes

Sorbet owns styling — there is no Tailwind and no CSS modules here. The system
stylesheet and the active theme preset provide the reset, the design tokens and
every component's styles; `src/app/globals.css` is for the rare thing a site
genuinely needs on top.
