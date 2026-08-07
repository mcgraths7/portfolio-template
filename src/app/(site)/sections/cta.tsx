import { Button, Heading, Lead } from "@sorbet/component-library/atoms";
import { Center, Cluster, Stack } from "@sorbet/component-library/layout";
import { Card, CardBody } from "@sorbet/component-library/molecules";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Cta = Extract<PageSection, { _type: "sectionCta" }>;

export function CtaSection({ section }: { section: Cta }) {
  const { variant, heading, intro, actions } = section;

  const inner = (center: boolean) => (
    <Stack gap={4} align={center ? "center" : undefined}>
      <Heading level={2} align={center ? "center" : undefined}>
        {heading}
      </Heading>
      {intro && <Lead align={center ? "center" : undefined}>{intro}</Lead>}
      {actions && actions.length > 0 && (
        <Cluster gap={3} justify={center ? "center" : undefined}>
          {actions.map((action, i) => (
            <Button key={action._key} as="a" href={action.href ?? "#"} size="lg" variant={i === 0 ? undefined : "ghost"}>
              {action.label}
            </Button>
          ))}
        </Cluster>
      )}
    </Stack>
  );

  switch (variant) {
    // Full-width sunken band — the meal-kit closing-CTA pattern.
    case "banner":
      return (
        <Card variant="sunken" as="section">
          <CardBody>{inner(true)}</CardBody>
        </Card>
      );

    case "card":
      return (
        <Card as="section">
          <CardBody>{inner(false)}</CardBody>
        </Card>
      );

    case "centered":
      return (
        <Center as="section" intrinsic>
          {inner(true)}
        </Center>
      );
  }
}
