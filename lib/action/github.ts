
// interface GitHubEvent {
//   type: string;
//   repo: {
//     name: string;
//   };
//   created_at: string;
//   payload: {
//     commits?: Array<{
//       message: string;
//       sha: string;
//     }>;
//   };
// }

// interface Repository {
//   name: string;
//   lastPush: Date;
//   commits: number;
// }

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_USERNAME = 'AadityaBajgain';

const query = `
{
  user(login: "${GITHUB_USERNAME}") {
    pinnedItems(last: 4, types: REPOSITORY) {
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
export const fetchPinnedRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      return null;
    }

    return {
      props:json
    };
  } catch (error) {
    console.error('Failed to fetch pinned repos:', error);
    return null;
  }
};

// export const fetchLastPush = async () => {
//   try {
//     const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
//       headers: {
//         'Authorization': `Bearer ${GITHUB_TOKEN}`,
//         'Accept': 'application/vnd.github.v3+json'
//       }
//     });

//     if (!res.ok) {
//       throw new Error(`GitHub API error: ${res.status}`);
//     }

//     const events = await res.json() as GitHubEvent[];
//     console.log("events", events);
//     const pushEvent = events.find((e) => e.type === "PushEvent");

//     if (!pushEvent) {
//       throw new Error("No recent push events found");
//     }
//     // console.log("last push",new Date(pushEvent.created_at))
//     return {
//       repo: pushEvent.repo.name,
//       time: new Date(pushEvent.created_at),
//     };
//   } catch (error) {
//     console.error('Failed to fetch last push:', error);
//     return null;
//   }
// };

// export const fetchRecentActivity = async () => {
//   try {
//     const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
//       headers: {
//         'Authorization': `Bearer ${GITHUB_TOKEN}`,
//         'Accept': 'application/vnd.github.v3+json'
//       }
//     });

//     if (!res.ok) {
//       throw new Error(`GitHub API error: ${res.status}`);
//     }

//     const events = await res.json() as GitHubEvent[];
//     const repoMap = new Map<string, Repository>();

//     events.forEach((event) => {
//       if (event.type === "PushEvent") {
//         if (!repoMap.has(event.repo.name)) {
//           repoMap.set(event.repo.name, {
//             name: event.repo.name,
//             lastPush: new Date(event.created_at),
//             commits: event.payload.commits?.length || 0,
//           });
//         }
//       }
//     });
//     const returnRepos = Array.from(repoMap.values())
//     .sort((a, b) => b.lastPush.getTime() - a.lastPush.getTime())
//     .slice(0, 3);
//     console.log("repoMap", returnRepos);
//     return returnRepos
//   } catch (error) {
//     console.error('Failed to fetch recent activity:', error);
//     return [];
//   }
// };


const hostQuery = `{
  user(login: "${GITHUB_USERNAME}") {
    repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        description
        url
        homepageUrl
        updatedAt
        primaryLanguage {
          name
          color
        }
        visibility
        isArchived
      }
    }
  }
}`;

export const fetchRepoWebsites = async () => {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: hostQuery }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      return null;
    }

    // Filter only repos with homepageUrl
    const reposWithSites = json.data.user.repositories.nodes.filter(
      (repo: any) => repo.homepageUrl && !repo.isArchived
    );

    return {
      websites: reposWithSites
    };
  } catch (error) {
    console.error('Failed to fetch repo websites:', error);
    return null;
  }
};