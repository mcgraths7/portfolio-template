"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ThemeToggle } from "@/app/components/theme/ThemeToggle";
import * as icons from "@/app/icons";
import useFetchData from "@/hooks/useFetchData";
import { getNavigation } from "@/sanity/queries/nav";
import { Navigation } from "@/types/sanity";

export default function Header() {
  const { data, loading, error } = useFetchData<Navigation>(getNavigation, "header");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Error: Navigation data not found...</div>;

  const { logoUrl, logoAlt, links } = data;

  return (
    <header className="shadow-md sticky top-0 z-50 bg-background">
      <div className="header">
        <div className="mb-4 sm:mb-0">
          <Link href="/" className="text-2xl font-bold">
            {logoUrl ? <Image src={logoUrl} alt={logoAlt} width={33} height={53} className="object-cover" /> : "Logo Text Here"}
          </Link>
        </div>
        <nav className="flex-horizontal">
          <ThemeToggle />
          <ul className="flex-horizontal">
            {links &&
              links.map((l) => (
                <li key={l.slug.current}>
                  <Link href={l.socialUrl ?? `/${l.slug.current}`}>
                    {l.icon ? (
                      <FontAwesomeIcon
                        icon={icons[l.icon as keyof typeof icons]}
                      />
                    ) : (
                      l.displayText
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
