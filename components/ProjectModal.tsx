
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { X, Plus, Trash2, Loader2, ExternalLink } from 'lucide-react';
import { useContent, compressImage } from '../contexts/ContentContext';
import { useLanguage } from '../contexts/LanguageContext';
import Editable from './Editable';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project: initialProject, onClose }) => {
  const { content, updateProject, updateProjectGallery, isEditMode } = useContent();
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  
  // Find the latest version of the project from context in case it was updated
  const project = content.projects.find(p => p.id === initialProject.id) || initialProject;
  
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddGalleryImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploading(true);
        try {
           const compressed = await compressImage(file);
           updateProjectGallery(project.id, [...project.gallery, compressed]);
        } catch (err) {
           console.error("Failed to compress image", err);
           alert("图片上传失败");
        } finally {
           setIsUploading(false);
           document.body.removeChild(input);
        }
      } else {
        document.body.removeChild(input);
      }
    };
    
    input.click();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-stone-50 dark:bg-stone-900 w-full max-w-5xl h-full md:h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col z-10"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-white/80 dark:bg-black/50 backdrop-blur p-2 rounded-full hover:bg-stone-200 dark:hover:bg-white/20 transition-colors"
        >
          <X size={24} className="text-stone-800 dark:text-stone-200" />
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="relative h-[40vh] md:h-[60vh] w-full">
             <Editable value={project.coverImage} onSave={(v) => updateProject(project.id, 'coverImage', v)} type="image" className="w-full h-full block">
               <img 
                 src={project.coverImage} 
                 alt={project.title} 
                 className="w-full h-full object-cover"
               />
             </Editable>
             <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-8 md:p-12 pointer-events-none">
               <div className="pointer-events-auto">
                 <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-stone-100 text-stone-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block"
                 >
                   {t(`cat.${project.category}`)}
                 </motion.span>
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                 >
                   <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
                     <Editable value={project.title} onSave={(v) => updateProject(project.id, 'title', v)} />
                   </h2>
                 </motion.div>
               </div>
             </div>
          </div>

          <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 space-y-8">
               <div>
                 <h4 className="text-sm uppercase text-stone-400 tracking-widest font-bold mb-2">{t('proj.timeline')}</h4>
                 <p className="text-stone-800 dark:text-stone-200 font-medium">
                   <Editable value={project.year} onSave={(v) => updateProject(project.id, 'year', v)} />
                 </p>
               </div>
               <div>
                 <h4 className="text-sm uppercase text-stone-400 tracking-widest font-bold mb-2">{t('proj.tags')}</h4>
                 <div className="flex flex-wrap gap-2">
                   {project.tags.map((tag, idx) => (
                     <span key={idx} className="border border-stone-200 dark:border-stone-700 px-2 py-1 rounded text-sm text-stone-600 dark:text-stone-300">
                        {tag}
                     </span>
                   ))}
                 </div>
                 {project.link && (
                    <div className="mt-6">
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-sm font-bold hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
                        >
                           <ExternalLink size={16} />
                           {t('proj.visit')}
                        </a>
                    </div>
                 )}
               </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold mb-4 text-stone-900 dark:text-stone-100">{t('proj.overview')}</h3>
                <div className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                  <Editable value={project.description} onSave={(v) => updateProject(project.id, 'description', v)} type="textarea" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-stone-200 dark:border-stone-800">
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{t('proj.challenge')}</h4>
                  <div className="text-stone-600 dark:text-stone-400">
                    <Editable 
                      value={project.challenge || "Describe the challenge..."} 
                      onSave={(v) => updateProject(project.id, 'challenge', v)} 
                      type="textarea" 
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{t('proj.solution')}</h4>
                  <div className="text-stone-600 dark:text-stone-400">
                    <Editable 
                      value={project.solution || "Describe the solution..."} 
                      onSave={(v) => updateProject(project.id, 'solution', v)} 
                      type="textarea" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="px-8 md:px-16 pb-16 space-y-8">
            {project.gallery.map((img, idx) => (
              <div key={idx} className="relative group">
                <Editable 
                  value={img} 
                  type="image" 
                  className="block w-full"
                  onSave={(v) => {
                    const newGallery = [...project.gallery];
                    newGallery[idx] = v;
                    updateProjectGallery(project.id, newGallery);
                  }}
                >
                  <img 
                    src={img}
                    alt={`Detail ${idx}`}
                    className="w-full rounded-xl shadow-sm"
                  />
                </Editable>
                {isEditMode && (
                  <button 
                    onClick={() => {
                      const newGallery = project.gallery.filter((_, i) => i !== idx);
                      updateProjectGallery(project.id, newGallery);
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            
            {isEditMode && (
              <button 
                onClick={handleAddGalleryImage}
                disabled={isUploading}
                className="w-full py-8 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl flex flex-col items-center justify-center text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-400 transition-all"
              >
                {isUploading ? <Loader2 className="animate-spin mb-2" size={32} /> : <Plus size={32} className="mb-2" />}
                <span className="font-bold">{isUploading ? t('proj.processing') : t('proj.gallery_add')}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;