import { PortableTextBlock } from "next-sanity";
import { Project, DetailedImage } from "@/types/sanity";

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
  heroImage: DetailedImage;
  content: PortableTextBlock[];
  projects: Project[];
};
