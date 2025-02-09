import { PortableTextBlock } from "next-sanity";
import { Image, ProjectSection } from "@/types/sanity";



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
  heroImage: {
    altText: string;
    name: string;
    image: Image;
    url: string;
  };
  projectSections: ProjectSection[];
  content: PortableTextBlock[];
};

