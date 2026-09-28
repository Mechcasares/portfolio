import { Hero } from "@/components/Hero";
import { Obvious } from "@/components/Obvious";
import { Process } from "@/components/Process";
import { Work } from "@/components/Work";
import { About, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Obvious />
      <Process />
      <About />
      <Contact />
    </>
  );
}
