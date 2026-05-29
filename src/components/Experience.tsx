"use client";

import { experiences } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

export default function Experience() {
  return (
    <section id="experience" className="section-padding" style={{ position: "relative" }}>
      {/* Ambient glow */}
      <div
        className="gradient-orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(212,165,116,0.05), transparent 70%)",
          bottom: "10%",
          left: "-10%",
        }}
      />

      <div className="content-container">
        {/* Section Header */}
        <ScrollReveal>
          <p className="text-label" style={{ marginBottom: "1rem" }}>
            Experience
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="heading-section"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "4rem",
              maxWidth: "600px",
            }}
          >
            Professional{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>journey</span> & growth.
          </h2>
        </ScrollReveal>

        {/* Experience Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.id} delay={0.15 + i * 0.15}>
              <div
                className="card"
                style={{
                  padding: "2.25rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.4s var(--transition-smooth)",
                }}
              >
                <div>
                  {/* Period */}
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-accent-warm)",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {exp.period}
                  </p>

                  {/* Role */}
                  <h3
                    className="heading-section"
                    style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}
                  >
                    {exp.role}
                  </h3>

                  {/* Company */}
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {exp.company}
                  </p>

                  {/* Description */}
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.625rem",
                    }}
                  >
                    {exp.description.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.625rem",
                          fontSize: "0.875rem",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "var(--color-accent-warm)",
                            flexShrink: 0,
                            marginTop: "0.5rem",
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Type badge */}
                <div style={{ marginTop: "1.75rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "100px",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      color:
                        exp.type === "development"
                          ? "rgb(16, 185, 129)"
                          : "rgb(96, 165, 250)",
                      background:
                        exp.type === "development"
                          ? "rgba(16, 185, 129, 0.1)"
                          : "rgba(96, 165, 250, 0.1)",
                      border: `1px solid ${
                        exp.type === "development"
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(96, 165, 250, 0.2)"
                      }`,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {exp.type}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
