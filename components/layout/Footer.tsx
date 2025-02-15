"use client";

import { ReactNode } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Node } from '@contentful/rich-text-types';

import { TypeNavigationSkeleton } from '../../types/generated';

export default function Footer({ footer }: { footer: TypeNavigationSkeleton }) {
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
    <footer className="py-6">
      <div className="footer-content">
        <p>&copy; {currentYear}</p>
        {richTextContent && documentToReactComponents(richTextContent.json, options)}
      </div>
    </footer>
  );
}
