"use client";

import { experiences, personalInfo, projects, techStack } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const uniqueTechCount = new Set(techStack.flatMap((category) => category.items)).size;
  const stats = [
    { label: "Projects", value: `${projects.length}` },
    { label: "Technologies", value: `${uniqueTechCount}+` },
    { label: "Experience Entries", value: `${experiences.length}` },
    { label: "Location", value: personalInfo.location.split(",")[0] },
  ];

  return (
    <section id="about" className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div
        className="gradient-orb"
        style={{
          width: "620px",
          height: "620px",
          background: "radial-gradient(circle, rgba(212,165,116,0.08), transparent 70%)",
          top: "2%",
          left: "-20%",
        }}
      />

      <div className="content-container">
        {/* Section label */}
        <ScrollReveal>
          <p className="text-label section-kicker" style={{ marginBottom: "1.25rem" }}>
            About
          </p>
        </ScrollReveal>

        {/* Section heading */}
        <ScrollReveal delay={0.1}>
          <h2
            className="heading-section"
            style={{
              fontSize: "clamp(2.45rem, 5vw, 4.15rem)",
              marginBottom: "2.8rem",
              maxWidth: "880px",
            }}
          >
            Building products that feel{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>fast</span>,{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>reliable</span>, and{" "}
            <span style={{ color: "var(--color-accent-warm)" }}>effortless</span>.
          </h2>
        </ScrollReveal>

        <div
          className="about-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 1fr",
            gap: "1.2rem",
          }}
        >
          <div
            className="premium-panel"
            style={{
              padding: "clamp(1.5rem, 4vw, 3.2rem)",
            }}
          >
            <p className="text-label" style={{ marginBottom: "1rem" }}>
              Who I Am
            </p>
            {personalInfo.about.map((para, i) => (
              <ScrollReveal key={i} delay={0.15 + i * 0.1}>
                <p
                  className="text-body"
                  style={{
                    marginBottom: i < personalInfo.about.length - 1 ? "1.65rem" : "0",
                    fontSize: "1.04rem",
                    maxWidth: "760px",
                  }}
                >
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <div className="about-side-grid">
            <ScrollReveal delay={0.18}>
              <article className="about-bento-card">
                <p className="text-label" style={{ marginBottom: "0.8rem" }}>
                  Current Focus
                </p>
                <h3 className="heading-section" style={{ fontSize: "1.2rem", marginBottom: "0.55rem" }}>
                  {personalInfo.role}
                </h3>
                <p className="text-body" style={{ fontSize: "0.92rem" }}>
                  {personalInfo.motto}
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <article className="about-bento-card">
                <p className="text-label" style={{ marginBottom: "0.8rem" }}>
                  Portfolio Direction
                </p>
                <p className="text-body" style={{ fontSize: "0.92rem" }}>
                  Product-first development focused on maintainable code, polished UX, and scalable delivery.
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={0.4}>
          <div
            className="about-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
              marginTop: "2.8rem",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass"
                style={{
                  padding: "1.35rem 1.1rem",
                  borderRadius: "16px",
                  textAlign: "left",
                }}
              >
                <p
                  className="heading-section"
                  style={{
                    fontSize: "1.55rem",
                    color: "var(--color-accent-warm)",
                    marginBottom: "0.15rem",
                    textShadow: "0 0 30px rgba(212,165,116,0.22)",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-tertiary)",
                    letterSpacing: "0.08em",
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
