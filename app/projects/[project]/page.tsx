"use client";

import { use } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import useFetchData from "@/hooks/useFetchData";
import { getProject } from "@/sanity/queries/projects";
import type { Project } from "@/types/sanity";
import { EmblaCarousel } from "@/app/components/images/Carousel";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!project)
    return <div>Error: Project with slug {projectSlug} not found...</div>;

  const { name, url, content, projectSections } = project;


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold mb-4 rainbow-text">{name}</h1>
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
      {projectSections.map((section) => {
        return (
          <section key={section._key} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <EmblaCarousel images={section.images}/>
          </section>
        );
      })}
    </div>
  );
}
