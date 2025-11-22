
import { Project, ResumeItem, Skill, Category, ContentState } from './types';

export const NAV_LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const CATEGORIES: Category[] = ['All', 'Product', 'Cultural', 'Interaction', 'Graphic', 'Photography'];

const PERSONAL_INFO = {
  name: "Alex Chen",
  role: "Industrial Designer",
  tagline: "Merging function, aesthetics, and human interaction.",
  email: "alex.chen@design.edu",
  socials: {
    behance: "https://behance.net",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  },
  about: "I am a senior Industrial Design student passionate about solving complex problems through tangible forms. My work spans from physical product ergonomics to digital interaction flows, always aiming to create meaningful experiences."
};

const SKILLS: Skill[] = [
  { name: 'Rhino 3D', level: 90 },
  { name: 'SolidWorks', level: 85 },
  { name: 'KeyShot', level: 95 },
  { name: 'Figma', level: 80 },
  { name: 'Adobe Suite', level: 85 },
  { name: 'Prototyping', level: 90 },
];

const RESUME: ResumeItem[] = [
  {
    id: '1',
    year: '2024',
    role: 'Design Intern',
    company: 'Studio Minimalist',
    description: 'Assisted in the development of consumer electronics, focusing on CMF (Color, Material, Finish) exploration and 3D modeling.'
  },
  {
    id: '2',
    year: '2023',
    role: 'Junior UX Designer',
    company: 'TechFlow Inc.',
    description: 'Collaborated with developers to design intuitive interfaces for smart home applications.'
  },
  {
    id: '3',
    year: '2021-2025',
    role: 'Bachelor of Industrial Design',
    company: 'University of Arts & Design',
    description: 'Focused on sustainable product design and human-computer interaction. GPA 3.8/4.0.'
  }
];

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Aero Purifier',
    category: 'Product',
    year: '2024',
    tags: ['Industrial Design', 'Sustainability', 'Hardware'],
    coverImage: 'https://picsum.photos/id/1/800/1000',
    description: 'A compact air purifier designed for micro-apartments, focusing on silent operation and aesthetic integration into modern interiors.',
    challenge: 'Designing a high-efficiency filter system within a footprint smaller than a standard coffee maker.',
    solution: 'Utilized a vertical turbine mechanism and sustainable bamboo fiber filters to maximize airflow while minimizing vibration.',
    gallery: [
      'https://picsum.photos/id/201/800/600',
      'https://picsum.photos/id/202/800/600',
      'https://picsum.photos/id/203/800/600'
    ]
  },
  {
    id: 'p2',
    title: 'Heritage Tea Set',
    category: 'Cultural',
    year: '2023',
    tags: ['Ceramics', 'Cultural Preservation', 'Ritual'],
    coverImage: 'https://picsum.photos/id/30/800/800',
    description: 'A modern reinterpretation of traditional tea ceremonies, blending ceramic craftsmanship with ergonomic handles for younger generations.',
    challenge: 'Bridging the gap between solemn tradition and casual modern usage habits.',
    solution: 'Simplified the ritual components into a stackable, portable set without losing the material warmth of traditional clay.',
    gallery: [
      'https://picsum.photos/id/225/800/600',
      'https://picsum.photos/id/226/800/600'
    ]
  },
  {
    id: 'p3',
    title: 'Focus Flow App',
    category: 'Interaction',
    year: '2023',
    tags: ['UI/UX', 'Productivity', 'Mobile'],
    coverImage: 'https://picsum.photos/id/3/800/1000',
    description: 'An interface design for a productivity tool that adapts its complexity based on the user\'s stress levels detected via wearables.',
    gallery: [
      'https://picsum.photos/id/366/800/600',
      'https://picsum.photos/id/367/800/600'
    ]
  },
  {
    id: 'p4',
    title: 'Urban Typography',
    category: 'Graphic',
    year: '2022',
    tags: ['Typography', 'Poster', 'Print'],
    coverImage: 'https://picsum.photos/id/24/800/1000',
    description: 'A series of posters exploring the rhythm of city life through kinetic typography and stark contrast.',
    gallery: [
      'https://picsum.photos/id/401/800/600',
      'https://picsum.photos/id/402/800/600'
    ]
  },
  {
    id: 'p5',
    title: 'Shadow & Light',
    category: 'Photography',
    year: '2024',
    tags: ['Street', 'B&W', 'Composition'],
    coverImage: 'https://picsum.photos/id/58/800/800',
    description: 'Daily observations of architectural geometry and human silhouette interactions.',
    gallery: [
      'https://picsum.photos/id/511/800/600',
      'https://picsum.photos/id/512/800/600',
      'https://picsum.photos/id/513/800/600'
    ]
  },
  {
    id: 'p6',
    title: 'Smart Crutch',
    category: 'Product',
    year: '2024',
    tags: ['Medical', 'Ergonomics', 'IoT'],
    coverImage: 'https://picsum.photos/id/60/800/1000',
    description: 'An ergonomic crutch redesign featuring pressure distribution sensors and a modular handle system.',
    gallery: [
      'https://picsum.photos/id/600/800/600'
    ]
  }
];

export const INITIAL_CONTENT: ContentState = {
  personalInfo: PERSONAL_INFO,
  skills: SKILLS,
  resume: RESUME,
  projects: PROJECTS
};
