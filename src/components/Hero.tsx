import { motion } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";

export default function Hero() {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-neutral-950/20 pt-20"
    >
      {/* Central Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-5xl"
      >
        {/* 1. Eyebrow */}
        <span className="font-mono text-sm text-teal-400 tracking-[0.25em] block mb-4">
          INITIALIZING SYSTEMS...
        </span>

        {/* 2. Headline */}
        <h1 className="font-display text-5xl md:text-8xl font-bold text-amber-100 tracking-[0.18em] mb-6 uppercase leading-none">
          TRẦN ANH ĐỨC
        </h1>

        {/* 3. Subtext */}
        <p className="font-mono text-base md:text-lg text-zinc-400 mb-10 max-w-3xl mx-auto tracking-wide">
          Backend Developer · Building systems in the dark
        </p>

        {/* 4. CTAs */}
        <div className="flex justify-center">
          <a
            href="#about"
            onClick={(e) => handleScrollClick(e, "#about")}
            className="group inline-flex items-center gap-2 font-mono text-sm text-amber-300 border border-amber-300/30 px-6 py-3.5 bg-amber-950/10 hover:bg-amber-300 hover:text-neutral-950 transition-all rounded-sm duration-200 active:scale-95 cursor-pointer"
          >
            Explore mission logs
            <IconArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </motion.div>

      {/* Telemetry Footer at Bottom of Viewport */}
      <div className="absolute bottom-10 left-0 w-full px-6 md:px-12 flex justify-between font-mono text-[10px] text-zinc-600 select-none z-10 pointer-events-none">
        <span>RA 12h 45m 0s | Dec -28° 22' 54"</span>
        <span>SYS_TEMP: 32.4°C | UPTIME: 99.98%</span>
      </div>
    </section>
  );
}
