"use client";
import { SetStateAction, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  owner: {
    login: string;
  };
}

const GitHubRepos = ({ repos }: { repos: Repo[] }) => {
  const [hoveredRepo, setHoveredRepo] = useState(null);
  const [codePreview, setCodePreview] = useState('');

  const handleMouseEnter = async (repo: { name: SetStateAction<null>; owner: { login: any; }; }) => {
    setHoveredRepo(repo.name);

    try {
      // Try to get README.md or a file like index.js
      const res = await fetch(`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/README.md`);
      const text = await res.text();
      setCodePreview(text.slice(0, 500)); // Limit characters for preview
    } catch (error) {
      setCodePreview('// Could not load preview');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 my-10">
      {repos.slice(0, 6).map((repo: any) => (
        <div
          key={repo.id}
          className="p-4 border rounded-lg shadow hover:shadow-md transition relative group"
          onMouseEnter={() => handleMouseEnter(repo)}
          onMouseLeave={() => setHoveredRepo(null)}
        >
          <h3 className="font-semibold text-lg">{repo.name}</h3>
          <p className="text-sm text-gray-600">{repo.description}</p>

          {hoveredRepo === repo.name && (
            <div className="absolute top-0 left-full ml-4 w-96 max-h-80 bg-black text-green-300 text-xs p-4 overflow-auto border rounded shadow-lg z-10">
              <pre>{codePreview}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GitHubRepos;
