import { PortableTextBlock } from "next-sanity";

import { DetailedImage } from "@/types/sanity";

export type ProjectSection = {
  _key: string;
  name: string;
  title: string;
  content: PortableTextBlock[];
  images: DetailedImage[];
};
