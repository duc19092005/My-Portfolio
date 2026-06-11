export default function Footer() {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-neutral-950 border-t border-zinc-800 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 gap-6 max-w-7xl mx-auto font-mono text-[10px] text-zinc-500">
        {/* Left: Copyright */}
        <a
          href="#hero"
          onClick={handleScrollTop}
          className="hover:text-amber-200 transition-colors uppercase tracking-widest"
        >
          © 2026 TRAN ANH DUC
        </a>

        {/* Center: Astronomy Coordinates */}
        <div className="flex gap-4 opacity-65 text-zinc-600 select-none">
          <span>RA 12h 45m 0s</span>
          <span>Dec -28° 22' 54"</span>
        </div>

        {/* Right: Technical Links */}
        <div className="flex gap-6">
          <a
            href="#"
            className="hover:text-teal-400 transition-colors tracking-widest uppercase"
          >
            TELEMETRY
          </a>
          <a
            href="#"
            className="hover:text-teal-400 transition-colors tracking-widest uppercase"
          >
            ENCRYPTION
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-teal-400 transition-colors tracking-widest uppercase"
          >
            SOURCE_CODE
          </a>
        </div>
      </div>
    </footer>
  );
}
