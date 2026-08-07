import { Button, Heading, Lead, Overline } from "@sorbet/component-library/atoms";
import { Center, Cluster, Frame, Grid, Stack } from "@sorbet/component-library/layout";

import { hasAsset, imageUrl } from "../../../../sanity/lib/image";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Hero = Extract<PageSection, { _type: "sectionHero" }>;

/**
 * The hero, in four variants. All composition, no bespoke CSS — each variant
 * is a different arrangement of the same Sorbet primitives, which is exactly
 * what `variant` exists to prove.
 *
 * fullBleed is interpreted as an edge-to-edge image with the text beneath it:
 * a text-over-image treatment needs a layering primitive Sorbet doesn't have
 * yet, and the rule is to log that gap upstream rather than hand-roll CSS here.
 */
export function HeroSection({ section }: { section: Hero }) {
  const { variant, eyebrow, heading, lead, image, actions } = section;

  const text = (center = false) => (
    <Stack gap={4} align={center ? "center" : undefined}>
      {eyebrow && <Overline>{eyebrow}</Overline>}
      <Heading level={1} align={center ? "center" : undefined}>
        {heading}
      </Heading>
      {lead && <Lead align={center ? "center" : undefined}>{lead}</Lead>}
      {actions && actions.length > 0 && (
        <Cluster gap={3} justify={center ? "center" : undefined}>
          {actions.map((action, i) => (
            <Button
              key={action._key}
              as="a"
              href={action.href ?? "#"}
              size="lg"
              variant={i === 0 ? undefined : "ghost"}
            >
              {action.label}
            </Button>
          ))}
        </Cluster>
      )}
    </Stack>
  );

  const picture = (ratio: string, width: number) =>
    hasAsset(image) ? (
      <Frame ratio={ratio} round>
        <img src={imageUrl(image, width)} alt={image.alt ?? ""} />
      </Frame>
    ) : null;

  switch (variant) {
    case "split":
      return (
        <Grid as="header" cols={2} gap={8}>
          {text()}
          {picture("4 / 3", 1200)}
        </Grid>
      );

    case "portrait":
      return (
        <Grid as="header" cols={2} gap={8}>
          {picture("3 / 4", 900)}
          {text()}
        </Grid>
      );

    case "centered":
      return (
        <Center as="header" intrinsic>
          {text(true)}
        </Center>
      );

    case "fullBleed":
      return (
        <Stack as="header" gap={8}>
          {picture("21 / 9", 1600)}
          <Center intrinsic>{text(true)}</Center>
        </Stack>
      );
  }
}
