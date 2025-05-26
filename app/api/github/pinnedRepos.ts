import type { NextApiRequest, NextApiResponse } from "next";

interface Repo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export default async function pinnedRepos(
  req: NextApiRequest,
  res: NextApiResponse<Repo[] | { error: string }>
) {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const username = "AadityaBajgain";

  const query = `
    {
      user(login: "${username}") {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          edges {
            node {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    const repos: Repo[] = json.data.user.pinnedItems.edges.map(
      (edge: any) => edge.node
    );

    res.status(200).json(repos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pinned repos" });
  }
}
