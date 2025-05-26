"use client"
import { useState, useEffect } from 'react';


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

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/github/pinnedRepos.ts');
                const data = await response.json();
                setRepos(data);

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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">My Pinned Github Repos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.map((repo, index) => (
                    <div className="project-card" key={index}>
                        <h3 className="text-lg md:text-xl font-bold text-[var(--primary)]">
                            {repo.name}
                        </h3>
                        <p className="text-sm md:text-base mt-2 text-gray-600 dark:text-gray-300">
                            {repo.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                            {repo.primaryLanguage && (
                                <span className="flex items-center gap-1">
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: repo.primaryLanguage.color }}
                                    ></span>
                                    {repo.primaryLanguage.name}
                                </span>
                            )}
                            <a
                                href={repo.url}
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