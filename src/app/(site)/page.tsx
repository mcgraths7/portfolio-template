import { Text } from "@sorbet/component-library/atoms";
import { Cluster, Container, Stack } from "@sorbet/component-library/layout";
import { EmptyState } from "@sorbet/component-library/molecules";
import { AppShell, AppShellHeader, AppShellMain } from "@sorbet/component-library/templates";

import { isConfigured } from "../../../sanity/env";
import { getPage, getSiteSettings } from "../../../sanity/lib/fetch";
import { renderSection } from "./sections/registry";
import { ThemeControl } from "./theme-control";

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
  const [settings, page] = isConfigured
    ? await Promise.all([getSiteSettings(), getPage("home")])
    : [null, null];

  return (
    <AppShell>
      <AppShellHeader>
        <Container>
          <Cluster justify="between" align="center" gap={4}>
            <Text as="span" weight="semibold">
              {settings?.name ?? "Portfolio"}
            </Text>
            <ThemeControl />
          </Cluster>
        </Container>
      </AppShellHeader>

      <AppShellMain>
        <Container>
          {page ? (
            <Stack gap={16}>{page.sections?.map(renderSection)}</Stack>
          ) : (
            <EmptyState title={isConfigured ? "No content yet" : "Not connected to Sanity yet"}>
              {isConfigured
                ? "The dataset has no published “home” page. Seed one with `pnpm seed software-engineer`, or create a page in the Studio at /studio."
                : "Copy .env.example to .env.local and fill in your Sanity project ID, then restart. The build works without it; the content needs it."}
            </EmptyState>
          )}
        </Container>
      </AppShellMain>
    </AppShell>
  );
}
