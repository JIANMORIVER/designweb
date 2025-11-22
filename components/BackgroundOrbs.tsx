import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number;
}

const BackgroundOrbs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  const ballsRef = useRef<Ball[]>([]);
  const mouseRef = useRef<{x: number, y: number}>({ x: -1000, y: -1000 });
  const scrollRef = useRef<{y: number, lastY: number}>({ y: 0, lastY: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const initBalls = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Responsive size: Further reduced as requested
      const isMobile = width < 768;
      const radius = isMobile ? 35 : 65; 
      
      ballsRef.current = [
        {
          x: width * 0.3,
          y: height * 0.3,
          vx: 0.8, 
          vy: 0.6,
          radius: radius, 
          color: '#4ADE80', // Green
          mass: 1
        },
        {
          x: width * 0.7,
          y: height * 0.6,
          vx: -0.6,
          vy: -0.8,
          radius: radius,
          color: '#60A5FA', // Blue
          mass: 1
        }
      ];
    };

    initBalls();
    scrollRef.current.y = window.scrollY;
    
    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            initBalls();
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - scrollRef.current.lastY;
      scrollRef.current.lastY = currentScrollY;

      // Physics Loop
      ballsRef.current.forEach(ball => {
        ball.vy -= deltaScroll * 0.02; 
        ball.vx *= 0.995;
        ball.vy *= 0.995;
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall Collision
        if (ball.x - ball.radius < 0) { ball.x = ball.radius; ball.vx *= -1; }
        if (ball.x + ball.radius > width) { ball.x = width - ball.radius; ball.vx *= -1; }
        if (ball.y - ball.radius < 0) { ball.y = ball.radius; ball.vy *= -1; }
        if (ball.y + ball.radius > height) { ball.y = height - ball.radius; ball.vy *= -1; }

        // Mouse Interaction
        const dx = ball.x - mouseRef.current.x;
        const dy = ball.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ball.radius + 150) { 
            const angle = Math.atan2(dy, dx);
            const force = 0.8;
            ball.vx += Math.cos(angle) * force;
            ball.vy += Math.sin(angle) * force;
        }
      });

      // Ball-to-Ball Collision
      for (let i = 0; i < ballsRef.current.length; i++) {
        for (let j = i + 1; j < ballsRef.current.length; j++) {
            const b1 = ballsRef.current[i];
            const b2 = ballsRef.current[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = b1.radius + b2.radius;

            if (dist < minDist) {
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                const vx1 = b1.vx * cos + b1.vy * sin;
                const vy1 = b1.vy * cos - b1.vx * sin;
                const vx2 = b2.vx * cos + b2.vy * sin;
                const vy2 = b2.vy * cos - b2.vx * sin;

                const vx1Final = vx2;
                const vx2Final = vx1;

                b1.vx = vx1Final * cos - vy1 * sin;
                b1.vy = vy1 * cos + vx1Final * sin;
                b2.vx = vx2Final * cos - vy2 * sin;
                b2.vy = vy2 * cos + vx2Final * sin;

                const overlap = minDist - dist;
                const sepX = (overlap / 2) * Math.cos(angle);
                const sepY = (overlap / 2) * Math.sin(angle);
                b1.x -= sepX; b1.y -= sepY;
                b2.x += sepX; b2.y += sepY;
            }
        }
      }

      // Draw
      ballsRef.current.forEach(ball => {
        ctx.save();
        
        // Outer Halo
        ctx.shadowBlur = 60; 
        ctx.shadowColor = ball.color;
        
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.globalAlpha = 0.4;
        
        ctx.fill();
        
        // Highlights removed as requested
        
        ctx.restore();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onMouseMove = (e: MouseEvent) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(requestRef.current);
    };
  }, [theme]);

  return (
    <canvas 
        ref={canvasRef}
        className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
};

export default BackgroundOrbs;