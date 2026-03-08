"use client";

import React from "react";

const skillGroups = [
  {
    title: "Core Languages",
    subtitle: "Languages that I learned till now.",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C++", "C"],
    accent: "from-emerald-400 to-teal-600",
  },
  {
    title: "Frameworks",
    subtitle: "Modern stacks for faster development.",
    items: ["React", "Next.js", "Vite", "Tailwind", "Bootstrap"],
    accent: "from-indigo-400 to-sky-500",
  },
  {
    title: "Data & Cloud",
    subtitle: "Databases that I have experience of.",
    items: ["Firebase", "MongoDB", "MySQL"],
    accent: "from-fuchsia-400 to-rose-500",
  },
  {
    title: "Dev Tools",
    subtitle: "IDE and other development tools I use",
    items: ["VS Code", "Git", "GitHub", "Postman"],
    accent: "from-lime-400 to-emerald-500",
  },
];

const Tools: React.FC = () => {
  return (
    <div className="relative overflow-hidden p-6 md:p-10">
      <div
        className="pointer-events-none absolute -top-20 right-8 h-48 w-48"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-56 w-56"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="gradient-text">Tools That I Use</h2>
            <p className="text-md">
              These are tools I know well and use often. I have used them in real projects and hands-on work.
            </p>
          </div>

        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="p-4 border-l-4 border-[var(--primary)] rounded-lg hover:shadow-slate-400 shadow-lg bottom-2 right-2 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">
                    {group.title}
                  </h3>
                  <p className="text-sm">
                    {group.subtitle}
                  </p>
                </div>
                <span
                  className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${group.accent} opacity-90 shadow-md`}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur dark:bg-black/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
