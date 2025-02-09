import { defineField, defineType } from "sanity";

const projectScaffold = defineType({
  name: "projectSection",
  title: "Project Section",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "altText",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "images.0.image.asset",
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

export default projectScaffold;