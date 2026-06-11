import { LanguageProvider } from "./context/LanguageContext";
import CustomCursor from "./components/CustomCursor";
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
    <LanguageProvider>
      <div className="relative min-h-[100dvh] bg-[#050507] text-[#e5e5e5] selection:bg-[#27272a] selection:text-[#f4f4f5] font-sans antialiased overflow-x-hidden">
        {/* Interactive overlays */}
        <CustomCursor />
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
    </LanguageProvider>
  );
}
