import { PortableTextBlock } from "next-sanity";
import { DetailedImage, ProjectSection } from "@/types/sanity";

export type Project = {
  _id: string;
  _createdAt: Date;
  _type: string;
  _key: string;
  name: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  url: string;
  heroImage: DetailedImage;
  projectSections: ProjectSection[];
  content: PortableTextBlock[];
};
