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
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "galleries",
      title: "Galleries",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "gallery" }],
        },
      ],
      description: "A gallery of projects or other content types",
    }),
  ],
});

export default pageScaffold;
