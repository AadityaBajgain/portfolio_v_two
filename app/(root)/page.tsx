import About from '@/components/About';
import Github from '@/components/Github';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import CodingNow from '@/components/CurrentProjects';

export default function Home() {
  return (
    <main className="flex flex-col py-10 gap-8">
      <div className='h-[100vh]'>
        <About />
      </div>
      {/* <hr /> */}

      <div className="h-[100vh] flex flex-col md:flex-row md:justify-between px-4">
        <Education />
        <Experience />
      </div>
      <hr/>

      <div className='h-[100vh] flex flex-col md:flex-row md:justify-between px-4'>
        <Projects />
        <CodingNow/>
      </div>
      <hr/>
    </main>
  );
}
