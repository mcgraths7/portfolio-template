"use client";

import { useState, useEffect } from "react";

import RootLayout from "../components/layout/RootLayout";
import MasonryContainer from "../components/masonry/MasonryContainer";
import Hero from "../components/typography/Hero";
import { getPageScaffold } from "../sanity/queries/pageScaffolds";
import { getNavigation } from "../sanity/queries/nav";
import { Navigation, PageScaffold } from "../types/sanity";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [pageScaffold, setPageScaffold] = useState<PageScaffold>();
  const [footer, setFooter] = useState<Navigation>();
  const [header, setHeader] = useState<Navigation>();

  useEffect(() => {
    const fetchPageScaffold = async () => {
      const pageScaffold = await getPageScaffold("home");
      setPageScaffold(pageScaffold);
    };

    const fetchFooter = async () => {
      const footer = await getNavigation("footer");
      setFooter(footer);
    };

    const fetchHeader = async () => {
      const header = await getNavigation("header");
      setHeader(header);
    };

    try {
      fetchPageScaffold();
      fetchFooter();
      fetchHeader();
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
    <RootLayout footer={footer} header={header}>
      <div className="max-w-7xl mx-auto h-full">
        <Hero
          title={pageTitle}
          emphasisText={emphasisText}
          content={content}
          heroImage={heroImage}
        />
        <MasonryContainer projects={projects} columnWidth={500} />
      </div>
    </RootLayout>
  );
}
