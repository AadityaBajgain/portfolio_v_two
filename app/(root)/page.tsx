import About from '@/components/About';
import Tools from '@/components/Tools';
import Github from '@/components/Github';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
export default function Home() {
  return (
    <main className="flex flex-col max-h-screen py-10 sm:py-20">
      <About />
      <Education />
      <Experience />
      <Github/>
      <Projects />
      {/* <ShowRepo repos={[]}/> */}
      {/* <Tools /> */}
    </main>
  );
}
