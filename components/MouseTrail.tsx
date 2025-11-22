import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(x: number, y: number, theme: 'light' | 'dark') {
    this.x = x;
    this.y = y;
    // Explosive burst
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1; // Faster explosion
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    this.size = Math.random() * 4 + 2;
    this.maxLife = Math.random() * 40 + 30; // Longer life
    this.life = this.maxLife;

    // Brighter, neon colors for the glow effect
    const colors = theme === 'dark' 
      ? ['#60A5FA', '#818CF8', '#F472B6', '#34D399', '#FFFFFF'] 
      : ['#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6'];
    
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96; // Air resistance
    this.vy *= 0.96;
    this.vy += 0.05; // Slight gravity
    this.life--;
    this.size *= 0.96;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = (this.life / this.maxLife) * 0.8;
    ctx.fillStyle = this.color;
    
    // Add Glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const MouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      // Fix for high DPI displays to prevent blurry canvas
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    setSize();
    
    // Debounced resize
    let resizeTimeout: any;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setSize, 100);
    }
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Use 'lighter' for additive blending (neon glow effect)
      ctx.globalCompositeOperation = 'lighter';
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Update and draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.size < 0.1) {
          particles.current.splice(i, 1);
        }
      }

      requestRef.current = requestAnimationFrame(render);
    };
    render();

    const handleMouseMove = (e: MouseEvent) => {
      // Spawn multiple particles per frame for a dense trail
      for (let i = 0; i < 2; i++) {
        particles.current.push(new Particle(e.clientX, e.clientY, themeRef.current));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Z-Index is -1: Behind content (z-10), but above background (z-2).
  // This allows the fireworks to be seen "through" the liquid glass cards.
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
};

export default MouseTrail;