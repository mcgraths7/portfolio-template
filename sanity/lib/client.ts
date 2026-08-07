import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "../env";

/**
 * The read client: published content over the CDN, no token. This is the only
 * client the rendering path ever uses — auth appears solely when a caller asks
 * for drafts (see fetch.ts) or when the seeder writes, and each of those
 * builds its own configuration from this one rather than widening this one.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
