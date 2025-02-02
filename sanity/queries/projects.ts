import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { Project } from "@/types/sanity";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
});

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch<Project[]>(groq`
      *[_type == "project"]{
        _id,
        _type,
        name,
        "slug": slug.current,
        "imageUrl": images[0].asset->url,
        "imageAlt": images[0].alt
      }
    `);

    return data;
  } catch (err) {
    throw err;
  }
}

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
        "images": images[]{ 
          _key,
          "url": asset->url, 
          alt
        },
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
