import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <main className='flex flex-col max-h-screen'>
      <Navbar/>
      {children}
      {/* <Footer/> */}
    </main>
  )
}

export default layout
