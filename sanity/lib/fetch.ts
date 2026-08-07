import { client } from "./client";
import { PAGE_QUERY, PAGE_SLUGS_QUERY, SITE_SETTINGS_QUERY } from "./queries";

import type { PAGE_QUERY_RESULT } from "../types.generated";
import type { ClientReturn, QueryParams } from "@sanity/client";

/**
 * Draft preview is a parameter, not a second code path: the same query runs
 * under a different perspective with a token. `drafts` needs auth, so it only
 * works server-side where SANITY_API_WRITE_TOKEN exists — item 18 wires this
 * to Next draft mode; nothing user-facing reaches for it yet.
 */
export interface SanityFetchOptions {
  perspective?: "published" | "drafts";
}

export function sanityFetch<const Q extends string>(
  query: Q,
  params: QueryParams = {},
  { perspective = "published" }: SanityFetchOptions = {},
): Promise<ClientReturn<Q>> {
  if (perspective === "drafts") {
    return client
      .withConfig({ perspective: "drafts", useCdn: false, token: process.env.SANITY_API_WRITE_TOKEN })
      .fetch(query, params);
  }
  return client.fetch(query, params);
}

export function getSiteSettings(options?: SanityFetchOptions) {
  return sanityFetch(SITE_SETTINGS_QUERY, {}, options);
}

export function getPage(slug: string, options?: SanityFetchOptions) {
  return sanityFetch(PAGE_QUERY, { slug }, options);
}

export function getPageSlugs() {
  return sanityFetch(PAGE_SLUGS_QUERY);
}

/**
 * The discriminated union the section registry switches on — one member per
 * section type, discriminated by `_type`. Exists as a named type so the
 * registry's exhaustiveness is checked against the QUERY, not just the schema:
 * a section projected out of PAGE_QUERY drops out of this union and the
 * registry entry for it stops compiling.
 */
export type PageSection = NonNullable<NonNullable<PAGE_QUERY_RESULT>["sections"]>[number];
