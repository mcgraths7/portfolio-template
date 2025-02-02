import { PortableTextBlock } from "next-sanity";

export type Copy = {
  _id?: string;
  _createdAt?: Date;
  name: string;
  slug: string;
  content: PortableTextBlock[];
};
