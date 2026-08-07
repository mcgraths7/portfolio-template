import imageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "../env";

/**
 * The shape every image lands in after a GROQ projection: an asset reference,
 * maybe crop/hotspot, maybe our alt field. Queries project images wholesale,
 * so this is what section components receive.
 */
export interface CmsImage {
  asset?: { _ref: string } | null;
  alt?: string | null;
}

const builder = imageUrlBuilder({ projectId, dataset });

/**
 * CDN URL for a CMS image at a given width. Hotspot/crop from the editor are
 * respected automatically; `auto=format` upgrades to webp/avif where the
 * browser allows. SVG assets (the seed placeholders) are served as-is —
 * transforms are a no-op on them, harmlessly.
 */
export function imageUrl(image: CmsImage, width: number, height?: number): string {
  let b = builder.image(image).width(width).auto("format");
  if (height !== undefined) {
    b = b.height(height).fit("crop");
  }
  return b.url();
}

/** True when the image has an actual asset behind it — render nothing otherwise. */
export function hasAsset(image: CmsImage | null | undefined): image is CmsImage & { asset: { _ref: string } } {
  return Boolean(image?.asset?._ref);
}
