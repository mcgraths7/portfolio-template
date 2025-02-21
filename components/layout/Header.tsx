"use client";

import Link from "next/link";
import styled from "styled-components";

import mq from "../../styles/theme/mq";
import { ThemeToggle } from "../theme/ThemeToggle";
import { NavigationItem } from "../../types/contentful";

const HeaderContainer = styled.header`
  box-shadow: 0 4px 6px hsl(var(--box-shadow-color));
  background-color: hsl(var(--color-bg));
  position: sticky;
  top: 0;
  z-index: 50;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-2);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (${mq.mobile}) {
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 0;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LogoImg = styled.img`
  width: 33px;
  height: 53px;
  object-fit: cover;
  `;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
`

export default function Header({ header }: { header: NavigationItem }) {
  if (!header) return null;

  const { logo, linksCollection } = header;

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Link href="/" passHref>
            {logo && (
              <LogoImg
                src={logo.image.url}
                alt={logo.altText}
              />
            )}
          </Link>
        </LogoContainer>
        <FlexContainer>
          <ThemeToggle />
          <nav>
            <NavList>
              {linksCollection?.items?.map((l, idx) => (
                <li key={l.slug ?? l.socialUrl ?? `link-${idx}`}>
                  <Link href={l.socialUrl ?? (l.slug ? `/${l.slug}` : "#")} passHref>
                    {l.icon ? (
                      <IconImg src={l.icon.url} alt={l.name}/>
                    ) : (
                      l.displayText
                    )}
                  </Link>
                </li>
              ))}
            </NavList>
          </nav>
        </FlexContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}
