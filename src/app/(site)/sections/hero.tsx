import { Button, Heading, Lead, Overline } from "@sorbet/component-library/atoms";
import { Center, Cluster, Frame, Grid, Layer, LayerContent, Stack } from "@sorbet/component-library/layout";

import { hasAsset, imageUrl } from "../../../../sanity/lib/image";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Hero = Extract<PageSection, { _type: "sectionHero" }>;

/**
 * The hero, in four variants. All composition, no bespoke CSS — each variant
 * is a different arrangement of the same Sorbet primitives, which is exactly
 * what `variant` exists to prove.
 *
 * fullBleed stacks the text over the image with Layer — the primitive this
 * template's first version was missing (sorbet#79 → #80). The scrim stays on:
 * no build gate can measure contrast against an arbitrary CMS photo, so the
 * text sits on a known dark wash rather than on whatever gets uploaded.
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
      // No image in the CMS degrades to the centered treatment rather than an
      // empty band — a Layer with nothing behind the text is just a worse
      // Center.
      if (!hasAsset(image)) {
        return (
          <Center as="header" intrinsic>
            {text(true)}
          </Center>
        );
      }
      return (
        <Layer as="header" place="center" scrim round>
          <Frame ratio="21 / 9">
            <img src={imageUrl(image, 1600)} alt={image.alt ?? ""} />
          </Frame>
          <LayerContent>
            <Center intrinsic>{text(true)}</Center>
          </LayerContent>
        </Layer>
      );
  }
}
