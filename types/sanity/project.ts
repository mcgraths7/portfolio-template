import { PortableTextBlock } from "next-sanity";

import { Image } from "@/types/sanity/image";

export type Project = {
  _id: string;
  _createdAt: Date;
  _type: string,
  name: string;
  slug: string;
  url: string;
  images: Image[],
  image: Image,
  content: PortableTextBlock[];
};