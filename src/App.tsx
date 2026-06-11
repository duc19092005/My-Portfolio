import CustomCursor from "./components/CustomCursor";
import GalaxyBackground from "./components/GalaxyBackground";
import SideNav from "./components/SideNav";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-[100dvh] bg-neutral-950 text-zinc-100 selection:bg-amber-300 selection:text-neutral-950 font-sans antialiased overflow-x-hidden">
      {/* Interactive overlays */}
      <CustomCursor />
      <GalaxyBackground />
      <SideNav />

      {/* Sticky header */}
      <Navbar />

      {/* Main logs */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      {/* Telemetry Footer */}
      <Footer />
    </div>
  );
}
