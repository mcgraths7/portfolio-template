"use client";

import styled from "styled-components";

interface PageProps {
  title: string;
  emphasisText: string;
  inverted: boolean;
}

const Title = styled.h1`
  font-weight: 700;
  margin-bottom: var(--space-12);
`;

const EmphasisText = styled.span<{ inverted: boolean }>`
  font-size: ${(props) => (props.inverted ? "var(--text-5xl)" : "var(--text-3xl)")};
  background: linear-gradient(90deg, hsl(var(--color-primary)) 0%, hsl(var(--color-secondary)) 50%, hsl(var(--color-accent)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const RegularText = styled.span<{ inverted: boolean }>`
  font-size: ${(props) => (props.inverted ? "var(--text-3xl)" : "var(--text-5xl)")};
`;

export default function PageTitle({ title, emphasisText, inverted }: PageProps) {
  return (
    <Title>
      {inverted ? (
        <>
          {emphasisText && <EmphasisText inverted={inverted}>{emphasisText}</EmphasisText>}
          {title && (
            <RegularText inverted={inverted}>
              <br />
              {title}
            </RegularText>
          )}
        </>
      ) : (
        <>
          {title && <RegularText inverted={inverted}>{title}</RegularText>}
          {emphasisText && (
            <EmphasisText inverted={inverted}>
              <br />
              {emphasisText}
            </EmphasisText>
          )}
        </>
      )}
    </Title>
  );
}
