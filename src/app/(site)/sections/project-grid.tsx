import { Badge, Button, Overline, Text } from "@sorbet/component-library/atoms";
import { Cluster, Frame, Grid, GridSpan2, Masonry, Stack } from "@sorbet/component-library/layout";
import {
  Card,
  CardBody,
  CardFooter,
  CardMedia,
  CardTitle,
  Carousel,
  Section,
} from "@sorbet/component-library/molecules";

import { hasAsset, imageUrl } from "../../../../sanity/lib/image";

import type { PageSection } from "../../../../sanity/lib/fetch";

type ProjectGrid = Extract<PageSection, { _type: "sectionProjectGrid" }>;
type ProjectRef = NonNullable<ProjectGrid["projects"]>[number];

/**
 * Projects, in four arrangements of the same card. The card is one function on
 * purpose: every variant renders identical content, so switching variants in
 * the Studio changes layout and nothing else.
 */
function ProjectCard({ project }: { project: ProjectRef }) {
  const meta = [project.year, project.role].filter(Boolean).join(" · ");
  return (
    <Card as="article">
      {hasAsset(project.cover) && (
        <CardMedia>
          <Frame ratio="16 / 10">
            <img src={imageUrl(project.cover, 800)} alt={project.cover.alt ?? ""} loading="lazy" />
          </Frame>
        </CardMedia>
      )}
      <CardBody>
        <Stack gap={3}>
          {meta && <Overline>{meta}</Overline>}
          <CardTitle>{project.title}</CardTitle>
          {project.summary && <Text tone="muted">{project.summary}</Text>}
          {project.stack && project.stack.length > 0 && (
            <Cluster gap={2} as="ul" aria-label="Technology">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </Cluster>
          )}
        </Stack>
      </CardBody>
      {(project.url || project.repo) && (
        <CardFooter>
          <Cluster gap={2}>
            {project.url && (
              <Button as="a" href={project.url} size="sm" variant="ghost">
                Visit
              </Button>
            )}
            {project.repo && (
              <Button as="a" href={project.repo} size="sm" variant="ghost">
                Source
              </Button>
            )}
          </Cluster>
        </CardFooter>
      )}
    </Card>
  );
}

export function ProjectGridSection({ section }: { section: ProjectGrid }) {
  const { variant, heading, intro, projects } = section;
  if (!projects || projects.length === 0) {
    return null;
  }

  const cards = projects.map((p) => <ProjectCard key={p._id} project={p} />);

  const body = (() => {
    switch (variant) {
      case "grid":
        return <Grid min="18rem" gap={6}>{cards}</Grid>;

      case "masonry":
        return <Masonry min="16rem" gap={6}>{cards}</Masonry>;

      case "carousel":
        return (
          <Carousel perView={2.2} gap={4} aria-label={heading ?? "Projects"}>
            {cards}
          </Carousel>
        );

      case "featuredFirst": {
        const [featured, ...rest] = cards;
        return (
          <Grid cols={3} gap={6}>
            <GridSpan2>{featured}</GridSpan2>
            {rest}
          </Grid>
        );
      }
    }
  })();

  return (
    <Section title={heading} description={intro} id="projects">
      {body}
    </Section>
  );
}
