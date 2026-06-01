"use client";

import { motion } from "framer-motion";
import { techStack, coreSkills } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

// Tech icon mapping (using simple SVG or colored dots as visual indicators)
const categoryIcons: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  Mobile: "📱",
  "Databases & Cloud": "☁️",
  "Deployment & Tools": "🚀",
};

const categoryColors: Record<string, string> = {
  Frontend: "rgba(251, 191, 36, 0.15)",
  Backend: "rgba(16, 185, 129, 0.15)",
  Mobile: "rgba(96, 165, 250, 0.15)",
  "Databases & Cloud": "rgba(167, 139, 250, 0.15)",
  "Deployment & Tools": "rgba(244, 63, 94, 0.15)",
};

const categoryBorderColors: Record<string, string> = {
  Frontend: "rgba(251, 191, 36, 0.25)",
  Backend: "rgba(16, 185, 129, 0.25)",
  Mobile: "rgba(96, 165, 250, 0.25)",
  "Databases & Cloud": "rgba(167, 139, 250, 0.25)",
  "Deployment & Tools": "rgba(244, 63, 94, 0.25)",
};

void categoryIcons;

export default function TechStack() {
  return (
    <section id="skills" className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div
        className="gradient-orb"
        style={{
          width: "650px",
          height: "650px",
          background: "radial-gradient(circle, rgba(212,165,116,0.085), transparent 70%)",
          top: "16%",
          right: "-18%",
        }}
      />

      <div className="content-container">
        {/* Section Header */}
        <ScrollReveal>
          <p className="text-label section-kicker" style={{ marginBottom: "1.25rem" }}>
            Skills & Technologies
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="heading-section"
            style={{
              fontSize: "clamp(2.45rem, 5vw, 4.15rem)",
              marginBottom: "4.7rem",
              maxWidth: "740px",
            }}
          >
            The{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>tools</span> I use to build.
          </h2>
        </ScrollReveal>

        {/* Tech Categories Grid */}
        <div className="tech-grid">
          {techStack.map((category, i) => (
            <ScrollReveal key={category.name} delay={0.1 + i * 0.08}>
              <motion.div
                className="card"
                style={{
                  padding: "1.75rem",
                  borderRadius: "20px",
                  height: "100%",
                  transition: "all 0.4s var(--transition-smooth)",
                }}
                whileHover={{
                  y: -8,
                  scale: 1.025,
                  transition: { duration: 0.35 },
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "14px",
                    background: categoryColors[category.name],
                    border: `1px solid ${categoryBorderColors[category.name]}`,
                    marginBottom: "1.35rem",
                    boxShadow: "0 0 28px rgba(212,165,116,0.08)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--color-accent-warm)",
                      boxShadow: "0 0 18px rgba(212,165,116,0.65)",
                    }}
                  />
                </div>

                {/* Category name */}
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    marginBottom: "1.15rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {category.name}
                </h3>

                {/* Items in bubble format with animations */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.55rem",
                  }}
                >
                  {category.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: "var(--color-accent-glow)",
                        color: "var(--color-accent-warm)",
                        borderColor: "rgba(212, 165, 116, 0.4)",
                        boxShadow: "0 0 10px rgba(212, 165, 116, 0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      style={{
                        padding: "0.45rem 0.9rem",
                        borderRadius: "100px",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "var(--color-text-secondary)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--color-border-subtle)",
                        cursor: "default",
                        transition: "border-color 0.3s ease, color 0.3s ease",
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}

          {/* Core Skills as a Card */}
          <ScrollReveal delay={0.1 + techStack.length * 0.08}>
            <motion.div
              className="card"
              style={{
                padding: "1.75rem",
                borderRadius: "20px",
                height: "100%",
                transition: "all 0.4s var(--transition-smooth)",
                display: "flex",
                flexDirection: "column",
              }}
              whileHover={{
                y: -8,
                scale: 1.025,
                transition: { duration: 0.35 },
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "14px",
                  background: "rgba(212, 165, 116, 0.12)",
                  border: "1px solid rgba(212, 165, 116, 0.25)",
                  marginBottom: "1.35rem",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--color-accent-warm)",
                    boxShadow: "0 0 18px rgba(212,165,116,0.65)",
                  }}
                />
              </div>

              {/* Category name */}
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--color-accent-warm)",
                  marginBottom: "1.15rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Core Skills
              </h3>

              {/* Items in bubble format with animations */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.55rem",
                }}
              >
                {coreSkills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: "var(--color-accent-glow)",
                      color: "var(--color-accent-warm)",
                      borderColor: "var(--color-accent-warm)",
                      boxShadow: "0 0 10px rgba(212, 165, 116, 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{
                      padding: "0.45rem 0.9rem",
                      borderRadius: "100px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "var(--color-accent-warm)",
                      background: "rgba(212, 165, 116, 0.05)",
                      border: "1px solid rgba(212, 165, 116, 0.2)",
                      cursor: "default",
                      transition: "border-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
