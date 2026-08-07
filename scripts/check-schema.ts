/**
 * Validates the schema, and proves the validation was not vacuous.
 *
 * `sanity schemas validate` reports "0 errors" whether the schema is clean or
 * whether the CLI loaded a config containing no schema at all. Those look
 * identical and mean opposite things. Re-exporting `projectId` or `dataset`
 * from sanity.config.ts is enough to cause the second, silently.
 *
 * So this extracts the schema, asserts every type we declared is actually in
 * it, and only then trusts the validator. Without the extract check, "green"
 * here would be worth nothing.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { styleText } from "node:util";

import { DOCUMENT_TYPES, OBJECT_TYPES, SECTION_TYPES } from "../sanity/schemas/type-names.ts";

const EXPECTED = [...DOCUMENT_TYPES, ...SECTION_TYPES, ...OBJECT_TYPES];

const sanity = join(process.cwd(), "node_modules", ".bin", "sanity");

// `--path` is joined onto the working directory even when given an absolute
// path, so an OS temp dir would be recreated *inside* the repo. Keep it
// relative and gitignored.
const out = ".schema-check.json";

try {
  execFileSync(sanity, ["schema", "extract", "--path", out, "--force"], {
    stdio: ["ignore", "ignore", "pipe"],
  });

  const extracted: { name: string }[] = JSON.parse(readFileSync(out, "utf8"));
  const names = new Set(extracted.map((t) => t.name));
  const missing = EXPECTED.filter((name) => !names.has(name));

  console.log(`${extracted.length} types extracted · ${EXPECTED.length} declared`);

  if (missing.length > 0) {
    console.error(styleText("red", `\n✗ ${missing.length} declared type(s) absent from the extracted schema:`));
    for (const name of missing) {
      console.error(styleText("red", `    ${name}`));
    }
    console.error(
      styleText(
        "red",
        "\nThe CLI is not seeing the schema. Check that sanity.config.ts keeps to its default export —\nre-exporting projectId or dataset from it produces exactly this, and makes `validate` pass vacuously.",
      ),
    );
    process.exit(1);
  }

  execFileSync(sanity, ["schemas", "validate"], { stdio: ["ignore", "inherit", "inherit"] });
  console.log(styleText("green", "\n✓ schema is valid, and the validator saw every declared type"));
} finally {
  rmSync(out, { force: true });
}
