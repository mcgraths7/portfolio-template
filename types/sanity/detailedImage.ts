import { PortableTextBlock } from "next-sanity";

import { Image } from "./";

export interface DetailedImage {
  _key: string;
  name: string;
  title: string;
  altText: string;
  url: string;
  image: Image;
  content: PortableTextBlock[];
}
