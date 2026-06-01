"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "@/data/portfolio";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0.36, 1]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsubscribe;
  }, [scrollY]);

  return (
    <>
      <motion.nav
        className="navbar glass"
        style={{
          padding: scrolled ? "0.8rem 2rem" : "1.15rem 2rem",
          opacity: bgOpacity,
          background: scrolled
            ? "rgba(10, 10, 10, 0.72)"
            : "linear-gradient(180deg, rgba(10, 10, 10, 0.52), rgba(10, 10, 10, 0.18))",
          backdropFilter: "blur(24px) saturate(135%)",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="content-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            width: "100%",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
              display: "inline-block",
              textShadow: "0 0 28px rgba(212,165,116,0.14)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent-warm)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-primary)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {personalInfo.name}
          </a>

          {/* Desktop Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.35rem",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.035)",
              border: "1px solid rgba(255,255,255,0.055)",
            }}
            className="nav-desktop"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  padding: "0.48rem 0.86rem",
                  borderRadius: "999px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-accent-warm)";
                  e.currentTarget.style.background = "rgba(212, 165, 116, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-mobile-btn"
            aria-label="Toggle menu"
            style={{
              display: "none",
              cursor: "pointer",
              padding: "0.6rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "14px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "1.5px",
                  background: "var(--color-text-primary)",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                  top: isOpen ? "6px" : "0px",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "6px",
                  width: "100%",
                  height: "1.5px",
                  background: "var(--color-text-primary)",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "1.5px",
                  background: "var(--color-text-primary)",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                  top: isOpen ? "6px" : "12px",
                  transform: isOpen ? "rotate(-45deg)" : "none",
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "rgba(10, 10, 10, 0.9)",
                backdropFilter: "blur(26px) saturate(135%)",
                borderBottom: "1px solid var(--color-border-subtle)",
                padding: "1rem 1.25rem 1.35rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
                overflow: "hidden",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    padding: "0.85rem 1rem",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                    background: "rgba(255,255,255,0.025)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-accent-warm)";
                    e.currentTarget.style.background = "rgba(212, 165, 116, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
