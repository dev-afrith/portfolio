"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/data/portfolio";
import { useEffect } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
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

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal-content"
            data-lenis-prevent
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
              <img
                src={`/projects/${project.id}.png`}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(60px)",
                  opacity: 0.12,
                  transform: "scale(1.2)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 50% 30%, rgba(212, 165, 116, 0.05), transparent 70%)",
                }}
              />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              style={{
                position: "sticky",
                top: "1.5rem",
                float: "right",
                marginRight: "1.5rem",
                zIndex: 10,
                background: "var(--color-bg-tertiary)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
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
            <div style={{ padding: "3rem 2.5rem", position: "relative", zIndex: 1 }}>
              {/* Header gradient bar */}
              <div
                style={{
                  width: "100%",
                  height: "4px",
                  borderRadius: "2px",
                  background: `linear-gradient(90deg, var(--color-accent-warm), transparent)`,
                  marginBottom: "2rem",
                }}
              />

              {/* Category */}
              <p className="text-label" style={{ marginBottom: "0.75rem" }}>
                {project.category}
              </p>

              {/* Title */}
              <h2
                className="heading-section"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  marginBottom: "1.5rem",
                }}
              >
                {project.title}
              </h2>

              {/* Description */}
              <p
                className="text-body"
                style={{
                  fontSize: "1rem",
                  marginBottom: "2.5rem",
                  maxWidth: "600px",
                }}
              >
                {project.longDescription}
              </p>

              {/* Highlights */}
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
                  Key Highlights
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "0.75rem",
                  }}
                >
                  {project.highlights.map((h) => (
                    <div
                      key={h}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <span
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "var(--color-accent-warm)",
                          flexShrink: 0,
                        }}
                      />
                      {h}
                    </div>
                  ))}
                </div>
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
                      className="glass"
                      style={{
                        padding: "0.375rem 0.875rem",
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

              {/* GitHub Link */}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
