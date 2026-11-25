export type ProjectItem = {
  slug: string;
  idx: string;
  category: string;
  title: string;
  subtitle: string;
  hue: string;
  cover: string;
  alt: string;
  seoDescription: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  implementation: string;
  results: string[];
  stack: string[];
  apkMeta?: string;
  links: { github: string; live: string; apk?: string };
};

export const PROJECTS: ProjectItem[] = [
  {
    slug: "bloodlink",
    idx: "01",
    category: "HEALTHCARE",
    title: "BloodLink",
    subtitle: "Healthcare donor platform",
    hue: "#FF4D2E",
    cover: "/covers/bloodlink.jpg",
    alt: "BloodLink — donor network interface",
    seoDescription:
      "BloodLink connects voluntary blood donors, hospitals, and families during emergencies. Built by Muhammad Afrith with TanStack Start, TypeScript, and Tailwind CSS.",
    summary: "Donor network for hospitals and families in emergencies.",
    overview:
      "BloodLink connects voluntary blood donors, hospitals, and families who need blood in an emergency. The platform streamlines urgent donor discovery with clear blood-group filtering and rapid request workflows.",
    problem:
      "Finding compatible blood donors during medical emergencies is often fragmented across informal groups and delayed by manual coordination.",
    solution:
      "BloodLink centralizes donor availability, hospital requests, and family outreach into a single fast, mobile-ready web interface built for urgent action.",
    implementation:
      "Built using TanStack Start, TypeScript, and Tailwind CSS, deployed on Cloudflare Workers for low-latency global access.",
    results: [
      "Direct donor-to-hospital emergency connection flow",
      "Blood-group and location-aware request filtering",
      "Fast, responsive interface for mobile emergencies",
      "Deployed on Cloudflare Workers",
    ],
    stack: ["TanStack Start", "TypeScript", "Tailwind CSS"],
    links: {
      github: "https://github.com/dev-afrith/bloodlink",
      live: "https://bloodlink.afrith15.workers.dev/",
    },
  },
  {
    slug: "foodbridge",
    idx: "02",
    category: "SOCIAL IMPACT",
    title: "FoodBridge",
    subtitle: "Surplus food rescue platform",
    hue: "#A8B545",
    cover: "/covers/foodbridge.jpg",
    alt: "FoodBridge — surplus food marketplace interface",
    seoDescription:
      "FoodBridge helps restaurants, shops, and individuals list surplus food so it reaches people instead of landfill. Built with React, TypeScript, and Vite.",
    summary: "Surplus-food marketplace so good food reaches people.",
    overview:
      "FoodBridge is built around one idea: surplus food can become someone's next meal. Donors submit surplus details across multiple food items, tag dietary preferences, and add a location so food reaches people instead of landfill.",
    problem:
      "A social-impact gap where restaurants, shops, and individuals have edible surplus food with no quick way to route it to people nearby.",
    solution:
      "FoodBridge lets donors list multi-item surplus food with dietary tags, location details, and a clear confirmation loop so surplus reaches people quickly.",
    implementation:
      "Built using React, TypeScript, and Vite with responsive layouts and motion-led interactions, deployed on Vercel.",
    results: [
      "Multi-item donation form with dietary classification",
      "Location-aware surplus food listing details",
      "Clear confirmation loop for food donors",
      "Responsive interface deployed on Vercel",
    ],
    stack: ["React", "TypeScript", "Vite"],
    links: {
      github: "https://github.com/dev-afrith/FoodBridge",
      live: "https://foodbridge-afrith.vercel.app/",
    },
  },
  {
    slug: "bizgenie-ai",
    idx: "03",
    category: "AI PLATFORM",
    title: "BizGenie AI",
    subtitle: "Multi-agent research platform",
    hue: "#2E5BFF",
    cover: "/covers/bizgenie.svg",
    alt: "BizGenie AI — multi-agent research workspace",
    seoDescription:
      "BizGenie AI is a multi-agent platform for business research, market analysis, and document intelligence built by Muhammad Afrith using Python and LLM tooling.",
    summary: "Multi-agent research for markets and documents.",
    overview:
      "BizGenie AI is a multi-agent AI platform for business research, market analysis, and document intelligence. It coordinates specialized agents to synthesize structured insights from business documents and market queries.",
    problem:
      "Business research and document review require synthesizing scattered market signals and lengthy files manually.",
    solution:
      "BizGenie AI orchestrates multiple specialized LLM agents across a unified workspace for market analysis and document intelligence.",
    implementation:
      "Built with Python and LLM tooling using a multi-agent pipeline designed for structured business research.",
    results: [
      "Multi-agent orchestration for research tasks",
      "Automated market analysis and synthesis",
      "Document intelligence workflow for long files",
      "Currently in beta",
    ],
    stack: ["Python", "LLM tooling"],
    links: {
      github: "https://github.com/dev-afrith/bizgenie-ai",
      live: "",
    },
  },
  {
    slug: "tikizaya",
    idx: "04",
    category: "MOBILE APP",
    title: "Tikizaya",
    subtitle: "Production social platform",
    hue: "#6B4EFF",
    cover: "/covers/tikizaya.svg",
    alt: "Tikizaya — mobile social feed interface",
    seoDescription:
      "Tikizaya is a production-ready social platform with real users, built for scale and performance using Flutter, Dart, Firebase, REST APIs, and Node.js.",
    summary: "Production social platform with real users.",
    overview:
      "Tikizaya is a production-ready social platform serving real users with a mobile-first architecture. It focuses on smooth feed interactions, reliable backend sync, and performance-focused engineering.",
    problem:
      "Building a social platform that stays responsive and reliable for real users on mobile networks requires careful state and API design.",
    solution:
      "Tikizaya delivers a clean mobile-first social feed backed by scalable real-time data and REST API integration.",
    implementation:
      "Built using Flutter, Dart, Firebase, REST APIs, and Node.js with production-ready architecture.",
    results: [
      "Production-ready social platform with real users",
      "Mobile-first UI/UX systems in Flutter",
      "Scalable Firebase and Node.js backend integration",
      "Performance-focused engineering",
    ],
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "Node.js"],
    links: { github: "https://github.com/dev-afrith/Tiki_Zaya", live: "" },
  },
  {
    slug: "skillsync",
    idx: "05",
    category: "FULL STACK",
    title: "SkillSync",
    subtitle: "Skill-sharing collaboration platform",
    hue: "#E8A33D",
    cover: "/covers/skillsync.svg",
    alt: "SkillSync — skill-sharing collaboration interface",
    seoDescription:
      "SkillSync is a full-stack collaboration platform for skill-sharing built with product design thinking using React, Node.js, Express.js, and MongoDB.",
    summary: "Skill-sharing collaboration platform.",
    overview:
      "SkillSync is a full-stack collaboration platform for skill-sharing, built with product design thinking at its core. It connects learners and peers through structured profiles and project-based exchange.",
    problem:
      "Peers looking to exchange technical and creative skills lack a focused, design-led space to match and collaborate.",
    solution:
      "SkillSync pairs clean profile discovery with structured skill-sharing workflows across a full-stack web app.",
    implementation:
      "Built with React, Node.js, Express.js, and MongoDB using RESTful APIs and user-focused workflows.",
    results: [
      "Full-stack skill-sharing and matching workflows",
      "Product design thinking across user flows",
      "Express.js and MongoDB backend integration",
      "Clean, collaborative interface",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    links: { github: "https://github.com/dev-afrith/Skill_Sync", live: "" },
  },
  {
    slug: "ridegram",
    idx: "06",
    category: "MOBILE APP",
    title: "Ridegram",
    subtitle: "Ride-sharing concept app",
    hue: "#2F9E8F",
    cover: "/covers/ridegram.svg",
    alt: "Ridegram — ride-sharing route and fare interface",
    seoDescription:
      "Ridegram is a ride-sharing concept app with a sleek interface and real-time features built by Muhammad Afrith with React Native, Node.js, and MongoDB.",
    summary: "Ride-sharing concept with real-time features.",
    overview:
      "Ridegram is a ride-sharing concept app combining a sleek mobile-first interface with real-time transportation features. It explores route clarity, trip state updates, and clean booking flows.",
    problem:
      "Ride-sharing interfaces often overwhelm riders with clutter during time-sensitive bookings.",
    solution:
      "Ridegram focuses on a streamlined route view, clear fare summary, and real-time ride state handling.",
    implementation:
      "Built as a concept app using React Native, Node.js, and MongoDB.",
    results: [
      "Sleek mobile-first ride-booking interface",
      "Real-time ride and route state handling",
      "Node.js and MongoDB backend concept",
      "Clean, low-friction booking flow",
    ],
    stack: ["React Native", "Node.js", "MongoDB"],
    links: { github: "https://github.com/dev-afrith/ridegram", live: "" },
  },
  {
    slug: "salary-payroll",
    idx: "07",
    category: "DESKTOP APP",
    title: "Salary Payroll Management",
    subtitle: "Enterprise payroll system",
    hue: "#5B6470",
    cover: "/covers/salary-payroll.svg",
    alt: "Salary Payroll Management — payroll dashboard interface",
    seoDescription:
      "Salary Payroll Management is an enterprise payroll system with salary tracking and reporting built with Python, MySQL, and Tkinter by Muhammad Afrith.",
    summary: "Enterprise payroll, tracking and reporting.",
    overview:
      "An enterprise payroll management system designed for structured employee records, automated salary calculations, and detailed reporting. Built to simplify administrative payroll workflows.",
    problem:
      "Manual payroll tracking and salary calculation across employee records is error-prone and time-consuming.",
    solution:
      "The system centralizes employee records, automated salary breakdowns, and exportable reporting in one admin tool.",
    implementation:
      "Built with Python, MySQL, and Tkinter with relational database design for reliable payroll records.",
    results: [
      "Automated salary tracking and calculations",
      "Structured MySQL database schema",
      "Admin-focused reporting workflows",
      "Desktop interface built with Tkinter",
    ],
    stack: ["Python", "MySQL", "Tkinter"],
    links: { github: "https://github.com/dev-afrith/Salary-Payroll-Management-System", live: "" },
  },
  {
    slug: "zayathon-ai-debate",
    idx: "08",
    category: "AI / WEB APP",
    title: "Zayathon AI Debate",
    subtitle: "AI debate practice platform",
    hue: "#C4735A",
    cover: "/covers/zayathon-ai-debate.jpg",
    alt: "Zayathon AI Debate — debate practice interface",
    seoDescription:
      "Zayathon AI Debate is an AI-powered debate platform for structured argumentation practice, built with React.js, Node.js, AI/ML APIs, and MongoDB.",
    summary: "AI debate platform for argumentative practice.",
    overview:
      "Zayathon AI Debate is an AI-powered debate platform built for structured argumentation practice. Visitors can test positions, receive AI counterarguments, and sharpen critical thinking in real time.",
    problem:
      "Practicing structured debate and counterargumentation is difficult without an always-available, structured opponent.",
    solution:
      "Zayathon AI Debate provides interactive AI-driven debate rounds with real-time response generation.",
    implementation:
      "Built with React.js, Node.js, AI/ML APIs, and MongoDB, live on Vercel.",
    results: [
      "AI-powered structured debate rounds",
      "Real-time argument and rebuttal generation",
      "Educational UX for argumentation practice",
      "Live on Vercel",
    ],
    stack: ["React.js", "Node.js", "AI/ML APIs", "MongoDB"],
    links: {
      github: "https://github.com/dev-afrith/Zayathon-AI_Debate",
      live: "https://aidebate-zayathon.vercel.app",
    },
  },
  {
    slug: "notes-app",
    idx: "09",
    category: "ANDROID",
    title: "Notes App",
    subtitle: "Android Material 3 notes app",
    hue: "#E0459B",
    cover: "/covers/notes-app.svg",
    alt: "Notes App — Android Material 3 interface",
    seoDescription:
      "Notes App is an offline Android notes application built with Kotlin, Jetpack Compose, and Material 3 by Muhammad Afrith, with APK available on GitHub.",
    summary: "Android notes app, Kotlin and Jetpack Compose, Material 3.",
    overview:
      "An Android notes app built natively with Kotlin and Jetpack Compose, featuring offline-first local storage and a clean Material 3 interface. Packaged as a downloadable APK on GitHub Releases.",
    problem:
      "Lightweight note-taking apps often require accounts or network access when users just want fast offline capture.",
    solution:
      "Notes App provides instant offline note creation, search, and organization in a native Material 3 Android experience.",
    implementation:
      "Built with Kotlin, Jetpack Compose, and Material 3 with offline local storage.",
    results: [
      "Offline-first local note storage",
      "Native Material 3 UI in Jetpack Compose",
      "Fast search and clean card layout",
      "Installable APK published on GitHub",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Material 3"],
    apkMeta: "ANDROID 8+ · 11.3 MB · V1.0",
    links: {
      apk: "https://github.com/dev-afrith/NotesApp/releases/latest/download/NotesApp.apk",
      github: "https://github.com/dev-afrith/NotesApp",
      live: "",
    },
  },
];

