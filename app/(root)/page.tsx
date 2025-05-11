import About from '@/components/About';
import Github from '@/components/Github';
import ShowRepo from '@/components/ShowRepo';
export default function Home() {
  return (
    <main className="flex max-h-screen flex-col py-20">
      <About />
      <Github/>
      <ShowRepo repos={[]}/>
    </main>
  );
}
