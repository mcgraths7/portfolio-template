"use client";

import { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Node } from '@contentful/rich-text-types';
import styled from 'styled-components';

import { NavigationItem } from '../../types/contentful';

const FooterContainer = styled.footer`
  box-shadow: 0 -4px 6px hsl(var(--box-shadow-color));
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterComponent = ({ footer }: { footer: NavigationItem }) => {
  if (!footer) return null;
  
  const currentYear = new Date().getFullYear();
  const { richTextContent } = footer;

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_: Node, children: ReactNode) => <p>{children}</p>,
      [INLINES.HYPERLINK]: (node: Node, children: ReactNode) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };


  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; {currentYear}</p>
        {richTextContent && documentToReactComponents(richTextContent.json, options)}
      </FooterContent>
    </FooterContainer>
  );
}

export default FooterComponent;