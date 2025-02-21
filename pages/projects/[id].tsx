"use client";

import { useRouter } from "next/router";
import styled from "styled-components";

import { EmblaCarousel } from "../../components/images/Carousel";
import { getProjectIds, getProject } from "../../contentful/queries/project";
import { ProjectItem } from "../../types/contentful";

export async function getStaticPaths() {
  const data = await getProjectIds();
  const paths = data.map((p: ProjectItem) => ({
    params: {
      id: p.slug,
    },
  }));

  return { paths, fallback: false };
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

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
`;

const Title = styled.h1`
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-4);
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Section = styled.section`
  margin-bottom: var(--space-12);
`;

const SectionTitle = styled.h2`
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-4);
`;

export default function Project({ project }: { project: ProjectItem }) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;
  if (!project) return <div>There was a problem loading the page</div>;

  const {
    name,
    sectionsCollection: { items: projectSections },
  } = project;

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
      </Header>

      <div className="mt-8 mb-12">{/* <PortableText value={content} /> */}</div>
      {projectSections &&
        projectSections.map((section) => (
          <Section key={section.sys.id}>
            <SectionTitle>{section.title}</SectionTitle>
            <EmblaCarousel images={section.imagesCollection.items} />
          </Section>
        ))}
    </Container>
  );
}
