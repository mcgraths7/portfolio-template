import { groq } from "next-sanity";

import { Navigation } from "../../types/sanity";
import client from "../../sanity/lib/client";

export async function getNavigation(slug: string): Promise<Navigation> {
  try {
    const data = await client.fetch<Navigation>(
      groq`
        *[_type == "navigation" && slug.current == $slug][0]{
          _id,
          name,
          slug,
          "logoUrl": logo.image.asset -> url,
          "logoAlt": logo.altText,
          links[] {
            slug,
            displayText,
            icon,
            socialUrl
          },
          content
        }
      `, { slug }
    );

    return data;
  } catch (err) {
    throw err;
  }
}
