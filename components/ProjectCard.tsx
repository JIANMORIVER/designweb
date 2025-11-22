
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
      whileHover={!isEditMode ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer break-inside-avoid mb-8 relative"
      onClick={(e) => {
        // In edit mode, only click-to-open if not clicking an editable field (handled by propagation)
        // But to be safe, let's say clicking the image in edit mode edits the image, clicking text edits text.
        // To open the modal in edit mode, maybe click a specific button? 
        // For now, let's allow opening the modal if not clicking an editable helper.
        onClick(project);
      }}
    >
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

      <div className="relative overflow-hidden rounded-2xl bg-stone-200">
        <Editable 
          value={project.coverImage} 
          type="image" 
          onSave={(v) => updateProject(project.id, 'coverImage', v)}
          label="Cover Image"
        >
          <img 
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Editable>
        
        <div className={`absolute inset-0 bg-black/0 ${!isEditMode && 'group-hover:bg-black/20'} transition-colors duration-300`} />
        
        {/* Floating action button on hover - Hide in Edit Mode to avoid clutter */}
        {!isEditMode && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-stone-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={20} />
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-bold font-display text-stone-900 group-hover:text-stone-600 transition-colors">
            <Editable value={project.title} onSave={(v) => updateProject(project.id, 'title', v)} label="Title" />
          </h3>
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
             <Editable value={project.year} onSave={(v) => updateProject(project.id, 'year', v)} label="Year" />
          </span>
        </div>
        <div className="text-sm text-stone-500 mt-1">
           <Editable value={project.category} onSave={(v) => updateProject(project.id, 'category', v as Category)} label="Category" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
