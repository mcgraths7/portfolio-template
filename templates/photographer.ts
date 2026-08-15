import type { PersonaTemplate } from "./types.ts";

/**
 * The photographer persona. Noir preset — monochrome chrome so the pictures
 * carry all the colour. Gallery-dominant: a full-bleed hero, then two distinct
 * gallery sections (which also exercises the same section TYPE twice on one
 * page), and barely any prose.
 */
export const photographer: PersonaTemplate = {
  persona: "photographer",
  preset: "noir",

  settings: {
    name: "Jonas Keller",
    tagline: "Documentary & portrait photography",
    avatar: { asset: "avatar", alt: "Portrait of Jonas Keller" },
    social: [
      { platform: "Instagram", url: "https://instagram.com/example" },
      { platform: "Behance", url: "https://behance.net/example" },
    ],
    footer: "Available for editorial and commercial commissions worldwide.",
  },

  assets: {
    avatar: { label: "JK", hues: [250, 270], width: 600, height: 600 },
    "hero-harbour": { label: "Harbour, 05:40", hues: [230, 260], width: 1920, height: 820 },
    "g1-1": { label: "Night shift I", hues: [235, 255], width: 900, height: 1200 },
    "g1-2": { label: "Night shift II", hues: [245, 265], width: 1200, height: 900 },
    "g1-3": { label: "Night shift III", hues: [225, 245], width: 900, height: 1100 },
    "g1-4": { label: "Night shift IV", hues: [255, 275], width: 1200, height: 800 },
    "g1-5": { label: "Night shift V", hues: [240, 260], width: 1000, height: 1250 },
    "g1-6": { label: "Night shift VI", hues: [230, 250], width: 1200, height: 950 },
    "g2-1": { label: "Faces I", hues: [260, 280], width: 800, height: 1000 },
    "g2-2": { label: "Faces II", hues: [250, 270], width: 800, height: 1000 },
    "g2-3": { label: "Faces III", hues: [240, 260], width: 800, height: 1000 },
    "g2-4": { label: "Faces IV", hues: [265, 285], width: 800, height: 1000 },
    "g2-5": { label: "Faces V", hues: [255, 275], width: 800, height: 1000 },
    "pub-fernweh": { label: "Fernweh", hues: [0, 0], width: 320, height: 160 },
    "pub-latitude": { label: "Latitude", hues: [0, 0], width: 320, height: 160 },
    "pub-stadt": { label: "Stadt Magazin", hues: [0, 0], width: 320, height: 160 },
    "pub-verso": { label: "Verso", hues: [0, 0], width: 320, height: 160 },
    "og-home": { label: "Jonas Keller — Photography", hues: [245, 265], width: 1200, height: 630 },
  },

  testimonials: [
    {
      slug: "fernweh-editor",
      quote:
        "Jonas comes back with the picture you didn't know the story needed. We've stopped writing shot lists for him — they only got in the way.",
      author: "Lena Hartwig",
      role: "Photo editor, Fernweh",
    },
  ],

  pages: [
    {
      slug: "home",
      title: "Jonas Keller — documentary & portrait photography",
      seo: {
        description: "Documentary series and portraits. Editorial and commercial commissions worldwide.",
        ogImage: { asset: "og-home", alt: "Jonas Keller — photography" },
      },
      sections: [
        {
          type: "sectionHero",
          variant: "fullBleed",
          eyebrow: "Documentary & portrait",
          heading: "The picture the story needed.",
          lead: "Twelve years of harbours, night shifts and faces — for magazines that still print and clients who still care.",
          image: { asset: "hero-harbour", alt: "Harbour at dawn, 05:40" },
          actions: [{ label: "Book a commission", href: "#contact" }],
        },
        {
          type: "sectionGallery",
          variant: "masonry",
          heading: "Night shift",
          images: [
            { asset: "g1-1", alt: "Dock worker under sodium light" },
            { asset: "g1-2", alt: "Container cranes before dawn" },
            { asset: "g1-3", alt: "Break room at 3am" },
            { asset: "g1-4", alt: "Harbour basin, long exposure" },
            { asset: "g1-5", alt: "First ferry of the morning" },
            { asset: "g1-6", alt: "Shift change at the gate" },
          ],
        },
        {
          type: "sectionAbout",
          variant: "prose",
          heading: "About",
          body: [
            "I photograph work: the people who do it, the places it happens, the hours nobody else is awake for. Based in Hamburg, commissioned everywhere.",
          ],
        },
        {
          type: "sectionGallery",
          variant: "filmstrip",
          heading: "Faces",
          images: [
            { asset: "g2-1", alt: "Portrait, welder" },
            { asset: "g2-2", alt: "Portrait, baker" },
            { asset: "g2-3", alt: "Portrait, harbour pilot" },
            { asset: "g2-4", alt: "Portrait, nurse" },
            { asset: "g2-5", alt: "Portrait, conductor" },
          ],
        },
        {
          type: "sectionTestimonials",
          variant: "single",
          items: ["fernweh-editor"],
        },
        {
          type: "sectionLogoWall",
          variant: "grid",
          heading: "Published in",
          logos: [
            { asset: "pub-fernweh", alt: "Fernweh" },
            { asset: "pub-latitude", alt: "Latitude" },
            { asset: "pub-stadt", alt: "Stadt Magazin" },
            { asset: "pub-verso", alt: "Verso" },
          ],
        },
        {
          type: "sectionCta",
          variant: "centered",
          heading: "2027 commissions are open.",
          intro: "Editorial, commercial, and the occasional wedding for people who hate wedding photos.",
          actions: [{ label: "Email Jonas", href: "mailto:jonas@example.photo" }],
        },
        {
          type: "sectionContact",
          variant: "links",
          heading: "Elsewhere",
          email: "jonas@example.photo",
          links: [
            { label: "Instagram", href: "https://instagram.com/example" },
            { label: "Behance", href: "https://behance.net/example" },
            { label: "Print shop", href: "https://example.photo/prints" },
          ],
        },
      ],
    },
  ],
};
