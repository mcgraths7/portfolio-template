/**
 * The names of every type we declare, with no imports of any kind.
 *
 * Deliberately dependency-free so a plain Node script can read it directly:
 * the rest of the schema uses extensionless imports that only a bundler
 * resolves, and scripts/check-schema.ts needs this list without pulling all of
 * `sanity` into a CLI process. One source of truth, two consumers.
 */

/** Section blocks a page may contain. Order here is the Studio's insert order. */
export const SECTION_TYPES = [
  "sectionHero",
  "sectionAbout",
  "sectionProjectGrid",
  "sectionGallery",
  "sectionExperience",
  "sectionSkills",
  "sectionWriting",
  "sectionTestimonials",
  "sectionLogoWall",
  "sectionStats",
  "sectionContact",
  "sectionCta",
] as const;

/** Standalone documents — the things an editor creates and sections link to. */
export const DOCUMENT_TYPES = [
  "siteSettings",
  "page",
  "project",
  "experience",
  "writing",
  "testimonial",
  "skillGroup",
] as const;

/** Shared objects registered at the top level. */
export const OBJECT_TYPES = ["link"] as const;
