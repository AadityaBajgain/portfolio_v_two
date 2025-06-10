"use client"
import React from 'react'
import Link from 'next/link'

const Navbar:React.FC = () => {


  return (
    <nav className="px-4 pt-5 sm:pt-10 flex flex-col md:flex-row justfy-between items-center">
      <div className='flex flex-row justify-between items-center w-full'>
        <h1 className="text-xl sm:text-3xl font-bold">
          <Link href="/">Aaditya Bajgain</Link>
        </h1>
      </div>
    </nav>
  )
}

export default Navbar