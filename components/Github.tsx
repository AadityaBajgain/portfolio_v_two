"use client"

import React from 'react'
import GitHubCalendar from "react-github-calendar";
import { parseISO, isAfter, isBefore } from 'date-fns';
const Github:React.FC = () => {
  const currentYear = new Date().getFullYear();
  const fromDate = new Date(`${currentYear}-01-01`);
  const toDate = new Date(`${currentYear}-12-31`);


  
  return (
    <div className="github-section">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">GitHub Contributions</h2>
        <div className="overflow-x-auto">
            <GitHubCalendar
                username="AadityaBajgain"
                transformData={(contributions) =>
                    contributions.filter((day) => {
                        const date = parseISO(day.date);
                        return isAfter(date, fromDate) && isBefore(date, toDate);
                    })
                }
                blockSize={12}
                blockMargin={4}
                fontSize={12}
                colorScheme="light"
            />
        </div>
    </div>
  )
}

export default Github
