import { IconCode, IconCpu, IconDatabase, IconTerminal } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface Skill {
  name: string;
  level: number;
}

interface SkillGroup {
  titleKey: "languages" | "frameworks" | "databases" | "tools";
  icon: React.ReactNode;
  items: Skill[];
}

export default function Skills() {
  const { t } = useLanguage();

  const skillGroups: SkillGroup[] = [
    {
      titleKey: "languages",
      icon: <IconCode size={16} className="text-[#06b6d4]" />,
      items: [
        { name: "C# (.NET)", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "JavaScript", level: 85 },
      ]
    },
    {
      titleKey: "frameworks",
      icon: <IconCpu size={16} className="text-[#06b6d4]" />,
      items: [
        { name: "ASP.NET Core API", level: 85 },
        { name: "ExpressJS (Node)", level: 80 },
        { name: "EF Core", level: 80 },
        { name: "Mongoose", level: 75 },
      ]
    },
    {
      titleKey: "databases",
      icon: <IconDatabase size={16} className="text-[#06b6d4]" />,
      items: [
        { name: "MS SQL Server", level: 80 },
        { name: "MongoDB", level: 75 },
      ]
    },
    {
      titleKey: "tools",
      icon: <IconTerminal size={16} className="text-[#06b6d4]" />,
      items: [
        { name: "Docker Containers", level: 75 },
        { name: "JWT / RBAC Security", level: 80 },
        { name: "OOP / SOLID / DDD", level: 75 },
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-24 bg-[#0c0c0e] border-y border-[#18181b] snap-start scroll-mt-[72px]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 text-left">
          <span className="font-mono text-xs text-[#06b6d4] tracking-widest block mb-2 uppercase font-bold">
            {t.skills.eyebrow}
          </span>
          <h2 className="font-sans text-4xl font-extrabold text-[#f4f4f5] uppercase tracking-wide">
            {t.skills.title}
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, groupIdx) => {
            const title = t.skills.groups[group.titleKey];
            return (
              <motion.div 
                key={group.titleKey} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1, ease: "easeOut" }}
                className="border border-[#18181b] bg-[#050507] p-6 rounded-sm shadow-md"
              >
                <div className="flex items-center gap-2 mb-6 border-b border-[#18181b] pb-3">
                  {group.icon}
                  <h3 className="font-mono text-sm text-[#f4f4f5] font-bold uppercase tracking-wider">
                    {title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {group.items.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#a1a1aa]">{skill.name}</span>
                        <span className="text-[#06b6d4] font-bold">{skill.level}%</span>
                      </div>
                      {/* Minimalist progress bar */}
                      <div className="w-full h-[2px] bg-[#18181b] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                          className="h-full bg-[#06b6d4] rounded-full" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
