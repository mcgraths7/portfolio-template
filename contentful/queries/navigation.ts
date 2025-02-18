import { NavigationItem } from "../../types/contentful";

const getNavigationIds = async (): Promise<NavigationItem[]> => {
  const query = `
    query GetNavigation {
      navigationCollection {
        items {
          slug
          sys {
            id
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
      }),
    }
  );

  if (!response.ok) {
    console.log("getting ids", response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  const {
    data: {
      navigationCollection: { items },
    },
  } = result;

  return items;
};

const getNavigationItem = async (id?: string): Promise<NavigationItem> => {
  const query = `
      query GetNavigation($id: String!) {
        navigation(id: $id) {
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
              icon {
                url
              }
              socialUrl
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
        variables: {
          id,
        },
      }),
    }
  );

  if (!response.ok) {
    console.log("getting single nav", response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  const {
    data: { navigation },
  } = result;

  return navigation as NavigationItem;
};

export { getNavigationIds, getNavigationItem };
