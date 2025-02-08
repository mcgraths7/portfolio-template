"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { ImageModal } from "@/app/components/ImageModal";
import type { Project, Image as ProjectImage } from "@/types/sanity";
import useFetchData from "@/hooks/useFetchData";
import { getProject } from "@/sanity/queries/projects";

type ProjectProps = {
  params: Promise<{ project: string }>;
};

export default function Project({ params }: ProjectProps) {
  const { project: projectSlug } = use(params);
  const {
    data: project,
    loading,
    error,
  } = useFetchData<Project>(getProject, projectSlug);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!project)
    return <div>Error: Project with slug {projectSlug} not found...</div>;

  const { name, url, content, images } = project;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold mb-4">{name}</h1>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          View Project
        </Link>
      </header>

      <div className="mt-8 mb-12">
        <PortableText value={content} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image: ProjectImage) => (
          <div
            key={image._key}
            className="relative aspect-w-16 aspect-h-9 cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill={true}
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          content={content}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
