import { useState } from "react";
import { motion } from "motion/react";
import { IconMail, IconPhone, IconMapPin, IconBrandGithub, IconSend } from "@tabler/icons-react";

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
    <section 
      id="contact" 
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 snap-start scroll-mt-[72px] bg-[#050507]"
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
              05 // CONNECTION
            </span>
            <h2 className="font-sans text-4xl font-extrabold text-[#f4f4f5] mb-6 uppercase tracking-wide">
              GET IN TOUCH
            </h2>
            <p className="font-sans text-base text-[#a1a1aa] mb-10 max-w-md leading-relaxed">
              I am currently seeking Backend Developer Intern & Junior positions to collaborate on real-world systems. Drop me a line, and let's build something secure and scalable together.
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
                <a
                  href="tel:+84914370300"
                  className="hover:text-[#f4f4f5] transition-colors"
                >
                  +84 914 370 300
                </a>
              </div>
              <div className="flex items-start gap-3">
                <IconMapPin size={16} className="text-[#06b6d4] shrink-0 pt-0.5" />
                <span>Binh Thanh District, Ho Chi Minh City, Vietnam</span>
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
                SENDER NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#050507] border border-[#18181b] focus:border-[#06b6d4] py-2.5 px-4 text-[#f4f4f5] focus:outline-none font-sans text-sm rounded-sm placeholder-zinc-600 transition-colors"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Sender Email */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[#a1a1aa] tracking-widest font-bold uppercase">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050507] border border-[#18181b] focus:border-[#06b6d4] py-2.5 px-4 text-[#f4f4f5] focus:outline-none font-sans text-sm rounded-sm placeholder-zinc-600 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[#a1a1aa] tracking-widest font-bold uppercase">
                MESSAGE
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-[#050507] border border-[#18181b] focus:border-[#06b6d4] py-2.5 px-4 text-[#f4f4f5] focus:outline-none font-sans text-sm rounded-sm placeholder-zinc-600 resize-none transition-colors"
                placeholder="Write your message here..."
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
                  ? "SENDING..."
                  : status === "success"
                  ? "MESSAGE SENT"
                  : "SEND MESSAGE"}
              </span>
            </motion.button>

            {/* Status alerts */}
            {status === "success" && (
              <div className="font-sans text-xs text-emerald-400 text-center mt-2">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            {status === "error" && (
              <div className="font-sans text-xs text-rose-400 text-center mt-2">
                Error: Please fill in all fields correctly.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
