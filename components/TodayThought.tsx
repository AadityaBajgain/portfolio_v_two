"use client"

import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface StatusResponse {
  thoughts: string;
  activeApps: string[];
  busy: boolean;
  timestamp: number;
  lastUpdated: string | null;
  status: 'online' | 'offline';
}

const TodayThought = () => {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch('/api/status');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStatus(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch status:', error);
        setError('Unable to fetch current thoughts');
      } finally {
        setLoading(false);
      }
    };

    getStatus();
    const intervalId = setInterval(getStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse glass-card p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-4">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Current Thoughts</h3>
        <span 
          className={`inline-flex h-2 w-2 rounded-full ${
            status?.status === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      </div>

      {status && (
        <div className="space-y-2">
          <p className="text-sm">
            {status.thoughts === "App offline" 
              ? "Currently offline" 
              : status.thoughts
            }
          </p>
          {status.activeApps.length > 0 && (
            <div className="text-xs text-[var(--muted)]">
              Active in: {status.activeApps.join(', ')}
            </div>
          )}
          {status.lastUpdated && (
            <p className="text-xs text-[var(--muted)]">
              Updated {formatDistanceToNow(new Date(status.lastUpdated), { addSuffix: true })}
            </p>
          )}
          {status.busy && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Busy
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TodayThought;
