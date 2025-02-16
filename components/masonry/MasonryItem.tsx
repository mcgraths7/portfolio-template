"use client";

import Image from "next/image";
import Link from "next/link";

import { ProjectItem } from "../../types/contentful";

type MasonryItemProps = {
  item: ProjectItem;
};

const MasonryItem = ({ item }: MasonryItemProps) => {
  const { heroImage, slug } = item;

  if (!heroImage) return null;

  const {
    altText,
    image: { width, height, url },
  } = heroImage;

  const imageElement = (
    <Image
      src={url}
      alt={altText}
      width={width}
      height={height}
      className="object-cover transition-transform duration-300"
    />
  );

  if (!slug) {
    return (
      <div className="grid-item relative px-1 py-1">
        {imageElement}
      </div>
    );
  }

  return (
    <Link
      href={`/projects/${slug}`}
      prefetch
      className="grid-item relative px-1 py-1 group"
    >
      {imageElement}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-bg-opacity duration-300 flex items-center justify-center">
        <span className="text-lg font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.name}
        </span>
      </div>
    </Link>
  );
};

export default MasonryItem;
