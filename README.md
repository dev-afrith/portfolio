# Muhammad Afrith — Premium Developer Portfolio

A cinematic, interactive, and highly optimized developer portfolio showcasing full-stack and mobile application engineering. This website is built using **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Three.js (React Three Fiber)**, and **Lenis** smooth scrolling.

Live Site: [muhammadafrithportfolio.vercel.app](https://muhammadafrithportfolio.vercel.app)

---

## ✨ Features

- 🎬 **Cinematic Loading Screen**: A custom preloader that animates your name letter-by-letter with a warm golden glow.
- 🌌 **3D Particle Field**: An interactive Three.js particle background that responds dynamically to mouse movement (with automatic scroll pass-through on mobile devices).
- 📱 **Modern Mobile Navigation**: A sleek, glassmorphic dropdown menu replacing full-screen overlays for a compact, intuitive navigation experience.
- 🖼️ **Ambient Project Showcases**: A responsive grid containing screenshots of live products. Clicking on any project launches an immersive detail modal styled with blurred background backdrops matching the project's brand colors.
- 💼 **2-Column Timeline Experience**: Clean, spaced, and fully responsive experience layout designed with modern card hover effects.
- 🎯 **Interactive Tech Bubbles**: A floating pill-based skill matrix with micro-interactive animations and a dedicated "Core Skills" highlight deck.
- ✉️ **Center-Aligned Contact Section**: Split-grid layout with boxed contact and social links (GitHub & LinkedIn logos) on the left, and a vertically centered contact form on the right.
- 🚀 **SEO & Hydration Optimized**:
  - Eliminates the blank white screen flash on load via inline style rendering.
  - Complete metadata, canonical tags, Open Graph imagery, and JSON-LD Person schema.
  - Search engine friendly `robots.txt` and `sitemap.xml`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Core React framework & Static Site Generation (SSG) |
| **TypeScript** | Strict compile-time type safety |
| **Tailwind CSS v4** | Modern CSS styling and utility configurations |
| **Framer Motion** | Physics-based micro-interactions and scroll entry animations |
| **Three.js & React Three Fiber** | Parallax 3D ambient particle system |
| **Lenis** | Smooth wheel and touch scroll animation physics |

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, meta tagging, and JSON-LD schema
│   ├── page.tsx            # Main page composition of all sections
│   ├── globals.css         # Custom tokens, reset classes, and responsive styles
│   ├── robots.ts           # Dynamic SEO robots rules
│   └── sitemap.ts          # Automated sitemap generator
├── components/
│   ├── Loader.tsx          # Cinematic preloader component
│   ├── Navbar.tsx          # Navigation header with mobile dropdown
│   ├── Hero.tsx            # Headline and call-to-actions
│   ├── HeroCanvas.tsx      # R3F particle scene wrapper
│   ├── About.tsx           # Bio stats and intro text
│   ├── Projects.tsx        # Project card grid
│   ├── ProjectModal.tsx    # Details modal with blurred screenshot backdrop
│   ├── Experience.tsx      # Timeline details grid
│   ├── TechStack.tsx       # Skill matrix and core skill cards
│   ├── Contact.tsx         # Contact info and form layout
│   └── Footer.tsx          # Single-row animated footer
└── data/
    └── portfolio.ts        # Single source of truth for text, data, and social links
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dev-afrith/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to view the application locally.

4. **Build for production:**
   ```bash
   npm run build
   ```
   This compiles the Next.js app and outputs optimized static pages in the `.next` directory.

---

## 🔧 Deployment & Customization

### 1. Vercel Deployment

This project includes a [vercel.json](file:///d:/Afrith/Projects/my-portfolio/vercel.json) file that automatically configures Vercel to use the **Next.js** framework builder.
To deploy:
- Push your changes to GitHub.
- Connect your repository to Vercel.
- Vercel will auto-detect the project configuration and deploy.

### 2. Updating Personal Information

All data displayed on the portfolio is configured inside [portfolio.ts](file:///d:/Afrith/Projects/my-portfolio/src/data/portfolio.ts). You can easily update your name, emails, socials, descriptions, projects, and work history by changing the JSON values in this file.

### 3. Adding Your Resume

Simply place your resume PDF file in the `public` directory and name it `resume.pdf` (`public/resume.pdf`). The download buttons in the Hero section and Navbar will automatically reference this file.

### 4. Updating Project Screenshots

Store your project mockups in the `public/projects` folder named exactly after the project's ID in `portfolio.ts` (e.g. `public/projects/tikizaya.png`). The portfolio cards and detail modal backdrops will load them automatically.

### 5. Google Search Console Verification

To verify your site ownership on Google Search Console:
1. Copy your verification token from Search Console.
2. Add an environment variable in Vercel:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - **Value**: `[your-token-here]`
3. Re-deploy. The metadata tag will automatically render in the page source.
