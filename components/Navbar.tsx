"use client"
import React from 'react'
import TodayThought from './TodayThought'

const Navbar:React.FC = () => {


  return (
    <nav className="px-4 pt-5 sm:pt-10 flex flex-col md:flex-row justfy-between items-center z-2">
      <TodayThought/>
    </nav>
  )
}

export default Navbar