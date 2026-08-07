import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas/index";

/**
 * Studio configuration. The Studio is mounted inside this app at /studio
 * (step 9), so schema changes ship with a deploy and the content model cannot
 * drift from the code that renders it.
 *
 * Keep this file to its default export. Re-exporting `projectId` or `dataset`
 * from here makes the CLI load a config with no schema, silently — see
 * sanity/env.ts, and `pnpm check:schema` which fails if it regresses.
 *
 * The placeholder project ID keeps schema validation and typecheck working
 * before credentials exist; validation is entirely local. A Studio started
 * without a real project ID fails to authenticate, which is the correct and
 * obvious failure.
 */
export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
