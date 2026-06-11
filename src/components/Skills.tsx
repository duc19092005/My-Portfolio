import { useRef, useEffect } from "react";
import { IconCode, IconCpu, IconDatabase, IconTerminal, IconLanguage } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface Skill {
  name: string;
  level: number;
}

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  items: Skill[];
}

export default function Skills() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D rotation and drag interaction states
  const rotationRef = useRef({
    azimuth: -0.6,       // Z-rotation (radians)
    elevation: 0.65,     // X-tilt (radians)
    targetAzimuth: -0.6,
    targetElevation: 0.65,
    dragging: false,
  });

  const dragStartRef = useRef({
    x: 0,
    y: 0,
    azimuth: 0,
    elevation: 0,
  });

  const hoverRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    rotationRef.current.dragging = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      azimuth: rotationRef.current.targetAzimuth,
      elevation: rotationRef.current.targetElevation,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    if (rotationRef.current.dragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      const sensitivityX = 0.007;
      const sensitivityY = 0.005;
      
      rotationRef.current.targetAzimuth = dragStartRef.current.azimuth - dx * sensitivityX;
      rotationRef.current.targetElevation = Math.max(0.1, Math.min(1.45, dragStartRef.current.elevation - dy * sensitivityY));
    } else {
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      hoverRef.current.targetX = mx * 0.0002;
      hoverRef.current.targetY = my * 0.0002;
    }
  };

  const handleMouseUp = () => {
    rotationRef.current.dragging = false;
  };

  const handleMouseLeave = () => {
    rotationRef.current.dragging = false;
    hoverRef.current.targetX = 0;
    hoverRef.current.targetY = 0;
  };

  // 3D spiral galaxy animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Generate 3D spiral galaxy particles (stars) - reduced to 500 for a cleaner look
    const numParticles = 500;
    const particles = Array.from({ length: numParticles }, () => {
      const arm = Math.floor(Math.random() * 2); // 2 spiral arms
      const r = 20 + Math.pow(Math.random(), 1.6) * 140; // concentrated near core
      
      // Logarithmic spiral angle + scattering noise
      const angle = arm * Math.PI + (r * 0.016) + (Math.random() - 0.5) * 0.3;
      
      // Bulging center thickness
      const z = (Math.random() - 0.5) * 14 * Math.exp(-r * 0.014);
      
      // Reduced rotation speed for a calmer, more mature feel
      const speed = 0.0018 + 0.035 / (r + 15);
      
      // Colors based on regions (subtle opacity)
      let color = "rgba(113, 113, 122, 0.15)"; // zinc gray dust
      const rand = Math.random();
      if (r < 30) {
        color = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.3})`; // soft core
      } else if (arm === 0) {
        if (rand < 0.65) color = `rgba(168, 85, 247, ${0.15 + Math.random() * 0.25})`; // faded purple arm (.NET)
      } else {
        if (rand < 0.65) color = `rgba(52, 211, 153, ${0.15 + Math.random() * 0.25})`; // faded emerald arm (Node)
      }
      
      return { r, angle, z, speed, color };
    });

    // Skills represented as holographic floating text nodes
    const skillsList = [
      { name: "C# (.NET)", r: 45, arm: 0, color: "#c084fc", glow: "rgba(168, 85, 247, 0.3)" },
      { name: "ASP.NET Core", r: 75, arm: 0, color: "#a855f7", glow: "rgba(168, 85, 247, 0.3)" },
      { name: "EF Core", r: 110, arm: 0, color: "#8b5cf6", glow: "rgba(139, 92, 246, 0.2)" },
      { name: "TypeScript", r: 60, arm: 1, color: "#34d399", glow: "rgba(52, 211, 153, 0.3)" },
      { name: "JavaScript", r: 85, arm: 1, color: "#10b981", glow: "rgba(16, 185, 129, 0.3)" },
      { name: "Node.js", r: 115, arm: 1, color: "#059669", glow: "rgba(5, 150, 105, 0.2)" },
      { name: "SQL Server", r: 135, arm: 0, color: "#6366f1", glow: "rgba(99, 102, 241, 0.2)" },
      { name: "MongoDB", r: 145, arm: 1, color: "#047857", glow: "rgba(4, 120, 87, 0.2)" },
      { name: "Docker", r: 165, arm: 0, color: "#7c3aed", glow: "rgba(124, 58, 237, 0.2)" },
    ];

    const skillNodes = skillsList.map((s) => {
      const angle = s.arm * Math.PI + (s.r * 0.016);
      const speed = 0.0018 + 0.035 / (s.r + 15);
      const z = (Math.random() - 0.5) * 4;
      return { ...s, angle, speed, z };
    });

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => handleResize())
      : null;
    if (resizeObserver && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const animate = () => {
      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);

      // Deep space black clearing
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const R_max = Math.min(W, H) * 0.44;

      // Update angles
      if (!rotationRef.current.dragging) {
        rotationRef.current.targetAzimuth += 0.0005; // extremely slow rotation for maturity
      }

      rotationRef.current.azimuth += (rotationRef.current.targetAzimuth - rotationRef.current.azimuth) * 0.1;
      rotationRef.current.elevation += (rotationRef.current.targetElevation - rotationRef.current.elevation) * 0.1;
      hoverRef.current.x += (hoverRef.current.targetX - hoverRef.current.x) * 0.05;
      hoverRef.current.y += (hoverRef.current.targetY - hoverRef.current.y) * 0.05;

      const az = rotationRef.current.azimuth + hoverRef.current.x;
      const el = rotationRef.current.elevation + hoverRef.current.y;

      const cosAz = Math.cos(az);
      const sinAz = Math.sin(az);
      const cosEl = Math.cos(el);
      const sinEl = Math.sin(el);

      const camD = R_max * 3.2;

      // Helper to project 3D point
      const project = (x: number, y: number, z: number) => {
        const rx = x * cosAz - y * sinAz;
        const ry = x * sinAz + y * cosAz;
        const rz = z;

        const cx3d = rx;
        const cy3d = -ry * sinEl + rz * cosEl;
        const cz3d = ry * cosEl + rz * sinEl;

        const persp = camD / (camD - cz3d);

        return {
          x: cx + cx3d * persp,
          y: cy - cy3d * persp,
          zDepth: cz3d,
          persp: persp
        };
      };

      interface RenderTask {
        depth: number;
        draw: () => void;
      }
      const renderQueue: RenderTask[] = [];

      // 1. Swirl and Project Stars
      particles.forEach((part) => {
        part.angle += part.speed;

        const x = part.r * Math.cos(part.angle);
        const y = part.r * Math.sin(part.angle);
        
        const p = project(x, y, part.z);

        renderQueue.push({
          depth: p.zDepth,
          draw: () => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 0.75 * p.persp, 0, Math.PI * 2); // smaller stars (0.75) for finer dust look
            ctx.fillStyle = part.color;
            ctx.fill();
          }
        });
      });

      // 2. Swirl and Project Skills
      skillNodes.forEach((node) => {
        node.angle += node.speed;

        const x = node.r * Math.cos(node.angle);
        const y = node.r * Math.sin(node.angle);

        const p = project(x, y, node.z);
        const dotSize = 2.2 * p.persp; // smaller nodes (2.2)

        renderQueue.push({
          depth: p.zDepth + 0.1,
          draw: () => {
            // Draw glowing core node
            ctx.save();
            ctx.shadowColor = node.glow;
            ctx.shadowBlur = 6 * p.persp;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            ctx.restore();

            // Draw a thin connection line to the HUD tag
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            const lineOffset = 14 * p.persp;
            ctx.lineTo(p.x + lineOffset, p.y - lineOffset);
            ctx.strokeStyle = "rgba(6, 182, 212, 0.12)"; // more faint connection line
            ctx.lineWidth = 0.5 * p.persp;
            ctx.stroke();

            // Holographic tag text box
            const textX = p.x + lineOffset + 2;
            const textY = p.y - lineOffset;
            
            ctx.save();
            ctx.font = `bold ${Math.max(5.5, Math.floor(7.5 * p.persp))}px monospace`; // smaller font (7.5)
            ctx.textBaseline = "middle";
            ctx.textAlign = "left";
            const labelWidth = ctx.measureText(node.name).width;

            // Draw HUD border & background fill (compact size)
            ctx.fillStyle = "rgba(12, 12, 14, 0.8)";
            ctx.fillRect(textX, textY - 5.5, labelWidth + 6, 11);
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 0.6 * p.persp;
            ctx.strokeRect(textX, textY - 5.5, labelWidth + 6, 11);

            // Text text
            ctx.fillStyle = "#ffffff";
            ctx.fillText(node.name, textX + 3, textY);
            ctx.restore();
          }
        });
      });

      // 3. Draw Galaxy Core Light
      const pCore = project(0, 0, 0);
      renderQueue.push({
        depth: pCore.zDepth - 0.2,
        draw: () => {
          const coreGlow = R_max * 0.10 * pCore.persp; // softer, smaller core glow (0.10)
          const grad = ctx.createRadialGradient(pCore.x, pCore.y, 0, pCore.x, pCore.y, coreGlow);
          grad.addColorStop(0, "rgba(255, 255, 255, 0.6)");
          grad.addColorStop(0.3, "rgba(165, 243, 252, 0.3)");
          grad.addColorStop(1, "rgba(6, 182, 212, 0)");

          ctx.beginPath();
          ctx.arc(pCore.x, pCore.y, coreGlow, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      // Sort render queue by depth
      renderQueue.sort((a, b) => a.depth - b.depth);
      renderQueue.forEach((item) => item.draw());
    };

    let frameId: number;
    const tick = () => {
      animate();
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const skillGroups: SkillGroup[] = [
    {
      title: t.skills.groups.languages,
      icon: <IconCode size={16} className="text-[#06b6d4]" />,
      items: [
        { name: "C# (.NET)", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "JavaScript", level: 85 },
      ]
    },
    {
      title: t.skills.groups.frameworks,
      icon: <IconCpu size={16} className="text-[#06b6d4]" />,
      items: [
        { name: "ASP.NET Core API", level: 85 },
        { name: "ExpressJS (Node)", level: 80 },
        { name: "EF Core", level: 80 },
        { name: "Mongoose", level: 75 },
      ]
    },
    {
      title: t.skills.groups.databases,
      icon: <IconDatabase size={16} className="text-[#06b6d4]" />,
      items: [
        { name: "MS SQL Server", level: 80 },
        { name: "MongoDB", level: 75 },
      ]
    },
    {
      title: t.skills.groups.tools,
      icon: <IconTerminal size={16} className="text-[#06b6d4]" />,
      items: [
        { name: "Docker Containers", level: 75 },
        { name: "JWT / RBAC Security", level: 80 },
        { name: "OOP / SOLID / DDD", level: 75 },
      ]
    },
    {
      title: t.skills.groups.spoken,
      icon: <IconLanguage size={16} className="text-[#06b6d4]" />,
      items: t.skills.spokenItems
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-24 bg-[#0c0c0e] border-y border-[#18181b] snap-start scroll-mt-[88px]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 text-left">
          <span className="font-mono text-xs text-[#06b6d4] tracking-widest block mb-2 uppercase font-bold">
            {t.skills.eyebrow}
          </span>
          <h2 className="font-sans text-4xl font-extrabold text-[#f4f4f5] uppercase tracking-wide">
            {t.skills.title}
          </h2>
        </div>

        {/* 2-Column Split Layout - Swapped cols: 7 cols for skills, 5 cols for galaxy */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Skill progress cards (now occupying 7 columns for readability) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {skillGroups.map((group, groupIdx) => (
              <motion.div 
                key={group.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1, ease: "easeOut" }}
                className="border border-[#18181b] bg-[#050507] p-5 rounded-sm shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-[#18181b] pb-2">
                    {group.icon}
                    <h3 className="font-mono text-xs text-[#f4f4f5] font-bold uppercase tracking-wider">
                      {group.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {group.items.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
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
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Holographic 3D Galaxy Canvas (now occupying 5 columns for a subtle, compact feel) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 relative h-[380px] lg:h-auto flex items-center justify-center overflow-hidden border border-[#18181b] bg-[#050507]/40 backdrop-blur-sm rounded-sm shadow-md min-h-[400px]"
          >
            {/* Holographic Header Tag Overlay */}
            <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-[#06b6d4]/70 tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-ping" />
              <span>GALAXY_GRAPH // 3D</span>
            </div>

            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
