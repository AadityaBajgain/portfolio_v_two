import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <section className="max-w-4xl mt-15 mx-auto px-6 flex flex-col sm:items-center md:flex-row justify-between items-end gap-10">
      <Image
        src="/Portfolio.webp"
        alt="photo"
        width={200}
        height={200}
        className="rounded-full opacity-90 object-cover"
      />
      <div className="text-center md:text-left max-w-xl">
        <h2 className='text-3xl'>Hi There!!</h2>
        <h1 className="text-3xl md:text-4xl font-bold">I'm Aaditya Bajgain.</h1>
        <p className="text-base md:text-lg mt-4">
          I am a passionate developer with a knack for creating dynamic and responsive web applications. My journey in web development has been fueled by a love for technology and a desire to create impactful digital experiences.
        </p>
      </div>
    </section>
  )
}

export default About
