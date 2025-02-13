import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loading from '../components/layout/Loading';
import Error from '../components/layout/Error';
import { getNavigation } from '../sanity/queries/nav';
import { Navigation } from '../types/sanity';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [header, setHeader] = useState<Navigation>();
  const [footer, setFooter] = useState<Navigation>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const headerData = await getNavigation('header');
        const footerData = await getNavigation('footer');
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
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header header={header} />
      <Component {...pageProps} />
      <Footer footer={footer} />
    </div>
  );
}