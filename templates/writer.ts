import type { PersonaTemplate } from "./types.ts";

/**
 * The writer/editor persona. Ocean preset — cool, editorial, ink-adjacent.
 * Prose-dominant: the writing list is the centre of gravity, galleries and
 * grids are absent, and the blurbs ride a quote carousel.
 */
export const writer: PersonaTemplate = {
  persona: "writer",
  preset: "ocean",

  settings: {
    name: "Ada Quinn",
    tagline: "Essayist & editor",
    avatar: { asset: "avatar", alt: "Portrait of Ada Quinn" },
    social: [
      { platform: "Mastodon", url: "https://hachyderm.io/@example" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/example" },
    ],
    footer: "Ada Quinn writes about infrastructure, memory, and the North Sea.",
  },

  assets: {
    avatar: { label: "AQ", hues: [200, 220], width: 600, height: 600 },
    "og-home": { label: "Ada Quinn — Essayist", hues: [195, 225], width: 1200, height: 630 },
  },

  writing: [
    {
      slug: "sea-walls",
      title: "The sea walls are a diary",
      publication: "Granta-ish Quarterly",
      date: "2026-05-14",
      url: "https://example.dev/sea-walls",
      summary:
        "Every repair on the Frisian dikes records a storm someone survived. Reading four centuries of masonry as a first-person document.",
    },
    {
      slug: "last-switchboard",
      title: "The last switchboard operator in Europe",
      publication: "Longform Review",
      date: "2025-11-02",
      url: "https://example.dev/last-switchboard",
      summary:
        "Marta still connects forty calls a day on an exchange the phone company forgot to decommission. On obsolescence as a kind of care.",
    },
    {
      slug: "cold-storage",
      title: "Cold storage",
      publication: "The Believer-ish",
      date: "2025-03-19",
      url: "https://example.dev/cold-storage",
      summary:
        "My grandmother's freezer held food for a famine that never came. An essay on inherited fear, in eleven frozen objects.",
    },
    {
      slug: "editing-grief",
      title: "Editing grief",
      publication: "Craft & Draft",
      date: "2024-09-30",
      url: "https://example.dev/editing-grief",
      summary:
        "What twelve years of editing other people's memoirs taught me about the sentences we cut when the truth gets close.",
    },
    {
      slug: "ferry-timetable",
      title: "Notes toward a ferry timetable",
      publication: "Coastal Review",
      date: "2024-02-11",
      url: "https://example.dev/ferry-timetable",
      summary: "The islands measure time in crossings. A winter of riding every route on the schedule, in order.",
    },
    {
      slug: "book-undertow",
      title: "Undertow (Hollow Lane Press, 2023)",
      publication: "Book",
      date: "2023-10-01",
      url: "https://example.dev/undertow",
      summary:
        "Essays on the North Sea coast — shortlisted for a prize just obscure enough to be credible. 'Quinn writes like the tide: patiently, then all at once.'",
    },
  ],

  experience: [
    {
      slug: "freelance-essayist",
      role: "Essayist",
      organisation: "Freelance",
      start: "2019-01-01",
      summary: "Long-form essays and reported features for print quarterlies and the better class of newsletter.",
    },
    {
      slug: "hollow-lane",
      role: "Contributing Editor",
      organisation: "Hollow Lane Press",
      start: "2021-06-01",
      summary: "Acquiring and editing narrative non-fiction. Twelve books shepherded; two still speak to me.",
    },
    {
      slug: "tidsskrift",
      role: "Senior Editor",
      organisation: "Tidsskrift Quarterly",
      start: "2014-03-01",
      end: "2018-12-01",
      summary: "Ran the features desk of a bilingual quarterly. Learned to cut a writer's favourite sentence kindly.",
    },
  ],

  testimonials: [
    {
      slug: "blurb-mercer",
      quote: "Quinn writes like the tide: patiently, then all at once.",
      author: "E. Mercer",
      role: "author of \"Salt Meadow\"",
    },
    {
      slug: "blurb-editor",
      quote: "The rare editor whose margin notes are better than most people's essays.",
      author: "Johan Lindqvist",
      role: "Publisher, Hollow Lane Press",
    },
    {
      slug: "blurb-critic",
      quote: "Undertow is the best book about water that is actually about everything else.",
      author: "Coastal Review",
      role: "books of the year",
    },
  ],

  pages: [
    {
      slug: "home",
      title: "Ada Quinn — essayist & editor",
      seo: {
        description: "Essays on infrastructure, memory, and the North Sea. Editing for people with a book inside them.",
        ogImage: { asset: "og-home", alt: "Ada Quinn — essayist & editor" },
      },
      sections: [
        {
          type: "sectionHero",
          variant: "centered",
          eyebrow: "Essayist & editor",
          heading: "Patiently, then all at once.",
          lead: "Essays on infrastructure, memory, and the North Sea — and editing for people with a book inside them.",
          actions: [
            { label: "Read the essays", href: "#writing" },
            { label: "Work with me", href: "#contact" },
          ],
        },
        {
          type: "sectionWriting",
          variant: "list",
          heading: "Selected writing",
          intro: "Six pieces, one book, a decade of coastline.",
          items: ["sea-walls", "last-switchboard", "cold-storage", "editing-grief", "ferry-timetable", "book-undertow"],
        },
        {
          type: "sectionTestimonials",
          variant: "quoteCarousel",
          heading: "Blurbs",
          items: ["blurb-mercer", "blurb-editor", "blurb-critic"],
        },
        {
          type: "sectionAbout",
          variant: "prose",
          heading: "About",
          body: [
            "I write long, slow essays about the systems underneath ordinary life — dikes, timetables, telephone exchanges — and the people who keep them running past their obsolescence.",
            "As an editor I work on narrative non-fiction: proposals, structural edits, and the painful middle draft where books are actually made.",
          ],
        },
        {
          type: "sectionExperience",
          variant: "list",
          heading: "Work",
          items: ["freelance-essayist", "hollow-lane", "tidsskrift"],
        },
        {
          type: "sectionCta",
          variant: "banner",
          heading: "The Undertow letter",
          intro: "One essay-shaped email a month. No news, no links lists, occasionally a lighthouse.",
          actions: [{ label: "Subscribe", href: "https://example.dev/letter" }],
        },
        {
          type: "sectionContact",
          variant: "links",
          heading: "Contact",
          intro: "For commissions, editing enquiries, and arguments about semicolons.",
          email: "ada@example.dev",
          links: [
            { label: "Mastodon", href: "https://hachyderm.io/@example" },
            { label: "Undertow, the book", href: "https://example.dev/undertow" },
          ],
        },
      ],
    },
  ],
};
