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
    <section id="education" className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Education</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {educationData.map((item, index) => (
          <div 
            key={index} 
            className='education-entry'
          >
            <div className='flex flex-row justify-between items-center'>
              <h3>
                {item.school}
              </h3>
              <span >
                {item.location}
              </span>
            </div>
            
            <div className='flex flex-col'>
              <strong >{item.degree}</strong>
              <span>
                {item.duration}
              </span>
            </div>

            <ul >
              {item.highlights.map((highlight, idx) => (
                <li 
                  key={idx}
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
