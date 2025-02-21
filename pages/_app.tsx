import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Open_Sans} from "next/font/google";

import "../styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Loading from "../components/layout/Loading";
import Error from "../components/layout/Error";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import {
  getNavigationItem,
  getNavigationIds,
} from "../contentful/queries/navigation";
import { NavigationItem } from "../types/contentful";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [header, setHeader] = useState<NavigationItem>();
  const [footer, setFooter] = useState<NavigationItem>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const ids = await getNavigationIds();
        const headerId = ids.find((item) => item.slug === "header")?.sys.id;
        const footerId = ids.find((item) => item.slug === "footer")?.sys.id;

        const headerData = await getNavigationItem(headerId);
        const footerData = await getNavigationItem(footerId);

        setHeader(headerData);
        setFooter(footerData);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className={`${openSans.variable}`}
      >
        {header && <Header header={header} />}
        <Component {...pageProps} />
        {footer && <Footer footer={footer} />}
      </div>
    </ThemeProvider>
  );
}
