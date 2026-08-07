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

/** Pinned to a date, so the API shape cannot change under the app. */
export const apiVersion = "2026-08-01";
