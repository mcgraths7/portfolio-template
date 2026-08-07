import { defineArrayMember, defineField, defineType } from "sanity";

import { imageField } from "./shared";

/** The five Sorbet presets. A persona template picks one. */
const SORBET_PRESETS = ["sorbet", "ocean", "forest", "noir", "midnight"] as const;

/**
 * Singleton. Structure Builder pins this to a single document (step 23) so the
 * sidebar shows "Site settings" rather than a list containing one item.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({
      name: "preset",
      title: "Sorbet theme",
      type: "string",
      initialValue: "sorbet",
      options: { list: [...SORBET_PRESETS] },
      validation: (rule) => rule.required(),
    }),
    imageField("avatar", "Avatar"),
    defineField({
      name: "social",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "platform", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "url", type: "url", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "footer", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "tagline" } },
});

/**
 * The section types a page may contain. Declared here rather than in
 * sections.ts so adding one is a single edit next to the field that uses it.
 */
export const SECTION_TYPES = [
  "sectionHero",
  "sectionAbout",
  "sectionProjectGrid",
  "sectionGallery",
  "sectionExperience",
  "sectionSkills",
  "sectionWriting",
  "sectionTestimonials",
  "sectionLogoWall",
  "sectionStats",
  "sectionContact",
  "sectionCta",
] as const;

/**
 * The page. `sections` is the whole point: an ordered array of section blocks
 * that the renderer walks in order. Reordering here reorders the page, with no
 * code change — that round trip is the feature.
 */
export const page = defineType({
  name: "page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", type: "string", description: "Falls back to the page title." }),
        defineField({ name: "description", type: "text", rows: 2 }),
        imageField("ogImage", "Social share image"),
      ],
    }),
    defineField({
      name: "sections",
      type: "array",
      of: SECTION_TYPES.map((type) => defineArrayMember({ type })),
      options: { insertMenu: { showIcons: true, views: [{ name: "grid" }, { name: "list" }] } },
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

export const project = defineType({
  name: "project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "year", type: "number" }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "stack",
      description: "Renders as Sorbet Chips.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "repo", title: "Repository", type: "url" }),
    imageField("cover", "Cover"),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
  ],
  preview: { select: { title: "title", subtitle: "role", media: "cover" } },
});

export const experience = defineType({
  name: "experience",
  type: "document",
  fields: [
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "organisation", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "start", type: "date", options: { dateFormat: "YYYY-MM" } }),
    // Empty means current. The renderer shows "Present".
    defineField({ name: "end", type: "date", options: { dateFormat: "YYYY-MM" } }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    imageField("logo", "Logo"),
  ],
  preview: { select: { title: "role", subtitle: "organisation", media: "logo" } },
});

export const writing = defineType({
  name: "writing",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "publication", type: "string" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "publication" } },
});

export const testimonial = defineType({
  name: "testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "author", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string" }),
    imageField("avatar", "Avatar"),
  ],
  preview: { select: { title: "author", subtitle: "role", media: "avatar" } },
});

export const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill group",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "skills",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: { select: { title: "label", skills: "skills" }, prepare: ({ title, skills }) => ({ title, subtitle: (skills as string[] | undefined)?.join(", ") }) },
});
