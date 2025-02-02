import { getPageScaffold } from "@/sanity/queries/pageScaffolds";
import PageTitle from "./components/PageTitle";
import CopyText from "./components/CopyText";
import GalleryContainer from "./components/GalleryContainer";

export default async function Home() {
  const { pageTitle, emphasisText, content, galleries } =
    await getPageScaffold("/");

  return (
    <div className="max-w-7xl mx-auto h-full">
      <PageTitle title={pageTitle} emphasisText={emphasisText} />
      {content && <CopyText content={content} />}

      {galleries &&
        galleries.map((g) => (
          <div key={g._id}>
            <h2 className="mt-12 text-3xl font-bold">{g.title}</h2>
            <GalleryContainer gallery={g} />
          </div>
        ))}
    </div>
  );
}
