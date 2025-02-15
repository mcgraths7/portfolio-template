import { Document } from "@contentful/rich-text-types";

import ProjectItem from "./project";
import DetailedImage from "./detailedImage";

type PageItem = {
  name: string;
  slug: string;
  pageTitle: string;
  emphasizedTitle: string;
  heroImage: DetailedImage;
  richTextContent: {
    json: Document;
  };
  projectsCollection: {
    items: ProjectItem[];
  };
};

export default PageItem;
