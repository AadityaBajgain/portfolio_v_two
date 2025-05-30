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
          <p className="text-[var(--muted)]">Self-Taught</p>
          <p className="text-sm">2023 - Present</p>
          <ul className="mt-2 space-y-2 text-sm">

            <li>• Developed interactive full-stack web applications by building projects like MoneyMap (personal finance tracker) and prepview (AI-powered interview prep app), using JavaScript/TypeScript, React, and API integrations.</li>
            <li>• Created engaging user interfaces and enhanced personal branding by designing and deploying portfolio websites and productivity tools, using modern frontend frameworks, Vercel for deployment, and responsive web technologies.</li>
            <li>• Integrated third-party and AI services into web products by leveraging APIs such as OpenWeather and Google Gemini, using RESTful API consumption and real-time data visualization techniques.</li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
