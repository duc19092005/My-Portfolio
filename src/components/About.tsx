import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const planet1Ref = useRef<HTMLDivElement | null>(null);
  const planet2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let angle1 = 0;
    let angle2 = Math.PI; // Start at opposite sides

    const rx1 = 110;
    const ry1 = 48;
    const beta1 = 12 * Math.PI / 180; // 12 deg

    const rx2 = 160;
    const ry2 = 72;
    const beta2 = -12 * Math.PI / 180; // -12 deg

    let animationId: number;

    const updateOrbits = () => {
      // Speeds (Theory of relativity: closer orbits spin faster)
      angle1 += 0.007;
      angle2 -= 0.0045;

      // Planet 1 (.NET)
      if (planet1Ref.current) {
        const cosA = Math.cos(angle1);
        const sinA = Math.sin(angle1);
        
        const x0 = rx1 * cosA;
        const y0 = ry1 * sinA;
        
        const x = x0 * Math.cos(beta1) - y0 * Math.sin(beta1);
        const y = x0 * Math.sin(beta1) + y0 * Math.cos(beta1);
        
        // Depth projection (sinA > 0 is bottom/front in coordinate system)
        const z = sinA;
        const scale = 1 + z * 0.15;
        const opacity = 0.65 + (z + 1) * 0.175;
        const zIndex = z > 0 ? 20 : 5;

        planet1Ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        planet1Ref.current.style.opacity = opacity.toString();
        planet1Ref.current.style.zIndex = zIndex.toString();
      }

      // Planet 2 (Node.js)
      if (planet2Ref.current) {
        const cosA = Math.cos(angle2);
        const sinA = Math.sin(angle2);
        
        const x0 = rx2 * cosA;
        const y0 = ry2 * sinA;
        
        const x = x0 * Math.cos(beta2) - y0 * Math.sin(beta2);
        const y = x0 * Math.sin(beta2) + y0 * Math.cos(beta2);
        
        const z = sinA;
        const scale = 1 + z * 0.15;
        const opacity = 0.65 + (z + 1) * 0.175;
        const zIndex = z > 0 ? 20 : 5;

        planet2Ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        planet2Ref.current.style.opacity = opacity.toString();
        planet2Ref.current.style.zIndex = zIndex.toString();
      }

      animationId = requestAnimationFrame(updateOrbits);
    };

    animationId = requestAnimationFrame(updateOrbits);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section 
      id="about" 
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 snap-start scroll-mt-[88px] bg-[#050507]"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Bio & Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <span className="font-mono text-xs text-[#06b6d4] tracking-widest block mb-2 uppercase font-bold">
            {t.about.eyebrow}
          </span>
          <h2 className="font-sans text-4xl font-extrabold text-[#f4f4f5] mb-8 uppercase tracking-wide">
            {t.about.title}
          </h2>

          <div className="space-y-6 font-sans text-[#a1a1aa] leading-relaxed mb-10 text-base">
            {t.about.bioParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Chronology Timeline */}
          <div className="border border-[#18181b] bg-[#0c0c0e]/50 backdrop-blur-sm p-6 md:p-8 rounded-sm shadow-md mt-10">
            <h3 className="font-mono text-sm text-[#06b6d4] font-bold tracking-widest uppercase mb-6 border-b border-[#18181b] pb-3">
              {t.about.timelineTitle}
            </h3>
            
            <div className="relative pl-6 border-l border-[#18181b] space-y-8">
              {t.about.timelineItems.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Bullet */}
                  <div className={`absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border ${idx === 0 ? "border-[#06b6d4]" : "border-zinc-700"} bg-[#0c0c0e] flex items-center justify-center`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-[#06b6d4]" : "bg-zinc-600"}`} />
                  </div>
                  <span className="font-mono text-xs text-zinc-500 block mb-1">
                    {item.date}
                  </span>
                  <h4 className="text-base font-bold text-[#f4f4f5] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#a1a1aa] leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Relativistic 3D Orbital visualization */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden border border-[#18181b] bg-[#0c0c0e]/30 backdrop-blur-sm rounded-sm shadow-md"
        >
          {/* Warped Space-Time Grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 400" preserveAspectRatio="none">
            {/* Horizontal coordinate lines */}
            <path d="M 0,60 Q 200,120 400,60" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 0,110 Q 200,165 400,110" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 0,160 Q 200,190 400,160" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 0,200 Q 200,200 400,200" fill="none" className="stroke-zinc-700 stroke-[0.5]" />
            <path d="M 0,240 Q 200,210 400,240" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 0,290 Q 200,235 400,290" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 0,340 Q 200,280 400,340" fill="none" className="stroke-zinc-800 stroke-[0.5]" />

            {/* Vertical coordinate lines */}
            <path d="M 60,0 Q 120,200 60,400" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 110,0 Q 165,200 110,400" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 160,0 Q 190,200 160,400" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 200,0 Q 200,200 200,400" fill="none" className="stroke-zinc-700 stroke-[0.5]" />
            <path d="M 240,0 Q 210,200 240,400" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 290,0 Q 235,200 290,400" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 340,0 Q 280,200 340,400" fill="none" className="stroke-zinc-800 stroke-[0.5]" />

            {/* Concentric orbits */}
            <g transform="rotate(12 200 200)">
              <ellipse cx="200" cy="200" rx="110" ry="48" fill="none" className="stroke-[#06b6d4]/10 stroke-[0.75] stroke-dashed" />
            </g>
            <g transform="rotate(-12 200 200)">
              <ellipse cx="200" cy="200" rx="160" ry="72" fill="none" className="stroke-[#06b6d4]/10 stroke-[0.75] stroke-dashed" />
            </g>
          </svg>

          {/* Central Core: Black Hole */}
          <div className="relative flex items-center justify-center z-10 pointer-events-none">
            <div className="absolute w-32 h-32 bg-[#06b6d4]/10 rounded-full blur-xl animate-pulse [animation-duration:3s]" />
            <div className="absolute w-26 h-26 border-[3.5px] border-[#06b6d4]/40 rounded-full blur-[1px] shadow-[0_0_20px_rgba(6,182,212,0.25),_inset_0_0_20px_rgba(6,182,212,0.25)] scale-y-[0.35] rotate-[12deg] animate-spin [animation-duration:25s] [animation-direction:reverse]" />
            <div className="w-18 h-18 bg-neutral-950 border border-[#06b6d4]/30 rounded-full flex flex-col items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.15)] relative">
              <div className="w-13 h-13 rounded-full bg-black flex flex-col items-center justify-center">
                <span className="font-mono text-[8px] text-[#06b6d4] font-bold leading-none tracking-widest">CORE</span>
                <span className="font-mono text-[7px] text-zinc-500 font-bold tracking-widest mt-0.5">SYSTEMS</span>
              </div>
            </div>
          </div>

          {/* Planet 1: .NET */}
          <div
            planet-id="dotnet"
            ref={planet1Ref}
            className="absolute w-16 h-16 flex items-center justify-center border border-[#06b6d4]/40 bg-[radial-gradient(circle_at_30%_30%,#ffffff_20%,#a1a1aa_60%,#18181b_100%)] rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.65),_0_0_15px_rgba(6,182,212,0.2)] pointer-events-auto select-none"
          >
            <span className="font-mono text-[10px] text-zinc-950 font-extrabold">.NET</span>
          </div>

          {/* Planet 2: Node.js */}
          <div
            planet-id="nodejs"
            ref={planet2Ref}
            className="absolute w-16 h-16 flex items-center justify-center border border-[#06b6d4]/40 bg-[radial-gradient(circle_at_30%_30%,#a7f3d0_20%,#059669_60%,#022c22_100%)] rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.65),_0_0_15px_rgba(52,211,153,0.2)] pointer-events-auto select-none"
          >
            <span className="font-mono text-[9px] text-emerald-950 font-extrabold">NODE.JS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
