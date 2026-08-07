import { Avatar, Text } from "@sorbet/component-library/atoms";
import { Center, Cluster, Grid, Stack } from "@sorbet/component-library/layout";
import { Card, CardBody, Carousel, Section } from "@sorbet/component-library/molecules";

import { hasAsset, imageUrl } from "../../../../sanity/lib/image";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Testimonials = Extract<PageSection, { _type: "sectionTestimonials" }>;
type Item = NonNullable<Testimonials["items"]>[number];

function Quote({ item, lead = false }: { item: Item; lead?: boolean }) {
  return (
    <Stack gap={4} as="figure">
      <Text as="blockquote" size={lead ? "lg" : undefined}>
        “{item.quote}”
      </Text>
      <Cluster gap={3} align="center" as="figcaption">
        {hasAsset(item.avatar) && <Avatar src={imageUrl(item.avatar, 96, 96)} alt="" size="sm" />}
        <Stack gap={0}>
          <Text size="sm" weight="semibold">
            {item.author}
          </Text>
          {item.role && (
            <Text size="sm" tone="muted">
              {item.role}
            </Text>
          )}
        </Stack>
      </Cluster>
    </Stack>
  );
}

export function TestimonialsSection({ section }: { section: Testimonials }) {
  const { variant, heading, items } = section;
  if (!items || items.length === 0) {
    return null;
  }

  const body = (() => {
    switch (variant) {
      case "cards":
        return (
          <Grid min="18rem" gap={6}>
            {items.map((item) => (
              <Card key={item._id}>
                <CardBody>
                  <Quote item={item} />
                </CardBody>
              </Card>
            ))}
          </Grid>
        );

      case "quoteCarousel":
        return (
          <Carousel perView={1} gap={6} aria-label={heading ?? "Testimonials"}>
            {items.map((item) => (
              <Center key={item._id} intrinsic>
                <Quote item={item} lead />
              </Center>
            ))}
          </Carousel>
        );

      case "single":
        return (
          <Center intrinsic text>
            <Quote item={items[0]!} lead />
          </Center>
        );
    }
  })();

  return <Section title={heading ?? undefined}>{body}</Section>;
}
