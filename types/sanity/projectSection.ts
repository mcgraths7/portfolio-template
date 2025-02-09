import { PortableTextBlock } from "next-sanity";

import { Image } from "@/types/sanity";

export type ProjectSection = {
  _key: string;
  name: string;
  title: string;
  content: PortableTextBlock[];
  images: {
    _key: string;
    altText: string;
    name: string;
    image: Image;
    url: string;
  }[];
};
