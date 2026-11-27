"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProjectItem } from "@/data/projects";

interface ProjectDetailsModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

function ModalTechIcon({ name }: { name: string }) {
  const s = { width: 16, height: 16, flexShrink: 0 } as const;
  const lower = name.toLowerCase();
  if (lower.includes("react")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    );
  }
  if (lower.includes("next") || lower.includes("vercel")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <polygon points="12,3 22,20 2,20" />
      </svg>
    );
  }
  if (lower.includes("tailwind")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M4 10c2-3 5-3 7 0s5 3 9 0" />
        <path d="M4 16c2-3 5-3 7 0s5 3 9 0" />
      </svg>
    );
  }
  if (lower.includes("vite")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13,2 4,14 11,14 10,22 20,10 13,10" />
      </svg>
    );
  }
  if (lower.includes("flutter")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 3 5 12l3 3L20 3h-6Z" />
        <path d="M14 13 9 18l5 3h6l-6-8Z" />
      </svg>
    );
  }
  if (lower.includes("node") || lower.includes("docker")) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
      </svg>
    );
  }
  if (
    lower.includes("mongo") ||
    lower.includes("mysql") ||
    lower.includes("postgres") ||
    lower.includes("sql") ||
    lower.includes("firebase")
  ) {
    return (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    );
  }
  return (
    <span style={{ fontSize: "12px", fontWeight: 700, lineHeight: 1 }} aria-hidden="true">
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    const prevActive = document.activeElement as HTMLElement | null;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      prevActive?.focus?.();
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="aw-pmodal-backdrop"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onCloseRef.current()}
        >
          <motion.div
            ref={panelRef}
            className="aw-pmodal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`aw-pmodal-title-${project.slug}`}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aw-pmodal-topbar">
              <span className="aw-label" style={{ color: "var(--gold-text)" }}>
                {project.idx} · {project.category}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                className="aw-pmodal-close"
                onClick={onClose}
                aria-label="Close project details"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="aw-pmodal-scroll" data-lenis-prevent>
              <div className="aw-pmodal-cover">
                <Image
                  src={project.cover}
                  alt={project.alt}
                  width={1200}
                  height={675}
                  sizes="(max-width: 820px) 94vw, 780px"
                  priority
                />
              </div>

              <div className="aw-pmodal-body">
                <h2 id={`aw-pmodal-title-${project.slug}`} className="aw-pmodal-title">
                  {project.title}
                </h2>
                <p className="aw-pmodal-overview">{project.overview}</p>

                <div className="aw-case-grid">
                  <div className="aw-case-card">
                    <h3 className="aw-case-label">PROBLEM</h3>
                    <p className="aw-case-text">{project.problem}</p>
                  </div>
                  <div className="aw-case-card">
                    <h3 className="aw-case-label">SOLUTION</h3>
                    <p className="aw-case-text">{project.solution}</p>
                  </div>
                  <div className="aw-case-card">
                    <h3 className="aw-case-label">IMPLEMENTATION</h3>
                    <p className="aw-case-text">{project.implementation}</p>
                  </div>
                  <div className="aw-case-card">
                    <h3 className="aw-case-label">RESULTS</h3>
                    <ul className="aw-case-list">
                      {project.results.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3
                  className="aw-label"
                  style={{ color: "var(--ink)", marginTop: "24px", letterSpacing: "0.18em" }}
                >
                  TECHNOLOGY STACK
                </h3>
                <div className="aw-project-stack-grid">
                  {project.stack.map((t) => (
                    <div key={t} className="aw-project-stack-card">
                      <span className="aw-project-stack-icon">
                        <ModalTechIcon name={t} />
                      </span>
                      <span className="aw-project-stack-name">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="aw-pmodal-actions">
                  {project.links.apk?.startsWith("https://") && (
                    <a
                      href={project.links.apk}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aw-btn-primary"
                    >
                      Install APK ↗
                    </a>
                  )}
                  {project.links.live.startsWith("https://") && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aw-btn-primary"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.links.github.startsWith("https://") && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aw-btn-secondary"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>

                {project.apkMeta && (
                  <p className="aw-label" style={{ color: "var(--ink-3)", marginTop: "12px" }}>
                    {project.apkMeta}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
