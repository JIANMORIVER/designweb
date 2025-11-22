import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import { Category, Project } from '../types';
import { CATEGORIES } from '../constants';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Plus } from 'lucide-react';

const PortfolioGrid: React.FC = () => {
  const { content, isEditMode, addProject } = useContent();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  return (
    <section 
      id="work" 
      className="py-20 px-4 md:px-6 min-h-screen relative z-10"
      onMouseMove={handleMouseMove}
      ref={gridRef}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border border-transparent backdrop-blur-md ${
                activeCategory === cat 
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-xl scale-105' 
                  : 'bg-white/50 text-stone-600 hover:bg-white hover:text-stone-900 dark:bg-white/10 dark:text-stone-400 dark:hover:bg-white/20 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Edit Mode Actions */}
        {isEditMode && (
           <div className="flex justify-center mb-8">
             <button 
               onClick={addProject}
               className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
             >
               <Plus size={20} />
               Add New Project
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
            No projects found in this category yet.
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