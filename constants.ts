
import { Project, ResumeItem, Skill, Category, ContentState } from './types';

export const NAV_LINKS = [
  { key: 'nav.work', href: '#work' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
];

export const CATEGORIES: Category[] = ['All', 'Product', 'Interaction', 'Graphic'];

const PERSONAL_INFO = {
  name: "Vincent",
  role: "工业产品与智能创新设计 / 机械工程背景",
  tagline: "理性的机械逻辑与感性的艺术表达",
  email: "aresilence@foxmail.com",
  socials: {
    phone: "tel:+8615991149724",
    wechat: "#"
  },
  about: "本科学习期间，经历了四川大学化学工程学院和机械工程学院两段专业学习，对工程设计知识有了基本把握。现为北京理工大学设计与艺术学院研究生，主修工业产品与智能创新设计，致力于探索技术与设计的边界，结合严谨的工程思维与感性的艺术表达。"
};

const SKILLS: Skill[] = [
  { name: 'Rhino 3D', level: 90 },
  { name: 'SOLIDWORKS 3D CAD', level: 85 },
  { name: 'Blender 3D', level: 80 },
  { name: 'Auto CAD', level: 85 },
  { name: 'Adobe Photoshop', level: 90 },
  { name: 'Adobe Illustrator', level: 88 },
  { name: 'Adobe Premiere', level: 85 },
  { name: 'Figma', level: 85 },
  { name: '剪映 (CapCut)', level: 80 },
  { name: '英语 (CET-6)', level: 85 },
];

const RESUME: ResumeItem[] = [
  {
    id: 'edu3',
    year: '2025.9 – 至今',
    role: '研究生 - 工业产品与智能创新设计',
    company: '北京理工大学 设计与艺术学院',
    description: '主修工业产品与智能创新设计。'
  },
  {
    id: 'edu2',
    year: '2021.9 – 2025.9',
    role: '本科生 - 机械设计制造及其自动化',
    company: '四川大学 机械工程学院',
    description: '核心课程：数值分析和优化算法(90)、流体传动与控制(83)、控制工程基础(82)、工程热力学与传热学(85)、产品设计人机工程学(96)。获2023-2024年“优秀干部”及三等奖学金。'
  },
  {
    id: 'edu1',
    year: '2020.9 – 2021.9',
    role: '本科生 - 绿色化学与生物制药',
    company: '四川大学 化学工程学院',
    description: '核心课程：近代化学基础(80)、工科化学实验(85)、基础化工实验-1(89)。'
  },
  {
    id: 'exp1',
    year: '项目经历',
    role: '成员 / 策划',
    company: '四川大学联合利华俱乐部',
    description: '担任“元宇宙嘉年华”主策划，利用客制化元宇宙平台技术策划校园活动，达成深度参与人数150的宣传成绩。担任校级比赛“成长计划”设计组负责人，管理监制参赛物料及宣发工作。'
  },
  {
    id: 'exp2',
    year: '项目经历',
    role: '合伙人',
    company: 'OneHome 一家 家庭酒馆',
    description: '针对年轻群体社交需求打造的品牌。负责品牌策划、推广及VI设计。运营微信公众号及小红书，发布原创内容300+篇。带领设计组策划多款爆款活动，实现日客流量20+，线上社群增长7000+。'
  },
  {
    id: 'exp3',
    year: '项目经历',
    role: '文创设计',
    company: '个人项目',
    description: '结合校园文化，创作兼具实用性与艺术性的文创产品。设计“印象川大”系列书签、文创及装帧设计。作品获四川大学招生文创设计大赛二等奖及三等奖。'
  }
];

const PROJECTS: Project[] = [
  {
    id: 'p_ugv',
    title: '路砖维修无人车',
    category: 'Product',
    year: '2024',
    tags: ['工业设计', '智慧城市', '机器人', 'Rhino'],
    coverImage: 'https://i.imgs.ovh/2025/11/24/CLevCY.jpeg',
    description: '针对城市人行道破损问题（松动、破碎、沉陷）设计的全自动检修无人车(#1)。',
    challenge: '城市人行道砖块松动、破碎问题频发，传统人工检修面临“事后修复”效率低、排查难、影响市民出行等痛点。',
    solution: '设计了一款集“识别-清理-修复-维护”于一体的无人检修车。采用模块化设计，结合盘型刀具组（铣刀、吸尘、灌注）与机械臂，实现对破损路砖的标准化处理与精准填补。车身配有警示光带，保障作业安全，提升城市管理效率。',
    gallery: [
      'https://i.imgs.ovh/2025/11/24/CLeAfr.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLebmM.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeVPx.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeUTL.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeL1n.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeSJ1.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeFRb.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLevCY.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeft0.jpeg'
    ]
  },
  {
    id: 'p_goggles',
    title: 'AR 智能防冰雾雪镜',
    category: 'Product',
    year: '2024',
    tags: ['可穿戴设备', 'AR', '新材料', '人机交互'],
    coverImage: 'https://i.imgs.ovh/2025/11/24/CLepKg.jpeg',
    description: '结合超疏水材料技术与AR增强现实的滑雪护目镜(#2)，解决极寒环境下起雾结冰痛点。',
    challenge: '户外冰雪运动中，雪镜起雾、结冰严重影响视野安全。同时，传统雪镜缺乏智能化交互，用户难以在运动中获取位置、速度及队友状态。',
    solution: '技术上，镜片采用激光刻蚀碳化硅制备的超疏水表面，实现物理级防冰防雾；功能上，内置微型投影与激光雷达，提供AR导航、速度监测、SOS一键求救及队友位置共享。设计上采用磁吸可换电池与人体工学面部贴合结构。',
    gallery: [
      'https://i.imgs.ovh/2025/11/24/CLehO0.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLepKg.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeKed.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLetrO.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLedu6.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeEQp.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLe4Uc.jpeg',
      'https://i.imgs.ovh/2025/11/24/CLeY39.jpeg'
    ]
  },
  {
    id: 'p_lathe',
    title: '创客桌面车床',
    category: 'Product',
    year: '2023',
    tags: ['机械设计', '创客工具', '数控', 'SolidWorks'],
    coverImage: 'https://images.unsplash.com/photo-1601618695029-79f8842274b1?auto=format&fit=crop&q=80&w=800',
    description: '专为创客群体设计的小型化、手动/数控双模式桌面加工设备(#3)。',
    challenge: '传统工业车床体积大、门槛高，专业数控中心昂贵。创客群体缺乏一款既能满足微型化加工需求，又兼具手动操控乐趣与数控精度的桌面设备。',
    solution: '采用模块化设计，体积小巧（<60cm）。支持“手动模式”与“数控模式”灵活切换。配备上翻式安全防护罩与可视化操作面板，降低操作门槛，适合家庭或工作坊环境。内部集成散热与排屑结构，兼顾性能与整洁。',
    gallery: [
      'https://images.unsplash.com/photo-1617042375876-a13e36732a04?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'p_zenless',
    title: 'Zenless Scheduler',
    category: 'Interaction',
    year: '2024',
    tags: ['UI/UX', 'Game Design', 'React', 'Gamification'],
    coverImage: 'https://i.imgs.ovh/2025/11/24/CLsLOX.png',
    link: 'https://jues.vercel.app/',
    description: '这是一个完成度极高且非常还原《绝区零》（Zenless Zone Zero）UI 风格的游戏化个人管理（ToDo List）应用。\n\n总结： 这是一个集日程管理、习惯养成、优先级规划于一体的网页，通过极具沉浸感的 ZZZ 视觉风格，让用户像“代理人”执行委托一样去完成现实生活中的工作。',
    challenge: '如何将枯燥的日程管理变得有趣？如何将复杂的游戏UI风格应用到功能性产品中而不失易用性？',
    solution: '1. 游戏化状态面板 (Gamified Dashboard)：\n绳匠等级系统： 顶部设有 "PROXY LV. 01"（绳匠等级）和 "Total Activity"（活跃度）进度条。用户通过完成现实生活中的任务来积累点数升级，将枯燥的日程管理变成了“练级”。\n\n2. 任务分类管理系统：\n日常 (Daily) - 日程表： 用于管理每日的常规事务（如“晨间咖啡”、“代码提交”）。左侧带有时间轴（上午/下午/晚上）和视图切换（列表/周视图等），模拟了游戏中的行程安排界面。\n\n训练 (Training) - 习惯追踪： 用于打卡重复性任务（如“喝水”、“深蹲”）。采用 "DEPLOY"（出击）作为完成按钮，不仅符合设定，还增加了仪式感。\n\n挑战 (Challenge) - 优先级矩阵： 使用**艾森豪威尔矩阵（四象限法则）**来管理任务。将任务分为“重要且紧急”、“重要不紧急”等，界面直接借用了游戏中“空洞探险”的危机感设计，非常适合规划长期目标或紧急项目。',
    gallery: [
      'https://i.imgs.ovh/2025/11/24/CLsLOX.png',
      'https://i.imgs.ovh/2025/11/24/CLsFpU.png',
      'https://i.imgs.ovh/2025/11/24/CLsTkQ.png'
    ]
  },
  {
    id: 'p_cultural',
    title: '印象川大文创',
    category: 'Graphic',
    year: '2023',
    tags: ['文创设计', '平面设计', '获奖作品'],
    coverImage: 'https://i.imgs.ovh/2025/11/24/CLeiKh.png',
    description: '“印象川大”系列文创设计，旨在通过艺术化的视觉语言重构校园文化符号。作品获四川大学招生文创设计大赛二等奖及三等奖。',
    challenge: '如何在方寸之间的书签上，既保留百年学府的历史厚重感，又符合当代年轻学生的审美偏好？',
    solution: '提取行政楼、校门等标志性建筑轮廓，结合“海纳百川”校训精神，采用扁平化插画风格与金属腐蚀工艺设计书签及海报。',
    gallery: [
      'https://i.imgs.ovh/2025/11/24/CLeiKh.png',
      'https://i.imgs.ovh/2025/11/24/CLeNsr.png',
      'https://i.imgs.ovh/2025/11/24/CLe3rM.png',
      'https://i.imgs.ovh/2025/11/24/CLewux.png',
      'https://i.imgs.ovh/2025/11/24/CLeXWL.png',
      'https://i.imgs.ovh/2025/11/24/CLeu31.png',
      'https://i.imgs.ovh/2025/11/24/CLemob.png',
      'https://i.imgs.ovh/2025/11/24/CLeGgY.jpeg'
    ]
  },
  {
    id: 'p_onehome',
    title: 'OneHome 品牌全案',
    category: 'Graphic',
    year: '2023',
    tags: ['品牌VI', '社群运营', '新媒体'],
    coverImage: 'https://i.imgs.ovh/2025/11/24/CLsRxp.png',
    description: 'OneHome家庭酒馆品牌视觉识别系统与新媒体运营全案。针对年轻群体社交需求打造。',
    challenge: '初创品牌如何在竞争激烈的线下社交市场中快速建立品牌认知与用户粘性？',
    solution: '确立了“家庭/归属”的温暖视觉基调，输出300+篇高质量原创内容，配合线下活动物料设计，成功构建7000+人的高活跃度社群，日客流量20+。',
    gallery: [
      'https://i.imgs.ovh/2025/11/24/CLsq9O.png',
      'https://i.imgs.ovh/2025/11/24/CLskv6.png',
      'https://i.imgs.ovh/2025/11/24/CLsRxp.png',
      'https://i.imgs.ovh/2025/11/24/CLsAnc.png',
      'https://i.imgs.ovh/2025/11/24/CLsVNm.png',
      'https://i.imgs.ovh/2025/11/24/CLsU4F.png'
    ]
  },
  {
    id: 'p_plc',
    title: 'PLC 智能报站系统',
    category: 'Interaction',
    year: '2023',
    tags: ['STM32', '汇编语言', '硬件交互'],
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    description: '基于STM32单片机与汇编语言开发的公交自动报站系统原型。',
    challenge: '需要使用底层汇编语言实现复杂的硬件驱动与逻辑控制，并设计符合直觉的物理交互界面。',
    solution: '设计了红绿灯模拟系统与报站逻辑。利用LCD显示屏与矩阵按键实现人机交互，支持线路切换与语音播报，代码运行稳定，硬件布局规范。',
    gallery: [
      'https://images.unsplash.com/photo-1555664424-778a18433566?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

export const INITIAL_CONTENT: ContentState = {
  personalInfo: PERSONAL_INFO,
  skills: SKILLS,
  resume: RESUME,
  projects: PROJECTS
};
