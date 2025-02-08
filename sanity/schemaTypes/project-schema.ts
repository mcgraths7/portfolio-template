import { defineField, defineType } from "sanity";

const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "alt",
              title: "Alt",
              type: "string",
              description: "Alt text for the image",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "array",
              of: [{ type: "block" }],
              description:
                "Caption for the image, to be rendered under the larger image",
            }),
          ],
          preview: {
            select: {
              title: "name",
              imageUrl: "asset.url",
            },
          },
        },
      ],
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      image: "images.0.asset",
    },
    prepare(selection) {
      const { title, image } = selection;
      return {
        title,
        media: image,
      };
    },
  },
});

export default project;
