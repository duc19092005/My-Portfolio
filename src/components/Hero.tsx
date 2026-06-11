import { motion } from "motion/react";
import { IconArrowRight, IconTerminal } from "@tabler/icons-react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center bg-[#050507] text-[#e5e5e5] px-6 md:px-12 pt-20 border-b border-[#18181b] snap-start scroll-mt-[88px] overflow-hidden"
    >
      {/* Structural grid line overlays (faint) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Text Stack */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-8 flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#18181b] bg-[#0c0c0e] mb-6">
            <IconTerminal size={12} className="text-[#06b6d4]" />
            <span className="font-mono text-[10px] tracking-widest text-[#a1a1aa] uppercase">{t.hero.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tight text-[#f4f4f5] leading-none mb-6">
            {t.hero.title}
          </h1>
          
          <h2 className="text-lg md:text-xl font-mono text-[#06b6d4] mb-6 font-semibold tracking-wide uppercase">
            {t.hero.subtitle}
          </h2>

          {/* Subtext */}
          <p className="text-base md:text-lg text-[#a1a1aa] max-w-2xl mb-8 leading-relaxed">
            {t.hero.subtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={(e) => handleScrollClick(e, "#projects")}
              className="inline-flex items-center gap-2 bg-[#f4f4f5] text-[#050507] hover:bg-[#e4e4e7] transition-all px-6 py-3 rounded-sm font-semibold text-sm cursor-pointer shadow-lg active:scale-95"
            >
              <span>{t.hero.btnProjects}</span>
              <IconArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollClick(e, "#contact")}
              className="inline-flex items-center gap-2 border border-[#18181b] hover:border-zinc-700 bg-[#0c0c0e] text-[#f4f4f5] transition-all px-6 py-3 rounded-sm font-medium text-sm cursor-pointer active:scale-95"
            >
              <span>{t.hero.btnContact}</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Decorative Technical Monitor Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="md:col-span-4 hidden md:flex justify-center relative"
        >
          <div className="absolute w-64 h-64 bg-[#06b6d4]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="border border-[#18181b] bg-[#0c0c0e] p-8 rounded-sm w-72 h-72 flex flex-col justify-between relative shadow-2xl">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] text-[#06b6d4] font-bold">{t.hero.monitorTitle}</span>
              <div className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
            </div>
            
            <div className="py-6 flex flex-col justify-center flex-grow">
              <div className="h-1 bg-[#18181b] w-full rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "99.98%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  className="h-full bg-[#06b6d4]"
                />
              </div>
              <span className="font-mono text-[9px] text-zinc-500 mt-2 block text-right">UPTIME SLA: 99.98%</span>
            </div>

            <div className="space-y-2 font-mono text-xs text-[#a1a1aa]">
              <div className="flex justify-between border-b border-[#18181b]/50 pb-1">
                <span>{t.hero.portBind}</span>
                <span className="text-[#f4f4f5]">8080</span>
              </div>
              <div className="flex justify-between border-b border-[#18181b]/50 pb-1">
                <span>{t.hero.database}</span>
                <span className="text-[#f4f4f5]">SQL Server</span>
              </div>
              <div className="flex justify-between border-b border-[#18181b]/50 pb-1">
                <span>{t.hero.env}</span>
                <span className="text-teal-400">{t.hero.envValue}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
