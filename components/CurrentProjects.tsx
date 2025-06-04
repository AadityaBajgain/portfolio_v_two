'use client';

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface LastPush {
  repo: string;
  message: string;
  time: string;
  url: string;
}

const CodingNow: React.FC = () => {
  const [lastPush, setLastPush] = useState<LastPush | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/latest-push');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setLastPush(data);
        setError(null);
      } catch (error) {
        setError(error as Error);
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling interval
    // const intervalId = setInterval(fetchData, 5000);

    // // Cleanup function
    // return () => clearInterval(intervalId);
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
      <h2 className="gradient-text">Currently Working On</h2>

      {lastPush && (
        <div className="glass-card p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm">
                  Last commit to{' '}
                  <a
                    href={`https://github.com/${lastPush.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--primary)] hover:underline"
                  >
                    {lastPush.repo.split('/')[1]}
                  </a>{' '}
                  {formatDistanceToNow(new Date(lastPush.time), { addSuffix: true })}
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">{lastPush.message}</p>
            </div>
            <a
              href={lastPush.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline text-sm"
            >
              View Commit →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingNow;
