"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/mojkqbgy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("sent");
        setShowSuccessPopup(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setShowSuccessPopup(false), 5000);
      } else {
        setStatus("error");
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 5000);
    }

    setTimeout(() => {
      setStatus("idle");
    }, 4000);
  };

  return (
    <section id="contact" className="section-padding" style={{ position: "relative" }}>
      {/* Ambient glow */}
      <div
        className="gradient-orb"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(212,165,116,0.06), transparent 70%)",
          bottom: "20%",
          right: "-10%",
        }}
      />

      <div className="content-container">
        <div
          className="contact-grid-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left Column: Text & Boxed Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <ScrollReveal>
                <p className="text-label" style={{ marginBottom: "1rem" }}>
                  Get In Touch
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2
                  className="heading-section"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 2.5rem)",
                    marginBottom: "1rem",
                  }}
                >
                  Let&apos;s build something{" "}
                  <span style={{ color: "var(--color-accent-warm)" }}>great</span> together.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p
                  className="text-body"
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                  }}
                >
                  Have a project in mind or want to collaborate? I&apos;d love to hear from you.
                </p>
              </ScrollReveal>
            </div>

            {/* Boxed Email and Phone */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <ScrollReveal delay={0.25}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.5rem",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--color-accent-glow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent-warm)",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13 2 4" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Email Me
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        wordBreak: "break-all",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-warm)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                    >
                      {personalInfo.email}
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.5rem",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--color-accent-glow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent-warm)",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Call Me
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-warm)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                    >
                      {personalInfo.phone}
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <a
                  href={personalInfo.github}
                  className="card"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.5rem",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--color-accent-glow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent-warm)",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      GitHub
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-warm)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                    >
                      dev-afrith
                    </p>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <a
                  href={personalInfo.linkedin}
                  className="card"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.5rem",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--color-accent-glow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent-warm)",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.25rem",
                      }}
                    >
                      LinkedIn
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-warm)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                    >
                      muhammadafrith
                    </p>
                  </div>
                </a>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={{ width: "100%" }}>
            <ScrollReveal delay={0.25}>
              <form onSubmit={handleSubmit}>
                <div
                  className="contact-form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    id="contact-name"
                  />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    id="contact-email"
                  />
                </div>
                <style jsx>{`
                  @media (max-width: 640px) {
                    .contact-form-row {
                      grid-template-columns: 1fr !important;
                    }
                  }
                `}</style>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  id="contact-subject"
                  style={{ marginBottom: "1rem" }}
                />
                <textarea
                  className="form-input"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  id="contact-message"
                  style={{ marginBottom: "1.5rem", resize: "vertical" }}
                />

                <motion.button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                >
                  {status === "idle" && (
                    <>
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
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                      <span>Send Message</span>
                    </>
                  )}
                  {status === "sending" && <span>Sending...</span>}
                  {status === "sent" && <span>Message Sent ✓</span>}
                  {status === "error" && <span>Try Again</span>}
                </motion.button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Success Notification Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1.25rem 2rem",
              borderRadius: "16px",
              background: "rgba(17, 17, 17, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.1)",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgb(16, 185, 129)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>
                Message Sent!
              </h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", margin: "0.125rem 0 0 0" }}>
                I will get back to you shortly.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessPopup(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-tertiary)",
                cursor: "pointer",
                padding: "4px",
                marginLeft: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-tertiary)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Notification Popup */}
      <AnimatePresence>
        {showErrorPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1.25rem 2rem",
              borderRadius: "16px",
              background: "rgba(17, 17, 17, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(239, 68, 68, 0.1)",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgb(239, 68, 68)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>
                Error Sending!
              </h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", margin: "0.125rem 0 0 0" }}>
                Please try again or email directly.
              </p>
            </div>
            <button
              onClick={() => setShowErrorPopup(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-tertiary)",
                cursor: "pointer",
                padding: "4px",
                marginLeft: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-tertiary)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
