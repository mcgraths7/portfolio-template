import { Geist, Geist_Mono } from "next/font/google";

import CustomHead from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "../theme/ThemeProvider";
import type { Navigation } from "../../types/sanity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  footer,
  header,
}: Readonly<{
  children: React.ReactNode;
  footer?: Navigation;
  header?: Navigation;
}>) {
  return (
    <html lang="en">
      <CustomHead />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header header={header} />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer footer={footer} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
