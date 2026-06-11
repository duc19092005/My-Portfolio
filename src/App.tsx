import { useEffect, useRef } from "react";
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
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "achievements", "contact"];

    const handleScrollSnap = (direction: number) => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let currentIndex = 0;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentIndex = i;
            break;
          }
        }
      }

      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        isScrollingRef.current = true;
        const targetElement = document.getElementById(sections[nextIndex]);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          });
        }
        
        // Cooldown lock to let smooth scrolling complete
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1100);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      
      // Prevent browser default scroll to hijack and control wheel movement
      e.preventDefault();

      if (isScrollingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      handleScrollSnap(direction);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return;
      if (isScrollingRef.current) return;

      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp"];
      if (!keys.includes(e.key)) return;

      const direction = (e.key === "ArrowDown" || e.key === "PageDown") ? 1 : -1;
      e.preventDefault();
      handleScrollSnap(direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
