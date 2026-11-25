"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";

const SKILL_BOXES = [
  {
    title: "Frontend Development",
    dot: "#E8B77C",
    bg: "rgba(232, 183, 124, 0.12)",
    a45: "rgba(232, 183, 124, 0.45)",
    a25: "rgba(232, 183, 124, 0.25)",
    a18: "rgba(232, 183, 124, 0.18)",
    items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    dot: "#8FB8F0",
    bg: "rgba(143, 184, 240, 0.12)",
    a45: "rgba(143, 184, 240, 0.45)",
    a25: "rgba(143, 184, 240, 0.25)",
    a18: "rgba(143, 184, 240, 0.18)",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Mobile Development",
    dot: "#7FCFA8",
    bg: "rgba(127, 207, 168, 0.12)",
    a45: "rgba(127, 207, 168, 0.45)",
    a25: "rgba(127, 207, 168, 0.25)",
    a18: "rgba(127, 207, 168, 0.18)",
    items: ["Flutter", "Dart", "React Native", "Android Studio"],
  },
  {
    title: "Database & Cloud",
    dot: "#C9A6F0",
    bg: "rgba(201, 166, 240, 0.12)",
    a45: "rgba(201, 166, 240, 0.45)",
    a25: "rgba(201, 166, 240, 0.25)",
    a18: "rgba(201, 166, 240, 0.18)",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
  },
  {
    title: "Build & Deployment Tools",
    dot: "#E0B076",
    bg: "rgba(224, 176, 118, 0.12)",
    a45: "rgba(224, 176, 118, 0.45)",
    a25: "rgba(224, 176, 118, 0.25)",
    a18: "rgba(224, 176, 118, 0.18)",
    items: ["Git", "GitHub", "Vercel", "Netlify", "Docker"],
  },
];

function TechLogo({ name, color }: { name: string; color: string }) {
  const s = { width: 14, height: 14, flexShrink: 0, color, opacity: 0.7 } as const;
  switch (name) {
    case "React":
    case "React.js":
    case "React Native":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </svg>
      );
    case "Next.js":
    case "Vercel":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12,3 22,20 2,20" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 10c2-3 5-3 7 0s5 3 9 0" />
          <path d="M4 16c2-3 5-3 7 0s5 3 9 0" />
        </svg>
      );
    case "Vite":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13,2 4,14 11,14 10,22 20,10 13,10" />
        </svg>
      );
    case "Flutter":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 3 5 12l3 3L20 3h-6Z" />
          <path d="M14 13 9 18l5 3h6l-6-8Z" />
        </svg>
      );
    case "Node.js":
    case "Docker":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
        </svg>
      );
    case "PostgreSQL":
    case "MongoDB":
    case "MySQL":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
          <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
      );
    case "Git":
    case "GitHub":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <path d="M6 8.5v7M8.5 6H15a3 3 0 0 1 3 3v6.5" />
        </svg>
      );
    default:
      return (
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 4,
            border: "1px solid currentColor",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            fontWeight: 700,
            lineHeight: 1,
            flexShrink: 0,
            color,
            opacity: 0.7,
          }}
          aria-hidden="true"
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      );
  }
}

const EXPERIENCES = [
  {
    date: "MARCH 2026 — APRIL 2026",
    role: "Mobile App Development Intern",
    company: "Zaya Code Hub",
    badge: "DEVELOPMENT",
    badgeStyle: {
      color: "#7FCFA8",
      background: "rgba(127, 207, 168, 0.12)",
      border: "1px solid rgba(127, 207, 168, 0.28)",
    },
    bullets: [
      "Developed and maintained cross-platform mobile applications using Flutter",
      "Focused on responsive UI design and smooth user experience",
      "Integrated REST APIs",
      "Fixed application bugs and optimized performance",
      "Collaborated on real-world projects with development teams",
    ],
  },
  {
    date: "MARCH 2026 — MAY 2026",
    role: "Social Marketing Intern",
    company: "InternPe",
    badge: "MARKETING",
    badgeStyle: {
      color: "#8FB8F0",
      background: "rgba(143, 184, 240, 0.12)",
      border: "1px solid rgba(143, 184, 240, 0.28)",
    },
    bullets: [
      "Managed social media campaigns",
      "Created engaging digital content",
      "Improved audience reach and visibility",
      "Analyzed campaign metrics",
      "Contributed marketing strategies for engagement growth",
    ],
  },
];

