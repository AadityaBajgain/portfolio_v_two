import About from '@/components/HeroSection';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
// import Projects from '@/components/Projects';
import CodingNow from '@/components/CurrentProjects';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="section-container">
        <About />
      </section>

      {/* Experience & Education */}
      <section className="section-container">
        <h1 className=''>About Me</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Education />
          <Experience />
        </div>
      </section>

      <section className="section-container">
        <h1 className=''>My Projects</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* <Projects /> */}
          <CodingNow />
        </div>

      </section>
    </main>
  );
}
