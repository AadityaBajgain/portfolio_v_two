import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const About:React.FC = () => {
  return (
    <section className="max-w-4xl max-h-full mx-auto gap-10 flex flex-col items-center md:gap-0 ">
      <div className='flex flex-col md:flex-row justify-around items-center gap-5 md:mt-10'>
        <Image
          src="/Portfolio.webp"
          alt="photo"
          width={200}
          height={200}
          className="rounded-full opacity-90 object-cover w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 shadow-lg"
        />
        <div className="text-center md:text-left max-w-xl">
          <h2 className='text-3xl'>Hi There!!</h2>
          <h1 className="text-3xl md:text-4xl font-bold">I'm Aaditya Bajgain.</h1>
          <h3>
            Student and aspiring software engineer
          </h3>
          <p className="text-sm mt-4">
            I am a student at <strong>Cerritos College</strong>, pursuing a degree in <strong>Computer and Information Science</strong>. I am passionate about software development and have experience in various programming languages and frameworks. I enjoy learning new technologies and applying them to real-world projects.
          </p>
        </div>
      </div>

      <div className="flex text-center md:text-left max-w-xl gap-4">
        <Link href='https://github.com/AadityaBajgain' className='button'>Github 
          <Image src={"/git.png"} alt="github" width={25} height={20} className="ml-2"/></Link>
        <Link href='https://www.linkedin.com/in/aadityabajgain/' className='button'>LinkedIn
          <Image src={"/linkedin.png"} alt="github" width={25} height={20} className="ml-2"/>
        </Link>
      </div>
    </section>
  )
}

export default About
