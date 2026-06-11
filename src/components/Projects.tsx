import { motion } from "motion/react";
import { IconBrandGithub, IconExternalLink, IconShieldCheck, IconVideo } from "@tabler/icons-react";
import { useLanguage } from "../context/LanguageContext";

interface ProjectMeta {
  id: "cinema" | "traceability";
  code: string;
  timeline: string;
  technologies: string[];
  links: {
    githubBackend?: string;
    githubFrontend?: string;
    githubContract?: string;
    liveDemo?: string;
    demoVideo?: string;
  };
}

const projectsMeta: ProjectMeta[] = [
  {
    id: "cinema",
    code: "SYS-NET-01",
    timeline: "01/2026 - 04/2026",
    technologies: ["C#", "ASP.NET Core Web API", "MS SQL Server", "EF Core", "Docker", "JWT", "OAuth2"],
    links: {
      githubBackend: "https://github.com/duc19092005/My-Portfolio",
      liveDemo: "https://my-portfolio-psi-gold-30.vercel.app/",
    },
  },
  {
    id: "traceability",
    code: "SYS-DAPP-02",
    timeline: "10/2025 - 12/2025",
    technologies: ["TypeScript", "ExpressJS", "MongoDB", "Mongoose", "Hardhat", "Solidity", "JWT"],
    links: {
      githubBackend: "https://github.com/duc19092005/My-Portfolio",
      demoVideo: "https://youtube.com",
    },
  },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section 
      id="projects" 
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 snap-start scroll-mt-[88px] bg-[#050507]"
    >
      {/* Header */}
      <div className="mb-12 text-left">
        <span className="font-mono text-xs text-[#06b6d4] tracking-widest block mb-2 uppercase font-bold">
          {t.projects.eyebrow}
        </span>
        <h2 className="font-sans text-4xl font-extrabold text-[#f4f4f5] uppercase tracking-wide">
          {t.projects.title}
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {projectsMeta.map((project, idx) => {
          const trans = t.projects.items[project.id];
          const badgeText = project.id === "cinema" ? t.projects.badgeSolo : t.projects.badgeHackathon;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="border border-[#18181b] bg-[#0c0c0e] hover:border-zinc-700 transition-all duration-300 rounded-sm p-6 md:p-8 flex flex-col justify-between shadow-md relative group"
            >
              {/* Header Telemetry */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[10px] text-[#06b6d4] tracking-widest font-bold">
                  [{project.code}]
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  {project.timeline}
                </span>
              </div>

              <div>
                {/* Badge & Title */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-[#f4f4f5] tracking-wide uppercase group-hover:text-[#06b6d4] transition-colors leading-tight">
                    {trans.title}
                  </h3>
                  {badgeText && (
                    <span className="px-2 py-0.5 bg-[#06b6d4]/10 text-[#06b6d4] font-mono text-[8px] rounded-sm border border-[#06b6d4]/20 uppercase tracking-widest shrink-0 mt-1">
                      {badgeText}
                    </span>
                  )}
                </div>

                <span className="font-mono text-xs text-zinc-400 block mb-4 italic">
                  {trans.role}
                </span>

                {/* Description Bullet Items */}
                <ul className="space-y-3 mb-6 text-sm text-[#a1a1aa] leading-relaxed">
                  {trans.desc.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconShieldCheck size={14} className="text-[#06b6d4] mt-1 shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6 border-t border-[#18181b] pt-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] text-[#f4f4f5] bg-[#18181b] px-2 py-0.5 border border-[#18181b] rounded-sm uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {project.links.githubBackend && (
                    <a
                      href={project.links.githubBackend}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-mono text-xs text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors border border-[#18181b] hover:border-zinc-700 px-3 py-2 rounded-sm bg-[#050507]"
                    >
                      <IconBrandGithub size={12} />
                      <span>{t.projects.repoLink}</span>
                    </a>
                  )}
                  {project.links.liveDemo && (
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-mono text-xs text-[#050507] bg-[#f4f4f5] hover:bg-[#e4e4e7] transition-all px-3 py-2 rounded-sm font-semibold"
                    >
                      <IconExternalLink size={12} />
                      <span>{t.projects.liveLink}</span>
                    </a>
                  )}
                  {project.links.demoVideo && (
                    <a
                      href={project.links.demoVideo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-mono text-xs text-[#050507] bg-[#06b6d4] hover:bg-[#22d3ee] transition-all px-3 py-2 rounded-sm font-semibold"
                    >
                      <IconVideo size={12} />
                      <span>{t.projects.videoLink}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
