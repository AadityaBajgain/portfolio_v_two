
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
export async function getGithubData() {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    if (!token) {
        throw new Error('GitHub token is not configured');
    }

    const res = await fetch('https://api.github.com/users/AadityaBajgain/repos', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        next: { revalidate: 0 },
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`GitHub API error: ${res.status} - ${error}`);
    }

    const repos = await res.json();
    return { props: { repos } };
}

export const fetchLastPush = async () => {
  const res = await fetch(`https://api.github.com/users/AadityaBajgain/events/public`);
  const events = await res.json();
  const pushEvent = events.find((e: any) => e.type === "PushEvent");
  return {
    repo: pushEvent.repo.name,
    time: new Date(pushEvent.created_at),
  };
};

export const fetchRecentActivity = async () => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com/users/AadityaBajgain/events/public`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const events = await res.json();
  
  const repoMap = new Map();
  
  console.log(repoMap);
  events.forEach((event: any) => {
    if (event.type === "PushEvent") {
      if (!repoMap.has(event.repo.name)) {
        repoMap.set(event.repo.name, {
          name: event.repo.name,
          lastPush: new Date(event.created_at),
          commits: event.payload.commits?.length || 0
        });
      }
    }
  });
  
  return Array.from(repoMap.values())
    .sort((a, b) => b.lastPush.getTime() - a.lastPush.getTime())
    .slice(0, 3);
};

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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const text = await response.text(); // read HTML error page
    console.error("GitHub Error Response:", text);
    return res.status(500).json({ error: "GitHub API request failed" });
  }

  const json = await response.json();

}