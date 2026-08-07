import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * `variant` is the mechanism the whole architecture rests on: the CMS picks a
 * section's shape, and the renderer switches on this value to choose a
 * composition of Sorbet components. Adding a variant here and a case in the
 * renderer is the entire cost of a new layout.
 *
 * It is a `string` with a `list` rather than a free field, so the Studio offers
 * only shapes the code can actually render — an unknown variant is a section
 * that silently disappears in production.
 *
 * A dropdown of strings is poor for a non-developer; step 22 replaces it with
 * layout diagrams. Keeping every section's variant on this one helper is what
 * makes that a single component swap rather than twelve.
 */
export function variantField(variants: readonly [string, ...string[]], initial = variants[0]) {
  return defineField({
    name: "variant",
    title: "Layout",
    type: "string",
    initialValue: initial,
    options: { list: variants.map((v) => ({ title: titleCase(v), value: v })), layout: "radio" },
    validation: (rule) => rule.required(),
  });
}

function titleCase(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

/** Every section leads with one. Optional so a section can run without a header. */
export const headingField = defineField({
  name: "heading",
  type: "string",
});

/** Short line under a heading. Deliberately plain text, not rich text. */
export const introField = defineField({
  name: "intro",
  type: "text",
  rows: 3,
});

/**
 * The Studio's `image` with hotspot enabled. Hotspot is the reason images are
 * survivable here: the same asset gets cropped to a square avatar, a wide hero
 * and a tall masonry cell, and the editor decides what stays in frame rather
 * than the CSS guessing.
 */
export function imageField(name = "image", title?: string) {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        type: "string",
        description: "Describe the image for screen readers. Leave empty only if decorative.",
      }),
    ],
  });
}

/**
 * An image as an array member (gallery cells, logo walls), hotspot on and an
 * alt beside it. Same contract as imageField — the a11y story cannot depend on
 * whether an image happens to live in a field or an array.
 */
export const imageMember = defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      description: "Describe the image for screen readers. Leave empty only if decorative.",
    }),
  ],
});

/** A call to action. Registered once and referenced by hero, CTA and contact. */
export const linkObject = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "href",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
