import { Frame, Masonry } from "@sorbet/component-library/layout";
import { Carousel, Section } from "@sorbet/component-library/molecules";

import { hasAsset, imageUrl } from "../../../../sanity/lib/image";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Gallery = Extract<PageSection, { _type: "sectionGallery" }>;

/**
 * The gallery-heavy path — the photographer persona's backbone. Hotspot crops
 * come from the Studio, so every ratio here shows what the editor framed.
 */
export function GallerySection({ section }: { section: Gallery }) {
  const { variant, heading, images } = section;
  const real = (images ?? []).filter(hasAsset);
  if (real.length === 0) {
    return null;
  }

  const body = (() => {
    switch (variant) {
      // Mixed ratios so the masonry has something to balance: alternate
      // portrait/landscape by position — deterministic, no data needed.
      case "masonry":
        return (
          <Masonry min="14rem" gap={4}>
            {real.map((image, i) => (
              <Frame key={image._key} ratio={i % 3 === 1 ? "3 / 4" : "4 / 3"} round>
                <img src={imageUrl(image, 900)} alt={image.alt ?? ""} loading="lazy" />
              </Frame>
            ))}
          </Masonry>
        );

      case "carousel":
        return (
          <Carousel perView={1.4} gap={4} aria-label={heading ?? "Gallery"}>
            {real.map((image) => (
              <Frame key={image._key} ratio="3 / 2" round>
                <img src={imageUrl(image, 1400)} alt={image.alt ?? ""} loading="lazy" />
              </Frame>
            ))}
          </Carousel>
        );

      // A strip of uniform frames peeking off-canvas: the Carousel without
      // its chrome IS a filmstrip — no controls, no dots, just drag/scroll.
      case "filmstrip":
        return (
          <Carousel perView={3.3} gap={3} controls={false} indicators={false} aria-label={heading ?? "Gallery"}>
            {real.map((image) => (
              <Frame key={image._key} ratio="1" round>
                <img src={imageUrl(image, 700)} alt={image.alt ?? ""} loading="lazy" />
              </Frame>
            ))}
          </Carousel>
        );
    }
  })();

  return <Section title={heading ?? undefined}>{body}</Section>;
}
