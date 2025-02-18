/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

import { ThemeToggle } from "../theme/ThemeToggle";
import { NavigationItem } from "../../types/contentful";

export default function Header({
  header,
}: {
  header: NavigationItem;
}) {
  if (!header) return null;

  const { logo, linksCollection } = header;

  return (
    <header className="shadow-md sticky top-0 z-50 bg-background">
      <div className="header">
        <div className="mb-4 sm:mb-0">
          <Link href="/" className="text-2xl font-bold">
            {logo ? (
              <img
                src={logo.image.url}
                alt={logo.altText}
                width={33}
                height={53}
                className="object-cover"
                style={{ width: "33px", height: "53px" }}
              />
            ) : (
              "Logo Text Here"
            )}
          </Link>
        </div>
        <div className="flex-horizontal">
          <ThemeToggle />
          <nav>
            <ul className="flex-horizontal">
              {linksCollection?.items && linksCollection.items.length > 0 &&
                linksCollection.items.map((l, idx) => (
                  <li key={l.slug ?? l.socialUrl ?? `link-${idx}`}>
                    <Link href={l.socialUrl ?? (l.slug ? `/${l.slug}` : "#")}>
                      {l.icon ? (
                        <img src = {l.icon.url} alt={l.name} style={{width: "20px", height: "20px"}}/>
                      ) : (
                        l.displayText
                      )}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}