"use client";

import { experiences } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

export default function Experience() {
  return (
    <section id="experience" className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div
        className="gradient-orb"
        style={{
          width: "620px",
          height: "620px",
          background: "radial-gradient(circle, rgba(212,165,116,0.075), transparent 70%)",
          bottom: "3%",
          left: "-18%",
        }}
      />

      <div className="content-container">
        {/* Section Header */}
        <ScrollReveal>
          <p className="text-label section-kicker" style={{ marginBottom: "1.25rem" }}>
            Experience
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="heading-section"
            style={{
              fontSize: "clamp(2.45rem, 5vw, 4.15rem)",
              marginBottom: "3.4rem",
              maxWidth: "760px",
            }}
          >
            Professional{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>journey</span> & growth.
          </h2>
        </ScrollReveal>

        {/* Experience Cards Grid */}
        <div
          className="experience-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.2rem",
            alignItems: "stretch",
          }}
        >
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.id} delay={0.15 + i * 0.15}>
              <div
                className="card experience-card"
                style={{
                  padding: "2rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.5s var(--transition-smooth)",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--color-accent-warm)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      marginBottom: "0.6rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {exp.period}
                  </p>

                  <h3
                    className="heading-section"
                    style={{ fontSize: "1.32rem", marginBottom: "0.35rem" }}
                  >
                    {exp.role}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.84rem",
                      color: "var(--color-text-secondary)",
                      marginBottom: "1.15rem",
                    }}
                  >
                    {exp.company}
                  </p>

                  <div
                    style={{
                      marginBottom: "1.25rem",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.32rem 0.8rem",
                        borderRadius: "100px",
                        fontSize: "0.64rem",
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

                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.8rem",
                    }}
                  >
                    {exp.description.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.625rem",
                          fontSize: "0.92rem",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.72,
                        }}
                      >
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "var(--color-accent-warm)",
                            flexShrink: 0,
                            marginTop: "0.65rem",
                            boxShadow: "0 0 14px rgba(212,165,116,0.45)",
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
