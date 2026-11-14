"use client";

import { motion } from "framer-motion";
import { techStack, coreSkills, currentlyLearning } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

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

export default function TechStack() {
  const allTechItems = techStack.flatMap((category) => category.items);
  const familiarTech = allTechItems.filter(
    (item) => !coreSkills.includes(item) && !currentlyLearning.includes(item)
  );

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
              marginBottom: "3rem",
              maxWidth: "740px",
            }}
          >
            The{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>tools</span> I use to build.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="skills-tier-row">
            <article className="skills-tier-card">
              <p className="text-label" style={{ marginBottom: "0.45rem" }}>
                Core Skills
              </p>
              <p className="text-body" style={{ fontSize: "0.88rem" }}>
                {coreSkills.join(" • ")}
              </p>
            </article>
            <article className="skills-tier-card">
              <p className="text-label" style={{ marginBottom: "0.45rem" }}>
                Familiar Stack
              </p>
              <p className="text-body" style={{ fontSize: "0.88rem" }}>
                {familiarTech.slice(0, 8).join(" • ")}
              </p>
            </article>
            <article className="skills-tier-card">
              <p className="text-label" style={{ marginBottom: "0.45rem" }}>
                Exploring
              </p>
              <p className="text-body" style={{ fontSize: "0.88rem" }}>
                {currentlyLearning.join(" • ")}
              </p>
            </article>
          </div>
        </ScrollReveal>

        <div className="tech-grid" style={{ marginTop: "1.2rem" }}>
          {techStack.map((category, i) => (
            <ScrollReveal key={category.name} delay={0.1 + i * 0.08}>
              <motion.div
                className="card"
                style={{
                  padding: "1.45rem",
                  borderRadius: "20px",
                  height: "100%",
                  transition: "all 0.4s var(--transition-smooth)",
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.28 },
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
                        scale: 1.04,
                        backgroundColor: "rgba(212, 165, 116, 0.12)",
                        color: "var(--color-accent-warm)",
                        borderColor: "rgba(212, 165, 116, 0.4)",
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
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
        </div>
      </div>
    </section>
  );
}
