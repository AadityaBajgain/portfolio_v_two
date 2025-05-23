"use client"
import { useState, useEffect } from 'react';
import { getGithubData } from '@/app/api/github/github';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
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
    console.log(repos);
    return (
        <section className="github-section">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.map((repo) => (
                    <div className="project-card" key={repo.id}>
                        <h3 className="text-lg md:text-xl font-bold text-[var(--primary)]">
                            {repo.name}
                        </h3>
                        <p className="text-sm md:text-base mt-2 text-gray-600 dark:text-gray-300">
                            {repo.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs md:text-sm px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">
                                {repo.language}
                            </span>
                            <a 
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm md:text-base text-[var(--primary)] hover:underline"
                            >
                                View on GitHub
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

}

export default Projects;