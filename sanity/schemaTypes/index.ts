import { type SchemaTypeDefinition } from "sanity";
import project from "./project-schema";
import copy from "./copy-schema";
import navigation from "./nav-schema";
import pageScaffold from "./page-scaffold-schema";
import gallery from "./gallery-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, copy, navigation, pageScaffold, gallery],
};
