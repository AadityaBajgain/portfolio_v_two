import React from 'react'
import Image from 'next/image'
const About = () => {
    return (
        <section className='w-full flex flex-row justify-around items-center gap-10'>
            <Image src="/Portfolio.webp" alt="photo" width={200} height={100} className='rounded-full opacity-90'/>
            <div>
                <h1 className="text-4xl font-bold ">Welcome to My Portfolio</h1>
                <p className="text-lg mt-5">I am a passionate web developer with a knack for creating dynamic and responsive web applications. My journey in web development has been fueled by a love for technology and a desire to create impactful digital experiences.</p>
            </div>
        </section>
    )
}

export default About
