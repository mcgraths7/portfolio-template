import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

/**
 * Config for the `sanity` CLI — distinct from sanity.config.ts, which is the
 * Studio. This is what `sanity schema extract` and `sanity typegen` read, so
 * the generated types come from the same schema the Studio renders.
 *
 * `typegen` lives here rather than in a separate sanity-typegen.json — the
 * standalone file is deprecated and warns on every run.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    path: ["./sanity/**/*.ts", "./src/**/*.{ts,tsx}"],
    schema: "./schema.json",
    generates: "./sanity/types.generated.ts",
  },
});
