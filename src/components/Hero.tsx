"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { coreSkills, personalInfo } from "@/data/portfolio";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const reduceMotion = useReducedMotion();
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
        staggerChildren: reduceMotion ? 0 : 0.11,
        delayChildren: reduceMotion ? 0 : 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 26, filter: reduceMotion ? "blur(0px)" : "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0.25 : 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      onMouseMove={(event) => {
        if (reduceMotion) return;
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
          x: reduceMotion ? 0 : glowX,
          y: reduceMotion ? 0 : glowY,
          width: "780px",
          height: "780px",
          background: "radial-gradient(circle, rgba(212,165,116,0.12), rgba(212,165,116,0.04) 34%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(255,216,165,0.08), transparent 70%)",
          top: "15%",
          right: "-12%",
          x: reduceMotion ? 0 : rightOrbX,
          y: reduceMotion ? 0 : rightOrbY,
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
          x: reduceMotion ? 0 : leftOrbX,
          y: reduceMotion ? 0 : leftOrbY,
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
          {personalInfo.role}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="heading-display"
          style={{
            x: reduceMotion ? 0 : titleX,
            y: reduceMotion ? 0 : titleY,
            fontSize: "clamp(3.1rem, 10vw, 8rem)",
            marginBottom: "1.1rem",
            cursor: "default",
            position: "relative",
            textWrap: "balance",
            filter: "drop-shadow(0 18px 48px rgba(212, 165, 116, 0.14))",
            maxWidth: "13ch",
            marginInline: "auto",
          }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="heading-section"
          style={{
            fontSize: "clamp(1.12rem, 2.2vw, 1.55rem)",
            color: "var(--color-accent-warm)",
            marginBottom: "1.2rem",
            letterSpacing: "-0.02em",
          }}
        >
          Full-stack products with premium interfaces and scalable engineering.
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-body"
          style={{
            maxWidth: "720px",
            margin: "0 auto 2rem",
            fontSize: "clamp(1rem, 1.22vw, 1.18rem)",
            lineHeight: 1.8,
            color: "rgba(245, 245, 247, 0.72)",
          }}
        >
          {personalInfo.heroTagline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.55rem",
            marginBottom: "2.5rem",
          }}
          aria-label="Core technical interests"
        >
          {coreSkills.slice(0, 4).map((skill) => (
            <span key={skill} className="hero-pill">
              {skill}
            </span>
          ))}
        </motion.div>

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
            <span>Let&apos;s Connect</span>
          </a>
        </motion.div>

        {/* Removed scroll indicator */}
      </motion.div>
    </section>
  );
}
