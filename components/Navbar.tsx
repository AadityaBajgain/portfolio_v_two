"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="px-4 py-4 flex justify-between items-center">
      <h1 className="text-lg md:text-2xl font-bold">
        <Link href="/">Aaditya Bajgain</Link>
      </h1>

      
      <div className="cursor-pointer md:hidden z-20" onClick={toggleMenu} >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      
      <ul className="hidden md:flex gap-4 text-sm md:text-base">
        <li className="hover:text-blue-500 transition-colors">
          <Link href="/about">About</Link>
        </li>
        <li className="hover:text-blue-500 transition-colors">
          <Link href="/projects">Projects</Link>
        </li>
        <li className="hover:text-blue-500 transition-colors">
          <Link href="/experience">Experience</Link>
        </li>
        <li className="hover:text-blue-500 transition-colors">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      {isOpen && (
        <ul className="absolute top-16 right-4 w-full rounded-b-lg bg-white/30 dark:bg-black/30 backdrop-blur-md flex flex-col items-center gap-4 py-6 text-base shadow-md z-10 md:hidden transition-transform transform-fillS duration-500">
          <li onClick={toggleMenu}>
            <Link href="/about">About</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link href="/projects">Projects</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link href="/experience">Experience</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar