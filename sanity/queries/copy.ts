import { groq } from "next-sanity";

import { Copy } from "@/types/sanity";
import client from "@/sanity/lib/client";

export async function getCopyBySlug(slug: string): Promise<Copy> {
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
