import { useState } from "react";
import { IconTerminal, IconDatabase, IconCode, IconCpu } from "@tabler/icons-react";

interface SkillItem {
  name: string;
  detail: string;
}

interface SkillGroup {
  id: string;
  constellation: string;
  title: string;
  icon: React.ReactNode;
  items: SkillItem[];
  x: string; // Left % in constellation map
  y: string; // Top % in constellation map
}

export default function Skills() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const skillGroups: SkillGroup[] = [
    {
      id: "languages",
      constellation: "ANDROMEDA",
      title: "LANGUAGES",
      icon: <IconCode size={16} className="text-amber-300" />,
      items: [
        { name: "C#", detail: "Architected Cinema CMS backend using DI and Factory pattern" },
        { name: "TypeScript", detail: "Used for Domain-Driven dApp and Hardhat smart contracts" },
        { name: "JavaScript", detail: "Applied for logistical data flow routes in Node.js" },
      ],
      x: "25%",
      y: "25%",
    },
    {
      id: "frameworks",
      constellation: "ORION",
      title: "FRAMEWORKS & ORMS",
      icon: <IconCpu size={16} className="text-teal-400" />,
      items: [
        { name: "ASP.NET Core", detail: "Developed 30+ RESTful APIs with RBAC security access" },
        { name: "Node.js (ExpressJS)", detail: "Built DDD backend routes for product traceability" },
        { name: "EF Core", detail: "Optimized complex MS SQL queries and database logic" },
        { name: "Mongoose", detail: "Handled document mapping for MongoDB blockchain logs" },
      ],
      x: "55%",
      y: "40%",
    },
    {
      id: "databases",
      constellation: "VEGA",
      title: "DATABASES",
      icon: <IconDatabase size={16} className="text-teal-400" />,
      items: [
        { name: "MS SQL Server", detail: "Managed multi-tenant schemas and multi-role RBAC data" },
        { name: "MongoDB", detail: "Utilized for high-speed drug traceability record persistence" },
      ],
      x: "75%",
      y: "30%",
    },
    {
      id: "tools",
      constellation: "PULSAR",
      title: "TOOLS & ARCHITECTURE",
      icon: <IconTerminal size={16} className="text-amber-300" />,
      items: [
        { name: "Docker", detail: "Containerized environments standardizing deployment pipelines" },
        { name: "JWT / OAuth2", detail: "Secured endpoints, storing tokens in HttpOnly cookies" },
        { name: "Architecture Patterns", detail: "Applied Dependency Injection, Factory, and Singleton" },
      ],
      x: "40%",
      y: "75%",
    },
  ];

  return (
    <section id="skills" className="py-24 bg-neutral-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs text-teal-400 tracking-[0.25em] block mb-2">
            CONSTELLATION_MAP.exe
          </span>
          <h2 className="font-display text-4xl font-bold text-amber-100 uppercase">
            SKILL ARCHIPELAGO
          </h2>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive 3D Constellation Map (Visible on Desktop) */}
          <div className="lg:col-span-5 hidden lg:block relative h-[450px] border border-zinc-800/20 bg-neutral-950/20 rounded-sm">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Constellation Connecting Lines */}
              <line x1="25%" y1="25%" x2="55%" y2="40%" className="stroke-amber-300/10 stroke-[1.2]" />
              <line x1="55%" y1="40%" x2="75%" y2="30%" className="stroke-teal-400/10 stroke-[1.2]" />
              <line x1="55%" y1="40%" x2="40%" y2="75%" className="stroke-amber-300/10 stroke-[1.2]" />
              <line x1="25%" y1="25%" x2="40%" y2="75%" className="stroke-amber-300/10 stroke-[1.2]" />
            </svg>

            {skillGroups.map((group) => {
              const isHovered = hoveredNode === group.id;
              const isAmber = group.id === "languages" || group.id === "tools";

              return (
                <div
                  key={group.id}
                  style={{ left: group.x, top: group.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  onMouseEnter={() => setHoveredNode(group.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="relative flex items-center justify-center w-16 h-16">
                    {/* Atmospheric outer orbit */}
                    <div
                      className={`absolute inset-0 border border-dashed rounded-full animate-spin [animation-duration:20s] ${
                        isAmber
                          ? "border-amber-300/10 group-hover:border-amber-300/25"
                          : "border-teal-400/10 group-hover:border-teal-400/25"
                      }`}
                    />
                    
                    {/* Planet Body */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isAmber
                          ? "bg-[radial-gradient(circle_at_30%_30%,#ffcf91_10%,#ffaa00_50%,#291800_100%)] border border-amber-200/40 shadow-[0_5px_15px_rgba(0,0,0,0.6),_0_0_12px_rgba(255,207,145,0.25)]"
                          : "bg-[radial-gradient(circle_at_30%_30%,#7cf6ec_10%,#5dd9d0_50%,#00201e_100%)] border border-teal-300/40 shadow-[0_5px_15px_rgba(0,0,0,0.6),_0_0_12px_rgba(93,217,208,0.25)]"
                      } ${
                        isHovered
                          ? isAmber
                            ? "scale-125 border-amber-200 shadow-[0_8px_20px_rgba(0,0,0,0.8),_0_0_20px_rgba(255,207,145,0.5)]"
                            : "scale-125 border-teal-300 shadow-[0_8px_20px_rgba(0,0,0,0.8),_0_0_20px_rgba(93,217,208,0.5)]"
                          : "group-hover:scale-110"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isAmber ? "bg-amber-100" : "bg-teal-100"}`} />
                    </div>
                  </div>

                  {/* Planet Label */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="font-mono text-[9px] text-zinc-500 font-bold group-hover:text-amber-200 transition-colors">
                      {group.title.split(" ")[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Static Detailed Cards (Visible without Hover) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {skillGroups.map((group) => {
              const isHighlighted = hoveredNode === group.id;
              const isAmber = group.id === "languages" || group.id === "tools";

              return (
                <div
                  key={group.id}
                  onMouseEnter={() => setHoveredNode(group.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`border p-5 rounded-sm transition-all duration-300 bg-neutral-950/40 ${
                    isHighlighted
                      ? isAmber
                        ? "border-amber-300 shadow-[0_0_15px_rgba(255,207,145,0.15)] scale-[1.01]"
                        : "border-teal-400 shadow-[0_0_15px_rgba(93,217,208,0.15)] scale-[1.01]"
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-2 mb-4">
                    {group.icon}
                    <h3 className="font-mono text-sm text-amber-200 font-bold tracking-wider">
                      {group.title}
                    </h3>
                  </div>

                  {/* Detailed Items List */}
                  <div className="space-y-3 font-mono text-xs text-zinc-400">
                    {group.items.map((item) => (
                      <div key={item.name} className="relative pl-3 border-l border-zinc-800">
                        <span className="font-bold text-sm text-zinc-300 block mb-0.5">{item.name}</span>
                        <span className="text-xs text-zinc-500 block leading-normal">{item.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
