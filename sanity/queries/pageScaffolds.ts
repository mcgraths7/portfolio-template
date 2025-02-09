import { groq } from "next-sanity";
import { PageScaffold } from "@/types/sanity/page-scaffold";

import client from "@/sanity/lib/client";
import { urlFor } from "../utils";

export async function getPageScaffold(slug: string): Promise<PageScaffold> {
  try {
    const data = await client.fetch<PageScaffold>(
      groq`
      *[_type == "pageScaffold" && slug.current == $slug][0]{
        _id,
        name,
        "slug": slug.current,
        pageTitle,
        emphasisText,
        content,
        projects[]->{
          _id,
          _createdAt,
          _type,
          name,
          slug,
          heroImage {
            name,
            image {
              asset,
              "dimensions": asset->metadata.dimensions
            },
            altText,
          },
          projectSections[] {
            name,
            title,
            content,
            images[] {
              name,
              altText,
              image {
                asset,
                "dimensions": asset->metadata.dimensions
              }
            }
          }
        }
      }
    `,
      { slug }
    );

    data.projects.forEach((project) => {
      const newUrl = urlFor(project.heroImage.image)
        .quality(50)
        .width(500)
        .auto("format")
        .url();
      project.heroImage.url = newUrl;
    });

    return data;
  } catch (err) {
    throw err;
  }
}
