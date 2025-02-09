import { PortableText, PortableTextBlock } from "next-sanity";

interface CopyProps {
    content: PortableTextBlock[];
}

export default function CopyText({ content }: CopyProps) {
  return (
    <div className="text-md mb-12 text-justify pe-16">
      <PortableText value={content} />
    </div>
  );
}
