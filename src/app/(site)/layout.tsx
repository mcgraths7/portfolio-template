// The system stylesheet once. The preset theme is NOT a static import — the
// CMS picks it (siteSettings.preset), so the layout links /themes/<preset>.css
// served from the installed package by src/app/themes/[preset]/route.ts. A
// static import could only ever name one preset, which is exactly what made
// every persona render midnight before item 16.
import "@sorbet/design-system/css";

import "./globals.css";
import { Text } from "@sorbet/component-library/atoms";
import { Cluster, Container } from "@sorbet/component-library/layout";
import { Alert } from "@sorbet/component-library/molecules";
import { AppShell, AppShellHeader, AppShellMain } from "@sorbet/component-library/templates";
import { draftMode } from "next/headers";

import { isConfigured, siteUrl } from "../../../sanity/env";
import { getSiteSettings } from "../../../sanity/lib/fetch";
import { Providers } from "./providers";
import { ThemeControl } from "./theme-control";
import { ThemeScript } from "./theme-script";

import type { Metadata } from "next";

// No next/font here on purpose: Sorbet's type scale and font stacks are design
// tokens, so typography arrives with the theme rather than being wired up per
// app. A site that wants a different face overrides the font tokens.

/**
 * Site-level defaults; every page route overrides with its own CMS seo fields.
 * metadataBase is what turns sitemap/OG relatives absolute at deploy.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = isConfigured ? await getSiteSettings() : null;
  return {
    metadataBase: new URL(siteUrl),
    title: settings?.name ?? "Portfolio",
    description: settings?.tagline ?? "A CMS-driven portfolio built with Sorbet.",
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Static rendering normally; the draft cookie flips this request — and only
  // this request — to dynamic, fetching the drafts perspective instead.
  const { isEnabled: draft } = await draftMode();
  const settings = isConfigured
    ? await getSiteSettings(draft ? { perspective: "drafts" } : undefined)
    : null;
  const preset = settings?.preset ?? "sorbet";

  return (
    // suppressHydrationWarning: ThemeScript sets data-theme on this element
    // before React hydrates, so the DOM legitimately differs from what the
    // server rendered. It suppresses the warning for this element's own
    // attributes only, not for anything in the tree below.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking on purpose: the theme must paint with the page, and it
            must come before globals.css consumers so app rules still win. */}
        <link rel="stylesheet" href={`/themes/${preset}.css`} />
        <ThemeScript />
      </head>
      <body>
        <Providers>
          {/* The chrome lives here so every page route — home and /[slug]
              alike — shares it and pages render only their sections. */}
          <AppShell>
            {draft && (
              <Alert tone="warning" title="Draft preview">
                You are seeing unpublished content. <a href="/api/draft/disable">Exit preview</a>.
              </Alert>
            )}
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
              <Container>{children}</Container>
            </AppShellMain>
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
