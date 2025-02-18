import { Document } from "@contentful/rich-text-types";

type PageItem = {
  sys: {
    id: string;
  }
  name: string;
  slug: string;
  pageTitle: string;
  emphasizedTitle: string;
  heroImage: {
    name: string;
    altText: string;
    image: { 
      url: string;
      width: number;
      height: number
    };
  };
  richTextContent: {
    json: Document;
  };
};

export default PageItem;
