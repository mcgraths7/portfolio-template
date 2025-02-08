"use client";

import { getPageScaffold } from "@/sanity/queries/pageScaffolds";
import PageTitle from "@/app/components/PageTitle";
import CopyText from "@/app/components/CopyText";
import GalleryContainer from "./components/GalleryContainer";
import useFetchData from "@/hooks/useFetchData";
import { PageScaffold } from "@/types/sanity";

export default function Home() {
  const {
    data: page,
    loading,
    error,
  } = useFetchData<PageScaffold>(getPageScaffold, "/");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!page) return <div>Error: Page with slug &quot;/&quot; not found...</div>;

  const { pageTitle, emphasisText, content, galleries } = page;

  return (
    <div className="max-w-7xl mx-auto h-full">
      <PageTitle title={pageTitle} emphasisText={emphasisText} />
      {content && <CopyText content={content} />}

      {galleries &&
        galleries.map((g) => (
          <div key={g._id}>
            <h2 className="mb-4 text-3xl font-bold">{g.title}</h2>
            <GalleryContainer gallery={g} />
          </div>
        ))}
    </div>
  );
}
