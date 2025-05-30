"use client"
import React, { useState, useEffect } from "react";
import { fetchPinnedRepos } from "@/app/api/github/route";

interface Repository {
  name: string;
  description: string | null;
  url: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reposData = await fetchPinnedRepos();
        setRepos(reposData?.props.data.user.pinnedItems.nodes);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="card p-6 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <h2 className="gradient-text">GitHub&apos;s Pinned Repos</h2>
      <div className="space-y-4">
        {repos.map((repo, index) => (
          <div
            key={index}
            className="glass-card p-4 border-l-4 border-[var(--primary)]  hover:shadow-slate-400 shadow-lg bottom-2 right-2 transition-all duration-300"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {repo.name}
                </h3>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:underline text-sm"
                >
                  View →
                </a>
              </div>
              
              <p className="text-sm text-[var(--muted)]">
                {repo.description || 'No description available'}
              </p>
              
              {repo.primaryLanguage && (
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  />
                  <span className="text-[var(--muted)]">
                    {repo.primaryLanguage.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;