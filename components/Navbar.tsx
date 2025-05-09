import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center mt-2'>
        <h1>Aaditya Bajgain</h1>
        <div>
            <ul className='flex flex-row gap-4 text-sm'>
              <li>About</li>
              <li>Projects</li>
              <li>Experience</li>
              <li>Contanct</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
