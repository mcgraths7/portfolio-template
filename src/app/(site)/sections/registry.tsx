import { Alert } from "@sorbet/component-library/molecules";

import { AboutSection } from "./about";
import { ContactSection } from "./contact";
import { CtaSection } from "./cta";
import { ExperienceSection } from "./experience";
import { GallerySection } from "./gallery";
import { HeroSection } from "./hero";
import { LogoWallSection } from "./logo-wall";
import { ProjectGridSection } from "./project-grid";
import { SkillsSection } from "./skills";
import { StatsSection } from "./stats";
import { TestimonialsSection } from "./testimonials";
import { WritingSection } from "./writing";

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
 * All twelve types are registered; the optionality and the loud dev fallback
 * below stay, because a NEW schema section type lands here before its renderer
 * does — an editor's draft section should never crash a live site.
 */
type Registry = {
  [T in PageSection["_type"]]?: ComponentType<{ section: Extract<PageSection, { _type: T }> }>;
};

const registry: Registry = {
  sectionHero: HeroSection,
  sectionAbout: AboutSection,
  sectionProjectGrid: ProjectGridSection,
  sectionGallery: GallerySection,
  sectionExperience: ExperienceSection,
  sectionSkills: SkillsSection,
  sectionWriting: WritingSection,
  sectionTestimonials: TestimonialsSection,
  sectionLogoWall: LogoWallSection,
  sectionStats: StatsSection,
  sectionContact: ContactSection,
  sectionCta: CtaSection,
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
