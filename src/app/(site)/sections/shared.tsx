import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Heading, Prose, Text } from "@sorbet/component-library/atoms";

/**
 * Shared bits the section components lean on: portable-text rendering mapped
 * onto Sorbet's typed text primitives, and deterministic date formatting.
 */

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Text>{children}</Text>,
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => <a href={(value as { href?: string })?.href}>{children}</a>,
  },
};

/** CMS rich text → Sorbet typography, wrapped in Prose for flow spacing. */
export function RichText({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }
  return (
    <Prose>
      <PortableText value={value as never[]} components={components} />
    </Prose>
  );
}

/**
 * "Mar 2023" — explicit locale and UTC so the build machine's settings can
 * never leak into prerendered HTML.
 */
export function monthYear(iso: string | null | undefined): string | null {
  if (!iso) {
    return null;
  }
  const d = new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("en", { month: "short", year: "numeric", timeZone: "UTC" });
}
