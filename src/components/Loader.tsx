"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 100 / steps;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
      setProgress(Math.min(current, 100));
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow */}
          <div
            className="gradient-orb"
            style={{
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(212,165,116,0.15), transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", position: "relative", zIndex: 2 }}
          >
            <motion.p
              className="text-label"
              style={{ marginBottom: "1rem", fontSize: "0.7rem", letterSpacing: "0.2em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Portfolio
            </motion.p>

            <motion.h1
              className="heading-display"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Muhammad Afrith
            </motion.h1>

            <motion.p
              style={{
                color: "var(--color-text-tertiary)",
                fontSize: "0.8rem",
                marginTop: "0.75rem",
                letterSpacing: "0.05em",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
            >
              Code. Design. Build.
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "4rem",
              left: "50%",
              transform: "translateX(-50%)",
              width: "200px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "var(--color-border-subtle)",
                borderRadius: "1px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  background: "var(--color-accent-warm)",
                  borderRadius: "1px",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: "0.65rem",
                color: "var(--color-text-tertiary)",
                marginTop: "0.75rem",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-body)",
              }}
            >
              {Math.round(progress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
