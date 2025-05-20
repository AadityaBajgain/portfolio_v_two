"use client"
import {useState, useEffect}  from 'react';
import { getGithubData } from '@/app/api/github/github';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGithubData();
        setRepos(data.props.repos);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
    }
    return (
        <div className="mt-8 mx-auto">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <ul className="list-disc pl-5">
            {repos.map((repo) => (
            <li key={repo.id} className="mb-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {repo.name}
                </a>
                <p className="text-gray-600">{repo.description}</p>
            </li>
            ))}
        </ul>
        </div>
    );

}

export default Projects;