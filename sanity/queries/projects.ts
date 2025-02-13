import { groq } from "next-sanity";

import { Project } from "../../types/sanity";
import client from "../../sanity/lib/client";
import { urlFor } from "../utils";

export async function getProject(slug: string): Promise<Project> {
  try {
    const data = await client.fetch<Project>(
      groq`
      *[_type == "project" && slug.current == $slug][0]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        url,
        content,
        projectSections[] -> {
          _key,
          name,
          title,
          content,
          images[] {
            _key,
            name,
            altText,
            image {
              asset,
              "dimensions": asset->metadata.dimensions
            }
          }
        }
      }
    `,
      { slug }
    );

    data.projectSections.forEach((section) => {
      section.images.forEach((sectionImage) => {
        const newUrl = urlFor(sectionImage.image)
          .quality(50)
          .width(500)
          .auto("format")
          .url();
        sectionImage.url = newUrl;
      });
    });

    return data;
  } catch (err) {
    throw err;
  }
}

export async function getProjectSlugs() {
  try {
    const data = await client.fetch<Project[]>(
      groq`
      *[_type == "project"]{
        slug
      }
    `
    );
    return data;
  } catch (err) {
    throw err;
  }
}
