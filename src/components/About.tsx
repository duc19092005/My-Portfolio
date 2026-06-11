import { motion } from "motion/react";
import { useRef, useEffect } from "react";

export default function About() {
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
        const zIndex = z > 0 ? 20 : 5; // Event Horizon is z-10

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
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-12 snap-start scroll-mt-[72px]">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Bio and Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-display text-4xl font-bold text-amber-100 mb-6">
            BEHIND THE CODE
          </h2>

          <div className="space-y-4 font-mono text-sm md:text-base text-zinc-300 leading-relaxed mb-10">
            <p>
              &gt; I am a third-year Software Engineering student at HUFLIT University,
              specializing in Backend Development and system architecture.
            </p>
            <p>
              &gt; My engineering mindset focuses on building resilient, scalable, and
              decoupled backend infrastructures using <span className="text-amber-300">.NET/ASP.NET Core</span> and{" "}
              <span className="text-teal-400">Node.js (ExpressJS)</span>.
            </p>
            <p>
              &gt; An award-winning hackathon competitor, I enjoy solving complex problems
              by integrating backend systems with modern technologies, aiming to contribute
              to high-traffic, real-world systems.
            </p>
          </div>

          {/* Timeline */}
          <div className="bg-neutral-950/40 backdrop-blur-md border border-zinc-800/60 p-6 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <h3 className="font-mono text-sm text-teal-400 font-bold tracking-widest uppercase mb-4 border-b border-zinc-800/40 pb-2">
              SYSTEM CHRONOLOGY
            </h3>
            <div className="border-l border-zinc-700 pl-4 space-y-6 mt-4">
              <div className="flex gap-4 items-start">
                <span className="font-mono text-xs text-zinc-400 pt-0.5 w-20 shrink-0">
                  2026.Q1
                </span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">
                    Cinema Management System (Solo Project)
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Architected decoupled backend with 30+ RESTful APIs using ASP.NET Core & MS SQL.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="font-mono text-xs text-zinc-400 pt-0.5 w-20 shrink-0">
                  2025.Q4
                </span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">
                    Drug Traceability (dApp) & 3rd Place Hackathon
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Integrated ExpressJS APIs with blockchain smart contracts at Pione Hackathon 2025.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="font-mono text-xs text-zinc-400 pt-0.5 w-20 shrink-0">
                  2023 - 2027
                </span>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">
                    Software Engineering Major
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    HUFLIT University (OOP, Data Structures & Algorithms, DBMS).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Relativistic 3D Orbital visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden border border-zinc-800/20 bg-neutral-950/20 rounded-sm"
        >
          {/* Warped Space-Time Grid (General Relativity Gravity Well) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 400 400" preserveAspectRatio="none">
            {/* Horizontal coordinate lines warped towards the center (200, 200) */}
            <path d="M 0,60 Q 200,120 400,60" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 0,110 Q 200,165 400,110" fill="none" className="stroke-zinc-700/60 stroke-[0.5]" />
            <path d="M 0,160 Q 200,190 400,160" fill="none" className="stroke-zinc-700 stroke-[0.5]" />
            <path d="M 0,200 Q 200,200 400,200" fill="none" className="stroke-zinc-600 stroke-[0.5]" />
            <path d="M 0,240 Q 200,210 400,240" fill="none" className="stroke-zinc-700 stroke-[0.5]" />
            <path d="M 0,290 Q 200,235 400,290" fill="none" className="stroke-zinc-700/60 stroke-[0.5]" />
            <path d="M 0,340 Q 200,280 400,340" fill="none" className="stroke-zinc-800 stroke-[0.5]" />

            {/* Vertical coordinate lines warped towards the center (200, 200) */}
            <path d="M 60,0 Q 120,200 60,400" fill="none" className="stroke-zinc-800 stroke-[0.5]" />
            <path d="M 110,0 Q 165,200 110,400" fill="none" className="stroke-zinc-700/60 stroke-[0.5]" />
            <path d="M 160,0 Q 190,200 160,400" fill="none" className="stroke-zinc-700 stroke-[0.5]" />
            <path d="M 200,0 Q 200,200 200,400" fill="none" className="stroke-zinc-600 stroke-[0.5]" />
            <path d="M 240,0 Q 210,200 240,400" fill="none" className="stroke-zinc-700 stroke-[0.5]" />
            <path d="M 290,0 Q 235,200 290,400" fill="none" className="stroke-zinc-700/60 stroke-[0.5]" />
            <path d="M 340,0 Q 280,200 340,400" fill="none" className="stroke-zinc-800 stroke-[0.5]" />

            {/* Concentric gravitational coordinate orbits */}
            <g transform="rotate(12 200 200)">
              <ellipse cx="200" cy="200" rx="110" ry="48" fill="none" className="stroke-amber-300/10 stroke-[0.75] stroke-dashed" />
            </g>
            <g transform="rotate(-12 200 200)">
              <ellipse cx="200" cy="200" rx="160" ry="72" fill="none" className="stroke-teal-400/10 stroke-[0.75] stroke-dashed" />
            </g>
          </svg>

          {/* Central Core: Black Hole (z-10 Event Horizon & Accretion Disk) */}
          <div className="relative flex items-center justify-center z-10 pointer-events-none">
            {/* Gravitational Lensing Glow */}
            <div className="absolute w-32 h-32 bg-amber-500/15 rounded-full blur-xl animate-pulse [animation-duration:3s]" />
            
            {/* Relativistic Accretion Disk (warped ring) */}
            <div className="absolute w-26 h-26 border-[3.5px] border-amber-400/80 rounded-full blur-[1px] shadow-[0_0_20px_#ffaa00,_inset_0_0_20px_#ffaa00] scale-y-[0.35] rotate-[12deg] animate-spin [animation-duration:25s] [animation-direction:reverse]" />
            
            {/* Event Horizon (Black Void) */}
            <div className="w-18 h-18 bg-neutral-950 border border-amber-300/30 rounded-full flex flex-col items-center justify-center shadow-[0_0_25px_rgba(255,207,145,0.25)] relative">
              <div className="w-13 h-13 rounded-full bg-black flex flex-col items-center justify-center">
                <span className="font-mono text-[8px] text-amber-200 font-bold leading-none tracking-widest">BLACK</span>
                <span className="font-mono text-[7px] text-zinc-500 font-bold tracking-widest mt-0.5">HOLE</span>
              </div>
            </div>
          </div>

          {/* Node 1: .NET (Revolving Planet, absolute positioned relative to container center) */}
          <div
            planet-id="dotnet"
            ref={planet1Ref}
            className="absolute w-16 h-16 flex items-center justify-center border border-amber-200/40 bg-[radial-gradient(circle_at_30%_30%,#ffcf91_10%,#ffaa00_50%,#291800_100%)] rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.65),_0_0_15px_rgba(255,207,145,0.35)] pointer-events-auto select-none"
          >
            <span className="font-mono text-[10px] text-neutral-950 font-bold">.NET</span>
          </div>

          {/* Node 2: Node.js (Revolving Planet, absolute positioned relative to container center) */}
          <div
            planet-id="nodejs"
            ref={planet2Ref}
            className="absolute w-16 h-16 flex items-center justify-center border border-teal-300/40 bg-[radial-gradient(circle_at_30%_30%,#7cf6ec_10%,#5dd9d0_50%,#00201e_100%)] rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.65),_0_0_15px_rgba(93,217,208,0.35)] pointer-events-auto select-none"
          >
            <span className="font-mono text-[9px] text-neutral-950 font-bold">NODE.JS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
