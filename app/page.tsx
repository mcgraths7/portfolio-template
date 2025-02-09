"use client";

import { getPageScaffold } from "@/sanity/queries/pageScaffolds";
import PageTitle from "@/app/components/typography/PageTitle";
import CopyText from "@/app/components/typography/CopyText";
import useFetchData from "@/hooks/useFetchData";
import { PageScaffold } from "@/types/sanity";
import MasonryContainer from "@/app/components/masonry/MasonryContainer";

export default function Home() {
  const {
    data: page,
    loading,
    error,
  } = useFetchData<PageScaffold>(getPageScaffold, "/");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!page) return <div>Error: Page with slug &quot;/&quot; not found...</div>;

  const { pageTitle, emphasisText, content, projects } = page;

  return (
    <div className="max-w-7xl mx-auto h-full">
      <PageTitle title={pageTitle} emphasisText={emphasisText} />
      {content && <CopyText content={content} />}

      <MasonryContainer projects={projects} columnWidth={500} />
    </div>
  );
}
