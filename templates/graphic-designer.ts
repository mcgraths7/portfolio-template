import type { PersonaTemplate } from "./types.ts";

/**
 * The graphic-designer persona. Sorbet preset — the warm, saturated namesake
 * theme suits a visual identity practice. Work leads, words follow: clients,
 * then case studies in a masonry of covers, and prose only near the end.
 */
export const graphicDesigner: PersonaTemplate = {
  persona: "graphic-designer",
  preset: "sorbet",

  settings: {
    name: "Mara Voss",
    tagline: "Identity & packaging design",
    avatar: { asset: "avatar", alt: "Portrait of Mara Voss" },
    social: [
      { platform: "Instagram", url: "https://instagram.com/example" },
      { platform: "Dribbble", url: "https://dribbble.com/example" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/example" },
    ],
    footer: "Studio Voss — identities that survive contact with reality.",
  },

  assets: {
    avatar: { label: "MV", hues: [340, 20], width: 600, height: 600 },
    "cover-hearth": { label: "Hearth & Co", hues: [20, 40], width: 1200, height: 900 },
    "cover-meridian": { label: "Meridian", hues: [330, 355], width: 1200, height: 800 },
    "cover-tidelark": { label: "Tidelark", hues: [350, 15], width: 1200, height: 1500 },
    "cover-bramble": { label: "Bramble", hues: [15, 45], width: 1200, height: 900 },
    "cover-atlaspress": { label: "Atlas Press", hues: [325, 350], width: 1200, height: 1200 },
    "cover-solace": { label: "Solace", hues: [5, 30], width: 1200, height: 800 },
    "logo-hearth": { label: "Hearth & Co", hues: [25, 25], width: 320, height: 160 },
    "logo-meridian": { label: "Meridian", hues: [340, 340], width: 320, height: 160 },
    "logo-tidelark": { label: "Tidelark", hues: [0, 0], width: 320, height: 160 },
    "logo-atlaspress": { label: "Atlas Press", hues: [330, 330], width: 320, height: 160 },
    "logo-solace": { label: "Solace", hues: [15, 15], width: 320, height: 160 },
    "portrait-studio": { label: "The studio", hues: [345, 25], width: 900, height: 1100 },
    "og-home": { label: "Mara Voss — Design", hues: [335, 25], width: 1200, height: 630 },
  },

  projects: [
    {
      slug: "hearth",
      title: "Hearth & Co — full identity",
      summary:
        "A neighbourhood bakery chain growing to twelve sites without losing the corner-shop feel. Wordmark, packaging system, signage — and a flour-proof menu board.",
      year: 2026,
      role: "Identity system",
      stack: ["Identity", "Packaging", "Signage"],
      cover: { asset: "cover-hearth", alt: "Hearth & Co identity spread" },
      body: [
        "Hearth's problem was scale: the warmth read as handmade at two sites and as inconsistency at twelve. The system keeps one hand-drawn wordmark and rebuilds everything around it on a strict grid — warmth at the centre, discipline at the edges.",
      ],
    },
    {
      slug: "meridian",
      title: "Meridian Journal — editorial redesign",
      summary:
        "A quarterly on cities, redesigned mid-flight: new masthead, type system on two families, and a cover grammar the editors can art-direct without me.",
      year: 2025,
      role: "Editorial design",
      stack: ["Editorial", "Typography"],
      cover: { asset: "cover-meridian", alt: "Meridian Journal covers" },
      body: [
        "The brief that matters was the last one: the editors must be able to make covers alone. The cover grammar is three rules and one forbidden move, documented on a single page that lives taped above the layout desk.",
      ],
    },
    {
      slug: "tidelark",
      title: "Tidelark — packaging",
      summary:
        "Small-batch preserves with shelf presence beyond its marketing budget. Label system across 14 SKUs, screen-printed in two colours to keep unit cost sane.",
      year: 2025,
      role: "Packaging",
      stack: ["Packaging", "Print"],
      cover: { asset: "cover-tidelark", alt: "Tidelark jar labels" },
    },
    {
      slug: "bramble",
      title: "Bramble — app icon & brand refresh",
      summary:
        "A foraging app that looked like a bank. New mark, motion rules for the identity in-app, and an icon that survives 29 pixels.",
      year: 2024,
      role: "Brand refresh",
      stack: ["Identity", "Motion"],
      cover: { asset: "cover-bramble", alt: "Bramble brand refresh" },
    },
    {
      slug: "atlas-press",
      title: "Atlas Press — series design",
      summary:
        "Twenty-two travel paperbacks, one system: a spine grammar that shelves beautifully and a cover format local illustrators can inhabit.",
      year: 2023,
      role: "Series design",
      stack: ["Editorial", "Illustration direction"],
      cover: { asset: "cover-atlaspress", alt: "Atlas Press book series" },
    },
    {
      slug: "solace",
      title: "Solace — wayfinding",
      summary:
        "Signage for a hospice that had to be legible at the worst moment of someone's week. Type at distance, colour under fluorescents, no jargon anywhere.",
      year: 2022,
      role: "Wayfinding",
      stack: ["Signage", "Accessibility"],
      cover: { asset: "cover-solace", alt: "Solace wayfinding signage" },
    },
  ],

  testimonials: [
    {
      slug: "hearth-founder",
      quote:
        "Mara gave us a system our own staff can use. Two years and ten new sites later, nothing has drifted — that never happens.",
      author: "Ruth Ellison",
      role: "Founder, Hearth & Co",
    },
    {
      slug: "meridian-editor",
      quote: "The redesign paid for itself at the news-stand in two issues. The cover grammar is the best deliverable I've ever been handed.",
      author: "Tomas Beck",
      role: "Editor, Meridian Journal",
    },
    {
      slug: "bramble-pm",
      quote: "She killed our favourite idea in the first meeting and she was right. The icon tripled tap-through on the store page.",
      author: "Priya Nair",
      role: "Product lead, Bramble",
    },
  ],

  skillGroups: [
    { slug: "practice", label: "Practice", skills: ["Identity systems", "Packaging", "Editorial", "Wayfinding"] },
    { slug: "craft", label: "Craft", skills: ["Typography", "Print production", "Illustration direction", "Motion basics"] },
  ],

  pages: [
    {
      slug: "home",
      title: "Mara Voss — identity & packaging design",
      seo: {
        description: "Identity systems, packaging and editorial design. Warm at the centre, disciplined at the edges.",
        ogImage: { asset: "og-home", alt: "Mara Voss — identity & packaging design" },
      },
      sections: [
        {
          type: "sectionHero",
          variant: "portrait",
          eyebrow: "Studio Voss",
          heading: "Identities that survive contact with reality.",
          lead: "Brands drift the day the designer leaves. I build systems your own team can hold — grids, grammars and rules of thumb that keep the work true at site twelve and issue forty.",
          image: { asset: "portrait-studio", alt: "Mara Voss in the studio" },
          actions: [
            { label: "Case studies", href: "#projects" },
            { label: "Work with me", href: "#contact" },
          ],
        },
        {
          type: "sectionLogoWall",
          variant: "marquee",
          heading: "Selected clients",
          logos: [
            { asset: "logo-hearth", alt: "Hearth & Co" },
            { asset: "logo-meridian", alt: "Meridian Journal" },
            { asset: "logo-tidelark", alt: "Tidelark" },
            { asset: "logo-atlaspress", alt: "Atlas Press" },
            { asset: "logo-solace", alt: "Solace" },
          ],
        },
        {
          type: "sectionProjectGrid",
          variant: "masonry",
          heading: "Case studies",
          intro: "Six engagements, each one a system somebody else now runs.",
          projects: ["hearth", "meridian", "tidelark", "bramble", "atlas-press", "solace"],
        },
        {
          type: "sectionTestimonials",
          variant: "cards",
          heading: "What clients say",
          items: ["hearth-founder", "meridian-editor", "bramble-pm"],
        },
        {
          type: "sectionAbout",
          variant: "splitWithImage",
          heading: "About the studio",
          body: [
            "Studio Voss is one designer, a Risograph, and a strong opinion about baseline grids. I take four identity projects a year so each one gets the attention a system deserves.",
            "The throughline is handover: every engagement ends with the document that lets you stop needing me.",
          ],
          image: { asset: "portrait-studio", alt: "The studio wall of work in progress" },
        },
        {
          type: "sectionSkills",
          variant: "chips",
          heading: "What I do",
          groups: ["practice", "craft"],
        },
        {
          type: "sectionCta",
          variant: "card",
          heading: "Booking spring 2027",
          intro: "One identity slot and two packaging slots remain.",
          actions: [{ label: "Start a conversation", href: "mailto:mara@example.studio" }],
        },
        {
          type: "sectionContact",
          variant: "split",
          heading: "Contact",
          intro: "For commissions, collaborations, or Risograph emergencies.",
          email: "mara@example.studio",
          links: [
            { label: "Instagram", href: "https://instagram.com/example" },
            { label: "Dribbble", href: "https://dribbble.com/example" },
          ],
        },
      ],
    },
  ],
};
