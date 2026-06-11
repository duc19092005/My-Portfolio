import { useState } from "react";
import { motion } from "motion/react";
import { IconMail, IconPhone, IconMapPin, IconBrandGithub, IconSend } from "@tabler/icons-react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    // Simulate submission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <section 
      id="contact" 
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 snap-start scroll-mt-[88px] bg-[#050507]"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column: Direct Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-between"
        >
          <div>
            <span className="font-mono text-xs text-[#06b6d4] tracking-widest block mb-2 uppercase font-bold">
              {t.contact.eyebrow}
            </span>
            <h2 className="font-sans text-4xl font-extrabold text-[#f4f4f5] mb-6 uppercase tracking-wide">
              {t.contact.title}
            </h2>
            <p className="font-sans text-base text-[#a1a1aa] mb-10 max-w-md leading-relaxed">
              {t.contact.subtext}
            </p>

            {/* Direct Information */}
            <div className="space-y-4 font-sans text-sm text-[#a1a1aa] mb-8">
              <div className="flex items-center gap-3">
                <IconMail size={16} className="text-[#06b6d4] shrink-0" />
                <a
                  href="mailto:duc19092005d@gmail.com"
                  className="hover:text-[#f4f4f5] transition-colors"
                >
                  duc19092005d@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <IconPhone size={16} className="text-[#06b6d4] shrink-0" />
                {showPhone ? (
                  <a
                    href="tel:+84914370300"
                    className="hover:text-[#f4f4f5] transition-colors"
                  >
                    +84 914 370 300
                  </a>
                ) : (
                  <button
                    onClick={() => setShowPhone(true)}
                    className="text-[#06b6d4] hover:text-[#f4f4f5] transition-colors cursor-pointer text-left font-sans text-sm focus:outline-none flex items-center gap-1.5"
                  >
                    <span>+84 914 ••• •••</span>
                    <span className="text-[10px] bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/20 px-1 rounded-sm tracking-wider uppercase font-semibold">Show</span>
                  </button>
                )}
              </div>
              <div className="flex items-start gap-3">
                <IconMapPin size={16} className="text-[#06b6d4] shrink-0 pt-0.5" />
                <span>{t.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <a
              href="mailto:duc19092005d@gmail.com"
              className="w-10 h-10 flex items-center justify-center border border-[#18181b] rounded-sm hover:border-[#06b6d4] hover:text-[#06b6d4] text-[#a1a1aa] transition-colors bg-[#0c0c0e]"
              aria-label="Email"
            >
              <IconMail size={18} />
            </a>
            <a
              href="https://github.com/duc19092005/My-Portfolio"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[#18181b] rounded-sm hover:border-[#06b6d4] hover:text-[#06b6d4] text-[#a1a1aa] transition-colors bg-[#0c0c0e]"
              aria-label="GitHub"
            >
              <IconBrandGithub size={18} />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Sleek Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="bg-[#0c0c0e] p-8 border border-[#18181b] rounded-sm shadow-md relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sender Name */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[#a1a1aa] tracking-widest font-bold uppercase">
                {t.contact.labelName}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#050507] border border-[#18181b] focus:border-[#06b6d4] py-2.5 px-4 text-[#f4f4f5] focus:outline-none font-sans text-sm rounded-sm placeholder-zinc-600 transition-colors"
                placeholder={t.contact.placeholderName}
                required
              />
            </div>

            {/* Sender Email */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[#a1a1aa] tracking-widest font-bold uppercase">
                {t.contact.labelEmail}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050507] border border-[#18181b] focus:border-[#06b6d4] py-2.5 px-4 text-[#f4f4f5] focus:outline-none font-sans text-sm rounded-sm placeholder-zinc-600 transition-colors"
                placeholder={t.contact.placeholderEmail}
                required
              />
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[#a1a1aa] tracking-widest font-bold uppercase">
                {t.contact.labelMessage}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-[#050507] border border-[#18181b] focus:border-[#06b6d4] py-2.5 px-4 text-[#f4f4f5] focus:outline-none font-sans text-sm rounded-sm placeholder-zinc-600 resize-none transition-colors"
                placeholder={t.contact.placeholderMessage}
                required
              />
            </div>

            {/* Action Submit */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#f4f4f5] text-[#050507] py-3 font-sans text-sm font-semibold tracking-wide hover:bg-[#e4e4e7] transition-all cursor-pointer rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconSend size={14} />
              <span>
                {status === "loading"
                  ? t.contact.btnSending
                  : status === "success"
                  ? t.contact.btnSuccess
                  : t.contact.btnSend}
              </span>
            </motion.button>

            {/* Status alerts */}
            {status === "success" && (
              <div className="font-sans text-xs text-emerald-400 text-center mt-2">
                {t.contact.msgSuccess}
              </div>
            )}
            {status === "error" && (
              <div className="font-sans text-xs text-rose-400 text-center mt-2">
                {t.contact.msgError}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
