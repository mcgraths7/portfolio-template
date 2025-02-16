"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import GalleryItem from "./MasonryItem";
import { ProjectItem } from "../../types/contentful";

interface ImageGalleryProps {
  projects?: ProjectItem[];
  columnWidth: number;
}

const ProjectGallery: React.FC<ImageGalleryProps> = ({ projects }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }}>
      <Masonry>
        {projects && projects.map((project, idx) => {
          return (
            <GalleryItem key={`${project.sys.id}-${idx}`} item={project} />
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ProjectGallery;
