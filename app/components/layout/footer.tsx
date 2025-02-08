"use client";

import { PortableText } from "next-sanity";

import useFetchData from "@/hooks/useFetchData";
import { getNavigation } from "@/sanity/queries/nav";
import { Navigation } from "@/types/sanity";

export default function Footer() {
  const { data, loading, error } = useFetchData<Navigation>(getNavigation, "footer");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Error: Navigation data not found...</div>;
  
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
