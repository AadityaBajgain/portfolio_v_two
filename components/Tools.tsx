"use client";

import React from "react";

const skillGroups = [
  {
    title: "Core Languages",
    subtitle: "Systems, scripting, and runtime fluency.",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C++", "C"],
    accent: "from-emerald-400 to-teal-600",
  },
  {
    title: "Web Foundations",
    subtitle: "Accessible, performant UI baselines.",
    items: ["HTML", "CSS"],
    accent: "from-amber-400 to-orange-500",
  },
  {
    title: "Frameworks",
    subtitle: "Modern stacks for product velocity.",
    items: ["React", "Next.js", "Vite", "Tailwind", "Bootstrap"],
    accent: "from-indigo-400 to-sky-500",
  },
  {
    title: "Data & Cloud",
    subtitle: "Reliable storage and real-time sync.",
    items: ["Firebase", "MongoDB", "MySQL"],
    accent: "from-fuchsia-400 to-rose-500",
  },
  {
    title: "Dev Tools",
    subtitle: "Fast feedback loops and clean shipping.",
    items: ["VS Code", "Git", "GitHub", "Postman"],
    accent: "from-lime-400 to-emerald-500",
  },
];

const highlights = [
  "AI-powered prototypes",
  "API-first thinking",
  "Reliable UI delivery",
  "Performance-minded builds",
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
            <p className="text-[var(--text-secondary)]">
              A compact, modern toolkit optimized for rapid prototyping, clean
              interfaces, and dependable releases. These are the technologies I
              reach for when turning ideas into real products.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-[var(--border)] bg-white/70 px-4 py-1 text-xs font-medium text-[var(--text-primary)] shadow-sm backdrop-blur dark:bg-black/30"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-4 shadow-sm dark:bg-black/30">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Focus
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                AI-driven apps, developer tools, and product engineering.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-4 shadow-sm dark:bg-black/30">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Workflow
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Design fast, ship clean, iterate with data.
              </p>
            </div>
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
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {group.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
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
                    className="rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--text-primary)] shadow-sm backdrop-blur dark:bg-black/30"
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
