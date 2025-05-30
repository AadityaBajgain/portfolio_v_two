import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <main className='flex flex-col max-h-screen'>
      <Navbar/>
            <h2 className='text-sm text-slate-500 text-center mt-5'>Still under Development...</h2>
      {children}
      {/* <Footer/> */}
    </main>
  )
}

export default layout
