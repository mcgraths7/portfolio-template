import { hasAsset, imageUrl } from "../../../sanity/lib/image";

import type { PAGE_QUERY_RESULT } from "../../../sanity/types.generated";
import type { Metadata } from "next";

type PageDoc = NonNullable<PAGE_QUERY_RESULT>;

/**
 * CMS `seo` fields → Next metadata, one way, for every page route.
 *
 * The title chain is seo.title → page.title; description has no fallback on
 * purpose — a wrong description is worse than none, and search engines will
 * excerpt the page. The OG image goes through the hotspot pipeline at the
 * 1200×630 card size, so the editor's crop decides what survives the crop.
 */
export function pageMetadata(page: PageDoc): Metadata {
  const title = page.seo?.title ?? page.title;
  const description = page.seo?.description ?? undefined;
  const ogImage = page.seo?.ogImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(hasAsset(ogImage)
        ? { images: [{ url: imageUrl(ogImage, 1200, 630), width: 1200, height: 630, alt: ogImage.alt ?? title }] }
        : {}),
    },
    twitter: {
      card: hasAsset(ogImage) ? "summary_large_image" : "summary",
    },
  };
}
