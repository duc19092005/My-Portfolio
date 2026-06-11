import { motion } from "motion/react";
import { IconAward } from "@tabler/icons-react";
import { useLanguage } from "../context/LanguageContext";

export default function Achievements() {
  const { t } = useLanguage();

  return (
    <section 
      id="achievements" 
      className="py-20 bg-[#0c0c0e] border-y border-[#18181b] relative overflow-hidden snap-start scroll-mt-[88px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative p-8 text-center border border-[#18181b] bg-[#050507] max-w-xl rounded-sm shadow-md group hover:border-zinc-700 transition-all duration-300"
        >
          {/* Glowing Award Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-[#06b6d4] bg-[#050507] flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <IconAward size={20} className="text-[#06b6d4]" />
          </div>

          <div className="mt-4 font-mono text-[10px] text-[#06b6d4] tracking-[0.25em] block mb-2 uppercase font-bold">
            {t.achievements.eyebrow}
          </div>
          
          <h3 className="font-sans text-xl font-extrabold text-[#f4f4f5] mb-3 uppercase tracking-wider">
            {t.achievements.title}
          </h3>
          
          <h4 className="font-mono text-sm text-[#06b6d4] font-bold mb-4 uppercase">
            {t.achievements.subtitle}
          </h4>
          
          <p className="font-sans text-sm text-[#a1a1aa] leading-relaxed max-w-md mx-auto">
            {t.achievements.desc}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
