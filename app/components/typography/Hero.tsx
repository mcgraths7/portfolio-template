import { PortableTextBlock } from "next-sanity";
import Link from "next/link";

import PageTitle from "../../../app/components/typography/PageTitle";
import CopyText from "../../../app/components/typography/CopyText";
import HeroImage from "../../../app/components/images/HeroImage";
import { DetailedImage } from "../../../types/sanity";
import { ButtonPrimary, ButtonSecondary } from "../inputs/Button";

interface HeroProps {
  title: string;
  emphasisText: string;
  content: PortableTextBlock[];
  heroImage: DetailedImage;
}

const Hero: React.FC<HeroProps> = ({
  title,
  emphasisText,
  content,
  heroImage,
}) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
      <div className="md:w-1/2 w-full">
        <PageTitle title={title} emphasisText={emphasisText} inverted />
        <CopyText content={content} />
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
