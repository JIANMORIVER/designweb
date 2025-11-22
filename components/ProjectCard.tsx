import React from 'react';
import { motion } from 'framer-motion';
import { Project, Category } from '../types';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import Editable from './Editable';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const { isEditMode, updateProject, deleteProject } = useContent();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group/card cursor-pointer break-inside-avoid mb-8 relative rounded-3xl"
      onClick={(e) => {
        onClick(project);
      }}
    >
      {/* Spotlight Effect Layer - Needs parent PortfolioGrid to set --mouse-x/y */}
      <div 
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent 40%)`
        }} 
      />
      
      <div className="liquid-card rounded-3xl p-4 h-full flex flex-col relative z-10 overflow-hidden">
        {/* Inner localized glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {isEditMode && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              deleteProject(project.id);
            }}
            className="absolute -top-2 -left-2 z-20 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}

        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-stone-200 dark:bg-stone-800 mb-4">
          <Editable 
            value={project.coverImage} 
            type="image" 
            onSave={(v) => updateProject(project.id, 'coverImage', v)}
            label="Cover Image"
            className="w-full h-full block" 
          >
            <img 
              src={project.coverImage} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            />
          </Editable>
          
          <div className={`absolute inset-0 bg-black/0 ${!isEditMode && 'group-hover/card:bg-black/10'} transition-colors duration-300 pointer-events-none`} />
          
          {/* Floating action button on hover */}
          {!isEditMode && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-stone-900 p-2.5 rounded-full opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-300 shadow-lg">
              <ArrowUpRight size={20} />
            </div>
          )}
        </div>
        
        <div className="mt-auto relative z-10">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 leading-tight">
              <Editable value={project.title} onSave={(v) => updateProject(project.id, 'title', v)} label="Title" />
            </h3>
            <span className="text-xs font-mono text-stone-400 ml-2 flex-shrink-0">
               <Editable value={project.year} onSave={(v) => updateProject(project.id, 'year', v)} label="Year" />
            </span>
          </div>
          <div className="text-sm font-medium text-stone-500 dark:text-stone-400">
             <Editable value={project.category} onSave={(v) => updateProject(project.id, 'category', v as Category)} label="Category" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;