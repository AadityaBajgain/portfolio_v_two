import { GetStaticProps } from 'next';

export async function getGithubData() {
    const res = await fetch('https://api.github.com/users/AadityaBajgain', {
        headers:{
            Authorization: `token ${process.env.GITHUB_TOKEN}`
        },
        next: { revalidate: 600 },
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const repos = await res.json();

    return {
        props:{
            repos,
        }
    }
}

interface Language {
  name: string;
}

interface Repository {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  languages: {
    nodes: Language[];
  };
}

interface ProjectsProps {
  pinnedRepos: Repository[];
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const query = `
    {
      user(login: "AadityaBajgain") {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              languages(first: 3) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  const pinnedRepos: Repository[] = json.data.user.pinnedItems.nodes;

  return {
    props: {
      pinnedRepos,
    },
    revalidate: 3600,
  };
};
