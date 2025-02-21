"use client";

import Link from "next/link";
import styled from "styled-components";

import { ProjectItem } from "../../types/contentful";

type MasonryItemProps = {
  item: ProjectItem;
};

const GridItem = styled.div`
  position: relative;
  padding: 0.25rem;
`;

const StyledLink = styled(Link)`
  position: relative;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
  border-radius: 0.5rem;
  &:hover {
    opacity: 0.55;
  }
  &:hover .text {
    opacity: 1;
  }
`;

const Text = styled.span`
  font-size: 1.125rem;
  font-weight: bold;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const MasonryItem = ({ item }: MasonryItemProps) => {
  const { heroImage, slug } = item;

  if (!heroImage) return null;

  const {
    altText,
    image: { width, height, url },
  } = heroImage;

  const imageElement = (
    <StyledImage
      src={url}
      alt={altText}
      width={width}
      height={height}
    />
  );

  if (!slug) {
    return <GridItem>{imageElement}</GridItem>;
  }

  return (
    <StyledLink href={`/projects/${slug}`} prefetch>
      {imageElement}
      <Overlay className="overlay">
        <Text className="text">{item.name}</Text>
      </Overlay>
    </StyledLink>
  );
};

export default MasonryItem;
