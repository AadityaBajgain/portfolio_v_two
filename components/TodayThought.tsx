"use client"

import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { loadEnvFile } from 'process';

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
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
  }, []);
  if(loading)
  {
    return(
        <div>
            {loading}
        </div>
    )
  }
  if(error){
    return(
    <div>
        {error}
    </div>
    )
  }
  return (
    <div className="cloud-bubble animate-float absolute top-0 left-[40%] md:top-30">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Current Thoughts
          </h3>
          <span 
            className={`inline-flex h-2 w-2 rounded-full ${
              status?.status === 'online' 
                ? 'bg-green-500/80 animate-pulse' 
                : 'bg-red-500/80'
            }`}
          />
        </div>

        {status && (
          <div className="space-y-3">
            <p className="cloud-text">
              {status.thoughts === "App offline" 
                ? "Currently offline" 
                : status.thoughts
              }
            </p>
            {status.activeApps.length > 0 && (
              <div className="cloud-subtext">
                Active in: {status.activeApps.join(', ')}
              </div>
            )}
            {status.lastUpdated && (
              <p className="cloud-subtext">
                Updated {formatDistanceToNow(new Date(status.lastUpdated), { addSuffix: true })}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayThought;
