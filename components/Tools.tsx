import React from 'react'

const Tools = () => {
  return (
    <div className='mx-auto max-w-4xl px-6 flex flex-col md:flex-row justify-between gap-2 mb-10'>
      <h1 className='text-center mt-8 mb-4'>Tools that I Use</h1>
        <p className='text-center text-lg md:text-xl max-w-2xl mx-auto'>
            I use a variety of tools and technologies to build web applications. Here are some of the key tools that I frequently use in my development process: 
        </p>
        <div className=''>
            <ul>
            <li className='button'>
                <strong>Frontend:</strong>
            </li>
            <li className='button'>
                <strong>Backend:</strong> 
            </li>
            <li className='button'>
                <strong>Version Control:</strong>
            </li>
            <li className='button'>
                 <strong>Deployment:</strong>
            </li>
            </ul>
        </div>
        
    </div>
  )
}

export default Tools
