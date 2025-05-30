"use client";

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fetchRecentActivity, fetchLastPush } from '@/lib/action/github';

interface RecentProject {
  name: string;
  lastPush: Date;
  commits: number;
}

interface LastPush {
  repo: string;
  time: Date;
}

const CodingNow: React.FC = () => {
  const [projects, setProjects] = useState<RecentProject[]>([]);
  const [lastPush, setLastPush] = useState<LastPush | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recentData, lastPushData] = await Promise.all([
          fetchRecentActivity(),
          fetchLastPush()
        ]);
        setProjects(recentData);
        setLastPush(lastPushData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // const interval = setInterval(fetchData, 5000);
    // return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="card p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>;
  }

  if (error) {
    return <div className="card p-6 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <h2 className="gradient-text">Currently Working Projects </h2>
      
      {lastPush && (
        <div className="glass-card p-4 mb-4 ">
          <div className="flex items-center gap-2">
            <span className="text-sm">
              Last commit to{' '}
              <a 
                href={`https://github.com/${lastPush.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--primary)] hover:underline"
              >
                {lastPush.repo.split('/')[1]}
              </a>
              {' '}{formatDistanceToNow(new Date(lastPush.time), { addSuffix: true })}
            </span>
          </div>
        </div>
      )}

      {/* Recent Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="glass-card p-4 border-l-4 border-[var(--primary)] hover:shadow-slate-400 shadow-lg bottom-2 right-2 transition-all duration-300"
          >
            <div className="flex items-center gap-2 w-full ">
              <span className={`w-3 h-3 rounded-full ${
                index === 0 ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
              }`}></span>
              <div className="flex flex-col md:flex-row md:items-center w-full gap-1 md:gap-4">
                <span className="text-sm md:text-base flex-grow">
                  {index === 0 ? 'Currently working on ' : 'Also working on '}
                  <strong className="text-[var(--primary)]">{project.name}</strong>
                </span>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <span className="text-[var(--muted)]">
                    {formatDistanceToNow(new Date(project.lastPush), { addSuffix: true })}
                  </span>
                  <span className="text-[var(--muted)]">•</span>
                  <span className="text-[var(--muted)]">{project.commits} commits</span>
                  <a 
                    href={`https://github.com/${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] hover:underline ml-2"
                  >
                    View →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingNow;