import type { PersonaTemplate } from "./types.ts";

/**
 * The software-engineer persona. Midnight preset — the deep-blue dark theme
 * reads as terminal-adjacent without being a gimmick.
 *
 * The content is fictional but written to be worth stealing: someone cloning
 * this template should be able to replace names and keep the *shape* — summary
 * lines that state what changed and for whom, stack chips that are specific,
 * stats that are measurable.
 */
export const softwareEngineer: PersonaTemplate = {
  persona: "software-engineer",
  preset: "midnight",

  settings: {
    name: "Alex Reyes",
    tagline: "Systems-minded product engineer",
    avatar: { asset: "avatar", alt: "Portrait of Alex Reyes" },
    social: [
      { platform: "GitHub", url: "https://github.com/example" },
      { platform: "Mastodon", url: "https://hachyderm.io/@example" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/example" },
    ],
    footer: "Built with Sorbet. Content lives in Sanity.",
  },

  assets: {
    avatar: { label: "AR", hues: [260, 290], width: 600, height: 600 },
    "cover-relay": { label: "Relay", hues: [250, 280], width: 1200, height: 800 },
    "cover-quench": { label: "Quench", hues: [230, 260], width: 1200, height: 800 },
    "cover-parcel": { label: "Parcel Watch", hues: [270, 300], width: 1200, height: 800 },
    "cover-tally": { label: "Tally", hues: [240, 270], width: 1200, height: 800 },
    "cover-fathom": { label: "Fathom", hues: [280, 310], width: 1200, height: 800 },
    "cover-drift": { label: "Drift", hues: [220, 250], width: 1200, height: 800 },
    "logo-northline": { label: "Northline", hues: [250, 250], width: 320, height: 160 },
    "logo-arcadia": { label: "Arcadia", hues: [270, 270], width: 320, height: 160 },
    "logo-fieldnote": { label: "Fieldnote", hues: [240, 240], width: 320, height: 160 },
    "og-home": { label: "Alex Reyes — Engineer", hues: [255, 285], width: 1200, height: 630 },
  },

  projects: [
    {
      slug: "relay",
      title: "Relay",
      summary:
        "An event-sourced job queue that replaced a nightly batch pipeline. p95 processing latency went from six hours to forty seconds.",
      year: 2025,
      role: "Design & implementation",
      stack: ["TypeScript", "Postgres", "NOTIFY/LISTEN", "OpenTelemetry"],
      repo: "https://github.com/example/relay",
      cover: { asset: "cover-relay", alt: "Relay project cover" },
      body: [
        "Northline's fulfilment ran on a nightly batch: orders placed after 4pm shipped a day late, and a single poison record could stall the whole run. Relay replaced it with an event-sourced queue on plain Postgres — no new infrastructure, because the ops team was two people.",
        "The interesting part is the failure model. Every job is an immutable event; workers claim with SKIP LOCKED and publish results as new events, so a crash mid-job is indistinguishable from never having started. Poison records park themselves in a dead-letter table with the full event chain attached, which turned debugging from log archaeology into a SELECT.",
      ],
    },
    {
      slug: "quench",
      title: "Quench",
      summary:
        "A query-cost linter for GraphQL schemas. Fails CI on resolver patterns that amplify under load, before they reach production.",
      year: 2025,
      role: "Creator & maintainer",
      stack: ["TypeScript", "GraphQL", "AST analysis"],
      url: "https://quench.dev",
      repo: "https://github.com/example/quench",
      cover: { asset: "cover-quench", alt: "Quench project cover" },
      body: [
        "Every GraphQL outage I've been paged for had the same shape: a query that was fine at ten items and catastrophic at ten thousand. Quench walks the schema and the resolver map together and flags the amplifying patterns — unbounded list fields resolved per-parent, missing dataloaders, pagination that pages in the application layer.",
        "It runs as a CI check with a budget file, so a team decides once what 'too expensive' means and the linter holds the line. Adopted by three teams I've never met, which is the best code review I've ever received.",
      ],
    },
    {
      slug: "parcel-watch",
      title: "Parcel Watch",
      summary:
        "Reverse-engineered courier tracking into one push feed. 40k users; runs on a single €4 VPS.",
      year: 2024,
      role: "Solo project",
      stack: ["Go", "SQLite", "Web Push"],
      url: "https://parcelwatch.app",
      cover: { asset: "cover-parcel", alt: "Parcel Watch project cover" },
      body: [
        "Fourteen courier portals, zero usable APIs. Parcel Watch polls each one with per-carrier adapters, normalises the fiction each of them calls a status model, and pushes only transitions that matter — out for delivery, failed attempt, customs hold.",
        "The constraint was cost: it had to run indefinitely on pocket money. Go, SQLite in WAL mode, and aggressive ETag caching keep 40,000 users on one small VPS with headroom to spare.",
      ],
    },
    {
      slug: "tally",
      title: "Tally",
      summary:
        "Accessible form primitives extracted from three rewrites of the same signup flow. WCAG 2.2 AA, headless, 4kB.",
      year: 2024,
      role: "Design & implementation",
      stack: ["TypeScript", "React", "ARIA"],
      repo: "https://github.com/example/tally",
      cover: { asset: "cover-tally", alt: "Tally project cover" },
      body: [
        "After rewriting the same signup flow at three companies, I extracted the part that was always the actual work: validation timing, error announcement, focus management. Tally is the 4kB of that which survives contact with a screen reader.",
        "Headless on purpose — it owns behaviour and ARIA wiring, never pixels. The test suite drives NVDA and VoiceOver via automation rather than asserting on attributes, because the attributes lie.",
      ],
    },
    {
      slug: "fathom",
      title: "Fathom",
      summary:
        "Query-plan visualiser for Postgres. Paste an EXPLAIN, see where the time actually goes; used in three conference talks I know of.",
      year: 2023,
      role: "Solo project",
      stack: ["TypeScript", "SVG", "Postgres"],
      url: "https://fathom.example.dev",
      cover: { asset: "cover-fathom", alt: "Fathom project cover" },
      body: [
        "EXPLAIN ANALYZE output is a wall of text ordered by tree position, but you read it looking for time. Fathom renders the plan as a flame-graph-like tree scaled by actual duration, with row-estimate errors highlighted — the two things that explain most slow queries.",
      ],
    },
    {
      slug: "drift",
      title: "Drift",
      summary:
        "Schema-drift detector for teams running migrations by hand. Diffs production against the migration history and opens the PR nobody wanted to write.",
      year: 2022,
      role: "Creator",
      stack: ["Go", "Postgres", "GitHub API"],
      repo: "https://github.com/example/drift",
      cover: { asset: "cover-drift", alt: "Drift project cover" },
      body: [
        "Every team says production matches the migrations. Drift checks. It introspects the live schema nightly, diffs it against what the migration history claims, and opens a PR containing the missing migration — with the diff as the description, so the argument about how it happened has something to point at.",
      ],
    },
  ],

  experience: [
    {
      slug: "northline-staff",
      role: "Staff Engineer",
      organisation: "Northline",
      start: "2023-03-01",
      summary:
        "Own reliability for the fulfilment platform: event pipeline, oncall health, and the boring migrations nobody else wants. Cut page volume 60% by deleting alerts that never predicted anything.",
      logo: { asset: "logo-northline", alt: "Northline logo" },
    },
    {
      slug: "arcadia-senior",
      role: "Senior Engineer",
      organisation: "Arcadia Health",
      start: "2020-06-01",
      end: "2023-02-01",
      summary:
        "Patient-scheduling systems. Led the migration off a nine-year-old monolith without a rewrite: strangler routes, contract tests, and eighteen months of restraint.",
      logo: { asset: "logo-arcadia", alt: "Arcadia Health logo" },
    },
    {
      slug: "fieldnote-engineer",
      role: "Product Engineer",
      organisation: "Fieldnote",
      start: "2018-01-01",
      end: "2020-05-01",
      summary:
        "Fourth engineer at a field-research startup. Built offline-first sync for notebooks used where connectivity is a rumour; learned that conflict resolution is a product decision wearing a technical costume.",
      logo: { asset: "logo-fieldnote", alt: "Fieldnote logo" },
    },
    {
      slug: "freelance",
      role: "Freelance Developer",
      organisation: "Independent",
      start: "2015-09-01",
      end: "2017-12-01",
      summary:
        "Small sites and smaller invoices. The years that taught me to ship, estimate, and say no — roughly in that order.",
    },
  ],

  writing: [
    {
      slug: "boring-queues",
      title: "You probably don't need a message broker",
      publication: "alexreyes.dev",
      date: "2025-11-04",
      url: "https://example.dev/boring-queues",
      summary:
        "SKIP LOCKED, a jobs table, and the operational maturity you already have. Where the Postgres-as-queue pattern holds up, and the two places it genuinely doesn't.",
    },
    {
      slug: "oncall-debt",
      title: "Alert debt is worse than tech debt",
      publication: "Increment-ish",
      date: "2025-03-18",
      url: "https://example.dev/oncall-debt",
      summary:
        "Every alert that fires without action teaches your team to ignore the next one. A framework for deleting alerts, and the numbers from doing it for a year.",
    },
    {
      slug: "migration-restraint",
      title: "The strangler pattern is a discipline, not an architecture",
      publication: "alexreyes.dev",
      date: "2024-07-02",
      url: "https://example.dev/migration-restraint",
      summary:
        "Eighteen months of migrating a monolith nobody was allowed to freeze. What contract tests bought us, and the week we nearly gave up.",
    },
    {
      slug: "a11y-tests-lie",
      title: "Your accessibility tests are passing and your app is not accessible",
      publication: "Tally blog",
      date: "2024-02-13",
      url: "https://example.dev/a11y-tests-lie",
      summary:
        "Asserting on ARIA attributes tests that you wrote attributes, not that a screen reader works. Driving NVDA in CI, and what it caught that axe-core never would.",
    },
  ],

  skillGroups: [
    {
      slug: "languages",
      label: "Languages",
      skills: ["TypeScript", "Go", "SQL", "Rust (reading fluency)"],
    },
    {
      slug: "systems",
      label: "Systems",
      skills: ["Postgres", "Event sourcing", "Queues & backpressure", "Observability", "SQLite"],
    },
    {
      slug: "web",
      label: "Web",
      skills: ["React", "Accessibility (WCAG 2.2)", "Next.js", "Design systems", "GraphQL"],
    },
    {
      slug: "practices",
      label: "Practices",
      skills: ["Incident command", "Contract testing", "Technical writing", "Mentoring"],
    },
  ],

  pages: [
    {
      slug: "home",
      title: "Alex Reyes — systems-minded product engineer",
      seo: {
        description:
          "Staff engineer who makes distributed systems boring. Projects, writing, and a decade of production scar tissue.",
        ogImage: { asset: "og-home", alt: "Alex Reyes — systems-minded product engineer" },
      },
      sections: [
        {
          type: "sectionHero",
          variant: "split",
          eyebrow: "Staff Engineer at Northline",
          heading: "I make distributed systems boring.",
          lead: "Ten years of taking exciting production incidents and turning them into systems nobody has to think about. Currently owning reliability for a fulfilment platform that ships a million parcels a month.",
          image: { asset: "avatar", alt: "Portrait of Alex Reyes" },
          actions: [
            { label: "See my work", href: "#projects" },
            { label: "Get in touch", href: "#contact" },
          ],
        },
        {
          type: "sectionStats",
          variant: "row",
          stats: [
            { value: "10 yrs", label: "shipping to production" },
            { value: "60%", label: "page volume deleted, not silenced" },
            { value: "40k", label: "users on a €4 VPS" },
            { value: "4", label: "talks worth of Postgres opinions" },
          ],
        },
        {
          type: "sectionAbout",
          variant: "prose",
          heading: "About",
          body: [
            "I'm a product engineer who gravitates to the systems underneath: queues, schedulers, sync, the migration everyone is avoiding. The throughline is a preference for boring technology operated well over exciting technology operated heroically.",
            "The rest of the throughline is accessibility. I've shipped WCAG 2.2 AA as a hard requirement at two companies, and I maintain form primitives that treat a screen reader as the first-class client rather than the bug report.",
          ],
        },
        {
          type: "sectionProjectGrid",
          variant: "featuredFirst",
          heading: "Selected work",
          intro: "Six projects, each one a system that outlived its excitement.",
          projects: ["relay", "quench", "parcel-watch", "tally", "fathom", "drift"],
        },
        {
          type: "sectionExperience",
          variant: "timeline",
          heading: "Experience",
          items: ["northline-staff", "arcadia-senior", "fieldnote-engineer", "freelance"],
        },
        {
          type: "sectionSkills",
          variant: "grouped",
          heading: "Skills",
          groups: ["languages", "systems", "web", "practices"],
        },
        {
          type: "sectionWriting",
          variant: "list",
          heading: "Writing",
          intro: "Occasional, opinionated, mostly about production.",
          items: ["boring-queues", "oncall-debt", "migration-restraint", "a11y-tests-lie"],
        },
        {
          type: "sectionCta",
          variant: "banner",
          heading: "Building something that has to stay up?",
          intro: "I take on occasional advisory work around reliability and data-layer design.",
          actions: [{ label: "Email me", href: "mailto:alex@example.dev" }],
        },
        {
          type: "sectionContact",
          variant: "links",
          heading: "Elsewhere",
          email: "alex@example.dev",
          links: [
            { label: "GitHub", href: "https://github.com/example" },
            { label: "Mastodon", href: "https://hachyderm.io/@example" },
            { label: "CV as PDF", href: "https://example.dev/cv.pdf" },
          ],
        },
      ],
    },
  ],
};
