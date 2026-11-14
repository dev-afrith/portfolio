"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
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
    <section id="contact" className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="gradient-orb"
        style={{
          width: "680px",
          height: "680px",
          background: "radial-gradient(circle, rgba(212,165,116,0.09), transparent 70%)",
          bottom: "6%",
          right: "-18%",
        }}
      />

      <div className="content-container">
        <div className="contact-grid-layout">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <ScrollReveal>
                <p className="text-label section-kicker" style={{ marginBottom: "1.25rem" }}>
                  Get In Touch
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2
                  className="heading-section"
                  style={{
                    fontSize: "clamp(2.35rem, 4.4vw, 3.85rem)",
                    marginBottom: "1.1rem",
                    maxWidth: "620px",
                  }}
                >
                  Let&apos;s build something <span style={{ color: "var(--color-accent-warm)" }}>great</span> together.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-body" style={{ fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "520px" }}>
                  Have a project in mind or want to collaborate? Reach out and I&apos;ll respond as soon as possible.
                </p>
              </ScrollReveal>
            </div>

            <div className="contact-info-grid">
              <ScrollReveal delay={0.25}>
                <a href={`mailto:${personalInfo.email}`} className="contact-info-card">
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-value">{personalInfo.email}</p>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <a href={`tel:${personalInfo.phone}`} className="contact-info-card">
                  <p className="contact-info-label">Phone</p>
                  <p className="contact-info-value">{personalInfo.phone}</p>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <a href={personalInfo.github} className="contact-info-card" target="_blank" rel="noopener noreferrer">
                  <p className="contact-info-label">GitHub</p>
                  <p className="contact-info-value">dev-afrith</p>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <a href={personalInfo.linkedin} className="contact-info-card" target="_blank" rel="noopener noreferrer">
                  <p className="contact-info-label">LinkedIn</p>
                  <p className="contact-info-value">muhammad-afrith</p>
                </a>
              </ScrollReveal>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <ScrollReveal delay={0.25}>
              <form onSubmit={handleSubmit} className="premium-panel" style={{ padding: "clamp(1.35rem, 4vw, 2.4rem)" }}>
                <div className="contact-form-row">
                  <div>
                    <label htmlFor="contact-name" className="contact-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      className="form-input"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      id="contact-name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="contact-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="form-input"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      id="contact-email"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1.05rem" }}>
                  <label htmlFor="contact-subject" className="contact-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="What would you like to discuss?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    id="contact-subject"
                  />
                </div>

                <div style={{ marginBottom: "1.2rem" }}>
                  <label htmlFor="contact-message" className="contact-label">Message</label>
                  <textarea
                    name="message"
                    className="form-input"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    id="contact-message"
                    style={{ resize: "vertical" }}
                  />
                </div>

                <p className="sr-status" aria-live="polite" role="status">
                  {status === "sending" && "Sending your message..."}
                  {status === "sent" && "Message sent successfully."}
                  {status === "error" && "There was an error sending your message."}
                </p>

                <motion.button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "sending"}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "idle" && <span>Send Message</span>}
                  {status === "sending" && <span>Sending...</span>}
                  {status === "sent" && <span>Message Sent ✓</span>}
                  {status === "error" && <span>Try Again</span>}
                </motion.button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="contact-toast success"
            role="status"
            aria-live="polite"
          >
            <h4>Message Sent</h4>
            <p>I will get back to you shortly.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showErrorPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="contact-toast error"
            role="alert"
          >
            <h4>Sending Failed</h4>
            <p>Please try again or contact me directly by email.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}