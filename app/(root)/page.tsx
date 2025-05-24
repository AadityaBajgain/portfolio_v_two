import About from '@/components/About';
import Github from '@/components/Github';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import CodingNow from '@/components/CurrentProjects';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <About />
      </section>

      {/* Experience & Education */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-8">
          <Education />
          <Experience />
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-container bg-gradient-to-b from-transparent to-[var(--border)]">
        <div className="grid md:grid-cols-2 gap-8">
          <Projects />
          <div className="space-y-8">
            <CodingNow />
            <Github />
          </div>
        </div>
      </section>
    </main>
  );
}
