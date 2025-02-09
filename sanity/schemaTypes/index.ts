import { type SchemaTypeDefinition } from "sanity";
import project from "./projectSchema";
import copy from "./copySchema";
import navigation from "./navSchema";
import pageScaffold from "./pageScaffoldSchema";
import projectSection from "./projectSectionSchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, copy, navigation, pageScaffold, projectSection],
};
