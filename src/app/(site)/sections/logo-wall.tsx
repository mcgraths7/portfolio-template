import { Frame, Grid } from "@sorbet/component-library/layout";
import { Marquee, Section } from "@sorbet/component-library/molecules";

import { hasAsset, imageUrl } from "../../../../sanity/lib/image";

import type { PageSection } from "../../../../sanity/lib/fetch";

type LogoWall = Extract<PageSection, { _type: "sectionLogoWall" }>;

export function LogoWallSection({ section }: { section: LogoWall }) {
  const { variant, heading, logos } = section;
  const real = (logos ?? []).filter(hasAsset);
  if (real.length === 0) {
    return null;
  }

  const logo = (image: (typeof real)[number], width: number) => (
    <Frame key={image._key} ratio="2 / 1" contain>
      <img src={imageUrl(image, width)} alt={image.alt ?? ""} loading="lazy" />
    </Frame>
  );

  return (
    <Section title={heading ?? undefined}>
      {variant === "marquee" ? (
        <Marquee gap={8} fade aria-label={heading ?? "Logos"}>
          {real.map((image) => logo(image, 320))}
        </Marquee>
      ) : (
        <Grid min="8rem" gap={6}>
          {real.map((image) => logo(image, 320))}
        </Grid>
      )}
    </Section>
  );
}
