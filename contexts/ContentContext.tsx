
import React, { createContext, useContext, useState } from 'react';
import { ContentState, Project, ResumeItem, Skill, PersonalInfo } from '../types';
import { INITIAL_CONTENT } from '../constants';

// Utility to compress images (kept for type compatibility if needed by consumers, though edit mode is off)
export const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const scaleSize = MAX_WIDTH / img.width;
        
        // Only resize if image is larger than MAX_WIDTH
        if (img.width > MAX_WIDTH) {
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
        } else {
            canvas.width = img.width;
            canvas.height = img.height;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
        }
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Compress to JPEG at 0.7 quality
        resolve(canvas.toDataURL('image/jpeg', 0.7)); 
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (error) => reject(error);
  });
};

interface ContentContextType {
  content: ContentState;
  isEditMode: boolean;
  toggleEditMode: () => void;
  resetContent: () => void;
  
  // Update methods
  updatePersonalInfo: (field: keyof PersonalInfo, value: any) => void;
  updateSkill: (index: number, field: keyof Skill, value: any) => void;
  updateResumeItem: (id: string, field: keyof ResumeItem, value: string) => void;
  
  // Project CRUD
  updateProject: (id: string, field: keyof Project, value: any) => void;
  updateProjectGallery: (id: string, newGallery: string[]) => void;
  addProject: () => void;
  deleteProject: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always use INITIAL_CONTENT, do not load from localStorage to ensure static content updates (like new images) are seen.
  const [content, setContent] = useState<ContentState>(INITIAL_CONTENT);
  
  // Permanently disable edit mode
  const isEditMode = false;

  const toggleEditMode = () => {};

  const resetContent = () => {
    setContent(INITIAL_CONTENT);
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: any) => {
    setContent(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSkill = (index: number, field: keyof Skill, value: any) => {
    setContent(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], [field]: value };
      return { ...prev, skills: newSkills };
    });
  };

  const updateResumeItem = (id: string, field: keyof ResumeItem, value: string) => {
    setContent(prev => ({
      ...prev,
      resume: prev.resume.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const updateProjectGallery = (id: string, newGallery: string[]) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, gallery: newGallery } : p)
    }));
  };

  const addProject = () => {
    // Disabled functionality
  };

  const deleteProject = (id: string) => {
    // Disabled functionality
  };

  return (
    <ContentContext.Provider value={{
      content,
      isEditMode,
      toggleEditMode,
      resetContent,
      updatePersonalInfo,
      updateSkill,
      updateResumeItem,
      updateProject,
      updateProjectGallery,
      addProject,
      deleteProject
    }}>
      {children}
    </ContentContext.Provider>
  );
};
