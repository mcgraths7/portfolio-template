import { defineQuery } from "groq";

/**
 * Every GROQ query in the app lives here, beside the types generated from it —
 * `pnpm typegen` parses these statically (hence no string interpolation, which
 * it cannot follow) and emits a result type per query, so a query and its type
 * cannot disagree.
 *
 * Projections only, never whole documents: a section receives exactly the
 * fields it renders. References resolve inline with `->{...}` — one request
 * fetches a page however many documents its sections link.
 */

/** Everything the site chrome needs: identity, theme preset, socials, footer. */
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    name,
    tagline,
    preset,
    avatar,
    social[]{ platform, url },
    footer
  }
`);

/** For generateStaticParams: every published page slug. */
export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)].slug.current
`);

/**
 * A page with its sections resolved. The `_type == ... =>` conditionals give
 * typegen a discriminated union over `_type` — the exact shape the section
 * registry (item 14) switches on.
 */
export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    seo{ title, description, ogImage },
    sections[]{
      _key,
      _type,
      variant,
      _type == "sectionHero" => {
        eyebrow, heading, lead, image, actions[]{ _key, label, href }
      },
      _type == "sectionAbout" => {
        heading, body, image
      },
      _type == "sectionProjectGrid" => {
        heading, intro,
        projects[]->{ _id, title, "slug": slug.current, summary, year, role, stack, url, repo, cover }
      },
      _type == "sectionGallery" => {
        heading, images
      },
      _type == "sectionExperience" => {
        heading,
        items[]->{ _id, role, organisation, start, end, summary, logo }
      },
      _type == "sectionSkills" => {
        heading,
        groups[]->{ _id, label, skills }
      },
      _type == "sectionWriting" => {
        heading, intro,
        items[]->{ _id, title, publication, date, url, summary }
      },
      _type == "sectionTestimonials" => {
        heading,
        items[]->{ _id, quote, author, role, avatar }
      },
      _type == "sectionLogoWall" => {
        heading, logos
      },
      _type == "sectionStats" => {
        heading, stats[]{ _key, value, label }
      },
      _type == "sectionContact" => {
        heading, intro, email, links[]{ _key, label, href }
      },
      _type == "sectionCta" => {
        heading, intro, actions[]{ _key, label, href }
      }
    }
  }
`);
