"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes } from 'react-icons/fa'
import { BsSun, BsMoon } from 'react-icons/bs'
import { useTheme } from '@/context/ThemeContext'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [iconSize, setIconSize] = useState(16)
  const { theme, toggleTheme } = useTheme()

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
    <nav className="px-4 pt-5 sm:pt-10 flex flex-col md:flex-row justify-between items-center">
      <div className='flex flex-row justify-between items-center w-full'>
        <h1 className="text-xl sm:text-3xl font-bold">
          <Link href="/">Aaditya Bajgain</Link>
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <BsSun size={iconSize} className="text-yellow-500" />
            ) : (
              <BsMoon size={iconSize} className="text-gray-700" />
            )}
          </button>
          <div className="cursor-pointer md:hidden z-20" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes size={iconSize} />
            ) : (
              <FaBars size={iconSize} />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar