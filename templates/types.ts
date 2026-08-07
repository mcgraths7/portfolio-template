import type {
  Experience,
  Project,
  SectionAbout,
  SectionContact,
  SectionCta,
  SectionExperience,
  SectionGallery,
  SectionHero,
  SectionLogoWall,
  SectionProjectGrid,
  SectionSkills,
  SectionStats,
  SectionTestimonials,
  SectionWriting,
  SiteSettings,
  SkillGroup,
  Testimonial,
  Writing,
} from "../sanity/types.generated.ts";

/**
 * The authoring format for a persona template: what a template file writes,
 * before the engine turns it into Sanity documents.
 *
 * These shapes are ergonomic rather than literal — plain strings for portable
 * text, asset keys instead of asset references, no _key bookkeeping. The
 * engine's builders (scripts/seed.ts) construct the real documents and are
 * typed against the GENERATED schema types, so drift between a template and
 * the schema fails compilation in the builder rather than surfacing as a
 * mystery field in the Studio.
 *
 * Variant and preset unions are imported from the generated types on purpose:
 * a template naming a variant the schema doesn't have is a compile error here,
 * in the file the author is editing.
 */

/** Names an entry in the template's `assets` map. */
export type AssetKey = string;

/** An image slot: which placeholder to use, and what it depicts. */
export interface ImageSlot {
  asset: AssetKey;
  alt?: string;
}

/**
 * A placeholder image the engine generates as a deterministic SVG — same
 * bytes every run, so Sanity's content-hash dedupe makes re-uploads free.
 */
export interface AssetSpec {
  /** Text drawn on the placeholder. */
  label: string;
  /** Two OKLCH-ish hues (0–360) for the gradient. */
  hues: [number, number];
  width: number;
  height: number;
}

export interface ProjectSeed {
  /** Becomes part of the document ID — stable, kebab-case. */
  slug: string;
  title: string;
  summary?: string;
  year?: number;
  role?: string;
  stack?: string[];
  url?: string;
  repo?: string;
  cover?: ImageSlot;
  gallery?: ImageSlot[];
  /** Paragraphs; the engine builds portable text. */
  body?: string[];
}

export interface ExperienceSeed {
  slug: string;
  role: string;
  organisation: string;
  /** YYYY-MM-DD. Omit `end` for a current role. */
  start?: string;
  end?: string;
  summary?: string;
  logo?: ImageSlot;
}

export interface WritingSeed {
  slug: string;
  title: string;
  publication?: string;
  date?: string;
  url?: string;
  summary?: string;
}

export interface TestimonialSeed {
  slug: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: ImageSlot;
}

export interface SkillGroupSeed {
  slug: string;
  label: string;
  skills: string[];
}

interface LinkSeed {
  label: string;
  href: string;
}

/** One member per section type; `type` mirrors the schema's `_type`. */
export type SectionSeed =
  | {
      type: "sectionHero";
      variant: SectionHero["variant"];
      eyebrow?: string;
      heading: string;
      lead?: string;
      image?: ImageSlot;
      actions?: LinkSeed[];
    }
  | {
      type: "sectionAbout";
      variant: SectionAbout["variant"];
      heading?: string;
      body?: string[];
      image?: ImageSlot;
    }
  | {
      type: "sectionProjectGrid";
      variant: SectionProjectGrid["variant"];
      heading?: string;
      intro?: string;
      /** Slugs of entries in `projects`. */
      projects: string[];
    }
  | {
      type: "sectionGallery";
      variant: SectionGallery["variant"];
      heading?: string;
      images: ImageSlot[];
    }
  | {
      type: "sectionExperience";
      variant: SectionExperience["variant"];
      heading?: string;
      items: string[];
    }
  | {
      type: "sectionSkills";
      variant: SectionSkills["variant"];
      heading?: string;
      groups: string[];
    }
  | {
      type: "sectionWriting";
      variant: SectionWriting["variant"];
      heading?: string;
      intro?: string;
      items: string[];
    }
  | {
      type: "sectionTestimonials";
      variant: SectionTestimonials["variant"];
      heading?: string;
      items: string[];
    }
  | {
      type: "sectionLogoWall";
      variant: SectionLogoWall["variant"];
      heading?: string;
      logos: ImageSlot[];
    }
  | {
      type: "sectionStats";
      variant: SectionStats["variant"];
      heading?: string;
      stats: { value: string; label: string }[];
    }
  | {
      type: "sectionContact";
      variant: SectionContact["variant"];
      heading?: string;
      intro?: string;
      email?: string;
      links?: LinkSeed[];
    }
  | {
      type: "sectionCta";
      variant: SectionCta["variant"];
      heading: string;
      intro?: string;
      actions?: LinkSeed[];
    };

export interface PageSeed {
  slug: string;
  title: string;
  seo?: { title?: string; description?: string; ogImage?: ImageSlot };
  sections: SectionSeed[];
}

export interface PersonaTemplate {
  /** Kebab-case name; document IDs are derived from it. */
  persona: string;
  /** Which Sorbet theme this portfolio ships with. */
  preset: SiteSettings["preset"];
  settings: {
    name: string;
    tagline?: string;
    avatar?: ImageSlot;
    social?: { platform: string; url: string }[];
    footer?: string;
  };
  assets: Record<AssetKey, AssetSpec>;
  projects?: ProjectSeed[];
  experience?: ExperienceSeed[];
  writing?: WritingSeed[];
  testimonials?: TestimonialSeed[];
  skillGroups?: SkillGroupSeed[];
  pages: PageSeed[];
}

/** What the engine writes: a full document minus the server-owned fields. */
export type SeedDoc<T extends { _id: string; _type: string }> = Omit<
  T,
  "_createdAt" | "_updatedAt" | "_rev"
>;

export type AnySeedDoc =
  | SeedDoc<SiteSettings>
  | SeedDoc<import("../sanity/types.generated.ts").Page>
  | SeedDoc<Project>
  | SeedDoc<Experience>
  | SeedDoc<Writing>
  | SeedDoc<Testimonial>
  | SeedDoc<SkillGroup>;
