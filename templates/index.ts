import { graphicDesigner } from "./graphic-designer.ts";
import { photographer } from "./photographer.ts";
import { softwareEngineer } from "./software-engineer.ts";
import { writer } from "./writer.ts";

import type { PersonaTemplate } from "./types.ts";

/**
 * Every persona the scaffold can seed. Adding one is a new file plus a line
 * here — if it needs anything more than that, the section model is too rigid
 * and should be widened instead (see docs/PLAN.md, item 16).
 *
 * One persona resides in the dataset at a time: every template's page claims
 * the "home" slug, so seed B over A gives the renderer two "home" pages and an
 * arbitrary winner. Swap with `pnpm seed A --clean && pnpm seed B`.
 */
export const templates: Record<string, PersonaTemplate> = {
  [softwareEngineer.persona]: softwareEngineer,
  [graphicDesigner.persona]: graphicDesigner,
  [photographer.persona]: photographer,
  [writer.persona]: writer,
};
