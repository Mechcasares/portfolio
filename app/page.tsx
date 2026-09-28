import { Hero } from "@/components/Hero";
import { Obvious } from "@/components/Obvious";
import { PointOfView } from "@/components/PointOfView";
import { Process } from "@/components/Process";
import { Work } from "@/components/Work";
import { About, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <PointOfView />
      <Work />
      <Obvious />
      <Process />
      <About />
      <Contact />
    </>
  );
}
