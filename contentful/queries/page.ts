import { PageItem } from "../../types/contentful";

const getPage = async (slug: string): Promise<PageItem> => {
    const query = `
        query GetPage($slug: String!) {
            pageCollection(where: { slug: $slug }) {
                items {
                    name
                    slug
                    pageTitle
                    emphasizedTitle
                    richTextContent {
                        json
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
      pageCollection: { items },
    },
  } = result;

  return items[0] as PageItem;
};

export default getPage;