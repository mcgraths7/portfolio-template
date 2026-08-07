import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemas";

/**
 * Studio configuration. The Studio is mounted inside this app at /studio
 * (step 9), so schema changes ship with a deploy and the content model cannot
 * drift from the code that renders it.
 *
 * The placeholder project ID keeps `sanity schemas validate` and `typecheck`
 * working before credentials exist — schema validation is entirely local. A
 * Studio started without a real project ID will fail to authenticate, which is
 * the correct and obvious failure.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pinned: a date, so the API shape cannot change under the app. */
export const apiVersion = "2026-08-01";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
