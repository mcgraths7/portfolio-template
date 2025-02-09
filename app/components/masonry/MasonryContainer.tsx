"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import type { Project } from "../../../types/sanity";
import GalleryItem from "./MasonryItem";

interface ImageGalleryProps {
  projects: Project[];
  columnWidth: number;
}

const ProjectGallery: React.FC<ImageGalleryProps> = ({ projects }) => {
  const manyProjects = [...projects, ...projects, ...projects];
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }}>
      <Masonry>
        {manyProjects.map((project, idx) => {
          return (
            <GalleryItem key={`${project._id}-${idx}`} item={project} />
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ProjectGallery;
