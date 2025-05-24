import React from "react";

type ExperienceItem = {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
};

const experienceData: ExperienceItem[] = [
  {
    title: "Student Developer",
    company: "Self-Driven Projects",
    duration: "2024 - Present",
    responsibilities: [
      "Built and tested responsive, accessible, and secure web apps using SDLC principles",
      "Managed basic QA workflows, including test documentation and validation on staging branches",
    ],
  },
];

const Experience: React.FC = () => {
  return (
    <div className="card p-6 md:p-8 space-y-6">
      <h2 className="gradient-text">Experience</h2>

      <div className="space-y-4">
        {experienceData.map((item, index) => (
          <div
            key={index}
            className="border-l-4 border-[var(--primary)] pl-4"
          >
            <h3>{item.title}</h3>
            <p className="text-[var(--muted)]">{item.company}</p>
            <p className="text-sm">{item.duration}</p>
            <ul className="mt-2 space-y-2 text-sm">
              {item.responsibilities.map((responsibility, idx) => (
                <li key={idx}>• {responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
