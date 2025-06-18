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


interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  visibility: 'PUBLIC' | 'PRIVATE';
  isArchived: boolean;
}

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

    const reposWithSites = json.data.user.repositories.nodes.filter(
      (repo: GitHubRepo) => repo.homepageUrl && !repo.isArchived
    );

    return {
      websites: reposWithSites
    };
  } catch (error) {
    console.error('Failed to fetch repo websites:', error);
    return null;
  }
};