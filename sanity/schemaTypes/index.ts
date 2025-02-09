import { type SchemaTypeDefinition } from "sanity";
import project from "./projectSchema";
import navigation from "./navSchema";
import pageScaffold from "./pageScaffoldSchema";
import projectSection from "./projectSectionSchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, navigation, pageScaffold, projectSection],
};
