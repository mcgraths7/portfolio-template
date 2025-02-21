"use client";

import styled from "styled-components";

import { DetailedImage } from "../../types/contentful";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 600px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 11/15;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface HeroImageProps {
  heroImage: DetailedImage;
}

const HeroImage = ({ heroImage }: HeroImageProps) => {
  return (
    <ImageContainer>
      <StyledImage src={heroImage.image.url} alt={heroImage.altText} />
    </ImageContainer>
  );
};

export default HeroImage;