
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Category, Project } from '../types';
import { CATEGORIES } from '../constants';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Plus } from 'lucide-react';

const PortfolioGrid: React.FC = () => {
  const { content, isEditMode, addProject } = useContent();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Liquid Filters State
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Track Left, Width, Top, Height to support multi-line (mobile wrapping)
  const [activeRect, setActiveRect] = useState<{ left: number; width: number; top: number; height: number } | null>(null);

  // Colors for categories
  const categoryColors = [
    '#a8a29e', // All: Stone
    '#f97316', // Product: Orange
    '#8b5cf6', // Interaction: Violet
    '#06b6d4', // Graphic: Cyan
  ];

  // Springs for liquid effect
  const springConfig = { stiffness: 180, damping: 20, mass: 0.8 };
  const bubbleLeft = useSpring(0, springConfig);
  const bubbleWidth = useSpring(0, springConfig);
  const bubbleTop = useSpring(0, springConfig);
  const bubbleHeight = useSpring(0, springConfig);
  
  const trailConfig = { stiffness: 100, damping: 25, mass: 1.2 };
  const trailLeft = useSpring(0, trailConfig);
  const trailWidth = useSpring(0, trailConfig);
  const trailTop = useSpring(0, trailConfig);
  const trailHeight = useSpring(0, trailConfig);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return content.projects;
    return content.projects.filter(p => p.category === activeCategory);
  }, [activeCategory, content.projects]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables for efficient spotlight effect
    gridRef.current.style.setProperty('--mouse-x', `${x}px`);
    gridRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Determine effective target index
  const activeCategoryIndex = CATEGORIES.indexOf(activeCategory);
  const targetIndex = hoveredCategoryIndex !== null ? hoveredCategoryIndex : activeCategoryIndex;

  // Measure and update bubble position
  const updateBubblePosition = () => {
    if (!navRef.current) return;
    
    const buttons = navRef.current.querySelectorAll('button');
    const targetButton = buttons[targetIndex];

    if (targetButton) {
      const navRect = navRef.current.getBoundingClientRect();
      const buttonRect = targetButton.getBoundingClientRect();
      
      const left = buttonRect.left - navRect.left;
      const top = buttonRect.top - navRect.top;
      const width = buttonRect.width;
      const height = buttonRect.height;
      
      setActiveRect({ left, width, top, height });
    }
  };

  useEffect(() => {
    updateBubblePosition();
  }, [hoveredCategoryIndex, activeCategory, t]); // Re-measure when text (t) changes

  useEffect(() => {
    if (activeRect) {
      bubbleLeft.set(activeRect.left);
      bubbleWidth.set(activeRect.width);
      bubbleTop.set(activeRect.top);
      bubbleHeight.set(activeRect.height);

      trailLeft.set(activeRect.left);
      trailWidth.set(activeRect.width);
      trailTop.set(activeRect.top);
      trailHeight.set(activeRect.height);
    }
  }, [activeRect]);
  
  useEffect(() => {
      window.addEventListener('resize', updateBubblePosition);
      return () => window.removeEventListener('resize', updateBubblePosition);
  }, [hoveredCategoryIndex, activeCategory]);

  return (
    <section 
      id="work" 
      className="py-20 px-4 md:px-6 min-h-screen relative z-10"
      onMouseMove={handleMouseMove}
      ref={gridRef}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Liquid Filters */}
        <div className="flex justify-center mb-16 relative z-20">
            <div 
              ref={navRef}
              className="liquid-nav-container relative flex flex-wrap justify-center items-center gap-1 md:gap-2 px-1.5 py-1.5 md:px-2 md:py-2 rounded-[32px] md:rounded-full"
              onMouseLeave={() => setHoveredCategoryIndex(null)}
            >
                {/* Gooey Filter Background */}
                <div className="absolute inset-0 rounded-[32px] md:rounded-full gooey-filter z-0 pointer-events-none overflow-hidden">
                    <motion.div 
                        className="absolute rounded-full"
                        style={{ 
                            left: trailLeft,
                            top: trailTop,
                            width: trailWidth,
                            height: trailHeight,
                        }}
                        animate={{
                           backgroundColor: categoryColors[targetIndex] || categoryColors[0]
                        }}
                    />
                    <motion.div 
                        className="absolute rounded-full"
                        style={{ 
                            left: bubbleLeft,
                            top: bubbleTop,
                            width: bubbleWidth,
                            height: bubbleHeight,
                        }}
                        animate={{
                           backgroundColor: categoryColors[targetIndex] || categoryColors[0]
                        }}
                    />
                </div>

                {/* Filter Buttons */}
                {CATEGORIES.map((cat, idx) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        onMouseEnter={() => setHoveredCategoryIndex(idx)}
                        className="relative z-10 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-colors duration-300 select-none cursor-pointer"
                        style={{
                            color: (activeCategoryIndex === idx || hoveredCategoryIndex === idx) ? '#000' : 'currentColor'
                        }}
                    >
                        <span className={`transition-colors duration-300 ${
                            (activeCategoryIndex === idx || hoveredCategoryIndex === idx) 
                            ? 'text-stone-900' 
                            : 'text-stone-600 dark:text-stone-400'
                        }`}>
                            {t(`cat.${cat}`)}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* Edit Mode Actions */}
        {isEditMode && (
           <div className="flex justify-center mb-8">
             <button 
               onClick={addProject}
               className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
             >
               <Plus size={20} />
               {t('proj.add')}
             </button>
           </div>
        )}

        {/* Masonry-ish Grid using Tailwind Columns */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 group"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            {t('proj.empty')}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGrid;
