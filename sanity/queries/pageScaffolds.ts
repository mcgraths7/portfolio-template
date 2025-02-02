import { createClient, groq } from "next-sanity";
import { PageScaffold } from "@/types/sanity/page-scaffold";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
});

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
        galleries[]->{
          _id,
          _createdAt,
          _type,
          name,
          title,
          items[]->{
            _id,
            _createdAt,
            _type,
            name,
            "slug": slug.current,
            "image": images[0]{ 
              "url": asset->url, 
              "alt": alt 
            }
          }
        }
      }
    `,
      { slug }
    );

    return data;
  } catch (err) {
    throw err;
  }
}
