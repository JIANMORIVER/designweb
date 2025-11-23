
import React, { createContext, useContext, useState } from 'react';

export type Language = 'zh' | 'en';

type Translations = {
  [key: string]: {
    zh: string;
    en: string;
  };
};

export const TRANSLATIONS: Translations = {
  'nav.work': { zh: '作品', en: 'Work' },
  'nav.about': { zh: '简历', en: 'About' },
  'nav.contact': { zh: '联系', en: 'Contact' },
  
  'cat.All': { zh: '全部', en: 'All' },
  'cat.Product': { zh: '产品设计', en: 'Product' },
  'cat.Interaction': { zh: '交互设计', en: 'Interaction' },
  'cat.Graphic': { zh: '平面设计', en: 'Graphic' },
  
  'sect.experience': { zh: '经历 & 背景', en: 'Experience & Background' },
  'sect.software': { zh: '软件技能', en: 'Software Proficiency' },
  'sect.about': { zh: '关于我', en: 'About Me' },
  'sect.contact': { zh: '联系方式', en: 'Contact' },
  'sect.socials': { zh: '社交媒体', en: 'Socials' },
  
  'proj.timeline': { zh: '时间', en: 'Timeline' },
  'proj.tags': { zh: '标签', en: 'Tags' },
  'proj.overview': { zh: '概览', en: 'Overview' },
  'proj.challenge': { zh: '挑战', en: 'The Challenge' },
  'proj.solution': { zh: '解决方案', en: 'The Solution' },
  'proj.add': { zh: '添加新项目', en: 'Add New Project' },
  'proj.empty': { zh: '暂无该分类项目', en: 'No projects found in this category yet.' },
  'proj.gallery_add': { zh: '添加图片', en: 'Add Gallery Image' },
  'proj.processing': { zh: '处理中...', en: 'Processing...' },
  'proj.visit': { zh: '访问网站', en: 'Visit Website' },

  'footer.slogan': { zh: '理性的机械逻辑与感性的艺术表达', en: "Let's create something together." },
  'footer.copyright': { zh: '工业设计作品集', en: 'Industrial Design Portfolio' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string) => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};