import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { Copy } from "@/types/sanity";

export async function getCopyBySlug(slug: string): Promise<Copy> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
  });

  try {
    const data = await client.fetch<Copy>(
      groq`
        *[_type == "copyText" && slug.current == $slug][0]{
          _id,
          name,
          "slug": slug.current,
          content
        }
      `,
      { slug }
    );

    return data;
  } catch (err) {
    throw err;
  }
}
