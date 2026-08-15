import { isConfigured, siteUrl } from "../../sanity/env";
import { getPageSlugs } from "../../sanity/lib/fetch";

import type { MetadataRoute } from "next";

/**
 * Built from the same slug query the [slug] route builds from, so the sitemap
 * can only ever list URLs that actually resolve. "home" is the root route;
 * unconfigured builds emit just the root, staying hermetic.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = isConfigured ? await getPageSlugs() : [];
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...slugs
      .filter((slug): slug is string => Boolean(slug) && slug !== "home")
      .map((slug) => ({ url: `${siteUrl}/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
