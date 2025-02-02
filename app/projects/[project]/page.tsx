import { PortableText } from "@portabletext/react";
import Image from "next/image";

import { getProject } from "@/sanity/queries/projects";

type ProjectProps = {
  params: { project: string };
};

export default async function Project({ params }: ProjectProps) {
  const { project: slug } = await params;
  const { name, url, content, images } = await getProject(slug);

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="rainbow-text text-5xl leading-relaxed drop-shadow font-extrabold">
          {name}
        </h1>
        <a
          href={url}
          title="View Project"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          View Project
        </a>
      </header>

      <div className="text-lg mt-5">
        <PortableText value={content} />
      </div>

      {images.length > 0 &&
        images.map((img) => (
          <Image
            key={img._key}
            src={img.url}
            alt={img.alt}
            width={1920}
            height={1080}
            className="mt-10 border-2 border-gray-700 object-cover rounded-xl"
          />
        ))}
    </div>
  );
}
