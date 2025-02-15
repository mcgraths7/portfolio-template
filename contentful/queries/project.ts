import { ProjectItem } from "../../types/contentful";

const getProjects = async (): Promise<ProjectItem[]> => {
  const query = `
        query GetProjects {
            projectCollection {
                    items {
                    _id
                    name
                    heroImage {
                        image{
                            url
                            width
                            height
                        }
                        altText
                    }
                    slug
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
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  const {
    data: {
      projectCollection: { items },
    },
  } = result;

  return items as ProjectItem[];
};

export default getProjects;
