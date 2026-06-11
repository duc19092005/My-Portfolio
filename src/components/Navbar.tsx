import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconMenu2, IconX, IconTerminal } from "@tabler/icons-react";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "AWARDS", href: "#achievements" },
  { label: "CONTACT", href: "#contact" },
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050507]/80 backdrop-blur-md border-b border-[#18181b]">
      <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-7xl mx-auto h-[72px]">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="text-lg font-extrabold text-[#f4f4f5] tracking-tight hover:text-[#06b6d4] transition-colors"
        >
          TAD<span className="text-[#06b6d4]">.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-mono text-[10px] tracking-widest transition-all relative py-1 ${
                  isActive
                    ? "text-[#f4f4f5]"
                    : "text-[#a1a1aa] hover:text-[#f4f4f5]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#06b6d4]"
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
            className="flex items-center gap-2 font-mono text-[10px] text-[#06b6d4] px-4 py-2 border border-[#06b6d4]/30 rounded-sm bg-[#06b6d4]/5 hover:bg-[#06b6d4] hover:text-[#050507] transition-all duration-200 active:scale-95 font-semibold"
          >
            <IconTerminal size={12} />
            <span>CONTACT.sh</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-[#06b6d4] transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-[#0c0c0e] border-b border-[#18181b] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {links.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`font-mono text-xs tracking-widest ${
                      isActive ? "text-[#06b6d4] font-bold" : "text-[#a1a1aa]"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="flex items-center justify-center gap-2 font-mono text-xs text-[#06b6d4] py-3 border border-[#06b6d4]/30 rounded bg-[#06b6d4]/5 hover:bg-[#06b6d4] hover:text-[#050507] transition-all active:scale-95"
              >
                <IconTerminal size={12} />
                <span>CONTACT.sh</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
