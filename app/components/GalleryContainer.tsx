import { Image } from "next-sanity/image";
import Link from "next/link";
import { Gallery } from "@/types/sanity/gallery";

interface GalleryContainerProps {
  gallery: Gallery;
}

export default function GalleryContainer({ gallery }: GalleryContainerProps) {
  const { items: galleryItems } = gallery;
  return (
    <div className="mt-4 responsive-grid">
      {galleryItems &&
        galleryItems.map((g) => (
          <div key={g._id}>
            <div className="grid gap-4">
              <Link
                href={`/projects/${g.slug}`}
                className="hover:scale-105 transition block"
              >
                {g.image && (
                  <Image
                    src={g.image.url}
                    alt={g.image.alt || "Project image"}
                    width={500}
                    height={250}
                    className="rounded-lg object-cover"
                  />
                )}
                <h3 className="mt-2 font-extrabold rainbow-text">
                  {g.name}
                </h3>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
