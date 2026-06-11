import { motion } from "motion/react";

export default function About() {
  return (
    <section 
      id="about" 
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 snap-start scroll-mt-[72px] bg-[#050507]"
    >
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <span className="font-mono text-xs text-[#06b6d4] tracking-widest block mb-2 uppercase font-bold">
            01 // ARCHITECTURE
          </span>
          <h2 className="font-sans text-4xl font-extrabold text-[#f4f4f5] mb-8 uppercase tracking-wide">
            BEHIND THE SYSTEMS
          </h2>

          <div className="space-y-6 font-sans text-[#a1a1aa] leading-relaxed mb-10 text-base">
            <p>
              I am a Software Engineering student at HUFLIT University specializing in backend systems and database engineering. I design and build resilient, distributed backend architectures that optimize performance and scale under pressure.
            </p>
            <p>
              Leveraging technologies like <span className="text-[#f4f4f5] font-semibold">.NET/ASP.NET Core</span> and <span className="text-[#06b6d4] font-semibold">Node.js (ExpressJS)</span>, I focus on clean code design patterns, modular services, and secure API integrations to build reliable real-world systems.
            </p>
            <p>
              My analytical approach and hackathon experience have trained me to solve complex infrastructural problems under strict deadlines, working to construct backend architectures that prioritize uptime, thread safety, and decoupled dependencies.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Clean Chronology Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border border-[#18181b] bg-[#0c0c0e] p-8 rounded-sm shadow-md"
        >
          <h3 className="font-mono text-sm text-[#06b6d4] font-bold tracking-widest uppercase mb-6 border-b border-[#18181b] pb-3">
            SYSTEM CHRONOLOGY
          </h3>
          
          <div className="relative pl-6 border-l border-[#18181b] space-y-8">
            {/* Timeline Item 1 */}
            <div className="relative">
              {/* Timeline Bullet */}
              <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border border-[#06b6d4] bg-[#0c0c0e] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
              </div>
              <span className="font-mono text-xs text-zinc-500 block mb-1">
                2026.Q1 — 2026.Q2
              </span>
              <h4 className="text-base font-bold text-[#f4f4f5] mb-1">
                Cinema Management System
              </h4>
              <p className="text-sm text-[#a1a1aa] leading-normal">
                Solo Project: Architected decoupled backend with 30+ RESTful APIs using ASP.NET Core & MS SQL.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              {/* Timeline Bullet */}
              <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border border-zinc-700 bg-[#0c0c0e] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              </div>
              <span className="font-mono text-xs text-zinc-500 block mb-1">
                2025.Q4
              </span>
              <h4 className="text-base font-bold text-[#f4f4f5] mb-1">
                Drug Traceability dApp
              </h4>
              <p className="text-sm text-[#a1a1aa] leading-normal">
                Pione Hackathon 2025: Co-developed DDD backend and integrated smart contract event listeners via Hardhat.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative">
              {/* Timeline Bullet */}
              <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border border-zinc-700 bg-[#0c0c0e] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              </div>
              <span className="font-mono text-xs text-zinc-500 block mb-1">
                2023 — 2027
              </span>
              <h4 className="text-base font-bold text-[#f4f4f5] mb-1">
                Software Engineering Major
              </h4>
              <p className="text-sm text-[#a1a1aa] leading-normal">
                HUFLIT University: Core focus on Data Structures, OOP, Algorithms, and DBMS.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
