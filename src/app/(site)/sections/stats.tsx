import { Cluster, Grid } from "@sorbet/component-library/layout";
import { Section, Stat } from "@sorbet/component-library/molecules";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Stats = Extract<PageSection, { _type: "sectionStats" }>;

export function StatsSection({ section }: { section: Stats }) {
  const { variant, heading, stats } = section;
  if (!stats || stats.length === 0) {
    return null;
  }

  const tiles = stats.map((s) => <Stat key={s._key} value={s.value} label={s.label} />);

  return (
    <Section title={heading ?? undefined}>
      {variant === "row" ? (
        <Cluster gap={8} justify="between">
          {tiles}
        </Cluster>
      ) : (
        <Grid min="10rem" gap={6}>
          {tiles}
        </Grid>
      )}
    </Section>
  );
}
