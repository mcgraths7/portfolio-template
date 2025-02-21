"use client";

import { Document } from "@contentful/rich-text-types";
import Link from "next/link";
import styled from "styled-components";

import PageTitle from "./PageTitle";
import HeroImage from "../images/HeroImage";
import { DetailedImage } from "../../types/contentful";
import { ButtonPrimary, ButtonSecondary } from "../inputs/Button";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface HeroProps {
  title: string;
  emphasisText: string;
  richTextContent: {
    json: Document;
  };
  heroImage: DetailedImage;
}

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: var(--space-12);
  margin-bottom: var(--space-24);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Content = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  gap: var(--space-4);
`;

const RichTextContent = styled.div`
  text-align: justify;
`;

const Hero: React.FC<HeroProps> = ({
  title,
  emphasisText,
  richTextContent,
  heroImage,
}) => {
  return (
    <Section>
      <Content>
        <PageTitle title={title} emphasisText={emphasisText} inverted />
        {richTextContent && (
          <RichTextContent>
            {documentToReactComponents(richTextContent.json)}
          </RichTextContent>
        )}
        <ButtonContainer>
          <Link href="/resume">
            <ButtonPrimary>Resume</ButtonPrimary>
          </Link>
          <Link href="/contact">
            <ButtonSecondary>Get in Touch</ButtonSecondary>
          </Link>
        </ButtonContainer>
      </Content>
      <Content>
        <HeroImage heroImage={heroImage} />
      </Content>
    </Section>
  );
};

export default Hero;
