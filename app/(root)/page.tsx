import About from '@/components/About';
import Tools from '@/components/Tools';
import Github from '@/components/Github';
import Education from '@/components/Education';
export default function Home() {
  return (
    <main className="flex flex-col max-h-screen py-10 sm:py-20">
      
      <About />
      {/* <Github/> */}
      <Education/>
      {/* <ShowRepo repos={[]}/> */}
      {/* <Tools /> */}
    </main>
  );
}
