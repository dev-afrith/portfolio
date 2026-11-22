"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/data/portfolio";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const modalTitleId = `project-modal-title-${project.id}`;
  const modalDescriptionId = `project-modal-description-${project.id}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal-content"
            data-lenis-prevent
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            aria-describedby={modalDescriptionId}
            initial={{ opacity: 0, y: 54, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 54, scale: 0.94, filter: "blur(10px)" }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative" }}
          >
            {/* Blurred background image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <Image
                src={`/projects/${project.id}.png`}
                alt=""
                fill
                sizes="900px"
                style={{
                  objectFit: "cover",
                  filter: "blur(68px) saturate(1.2)",
                  opacity: 0.16,
                  transform: "scale(1.24)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(10,10,10,0.34), rgba(10,10,10,0.96)), radial-gradient(circle at 50% 20%, rgba(212, 165, 116, 0.1), transparent 70%)",
                }}
              />
            </div>

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close project details"
              style={{
                position: "sticky",
                top: "1.5rem",
                float: "right",
                marginRight: "1.5rem",
                zIndex: 10,
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-warm)";
                e.currentTarget.style.color = "var(--color-accent-warm)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border-subtle)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div style={{ padding: "clamp(2rem, 5vw, 3.4rem)", position: "relative", zIndex: 1 }}>
              {/* Header gradient bar */}
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  borderRadius: "2px",
                  background: `linear-gradient(90deg, var(--color-accent-warm), rgba(255,255,255,0.2), transparent)`,
                  marginBottom: "2.2rem",
                  boxShadow: "0 0 24px rgba(212,165,116,0.2)",
                }}
              />

              {/* Category */}
              <p className="text-label" style={{ marginBottom: "0.75rem" }}>
                {project.category}
              </p>

              {/* Title */}
              <h2
                id={modalTitleId}
                className="heading-section"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.45rem)",
                  marginBottom: "1.2rem",
                }}
              >
                {project.title}
              </h2>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid var(--color-border-subtle)",
                  marginBottom: "2rem",
                }}
              >
                <Image
                  src={`/projects/${project.id}.png`}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(10,10,10,0) 45%, rgba(10,10,10,0.8) 100%)",
                  }}
                />
              </div>

              <p
                id={modalDescriptionId}
                className="text-body"
                style={{
                  fontSize: "1.03rem",
                  marginBottom: "2rem",
                  maxWidth: "680px",
                }}
              >
                {project.longDescription}
              </p>

              <div className="project-story-grid" style={{ marginBottom: "2.5rem" }}>
                <article className="project-story-card">
                  <h3 className="project-story-title">Problem</h3>
                  <p className="text-body" style={{ fontSize: "0.92rem", lineHeight: 1.7 }}>
                    {project.description}
                  </p>
                </article>

                <article className="project-story-card">
                  <h3 className="project-story-title">Solution</h3>
                  <p className="text-body" style={{ fontSize: "0.92rem", lineHeight: 1.7 }}>
                    {project.longDescription}
                  </p>
                </article>

                <article className="project-story-card">
                  <h3 className="project-story-title">Implementation</h3>
                  <p className="text-body" style={{ fontSize: "0.92rem", lineHeight: 1.7 }}>
                    Built using {project.techStack.join(", ")}, with the architecture and UX shaped around the project&apos;s domain and category.
                  </p>
                </article>

                <article className="project-story-card">
                  <h3 className="project-story-title">Result</h3>
                  <ul className="project-result-list">
                    {project.highlights.map((item) => (
                      <li key={item} className="project-result-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: "2.5rem" }}>
                <h3
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    marginBottom: "1rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Tech Stack
                </h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="glass project-tech-chip"
                      style={{
                        padding: "0.45rem 0.95rem",
                        borderRadius: "100px",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {project.apk && (
                  <a
                    href={project.apk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Download APK</span>
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Live Demo</span>
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
