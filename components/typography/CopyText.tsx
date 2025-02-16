// "use client";

// import { ReactNode } from "react";
// import { BLOCKS, INLINES } from "@contentful/rich-text-types";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { Document } from "@contentful/rich-text-types";

// interface CopyProps {
//     content: {
//       json: Document;
//     };
// }

//   const options = {
//     renderNode: {
//       [BLOCKS.PARAGRAPH]: (_: Node, children: ReactNode) => <p>{children}</p>,
//       [INLINES.HYPERLINK]: (node: Node, children: ReactNode) => (
//         <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
//           {children}
//         </a>
//       ),
//     },
//   };


// export default function CopyText({ content }: CopyProps) {
//   return (
//     <div className="text-md mb-12 text-justify pe-16">
//       {content && documentToReactComponents(content.json, options)}
//     </div>
//   );
// }
