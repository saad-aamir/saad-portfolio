import Nav from "@/components/ui/nav";
import Footer from "@/components/ui/footer";
import Hero from "@/components/sections/hero";
import IntroOverlay from "@/components/intro-overlay";
import Pillars from "@/components/sections/pillars";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Work from "@/components/sections/work";
import Stats from "@/components/sections/stats";
import Toolkit from "@/components/sections/toolkit";
import Writing from "@/components/sections/writing";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Nav />
      <main id="main-content">
        <Hero />
        <Pillars />
        <About />
        <Experience />
        <Work />
        <Toolkit />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
