"use client";

import Image from "next/image";

import { DetailedImage } from "../../types/sanity";

interface HeroImageProps {
  heroImage: DetailedImage;
}

const HeroImage = ({ heroImage }: HeroImageProps) => {
  return (
    <div className="relative w-[440px] h-[600px]">
      <Image
        src={heroImage.url}
        alt={heroImage.altText}
        fill
        className="object-cover"
      />
    </div>
  );
};

export default HeroImage;
