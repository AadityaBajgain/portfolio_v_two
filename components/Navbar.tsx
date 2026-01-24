"use client"
import React from 'react'
import Link from 'next/link'
import TodayThought from './TodayThought'

const Navbar:React.FC = () => {


  return (
    <nav className="px-4 pt-5 sm:pt-10 flex flex-col md:flex-row justfy-between items-center">
      <TodayThought/>
    </nav>
  )
}

export default Navbar