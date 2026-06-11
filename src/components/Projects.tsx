import { useState } from "react";
import { IconBrandGithub, IconExternalLink, IconVideo, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface Project {
  id: string;
  code: string;
  title: string;
  role: string;
  timeline: string;
  technologies: string[];
  description: string[];
  links: {
    githubBackend?: string;
    githubFrontend?: string;
    githubContract?: string;
    liveDemo?: string;
    demoVideo?: string;
  };
  imageUrl: string;
  badge?: string;
}

const projects: Project[] = [
  {
    id: "cinema",
    code: "OBJ-2026-CMS",
    title: "CINEMA MANAGEMENT SYSTEM",
    role: "Backend Developer (Solo Project)",
    timeline: "01/2026 - 04/2026",
    technologies: ["C#", "ASP.NET Core Web API", "MS SQL Server", "EF Core", "Docker", "JWT", "OAuth2"],
    description: [
      "Architected a highly decoupled and maintainable backend system from scratch applying Dependency Injection and Factory Pattern.",
      "Developed 30+ RESTful APIs with optimized EF Core queries and complex business logic.",
      "Implemented OAuth2/JWT with Role-Based Access Control (RBAC) to secure endpoints for multi-tenant roles. Stored tokens in HttpOnly cookies to prevent token theft.",
      "Containerized the backend application using Docker, standardizing local development and utilizing a proxy redirect mechanism to route API calls directly from Vercel.",
    ],
    links: {
      githubBackend: "https://github.com",
      githubFrontend: "https://github.com",
      liveDemo: "https://demo.com",
    },
    imageUrl: "https://picsum.photos/seed/cinema-management-dashboard/600/400",
    badge: "SOLO DEV",
  },
  {
    id: "traceability",
    code: "OBJ-2025-DAPP",
    title: "DRUG TRACEABILITY DAPP",
    role: "Backend & Blockchain Developer (Team Size: 5)",
    timeline: "10/2025 - 12/2025",
    technologies: ["TypeScript", "ExpressJS", "MongoDB", "Mongoose", "Hardhat", "Solidity", "JWT"],
    description: [
      "Collaborated with the team to integrate backend services with blockchain smart contracts, ensuring core feature stability and timely milestone delivery.",
      "Developed core business logic following Domain-Driven Design (DDD) architecture to encapsulate complex business rules and optimize execution time.",
      "Developed robust RESTful APIs to handle secure user authentication (JWT) and manage product traceability data persistence via MongoDB and Mongoose.",
      "Partnered closely with frontend developers to align API contracts and guarantee seamless, end-to-end data flow.",
    ],
    links: {
      githubBackend: "https://github.com",
      githubContract: "https://github.com",
      demoVideo: "https://youtube.com",
    },
    imageUrl: "https://picsum.photos/seed/blockchain-drug-traceability/600/400",
    badge: "3RD PLACE HACKATHON",
  },
];

export default function Projects() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handlePrev = () => {
    if (activeCardIndex > 0) {
      setActiveCardIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeCardIndex < projects.length - 1) {
      setActiveCardIndex((prev) => prev + 1);
    }
  };

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center snap-start scroll-mt-[72px]">
      {/* Section Header */}
      <div className="mb-12 flex justify-between items-end">
        <h2 className="font-display text-4xl font-bold text-amber-100 uppercase">
          DEPLOYED ARTIFACTS
        </h2>
        {/* Quick counter */}
        <span className="font-mono text-xs text-zinc-400 select-none">
          LOGS [{activeCardIndex + 1}/{projects.length}]
        </span>
      </div>

      {/* Horizontal Slider Viewport */}
      <div className="relative w-full overflow-hidden">
        {/* Sliding Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeCardIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <div key={project.id} className="w-full shrink-0 px-2">
              <div className="border border-zinc-700/60 bg-neutral-950/50 backdrop-blur-md hover:border-amber-300/40 transition-colors duration-300 relative p-6 md:p-8 overflow-hidden rounded-sm">
                
                {/* Telemetry Tag */}
                <div className="absolute top-0 right-0 bg-amber-400/5 border-l border-b border-zinc-700/60 px-4 py-1.5 font-mono text-[10px] text-amber-300 tracking-wider">
                  {project.code}
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center mt-4 md:mt-0">
                  {/* Content Column */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="font-display text-2xl font-bold text-amber-100 tracking-wide uppercase">
                        {project.title}
                      </h3>
                      {project.badge && (
                        <span className="px-2 py-0.5 bg-teal-400/10 text-teal-400 font-mono text-[9px] rounded-sm border border-teal-400/20 uppercase tracking-widest">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    <span className="font-mono text-xs text-zinc-400 block mb-2">
                      {project.role} · {project.timeline}
                    </span>

                    <ul className="space-y-2 font-mono text-xs md:text-sm text-zinc-300 leading-relaxed mb-6 list-none">
                      {project.description.map((desc, i) => (
                        <li key={i} className="relative pl-4">
                          <span className="absolute left-0 text-amber-300">&gt;</span>
                          {desc}
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] text-zinc-300 bg-zinc-900/60 px-2 py-0.5 border border-zinc-700/40 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-wrap gap-3">
                      {project.links.githubBackend && (
                        <a
                          href={project.links.githubBackend}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-amber-300 transition-colors border border-zinc-800 hover:border-amber-300/30 px-3 py-1.5 rounded-sm bg-neutral-900"
                        >
                          <IconBrandGithub size={12} />
                          <span>Backend Repo</span>
                        </a>
                      )}
                      {project.links.githubContract && (
                        <a
                          href={project.links.githubContract}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-amber-300 transition-colors border border-zinc-800 hover:border-amber-300/30 px-3 py-1.5 rounded-sm bg-neutral-900"
                        >
                          <IconBrandGithub size={12} />
                          <span>Contract Repo</span>
                        </a>
                      )}
                      {project.links.githubFrontend && (
                        <a
                          href={project.links.githubFrontend}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-amber-300 transition-colors border border-zinc-800 hover:border-amber-300/30 px-3 py-1.5 rounded-sm bg-neutral-900"
                        >
                          <IconBrandGithub size={12} />
                          <span>Frontend Repo</span>
                        </a>
                      )}
                      {project.links.liveDemo && (
                        <a
                          href={project.links.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-mono text-xs text-neutral-950 bg-amber-300 hover:bg-amber-200 transition-all px-3 py-1.5 rounded-sm font-bold"
                        >
                          <IconExternalLink size={12} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.links.demoVideo && (
                        <a
                          href={project.links.demoVideo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-mono text-xs text-neutral-950 bg-teal-400 hover:bg-teal-300 transition-all px-3 py-1.5 rounded-sm font-bold"
                        >
                          <IconVideo size={12} />
                          <span>Demo Video</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Visual / Image Column */}
                  <div className="relative aspect-video w-full overflow-hidden border border-zinc-800 bg-neutral-950/60 rounded-sm">
                    <img
                      className="w-full h-full object-cover opacity-40 grayscale hover:opacity-85 hover:grayscale-0 transition-all duration-700"
                      src={project.imageUrl}
                      alt={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/65 to-transparent pointer-events-none" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls at Bottom */}
      <div className="flex justify-between items-center mt-8 font-mono text-xs">
        {/* Prev Log Button */}
        <button
          onClick={handlePrev}
          disabled={activeCardIndex === 0}
          className={`flex items-center gap-1.5 border border-zinc-700/60 px-4 py-2 bg-neutral-950/50 rounded-sm hover:border-amber-300/40 hover:text-amber-200 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <IconChevronLeft size={14} />
          <span>[ PREV_LOG ]</span>
        </button>

        {/* Indicator dots */}
        <div className="flex gap-3">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCardIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === idx
                  ? "w-6 bg-amber-300 shadow-[0_0_8px_#ffcf91]"
                  : "w-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Log Button */}
        <button
          onClick={handleNext}
          disabled={activeCardIndex === projects.length - 1}
          className={`flex items-center gap-1.5 border border-zinc-700/60 px-4 py-2 bg-neutral-950/50 rounded-sm hover:border-amber-300/40 hover:text-amber-200 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <span>[ NEXT_LOG ]</span>
          <IconChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}
