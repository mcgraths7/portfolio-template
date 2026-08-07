import { Text } from "@sorbet/component-library/atoms";
import { Cluster, Container, Stack } from "@sorbet/component-library/layout";
import { EmptyState } from "@sorbet/component-library/molecules";
import { AppShell, AppShellHeader, AppShellMain } from "@sorbet/component-library/templates";

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
  const [settings, page] = await Promise.all([getSiteSettings(), getPage("home")]);

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
            <EmptyState title="No content yet">
              This site renders from Sanity, and the dataset has no published “home” page. Seed one
              with <code>pnpm seed software-engineer</code>, or create a page in the Studio at
              /studio.
            </EmptyState>
          )}
        </Container>
      </AppShellMain>
    </AppShell>
  );
}
