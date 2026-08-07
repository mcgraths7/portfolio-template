/**
 * Proves the Sanity project is reachable and the credentials work, without
 * printing a single secret. `pnpm check:sanity` (reads .env.local via Node's
 * --env-file-if-exists; not run in CI, which has no credentials).
 *
 * Three probes, weakest to strongest:
 *   1. anonymous published read — project id + dataset are real and public
 *      reads work (this is the rendering path)
 *   2. authenticated drafts read — the token is valid (write scope is proven
 *      by the seeder, the first thing that actually writes)
 *   3. PAGE_QUERY end to end — the real page query parses and executes
 *      server-side; before seeding it correctly returns null
 */

import { createClient } from "@sanity/client";
import { styleText } from "node:util";

import { apiVersion, dataset, projectId } from "../sanity/env.ts";
import { PAGE_QUERY } from "../sanity/lib/queries.ts";

if (projectId === "placeholder") {
  console.error(styleText("red", "✗ NEXT_PUBLIC_SANITY_PROJECT_ID is not set — copy .env.example to .env.local and fill it in"));
  process.exit(1);
}

const token = process.env.SANITY_API_WRITE_TOKEN;
const anon = createClient({ projectId, dataset, apiVersion, useCdn: false });

let failures = 0;

try {
  const count = await anon.fetch("count(*)");
  console.log(styleText("green", `✓ anonymous read from ${projectId}/${dataset} — ${count} document(s)`));
} catch (err) {
  failures++;
  console.error(styleText("red", `✗ anonymous read failed: ${(err as Error).message}`));
}

if (token) {
  try {
    const count = await anon
      .withConfig({ token, perspective: "drafts" })
      .fetch("count(*)");
    console.log(styleText("green", `✓ token accepted — ${count} document(s) visible in drafts perspective`));
  } catch (err) {
    failures++;
    console.error(styleText("red", `✗ token rejected: ${(err as Error).message}`));
  }
} else {
  console.log(styleText("yellow", "! SANITY_API_WRITE_TOKEN not set — skipping auth probe (seeding will need it)"));
}

try {
  const page = await anon.fetch(PAGE_QUERY, { slug: "home" });
  console.log(
    page === null
      ? styleText("green", "✓ PAGE_QUERY parses and executes — null for slug \"home\" (expected before seeding)")
      : styleText("green", `✓ PAGE_QUERY resolved "${page.title}" with ${page.sections?.length ?? 0} section(s)`),
  );
  if (page?.sections?.length) {
    for (const s of page.sections) {
      console.log(`    ${s._type} · ${s.variant}`);
    }
  }
} catch (err) {
  failures++;
  console.error(styleText("red", `✗ PAGE_QUERY failed: ${(err as Error).message}`));
}

if (failures > 0) {
  console.error(styleText("red", `\n✗ ${failures} probe(s) failed`));
  process.exit(1);
}
