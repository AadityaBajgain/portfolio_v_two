
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

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; 
const GITHUB_USERNAME = 'AadityaBajgain'; 

const query = `
{
  user(login: "${GITHUB_USERNAME}") {
    pinnedItems(first: 4, types: REPOSITORY) {
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

export async function fetchPinnedRepos() {
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

