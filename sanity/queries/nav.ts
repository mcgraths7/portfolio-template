import { groq } from "next-sanity";

import { Navigation } from "@/types/sanity";
import client from "@/sanity/lib/client";

export async function getNavigation(): Promise<Navigation[]> {
  try {
    const data = await client.fetch<Navigation[]>(
      groq`
        *[_type == "navigation"]{
          _id,
          name,
          "slug": slug.current,
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
      `
    );

    return data;
  } catch (err) {
    throw err;
  }
}
