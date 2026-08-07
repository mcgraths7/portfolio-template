/**
 * The seeding engine: turns a persona template into published Sanity content.
 *
 *   pnpm seed <persona>            create or update everything the template declares
 *   pnpm seed <persona> --dry-run  print the document graph, write nothing
 *   pnpm seed <persona> --clean    delete exactly what the template would create
 *
 * Idempotency comes from determinism, not machinery. Every document ID is a
 * pure function of the template (`seed-<persona>-<kind>-<slug>`), so a re-run
 * createOrReplaces the same IDs — updates, never duplicates — and --clean can
 * recompute the exact ID list from the template file. The template IS the
 * manifest; nothing else is tracked. Hand-made documents are untouchable by
 * construction, because their IDs are not in the list.
 *
 * Assets are deterministic SVG placeholders. Sanity dedupes uploads by content
 * hash, so re-seeding is free; --clean removes them by their filename prefix.
 *
 * Two sharp edges, deliberate:
 *   - `siteSettings` keeps the fixed singleton ID (the Studio pins it), so
 *     seeding a persona SETS the site identity and --clean removes it.
 *   - A re-run replaces seeded documents wholesale. Edits made in the Studio
 *     to SEEDED documents are overwritten; that is what refreshing a seed
 *     means. Documents the Studio created itself are never in the ID list.
 */

import { createClient, type IdentifiedSanityDocumentStub } from "@sanity/client";
import { styleText } from "node:util";

import { apiVersion, dataset, projectId } from "../sanity/env.ts";
import { templates } from "../templates/index.ts";
import { placeholderSvg } from "./placeholder-svg.ts";

import type {
  AnySeedDoc,
  ImageSlot,
  PersonaTemplate,
  SectionSeed,
  SeedDoc,
} from "../templates/types.ts";
import type { Page, Project, SiteSettings } from "../sanity/types.generated.ts";

// ---- arguments -------------------------------------------------------------

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const persona = args.find((a) => !a.startsWith("--"));
const dryRun = flags.has("--dry-run");
const clean = flags.has("--clean");

if (!persona || !(persona in templates)) {
  const known = Object.keys(templates).join(", ");
  console.error(styleText("red", `usage: pnpm seed <persona> [--dry-run|--clean]  (personas: ${known})`));
  process.exit(1);
}
const template = templates[persona];

// ---- deterministic naming --------------------------------------------------

const id = (kind: string, slug: string) => `seed-${template.persona}-${kind}-${slug}`;
const assetFilename = (key: string) => `seed-${template.persona}-${key}.svg`;

/** Image slot → the schema's image shape, once asset IDs are known. */
function image(slot: ImageSlot | undefined, assetIds: Map<string, string>) {
  if (!slot) {
    return undefined;
  }
  const ref = assetIds.get(slot.asset);
  if (!ref) {
    throw new Error(`image slot references unknown asset "${slot.asset}"`);
  }
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: ref },
    ...(slot.alt ? { alt: slot.alt } : {}),
  };
}

/** Paragraphs → portable text, with deterministic keys. */
function blocks(paragraphs: string[] | undefined, prefix: string) {
  return paragraphs?.map((text, i) => ({
    _type: "block" as const,
    _key: `${prefix}-${i}`,
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span" as const, _key: `${prefix}-${i}-0`, text, marks: [] }],
  }));
}

const keyed = <T extends object>(items: T[] | undefined, prefix: string) =>
  items?.map((item, i) => ({ _key: `${prefix}-${i}`, ...item }));

const refs = (kind: string, slugs: string[], prefix: string) =>
  slugs.map((slug, i) => ({
    _key: `${prefix}-${i}`,
    _type: "reference" as const,
    _ref: id(kind, slug),
  }));

// ---- template → documents --------------------------------------------------

function buildSection(section: SectionSeed, i: number): NonNullable<Page["sections"]>[number] {
  const key = `${section.type}-${i}`;
  const base = { _key: key };
  switch (section.type) {
    case "sectionHero":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        eyebrow: section.eyebrow,
        heading: section.heading,
        lead: section.lead,
        image: image(section.image, assetIds),
        actions: keyed(section.actions?.map((a) => ({ _type: "link" as const, ...a })), key),
      };
    case "sectionAbout":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        body: blocks(section.body, key),
        image: image(section.image, assetIds),
      };
    case "sectionProjectGrid":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        intro: section.intro,
        projects: refs("project", section.projects, key),
      };
    case "sectionGallery":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        images: section.images.map((slot, j) => ({ _key: `${key}-${j}`, ...image(slot, assetIds)! })),
      };
    case "sectionExperience":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        items: refs("experience", section.items, key),
      };
    case "sectionSkills":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        groups: refs("skillGroup", section.groups, key),
      };
    case "sectionWriting":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        intro: section.intro,
        items: refs("writing", section.items, key),
      };
    case "sectionTestimonials":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        items: refs("testimonial", section.items, key),
      };
    case "sectionLogoWall":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        logos: section.logos.map((slot, j) => ({ _key: `${key}-${j}`, ...image(slot, assetIds)! })),
      };
    case "sectionStats":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        stats: keyed(section.stats, key),
      };
    case "sectionContact":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        intro: section.intro,
        email: section.email,
        links: keyed(section.links?.map((l) => ({ _type: "link" as const, ...l })), key),
      };
    case "sectionCta":
      return {
        ...base,
        _type: section.type,
        variant: section.variant,
        heading: section.heading,
        intro: section.intro,
        actions: keyed(section.actions?.map((a) => ({ _type: "link" as const, ...a })), key),
      };
  }
}

