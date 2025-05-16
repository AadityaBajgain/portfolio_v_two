import React from 'react';

type EducationItem = {
  school: string;
  location: string;
  degree: string;
  duration: string;
  highlights: string[];
};

const educationData: EducationItem[] = [
  {
    school: 'Cerritos College',
    location: 'Norwalk, CA',
    degree: 'A.S. in Computer Science',
    duration: 'Jan 2025 – Present',
    highlights: ['Computer and Information Science Club'],
  },
//   {
//     school: 'University of Southern Mississippi',
//     location: 'Hattiesburg, MS',
//     degree: 'B.S. in Computer Science',
//     duration: 'Aug 2024 – Dec 2024',
//     highlights: ['GPA: 4.00', 'President’s List', 'Google Developers Club'],
//   },
];

const Education: React.FC = () => {
  return (
    <section className="py-8 w-full flex flex-col">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 mx-auto">Education</h2>
    <div className="education">
      <div >
        <h3>
          Cerritos College | Norwalk, CA
        </h3>
        <p className="text-gray-500">
          A.S. in Computer Science | Jan 2025 – Present
        </p>
        <ul>
          <li>Computer and Information Sciences Club.</li>
        </ul>
      </div>
    </div>
    </section>
  );
};

export default Education;
