
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Shape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number;
  type: 'star' | 'triangle' | 'gear';
  angle: number;
  rotationSpeed: number;
}

const BackgroundOrbs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  const shapesRef = useRef<Shape[]>([]);
  const mouseRef = useRef<{x: number, y: number}>({ x: -1000, y: -1000 });
  const scrollRef = useRef<{y: number, lastY: number}>({ y: 0, lastY: 0 });
  const requestRef = useRef<number>(0);

  // Drawing Helper Functions
  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  const drawGear = (ctx: CanvasRenderingContext2D, cx: number, cy: number, outerRadius: number, teeth: number) => {
    const innerRadius = outerRadius * 0.85;
    const holeRadius = outerRadius * 0.35;
    const angleStep = (Math.PI * 2) / teeth;
    
    ctx.moveTo(cx + Math.cos(0) * innerRadius, cy + Math.sin(0) * innerRadius);

    for (let i = 0; i < teeth; i++) {
        const a = i * angleStep;
        // Gear tooth profile
        ctx.lineTo(cx + Math.cos(a) * innerRadius, cy + Math.sin(a) * innerRadius);
        ctx.lineTo(cx + Math.cos(a + angleStep * 0.2) * outerRadius, cy + Math.sin(a + angleStep * 0.2) * outerRadius);
        ctx.lineTo(cx + Math.cos(a + angleStep * 0.4) * outerRadius, cy + Math.sin(a + angleStep * 0.4) * outerRadius);
        ctx.lineTo(cx + Math.cos(a + angleStep * 0.6) * innerRadius, cy + Math.sin(a + angleStep * 0.6) * innerRadius);
    }
    ctx.closePath();
    
    // Center hole (anticlockwise to cut hole in fill)
    ctx.moveTo(cx + holeRadius, cy);
    ctx.arc(cx, cy, holeRadius, 0, Math.PI * 2, true);
  };

  const drawTriangle = (ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) => {
    ctx.moveTo(cx, cy - radius);
    ctx.lineTo(cx + radius * Math.sin(2 * Math.PI / 3), cy + radius * Math.cos(2 * Math.PI / 3));
    ctx.lineTo(cx + radius * Math.sin(4 * Math.PI / 3), cy + radius * Math.cos(4 * Math.PI / 3));
    ctx.closePath();
  };

  useEffect(() => {
    const initShapes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const radius = isMobile ? 35 : 65; 
      
      shapesRef.current = [
        {
          x: width * 0.3,
          y: height * 0.3,
          vx: 0.8, 
          vy: 0.6,
          radius: radius, 
          color: '#FACC15', // Bright Yellow (formerly Green Star)
          mass: 1,
          type: 'gear',     // Changed from star to gear
          angle: 0,
          rotationSpeed: 0.005
        },
        {
          x: width * 0.7,
          y: height * 0.6,
          vx: -0.6,
          vy: -0.8,
          radius: radius,
          color: '#60A5FA', // Blue (formerly Triangle)
          mass: 1,
          type: 'star',     // Changed from triangle to star
          angle: 0,
          rotationSpeed: -0.008
        }
      ];
    };

    initShapes();
    scrollRef.current.y = window.scrollY;
    
    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            initShapes();
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
      shapesRef.current.forEach(shape => {
        shape.vy -= deltaScroll * 0.02; 
        shape.vx *= 0.995;
        shape.vy *= 0.995;
        shape.x += shape.vx;
        shape.y += shape.vy;
        
        // Update rotation
        shape.angle += shape.rotationSpeed;

        // Wall Collision
        if (shape.x - shape.radius < 0) { shape.x = shape.radius; shape.vx *= -1; }
        if (shape.x + shape.radius > width) { shape.x = width - shape.radius; shape.vx *= -1; }
        if (shape.y - shape.radius < 0) { shape.y = shape.radius; shape.vy *= -1; }
        if (shape.y + shape.radius > height) { shape.y = height - shape.radius; shape.vy *= -1; }

        // Mouse Interaction
        const dx = shape.x - mouseRef.current.x;
        const dy = shape.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < shape.radius + 150) { 
            const angle = Math.atan2(dy, dx);
            const force = 0.8;
            shape.vx += Math.cos(angle) * force;
            shape.vy += Math.sin(angle) * force;
        }
      });

      // Shape-to-Shape Collision
      for (let i = 0; i < shapesRef.current.length; i++) {
        for (let j = i + 1; j < shapesRef.current.length; j++) {
            const b1 = shapesRef.current[i];
            const b2 = shapesRef.current[j];
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
      shapesRef.current.forEach(shape => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);
        
        ctx.shadowBlur = 60; 
        ctx.shadowColor = shape.color;
        
        ctx.beginPath();
        if (shape.type === 'star') {
             drawStar(ctx, 0, 0, 5, shape.radius, shape.radius * 0.5);
        } else if (shape.type === 'gear') {
             drawGear(ctx, 0, 0, shape.radius, 8); // 8 teeth gear
        } else {
             drawTriangle(ctx, 0, 0, shape.radius);
        }

        ctx.fillStyle = shape.color;
        ctx.globalAlpha = 0.4;
        
        ctx.fill();
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
