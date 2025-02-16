"use client";

import { Document } from "@contentful/rich-text-types";
import Link from "next/link";

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

const Hero: React.FC<HeroProps> = ({
  title,
  emphasisText,
  richTextContent,
  heroImage,
}) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
      <div className="md:w-1/2 w-full">
        <PageTitle title={title} emphasisText={emphasisText} inverted />
        {richTextContent && documentToReactComponents(richTextContent.json)}
        <div className="flex gap-4">
          <Link href="/resume">
            <ButtonPrimary>Resume</ButtonPrimary>
          </Link>
          <Link href="/contact">
            <ButtonSecondary>Get in Touch</ButtonSecondary>
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        <HeroImage heroImage={heroImage} />
      </div>
    </section>
  );
};

export default Hero;
