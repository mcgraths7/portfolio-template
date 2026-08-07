import { softwareEngineer } from "./software-engineer.ts";

import type { PersonaTemplate } from "./types.ts";

/**
 * Every persona the scaffold can seed. Adding one is a new file plus a line
 * here — if it needs anything more than that, the section model is too rigid
 * and should be widened instead (see docs/PLAN.md, item 16).
 */
export const templates: Record<string, PersonaTemplate> = {
  [softwareEngineer.persona]: softwareEngineer,
};
