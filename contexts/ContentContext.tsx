
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentState, Project, ResumeItem, Skill, PersonalInfo } from '../types';
import { INITIAL_CONTENT } from '../constants';

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
  const [content, setContent] = useState<ContentState>(INITIAL_CONTENT);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('portfolio_content');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('portfolio_content', JSON.stringify(content));
  }, [content]);

  const toggleEditMode = () => setIsEditMode(prev => !prev);

  const resetContent = () => {
    if (window.confirm("Are you sure you want to reset all changes? This cannot be undone.")) {
      setContent(INITIAL_CONTENT);
      localStorage.removeItem('portfolio_content');
    }
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
    const newProject: Project = {
      id: `new_${Date.now()}`,
      title: 'New Project',
      category: 'Product',
      year: new Date().getFullYear().toString(),
      description: 'Description of your new project...',
      tags: ['New'],
      coverImage: 'https://via.placeholder.com/800x600?text=New+Project',
      gallery: []
    };
    setContent(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const deleteProject = (id: string) => {
    if (window.confirm("Delete this project?")) {
      setContent(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
    }
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
