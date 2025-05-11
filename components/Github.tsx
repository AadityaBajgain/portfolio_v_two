"use client"

import React from 'react'
import GitHubCalendar from "react-github-calendar";
import { parseISO, isAfter, isBefore } from 'date-fns';

const Github = () => {
  const currentYear = new Date().getFullYear();
  const fromDate = new Date(`${currentYear}-01-01`);
  const toDate = new Date(`${currentYear}-12-31`);
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">GitHub Contributions</h2>
      <GitHubCalendar
        username="AadityaBajgain"
        transformData={(contributions) =>
          contributions.filter((day) => {
            const date = parseISO(day.date);
            return isAfter(date, fromDate) && isBefore(date, toDate);
          })
        }
        blockSize={15}
        blockMargin={5}
        fontSize={14}
        colorScheme="light" />
    </div>
  )
}

export default Github
