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
  liveDemo?: string;
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
    id: "bloodlink",
    title: "BloodLink",
    github: "https://github.com/dev-afrith/bloodlink",
    liveDemo: "https://bloodlink.afrith15.workers.dev/",
    description:
      "A healthcare platform connecting voluntary blood donors, hospitals and families who need blood in an emergency.",
    longDescription:
      "BloodLink bridges the gap between voluntary donors, hospital staff and people facing medical emergencies. Donors, hospital representatives and requesters get role-based access; requests carry clinical urgency tiers and can be tracked by reference through their whole lifecycle. The platform also ships WHO-aligned clinical calculators and educational guides, and is server-rendered on Cloudflare Workers for global edge delivery.",
    techStack: ["TanStack Start", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion", "Zod", "Cloudflare Workers"],
    highlights: [
      "Role-based access for donors, hospital staff and requesters",
      "Urgency-tiered requests with reference-based tracking",
      "WHO-aligned clinical calculators and guides",
      "Edge SSR deployed on Cloudflare Workers",
    ],
    featured: true,
    category: "Full Stack",
    gradient: "from-red-500/20 to-rose-600/20",
  },
  {
    id: "foodbridge",
    title: "FoodBridge",
    github: "https://github.com/dev-afrith/FoodBridge",
    liveDemo: "https://foodbridge-afrith.vercel.app/",
    description:
      "A social-impact platform where restaurants, shops and individuals list surplus food so it reaches people instead of landfill.",
    longDescription:
      "FoodBridge is built around one idea: surplus food can become someone's next meal. Donors submit surplus details across multiple food items, tag each item vegetarian, vegan, egg or non-vegetarian, and add a location. An impact calculator turns a donation into estimated meals and avoided emissions, and a confirmation screen closes the loop. Fully responsive with motion-led interactions throughout.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Multi-item donation form with dietary classification",
      "Impact calculator for meals and emissions",
      "Location-aware donation details",
      "Responsive, animation-led interface",
    ],
    featured: true,
    category: "Frontend",
    gradient: "from-emerald-500/20 to-lime-600/20",
  },
  {
    id: "bizgenie-ai",
    title: "BizGenie AI",
    github: "https://github.com/dev-afrith/bizgenie-ai",
    description:
      "A multi-agent AI platform for business research, market analysis and document intelligence.",
    longDescription:
      "BizGenie AI coordinates specialised agents over Google's Gemini API with CrewAI and LangChain. Agents research a business, run market analysis (SWOT, competitors, opportunities) and answer questions over uploaded PDF, DOCX and XLSX files through a ChromaDB-backed RAG pipeline. Output lands as PDF/DOCX reports or PPTX decks. FastAPI backend, PostgreSQL storage, React front end, Dockerised for deployment.",
    techStack: ["React", "FastAPI", "CrewAI", "LangChain", "Gemini API", "PostgreSQL", "ChromaDB", "Docker"],
    highlights: [
      "Multi-agent research and market analysis",
      "RAG over PDF, DOCX and XLSX documents",
      "Automated reports and slide decks",
      "Dockerised FastAPI + React architecture",
    ],
    featured: false,
    category: "AI / Web App",
    gradient: "from-violet-500/20 to-indigo-600/20",
  },
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
  {
    id: "mars-x",
    title: "MARS-X",
    github: "https://github.com/dev-afrith/mars-x",
    liveDemo: "https://mars-x-nasa.vercel.app/",
    description:
      "A Martian exploration console built for NASA Space Apps 2026: 3D terrain, hazard assessment and science-traverse routing.",
    longDescription:
      "MARS-X turns raw orbital Mars datasets into a working exploration console. A MapLibre globe runs in areocentric EPSG:104905 coordinates, with fused MGS MOLA (463 m/px) and MRO CTX (20 m/px) elevation driving slope and roughness hazard scoring. Routes are planned with admissible A* pathfinding and multi-stop ATSP optimisation, then intersected with USGS geology and TES thermal inertia layers, while a climatology engine interpolates the Mars Climate Database across solar longitude, latitude, longitude and local solar time. FastAPI backend, Next.js front end, 485 backend tests passing.",
    techStack: ["Next.js", "TypeScript", "FastAPI", "Python", "MapLibre GL", "Geospatial"],
    highlights: [
      "3D Mars globe in areocentric coordinates",
      "Hazard scoring from fused MOLA + CTX elevation",
      "A* routing with multi-stop ATSP optimisation",
      "485 backend tests passing",
    ],
    featured: true,
    category: "Geospatial",
    gradient: "from-orange-500/20 to-red-600/20",
  },
  {
    id: "calculator",
    title: "Advanced Calculator",
    github: "https://github.com/dev-afrith/Calculator",
    liveDemo: "https://calculator-afrith-15.vercel.app/",
    description:
      "A multi-mode calculator in vanilla JavaScript: scientific mode, BMI, unit and currency conversion, history and themes.",
    longDescription:
      "Built with plain HTML, CSS and JavaScript — no framework. Standard and scientific modes sit alongside BMI analysis with health insights, weight unit conversion and currency conversion from USD-based reference rates. Calculation history is kept locally, the layout ships light and dark themes, and a formula quick-reference sidebar plus keyboard shortcuts keep it fast to use.",
    techStack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Standard and scientific calculation modes",
      "BMI, unit and currency conversion tools",
      "Local history with keyboard shortcuts",
      "Light and dark themes, zero dependencies",
    ],
    featured: false,
    category: "Web App",
    gradient: "from-cyan-500/20 to-teal-600/20",
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
