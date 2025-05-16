import About from '@/components/About';
import Tools from '@/components/Tools';
import Github from '@/components/Github';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
export default function Home() {
  return (
    <main className="flex flex-col max-h-screen py-10 sm:py-20">

      <About />
      {/* <Github/> */}
      <div className='flex flex-col md:flex-wrap md:gap-5'>
        <Education />
        <Experience />
      </div>

      {/* <ShowRepo repos={[]}/> */}
      {/* <Tools /> */}
    </main>
  );
}
