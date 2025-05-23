export async function getGithubData() {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    if (!token) {
        throw new Error('GitHub token is not configured');
    }

    const res = await fetch('https://api.github.com/users/AadityaBajgain/repos', {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        next: { revalidate: 60 },
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
  
  // Filter PushEvents and create a map of unique repositories
  const repoMap = new Map();
  
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

  // Convert map to array and sort by most recent
  return Array.from(repoMap.values())
    .sort((a, b) => b.lastPush.getTime() - a.lastPush.getTime())
    .slice(0, 3); // Get only the 3 most recent projects
};
