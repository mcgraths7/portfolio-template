import { Stack } from "@sorbet/component-library/layout";
import { EmptyState } from "@sorbet/component-library/molecules";

import { isConfigured } from "../../../sanity/env";
import { getPage } from "../../../sanity/lib/fetch";
import { pageMetadata } from "./metadata";
import { renderSection } from "./sections/registry";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // cache() means this is the same fetch the page body performs, not a second.
  const page = isConfigured ? await getPage("home") : null;
  return page ? pageMetadata(page) : {};
}

/**
 * The home page, rendered entirely from the CMS: `page.sections` decides what
 * appears and in what order, the registry decides what each section looks
 * like. This file only fetches and hands off — it knows nothing about any
 * section type, which is what keeps adding one a registry-only change.
 */
export default async function Home() {
  // Unconfigured (no .env.local, e.g. a fresh clone or CI) renders the setup
  // notice without touching the network, so the build is hermetic. A
  // CONFIGURED site whose fetch fails still fails the build loudly — see
  // sanity/env.ts.
  const page = isConfigured ? await getPage("home") : null;

  if (!page) {
    return (
      <EmptyState title={isConfigured ? "No content yet" : "Not connected to Sanity yet"}>
        {isConfigured
          ? "The dataset has no published “home” page. Seed one with `pnpm seed software-engineer`, or create a page in the Studio at /studio."
          : "Copy .env.example to .env.local and fill in your Sanity project ID, then restart. The build works without it; the content needs it."}
      </EmptyState>
    );
  }

  return <Stack gap={16}>{page.sections?.map(renderSection)}</Stack>;
}
