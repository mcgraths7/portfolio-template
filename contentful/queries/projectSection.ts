// import { ProjectSectionItem } from "../../types/contentful";

// const getProjectSections = async (): Promise<ProjectSectionItem[]> => {
//   const query = `
//         query GetProjectSections($slug: String) {
//         projectSection(where: { slug: $slug }) {
//                     items {
//                     _id
//                     name
//                     heroImage {
//                         image{
//                             url
//                             width
//                             height
//                         }
//                         altText
//                     }
//                     slug
//                     }
//                 }
//             }
//     `;
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
//       },
//       body: JSON.stringify({
//         query,
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const result = await response.json();
//   const {
//     data: {
//       projectSectionCollection: { items },
//     },
//   } = result;

//   return items as ProjectSectionItem[];
// };

// export default getProjectSections;
