import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface SideLink {
  key: "hero" | "about" | "skills" | "projects" | "awards" | "contact";
  href: string;
}

const sideLinks: SideLink[] = [
  { key: "hero", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "awards", href: "#achievements" },
  { key: "contact", href: "#contact" },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const link of sideLinks) {
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
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 86,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-6 select-none">
      {/* Center Line tracker */}
      <div className="absolute top-2 bottom-2 w-[1px] bg-zinc-800/40 z-0 pointer-events-none" />

      {/* Navigation Bullets */}
      {sideLinks.map((link) => {
        const targetId = link.href.substring(1);
        const isActive = activeSection === targetId;
        const label = t.sidenav[link.key];

        return (
          <a
            key={link.key}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="relative flex items-center justify-center p-2 group cursor-pointer z-10"
            aria-label={`Scroll to ${label}`}
          >
            {/* Tooltip Label (slides out on hover) */}
            <span className="absolute right-8 font-mono text-[9px] text-zinc-500 tracking-widest bg-[#0c0c0e] border border-[#18181b] px-2 py-0.5 rounded-sm opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#06b6d4] transition-all duration-200 shadow-lg">
              {label}
            </span>

            {/* Glowing Active Ring */}
            {isActive && (
              <motion.div
                layoutId="activeBulletRing"
                className="absolute w-5 h-5 border border-[#06b6d4]/40 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.15)]"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}

            {/* Bullet Dot */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-[#06b6d4] scale-125 shadow-[0_0_8px_#06b6d4]"
                  : "bg-zinc-700 group-hover:bg-zinc-500 group-hover:scale-110"
              }`}
            />
          </a>
        );
      })}
    </div>
  );
}
