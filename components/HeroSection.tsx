import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DownArrowAnimation from '@/components/DownArrowAnimation';
const HeroSection:React.FC = () => {
  return (
    <section className="section-container mx-auto gap-10 flex flex-col items-center md:gap-0 lg:justify-center">
      <div className='flex flex-col md:flex-row justify-center md:justify-start items-center gap-10'>
        <Image
          src="/pic.webp"
          alt="photo"
          width={200}
          height={200}
          className="rounded-full opacity-100 object-cover w-[35vw] sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 shadow-lg"
          priority
          loading="eager"
          draggable={false}
        />
       <div className="space-y-4 text-center md:text-left">
            <h1>Hey!</h1>
            <h1 className="gradient-text">I&apos;m Aaditya Bajgain</h1>
            <h2 className="text-[var(--muted)]">An Inspiring Student & Software Engineer</h2>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link href="https://github.com/AadityaBajgain"
                className="button flex items-center gap-2">
                <Image src="https://skillicons.dev/icons?i=github" alt="GitHub" width={20} height={20} unoptimized/>
                GitHub
              </Link>
              <Link href="https://linkedin.com/in/aadityabajgain"
                className="button flex items-center gap-2">
                <Image src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" width={20} height={20} unoptimized/>
                LinkedIn
              </Link>
            </div>
          </div>
      </div>
      <div className="md:mt-5 lg:mt-8">
        <DownArrowAnimation/>
      </div>
    </section>
  )
}

export default HeroSection;
