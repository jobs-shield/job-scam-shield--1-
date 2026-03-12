import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Certifications from "@/sections/Certifications";
import CyberLab from "@/components/CyberLab";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <Hero />
      <div className="relative">
        <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <CyberLab />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
