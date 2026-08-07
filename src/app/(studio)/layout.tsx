import type { ReactNode } from "react";

export { metadata, viewport } from "next-sanity/studio";

/**
 * A second root layout, and the reason the app is split into route groups.
 *
 * CSS imports in the App Router are global and additive — a nested layout
 * cannot drop a stylesheet its parent imported. Sorbet's stylesheet carries a
 * reset and sets typography and colour on `html`/`body`, and the Studio ships
 * its own complete styling. Sharing one root layout would mean the two fight
 * over every page, in both directions.
 *
 * Two root layouts is Next's answer to exactly that, so `(site)` loads Sorbet
 * and this one deliberately loads nothing.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
