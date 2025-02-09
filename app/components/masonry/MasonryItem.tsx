import { Project } from "@/types/sanity";
import Image from "next/image";
import Link from "next/link";

type MasonryItemProps = {
  item: Project;
};

const MasonryItem = ({ item }: MasonryItemProps) => {
  const { heroImage } = item;
  const {
    url,
    altText,
    image: { dimensions },
  } = heroImage;

  return (
    <Link
      href={`/projects/${item.slug.current}`}
      prefetch
      className="grid-item relative px-1 py-1 group"
    >
      <Image
        src={url}
        alt={altText}
        width={dimensions.width}
        height={dimensions.height}
        className="object-cover transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-bg-opacity duration-300 flex items-center justify-center">
        <span className="text-lg font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.name}
        </span>
      </div>
    </Link>
  );
};

export default MasonryItem;
