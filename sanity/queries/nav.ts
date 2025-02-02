import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { Navigation } from "@/types/sanity";

export async function getNavigation(): Promise<Navigation[]> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
  });

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
