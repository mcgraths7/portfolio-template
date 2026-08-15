import { siteUrl } from "../../sanity/env";

import type { MetadataRoute } from "next";

/**
 * /studio is the embedded CMS — an authenticated app, not content; crawlers
 * have no business there. /themes/*.css is harmless but pointless to index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/themes/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