const MARQUEE = [
  "TypeScript", "React", "Next.js", "TanStack Start", "Flutter",
  "Kotlin", "Node.js", "PostgreSQL", "MongoDB", "Python", "Docker", "Firebase",
];

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function AskIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

function SmallDownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [activeIdx, setActiveIdx] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [scrollPct, setScrollPct] = useState(11.1);
  const trackRef = useRef<HTMLDivElement>(null);

  const syncCarousel = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = (el.querySelector(".aw-pcard")?.getBoundingClientRect().width || 320) + 16;
    setActiveIdx(Math.min(PROJECTS.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    const max = el.scrollWidth - el.clientWidth;
    setScrollPct(max > 0 ? Math.max(11.1, (el.scrollLeft / max) * 100) : 100);
  };

  const scrollCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const step = (el.querySelector(".aw-pcard")?.getBoundingClientRect().width || 320) + 16;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const els = document.querySelectorAll(".aw-reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 6) * 60}ms`;
      io.observe(el);
    });

    const sections = ["about", "projects", "skills", "experience", "contact"];
    const onScroll = () => {
      for (const id of sections) {
        const node = document.getElementById(id);
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          setActiveNav(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mojkqbgy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", mobile: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <header className="aw-nav-wrap">
        <div className="aw-nav-pill">
          <Link href="/" style={{ fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em" }}>
            Muhammad Afrith
          </Link>
          <nav className="aw-nav-links" aria-label="Primary">
            {[
              ["about", "About"],
              ["projects", "Projects"],
              ["experience", "Experience"],
              ["skills", "Skills"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`aw-nav-link ${activeNav === id ? "is-active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="aw-mobile-bar">
          <Link href="/" style={{ fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em" }}>
            Muhammad Afrith
          </Link>
          <button
            type="button"
            className="aw-menu-icon-btn"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line x1="4" x2="20" y1="7" y2="7" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="17" y2="17" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="aw-mobile-sheet" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "44px" }}>
              <span style={{ fontWeight: 600, fontSize: "15px" }}>Muhammad Afrith</span>
              <button
                type="button"
                className="aw-menu-icon-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }} aria-label="Mobile">
              {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontSize: "24px", minHeight: "48px", display: "flex", alignItems: "center", color: "#F5F3EF" }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main id="main-content">
        <section className="aw-hero">
          <div className="aw-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="aw-eyebrow">
              <span className="aw-eyebrow-rule" aria-hidden="true" />
              <span className="aw-label aw-fade-up" style={{ animationDelay: "180ms" }}>
                FULL STACK DEVELOPER / MOBILE APP DEVELOPER
              </span>
            </div>

            <h1 className="aw-display" style={{ marginTop: "28px" }}>
              {["Muhammad", "Afrith"].map((word, idx) => (
                <span key={word} className="aw-word-wrap" style={{ marginInline: "0.14em" }}>
                  <span className="aw-word" style={{ animationDelay: `${280 + idx * 60}ms` }}>
                    {word.split("").map((ch, cIdx) => (
                      <span key={`${word}-${cIdx}`} className="aw-hero-char">
                        {ch}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="aw-fade-up"
              style={{
                marginTop: "24px",
                fontSize: "clamp(18px, 1.6vw, 22px)",
                fontWeight: 500,
                color: "var(--gold-text)",
                maxWidth: "56ch",
                animationDelay: "460ms",
              }}
            >
              Full-stack products built with design intent and engineering discipline.
            </p>

            <p
              className="aw-fade-up"
              style={{
                marginTop: "14px",
                color: "var(--ink-3)",
                maxWidth: "56ch",
                animationDelay: "540ms",
              }}
            >
              Third-year Computer Science student in Dharmapuri, building web and mobile products
              end to end.
            </p>

            <div
              className="aw-fade-up aw-hero-actions"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
                marginTop: "32px",
                animationDelay: "660ms",
              }}
            >
              <a href="#projects" className="aw-btn-primary">
                View Projects <ArrowIcon />
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="aw-btn-secondary">
                <DownloadIcon /> Résumé
              </a>
              <a href="#contact" className="aw-btn-secondary">
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </section>

        <div className="aw-divider" />

        <section id="about" className="aw-section">
          <div className="aw-container">
            <div className="aw-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "24px", height: "1px", background: "var(--gold-text)" }} aria-hidden="true" />
              <span className="aw-label">ABOUT</span>
            </div>
            <h2
              className="aw-reveal"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.4vw, 56px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.06,
                color: "#F5F3EF",
                marginTop: "16px",
                marginBottom: "36px",
                maxWidth: "22ch",
              }}
            >
              Building products that feel <span style={{ color: "#E8B77C" }}>fast</span>,{" "}
              <span style={{ color: "#E8B77C" }}>reliable</span>, and{" "}
              <span style={{ color: "#E8B77C" }}>effortless</span>.
            </h2>

            <div className="aw-about-grid">
              <div className="aw-exp-card aw-reveal">
                <p className="aw-label" style={{ color: "#E8B77C", letterSpacing: "0.22em" }}>
                  WHO I AM
                </p>
                <div style={{ display: "grid", gap: "16px", marginTop: "16px", color: "#B9B5AD", fontSize: "15px", lineHeight: 1.7 }}>
                  <p>
                    I am Muhammad Afrith, a Full-Stack and Mobile App Developer and third-year
                    Computer Science &amp; Engineering student (graduating 2028) focused on
                    building scalable, high-performance applications with a strong sense of product
                    quality.
                  </p>
                  <p>
                    My work is shaped by clean UI/UX, thoughtful engineering, and a problem-solving
                    mindset. I care about how an application looks, how it performs, and how
                    confidently it can grow behind the scenes.
                  </p>
                  <p>
                    I enjoy working with modern technologies to create seamless digital experiences
                    where design clarity, performance, and maintainable code all move together.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px" }}>
                <div className="aw-exp-card aw-reveal" style={{ padding: "28px" }}>
                  <p className="aw-label" style={{ color: "#E8B77C", letterSpacing: "0.22em" }}>
                    CURRENT FOCUS
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 600, color: "#F5F3EF", marginTop: "12px" }}>
                    Full Stack Developer / Mobile App Developer
                  </p>
                  <p style={{ fontSize: "14px", color: "#A8A49C", marginTop: "6px" }}>
                    Code. Design. Build.
                  </p>
                </div>

                <div className="aw-exp-card aw-reveal" style={{ padding: "28px" }}>
                  <p className="aw-label" style={{ color: "#E8B77C", letterSpacing: "0.22em" }}>
                    PORTFOLIO DIRECTION
                  </p>
                  <p style={{ fontSize: "14px", color: "#A8A49C", marginTop: "12px", lineHeight: 1.65 }}>
                    Product-first development focused on maintainable code, polished UX, and
                    scalable delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="aw-stats-row">
              {[
                ["9", "PROJECTS"],
                ["21+", "TECHNOLOGIES"],
                ["2", "EXPERIENCE ENTRIES"],
                ["Dharmapuri", "LOCATION"],
              ].map(([val, label]) => (
                <div key={label} className="aw-stat-card aw-reveal">
                  <p style={{ fontSize: "22px", fontWeight: 600, color: "#E8B77C", lineHeight: 1.2 }}>
                    {val}
                  </p>
                  <p className="aw-label" style={{ marginTop: "8px", color: "#6E6A63" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="aw-divider" />

        <section id="projects" className="aw-section">
          <div className="aw-container">
            <div className="aw-projects-head aw-reveal">
              <div>
                <p className="aw-label">SELECTED WORK — 09</p>
                <h2 className="aw-h2" style={{ marginTop: "16px" }}>
                  Things I&apos;ve shipped
                </h2>
              </div>
              <div className="aw-carousel-controls">
                <span className="aw-label" style={{ color: "var(--ink)" }}>
                  {String(activeIdx + 1).padStart(2, "0")} / 09
                </span>
                <button
                  type="button"
                  className="aw-arrow-btn"
                  onClick={() => scrollCard(-1)}
                  disabled={!canPrev}
                  aria-label="Previous project"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="aw-arrow-btn"
                  onClick={() => scrollCard(1)}
                  disabled={!canNext}
                  aria-label="Next project"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div
            ref={trackRef}
            className="aw-track"
            tabIndex={0}
            role="region"
            aria-label="Selected projects carousel"
            onScroll={syncCarousel}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") scrollCard(1);
              if (e.key === "ArrowLeft") scrollCard(-1);
            }}
          >
            {PROJECTS.map((p) => {
              const shown = p.stack.slice(0, 3);
              const extra = p.stack.length - shown.length;
              return (
                <div key={p.idx} className="aw-pcard">
                  <Link
                    href={`/projects/${p.slug}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 auto",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div className="aw-pcard-cover">
                      <Image
                        src={p.cover}
                        alt={p.alt}
                        width={1200}
                        height={750}
                        sizes="(max-width:640px) 84vw, 30vw"
                        priority={p.idx === "01"}
                      />
                    </div>
                    <div className="aw-pcard-body" style={{ minHeight: "auto", paddingBottom: "12px" }}>
                      <span className="aw-label">{p.idx}</span>
                      <span className="aw-pcard-title">{p.title}</span>
                      <p className="aw-pcard-summary">{p.summary}</p>
                      {shown.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                          {shown.map((t) => (
                            <span key={t} className="aw-chip">
                              {t}
                            </span>
                          ))}
                          {extra > 0 && <span className="aw-chip">+{extra}</span>}
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="aw-pill-row" style={{ padding: "0 20px 20px", marginTop: 0 }}>
                    {p.links.apk?.startsWith("https://") && (
                      <a
                        href={p.links.apk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aw-pill-btn aw-pill-btn-live"
                      >
                        <SmallDownloadIcon />
                        Install APK
                      </a>
                    )}
                    {p.links.live.startsWith("https://") && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aw-pill-btn aw-pill-btn-live"
                      >
                        <ExternalIcon />
                        Live
                      </a>
                    )}
                    {p.links.github.startsWith("https://") && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aw-pill-btn"
                      >
                        <GithubIcon />
                        GitHub
                      </a>
                    )}
                    <button
                      type="button"
                      className="aw-pill-btn aw-pill-btn-ask"
                      onClick={() => {
                        const w = window as unknown as { AfrithAgent?: { ask?: (q: string) => void } };
                        w.AfrithAgent?.ask?.(`Tell me about ${p.title}`);
                      }}
                    >
                      <AskIcon />
                      Ask
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="aw-container">
            <div className="aw-progress-line" aria-hidden="true">
              <div className="aw-progress-fill" style={{ width: `${scrollPct}%` }} />
            </div>
          </div>
        </section>

        <div className="aw-divider" />

        <section id="skills" className="aw-skills-section">
          <div className="aw-marquee" aria-hidden="true">
            <div className="aw-marquee-track">
              {[...MARQUEE, ...MARQUEE].map((item, i) => (
                <span key={`${item}-${i}`} className="aw-label" style={{ color: "var(--ink-2)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="aw-container">
            <p className="aw-label aw-reveal">SKILLS</p>
            <h2 className="aw-h2 aw-reveal" style={{ marginTop: "16px", marginBottom: "40px" }}>
              Technical stack
            </h2>
            <div className="aw-skills-grid">
              {SKILL_BOXES.map((box) => (
                <div
                  key={box.title}
                  className="aw-skill-box aw-reveal"
                  style={
                    {
                      "--accent-45": box.a45,
                      "--accent-25": box.a25,
                      "--accent-18": box.a18,
                    } as React.CSSProperties
                  }
                >
                  <div className="aw-skill-icon" style={{ background: box.bg }}>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "999px",
                        background: box.dot,
                        display: "inline-block",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#F5F3EF",
                      marginTop: "18px",
                      lineHeight: 1.2,
                    }}
                  >
                    {box.title}
                  </h3>
                  <div className={box.items.length > 6 ? "aw-skill-pills-two" : "aw-skill-pills"}>
                    {box.items.map((item) => (
                      <span key={item} className="aw-skill-chip">
                        <TechLogo name={item} color={box.dot} />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="aw-divider" />

        <section id="experience" className="aw-section" style={{ paddingTop: "clamp(72px, 10vh, 120px)" }}>
          <div className="aw-container">
            <div className="aw-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "24px", height: "1px", background: "var(--gold-text)" }} aria-hidden="true" />
              <span className="aw-label">EXPERIENCE</span>
            </div>
            <h2
              className="aw-reveal"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.4vw, 56px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "#F5F3EF",
                marginTop: "16px",
                marginBottom: "40px",
              }}
            >
              Professional <span style={{ color: "#E8B77C" }}>journey &amp; growth</span>.
            </h2>

            <div className="aw-exp-grid">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.company}
                  tabIndex={0}
                  className="aw-exp-card aw-reveal"
                  style={
                    {
                      "--badge-glow":
                        exp.badge === "DEVELOPMENT"
                          ? "rgba(127, 207, 168, 0.35)"
                          : "rgba(143, 184, 240, 0.35)",
                    } as React.CSSProperties
                  }
                >
                  <p
                    className="aw-label"
                    style={{ color: "#E8B77C", letterSpacing: "0.22em" }}
                  >
                    {exp.date}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#F5F3EF",
                      marginTop: "10px",
                      lineHeight: 1.2,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#A8A49C", marginTop: "4px" }}>
                    {exp.company}
                  </p>
                  <span className="aw-exp-badge" style={exp.badgeStyle}>
                    {exp.badge}
                  </span>
                  <ul className="aw-exp-list">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="aw-divider" />
      </main>

      <footer
        id="contact"
        className="aw-section"
        style={{ scrollMarginTop: "96px", paddingBottom: "max(48px, env(safe-area-inset-bottom))" }}
      >
        <div className="aw-container">
          <div className="aw-contact-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "24px", height: "1px", background: "var(--gold-text)" }} aria-hidden="true" />
                <span className="aw-label">GET IN TOUCH</span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4.2vw, 52px)",
                  fontWeight: 600,
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  color: "#F5F3EF",
                  marginTop: "16px",
                }}
              >
                Let&apos;s build something <span style={{ color: "#E8B77C" }}>great</span> together.
              </h2>
              <p style={{ color: "var(--ink-2)", fontSize: "15px", lineHeight: 1.7, maxWidth: "46ch", marginTop: "16px" }}>
                Have a project in mind or want to collaborate? Reach out and I&apos;ll respond as
                soon as possible.
              </p>

              <div style={{ display: "grid", gap: "16px", marginTop: "32px" }}>
                <a href="mailto:afrithafrith1507@gmail.com" className="aw-contact-card">
                  <span className="aw-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <span>afrithafrith1507@gmail.com</span>
                </a>
                <a href="tel:+917397463508" className="aw-contact-card">
                  <span className="aw-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <span>+91 7397463508</span>
                </a>
                <a href="https://github.com/dev-afrith" target="_blank" rel="noopener noreferrer" className="aw-contact-card">
                  <span className="aw-contact-icon">
                    <GithubIcon />
                  </span>
                  <span>dev-afrith</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-afrith-d-661822327/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aw-contact-card"
                >
                  <span className="aw-contact-icon">
                    <span style={{ fontWeight: 700, fontSize: "13px" }} aria-hidden="true">in</span>
                  </span>
                  <span>Muhammad Afrith</span>
                </a>
              </div>
            </div>

            <div className="aw-form-card">
              <form onSubmit={submitForm} style={{ display: "grid", gap: "18px" }}>
                <div className="aw-form-row">
                  <div>
                    <label htmlFor="c-name" className="aw-form-label">NAME</label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      placeholder="Your Name"
                      className="aw-form-input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="aw-form-label">EMAIL</label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="aw-form-input"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="aw-form-row">
                  <div>
                    <label htmlFor="c-mobile" className="aw-form-label">MOBILE (optional)</label>
                    <input
                      id="c-mobile"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="aw-form-input"
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="c-subject" className="aw-form-label">SUBJECT</label>
                    <input
                      id="c-subject"
                      type="text"
                      required
                      placeholder="What would you like to discuss?"
                      className="aw-form-input"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-msg" className="aw-form-label">MESSAGE</label>
                  <textarea
                    id="c-msg"
                    rows={5}
                    required
                    placeholder="Tell me about the project, the timeline and what you're trying to build."
                    className="aw-form-input aw-form-textarea"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="aw-btn-primary"
                  style={{ width: "100%", justifyContent: "center", border: "none", cursor: "pointer", marginTop: "6px" }}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
                {status === "error" && (
                  <p style={{ color: "#f87171", fontSize: "14px" }}>
                    Failed to send. Please email directly.
                  </p>
                )}
              </form>
            </div>
          </div>

          {status === "sent" && (
            <div
              role="status"
              aria-live="polite"
              onClick={() => setStatus("idle")}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                background: "rgba(8, 8, 10, 0.68)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
                  maxWidth: "420px",
                  width: "100%",
                  padding: "28px 32px",
                  borderRadius: "20px",
                  background: "#0E0E0D",
                  border: "1px solid rgba(232, 183, 124, 0.35)",
                  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)",
                  textAlign: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  aria-label="Dismiss notification"
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "none",
                    border: "none",
                    color: "#A8A49C",
                    cursor: "pointer",
                    fontSize: "18px",
                    lineHeight: 1,
                    padding: "4px 8px",
                  }}
                >
                  ×
                </button>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "0 auto 14px",
                    borderRadius: "999px",
                    background: "rgba(232, 183, 124, 0.14)",
                    border: "1px solid rgba(232, 183, 124, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E8B77C",
                    fontSize: "18px",
                  }}
                  aria-hidden="true"
                >
                  ✓
                </div>
                <p style={{ fontSize: "17px", fontWeight: 600, color: "#F5F3EF" }}>
                  Successfully sent!
                </p>
                <p style={{ fontSize: "14px", color: "#A8A49C", marginTop: "6px" }}>
                  Afrith will contact you soon.
                </p>
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: "72px",
              paddingTop: "40px",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              <div>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#F5F3EF" }}>
                  Muhammad Afrith
                </p>
                <p style={{ fontSize: "14px", color: "#A8A49C", marginTop: "6px", maxWidth: "46ch" }}>
                  Building premium, scalable digital products with modern full-stack and mobile
                  technologies.
                </p>
              </div>
              <a
                href="#c-name"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("c-name")?.focus();
                }}
                className="aw-btn-secondary"
                style={{ height: "44px", padding: "0 22px", fontSize: "14px" }}
              >
                Start a Conversation
              </a>
            </div>

            <div
              style={{
                marginTop: "36px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6E6A63" }}>
                © 2026 Muhammad Afrith. All rights reserved.
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <a
                  href="https://github.com/dev-afrith"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="aw-arrow-btn"
                  style={{ width: "36px", height: "36px" }}
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-afrith-d-661822327/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="aw-arrow-btn"
                  style={{ width: "36px", height: "36px", fontSize: "12px", fontWeight: 700 }}
                >
                  in
                </a>
                <a
                  href="mailto:afrithafrith1507@gmail.com"
                  aria-label="Email"
                  className="aw-arrow-btn"
                  style={{ width: "36px", height: "36px" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
