import { NextResponse } from 'next/server';

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
  };
}

interface Repository {
  name: string;
  lastPush: Date;
  commits: number;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'AadityaBajgain';

const query = `
{
  user(login: "${GITHUB_USERNAME}") {
    pinnedItems(last:4, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          updatedAt
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
}
`;


export async function GET() {
  try {
    const [pinnedRepos, lastPush, recentActivity] = await Promise.all([
      fetchPinnedRepos(),
      fetchLastPush(),
      fetchRecentActivity()
    ]);

    return NextResponse.json({
      pinnedRepos,
      lastPush,
      recentActivity
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}

export async function fetchPinnedRepos() {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  const json = await response.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data.user.pinnedItems.nodes;
}

export async function fetchLastPush() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
    { next: { revalidate: 60 } } // Cache for 1 minute
  );
  
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const events = await res.json() as GitHubEvent[];
  const pushEvent = events.find((e) => e.type === "PushEvent");
  
  if (!pushEvent) {
    throw new Error("No recent push events found");
  }

  return {
    repo: pushEvent.repo.name,
    time: new Date(pushEvent.created_at),
  };
}

export async function fetchRecentActivity() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
    {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 60 } // Cache for 1 minute
    }
  );
  
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const events = await res.json() as GitHubEvent[];
  const repoMap = new Map<string, Repository>();
  
  events.forEach((event) => {
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
}

