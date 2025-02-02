import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import "./globals.css";
import { getNavigation } from "@/sanity/queries/nav";


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getNavigation();
  
  const header = navItems.find((item) => item.slug === "header")
  const footer = navItems.find((item) => item.slug === "footer")

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header data={header}/>
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer data={footer} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
