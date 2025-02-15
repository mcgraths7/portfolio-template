import { NavigationItem } from "../../types/contentful";

const getNavigationItem = async (slug: string): Promise<NavigationItem> => {
  const query = `
      query GetNavigation($slug: String) {
        navigationCollection(where: { slug: $slug }) {
          items {
            name
            slug
            richTextContent {
              json
            }
            logo {
              name
              altText
              image {
                url
              }
            }
            linksCollection {
              items {
                name
                slug
                displayText
                icon
                socialUrl
              }
            }
          }
        }
      }
    `;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  const {
    data: {
      navigationCollection: { items },
    },
  } = result;

  return items[0] as NavigationItem;
};

export default getNavigationItem;
