import React from "react";

const Experience: React.FC = () => {
  return (
    <section className="py-8 flex flex-col w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 mx-auto">Experience</h2>
    <div className="experience">
      <div >
        <h3>
          Student Develope | Self-Driven Projects
        </h3>
        <ul>
          <li>Built and tested responsive, accessible, and secure web apps using SDLC principles.</li>
          <li>Managed basic QA workflows, including test documentation and validation on staging branches.</li>
        </ul>
      </div>
    </div>
    </section>
  );
};

export default Experience;
