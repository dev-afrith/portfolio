"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 24, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 24, mass: 0.4 });
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-34, 34]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-22, 22]);
  const titleX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const titleY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rightOrbX = useTransform(smoothX, [-0.5, 0.5], [24, -24]);
  const rightOrbY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const leftOrbX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const leftOrbY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "7.5rem 0 5rem",
      }}
    >
      {/* Three.js Background */}
      <HeroCanvas />

      {/* Gradient overlays */}
      <motion.div
        className="gradient-orb"
        style={{
          x: glowX,
          y: glowY,
          width: "780px",
          height: "780px",
          background: "radial-gradient(circle, rgba(212,165,116,0.13), rgba(212,165,116,0.045) 36%, transparent 70%)",
          top: "11%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <motion.div
        className="gradient-orb animate-float"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(255,216,165,0.1), transparent 70%)",
          top: "15%",
          right: "-12%",
          x: rightOrbX,
          y: rightOrbY,
        }}
      />
      <motion.div
        className="gradient-orb animate-pulse-glow"
        style={{
          width: "480px",
          height: "480px",
          background: "radial-gradient(circle, rgba(212,165,116,0.08), transparent 70%)",
          bottom: "6%",
          left: "-8%",
          x: leftOrbX,
          y: leftOrbY,
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
          padding: "0 1.25rem",
        }}
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="text-label section-kicker"
          style={{ marginBottom: "1.75rem", justifyContent: "center" }}
        >
          Full Stack Developer &bull; Mobile App Developer
        </motion.p>

        {/* Name (Letter-by-Letter interactive animations) */}
        <motion.h1
          variants={itemVariants}
          className="heading-display"
          style={{
            x: titleX,
            y: titleY,
            fontSize: "clamp(3.4rem, 10.5vw, 8.7rem)",
            marginBottom: "1.65rem",
            cursor: "default",
            position: "relative",
            textWrap: "balance",
            filter: "drop-shadow(0 22px 60px rgba(212, 165, 116, 0.16))",
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
                    transition: "color 0.25s var(--transition-smooth)",
                  }}
                  whileHover={{
                    color: "#ffc984",
                    scale: 1.18,
                    y: -8,
                    textShadow: "0 0 34px rgba(255, 201, 132, 0.74)",
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
            maxWidth: "720px",
            margin: "0 auto 3.25rem",
            fontSize: "clamp(1rem, 1.35vw, 1.22rem)",
            lineHeight: 1.85,
            color: "rgba(245, 245, 247, 0.72)",
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
          <a href="#projects" className="btn-primary magnetic-target">
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
          <a href="/resume.pdf" className="btn-secondary magnetic-target" target="_blank" rel="noopener noreferrer">
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
          <a href="#contact" className="btn-secondary magnetic-target">
            <span>Contact Me</span>
          </a>
        </motion.div>

        {/* Removed scroll indicator */}
      </motion.div>
    </section>
  );
}
