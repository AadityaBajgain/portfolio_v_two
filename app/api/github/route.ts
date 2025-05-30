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

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; 
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

export const fetchPinnedRepos=async ()=> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  console.log(json);
  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    return;
  }

  return(
    {props:json}
  )
}

export const fetchLastPush = async () => {
  const res = await fetch(`https://api.github.com/users/AadityaBajgain/events/public`);
  const events = await res.json() as GitHubEvent[];
  const pushEvent = events.find((e) => e.type === "PushEvent");
  
  if (!pushEvent) {
    throw new Error("No recent push events found");
  }

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
};

