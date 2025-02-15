import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Loading from '../components/layout/Loading';
import Error from '../components/layout/Error';
import getNavigationItem from '../contentful/queries/navigation';
import { NavigationItem } from '../types/contentful';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        const headerData = await getNavigationItem('header');
        const footerData = await getNavigationItem('footer');
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