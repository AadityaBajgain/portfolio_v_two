import React from "react";

const Experience: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Student Developer | Self-Driven Projects
        </h3>
        <ul className="list-disc list-inside mt-2">
          <li>Built and tested responsive, accessible, and secure web apps using SDLC principles.</li>
          <li>Managed basic QA workflows, including test documentation and validation on staging branches.</li>
        </ul>
      </div>
    </div>
  );
};

export default Experience;
