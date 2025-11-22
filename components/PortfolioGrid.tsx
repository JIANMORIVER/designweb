
import React, { useState, useMemo } from 'react';
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

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return content.projects;
    return content.projects.filter(p => p.category === activeCategory);
  }, [activeCategory, content.projects]);

  return (
    <section id="work" className="py-20 px-4 md:px-6 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-stone-900 text-white shadow-lg' 
                  : 'bg-white text-stone-500 hover:bg-stone-200 hover:text-stone-800'
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
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
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
