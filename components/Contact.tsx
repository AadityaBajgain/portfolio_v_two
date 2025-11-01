import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Contact = () => {
  return (
    <div className='h-max-fit p-6 grid gap-5 md:p-8 md:grid-cols-2'>
    <div>
        <h2 className='text-[var(--primary)] mb-5'> Contact Information</h2>
        <p className='text-md'>Let&apos;s connect! I&apos;m always open to discussing new project ideas and potential collaborations. Feel free to reach out through any of the channels below.</p>
        <ul className="mt-3 space-y-2 md:space-x-3">
          <li className='flex flex-row items-center'>
            <Image src="https://skillicons.dev/icons?i=gmail,&theme=dark" alt="gmail" width={20} height={20} className='w-[2.5rem]' unoptimized/>
            <span className="font-semibold text-sm">Gmail:{" "}
            <Link href="mailto:adityabajgain@gmail.com" className="text-[var(--primary)] hover:underline">
              adityabajgain@gmail.com
            </Link></span>
          </li>
          <li className='flex flex-row items-center'>
            <Image src="https://skillicons.dev/icons?i=linkedin,&theme=dark" alt="linkedIn" width={20} height={20} className='w-[2.5rem]'unoptimized/>
            <span className="font-semibold text-sm">LinkedIn:{" "}
            <Link href="https://linkedin.com/in/AadityaBajgain" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] text-sm hover:underline">
              linkedin.com/in/AadityaBajgain
            </Link></span>
          </li>
          <li className='flex flex-row items-center'>
            <Image src="https://skillicons.dev/icons?i=github,&theme=dark" alt="github" width={20} height={20} className='w-[2.5rem]' unoptimized/>
            <span className="font-semibold text-sm">GitHub:{" "}
            <Link href="https://github.com/AadityaBajgain" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] text-smhover:underline">
              github.com/AadityaBajgain
            </Link></span>
          </li>
        </ul>
    </div>
    <form className='form'>
      <label htmlFor="Name">Name</label>
      <input type="text" placeholder='Enter your name'/>
      <label htmlFor="email">Email</label>
      <input type="email" placeholder='Enter your email'/>
      <label htmlFor="Message">Message</label>
      <textarea placeholder='Enter your message'></textarea>
      <button className='button mt-4 cursor-pointer'>Submit</button>
    </form>
    </div>
    
  )
}

export default Contact
