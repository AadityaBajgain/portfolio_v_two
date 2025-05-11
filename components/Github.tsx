"use client"

import React from 'react'
import GitHubCalendar from "react-github-calendar";

const Github = () => {
  return (
     <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">GitHub Contributions</h2>
    <GitHubCalendar username="your-username" />
  </div>
  )
}

export default Github
