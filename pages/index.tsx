"use client";

import { useState, useEffect } from "react";

import MasonryContainer from "../components/masonry/MasonryContainer";
import Hero from "../components/typography/Hero";
import { getPageScaffold } from "../sanity/queries/pageScaffolds";
import {ProjectItem, PageItem} from "../types/contentful";
import getPage from "../contentful/queries/page";
import getProjects from "../contentful/queries/project";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<PageItem>();
  const [projects, setProjects] = useState<ProjectItem[]>();

  useEffect(() => {
    const fetchPage = async () => {
      const contentfulPage = await getPage("/");
      setPage(contentfulPage);
    };
    const fetchProjects = async () => {
      const contentfulProjects = await getProjects();
      setProjects(contentfulProjects);
    };

    try {
      fetchPage();
      fetchProjects();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!page) return <div>There was a problem loading the page</div>;

  const { pageTitle, emphasisText, content, heroImage } =
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
