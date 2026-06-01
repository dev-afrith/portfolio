"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/portfolio";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const displayedProjects = projects;

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
              <motion.div
                className="card"
                style={{
                  cursor: "pointer",
                  position: "relative",
                  height: "100%",
                  minHeight: "460px",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
                  event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
                }}
                whileHover="hover"
                variants={{
                  hover: {
                    y: -14,
                    scale: 1.018,
                    rotateX: 1.5,
                    rotateY: -1.5,
                    boxShadow: "0 36px 90px rgba(0,0,0,0.55), 0 0 54px rgba(212, 165, 116, 0.18)",
                  }
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image Header */}
                <div
                  style={{
                    height: "250px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Real Image of the project name */}
                  <motion.img
                    src={`/projects/${project.id}.png`}
                    alt={project.title}
                    variants={{
                      hover: { scale: 1.09, y: -5 }
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "saturate(1.05) contrast(1.05)",
                    }}
                  />
                  {/* Dark gradient overlay to ensure category badge is legible */}
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

                  {/* Category badge */}
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

                  {/* Removed featured badge */}
                </div>

                {/* Card content */}
                <div style={{ padding: "2rem", flex: 1 }}>
                  <h3
                    className="heading-section"
                    style={{
                      fontSize: "1.45rem",
                      marginBottom: "0.85rem",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-body"
                    style={{
                      fontSize: "0.92rem",
                      marginBottom: "1.5rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech tags */}
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

                {/* Bottom bar with action links */}
                <div
                  style={{
                    padding: "1.15rem 2rem",
                    borderTop: "1px solid var(--color-border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    background: "rgba(0,0,0,0.14)",
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevent card click propagation
                >
                  <button
                    onClick={() => setSelectedProject(project)}
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

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-warm)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    <motion.svg
                      variants={{
                        hover: { rotate: 8, scale: 1.1 }
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
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </motion.svg>
                    <span>View on GitHub</span>
                  </a>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
