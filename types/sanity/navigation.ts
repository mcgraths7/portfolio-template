import { PortableTextBlock } from "next-sanity";

export type Navigation = {
  _id: string;
  _type: "navigation";
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  logoUrl: string;
  logoAlt: string;
  links?: {
    _id: string;
    linkName: string;
    slug: {
      _type: "slug";
      current: string;
    };
    displayText?: string;
    icon?: "Twitter" | "Tiktok" | "Facebook" | "Instagram";
    socialUrl?: string;
  }[];
  content?: PortableTextBlock[];
};
