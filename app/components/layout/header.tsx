import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ThemeToggle } from "../theme/ThemeToggle";
import * as icons from "@/app/icons";
import { Navigation } from "@/types/sanity";
import { Image } from "next-sanity/image";

interface HeaderProps {
  data: Navigation;
}

export default function Header({ data }: HeaderProps) {
  console.log(data);
  const { logoUrl, logoAlt, links } = data;

  return (
    <header className="shadow-md">
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
