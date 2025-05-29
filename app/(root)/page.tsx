import About from '@/components/About';
import Github from '@/components/Github';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
// import Projects from '@/components/Projects';
import CodingNow from '@/components/CurrentProjects';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen">
        <About />
      </section>

      {/* Experience & Education */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-8">
          <Education />
          <Experience />
        </div>
      </section>

      <section className="bg-gradient-to-b from-transparent to-[var(--border)] grid md:grid-cols-2">
        <div className="grid md:grid-cols-2 gap-8">
          {/* <Projects /> */}
        </div>
          <div className="flex flex-col justify-center items-center space-y-6">
            <CodingNow />
            <Github />
          </div>
        
      </section>
    </main>
  );
}
