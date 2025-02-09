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
      name: "projectSections",
      title: "Project Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "title", title: "Title", type: "string" },
            {
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "name", title: "Name", type: "string" },
                    { name: "altText", title: "Alt Text", type: "string" },
                    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
                    {
                      name: "content",
                      title: "Content",
                      type: "array",
                      of: [{ type: "block" }],
                    },
                  ],
                  preview: {
                    select: {
                      title: "name",
                      imageUrl: "image.asset.url",
                    },
                  },
                },
              ],
            },
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
      image: "heroImage.image.asset",
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
