import { PortableTextBlock } from "next-sanity";

export type Image = {
    _key: string,
    alt: string,
    asset: {
      _ref: string,
      _type: string
    },
    url: string,
    caption: PortableTextBlock[];
  }