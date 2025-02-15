import { Document } from "@contentful/rich-text-types";

import LinkItem from "./link";
import DetailedImage from "./detailedImage";

type NavigationItem = {
  name: string;
  slug: string;
  richTextContent: {
    json: Document;
  };
  logo: DetailedImage;
  linksCollection: {
    items: LinkItem[];
  };
}

export default NavigationItem;