"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ThemeToggle } from "../theme/ThemeToggle";
import * as icons from "../../utils/icons";
import { Navigation } from "../../types/sanity";

export default function Header({ header }: { header?: Navigation }) {
  if (!header) return null;
  
  const { logoUrl, logoAlt, links } = header;

  return (
    <header className="shadow-md sticky top-0 z-50 bg-background">
      <div className="header">
        <div className="mb-4 sm:mb-0">
          <Link href="/" className="text-2xl font-bold">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={33}
                height={53}
                className="object-cover"
              />
            ) : (
              "Logo Text Here"
            )}
          </Link>
        </div>
        <nav className="flex-horizontal">
          <ThemeToggle />
          <ul className="flex-horizontal">
            {links &&
              links.map((l, idx) => (
                <li key={l.slug?.current ?? l.socialUrl ?? `link-${idx}`}>
                  <Link href={l.socialUrl ?? (l.slug ? `/${l.slug.current}` : '#')}>
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
