import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  pulseSpeed: number;
  pulseAngle: number;
  twinkle: boolean;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette: soft rose, warm gold, starlight white, champagne, lavender
    const colors = [
      '244, 114, 182', // rose
      '250, 232, 178', // gold
      '255, 255, 255', // starlight
      '229, 203, 138', // champagne
      '232, 121, 249', // violet rose
    ];

    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseOp = Math.random() * 0.5 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.3 - 0.08, // float upward
        opacity: baseOp,
        baseOpacity: baseOp,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulseAngle: Math.random() * Math.PI * 2,
        twinkle: Math.random() > 0.4,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render glowing soft particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseAngle += p.pulseSpeed;

        const currentOpacity = p.twinkle
          ? Math.max(0.1, p.baseOpacity + Math.sin(p.pulseAngle) * 0.35)
          : p.baseOpacity;

        // Wrap around edges
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentOpacity})`;
        ctx.shadowBlur = p.size > 1.6 ? 12 : 6;
        ctx.shadowColor = `rgba(${p.color}, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[140px] opacity-[0.11] transition-transform duration-300 ease-out pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          background: 'radial-gradient(circle, rgba(244,114,182,0.85) 0%, rgba(229,203,138,0.4) 40%, transparent 70%)'
        }}
      />

      {/* Ambient Radial Glowing Orbs in background */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[160px] opacity-[0.14] pointer-events-none animate-pulse-subtle"
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.6) 0%, rgba(244,114,182,0) 70%)' }}
      />
      <div 
        className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[180px] opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, rgba(212,175,55,0) 70%)' }}
      />
      <div 
        className="absolute top-[45%] left-[20%] w-[40vw] h-[40vw] rounded-full blur-[160px] opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0) 70%)' }}
      />

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

