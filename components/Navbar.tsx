import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);
  
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Colors for different sections: Work (Yellow), About (Green), Contact (Blue)
  const linkColors = ['#FACC15', '#4ADE80', '#60A5FA'];
  
  // Keep track of effective target index to prevent gray flash
  const targetIndex = hoveredIndex ?? activeIndex;
  
  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Map section IDs to indices
      const sections = NAV_LINKS.map(link => document.querySelector(link.href) as HTMLElement);
      
      // Check if we are at bottom of page (Contact)
      if (window.innerHeight + window.scrollY >= documentHeight - 100) {
        setActiveIndex(2); // Contact
        return;
      }
      
      let currentActive = null;
      
      sections.forEach((section, idx) => {
        if (section) {
           const rect = section.getBoundingClientRect();
           // If section top is within upper half of viewport
           if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.1) {
             currentActive = idx;
           }
        }
      });
      
      setActiveIndex(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lead Spring (Snappy)
  const springConfig = { stiffness: 180, damping: 20, mass: 0.8 };
  const bubbleLeft = useSpring(0, springConfig);
  const bubbleWidth = useSpring(0, springConfig);
  const bubbleOpacity = useSpring(0, { stiffness: 200, damping: 20 });

  // Trail Spring (Laggy for liquid effect)
  const trailConfig = { stiffness: 100, damping: 25, mass: 1.2 };
  const trailLeft = useSpring(0, trailConfig);
  const trailWidth = useSpring(0, trailConfig);

  const measureLinks = () => {
    if (!navRef.current) return;
    
    // Determine which link to highlight
    // If hovering, prioritize hover. If not hovering, use active scroll section.
    const effectiveIndex = targetIndex;
    
    const links = navRef.current.querySelectorAll('a');
    if (effectiveIndex !== null && links[effectiveIndex]) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = links[effectiveIndex].getBoundingClientRect();
        
        // Relative position within container
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;
        
        setActiveRect({ left, width });
    } else {
        // Only set rect to null if truly nothing is active (e.g. top of page)
        setActiveRect(null);
    }
  };

  useEffect(() => {
    measureLinks();
  }, [hoveredIndex, activeIndex, t]); // Re-measure when text changes (t)

  useEffect(() => {
    if (activeRect && targetIndex !== null) {
        bubbleLeft.set(activeRect.left);
        bubbleWidth.set(activeRect.width);
        trailLeft.set(activeRect.left);
        trailWidth.set(activeRect.width);
        bubbleOpacity.set(1);
    } else {
        bubbleOpacity.set(0);
    }
  }, [activeRect, targetIndex, bubbleLeft, bubbleWidth, trailLeft, trailWidth, bubbleOpacity]);

  const handleResize = () => {
      measureLinks();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hoveredIndex, activeIndex]);

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
        {/* Removed overflow-hidden to allow liquid wobble to extend slightly */}
        <div className="absolute inset-0 rounded-full gooey-filter z-0 pointer-events-none">
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
                   backgroundColor: targetIndex !== null ? linkColors[targetIndex] : linkColors[0]
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
                   backgroundColor: targetIndex !== null ? linkColors[targetIndex] : linkColors[0]
                }}
                transition={{ duration: 0.3 }}
            />
        </div>

        {/* Links Layer */}
        <div className="flex items-center justify-center relative z-10">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={(e) => handleClick(e, link.href)}
                animate={{ 
                    // Use targetIndex to keep scale active if section is active
                    color: (hoveredIndex === i || activeIndex === i) ? '#000' : 'currentColor'
                }}
                className={`relative px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-bold transition-colors duration-200 select-none cursor-pointer block whitespace-nowrap ${
                    (hoveredIndex === i || activeIndex === i) ? 'text-stone-900 dark:text-stone-900' : 'text-stone-600 dark:text-stone-300'
                }`}
              >
                {t(link.key)}
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