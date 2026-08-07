import type { Metadata } from "next";

// The system stylesheet once, then one preset theme. A real site picks the
// preset its persona template calls for; swapping presets is swapping this
// import. Both must come before globals.css so app-level rules win.
import "@sorbet/design-system/css";
import "@sorbet/design-system/themes/midnight.css";

import "./globals.css";
import { Providers } from "./providers";
import { ThemeScript } from "./theme-script";

// No next/font here on purpose: Sorbet's type scale and font stacks are design
// tokens, so typography arrives with the theme rather than being wired up per
// app. A site that wants a different face overrides the font tokens.

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A CMS-driven portfolio built with Sorbet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: ThemeScript sets data-theme on this element
    // before React hydrates, so the DOM legitimately differs from what the
    // server rendered. It suppresses the warning for this element's own
    // attributes only, not for anything in the tree below.
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
