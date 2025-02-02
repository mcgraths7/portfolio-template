import { PortableText, PortableTextBlock } from "next-sanity";

interface CopyProps {
    content: PortableTextBlock[];
}

export default function CopyText({ content }: CopyProps) {
  return (
    <div className="mt-8 text-md">
      <PortableText value={content} />
    </div>
  );
}
