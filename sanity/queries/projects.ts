import { groq } from "next-sanity";

import { Project } from "@/types/sanity";
import client from "@/sanity/lib/client";
import { urlFor } from "@/sanity/utils";

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch<Project[]>(groq`
      *[_type == "project"]{
        _id,
        _type,
        name,
        "slug": slug.current,
        image: images[0]{ 
          _key,
          asset,
          alt
        },
      }
    `);
    
    data.forEach(project => {
      project.image.url = urlFor(project.image).quality(50).width(500).height(250).auto("format").url();
    });

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
          asset,
          alt
        },
        content
      }
    `,
      { slug }
    );

    data.images.forEach(image => {
      image.url = urlFor(image).quality(50).width(1920).height(1080).auto("format").url();
    });

    return data;
  } catch (err) {
    throw err;
  }
}
