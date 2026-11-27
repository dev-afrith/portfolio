"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, type ProjectItem } from "@/data/projects";
import { EXPERIENCES, SKILL_BOXES } from "@/data/home";
import TiltCard from "@/components/TiltCard";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
});

function handleCardGlow(e: React.PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--card-mx", `${(e.clientX - rect.left).toFixed(1)}px`);
  e.currentTarget.style.setProperty("--card-my", `${(e.clientY - rect.top).toFixed(1)}px`);
}

function SkillCategoryIcon({ title, color }: { title: string; color: string }) {
  const s = { width: 20, height: 20, flexShrink: 0, color } as const;
  switch (title) {
    case "Frontend Development":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "Backend Development":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="6" rx="2" />
          <rect x="3" y="14" width="18" height="6" rx="2" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
          <line x1="7" y1="17" x2="7.01" y2="17" />
        </svg>
      );
    case "Mobile Development":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case "Database & Cloud":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );
    default:
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </svg>
      );
  }
}

function TechLogo({ name, color }: { name: string; color: string }) {
  const s = { width: 14, height: 14, flexShrink: 0, color, opacity: 0.85 } as const;
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
    case "JavaScript":
    case "TypeScript":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d={name === "TypeScript" ? "M8 10h8M12 10v7" : "M10 9v6a2 2 0 0 1-2 2M16 11a2 2 0 1 0 0 4 2 2 0 0 1 0 3"} strokeLinecap="round" />
        </svg>
      );
    case "Vite":
    case "Firebase":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13,2 4,14 11,14 10,22 20,10 13,10" />
        </svg>
      );
    case "Flutter":
    case "Dart":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 3 5 12l3 3L20 3h-6Z" />
          <path d="M14 13 9 18l5 3h6l-6-8Z" />
        </svg>
      );
    case "Android Studio":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="6" y="3" width="12" height="18" rx="2.5" />
          <line x1="10" y1="6" x2="14" y2="6" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
      );
    case "Node.js":
    case "Docker":
    case "Express.js":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
        </svg>
      );
    case "REST APIs":
    case "Netlify":
      return (
        <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
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
            opacity: 0.75,
          }}
          aria-hidden="true"
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      );
  }
}

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

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDialogElement>(null);
  const successDialogRef = useRef<HTMLDialogElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [activeIdx, setActiveIdx] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [scrollPct, setScrollPct] = useState(11.1);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wheelTargetRef = useRef<number | null>(null);
  const wheelRafRef = useRef<number>(0);



  useEffect(() => { setIsDark(document.documentElement.classList.contains("dark")); }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextDark ? "#08080A" : "#ffffff");
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      // Storage may be disabled in this browser.
    }
  };

  const syncCarousel = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = (el.querySelector(".aw-pcard")?.getBoundingClientRect().width || 320) + 22;
    setActiveIdx(Math.min(PROJECTS.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    const max = el.scrollWidth - el.clientWidth;
    setScrollPct(max > 0 ? Math.max(11.1, (el.scrollLeft / max) * 100) : 100);
  };

  const scrollCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    if (wheelRafRef.current) {
      cancelAnimationFrame(wheelRafRef.current);
      wheelRafRef.current = 0;
    }
    wheelTargetRef.current = null;
    el.dataset.wheeling = "0";
    const step = (el.querySelector(".aw-pcard")?.getBoundingClientRect().width || 320) + 22;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stopWheelMomentum = () => {
      if (wheelRafRef.current) {
        cancelAnimationFrame(wheelRafRef.current);
        wheelRafRef.current = 0;
      }
      wheelTargetRef.current = null;
      if (trackRef.current) {
        trackRef.current.dataset.wheeling = "0";
      }
    };

    const runMomentum = () => {
      const el = trackRef.current;
      if (!el || wheelTargetRef.current === null) {
        stopWheelMomentum();
        return;
      }
      const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
      const target = Math.min(maxScrollLeft, Math.max(0, wheelTargetRef.current));
      const diff = target - el.scrollLeft;

      if (Math.abs(diff) < 0.75) {
        el.scrollLeft = target;
        syncCarousel();
        stopWheelMomentum();
        return;
      }

      el.scrollLeft += diff * 0.14;
      syncCarousel();
      wheelRafRef.current = requestAnimationFrame(runMomentum);
    };

    const onWheel = (e: WheelEvent) => {
      if (menuOpen || selectedProject) {
        stopWheelMomentum();
        return;
      }

      const section = projectsSectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      let deltaY = e.deltaY;
      let deltaX = e.deltaX;
      if (e.deltaMode === 1) {
        deltaY *= 16;
        deltaX *= 16;
      } else if (e.deltaMode === 2) {
        deltaY *= window.innerHeight;
        deltaX *= window.innerWidth;
      }

      if (deltaY <= 0) {
        stopWheelMomentum();
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return;
      }

      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      if (maxScrollLeft <= 12) return;

      if (track.scrollLeft >= maxScrollLeft - 4) {
        stopWheelMomentum();
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const isProjectsFramed =
        sectionRect.top <= 115 &&
        trackRect.top < window.innerHeight * 0.58 &&
        trackRect.bottom >= window.innerHeight * 0.35;

      if (!isProjectsFramed) return;

      e.preventDefault();
      e.stopPropagation();

      track.dataset.wheeling = "1";
      const base = wheelTargetRef.current ?? track.scrollLeft;
      wheelTargetRef.current = Math.min(maxScrollLeft, Math.max(0, base + deltaY * 1.15));

      if (!wheelRafRef.current) {
        wheelRafRef.current = requestAnimationFrame(runMomentum);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      stopWheelMomentum();
      window.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, [menuOpen, selectedProject]);

  useEffect(() => {
    if (!menuOpen) return;
    const dialog = mobileMenuRef.current;
    if (!dialog) return;
    dialog.showModal();
    const scrollLock = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      dialog.close();
      document.documentElement.style.overflow = scrollLock;
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".aw-reveal"));
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = ["about", "projects", "skills", "experience", "contact"];

    const updateActiveNav = () => {
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

    if (isReduced || isMobile) {
      els.forEach((el) => {
        el.dataset.revealed = "1";
        el.style.opacity = "";
        el.style.transform = "";
        el.style.transition = "";
        el.classList.add("is-visible");
      });
      window.addEventListener("scroll", updateActiveNav, { passive: true });
      return () => {
        window.removeEventListener("scroll", updateActiveNav);
      };
    }

    const revealEl = (el: HTMLElement) => {
      if (el.dataset.revealed === "1") return;
      el.dataset.revealed = "1";
      el.style.transition = `opacity 640ms cubic-bezier(0.16, 1, 0.3, 1) ${el.dataset.delay || "0ms"}, transform 640ms cubic-bezier(0.16, 1, 0.3, 1) ${el.dataset.delay || "0ms"}`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
      el.classList.add("is-visible");
      window.setTimeout(() => {
        el.style.transition = "";
        el.style.opacity = "";
        el.style.transform = "";
      }, 820);
    };

    const checkVisible = () => {
      const triggerY = window.innerHeight + 140;
      for (const el of els) {
        if (el.dataset.revealed === "1") continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          revealEl(el);
        }
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            revealEl(target);
            io.unobserve(target);
          }
        });
      },
      { threshold: 0, rootMargin: "160px 0px 160px 0px" }
    );

    els.forEach((el, i) => {
      el.dataset.delay = `${(i % 5) * 55}ms`;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.98) {
        el.dataset.revealed = "1";
        el.classList.add("is-visible");
      } else {
        el.style.opacity = "0";
        el.style.transform = "translateY(18px) scale(0.99)";
        io.observe(el);
      }
    });

    const onScroll = () => {
      checkVisible();
      updateActiveNav();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", checkVisible, { passive: true, capture: true });
    window.addEventListener("resize", checkVisible, { passive: true });
    window.addEventListener("hashchange", checkVisible);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", checkVisible, { capture: true });
      window.removeEventListener("resize", checkVisible);
      window.removeEventListener("hashchange", checkVisible);
    };
  }, []);

  useEffect(() => {
    const dialog = successDialogRef.current;
    if (status !== "sent" || !dialog) return;
    dialog.showModal();
    const scrollLock = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.documentElement.style.overflow = scrollLock;
    };
  }, [status]);

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
          <button
            type="button"
            className="aw-arrow-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            style={{ width: "40px", height: "40px", marginLeft: "4px" }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className="aw-mobile-bar">
          <Link href="/" style={{ fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em" }}>
            Muhammad Afrith
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              className="aw-menu-icon-btn"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              type="button"
              className="aw-menu-icon-btn"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="aw-mobile-nav-sheet"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                style={{ pointerEvents: "none" }}
              >
                <line x1="4" x2="20" y1="7" y2="7" />
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="17" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <dialog
          ref={mobileMenuRef}
          id="aw-mobile-nav-sheet"
          className="aw-mobile-sheet"
          aria-label="Navigation menu"
          data-lenis-prevent
          onCancel={(event) => {
            event.preventDefault();
            setMenuOpen(false);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setMenuOpen(false);
          }}
        >
          <div className="aw-mobile-sheet-content">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "44px" }}>
            <span style={{ fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em" }}>Muhammad Afrith</span>
            <button
              type="button"
              className="aw-menu-icon-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                style={{ pointerEvents: "none" }}
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <nav className="aw-mobile-sheet-links" aria-label="Mobile">
            {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => {
              const id = item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  className={`aw-mobile-sheet-link ${activeNav === id ? "is-active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    requestAnimationFrame(() => {
                      const target = document.getElementById(id);
                      if (target) {
                        window.history.pushState(null, "", `#${id}`);
                        target.scrollIntoView({ block: "start" });
                      }
                    });
                  }}
                >
                  <span>{item}</span>
                  <span style={{ fontSize: "14px", color: "var(--ink-3)" }} aria-hidden="true">→</span>
                </a>
              );
            })}
          </nav>
          </div>
        </dialog>
      )}

      <main id="main-content">
        <section className="aw-hero">
          <HeroCanvas />
          <div className="aw-hero-orbit aw-hero-orbit-a" aria-hidden="true" />
          <div className="aw-hero-orbit aw-hero-orbit-b" aria-hidden="true" />
          <div className="aw-hero-accents" aria-hidden="true">
            <div className="aw-hero-satellite aw-hero-satellite-gold"><span /></div>
            <div className="aw-hero-satellite aw-hero-satellite-blue"><span /></div>
          </div>
          <div className="aw-container" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                color: "var(--ink)",
                marginTop: "16px",
                marginBottom: "36px",
                maxWidth: "22ch",
              }}
            >
              Building products that feel <span style={{ color: "var(--gold-text)" }}>fast</span>,{" "}
              <span style={{ color: "var(--gold-text)" }}>reliable</span>, and{" "}
              <span style={{ color: "var(--gold-text)" }}>effortless</span>.
            </h2>

            <div className="aw-about-grid">
              <div className="aw-exp-card aw-reveal" onPointerMove={handleCardGlow}>
                <p className="aw-label" style={{ color: "var(--gold-text)", letterSpacing: "0.22em" }}>
                  WHO I AM
                </p>
                <div style={{ display: "grid", gap: "16px", marginTop: "16px", color: "light-dark(#56534f, #B9B5AD)", fontSize: "15px", lineHeight: 1.7 }}>
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
                <div className="aw-exp-card aw-reveal" style={{ padding: "28px" }} onPointerMove={handleCardGlow}>
                  <p className="aw-label" style={{ color: "var(--gold-text)", letterSpacing: "0.22em" }}>
                    CURRENT FOCUS
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--ink)", marginTop: "12px" }}>
                    Full Stack Developer / Mobile App Developer
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--ink-2)", marginTop: "6px" }}>
                    Code. Design. Build.
                  </p>
                </div>

                <div className="aw-exp-card aw-reveal" style={{ padding: "28px" }} onPointerMove={handleCardGlow}>
                  <p className="aw-label" style={{ color: "var(--gold-text)", letterSpacing: "0.22em" }}>
                    PORTFOLIO DIRECTION
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--ink-2)", marginTop: "12px", lineHeight: 1.65 }}>
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
                <TiltCard key={label} className="aw-stat-card aw-reveal" maxTilt={4} onPointerMove={handleCardGlow}>
                  <p style={{ fontSize: "22px", fontWeight: 600, color: "var(--gold-text)", lineHeight: 1.2 }}>
                    {val}
                  </p>
                  <p className="aw-label" style={{ marginTop: "8px", color: "light-dark(#56534f, #6E6A63)" }}>
                    {label}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <div className="aw-divider" />

        <section id="projects" ref={projectsSectionRef} className="aw-section aw-projects-section">
          <div className="aw-container">
            <div className="aw-projects-head aw-reveal">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "24px", height: "1px", background: "var(--gold-text)" }} aria-hidden="true" />
                  <p className="aw-label">PROJECTS</p>
                </div>
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
                <TiltCard key={p.idx} className="aw-pcard">
                  <button
                    type="button"
                    className="aw-pcard-trigger"
                    onClick={() => setSelectedProject(p)}
                    aria-label={`View details for ${p.title}`}
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
                      <div className="aw-pcard-meta">
                        <span className="aw-label">{p.idx}</span>
                        <span className="aw-label" style={{ color: "light-dark(#56534f, #6E6A63)" }} aria-hidden="true">·</span>
                        <span className="aw-label" style={{ color: "var(--ink-3)" }}>{p.category}</span>
                      </div>
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
                  </button>
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
                </TiltCard>
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
            <div className="aw-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "24px", height: "1px", background: "var(--gold-text)" }} aria-hidden="true" />
              <p className="aw-label">SKILLS</p>
            </div>
            <h2 className="aw-h2 aw-reveal" style={{ marginTop: "16px", marginBottom: "40px" }}>
              Technical stack
            </h2>
            <div className="aw-skills-grid">
              {SKILL_BOXES.map((box) => (
                <TiltCard
                  key={box.title}
                  maxTilt={3.5}
                  className="aw-skill-box aw-reveal"
                  onPointerMove={handleCardGlow}
                  style={
                    {
                      "--accent-45": box.a45,
                      "--accent-25": box.a25,
                      "--accent-18": box.a18,
                      "--skill-dot": box.dot,
                    } as React.CSSProperties
                  }
                >
                  <div className="aw-skill-head">
                    <div className="aw-skill-icon" style={{ background: box.bg }}>
                      <SkillCategoryIcon title={box.title} color={box.dot} />
                    </div>
                    <span className="aw-skill-count" style={{ color: box.dot }}>
                      {String(box.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="aw-skill-title">{box.title}</h3>
                  <div className="aw-skill-pills">
                    {box.items.map((item) => (
                      <span key={item} className="aw-skill-chip">
                        <TechLogo name={item} color={box.dot} />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <div className="aw-divider" />

        <section id="experience" className="aw-section aw-exp-section" style={{ paddingTop: "clamp(72px, 10vh, 120px)" }}>
          <div className="aw-container">
            <div className="aw-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "36px" }}>
              <span style={{ width: "24px", height: "1px", background: "var(--gold-text)" }} aria-hidden="true" />
              <h2 className="aw-label" style={{ color: "var(--gold-text)" }}>EXPERIENCE &amp; INTERNSHIPS</h2>
            </div>

            <div className="aw-exp-timeline">
              {EXPERIENCES.map((exp, idx) => (
                <div key={exp.company} className="aw-exp-item aw-reveal">
                  <div className="aw-exp-marker" aria-hidden="true">
                    <span className="aw-exp-node" />
                  </div>
                  <TiltCard
                    maxTilt={2.6}
                    className="aw-exp-card"
                    onPointerMove={handleCardGlow}
                    style={
                      {
                        "--badge-glow":
                          exp.badge === "DEVELOPMENT"
                            ? "rgba(127, 207, 168, 0.38)"
                            : "rgba(143, 184, 240, 0.38)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="aw-exp-top">
                      <div className="aw-exp-date-row">
                        <span className="aw-label" style={{ color: "var(--gold-text)", letterSpacing: "0.2em" }}>
                          0{idx + 1} · {exp.date}
                        </span>
                      </div>
                      <span className="aw-exp-badge" style={exp.badgeStyle}>
                        {exp.badge}
                      </span>
                    </div>

                    <div className="aw-exp-header">
                      <h3 className="aw-exp-role">{exp.role}</h3>
                      <p className="aw-exp-company">{exp.company}</p>
                    </div>

                    <div className="aw-exp-divider" aria-hidden="true" />

                    <ul className="aw-exp-list">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </TiltCard>
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
                  color: "var(--ink)",
                  marginTop: "16px",
                }}
              >
                Let&apos;s build something <span style={{ color: "var(--gold-text)" }}>great</span> together.
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

            <div className="aw-form-card" onPointerMove={handleCardGlow}>
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
                  <p style={{ color: "light-dark(#a52626, #f87171)", fontSize: "14px" }}>
                    Failed to send. Please email directly.
                  </p>
                )}
              </form>
            </div>
          </div>

          {status === "sent" && (
            <dialog
              ref={successDialogRef}
              className="aw-success-dialog"
              aria-labelledby="aw-success-title"
              aria-describedby="aw-success-message"
              onCancel={(event) => {
                event.preventDefault();
                setStatus("idle");
              }}
              onClick={(event) => {
                if (event.target === event.currentTarget) setStatus("idle");
              }}
            >
              <div className="aw-success-content">
                <div className="aw-success-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="aw-h3" id="aw-success-title">Message sent</h2>
                <p id="aw-success-message">Thanks for reaching out. Afrith will get back to you soon.</p>
                <button type="button" className="aw-btn-primary" onClick={() => setStatus("idle")}>
                  Done
                </button>
              </div>
            </dialog>
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
                <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)" }}>
                  Muhammad Afrith
                </p>
                <p style={{ fontSize: "14px", color: "var(--ink-2)", marginTop: "6px", maxWidth: "46ch" }}>
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
              <span style={{ fontSize: "13px", color: "light-dark(#56534f, #6E6A63)" }}>
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

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
