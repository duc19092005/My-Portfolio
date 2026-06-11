import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#050507] border-t border-[#18181b] py-12">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 gap-6 max-w-7xl mx-auto font-mono text-[10px] text-zinc-500">
        {/* Left: Copyright */}
        <a
          href="#hero"
          onClick={handleScrollTop}
          className="hover:text-[#06b6d4] transition-colors uppercase tracking-widest font-semibold"
        >
          © 2026 TRAN ANH DUC
        </a>

        {/* Right: Technical Links */}
        <div className="flex gap-6">
          <a
            href="#about"
            className="hover:text-[#06b6d4] transition-colors tracking-widest uppercase"
          >
            {t.footer.about}
          </a>
          <a
            href="#projects"
            className="hover:text-[#06b6d4] transition-colors tracking-widest uppercase"
          >
            {t.footer.projects}
          </a>
          <a
            href="https://github.com/duc19092005/My-Portfolio"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#06b6d4] transition-colors tracking-widest uppercase"
          >
            {t.footer.github}
          </a>
        </div>
      </div>
    </footer>
  );
}
