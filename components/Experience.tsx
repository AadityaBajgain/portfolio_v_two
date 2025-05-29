import React from "react";


const Experience: React.FC = () => {
  return (
    <div className="rounded-md p-6 md:p-8 space-y-6 hover:shadow-slate-400 shadow-lg bottom-2 right-2 transition-all duration-300">
      <h2 className="gradient-text">Experience</h2>

      <div className="space-y-4 ">

        <div

          className="border-l-4 border-[var(--primary)] pl-4"
        >
          <h3>Student Developer</h3>
          <p className="text-[var(--muted)]">Student Developer</p>
          <p className="text-sm">2023 - Present</p>
          <ul className="mt-2 space-y-2 text-sm">

            <li>• Built and tested responsive, accessible, and secure web apps using SDLC principles</li>
            <li>• Managed basic QA workflows, including test documentation and validation on staging branches</li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
