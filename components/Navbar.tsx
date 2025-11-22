import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);
  
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Colors for different sections: Work (Yellow), About (Green), Contact (Blue)
  const linkColors = ['#FACC15', '#4ADE80', '#60A5FA'];

  // Lead Spring (Snappy)
  const springConfig = { stiffness: 150, damping: 20, mass: 0.8 };
  const bubbleLeft = useSpring(0, springConfig);
  const bubbleWidth = useSpring(0, springConfig);
  const bubbleOpacity = useSpring(0, { stiffness: 200, damping: 20 });

  // Trail Spring (Laggy for liquid effect)
  const trailConfig = { stiffness: 80, damping: 25, mass: 1.2 };
  const trailLeft = useSpring(0, trailConfig);
  const trailWidth = useSpring(0, trailConfig);

  const measureLinks = () => {
    if (!navRef.current) return;
    
    const links = navRef.current.querySelectorAll('a');
    if (hoveredIndex !== null && links[hoveredIndex]) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = links[hoveredIndex].getBoundingClientRect();
        
        // Relative position within container
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;
        
        setActiveRect({ left, width });
    }
  };

  useEffect(() => {
    measureLinks();
  }, [hoveredIndex]);

  useEffect(() => {
    if (activeRect) {
        bubbleLeft.set(activeRect.left);
        bubbleWidth.set(activeRect.width);
        trailLeft.set(activeRect.left);
        trailWidth.set(activeRect.width);
        bubbleOpacity.set(1);
    } else {
        bubbleOpacity.set(0);
    }
  }, [activeRect, bubbleLeft, bubbleWidth, trailLeft, trailWidth, bubbleOpacity]);

  const handleResize = () => {
      if (hoveredIndex !== null) measureLinks();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hoveredIndex]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
    >
      <div 
        ref={navRef}
        onMouseLeave={() => setHoveredIndex(null)}
        className="liquid-nav-container pointer-events-auto relative flex items-center gap-1 md:gap-2 px-1.5 py-1.5 md:px-2 md:py-2 transition-all duration-500 rounded-full"
      >
        {/* Gooey Filter Container */}
        <div className="absolute inset-0 rounded-full gooey-filter z-0 pointer-events-none overflow-hidden">
            {/* Trailing Bubble */}
             <motion.div 
                className="absolute rounded-full"
                style={{ 
                    left: trailLeft,
                    width: trailWidth,
                    opacity: bubbleOpacity,
                    height: '100%',
                    top: '0',
                }}
                animate={{
                   backgroundColor: hoveredIndex !== null ? linkColors[hoveredIndex] : '#d6d3d1'
                }}
                transition={{ duration: 0.3 }}
            />
            {/* Leading Bubble */}
            <motion.div 
                className="absolute rounded-full"
                style={{ 
                    left: bubbleLeft,
                    width: bubbleWidth,
                    opacity: bubbleOpacity,
                    height: '100%',
                    top: '0',
                }}
                animate={{
                   backgroundColor: hoveredIndex !== null ? linkColors[hoveredIndex] : '#d6d3d1'
                }}
                transition={{ duration: 0.3 }}
            />
        </div>

        {/* Links Layer */}
        <div className="flex items-center justify-center relative z-10">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={(e) => handleClick(e, link.href)}
                animate={{ 
                    scale: hoveredIndex === i ? 1.15 : 1,
                    color: hoveredIndex === i ? '#000' : 'currentColor'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`relative px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-bold transition-colors duration-200 select-none cursor-pointer block whitespace-nowrap ${
                    hoveredIndex === i ? 'text-stone-900 dark:text-stone-900' : 'text-stone-600 dark:text-stone-300'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
        </div>

        {/* Separator */}
        <div className="w-px h-4 md:h-5 bg-stone-900/10 dark:bg-white/10 mx-1 md:mx-2 z-10" />

        {/* Theme Toggle */}
        <button 
            onClick={toggleTheme}
            className="p-2.5 md:p-3 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-white/10 transition-colors z-20 relative"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;