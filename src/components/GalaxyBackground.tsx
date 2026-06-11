import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  angle: number;
  radius: number;
  speed: number;
  branch: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Detect prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = reducedMotionQuery.matches;

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Galaxy settings
    const particlesCount = 2000;
    const particles: Particle[] = [];
    const colorPrimary = { r: 255, g: 207, b: 145 }; // #ffcf91 (Amber)
    const colorSecondary = { r: 93, g: 217, b: 208 }; // #5dd9d0 (Teal)

    for (let i = 0; i < particlesCount; i++) {
      const radius = Math.random() * Math.min(width, height) * 0.45;
      const spinAngle = radius * 0.015;
      const branch = i % 3;
      const branchAngle = (branch * (Math.PI * 2)) / 3;

      // Random dispersion
      const dispersion = 0.12 * radius;
      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)) * dispersion;
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)) * dispersion;
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)) * dispersion;

      const angle = branchAngle + spinAngle;
      const x = Math.cos(angle) * radius + randomX;
      const y = randomY;
      const z = Math.sin(angle) * radius + randomZ;

      // Color interpolation based on radius
      const ratio = radius / (Math.min(width, height) * 0.45);
      const r = Math.round(colorPrimary.r + (colorSecondary.r - colorPrimary.r) * ratio);
      const g = Math.round(colorPrimary.g + (colorSecondary.g - colorPrimary.g) * ratio);
      const b = Math.round(colorPrimary.b + (colorSecondary.b - colorPrimary.b) * ratio);
      const color = `rgba(${r}, ${g}, ${b}, ${0.35 + Math.random() * 0.45})`;

      particles.push({
        x,
        y,
        z,
        size: 0.8 + Math.random() * 1.5,
        color,
        angle,
        radius,
        speed: (0.0002 + Math.random() * 0.0003) * (1 - ratio * 0.4),
        branch,
      });
    }

    // 3D rotation projection
    const rx = 0.5; // X rotation to tilt the galaxy
    const ry = 0.2; // Y rotation

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Additive blending for glows
      ctx.globalCompositeOperation = "screen";

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isReducedMotion) {
          // Increment angle (orbit)
          p.angle += p.speed;
        }

        // Recompute position from orbital variables
        const xOrb = Math.cos(p.angle) * p.radius;
        const zOrb = Math.sin(p.angle) * p.radius;

        // Apply 3D tilt transformations
        // Y-axis rotation
        const x1 = xOrb * cosY - zOrb * sinY;
        const z1 = xOrb * sinY + zOrb * cosY;

        // X-axis rotation
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // 2D projection with slight perspective
        const fov = 800;
        const scale = fov / (fov + z2);
        const xProj = centerX + x1 * scale;
        const yProj = centerY + y2 * scale;

        // Draw particle if on-screen
        if (xProj >= 0 && xProj <= width && yProj >= 0 && yProj <= height) {
          ctx.beginPath();
          ctx.arc(xProj, yProj, p.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }
    };

    let lastFrameTime = 0;
    const animate = (time: number) => {
      // Throttle to 60fps
      if (time - lastFrameTime > 16) {
        draw();
        lastFrameTime = time;
      }
      animationId = requestAnimationFrame(animate);
    };

    if (isReducedMotion) {
      // Single draw for static view
      draw();
    } else {
      animationId = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none opacity-45 select-none z-0"
    />
  );
}
