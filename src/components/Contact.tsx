import { useState } from "react";
import { motion } from "motion/react";
import { IconMail, IconPhone, IconBrandGithub, IconMapPin } from "@tabler/icons-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column: Direct Signal Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-between"
        >
          <div>
            <h2 className="font-display text-4xl font-bold text-amber-100 mb-6 uppercase">
              ESTABLISH CONNECTION
            </h2>
            <p className="font-mono text-sm md:text-base text-zinc-300 mb-10 max-w-md leading-relaxed">
              Currently seeking Backend Developer Intern positions to contribute to
              real-world systems. Send your encrypted signal using the terminal stream.
            </p>

            {/* Direct Information */}
            <div className="space-y-4 font-mono text-sm text-zinc-300 mb-8">
              <div className="flex items-center gap-3">
                <IconMail size={16} className="text-teal-400 shrink-0" />
                <a
                  href="mailto:duc19092005d@gmail.com"
                  className="hover:text-amber-200 transition-colors"
                >
                  duc19092005d@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <IconPhone size={16} className="text-teal-400 shrink-0" />
                <a
                  href="tel:+84914370300"
                  className="hover:text-amber-200 transition-colors"
                >
                  +84 914 370 300
                </a>
              </div>
              <div className="flex items-start gap-3">
                <IconMapPin size={16} className="text-teal-400 shrink-0 pt-0.5" />
                <span>685/52/18 Xo Viet Nghe Tinh, Binh Thanh District</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <a
              href="mailto:duc19092005d@gmail.com"
              className="w-12 h-12 flex items-center justify-center border border-zinc-700 rounded-sm hover:border-amber-300 hover:text-amber-300 text-zinc-300 transition-colors bg-neutral-950/20"
              aria-label="Email"
            >
              <IconMail size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-zinc-700 rounded-sm hover:border-amber-300 hover:text-amber-300 text-zinc-300 transition-colors bg-neutral-950/20"
              aria-label="GitHub"
            >
              <IconBrandGithub size={20} />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Encrypted Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="bg-neutral-950/40 p-6 border border-zinc-800 rounded-sm relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sender Name */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-zinc-400 tracking-widest font-bold">
                SENDER_ID
              </label>
              <div className="flex items-center border-b border-zinc-700/60 focus-within:border-amber-300 py-1.5 transition-colors">
                <span className="text-amber-300 font-mono text-xs mr-3 select-none">&gt;</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-none text-zinc-300 focus:outline-none font-mono text-sm placeholder-zinc-500"
                  placeholder="Your Name"
                  required
                />
              </div>
            </div>

            {/* Sender Email */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-zinc-400 tracking-widest font-bold">
                FREQUENCY_MAIL
              </label>
              <div className="flex items-center border-b border-zinc-700/60 focus-within:border-amber-300 py-1.5 transition-colors">
                <span className="text-amber-300 font-mono text-xs mr-3 select-none">&gt;</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-zinc-300 focus:outline-none font-mono text-sm placeholder-zinc-500"
                  placeholder="email@nexus.com"
                  required
                />
              </div>
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-zinc-400 tracking-widest font-bold">
                ENCRYPTED_MESSAGE
              </label>
              <div className="flex items-start border-b border-zinc-700/60 focus-within:border-amber-300 py-1.5 transition-colors">
                <span className="text-amber-300 font-mono text-xs mr-3 mt-1 select-none">&gt;</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border-none text-zinc-300 focus:outline-none font-mono text-sm placeholder-zinc-500 resize-none"
                  placeholder="Initialize data stream..."
                  required
                />
              </div>
            </div>

            {/* Action Submit */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-transparent border border-teal-400 text-teal-400 py-3 font-mono text-sm tracking-widest hover:bg-teal-400 hover:text-neutral-950 transition-all cursor-pointer rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading"
                ? "TRANSMITTING..."
                : status === "success"
                ? "SIGNAL_TRANSMITTED.sh"
                : "TRANSMIT_SIGNAL.sh"}
            </motion.button>

            {/* Inline notifications */}
            {status === "success" && (
              <div className="font-mono text-[10px] text-teal-400 text-center animate-pulse mt-2">
                &gt; Handshake completed. Communication line open.
              </div>
            )}
            {status === "error" && (
              <div className="font-mono text-[10px] text-rose-400 text-center animate-pulse mt-2">
                &gt; Error: Empty buffer packets detected. Fill all ports.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
