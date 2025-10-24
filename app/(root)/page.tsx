import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import CodingNow from '@/components/CurrentProjects';
import HeroSection from '@/components/HeroSection';
import Tools from '@/components/Tools';
import TodayThought from '@/components/TodayThought';
import Contact from '@/components/Contact';
export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="section-container min-h-screen flex flex-col lg:justify-center">
        <TodayThought/>
        <HeroSection />
      </section>

      {/* Experience & Education */}
      <section className="section-container min-h-screen">
        <h1 className='mb-5'>About Me</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Education />
          <Experience />
        </div>
      </section>

      <section className="section-container min-h-sccreen">
        <h1 className='mb-5'>My Projects</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Projects />
          <CodingNow />
        </div>
      </section>

      <section className="section-container min-h-screen">
        <h1 className='mb-5'>My Tools</h1>
        <div>
          <Tools />
        </div>
      </section>
      <section className="section-container min-h-screen">
      <h1 className='mb-5'>Get In Touch</h1>
      <div className="flex flex-col">
          <Contact />
        </div>
      </section>
     
    </main>
  );
}
