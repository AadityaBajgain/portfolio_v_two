import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <main className='flex flex-col max-h-screen gap-10'>
      <Navbar/>
      {children}
      {/* <Footer/> */}
    </main>
  )
}

export default layout
