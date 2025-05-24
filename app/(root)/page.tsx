import About from '@/components/About';
import Github from '@/components/Github';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import CodingNow from '@/components/CurrentProjects';

export default function Home() {
  return (
    <main className="flex flex-col py-10 sm:py-20 gap-8">
      <About />
      <div className="flex flex-col md:flex-row md:justify-between px-4">
        <Education />
        <Experience />
      </div>
      {/* <Github/> */}
      <Projects />
      <CodingNow/>
    </main>
  );
}
