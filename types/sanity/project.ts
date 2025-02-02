import { PortableTextBlock } from "next-sanity";

type Image = {
  _key: string,
  url: string,
  alt: string
}

export type Project = {
  _id: string;
  _createdAt: Date;
  _type: string,
  name: string;
  slug: string;
  url: string;
  image: {
    _key: string,
    url: string;
    alt?: string;
  };
  images: Image[],
  content: PortableTextBlock[];
};
