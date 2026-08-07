import { Badge, Text } from "@sorbet/component-library/atoms";
import { Cluster, Grid, Stack } from "@sorbet/component-library/layout";
import { Section } from "@sorbet/component-library/molecules";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Skills = Extract<PageSection, { _type: "sectionSkills" }>;

export function SkillsSection({ section }: { section: Skills }) {
  const { variant, heading, groups } = section;
  if (!groups || groups.length === 0) {
    return null;
  }

  const group = (g: NonNullable<Skills["groups"]>[number]) => (
    <Stack key={g._id} gap={2}>
      <Text weight="semibold">{g.label}</Text>
      <Cluster gap={2} as="ul" aria-label={g.label}>
        {(g.skills ?? []).map((skill) => (
          <li key={skill}>
            <Badge>{skill}</Badge>
          </li>
        ))}
      </Cluster>
    </Stack>
  );

  const body = (() => {
    switch (variant) {
      // One flat cloud — group labels dropped on purpose.
      case "chips":
        return (
          <Cluster gap={2} as="ul" aria-label={heading ?? "Skills"}>
            {groups.flatMap((g) =>
              (g.skills ?? []).map((skill) => (
                <li key={`${g._id}-${skill}`}>
                  <Badge>{skill}</Badge>
                </li>
              )),
            )}
          </Cluster>
        );

      case "grouped":
        return <Stack gap={6}>{groups.map(group)}</Stack>;

      case "columns":
        return (
          <Grid min="14rem" gap={6}>
            {groups.map(group)}
          </Grid>
        );
    }
  })();

  return <Section title={heading ?? undefined}>{body}</Section>;
}
