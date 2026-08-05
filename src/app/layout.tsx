import type { Metadata } from "next";

// The system stylesheet once, then one preset theme. A real site picks the
// preset its persona template calls for; swapping presets is swapping this
// import. Both must come before globals.css so app-level rules win.
import "@sorbet/design-system/css";
import "@sorbet/design-system/themes/midnight.css";

import "./globals.css";

// No next/font here on purpose: Sorbet's type scale and font stacks are design
// tokens, so typography arrives with the theme rather than being wired up per
// app. A site that wants a different face overrides the font tokens.

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A CMS-driven portfolio built with Sorbet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
