import { Document } from "@contentful/rich-text-types";

type NavigationItem = {
  sys: {
    id: string;
  }
  name?: string;
  slug?: string;
  richTextContent?: {
    json: Document;
  };
  logo?: {
    name: string;
    altText: string;
    image: { url: string };
  };
  linksCollection?: {
    items: {
      name?: string;
      slug?: string;
      displayText?: string;
      icon?: {
        url: string;
      };
      socialUrl?: string;
    }[];
  };
}

export default NavigationItem;