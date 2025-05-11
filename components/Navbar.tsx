"use client"
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
   const [iconSize, setIconSize] = useState(16)
  useEffect(() => {
    // Set initial icon size
    setIconSize(window.innerWidth >= 768 ? 24 : 16)

    // Update icon size on window resize
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
    <nav className="px-4 pt-10 flex justify-between items-center">
      <h1 className="text-xl md:text-3xl font-bold">
        <Link href="/">Aaditya Bajgain</Link>
      </h1>

      
      <div className="cursor-pointer md:hidden z-20" onClick={toggleMenu}>
        {isOpen ? (
          <FaTimes size={iconSize} />
        ) : (
          <FaBars size={iconSize} />
        )}
      </div>

      
      <ul className="hidden md:flex gap-4 text-sm md:text-base">
        <li>
          <Link href="/about">About</Link>
        </li>
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
        <ul className="absolute top-20 right-4 w-full rounded-b-lg bg-white/30 dark:bg-black/30 backdrop-blur-md flex flex-col items-center gap-4 py-6 text-base shadow-md z-10 md:hidden transition-transform transform-fillS duration-500">
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