import { Stack } from "@sorbet/component-library/layout";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { isConfigured } from "../../../../sanity/env";
import { getPage, getPageSlugs } from "../../../../sanity/lib/fetch";
import { pageMetadata } from "../metadata";
import { renderSection } from "../sections/registry";

import type { Metadata } from "next";

/**
 * Every CMS page beyond "home", at /<slug>. The home slug renders at the root
 * route instead, so it is excluded here — one URL per page, no duplicates.
 * Unconfigured builds emit no params, keeping the build hermetic; a slug that
 * disappears from the CMS 404s rather than rendering stale.
 */
export async function generateStaticParams() {
  if (!isConfigured) {
    return [];
  }
  const slugs = await getPageSlugs();
  return slugs.filter((slug): slug is string => Boolean(slug) && slug !== "home").map((slug) => ({ slug }));
}

async function fetchPage(slug: string) {
  if (!isConfigured || slug === "home") {
    return null;
  }
  const { isEnabled: draft } = await draftMode();
  return getPage(slug, draft ? { perspective: "drafts" } : undefined);
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchPage(slug);
  return page ? pageMetadata(page) : {};
}

export default async function CmsPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = await fetchPage(slug);
  if (!page) {
    notFound();
  }
  return <Stack gap={16}>{page.sections?.map(renderSection)}</Stack>;
}