/** Filled during seeding; empty for dry-run/clean, where IDs are not needed. */
const assetIds = new Map<string, string>();

function buildDocuments(t: PersonaTemplate): AnySeedDoc[] {
  const settings: SeedDoc<SiteSettings> = {
    _id: "siteSettings",
    _type: "siteSettings",
    name: t.settings.name,
    tagline: t.settings.tagline,
    preset: t.preset,
    avatar: image(t.settings.avatar, assetIds),
    social: keyed(t.settings.social, "social"),
    footer: t.settings.footer,
  };

  const projects: SeedDoc<Project>[] = (t.projects ?? []).map((p) => ({
    _id: id("project", p.slug),
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    summary: p.summary,
    year: p.year,
    role: p.role,
    stack: p.stack,
    url: p.url,
    repo: p.repo,
    cover: image(p.cover, assetIds),
    gallery: p.gallery?.map((slot, j) => ({ _key: `gallery-${j}`, ...image(slot, assetIds)! })),
    body: blocks(p.body, "body"),
  }));

  const experience = (t.experience ?? []).map((e) => ({
    _id: id("experience", e.slug),
    _type: "experience" as const,
    role: e.role,
    organisation: e.organisation,
    start: e.start,
    end: e.end,
    summary: e.summary,
    logo: image(e.logo, assetIds),
  }));

  const writing = (t.writing ?? []).map((w) => ({
    _id: id("writing", w.slug),
    _type: "writing" as const,
    title: w.title,
    publication: w.publication,
    date: w.date,
    url: w.url,
    summary: w.summary,
  }));

  const testimonials = (t.testimonials ?? []).map((x) => ({
    _id: id("testimonial", x.slug),
    _type: "testimonial" as const,
    quote: x.quote,
    author: x.author,
    role: x.role,
    avatar: image(x.avatar, assetIds),
  }));

  const skillGroups = (t.skillGroups ?? []).map((g) => ({
    _id: id("skillGroup", g.slug),
    _type: "skillGroup" as const,
    label: g.label,
    skills: g.skills,
  }));

  const pages: SeedDoc<Page>[] = t.pages.map((p) => ({
    _id: id("page", p.slug),
    _type: "page",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    seo: p.seo
      ? { title: p.seo.title, description: p.seo.description, ogImage: image(p.seo.ogImage, assetIds) }
      : undefined,
    sections: p.sections.map(buildSection),
  }));

  return [settings, ...projects, ...experience, ...writing, ...testimonials, ...skillGroups, ...pages];
}

// ---- modes -----------------------------------------------------------------

const token = process.env.SANITY_API_WRITE_TOKEN;

if (dryRun) {
  // Dry-run must not require asset IDs; stub them so image() resolves.
  for (const key of Object.keys(template.assets)) {
    assetIds.set(key, `(asset:${key})`);
  }
  const docs = buildDocuments(template);
  console.log(styleText("bold", `${template.persona} → ${docs.length} document(s), ${Object.keys(template.assets).length} asset(s), preset "${template.preset}"\n`));
  for (const doc of docs) {
    console.log(`  ${doc._id}  ${styleText("dim", doc._type)}`);
    if (doc._type === "page") {
      for (const s of doc.sections ?? []) {
        console.log(`      ${s._type} · ${styleText("cyan", s.variant)}`);
      }
    }
  }
  console.log(styleText("dim", "\ndry run — nothing written"));
  process.exit(0);
}

if (!token) {
  console.error(styleText("red", "✗ SANITY_API_WRITE_TOKEN is not set — seeding writes, so it needs the token in .env.local"));
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

if (clean) {
  for (const key of Object.keys(template.assets)) {
    assetIds.set(key, "(unused)");
  }
  const ids = buildDocuments(template).map((d) => d._id);
  const txn = client.transaction();
  for (const docId of ids) {
    txn.delete(docId);
  }
  await txn.commit();
  console.log(styleText("green", `✓ deleted ${ids.length} document(s)`));

  const assets: { _id: string }[] = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename match $prefix]{_id}`,
    { prefix: `seed-${template.persona}-*` },
  );
  let removed = 0;
  for (const a of assets) {
    try {
      await client.delete(a._id);
      removed++;
    } catch {
      console.log(styleText("yellow", `  ! kept ${a._id} — still referenced by another document`));
    }
  }
  console.log(styleText("green", `✓ deleted ${removed} of ${assets.length} asset(s)`));
  process.exit(0);
}

// ---- seed ------------------------------------------------------------------

console.log(styleText("bold", `uploading ${Object.keys(template.assets).length} asset(s)…`));
for (const [key, spec] of Object.entries(template.assets)) {
  const uploaded = await client.assets.upload("image", placeholderSvg(spec), {
    filename: assetFilename(key),
  });
  assetIds.set(key, uploaded._id);
}
console.log(styleText("dim", "  (deterministic bytes — Sanity dedupes repeats by content hash)"));

const docs = buildDocuments(template);
const txn = client.transaction();
for (const doc of docs) {
  // Safety lives in buildDocuments' return type; this cast is transport only.
  txn.createOrReplace(doc as IdentifiedSanityDocumentStub);
}
await txn.commit();

console.log(styleText("green", `\n✓ seeded "${template.persona}" — ${docs.length} document(s), published`));
console.log(styleText("dim", `  re-run to update in place; --clean to remove exactly these`));
