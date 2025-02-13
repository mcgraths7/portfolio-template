"use client";

import Link from "next/link";
import { useRouter } from 'next/router'
import { PortableText } from "@portabletext/react";

import { EmblaCarousel } from "../../components/images/Carousel";
import { getProject, getProjectSlugs } from "../../sanity/queries/projects";
import type { Project } from "../../types/sanity";

export async function getStaticPaths() {
  const data = await getProjectSlugs();
  const paths = data.map((p: Project) => ({
    params: {
      id: p.slug.current,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getProject(id);
  return { props: { project } };
}

export default function Project({ project }: { project: Project }) {
  const router = useRouter()

  if (router.isFallback) return <div>Loading...</div>;
  if (!project) return <div>There was a problem loading the page</div>;
  
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
            <EmblaCarousel images={section.images} />
          </section>
        );
      })}
    </div>
  );
}
