
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentState, Project, ResumeItem, Skill, PersonalInfo } from '../types';
import { INITIAL_CONTENT } from '../constants';

// Utility to compress images to avoid LocalStorage quota limits
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

  // Save to localStorage whenever content changes with Error Handling
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_content', JSON.stringify(content));
    } catch (e) {
      // Check for QuotaExceededError
      if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        alert("⚠️ 存储空间不足！\n\n图片占用空间过大。系统已自动尝试压缩，但仍超出浏览器限制。\n建议：\n1. 删除部分不需要的图片\n2. 重置内容");
      } else {
        console.error("Failed to save content:", e);
      }
    }
  }, [content]);

  const toggleEditMode = () => setIsEditMode(prev => !prev);

  const resetContent = () => {
    if (window.confirm("确定要重置所有内容吗？这将清除你所有的修改和上传的图片。")) {
      setContent(INITIAL_CONTENT);
      localStorage.removeItem('portfolio_content');
      window.location.reload();
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
      title: '新项目',
      category: 'Product',
      year: new Date().getFullYear().toString(),
      description: '请点击此处编辑项目描述...',
      tags: ['新标签'],
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      gallery: []
    };
    setContent(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const deleteProject = (id: string) => {
    if (window.confirm("确定要删除这个项目吗？")) {
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
