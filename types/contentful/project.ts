type ProjectItem = {
  sys: {
    id: string;
  }
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
  images: {
    items: {
      image: {
        url: string;
        width: number;
        height: number;
      }
      altText: string;
    }[];
  }
};

export default ProjectItem;
