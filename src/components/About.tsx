import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

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
        </motion.div>
      </div>
    </section>
  );
}
