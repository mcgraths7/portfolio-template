import { PortableTextBlock } from "next-sanity";
import { Gallery } from "./gallery";

export type PageScaffold = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  pageTitle: string;
  emphasisText: string;
  content: PortableTextBlock[];
  galleries: Gallery[];
};
