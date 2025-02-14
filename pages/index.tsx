"use client";

import { useState, useEffect } from "react";

import MasonryContainer from "../components/masonry/MasonryContainer";
import Hero from "../components/typography/Hero";
import { getPageScaffold } from "../sanity/queries/pageScaffolds";
import { PageScaffold } from "../types/sanity";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [pageScaffold, setPageScaffold] = useState<PageScaffold>();

  useEffect(() => {
    const fetchPageScaffold = async () => {
      const pageScaffold = await getPageScaffold("/");
      setPageScaffold(pageScaffold);
    };

    try {
      fetchPageScaffold();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!pageScaffold) return <div>There was a problem loading the page</div>;

  const { pageTitle, emphasisText, content, heroImage, projects } =
    pageScaffold;

  return (
    <div className="max-w-7xl mx-auto h-full">
      <Hero
        title={pageTitle}
        emphasisText={emphasisText}
        content={content}
        heroImage={heroImage}
      />
      <MasonryContainer projects={projects} columnWidth={500} />
    </div>
  );
}
