import * as documents from "./documents";
import * as sections from "./sections";
import { linkObject } from "./shared";

/**
 * Every schema the Studio knows about. These definitions ARE the content model
 * — there is no separate description of it to keep in sync, which is most of
 * why Sanity replaced Contentful here.
 */
export const schemaTypes = [
  documents.siteSettings,
  documents.page,

  documents.project,
  documents.experience,
  documents.writing,
  documents.testimonial,
  documents.skillGroup,

  sections.sectionHero,
  sections.sectionAbout,
  sections.sectionProjectGrid,
  sections.sectionGallery,
  sections.sectionExperience,
  sections.sectionSkills,
  sections.sectionWriting,
  sections.sectionTestimonials,
  sections.sectionLogoWall,
  sections.sectionStats,
  sections.sectionContact,
  sections.sectionCta,

  linkObject,
];

export { SECTION_TYPES } from "./documents";
