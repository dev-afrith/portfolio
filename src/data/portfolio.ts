export const personalInfo = {
  name: "Muhammad Afrith",
  role: "Full Stack Developer / Mobile App Developer",
  location: "Dharmapuri, Tamil Nadu, India",
  email: "afrithafrith1507@gmail.com",
  phone: "+91 7397463508",
  portfolio: "muhammadafrithportfolio.vercel.app",
  linkedin: "https://www.linkedin.com/in/muhammad-afrith-d-661822327/",
  github: "https://github.com/dev-afrith",
  motto: "Code. Design. Build.",
  heroTagline:
    "Building scalable digital experiences through clean design, modern engineering, and immersive product thinking.",
  about: [
    "I am Muhammad Afrith, a Full-Stack and Mobile App Developer focused on building scalable, high-performance applications with a strong sense of product quality. I work across frontend interfaces, backend systems, and mobile experiences to create digital products that feel fast, reliable, and effortless to use.",
    "My work is shaped by clean UI/UX, thoughtful engineering, and a problem-solving mindset. I care about how an application looks, how it performs, and how confidently it can grow behind the scenes.",
    "I enjoy working with modern technologies to create seamless digital experiences where design clarity, performance, and maintainable code all move together.",
  ],
};

export interface Project {
  id: string;
  title: string;
  github: string;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  featured: boolean;
  category: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "tikizaya",
    title: "Tikizaya",
    github: "https://github.com/dev-afrith/Tiki_Zaya",
    description:
      "A production-ready social platform with real users, built for scale and performance.",
    longDescription:
      "Tikizaya is a flagship social platform designed with a mobile-first architecture, production-ready infrastructure, and scalable social-platform concepts. It demonstrates performance-focused engineering with clean UI/UX systems that serve real users.",
    techStack: ["Flutter", "Dart", "Firebase", "REST APIs", "Node.js"],
    highlights: [
      "Real users on production",
      "Production-ready architecture",
      "Mobile-first experience",
      "Scalable social-platform concepts",
      "Performance-focused engineering",
      "Clean UI/UX systems",
    ],
    featured: true,
    category: "Mobile App",
    gradient: "from-amber-500/20 to-orange-600/20",
  },
  {
    id: "skillsync",
    title: "SkillSync",
    github: "https://github.com/dev-afrith/Skill_Sync",
    description:
      "A collaboration platform for skill-sharing with product design thinking at its core.",
    longDescription:
      "SkillSync is a full-stack collaboration system designed with product thinking and user-focused workflows. It enables meaningful skill exchange through thoughtful UI/UX and robust backend integration.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Collaboration systems",
      "Product design thinking",
      "Full-stack integration",
      "User-focused workflows",
    ],
    featured: true,
    category: "Full Stack",
    gradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    id: "ridegram",
    title: "Ridegram",
    github: "https://github.com/dev-afrith/ridegram",
    description:
      "A modern ride-sharing concept application with sleek interface design and real-time features.",
    longDescription:
      "Ridegram is a ride-sharing application concept that combines clean UI design with practical transportation features. Built to showcase mobile-first design patterns and real-time data handling.",
    techStack: ["React Native", "Node.js", "MongoDB", "REST APIs"],
    highlights: [
      "Mobile-first design",
      "Real-time features",
      "Clean interface",
      "Transportation tech",
    ],
    featured: false,
    category: "Mobile App",
    gradient: "from-emerald-500/20 to-teal-600/20",
  },
  {
    id: "salary-payroll",
    title: "Salary Payroll Management",
    github: "https://github.com/dev-afrith/Salary-Payroll-Management-System",
    description:
      "An enterprise payroll management system with comprehensive salary tracking and reporting.",
    longDescription:
      "A comprehensive salary payroll management system designed for enterprise use. Features complete employee management, salary calculations, and detailed reporting — demonstrating backend engineering and database design capability.",
    techStack: ["Python", "MySQL", "Tkinter"],
    highlights: [
      "Enterprise-level design",
      "Database management",
      "Reporting system",
      "Salary calculations",
    ],
    featured: false,
    category: "Desktop App",
    gradient: "from-violet-500/20 to-purple-600/20",
  },
  {
    id: "zayathon-ai-debate",
    title: "Zayathon AI Debate",
    github: "https://github.com/dev-afrith/Zayathon-AI_Debate",
    description:
      "An AI-powered debate platform that enables intelligent discourse and argumentation practice.",
    longDescription:
      "Zayathon AI Debate is an innovative platform leveraging artificial intelligence to facilitate structured debates. It showcases AI integration, real-time processing, and thoughtful UX for educational technology.",
    techStack: ["React.js", "Node.js", "AI/ML APIs", "MongoDB"],
    highlights: [
      "AI integration",
      "Real-time processing",
      "Educational technology",
      "Structured argumentation",
    ],
    featured: false,
    category: "AI / Web App",
    gradient: "from-rose-500/20 to-pink-600/20",
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: "development" | "marketing";
}

export const experiences: Experience[] = [
  {
    id: "zaya-code-hub",
    role: "Mobile App Development Intern",
    company: "Zaya Code Hub",
    period: "March 2026 – April 2026",
    description: [
      "Developed and maintained cross-platform mobile applications using Flutter",
      "Focused on responsive UI design and smooth user experience",
      "Integrated REST APIs",
      "Fixed application bugs and optimized performance",
      "Collaborated on real-world projects with development teams",
    ],
    type: "development",
  },
  {
    id: "internpe",
    role: "Social Marketing Intern",
    company: "InternPe",
    period: "March 2026 – May 2026",
    description: [
      "Managed social media campaigns",
      "Created engaging digital content",
      "Improved audience reach and visibility",
      "Analyzed campaign metrics",
      "Contributed marketing strategies for engagement growth",
    ],
    type: "marketing",
  },
];

export interface TechCategory {
  name: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    name: "Frontend",
    items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    name: "Mobile",
    items: ["Flutter", "Dart", "React Native", "Android Studio"],
  },
  {
    name: "Databases & Cloud",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
  },
  {
    name: "Deployment & Tools",
    items: ["Git", "GitHub", "Docker", "Vercel", "Netlify"],
  },
];

export const coreSkills = ["Python", "C", "Java", "React", "SQL"];

export const currentlyLearning = ["Flutter"];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
