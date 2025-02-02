import { Project } from "./project";

// export type GalleryItem = Project; 

export type Gallery = {
  _id: string;
  _createdAt: Date;
  _type: string;
  name: string;
  title: string;
  items: Project[];
};
