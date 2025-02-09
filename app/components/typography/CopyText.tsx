import { PortableText, PortableTextBlock } from "next-sanity";

interface CopyProps {
    content: PortableTextBlock[];
}

export default function CopyText({ content }: CopyProps) {
  return (
    <div className="text-md mb-12">
      <PortableText value={content} />
    </div>
  );
}
