"use client"
import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className='flex justify-between items-center mt-4 mb-4'>
        <h1><Link href="/">Aaditya Bajgain</Link></h1>
        <div>
            <ul className='flex flex-row gap-4 text-sm'>
              <li>About</li>
              <li>Projects</li>
              <li>Experience</li>
              <li>Contact</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
