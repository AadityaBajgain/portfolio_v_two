import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import CodingNow from '@/components/CurrentProjects';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="section-container">
        <HeroSection />
      </section>

      {/* Experience & Education */}
      <section className="section-container">
        <h1 className='mb-5'>About Me</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Education />
          <Experience />
        </div>
      </section>

      <section className="section-container">
        <h1 className='mb-5'>My Projects</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Projects />
          <CodingNow />
        </div>
      </section>
      <Footer />
    </main>
  );
}
