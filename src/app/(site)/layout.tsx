import type { Metadata } from "next";

// The system stylesheet once. The preset theme is NOT a static import — the
// CMS picks it (siteSettings.preset), so the layout links /themes/<preset>.css
// served from the installed package by src/app/themes/[preset]/route.ts. A
// static import could only ever name one preset, which is exactly what made
// every persona render midnight before item 16.
import "@sorbet/design-system/css";

import "./globals.css";
import { isConfigured } from "../../../sanity/env";
import { getSiteSettings } from "../../../sanity/lib/fetch";
import { Providers } from "./providers";
import { ThemeScript } from "./theme-script";

// No next/font here on purpose: Sorbet's type scale and font stacks are design
// tokens, so typography arrives with the theme rather than being wired up per
// app. A site that wants a different face overrides the font tokens.

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A CMS-driven portfolio built with Sorbet.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Fetched at build (SSG) like the page itself; the schema's initialValue is
  // the fallback for an unconfigured or unseeded site.
  const settings = isConfigured ? await getSiteSettings() : null;
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
