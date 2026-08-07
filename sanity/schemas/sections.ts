import { defineArrayMember, defineField, defineType } from "sanity";

import { headingField, imageField, introField, variantField } from "./shared";

/**
 * The twelve section types. Each is an object that appears in a page's
 * `sections` array, and each carries a `variant` the renderer switches on.
 *
 * The previews here are deliberately minimal — enough that the array reads as
 * an outline rather than a stack of identical rows. Step 21 enriches them once
 * real content exists and it is clear what an editor actually needs to see.
 *
 * Adding a section type is three edits: a `defineType` here, its name in
 * SECTION_TYPES, and a case in the renderer's registry.
 */

const sectionPreview = (label: string, titleField = "heading") => ({
  select: { title: titleField, variant: "variant" },
  prepare: ({ title, variant }: { title?: string; variant?: string }) => ({
    title: title || label,
    subtitle: [label, variant].filter(Boolean).join(" · "),
  }),
});

export const sectionHero = defineType({
  name: "sectionHero",
  title: "Hero",
  type: "object",
  fields: [
    variantField(["split", "centered", "portrait", "fullBleed"]),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "lead", type: "text", rows: 3 }),
    imageField("image", "Portrait or backdrop"),
    defineField({ name: "actions", type: "array", of: [defineArrayMember({ type: "link" })], validation: (rule) => rule.max(2) }),
  ],
  preview: sectionPreview("Hero"),
});

export const sectionAbout = defineType({
  name: "sectionAbout",
  title: "About",
  type: "object",
  fields: [
    variantField(["prose", "splitWithImage", "statsAside"]),
    headingField,
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
    imageField("image", "Image"),
  ],
  preview: sectionPreview("About"),
});

export const sectionProjectGrid = defineType({
  name: "sectionProjectGrid",
  title: "Projects",
  type: "object",
  fields: [
    variantField(["grid", "masonry", "carousel", "featuredFirst"]),
    headingField,
    introField,
    defineField({
      name: "projects",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: "heading", variant: "variant", projects: "projects" },
    prepare: ({ title, variant, projects }) => ({
      title: title || "Projects",
      subtitle: `Projects · ${variant} · ${(projects as unknown[] | undefined)?.length ?? 0} items`,
    }),
  },
});

export const sectionGallery = defineType({
  name: "sectionGallery",
  title: "Gallery",
  type: "object",
  fields: [
    variantField(["masonry", "carousel", "filmstrip"]),
    headingField,
    defineField({
      name: "images",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: "heading", variant: "variant", images: "images" },
    prepare: ({ title, variant, images }) => ({
      title: title || "Gallery",
      subtitle: `Gallery · ${variant} · ${(images as unknown[] | undefined)?.length ?? 0} images`,
    }),
  },
});

export const sectionExperience = defineType({
  name: "sectionExperience",
  title: "Experience",
  type: "object",
  fields: [
    variantField(["timeline", "list", "cards"]),
    headingField,
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "experience" }] })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: sectionPreview("Experience"),
});

export const sectionSkills = defineType({
  name: "sectionSkills",
  title: "Skills",
  type: "object",
  fields: [
    variantField(["chips", "grouped", "meters"]),
    headingField,
    defineField({
      name: "groups",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "skillGroup" }] })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: sectionPreview("Skills"),
});

export const sectionWriting = defineType({
  name: "sectionWriting",
  title: "Writing",
  type: "object",
  fields: [
    variantField(["list", "cards"]),
    headingField,
    introField,
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "writing" }] })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: sectionPreview("Writing"),
});

export const sectionTestimonials = defineType({
  name: "sectionTestimonials",
  title: "Testimonials",
  type: "object",
  fields: [
    variantField(["cards", "quoteCarousel", "single"]),
    headingField,
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: sectionPreview("Testimonials"),
});

export const sectionLogoWall = defineType({
  name: "sectionLogoWall",
  title: "Logo wall",
  type: "object",
  fields: [
    variantField(["marquee", "grid"]),
    headingField,
    defineField({
      name: "logos",
      type: "array",
      of: [defineArrayMember({ type: "image" })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: sectionPreview("Logo wall"),
});

export const sectionStats = defineType({
  name: "sectionStats",
  title: "Stats",
  type: "object",
  fields: [
    variantField(["row", "grid"]),
    headingField,
    defineField({
      name: "stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: sectionPreview("Stats"),
});

export const sectionContact = defineType({
  name: "sectionContact",
  title: "Contact",
  type: "object",
  fields: [
    variantField(["links", "form", "split"]),
    headingField,
    introField,
    defineField({ name: "email", type: "string", validation: (rule) => rule.email() }),
    defineField({ name: "links", type: "array", of: [defineArrayMember({ type: "link" })] }),
  ],
  preview: sectionPreview("Contact"),
});

export const sectionCta = defineType({
  name: "sectionCta",
  title: "Call to action",
  type: "object",
  fields: [
    variantField(["banner", "card", "centered"]),
    defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
    introField,
    defineField({ name: "actions", type: "array", of: [defineArrayMember({ type: "link" })], validation: (rule) => rule.max(2) }),
  ],
  preview: sectionPreview("Call to action"),
});
