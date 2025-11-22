import { Project, ResumeItem, Skill, Category, ContentState } from './types';

export const NAV_LINKS = [
  { name: '作品 (Work)', href: '#work' },
  { name: '简历 (About)', href: '#about' },
  { name: '联系 (Contact)', href: '#contact' },
];

export const CATEGORIES: Category[] = ['All', 'Product', 'Cultural', 'Interaction', 'Graphic', 'Photography'];

const PERSONAL_INFO = {
  name: "李文轩",
  role: "工业设计 / 机械工程学生",
  tagline: "理性的机械逻辑与感性的艺术表达",
  email: "aresilience@foxmail.com",
  socials: {
    phone: "tel:+8615198229570",
    wechat: "#"
  },
  about: "我是四川大学机械工程学院的本科生，专业为机械设计制造及其自动化。从化学工程到机械工程的跨学科背景，让我具备了严谨的工程思维与实验能力。我致力于探索技术与设计的边界，在流体传动、人机工程学等领域成绩优异（相关课程90+），同时在品牌策划、交互设计与文创产品开发等实践项目中积累了丰富经验。"
};

const SKILLS: Skill[] = [
  { name: 'Rhino 3D', level: 90 },
  { name: 'SolidWorks', level: 85 },
  { name: 'Blender 3D', level: 80 },
  { name: 'AutoCAD', level: 85 },
  { name: 'Ps / Ai / Pr', level: 90 },
  { name: 'Figma', level: 85 },
  { name: '剪映 (CapCut)', level: 95 },
  { name: '英语 (CET-6)', level: 85 },
];

const RESUME: ResumeItem[] = [
  {
    id: 'edu2',
    year: '2021.9 – 至今',
    role: '本科生 - 机械设计制造及其自动化',
    company: '四川大学 机械工程学院',
    description: '主修课程：数值分析和优化算法(90)、产品设计人机工程学(96)、工程热力学(85)、流体传动与控制(83)。获2023-2024年“优秀干部”及三等奖学金。'
  },
  {
    id: 'proj1',
    year: '2024',
    role: '毕业设计',
    company: '超疏水电热表面制备及测试',
    description: '负责制备具有超疏水性能的电热表面并测试性能。查阅大量文献，长期在实验室进行实验，实验结果已纳入课题组待发表论文。'
  },
  {
    id: 'proj2',
    year: '2023 - 2024',
    role: '合伙人 & 品牌策划',
    company: 'OneHome 一家家庭酒馆',
    description: '针对年轻群体社交需求打造的品牌。负责视觉设计、公众号与小红书运营。发布原创内容300+篇，带领设计组策划多款爆款活动，实现日客流量20+，线上社群增长7000+。'
  },
  {
    id: 'proj3',
    year: '2023',
    role: '项目负责人',
    company: 'PLC公交车报站系统',
    description: '基于STM32单片机设计硬件电路与系统功能。使用汇编语言编写显示驱动代码，实现线路选择、到站语音提示及矩阵按键交互逻辑。'
  },
  {
    id: 'award1',
    year: '2023',
    role: '设计奖项',
    company: '四川大学招生文创设计大赛',
    description: '设计“印象川大系列书签”，结合校园文化设计实用性与艺术性兼具的文创产品，荣获二等奖及三等奖。'
  },
  {
    id: 'edu1',
    year: '2020.9 – 2021.9',
    role: '本科生 - 化学工程',
    company: '四川大学 化学工程学院',
    description: '相关课程：近代化学基础(80)、工科化学实验(85)、基础化工实验(89)。具备扎实的实验操作与数据分析能力。'
  }
];

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: '印象川大文创',
    category: 'Cultural',
    year: '2023',
    tags: ['文创设计', '平面设计', '获奖作品'],
    coverImage: 'https://images.unsplash.com/photo-1550948537-d378265cb7d4?auto=format&fit=crop&q=80&w=800',
    description: '“印象川大”系列文创设计，旨在通过艺术化的视觉语言重构校园文化符号。',
    challenge: '如何在方寸之间的书签上，既保留百年学府的历史厚重感，又符合当代年轻学生的审美偏好？',
    solution: '提取校园标志性建筑轮廓，结合扁平化插画风格与金属腐蚀工艺。该系列作品兼具实用性与收藏价值，获得校级设计大赛二等奖。',
    gallery: [
      'https://images.unsplash.com/photo-1544164559-ed6a97111b84?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'p2',
    title: 'OneHome 品牌全案',
    category: 'Graphic',
    year: '2023',
    tags: ['品牌VI', '社群运营', '新媒体'],
    coverImage: 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800',
    description: 'OneHome家庭酒馆品牌视觉识别系统与新媒体运营全案。',
    challenge: '初创品牌如何在竞争激烈的线下社交市场中快速建立品牌认知与用户粘性？',
    solution: '确立了“家庭/归属”的温暖视觉基调，输出300+篇高质量原创内容，配合线下活动物料设计，成功构建7000+人的高活跃度社群。',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'p3',
    title: 'PLC 智能报站系统',
    category: 'Interaction',
    year: '2023',
    tags: ['STM32', '汇编语言', '交互逻辑'],
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    description: '基于STM32单片机与汇编语言开发的公交自动报站系统原型。',
    challenge: '需要使用底层汇编语言实现复杂的硬件驱动与逻辑控制，并设计符合直觉的物理交互界面。',
    solution: '设计了矩阵按键与独立按键结合的交互逻辑，实现了线路切换、语音播报等功能，代码结构严谨，运行稳定。',
    gallery: [
      'https://images.unsplash.com/photo-1555664424-778a18433566?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'p4',
    title: '超疏水表面研究',
    category: 'Product',
    year: '2024',
    tags: ['材料科学', '表面处理', '实验分析'],
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    description: '毕业设计：超疏水电热表面的制备及性能测试研究。',
    challenge: '如何制备出既具有优异超疏水性能，又能保持良好电热稳定性的功能表面？',
    solution: '通过大量文献调研与实验室反复测试，优化了制备工艺参数。实验数据完整，结果符合预期，相关成果已纳入课题组待发表论文。',
    gallery: [
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'p5',
    title: '建筑与光影',
    category: 'Photography',
    year: '2024',
    tags: ['摄影', '构图', '观察'],
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800',
    description: '日常摄影作品集，记录城市建筑中的几何美学与光影变幻。',
    gallery: [
      'https://images.unsplash.com/photo-1479839672679-a455b180eda8?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

export const INITIAL_CONTENT: ContentState = {
  personalInfo: PERSONAL_INFO,
  skills: SKILLS,
  resume: RESUME,
  projects: PROJECTS
};