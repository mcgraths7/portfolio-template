import {  groq } from "next-sanity";

import { Project } from "@/types/sanity";
import client from "@/sanity/lib/client";

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch<Project[]>(groq`
      *[_type == "project"]{
        _id,
        _type,
        name,
        "slug": slug.current,
        "imageUrl": images[0].asset->url + "?q=50", // limit image quality to 50
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
          "url": asset->url + "?q=40",
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
