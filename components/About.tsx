import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <section className="w-full px-6 py-10 flex flex-row md:flex-row justify-around items-center gap-10">
      <Image
        src="/Portfolio.webp"
        alt="photo"
        width={200}
        height={200}
        className="rounded-full opacity-90 object-cover"
      />
      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-base md:text-lg mt-4">
          I am a passionate web developer with a knack for creating dynamic and responsive web applications. My journey in web development has been fueled by a love for technology and a desire to create impactful digital experiences.
        </p>
      </div>
    </section>
  )
}

export default About
