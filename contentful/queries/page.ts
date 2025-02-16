import { PageItem } from "../../types/contentful";

const getPageIds = async (): Promise<PageItem[]> => {
  const query = `
    query GetPageIds {
      pageCollection {
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
      pageCollection: { items },
    },
  } = result;

  return items;
};

const getPage = async (id?: string): Promise<PageItem> => {
  const query = `
      query GetPage($id: String!) {
        page(id: $id) {
          name
          slug
          pageTitle
          emphasizedTitle
          richTextContent {
              json
          }
          heroImage {
            image {
                url
                width
                height
            }
            altText
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
        variables: { id },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  const {
    data: { page },
  } = result;

  return page as PageItem;
};

export { getPage, getPageIds };
