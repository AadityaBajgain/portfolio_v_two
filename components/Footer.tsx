import React from 'react'

const Footer:React.FC = () => {
  return (
    <footer className="w-full text-sm md:text-base py-2">
  <p className="text-center">
    {new Date().getFullYear()} &copy; Aaditya Bajgain. All rights reserved.
  </p>
</footer>
  )
}

export default Footer