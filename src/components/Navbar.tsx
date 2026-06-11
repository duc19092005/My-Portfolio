import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconMenu2, IconX, IconTerminal, IconChevronDown, IconGlobe } from "@tabler/icons-react";
import { useLanguage } from "../context/LanguageContext";

interface NavLink {
  key: "about" | "skills" | "projects" | "awards" | "contact";
  href: string;
}

const links: NavLink[] = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "awards", href: "#achievements" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            const label = t.nav[link.key];
            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-mono text-[10px] tracking-widest transition-all relative py-1 ${
                  isActive
                    ? "text-[#f4f4f5]"
                    : "text-[#a1a1aa] hover:text-[#f4f4f5]"
                }`}
              >
                {label}
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

        {/* Action Button & Language Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 hover:text-[#06b6d4] transition-colors uppercase border border-[#18181b] bg-[#0c0c0e]/50 px-2.5 py-1.5 rounded-sm cursor-pointer select-none active:scale-95"
            >
              <IconGlobe size={11} className="text-[#06b6d4]" />
              <span>{language}</span>
              <IconChevronDown size={10} className={`text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-1.5 w-24 bg-[#0c0c0e]/95 backdrop-blur-md border border-[#18181b] rounded-sm py-1 z-50 shadow-2xl origin-top-right"
                >
                  {(["en", "vi", "ru"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left font-mono text-[10px] px-3 py-1.5 hover:bg-[#18181b] transition-colors uppercase flex items-center justify-between ${
                        language === lang ? "text-[#06b6d4] font-semibold" : "text-zinc-400 hover:text-[#f4f4f5]"
                      }`}
                    >
                      <span>{lang}</span>
                      {language === lang && <div className="w-1 h-1 rounded-full bg-[#06b6d4]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="flex items-center gap-2 font-mono text-[10px] text-[#06b6d4] px-4 py-2 border border-[#06b6d4]/30 rounded-sm bg-[#06b6d4]/5 hover:bg-[#06b6d4] hover:text-[#050507] transition-all duration-200 active:scale-95 font-semibold"
          >
            <IconTerminal size={12} />
            <span>{t.nav.btnContact}</span>
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
                const label = t.nav[link.key];
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`font-mono text-xs tracking-widest ${
                      isActive ? "text-[#06b6d4] font-bold" : "text-[#a1a1aa]"
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="flex items-center justify-center gap-2 font-mono text-xs text-[#06b6d4] py-3 border border-[#06b6d4]/30 rounded bg-[#06b6d4]/5 hover:bg-[#06b6d4] hover:text-[#050507] transition-all active:scale-95"
              >
                <IconTerminal size={12} />
                <span>{t.nav.btnContact}</span>
              </a>

              {/* Language Selector in Drawer */}
              <div className="flex flex-col gap-2 border-t border-[#18181b] pt-4 mt-2">
                <button
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  className="flex items-center justify-between w-full font-mono text-[10px] text-zinc-500 uppercase tracking-widest cursor-pointer select-none"
                >
                  <span>locale</span>
                  <div className="flex items-center gap-1 text-[#06b6d4]">
                    <span>{language}</span>
                    <IconChevronDown size={10} className={`transition-transform duration-200 ${isMobileDropdownOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isMobileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden flex flex-col gap-2 pl-2 mt-1"
                    >
                      {(["en", "vi", "ru"] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setIsMobileDropdownOpen(false);
                            setIsOpen(false); // Close mobile drawer
                          }}
                          className={`text-left font-mono text-xs py-1.5 transition-all uppercase ${
                            language === lang ? "text-[#06b6d4] font-bold" : "text-zinc-500 hover:text-[#f4f4f5]"
                          }`}
                        >
                          {lang === "en" ? "english (en)" : lang === "vi" ? "tiếng việt (vi)" : "русский (ru)"}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
