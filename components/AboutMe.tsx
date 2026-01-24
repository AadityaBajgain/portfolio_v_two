import React from "react";

const AboutMe: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="max-w-[45vw] space-y-4">
        <h2 className="gradient-text">Who Am I</h2>
        <p className="text-[var(--text-secondary)]">
          I’m a Computer Science student with a strong interest in AI, Machine
          Learning, and full-stack development, driven by curiosity and
          problem-solving. I enjoy building AI-powered, real-world applications
          and exploring how Machine Learning fundamentals can improve product
          experiences. My current toolkit includes Python, JavaScript, React,
          and Node.js, and I keep learning through hands-on projects.
        </p>
        <p className="text-[var(--text-secondary)]">
          I’m seeking internships and research opportunities in AI or software
          engineering where I can bridge research ideas with practical
          engineering and contribute to meaningful, user-focused software.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-md border border-[var(--border)] bg-[var(--card-background)] px-3 py-1">
            A.S. in Computer Science • Jan 2025 – Present
          </span>
          <span className="rounded-md border border-[var(--border)] bg-[var(--card-background)] px-3 py-1">
            Student Developer • 2023 – Present
          </span>
          <span className="rounded-md border border-[var(--border)] bg-[var(--card-background)] px-3 py-1">
            Learning: Machine Learning Foundation
          </span>
        </div>
      </div>

    </div>
  );
};

export default AboutMe;
