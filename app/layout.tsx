import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";

import "./globals.css";
import Header from "@/app/components/layout/Header"; 
import Footer from "@/app/components/layout/Footer"; 

import { ThemeProvider } from "@/app/components/theme/ThemeProvider";
import { getNavigation } from "@/sanity/queries/nav";
import useFetchData from "@/hooks/useFetchData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G-Zone",
  description: "Fuck you hire me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: navItems, loading } = useFetchData(getNavigation);

  if (loading) {
    return <div>Loading...</div>;
  }

  const header = navItems && navItems.find((item) => item.slug.current === "header");
  const footer = navItems && navItems.find((item) => item.slug.current === "footer");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            {header && <Header data={header} />}
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            {footer && <Footer data={footer} />}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
