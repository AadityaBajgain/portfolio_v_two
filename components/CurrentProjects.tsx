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

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Poll every 60s
    return () => clearInterval(intervalId);
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
    return (
      <div>
        <div className="card p-6 text-red-500">Error: {error.message}</div>
        <p className='text-sm text-[var(--muted)]'>
          Playing around with Github webhooks for the latest commit...
          <br />
          <span>Still trying to figure it out...</span>
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <h2 className="gradient-text">Currently Working On</h2>

      {lastPush && (
        <div>
          <div className="glass-card flex flex-col px-6 py-2 md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                <div className="text-sm flex flex-col md:flex-row items-center gap-1">
                  <span>
                    Last commit to{' '}
                    <span className="relative group inline-block">
                      <a
                        href={`https://github.com/${lastPush.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--primary)] hover:underline"
                      >
                        {lastPush.repo.split('/')[1]}&nbsp;
                      </a>
                      <div className="absolute left-0 top-full z-50 hidden group-hover:block w-[300px] mt-2">
                        <div className="bg-[var(--card-background)] rounded-lg shadow-xl border border-[var(--border)] overflow-hidden transition-all duration-300 ease-in-out">
                          <iframe
                            src="https://portfolio-v-two-nine.vercel.app"
                            width="100%"
                            height="200px"
                            className="rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </span>
                  </span>
                  {formatDistanceToNow(new Date(lastPush.time), { addSuffix: true })}
                </div>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">
                <strong>Commit message:</strong> {lastPush.message}
              </p>
            </div>
            <a
              href={lastPush.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline text-xs"
            >
              View Commit →
            </a>
          </div>
          <span className="text-xs text-[var(--muted)]">Powered by GitHub Webhook and Redis</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span>Ongoing project based on the latest commit</span>
        <div className="flex items-center justify-between p-4 border-l-4 border-[var(--primary)] hover:shadow-slate-400 shadow-lg bottom-2 right-2 transition-all duration-300">
          <h3 className="font-semibold">
            {lastPush!.repo.split('/')[1]}
          </h3>
          <a
            href={`https://github.com/AadityaBajgain/${lastPush!.repo.split('/')[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline text-sm"
          >
            View →
          </a>
        </div>
      </div>
    </div>
  );
};

export default CodingNow;
