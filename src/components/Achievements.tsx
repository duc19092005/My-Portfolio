import { motion } from "motion/react";
import { IconAward } from "@tabler/icons-react";

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-amber-400/5 border-y border-zinc-700/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative p-8 text-center border border-amber-300/20 bg-neutral-950 max-w-xl rounded-sm shadow-[0_0_25px_rgba(255,207,145,0.02)] group hover:border-amber-300/30 transition-all duration-300"
        >
          {/* Glowing Award Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-amber-300 bg-neutral-950 flex items-center justify-center shadow-[0_0_15px_rgba(255,207,145,0.2)]">
            <IconAward size={20} className="text-amber-300 animate-pulse" />
          </div>

          <div className="mt-4 font-mono text-[10px] text-amber-300 tracking-[0.25em] block mb-2 uppercase">
            SIGNAL_RECEIVED.log
          </div>
          
          <h3 className="font-display text-xl font-bold text-amber-100 mb-3 uppercase tracking-wider">
            Pione Hackathon 2025
          </h3>
          
          <h4 className="font-mono text-sm text-teal-400 font-bold mb-4 uppercase">
            3rd Place · Team: Dev Chicken HUFLIT
          </h4>
          
          <p className="font-mono text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
            Awarded for the "Drug Traceability" project, successfully integrating blockchain smart contracts and API logistics tracing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
