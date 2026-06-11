import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconMenu2, IconX, IconTerminal } from "@tabler/icons-react";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "OBSERVER", href: "#hero" },
  { label: "OPERATOR", href: "#about" },
  { label: "CHART", href: "#skills" },
  { label: "LOGS", href: "#projects" },
  { label: "SIGNAL", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track scroll position to highlight active link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const link of links) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // 70px offset for navbar
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-950/75 backdrop-blur-xl border-b border-zinc-800">
      <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-7xl mx-auto h-[72px]">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="text-lg font-bold text-amber-100 tracking-tighter hover:text-amber-200 transition-colors"
        >
          ASTRO-CORE <span className="text-amber-300 font-mono text-sm ml-1">v1.0</span>
        </a>

        {/* Desktop Links (Single Line Desktop) */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-mono text-xs tracking-widest transition-all relative py-1 ${
                  isActive
                    ? "text-amber-200"
                    : "text-zinc-400 hover:text-amber-100"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-200"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="flex items-center gap-2 font-mono text-xs text-amber-200 px-4 py-2 border border-amber-200/40 rounded-sm bg-amber-950/10 hover:bg-amber-200 hover:text-neutral-950 transition-all duration-200 active:scale-95"
          >
            <IconTerminal size={14} />
            <span>SYSTEM.sh</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-amber-200 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-neutral-950 border-b border-zinc-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {links.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`font-mono text-sm tracking-widest ${
                      isActive ? "text-amber-200 font-bold" : "text-zinc-400"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="flex items-center justify-center gap-2 font-mono text-xs text-amber-200 py-3 border border-amber-200/30 rounded bg-amber-950/10 hover:bg-amber-200 hover:text-neutral-950 transition-all active:scale-95"
              >
                <IconTerminal size={14} />
                <span>SYSTEM.sh</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
