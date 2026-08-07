import { Alert } from "@sorbet/component-library/molecules";

import { HeroSection } from "./hero";
import { ProjectGridSection } from "./project-grid";

import type { PageSection } from "../../../../sanity/lib/fetch";
import type { ComponentType, ReactNode } from "react";

/**
 * The core mechanism of the whole template: content type → component.
 *
 * A page is an ordered array of sections; this maps each section's `_type` to
 * the component that renders it, and each component switches on `variant` to
 * pick a Sorbet composition. Reordering in the Studio reorders the page;
 * changing a variant changes the layout — no code edit either way.
 *
 * The registry is keyed by `PageSection["_type"]`, the union generated from
 * PAGE_QUERY itself. That direction matters: registering a section the query
 * doesn't project is a compile error here, so the registry can never claim to
 * render data it won't receive.
 *
 * Entries are optional while item 15 fills the remaining ten in. A section
 * type without an entry renders loudly in development and vanishes in
 * production — an editor's draft section should never crash a live site.
 */
type Registry = {
  [T in PageSection["_type"]]?: ComponentType<{ section: Extract<PageSection, { _type: T }> }>;
};

const registry: Registry = {
  sectionHero: HeroSection,
  sectionProjectGrid: ProjectGridSection,
};

export function renderSection(section: PageSection): ReactNode {
  // The mapped type guarantees each entry matches its key; the lookup loses
  // that correlation, so one widening cast at the dispatch site.
  const Component = registry[section._type] as ComponentType<{ section: PageSection }> | undefined;

  if (!Component) {
    if (process.env.NODE_ENV === "production") {
      return null;
    }
    return (
      <Alert key={section._key} tone="warning" title={`No renderer for "${section._type}"`}>
        This section type has no registry entry yet. It renders as this warning in development and
        is skipped in production.
      </Alert>
    );
  }

  return <Component key={section._key} section={section} />;
}
