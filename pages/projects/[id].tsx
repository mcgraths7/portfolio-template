"use client";

import { useRouter } from "next/router";

import { EmblaCarousel } from "../../components/images/Carousel";
import { getProjectIds, getProject } from "../../contentful/queries/project";
import { ProjectItem } from "../../types/contentful";
import type { Project } from "../../types/sanity";
import { getProjectSlugs } from "../../sanity/queries/projects";

export async function getStaticPaths() {
  const data = await getProjectIds();
  const paths = data.map((p: ProjectItem) => ({
    params: {
      id: p.slug,
    },
  }));
  console.log('one', paths);
  const dataTwo = await getProjectSlugs();
  const pathsTwo = dataTwo.map((p: Project) => ({
    params: {
      id: p.slug.current,
    },
  }));

  console.log('two', pathsTwo);

  return { pathsTwo, fallback: false };
}

export async function getStaticProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const projectIds = await getProjectIds();
  const projectId = projectIds.find((p) => p.slug === id)?.sys.id;
  const project = await getProject(projectId);
  return { props: { project } };
}

export default function Project({ project }: { project: ProjectItem }) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;
  if (!project) return <div>There was a problem loading the page</div>;

  const {
    name,
    // richTextContent,
    sectionsCollection: {items: projectSections},
  } = project;

  console.log(projectSections)

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold mb-4 rainbow-text">{name}</h1>
        {/* <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          View Project
        </Link> */}
      </header>

      <div className="mt-8 mb-12">{/* <PortableText value={content} /> */}</div>
      {projectSections &&
        projectSections.map((section) => {
          return (
            <section key={section.sys.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <EmblaCarousel images={section.imagesCollection.items} />
            </section>
          );
        })}
    </div>
  );
}
