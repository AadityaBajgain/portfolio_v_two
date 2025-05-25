"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar:React.FC = () => {
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
    <nav className="px-4 pt-5 sm:pt-10 flex flex-col md:flex-row justfy-between items-center">
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
    </nav>
  )
}

export default Navbar