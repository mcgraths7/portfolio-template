import { groq } from "next-sanity";

import client from "../../sanity/lib/client";
import { PageScaffold } from "../../types/sanity/pageScaffold";
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
        heroImage {
            name,
            altText,
            image {
              asset,
              "dimensions": asset->metadata.dimensions
            }
          },
        projects[]->{
          _id,
          _createdAt,
          _type,
          name,
          slug,
          heroImage {
            name,
            altText,
            image {
              asset,
              "dimensions": asset->metadata.dimensions
            }
          },
          projectSections[] -> {
            _key,
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
    const {projects, heroImage} = data;

    // Optimize project images for masonry
    projects?.forEach((project) => {
      const newUrl = urlFor(project.heroImage.image)
        .quality(50)
        .width(500)
        .auto("format")
        .url();
      project.heroImage.url = newUrl;
    });

    // Optimize hero image
    if (!heroImage) {
      return data;
    }
    const newUrl = urlFor(heroImage.image)
      .quality(50)
      .width(500)
      .auto("format")
      .url();
    heroImage.url = newUrl;

    return data;
  } catch (err) {
    throw err;
  }
}
