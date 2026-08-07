/**
 * Project coordinates, in their own module for a non-obvious reason.
 *
 * Exporting `projectId` or `dataset` as named exports from `sanity.config.ts`
 * makes the Sanity CLI load a config with no schema — silently. No error, no
 * warning, and `sanity schemas validate` then reports "0 errors" because it is
 * validating nothing at all. An unrelated named export is harmless; these two
 * names are not, presumably because they collide with config keys the loader
 * looks for.
 *
 * Rather than rely on that distinction, keep sanity.config.ts to its default
 * export and put the values here. `pnpm check:schema` fails if this regresses.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * False until someone fills .env.local (or deploy-time env). The site renders
 * a setup notice instead of fetching, so `pnpm build` succeeds on a fresh
 * clone with no Sanity project — a template must not demand credentials just
 * to compile. When this IS true and a fetch still fails, that failure stays
 * loud: a configured site that cannot reach its content should fail its build,
 * not ship empty.
 */
export const isConfigured = projectId !== "placeholder";

/** Pinned to a date, so the API shape cannot change under the app. */
export const apiVersion = "2026-08-01";
