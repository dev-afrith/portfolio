"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/portfolio";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const displayedProjects = projects;

  const openProject = (project: Project, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  };

  return (
    <section id="projects" className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div
        className="gradient-orb"
        style={{
          width: "720px",
          height: "720px",
          background: "radial-gradient(circle, rgba(212,165,116,0.08), transparent 70%)",
          top: "6%",
          right: "-20%",
        }}
      />
      <div
        className="gradient-orb animate-float"
        style={{
          width: "460px",
          height: "460px",
          background: "radial-gradient(circle, rgba(255,255,255,0.045), transparent 70%)",
          bottom: "4%",
          left: "-16%",
        }}
      />

      <div className="content-container">
        {/* Section Header */}
        {/* Section Header */}

        <ScrollReveal delay={0.1}>
          <h2
            className="heading-section"
            style={{
              fontSize: "clamp(2.55rem, 5vw, 4.4rem)",
              marginBottom: "1.25rem",
              maxWidth: "760px",
            }}
          >
            Projects that showcase real{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>engineering</span>.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            className="text-body"
            style={{
              marginBottom: "5rem",
              maxWidth: "560px",
              fontSize: "1rem",
            }}
          >
            Each project represents a real challenge solved with thoughtful design and modern technology.
          </p>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid-projects">
          {displayedProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={0.1 + i * 0.1}>
              <motion.article
                className="card project-card"
                style={{
                  cursor: "pointer",
                  position: "relative",
                  minHeight: "500px",
                  display: "flex",
                  flexDirection: "column",
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open details for ${project.title}`}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
                  event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
                }}
                onClick={(event) => openProject(project, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProject(project, event.currentTarget);
                  }
                }}
                whileHover="hover"
                variants={{
                  hover: {
                    y: -10,
                    scale: 1.012,
                    boxShadow: "0 30px 90px rgba(0,0,0,0.52), 0 0 48px rgba(212, 165, 116, 0.14)",
                  }
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-card-media" aria-hidden="true">
                  <motion.div
                    variants={{
                      hover: { scale: 1.06, y: -4 }
                    }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <Image
                      src={`/projects/${project.id}.png`}
                      alt={project.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        filter: "saturate(1.05) contrast(1.03)",
                      }}
                    />
                  </motion.div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, rgba(10,10,10,0.02) 0%, rgba(10,10,10,0.78) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  <motion.div
                    variants={{
                      hover: { opacity: 1 }
                    }}
                    transition={{ duration: 0.45 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      background: "radial-gradient(circle at 50% 0%, rgba(212,165,116,0.2), transparent 50%)",
                      pointerEvents: "none",
                    }}
                  />

                  <span
                    className="glass"
                    style={{
                      position: "absolute",
                      top: "1.15rem",
                      right: "1.15rem",
                      padding: "0.35rem 0.85rem",
                      borderRadius: "100px",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      background: "rgba(10, 10, 10, 0.68)",
                      backdropFilter: "blur(12px)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      zIndex: 2,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="project-card-content">
                  <h3
                    className="heading-section"
                    style={{
                      fontSize: "1.38rem",
                      marginBottom: "0.7rem",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-body"
                    style={{
                      fontSize: "0.92rem",
                      marginBottom: "1.35rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "0.35rem 0.72rem",
                          borderRadius: "100px",
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          color: "rgba(245,245,247,0.64)",
                          background: "rgba(255,255,255,0.045)",
                          border: "1px solid var(--color-border-subtle)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span
                        style={{
                          padding: "0.35rem 0.72rem",
                          borderRadius: "100px",
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          color: "rgba(245,245,247,0.64)",
                          background: "rgba(255,255,255,0.045)",
                          border: "1px solid var(--color-border-subtle)",
                        }}
                      >
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="project-card-footer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.9rem",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={(event) => openProject(project, event.currentTarget)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "var(--color-accent-warm)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: 0,
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-accent-warm)")}
                  >
                    <span>View Description</span>
                    <motion.svg
                      variants={{
                        hover: { x: 5 }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Live
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeProject}
      />
    </section>
  );
}
