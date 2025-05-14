// components/PinnedRepos.tsx

import React from 'react';

interface Language {
  name: string;
}

export interface Repository {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  languages: {
    nodes: Language[];
  };
}

interface Props {
  pinnedRepos: Repository[];
}

const PinnedRepos: React.FC<Props> = ({ pinnedRepos }) => {
  return (
    <section className="my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Pinned Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {pinnedRepos.map((repo) => (
          <div
            key={repo.name}
            className="p-6 border rounded shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h3>
            <p className="text-gray-700 mt-2">{repo.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              ⭐ {repo.stargazerCount} •{' '}
              {repo.languages.nodes.map((lang) => lang.name).join(', ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PinnedRepos;
