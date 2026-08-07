import { Button, Input, Text, Textarea } from "@sorbet/component-library/atoms";
import { Cluster, Grid, Stack } from "@sorbet/component-library/layout";
import { Field, Section } from "@sorbet/component-library/molecules";

import type { PageSection } from "../../../../sanity/lib/fetch";

type Contact = Extract<PageSection, { _type: "sectionContact" }>;

/**
 * The "form" variant has no backend by design — a static template can't
 * receive a POST. It submits via mailto:, which opens the visitor's mail
 * client with the message prefilled; the email link beside it is the fallback
 * spelled out. A real deployment swaps `action` for its form endpoint.
 */
export function ContactSection({ section }: { section: Contact }) {
  const { variant, heading, intro, email, links } = section;

  const linkRow = (
    <Cluster gap={3}>
      {email && (
        <Button as="a" href={`mailto:${email}`}>
          Email me
        </Button>
      )}
      {(links ?? []).map((link) => (
        <Button key={link._key} as="a" href={link.href ?? "#"} variant="ghost">
          {link.label}
        </Button>
      ))}
    </Cluster>
  );

  const body = (() => {
    switch (variant) {
      case "links":
        return linkRow;

      case "form":
        return (
          <Stack gap={4} as="form" action={email ? `mailto:${email}` : undefined} method="get">
            <Grid cols={2} gap={4}>
              <Field label="Your name">
                <Input name="name" autoComplete="name" />
              </Field>
              <Field label="Your email">
                <Input type="email" name="email" autoComplete="email" />
              </Field>
            </Grid>
            <Field label="Message">
              <Textarea name="body" rows={5} />
            </Field>
            <Cluster gap={3} align="center">
              <Button type="submit">Send</Button>
              {email && (
                <Text size="sm" tone="muted">
                  Opens your mail client — or write to {email} directly.
                </Text>
              )}
            </Cluster>
          </Stack>
        );

      case "split":
        return (
          <Grid cols={2} gap={8}>
            <Stack gap={3}>{intro && <Text tone="muted">{intro}</Text>}</Stack>
            {linkRow}
          </Grid>
        );
    }
  })();

  return (
    <Section title={heading ?? undefined} description={variant === "split" ? undefined : (intro ?? undefined)} id="contact">
      {body}
    </Section>
  );
}
