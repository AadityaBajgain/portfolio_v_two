import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
const layout = ({children}:{children:ReactNode}) => {
  return (
    <main className='flex flex-col'>
      <Navbar/>
      {children}
      <Footer/>
    </main>
  )
}

export default layout
