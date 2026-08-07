import { Button, Overline, Text } from "@sorbet/component-library/atoms";
import { Grid, Stack } from "@sorbet/component-library/layout";
import { Card, CardBody, CardFooter, CardTitle, Section } from "@sorbet/component-library/molecules";

import { monthYear } from "./shared";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Writing = Extract<PageSection, { _type: "sectionWriting" }>;
type Item = NonNullable<Writing["items"]>[number];

const meta = (item: Item) => [item.publication, monthYear(item.date)].filter(Boolean).join(" · ");

export function WritingSection({ section }: { section: Writing }) {
  const { variant, heading, intro, items } = section;
  if (!items || items.length === 0) {
    return null;
  }

  const body =
    variant === "list" ? (
      <Stack gap={6}>
        {items.map((item) => (
          <Stack key={item._id} gap={1} as="article">
            {meta(item) && <Overline>{meta(item)}</Overline>}
            <Text weight="semibold" as="h3">
              {item.url ? <a href={item.url}>{item.title}</a> : item.title}
            </Text>
            {item.summary && <Text tone="muted">{item.summary}</Text>}
          </Stack>
        ))}
      </Stack>
    ) : (
      <Grid min="16rem" gap={6}>
        {items.map((item) => (
          <Card key={item._id} as="article">
            <CardBody>
              <Stack gap={2}>
                {meta(item) && <Overline>{meta(item)}</Overline>}
                <CardTitle>{item.title}</CardTitle>
                {item.summary && <Text tone="muted">{item.summary}</Text>}
              </Stack>
            </CardBody>
            {item.url && (
              <CardFooter>
                <Button as="a" href={item.url} size="sm" variant="ghost">
                  Read
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </Grid>
    );

  return (
    <Section title={heading ?? undefined} description={intro ?? undefined}>
      {body}
    </Section>
  );
}
