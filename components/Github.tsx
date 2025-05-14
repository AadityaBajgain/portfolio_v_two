"use client"

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

import React,{useState,useEffect} from 'react'
import GitHubCalendar from "react-github-calendar";
import { parseISO, isAfter, isBefore } from 'date-fns';
import { getGithubData } from '@/app/api/github/github';

const Github = () => {
  const currentYear = new Date().getFullYear();
  const fromDate = new Date(`${currentYear}-01-01`);
  const toDate = new Date(`${currentYear}-12-31`);

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGithubData();
        setRepos(data.props.repos);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <>
      <div className="mt-8 mx-auto">
        <h2 className="text-xl font-bold mb-4">GitHub Contributions</h2>
        <GitHubCalendar
          username="AadityaBajgain"
          transformData={(contributions) =>
            contributions.filter((day) => {
              const date = parseISO(day.date);
              return isAfter(date, fromDate) && isBefore(date, toDate);
            })
          }
          blockSize={15}
          blockMargin={5}
          fontSize={14}
          colorScheme="light" />
      </div>
      <div className="grid gap-4">
      {repos.map((repo) => (
        <div key={repo.id} className="p-4 border rounded shadow">
          <h3 className="text-xl font-semibold">{repo.name}</h3>
          <p>{repo.description || 'No description provided'}</p>
          <a
            href={repo.html_url}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      ))}
    </div>
    </>
  )
}

export default Github
