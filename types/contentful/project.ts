import { Document } from "@contentful/rich-text-types";

type ProjectItem = {
  sys: {
    id: string;
  };
  name: string;
  heroImage: {
    image: {
      url: string;
      width: number;
      height: number;
    };
    altText: string;
  };
  slug: string;
  richTextContent: {
    json: Document;
  };
  images: {
    items: {
      image: {
        url: string;
        width: number;
        height: number;
      };
      altText: string;
    }[];
  };
  sectionsCollection: {
    items: {
      sys: {
        id: string;
      };
      title: string;
      content: {
        json: Document;
      };
      imagesCollection: {
        items: {
          sys: {
            id: string;
          }
          image: {
            url: string;
            width: number;
            height: number;
          };
          altText: string;
        }[];
      };
    }[];
  };
};

export default ProjectItem;
