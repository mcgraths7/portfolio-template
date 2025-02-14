"use client";

import { PortableText } from "next-sanity";
import { Navigation } from "../../types/sanity";

export default function Footer({ footer }: { footer?: Navigation }) {
  if (!footer) return null;
  
  const currentYear = new Date().getFullYear();
  const { content } = footer;
  return (
    <footer className="py-6">
      <div className="footer-content">
        <p>&copy; {currentYear}</p>
        {content && <PortableText value={content} />}
      </div>
    </footer>
  );
}
