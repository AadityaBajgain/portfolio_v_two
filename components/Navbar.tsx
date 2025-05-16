"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [iconSize, setIconSize] = useState(16)
  useEffect(() => {
    setIconSize(window.innerWidth >= 768 ? 24 : 16)

    const handleResize = () => {
      setIconSize(window.innerWidth >= 768 ? 24 : 16)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="px-4 pt-10 flex flex-col md:flex-row justfy-between items-center">
      <div className='flex flex-row justify-between items-center w-full'>
        <h1 className="text-xl sm:text-3xl font-bold">
          <Link href="/">Aaditya Bajgain</Link>
        </h1>
        <div className="cursor-pointer md:hidden z-20" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes size={iconSize} />
          ) : (
            <FaBars size={iconSize} />
          )}
        </div>
      </div>



      <ul className="hidden md:flex gap-4 text-sm md:text-base">

        <li>
          <Link href="/projects">Projects</Link>
        </li>
        <li>
          <Link href="/experience">Experience</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      {isOpen && (
        <ul className="fixed top-20 left-0 w-full rounded-b-lg bg-none dark:bg-black/20 backdrop-blur-md flex flex-col items-center gap-4 py-6 text-base shadow-md z-10 md:hidden transition-transform transform-fillS duration-500">
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