
export type Category = 'All' | 'Product' | 'Cultural' | 'Interaction' | 'Graphic' | 'Photography';

export interface Project {
  id: string;
  title: string;
  category: Category;
  year: string;
  description: string;
  coverImage: string;
  gallery: string[];
  tags: string[];
  challenge?: string;
  solution?: string;
}

export interface ResumeItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  email: string;
  socials: {
    behance: string;
    instagram: string;
    linkedin: string;
  };
  about: string;
}

export interface ContentState {
  personalInfo: PersonalInfo;
  skills: Skill[];
  resume: ResumeItem[];
  projects: Project[];
}
