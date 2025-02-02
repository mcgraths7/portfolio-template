import { Navigation } from "@/types/sanity";
import { PortableText } from "next-sanity";

interface FooterProps {
  data: Navigation;
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { content } = data;
  return (
    <footer className="py-6">
      <div className="footer-content">
        <p>&copy; {currentYear}</p>
        {content && <PortableText value={content} />}        
      </div>
    </footer>
  );
}
