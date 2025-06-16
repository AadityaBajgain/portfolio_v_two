"use client"

import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Redis } from '@upstash/redis';
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface redisResponse {
  timestamp:number;
  thoughts:string;
}
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
  const [thought, setThought] = useState<redisResponse | null>(null);
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
    const intervalId = setInterval(getStatus, 30000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(()=>{
    const getThough = async ()=>{
      try{
        const res = await redis.get('thought');
        if (typeof res === 'string') {
          const thought = JSON.parse(res);
          setThought(thought);
        }

      }catch(error){
        setError(`Unable to fetch thoughts: ${error}`);
      }
    }
   
    getThough();
  },[])
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
      <div className="group max-w-fit absolute top-6 mb-4 md:top-30 left-[50%]">
        <div className="relative z-10 cloud-bubble animate-float">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm sm:text-md font-semibold text-[var(--text-primary)]">
              Current Status
            </h3>
            <p className='text-xs text-black flex flex-row items-center gap-1'><span className={`inline-flex h-2 w-2 rounded-full text-xs text-black ${status?.busy === false
              ? 'bg-green-500/80 animate-pulse'
              : 'bg-red-500/80'
              }`} />{`${status?.busy === false ? "Free" : "Busy"}`}</p>
          </div>

          {status && (
            <div className="space-y-1">
              <p className="cloud-text">Thought: <span className='text-[var(--primary)]'>
                {thought?.thoughts}
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
<p className="relative opacity-0 text-[8px] sm:text-[10px] text-sm group-hover:opacity-100 text-white transition-colors duration-200">
          Powered by <a
          href="https://github.com/Prashant-koi/PersonalStatus"
          target="_blank"
          rel="noopener noreferrer"
          className='hover:underline text-[var(--primary)]'
        >
        PersonalStatus </a>— PrasantKoi
      </p>
      </div>
      
  );
};

export default TodayThought;
