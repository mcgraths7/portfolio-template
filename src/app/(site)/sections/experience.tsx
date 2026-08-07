import { Avatar, Divider, Overline, Text } from "@sorbet/component-library/atoms";
import { Cluster, Grid, Stack } from "@sorbet/component-library/layout";
import { Card, CardBody, CardTitle, Section } from "@sorbet/component-library/molecules";

import { hasAsset, imageUrl } from "../../../../sanity/lib/image";
import { monthYear } from "./shared";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Experience = Extract<PageSection, { _type: "sectionExperience" }>;
type Item = NonNullable<Experience["items"]>[number];

function span(item: Item): string {
  const from = monthYear(item.start) ?? "—";
  const to = item.end ? monthYear(item.end) : "Present";
  return `${from} – ${to}`;
}

function Logo({ item }: { item: Item }) {
  return hasAsset(item.logo) ? (
    <Avatar src={imageUrl(item.logo, 96, 96)} alt="" size="sm" />
  ) : (
    <Avatar alt="" size="sm">{item.organisation?.[0] ?? "•"}</Avatar>
  );
}

function Entry({ item }: { item: Item }) {
  return (
    <Stack gap={2}>
      <Cluster gap={3} align="center">
        <Logo item={item} />
        <Stack gap={0}>
          <Text weight="semibold">{item.role}</Text>
          <Text size="sm" tone="muted">
            {item.organisation}
          </Text>
        </Stack>
      </Cluster>
      <Overline>{span(item)}</Overline>
      {item.summary && <Text tone="muted">{item.summary}</Text>}
    </Stack>
  );
}

export function ExperienceSection({ section }: { section: Experience }) {
  const { variant, heading, items } = section;
  if (!items || items.length === 0) {
    return null;
  }

  const body = (() => {
    switch (variant) {
      // A timeline reads as an ordered sequence with visible joins: entries
      // separated by rules, dates leading. Composition, not bespoke CSS.
      case "timeline":
        return (
          <Stack gap={6}>
            {items.map((item, i) => (
              <Stack key={item._id} gap={6}>
                {i > 0 && <Divider />}
                <Entry item={item} />
              </Stack>
            ))}
          </Stack>
        );

      case "list":
        return (
          <Stack gap={8}>
            {items.map((item) => (
              <Entry key={item._id} item={item} />
            ))}
          </Stack>
        );

      case "cards":
        return (
          <Grid min="16rem" gap={6}>
            {items.map((item) => (
              <Card key={item._id} as="article">
                <CardBody>
                  <Stack gap={3}>
                    <Cluster gap={3} align="center">
                      <Logo item={item} />
                      <CardTitle>{item.role}</CardTitle>
                    </Cluster>
                    <Overline>
                      {item.organisation} · {span(item)}
                    </Overline>
                    {item.summary && <Text tone="muted">{item.summary}</Text>}
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        );
    }
  })();

  return <Section title={heading ?? undefined}>{body}</Section>;
}
