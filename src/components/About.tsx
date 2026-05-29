"use client";

import { personalInfo } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const stats = [
    { label: "Projects Built", value: "5+" },
    { label: "Technologies", value: "15+" },
    { label: "Internships", value: "2" },
    { label: "Platforms", value: "Web & Mobile" },
  ];

  return (
    <section id="about" className="section-padding" style={{ position: "relative" }}>
      {/* Ambient glow */}
      <div
        className="gradient-orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(212,165,116,0.06), transparent 70%)",
          top: "10%",
          left: "-15%",
        }}
      />

      <div className="content-container">
        {/* Section label */}
        <ScrollReveal>
          <p className="text-label" style={{ marginBottom: "1rem" }}>
            About
          </p>
        </ScrollReveal>

        {/* Section heading */}
        <ScrollReveal delay={0.1}>
          <h2
            className="heading-section"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "3rem",
              maxWidth: "700px",
            }}
          >
            Building products that feel{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>fast</span>,{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>reliable</span>, and{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>effortless</span>.
          </h2>
        </ScrollReveal>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
          }}
        >
          {/* Text */}
          <div>
            {personalInfo.about.map((para, i) => (
              <ScrollReveal key={i} delay={0.15 + i * 0.1}>
                <p
                  className="text-body"
                  style={{
                    marginBottom: i < personalInfo.about.length - 1 ? "1.5rem" : "0",
                    fontSize: "1rem",
                    maxWidth: "700px",
                  }}
                >
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.4}>
          <div
            className="about-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
              marginTop: "4rem",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass"
                style={{
                  padding: "1.5rem",
                  borderRadius: "16px",
                  textAlign: "center",
                }}
              >
                <p
                  className="heading-section"
                  style={{
                    fontSize: "1.75rem",
                    color: "var(--color-accent-warm)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Accent line */}
        <ScrollReveal delay={0.5}>
          <div className="accent-line" style={{ marginTop: "4rem" }} />
        </ScrollReveal>
      </div>
    </section>
  );
}
