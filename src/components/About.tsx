import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation and interaction state stored in refs to prevent React re-renders on every frame
  const rotationRef = useRef({
    azimuth: 0.45,       // rotation around Z axis (in radians)
    elevation: 0.52,     // camera tilt elevation (in radians, ~30 degrees)
    targetAzimuth: 0.45,
    targetElevation: 0.52,
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
      // Handle drag rotation
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      // Sensitivity factors
      const sensitivityX = 0.007;
      const sensitivityY = 0.005;
      
      // Dragging right (dx > 0) -> rotates camera left (clockwise object rotation, azimuth decreases)
      rotationRef.current.targetAzimuth = dragStartRef.current.azimuth - dx * sensitivityX;
      // Dragging down (dy > 0) -> tilts camera up (flatter look, elevation decreases)
      rotationRef.current.targetElevation = Math.max(0.12, Math.min(1.40, dragStartRef.current.elevation - dy * sensitivityY));
    } else {
      // Handle hover parallax (subtle responsive tilt)
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      hoverRef.current.targetX = mx * 0.0003;
      hoverRef.current.targetY = my * 0.0003;
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;

    // Define planets properties
    const planetDotNet = {
      name: ".NET",
      r: 95,
      angle: 0,
      speed: 0.012, // Radian speed per frame (closer orbits spin faster)
      baseRadius: 15,
    };
    
    const planetNode = {
      name: "NODE.JS",
      r: 155,
      angle: Math.PI,
      speed: -0.007, // Opposite direction, slower
      baseRadius: 15,
    };

    // Particles flowing into the black hole
    const particles = Array.from({ length: 24 }, (_, idx) => {
      return {
        radialIndex: idx % 12,
        r: 30 + Math.random() * 150,
        speed: 0.3 + Math.random() * 0.4,
      };
    });

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    // Initial resize
    handleResize();
    window.addEventListener("resize", handleResize);

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          handleResize();
        })
      : null;

    if (resizeObserver && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const animate = () => {
      time += 1;
      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);
      
      // Clear canvas
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, W, H);
      
      const cx = W / 2;
      const cy = H / 2;
      const scaleBase = Math.min(W, H) * 0.44;
      
      const R_max = scaleBase;
      const R_horizon = scaleBase * 0.18;
      
      // Update camera angles with interpolation (lerp) for smooth movements
      if (!rotationRef.current.dragging) {
        rotationRef.current.targetAzimuth += 0.0012; // slow continuous auto-rotation
      }
      
      rotationRef.current.azimuth += (rotationRef.current.targetAzimuth - rotationRef.current.azimuth) * 0.1;
      rotationRef.current.elevation += (rotationRef.current.targetElevation - rotationRef.current.elevation) * 0.1;
      
      // Update hover parallax offsets
      hoverRef.current.x += (hoverRef.current.targetX - hoverRef.current.x) * 0.05;
      hoverRef.current.y += (hoverRef.current.targetY - hoverRef.current.y) * 0.05;

      // Final camera angles combining base + drag + hover
      const azimuth = rotationRef.current.azimuth + hoverRef.current.x;
      const elevation = rotationRef.current.elevation + hoverRef.current.y;
      
      const cosAz = Math.cos(azimuth);
      const sinAz = Math.sin(azimuth);
      const cosEl = Math.cos(elevation);
      const sinEl = Math.sin(elevation);
      
      // Camera distance for perspective
      const camD = R_max * 3.0;

      // Update Planet Angles
      planetDotNet.angle += planetDotNet.speed;
      planetNode.angle += planetNode.speed;

      // Positions of planets in polar coordinates (unwarped space)
      const p1X = planetDotNet.r * Math.cos(planetDotNet.angle);
      const p1Y = planetDotNet.r * Math.sin(planetDotNet.angle);
      const p2X = planetNode.r * Math.cos(planetNode.angle);
      const p2Y = planetNode.r * Math.sin(planetNode.angle);

      // Relativity equations for spacetime warping
      // Lorentzian/power funnel depth z(r)
      const getWarpDepth = (x: number, y: number) => {
        const r = Math.sqrt(x*x + y*y);
        
        // 1. Black hole massive gravity well
        const rawWell = - (scaleBase * 1.5) / (1 + (r / (scaleBase * 0.22)) * (r / (scaleBase * 0.22)));
        const maxWellOffset = - (scaleBase * 1.5) / (1 + (R_max / (scaleBase * 0.22)) * (R_max / (scaleBase * 0.22)));
        let z = rawWell - maxWellOffset;
        
        // 2. Add planetary perturbations (mass warping space locally)
        // Planet 1 (.NET)
        const d1Sq = (x - p1X)*(x - p1X) + (y - p1Y)*(y - p1Y);
        const p1Warp = - (scaleBase * 0.2) / Math.sqrt(d1Sq + 20*20);
        z += p1Warp;
        
        // Planet 2 (Node)
        const d2Sq = (x - p2X)*(x - p2X) + (y - p2Y)*(y - p2Y);
        const p2Warp = - (scaleBase * 0.18) / Math.sqrt(d2Sq + 25*25);
        z += p2Warp;
        
        return z;
      };

      // Frame dragging spiral angle offset (Kerr black hole metric)
      const getFrameDragAngle = (r: number) => {
        if (r <= R_horizon) return 1.8;
        // Drag angle increases quadratically near the horizon
        const ratio = (R_max - r) / (R_max - R_horizon);
        return 1.8 * ratio * ratio;
      };

      // Helper to project 3D point (x,y,z) to screen (X,Y) and return depth
      const project = (x: number, y: number, z: number) => {
        // Rotate around Z axis (azimuth)
        const rx = x * cosAz - y * sinAz;
        const ry = x * sinAz + y * cosAz;
        const rz = z;
        
        // Rotate around X axis (elevation / tilt)
        const cx3d = rx;
        // CORRECTED GENERAL RELATIVITY PROJECTION:
        // A negative rz (warping downwards) must shift the screen position DOWN (smaller cy3d),
        // and increase depth (further away, smaller cz3d/persp).
        const cy3d = - ry * sinEl + rz * cosEl;
        const cz3d = ry * cosEl + rz * sinEl; 
        
        // Perspective divide
        const persp = camD / (camD - cz3d);
        
        return {
          x: cx + cx3d * persp,
          y: cy - cy3d * persp,
          zDepth: cz3d,
          persp: persp,
        };
      };

      // Rendering queue for Painter's Algorithm
      interface RenderTask {
        depth: number;
        draw: () => void;
      }
      const renderQueue: RenderTask[] = [];

      // 1. GRID RINGS
      const ringRadii = [
        R_horizon,
        R_horizon + (R_max - R_horizon) * 0.08,
        R_horizon + (R_max - R_horizon) * 0.18,
        R_horizon + (R_max - R_horizon) * 0.32,
        R_horizon + (R_max - R_horizon) * 0.48,
        R_horizon + (R_max - R_horizon) * 0.66,
        R_horizon + (R_max - R_horizon) * 0.83,
        R_max
      ];
      
      ringRadii.forEach((r, ringIdx) => {
        const segments = 64;
        const isCoreRing = r <= R_horizon * 1.3;
        
        for (let i = 0; i < segments; i++) {
          const thetaA = (i / segments) * Math.PI * 2;
          const thetaB = ((i + 1) / segments) * Math.PI * 2;
          
          const dragA = getFrameDragAngle(r);
          const dragB = getFrameDragAngle(r);
          
          const xA_raw = r * Math.cos(thetaA + dragA);
          const yA_raw = r * Math.sin(thetaA + dragA);
          const zA = getWarpDepth(xA_raw, yA_raw);
          
          const xB_raw = r * Math.cos(thetaB + dragB);
          const yB_raw = r * Math.sin(thetaB + dragB);
          const zB = getWarpDepth(xB_raw, yB_raw);
          
          const pA = project(xA_raw, yA_raw, zA);
          const pB = project(xB_raw, yB_raw, zB);
          
          const avgDepth = (pA.zDepth + pB.zDepth) / 2;
          
          // Color scheme matching professional branding
          let strokeColor = "rgba(113, 113, 122, 0.12)"; // default zinc grey grid
          if (isCoreRing) {
            strokeColor = `rgba(6, 182, 212, ${0.12 + (1 - ringIdx/ringRadii.length) * 0.3})`; // cyan warp glow
          } else if (ringIdx < 5) {
            strokeColor = `rgba(6, 182, 212, ${0.05 + (1 - ringIdx/ringRadii.length) * 0.15})`;
          }
          
          renderQueue.push({
            depth: avgDepth,
            draw: () => {
              ctx.beginPath();
              ctx.moveTo(pA.x, pA.y);
              ctx.lineTo(pB.x, pB.y);
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 0.85 * ((pA.persp + pB.persp) / 2);
              ctx.stroke();
            }
          });
        }
      });

      // 2. GRID RADIAL LINES
      const numRadials = 12;
      for (let j = 0; j < numRadials; j++) {
        const thetaBase = (j / numRadials) * Math.PI * 2;
        const radialSteps = 24;
        
        for (let m = 0; m < radialSteps; m++) {
          const rA = R_horizon + (R_max - R_horizon) * (m / radialSteps);
          const rB = R_horizon + (R_max - R_horizon) * ((m + 1) / radialSteps);
          
          const dragA = getFrameDragAngle(rA);
          const dragB = getFrameDragAngle(rB);
          
          const xA_raw = rA * Math.cos(thetaBase + dragA);
          const yA_raw = rA * Math.sin(thetaBase + dragA);
          const zA = getWarpDepth(xA_raw, yA_raw);
          
          const xB_raw = rB * Math.cos(thetaBase + dragB);
          const yB_raw = rB * Math.sin(thetaBase + dragB);
          const zB = getWarpDepth(xB_raw, yB_raw);
          
          const pA = project(xA_raw, yA_raw, zA);
          const pB = project(xB_raw, yB_raw, zB);
          
          const avgDepth = (pA.zDepth + pB.zDepth) / 2;
          const uAvg = m / radialSteps;
          
          let strokeColor = `rgba(113, 113, 122, ${0.08 * (uAvg)})`;
          if (uAvg < 0.6) {
            strokeColor = `rgba(6, 182, 212, ${0.12 * (1 - uAvg) + 0.04})`; // Glowing cyan on inward curve
          }
          
          renderQueue.push({
            depth: avgDepth,
            draw: () => {
              ctx.beginPath();
              ctx.moveTo(pA.x, pA.y);
              ctx.lineTo(pB.x, pB.y);
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 0.85 * ((pA.persp + pB.persp) / 2);
              ctx.stroke();
            }
          });
        }
      }

      // 3. SPACETIME FLOW PARTICLES
      particles.forEach((part) => {
        // Move particle inwards (gravitational flow)
        const fallSpeed = part.speed * (120 / (part.r + 15));
        part.r -= fallSpeed;
        
        // Loop back to outer edge once falling past horizon
        if (part.r <= R_horizon) {
          part.r = R_max - Math.random() * 20;
        }
        
        const thetaBase = (part.radialIndex / 12) * Math.PI * 2;
        const drag = getFrameDragAngle(part.r);
        const x_raw = part.r * Math.cos(thetaBase + drag);
        const y_raw = part.r * Math.sin(thetaBase + drag);
        const z = getWarpDepth(x_raw, y_raw);
        
        const p = project(x_raw, y_raw, z);
        
        // Fade particle near event horizon and boundary
        let opacity = 0.7;
        if (part.r < R_horizon + 20) {
          opacity = 0.7 * ((part.r - R_horizon) / 20); // Fade out as it crosses horizon
        } else if (part.r > R_max - 20) {
          opacity = 0.7 * ((R_max - part.r) / 20); // Fade in at outer boundary
        }
        
        renderQueue.push({
          depth: p.zDepth,
          draw: () => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.8 * p.persp, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${opacity})`; // Cyan flow sparks
            ctx.fill();
          }
        });
      });

      // 4. ACCRETION DISK (Physical horizontal rings)
      const diskRings = 3;
      for (let d = 0; d < diskRings; d++) {
        const diskR = R_horizon * (1.15 + d * 0.15);
        const segments = 48;
        
        for (let i = 0; i < segments; i++) {
          const thetaA = (i / segments) * Math.PI * 2;
          const thetaB = ((i + 1) / segments) * Math.PI * 2;
          
          const dragA = getFrameDragAngle(diskR);
          const dragB = getFrameDragAngle(diskR);
          
          const xA_raw = diskR * Math.cos(thetaA + dragA);
          const yA_raw = diskR * Math.sin(thetaA + dragA);
          const zA = getWarpDepth(xA_raw, yA_raw);
          
          const xB_raw = diskR * Math.cos(thetaB + dragB);
          const yB_raw = diskR * Math.sin(thetaB + dragB);
          const zB = getWarpDepth(xB_raw, yB_raw);
          
          const pA = project(xA_raw, yA_raw, zA);
          const pB = project(xB_raw, yB_raw, zB);
          
          const avgDepth = (pA.zDepth + pB.zDepth) / 2;
          
          // Color: glowing orange/gold dust particles mixing with cyan background
          const colMix = d % 2 === 0 
            ? "rgba(6, 182, 212, 0.45)" // Cyan
            : "rgba(245, 158, 11, 0.35)"; // Amber

          renderQueue.push({
            depth: avgDepth,
            draw: () => {
              ctx.beginPath();
              ctx.moveTo(pA.x, pA.y);
              ctx.lineTo(pB.x, pB.y);
              ctx.strokeStyle = colMix;
              ctx.lineWidth = (2.5 - d * 0.5) * ((pA.persp + pB.persp) / 2);
              ctx.stroke();
            }
          });
        }
      }

      // 5. BLACK HOLE SINGULARITY & GRAVITATIONAL LENSING HALO
      const pCenter = project(0, 0, getWarpDepth(0, 0));
      
      // Black Hole Event Horizon Shadow
      renderQueue.push({
        depth: pCenter.zDepth, 
        draw: () => {
          // Inner core boundary (absolute shadow)
          ctx.beginPath();
          ctx.arc(pCenter.x, pCenter.y, R_horizon * pCenter.persp, 0, Math.PI * 2);
          ctx.fillStyle = "#020204";
          ctx.fill();

          // Subtle shadow border
          ctx.strokeStyle = "rgba(6, 182, 212, 0.45)";
          ctx.lineWidth = 1 * pCenter.persp;
          ctx.stroke();

          // Core systems text label (scaled & centered)
          ctx.shadowBlur = 0;
          ctx.fillStyle = "rgba(6, 182, 212, 0.95)";
          ctx.font = `bold ${Math.max(6, Math.floor(10 * pCenter.persp))}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("CORE", pCenter.x, pCenter.y - 4.5 * pCenter.persp);
          
          ctx.fillStyle = "rgba(113, 113, 122, 0.95)";
          ctx.font = `bold ${Math.max(5, Math.floor(7 * pCenter.persp))}px monospace`;
          ctx.fillText("SYSTEMS", pCenter.x, pCenter.y + 4.5 * pCenter.persp);
        }
      });

      // Lensed Einstein Ring / Light Halo (Warped image of accretion disk behind core)
      renderQueue.push({
        depth: pCenter.zDepth + 0.05,
        draw: () => {
          // Create radial gradient for lensed light ring
          const innerRad = R_horizon * pCenter.persp * 1.05;
          const outerRad = R_horizon * pCenter.persp * 1.48;
          
          const grad = ctx.createRadialGradient(pCenter.x, pCenter.y, innerRad, pCenter.x, pCenter.y, outerRad);
          grad.addColorStop(0, "rgba(6, 182, 212, 0.9)");    // bright cyan
          grad.addColorStop(0.3, "rgba(6, 182, 212, 0.35)");
          grad.addColorStop(0.75, "rgba(245, 158, 11, 0.15)"); // amber outer ring
          grad.addColorStop(1, "rgba(245, 158, 11, 0)");
          
          ctx.beginPath();
          ctx.arc(pCenter.x, pCenter.y, outerRad, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      // 6. PLANET 1 (.NET)
      const p1Drag = getFrameDragAngle(planetDotNet.r);
      const p1X_raw = planetDotNet.r * Math.cos(planetDotNet.angle + p1Drag);
      const p1Y_raw = planetDotNet.r * Math.sin(planetDotNet.angle + p1Drag);
      const p1Z = getWarpDepth(p1X_raw, p1Y_raw);
      const p1Proj = project(p1X_raw, p1Y_raw, p1Z);
      const p1Rad = planetDotNet.baseRadius * p1Proj.persp;

      // Draw Orbit Trail (Geodesic path) for Planet 1
      const p1TrailSegs = 48;
      for (let i = 0; i < p1TrailSegs; i++) {
        const thetaA = (i / p1TrailSegs) * Math.PI * 2;
        const thetaB = ((i + 1) / p1TrailSegs) * Math.PI * 2;
        const dragA = getFrameDragAngle(planetDotNet.r);
        const dragB = getFrameDragAngle(planetDotNet.r);
        
        const xA = planetDotNet.r * Math.cos(thetaA + dragA);
        const yA = planetDotNet.r * Math.sin(thetaA + dragA);
        const zA = getWarpDepth(xA, yA);
        
        const xB = planetDotNet.r * Math.cos(thetaB + dragB);
        const yB = planetDotNet.r * Math.sin(thetaB + dragB);
        const zB = getWarpDepth(xB, yB);
        
        const projA = project(xA, yA, zA);
        const projB = project(xB, yB, zB);
        const avgDepth = (projA.zDepth + projB.zDepth) / 2;
        
        renderQueue.push({
          depth: avgDepth - 0.2, // slightly offset behind planet
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(projA.x, projA.y);
            ctx.lineTo(projB.x, projB.y);
            ctx.strokeStyle = "rgba(168, 85, 247, 0.18)"; // Purple faded orbit trail
            ctx.lineWidth = 1 * ((projA.persp + projB.persp) / 2);
            ctx.stroke();
          }
        });
      }

      // Add .NET planet sphere to queue
      renderQueue.push({
        depth: p1Proj.zDepth,
        draw: () => {
          ctx.save();
          // Glow effect
          ctx.shadowColor = "rgba(168, 85, 247, 0.55)";
          ctx.shadowBlur = 12 * p1Proj.persp;
          
          // Light vector from center (black hole is the light source)
          const dx = pCenter.x - p1Proj.x;
          const dy = pCenter.y - p1Proj.y;
          const dist = Math.sqrt(dx*dx + dy*dy) || 1;
          const ux = dx / dist;
          const uy = dy / dist;
          
          // Gradient highlight offset towards center
          const gx = p1Proj.x + ux * p1Rad * 0.4;
          const gy = p1Proj.y + uy * p1Rad * 0.4;
          
          const grad = ctx.createRadialGradient(gx, gy, 0, p1Proj.x, p1Proj.y, p1Rad);
          grad.addColorStop(0, "#ffffff");            // bright highlight
          grad.addColorStop(0.22, "#c084fc");         // light purple
          grad.addColorStop(0.65, "#7c3aed");         // violet
          grad.addColorStop(1, "#2e1065");            // shadow depth purple
          
          ctx.beginPath();
          ctx.arc(p1Proj.x, p1Proj.y, p1Rad, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          
          ctx.strokeStyle = "rgba(168, 85, 247, 0.45)";
          ctx.lineWidth = 0.5 * p1Proj.persp;
          ctx.stroke();
          ctx.restore();

          // Planet Text Label
          ctx.save();
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "black";
          ctx.shadowBlur = 4;
          ctx.font = `bold ${Math.max(6, Math.floor(9 * p1Proj.persp))}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(".NET", p1Proj.x, p1Proj.y);
          ctx.restore();
        }
      });

      // 7. PLANET 2 (NODE.JS)
      const p2Drag = getFrameDragAngle(planetNode.r);
      const p2X_raw = planetNode.r * Math.cos(planetNode.angle + p2Drag);
      const p2Y_raw = planetNode.r * Math.sin(planetNode.angle + p2Drag);
      const p2Z = getWarpDepth(p2X_raw, p2Y_raw);
      const p2Proj = project(p2X_raw, p2Y_raw, p2Z);
      const p2Rad = planetNode.baseRadius * p2Proj.persp;

      // Draw Orbit Trail (Geodesic path) for Planet 2
      const p2TrailSegs = 64;
      for (let i = 0; i < p2TrailSegs; i++) {
        const thetaA = (i / p2TrailSegs) * Math.PI * 2;
        const thetaB = ((i + 1) / p2TrailSegs) * Math.PI * 2;
        const dragA = getFrameDragAngle(planetNode.r);
        const dragB = getFrameDragAngle(planetNode.r);
        
        const xA = planetNode.r * Math.cos(thetaA + dragA);
        const yA = planetNode.r * Math.sin(thetaA + dragA);
        const zA = getWarpDepth(xA, yA);
        
        const xB = planetNode.r * Math.cos(thetaB + dragB);
        const yB = planetNode.r * Math.sin(thetaB + dragB);
        const zB = getWarpDepth(xB, yB);
        
        const projA = project(xA, yA, zA);
        const projB = project(xB, yB, zB);
        const avgDepth = (projA.zDepth + projB.zDepth) / 2;
        
        renderQueue.push({
          depth: avgDepth - 0.2,
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(projA.x, projA.y);
            ctx.lineTo(projB.x, projB.y);
            ctx.strokeStyle = "rgba(16, 185, 129, 0.15)"; // Emerald faded orbit trail
            ctx.lineWidth = 1 * ((projA.persp + projB.persp) / 2);
            ctx.stroke();
          }
        });
      }

      // Add NODE.JS planet sphere to queue
      renderQueue.push({
        depth: p2Proj.zDepth,
        draw: () => {
          ctx.save();
          // Glow effect
          ctx.shadowColor = "rgba(16, 185, 129, 0.55)";
          ctx.shadowBlur = 12 * p2Proj.persp;
          
          // Light vector from center (black hole core is light source)
          const dx = pCenter.x - p2Proj.x;
          const dy = pCenter.y - p2Proj.y;
          const dist = Math.sqrt(dx*dx + dy*dy) || 1;
          const ux = dx / dist;
          const uy = dy / dist;
          
          // Gradient highlight offset towards center
          const gx = p2Proj.x + ux * p2Rad * 0.4;
          const gy = p2Proj.y + uy * p2Rad * 0.4;
          
          const grad = ctx.createRadialGradient(gx, gy, 0, p2Proj.x, p2Proj.y, p2Rad);
          grad.addColorStop(0, "#ffffff");            // highlight
          grad.addColorStop(0.22, "#a7f3d0");         // light emerald green
          grad.addColorStop(0.65, "#059669");         // emerald green
          grad.addColorStop(1, "#022c22");            // dark green shadow
          
          ctx.beginPath();
          ctx.arc(p2Proj.x, p2Proj.y, p2Rad, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          
          ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
          ctx.lineWidth = 0.5 * p2Proj.persp;
          ctx.stroke();
          ctx.restore();

          // Planet Text Label
          ctx.save();
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "black";
          ctx.shadowBlur = 4;
          ctx.font = `bold ${Math.max(5, Math.floor(7.5 * p2Proj.persp))}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("NODE.JS", p2Proj.x, p2Proj.y);
          ctx.restore();
        }
      });

      // 8. PAINTER'S ALGORITHM: Sort queue by zDepth ascending (most negative drawn first)
      renderQueue.sort((a, b) => a.depth - b.depth);
      
      // Execute draw tasks
      renderQueue.forEach((item) => item.draw());
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 snap-start scroll-mt-[72px] bg-[#050507]"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Bio & Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <span className="font-mono text-xs text-[#06b6d4] tracking-widest block mb-2 uppercase font-bold">
            {t.about.eyebrow}
          </span>
          <h2 className="font-sans text-4xl font-extrabold text-[#f4f4f5] mb-8 uppercase tracking-wide">
            {t.about.title}
          </h2>

          <div className="space-y-6 font-sans text-[#a1a1aa] leading-relaxed mb-10 text-base">
            {t.about.bioParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Interests & Inspirations (Astrophysics hobby) */}
          <div className="border border-[#18181b] bg-[#0c0c0e]/50 backdrop-blur-sm p-6 rounded-sm shadow-md mt-6">
            <h3 className="font-mono text-xs text-[#06b6d4] font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
              {t.about.interestsTitle}
            </h3>
            <p className="font-sans text-sm text-[#a1a1aa] leading-relaxed">
              {t.about.interestsDesc}
            </p>
          </div>

          {/* Chronology Timeline */}
          <div className="border border-[#18181b] bg-[#0c0c0e]/50 backdrop-blur-sm p-6 md:p-8 rounded-sm shadow-md mt-6">
            <h3 className="font-mono text-sm text-[#06b6d4] font-bold tracking-widest uppercase mb-6 border-b border-[#18181b] pb-3">
              {t.about.timelineTitle}
            </h3>
            
            <div className="relative pl-6 border-l border-[#18181b] space-y-8">
              {t.about.timelineItems.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Bullet */}
                  <div className={`absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border ${idx === 0 ? "border-[#06b6d4]" : "border-zinc-700"} bg-[#0c0c0e] flex items-center justify-center`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-[#06b6d4]" : "bg-zinc-600"}`} />
                  </div>
                  <span className="font-mono text-xs text-zinc-500 block mb-1">
                    {item.date}
                  </span>
                  <h4 className="text-base font-bold text-[#f4f4f5] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#a1a1aa] leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Relativistic 3D Orbital visualization */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[480px] md:h-[620px] flex items-center justify-center overflow-hidden border border-[#18181b] bg-[#0c0c0e]/30 backdrop-blur-sm rounded-sm shadow-md"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing animate-fade-in"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
        </motion.div>
      </div>
    </section>
  );
}
