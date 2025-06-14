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
        console.log(response)
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
    // Poll every 30 seconds
    const intervalId = setInterval(getStatus, 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="cloud-bubble animate-float absolute top-6 mb-4 md:top-30 left-[50%]">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200/20 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200/20 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cloud-bubble animate-float absolute top-6 mb-4 md:top-30 left-[50%]">
        <p className="text-red-500/80 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className=" group">
      <div className="cloud-bubble animate-float absolute top-6 mb-4 md:top-30 left-[50%]">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-md font-semibold text-[var(--text-primary)]">
              Current Status
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
            <div className="space-y-1">
              <p className="cloud-text">Thought: <span className='text-[var(--primary)]'>
                  {status.thoughts}
                </span>
              </p>
              {status.activeApps?.length > 0 && (
                <div className="cloud-subtext">
                  Active in: <span className='text-green-400'>{status.activeApps.join(', ')}</span>
                </div>
              )}
              {status.lastUpdated && (
                <p className="cloud-subtext">
                  Updated <span className='text-xs text-red-300'>
                    {formatDistanceToNow(new Date(status.lastUpdated), { addSuffix: true })}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Attribution tooltip */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    absolute -bottom-8 left-1/2 -translate-x-1/2
                    text-xs text-[var(--text-secondary)]">
        <a 
          href="https://github.com/Prashant-koi/PersonalStatus"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--primary)] transition-colors duration-200"
        >
          Powered by PortfolioStatus by PrasantKoi
        </a>
      </div>
    </div>
  );
};

export default TodayThought;
