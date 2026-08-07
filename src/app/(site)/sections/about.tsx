import { Frame, Grid, GridSpan2, Stack } from "@sorbet/component-library/layout";
import { Section } from "@sorbet/component-library/molecules";

import { hasAsset, imageUrl } from "../../../../sanity/lib/image";
import { RichText } from "./shared";

import type { PageSection } from "../../../../sanity/lib/fetch";

type About = Extract<PageSection, { _type: "sectionAbout" }>;

export function AboutSection({ section }: { section: About }) {
  const { variant, heading, body, image } = section;
  const prose = <RichText value={body} />;
  const picture = hasAsset(image) ? (
    <Frame ratio="4 / 5" round>
      <img src={imageUrl(image, 800)} alt={image.alt ?? ""} loading="lazy" />
    </Frame>
  ) : null;

  switch (variant) {
    case "prose":
      return <Section title={heading ?? undefined}>{prose}</Section>;

    case "splitWithImage":
      return (
        <Section title={heading ?? undefined}>
          <Grid cols={2} gap={8}>
            <Stack gap={4}>{prose}</Stack>
            {picture}
          </Grid>
        </Section>
      );

    // Body beside the picture at a narrower aside ratio — the "stats" name in
    // the schema is aspirational until the model grows numbers; render the
    // strongest honest layout rather than fabricating figures.
    case "statsAside":
      return (
        <Section title={heading ?? undefined}>
          <Grid cols={3} gap={8}>
            <GridSpan2>
              <Stack gap={4}>{prose}</Stack>
            </GridSpan2>
            {picture}
          </Grid>
        </Section>
      );
  }
}
