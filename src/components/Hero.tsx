"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Three.js Background */}
      <HeroCanvas />

      {/* Gradient overlays */}
      <div
        className="gradient-orb"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(212,165,116,0.08), transparent 70%)",
          top: "20%",
          right: "-10%",
        }}
      />
      <div
        className="gradient-orb animate-pulse-glow"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(212,165,116,0.05), transparent 70%)",
          bottom: "10%",
          left: "-5%",
        }}
      />

      {/* Content */}
      <motion.div
        className="content-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="text-label"
          style={{ marginBottom: "1.5rem" }}
        >
          Full Stack Developer &bull; Mobile App Developer
        </motion.p>

        {/* Name (Letter-by-Letter interactive animations) */}
        <motion.h1
          variants={itemVariants}
          className="heading-display"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            marginBottom: "1.5rem",
            cursor: "default",
          }}
        >
          {personalInfo.name.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((letter, letterIdx) => (
                <motion.span
                  key={letterIdx}
                  style={{
                    display: "inline-block",
                    color: "#f5e6d3",
                    transition: "all 0.25s var(--transition-smooth)",
                  }}
                  whileHover={{
                    color: "#ffc984",
                    scale: 1.25,
                    y: -10,
                    textShadow: "0 0 30px rgba(255, 201, 132, 0.8)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              {wordIdx < personalInfo.name.split(" ").length - 1 && (
                <span style={{ display: "inline-block" }}>&nbsp;</span>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-body"
          style={{
            maxWidth: "640px",
            margin: "0 auto 3rem",
            fontSize: "clamp(0.95rem, 1.5vw, 1.125rem)",
            lineHeight: 1.7,
          }}
        >
          {personalInfo.heroTagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a href="#projects" className="btn-primary">
            <span>View Projects</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="/resume.pdf" className="btn-secondary" target="_blank" rel="noopener noreferrer">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span>Resume</span>
          </a>
          <a href="#contact" className="btn-secondary">
            <span>Contact Me</span>
          </a>
        </motion.div>

        {/* Removed scroll indicator */}
      </motion.div>
    </section>
  );
}
