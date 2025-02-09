import { defineType, defineField } from "sanity";

const pageScaffold = defineType({
  name: "pageScaffold",
  title: "Page Scaffold",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "The page title",
    }),
    defineField({
      name: "emphasisText",
      title: "Emphasis Text",
      type: "string",
      description: "The text which gets the color treatment",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "altText", title: "Alt Text", type: "string" },
        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    }),
  ],
});

export default pageScaffold;
