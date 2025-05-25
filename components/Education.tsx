import React from 'react';



//   {
//     school: 'University of Southern Mississippi',
//     location: 'Hattiesburg, MS',
//     degree: 'B.S. in Computer Science',
//     duration: 'Aug 2024 – Dec 2024',
//     highlights: ['GPA: 4.00', 'President’s List', 'Google Developers Club'],
//   },

export default function Education() {
  return (
    <div className="card p-6 md:p-8 space-y-6">
      <h2 className="gradient-text">Education</h2>
      <div className="space-y-4">
        <div className="border-l-4 border-[var(--primary)] pl-4">
          <h3>Cerritos College</h3>
          <p className="text-[var(--muted)]">A.S. in Computer Science</p>
          <p className="text-sm">Jan 2025 – Present</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>• Computer and Information Sciences Club</li>
            <li>• Focus on software development and computer science fundamentals</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
