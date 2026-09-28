import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About, Capabilities, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Capabilities />
      <About />
      <Contact />
    </>
  );
}
