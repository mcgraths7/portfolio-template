import Image from "next/image";
import Link from "next/link";

import { Gallery } from "@/types/sanity/gallery";

interface GalleryContainerProps {
  gallery: Gallery;
}

export default function GalleryContainer({ gallery }: GalleryContainerProps) {
  const { items: galleryItems } = gallery;
  return (
    <div className="responsive-grid mb-12">
      {galleryItems &&
        galleryItems.map((g) => (
          <div key={g._id} className="group">
            <Link
              href={`/projects/${g.slug}`}
              prefetch={true}
              className="block hover:scale-105 transition-transform"
            >
              {g.image && (
                <div className="relative aspect-w-16 aspect-h-9">
                  <Image
                    src={g.image.url}
                    alt={g.image.alt || "Project image"}
                    fill={true}
                    className="rounded-lg object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              )}
              <h3 className="mt-2 font-extrabold rainbow-text">
                {g.name}
              </h3>
            </Link>
          </div>
        ))}
    </div>
  );
}
