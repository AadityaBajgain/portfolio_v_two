'use client';

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  fetchRepoWebsites,
} from '@/lib/action/github';

interface LastPush {
  repo: string;
  message: string;
  time: string;
  url: string;
}

interface RepoWebsite {
  name: string;
  homepageUrl: string;
  description: string;
}

const CodingNow: React.FC = () => {
  const [lastPush, setLastPush] = useState<LastPush | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [websites, setWebsites] = useState<RepoWebsite[]>([]);

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
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await fetchRepoWebsites();
        if (!response) {
          throw new Error('Failed to fetch repo websites');
        }
        setWebsites(response.websites);
      } catch (error) {
        console.error('Failed to fetch repo websites:', error);
        setError(error as Error);
      }
    };

    fetchWebsites();
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

  // Update your iframe to use the website URL if available
  const currentRepo = websites.find(site =>
    site.name === lastPush?.repo.split('/')[1]
  );
  const repoUrl = lastPush ? `https://github.com/${lastPush.repo}` : null;
  const liveUrl = currentRepo?.homepageUrl;

  return (
    <div className="min-w-0 p-4 sm:p-6 md:p-8 space-y-6">
      <h2 className="gradient-text text-xl sm:text-2xl">Currently Working On</h2>

      {lastPush && (
        <div>
          <div className="glass-card w-full max-w-full overflow-hidden flex flex-col px-4 sm:px-6 py-3 md:flex-row md:items-center md:justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                <div className="text-xs sm:text-sm flex flex-col min-w-0">
                  <span>
                    Last commit to{' '}
                    <span className="relative group inline">
                      <a
                        href={`https://github.com/${lastPush.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--primary)] hover:underline break-words"
                      >
                        {lastPush.repo.split('/')[1]}
                      </a>
                    </span>
                  </span>
                  <span className="text-[var(--muted)]">
                    {formatDistanceToNow(new Date(lastPush.time), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)] mt-2 break-words">
                <strong>Commit message:</strong> {lastPush.message}
              </p>
            </div>
         
          </div>
          <span className="text-xs text-[var(--muted)]">Powered by GitHub Webhook and Redis</span>
        </div>
      )}

      
        <p className='font-semibold text-sm sm:text-base'>Live view of project based on the latest commit</p>

        {liveUrl ? (
          <iframe
            src={liveUrl}
            title='live project window'
            allowFullScreen
            referrerPolicy='no-referrer'
            className="w-full h-[240px] sm:h-[300px] md:h-[360px] bg-none rounded-lg border-2 border-slate-300"
            loading="lazy"
          />
        ) : (
          repoUrl && (
            <div className="glass-card w-full max-w-full overflow-hidden px-4 sm:px-6 py-4">
              <p className="text-xs text-[var(--muted)]">
                No live link available for this project.
              </p>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline text-sm"
              >
                View repository →
              </a>
            </div>
          )
        )}
    </div>
  );
};

export default CodingNow;
