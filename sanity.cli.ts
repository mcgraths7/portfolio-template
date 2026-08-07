import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

/**
 * Config for the `sanity` CLI — distinct from sanity.config.ts, which is the
 * Studio. This is what `sanity schema extract` and `sanity typegen` read, so
 * the generated types come from the same schema the Studio renders.
 */
export default defineCliConfig({
  api: { projectId, dataset },
});
