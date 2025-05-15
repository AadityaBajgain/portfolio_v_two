import About from '@/components/About';
import Tools from '@/components/Tools';
import Github from '@/components/Github';
export default function Home() {
  return (
    <main className="flex max-h-screen flex-col py-20">
      <About />
      {/* <Github/> */}
      {/* <ShowRepo repos={[]}/> */}
      <Tools />
    </main>
  );
}
