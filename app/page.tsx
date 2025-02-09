"use client";

import MasonryContainer from "../app/components/masonry/MasonryContainer";
import Hero from "../app/components/typography/Hero";
import useFetchData from "../hooks/useFetchData";
import { getPageScaffold } from "../sanity/queries/pageScaffolds";
import { PageScaffold } from "../types/sanity";

export default function Home() {
  const {
    data: page,
    loading,
    error,
  } = useFetchData<PageScaffold>(getPageScaffold, "/");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!page) return <div>Error: Page with slug &quot;/&quot; not found...</div>;

  const { pageTitle, emphasisText, content, projects, heroImage} = page;

  return (
    <div className="max-w-7xl mx-auto h-full">
      <Hero title={pageTitle} emphasisText={emphasisText} content={content} heroImage={heroImage} />
      <MasonryContainer projects={projects} columnWidth={500} />
    </div>
  );
}
