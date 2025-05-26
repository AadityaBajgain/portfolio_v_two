"use client";

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fetchRecentActivity } from '@/app/api/github/route';

interface RecentProject {
  name: string;
  lastPush: Date;
  commits: number;
}

const CodingNow: React.FC = () => {
  const [projects, setProjects] = useState<RecentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecentActivity();
        setProjects(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="w-full md:w-[80%] lg:w-[70%] mx-auto">Loading...</div>;
  }

  if (error) {
    return <div className="w-full md:w-[80%] lg:w-[70%] mx-auto text-red-500">Error: {error.message}</div>;
  }

  return (
    <section className="w-full md:w-[80%] lg:w-[70%] mx-auto space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Recent Activity</h2>
      {projects.map((project, index) => (
        <div 
          key={index}
          className="current-project group"
        >
          <div className="flex items-center gap-2 w-full">
            <span className={`w-3 h-3 rounded-full animate-pulse ${index === 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            <div className="flex flex-col md:flex-row md:items-center w-full gap-1 md:gap-4">
              <span className="text-sm md:text-base flex-grow">
                {index === 0 ? 'Currently working on ' : 'Recently pushed to '}
                <strong className="text-[var(--primary)]">{project.name}</strong>
              </span>
              <span className="text-xs md:text-sm text-gray-500">
                {formatDistanceToNow(new Date(project.lastPush), { addSuffix: true })}
              </span>
            </div>
          <a 
            href={`https://github.com/${project.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-xs md:text-sm text-[var(--primary)] hover:underline"
          >
            View on GitHub →
          </a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CodingNow;