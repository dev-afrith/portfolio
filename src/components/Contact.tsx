"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import ScrollReveal from "./ScrollReveal";

type FormStatus = "idle" | "sending" | "sent" | "error";
type FormErrors = Partial<Record<"name" | "email" | "phone" | "subject" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
// 10 digits starting 6-9, optionally prefixed with +91 / 91 / 0
const PHONE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showPhoneActions, setShowPhoneActions] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const phoneWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showPhoneActions) return;
    const onPointerDown = (event: MouseEvent) => {
      if (phoneWrapRef.current && !phoneWrapRef.current.contains(event.target as Node)) {
        setShowPhoneActions(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowPhoneActions(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showPhoneActions]);

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.replace(/[\s\-().]/g, "").trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (name.length < 2) next.name = "Please enter your name (at least 2 characters).";
    if (!email) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "That email doesn't look valid — check for a missing @ or domain.";
    if (phone && !PHONE_RE.test(phone)) next.phone = "Enter a valid 10-digit mobile number, or leave it blank.";
    if (subject.length < 3) next.subject = "Add a short subject so I know what this is about.";
    if (message.length < 10) next.message = "Please write at least 10 characters.";

    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    const order: (keyof FormErrors)[] = ["name", "email", "phone", "subject", "message"];
    const firstInvalid = order.find((field) => found[field]);

    if (firstInvalid) {
      // show one error at a time, starting from the top of the form
      setErrors({ [firstInvalid]: found[firstInvalid] });
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }

    setErrors({});
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
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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

  const inputClass = (field: keyof FormErrors) =>
    `form-input${errors[field] ? " input-invalid" : ""}`;

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
                    fontSize: "clamp(1.95rem, 3.2vw, 2.85rem)",
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
                  <span className="contact-info-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span className="contact-info-value">{personalInfo.email}</span>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="contact-phone-wrap" ref={phoneWrapRef}>
                  <button
                    type="button"
                    className="contact-info-card contact-info-button"
                    onClick={() => setShowPhoneActions((prev) => !prev)}
                    aria-expanded={showPhoneActions}
                    aria-haspopup="true"
                    aria-label={`${personalInfo.phone} — call or message`}
                  >
                    <span className="contact-info-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                      </svg>
                    </span>
                    <span className="contact-info-value">{personalInfo.phone}</span>
                    <span className="contact-info-caret" aria-hidden="true">⌄</span>
                  </button>

                  <AnimatePresence>
                    {showPhoneActions && (
                      <motion.div
                        className="phone-actions"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        <a href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`} aria-label={`Call ${personalInfo.phone}`}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                          </svg>
                          Call
                        </a>
                        <a href={`sms:${personalInfo.phone.replace(/\s+/g, "")}`} aria-label={`Message ${personalInfo.phone}`}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.9 9.9 0 0 1-4-.9L3 21l1.9-4.5A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
                          </svg>
                          Mobile
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <a href={personalInfo.github} className="contact-info-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-info-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17 3.4 18 3.7 18 3.7c.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
                    </svg>
                  </span>
                  <span className="contact-info-value">dev-afrith</span>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <a href={personalInfo.linkedin} className="contact-info-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-info-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4V9Z" />
                    </svg>
                  </span>
                  <span className="contact-info-value">Muhammad Afrith</span>
                </a>
              </ScrollReveal>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <ScrollReveal delay={0.25}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="premium-panel"
                style={{ padding: "clamp(1.35rem, 4vw, 2.4rem)" }}
              >
                <div className="contact-form-row">
                  <div>
                    <label htmlFor="contact-name" className="contact-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      className={inputClass("name")}
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setField("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      id="contact-name"
                    />
                    {errors.name && <p className="form-error" id="err-name">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="contact-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={inputClass("email")}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setField("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      id="contact-email"
                    />
                    {errors.email && <p className="form-error" id="err-email">{errors.email}</p>}
                  </div>
                </div>

                <div className="contact-form-row">
                  <div>
                    <label htmlFor="contact-phone" className="contact-label">
                      Mobile <span style={{ opacity: 0.55, textTransform: "none" }}>(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      className={inputClass("phone")}
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                      id="contact-phone"
                    />
                    {errors.phone && <p className="form-error" id="err-phone">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="contact-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className={inputClass("subject")}
                      placeholder="What would you like to discuss?"
                      value={formData.subject}
                      onChange={(e) => setField("subject", e.target.value)}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "err-subject" : undefined}
                      id="contact-subject"
                    />
                    {errors.subject && <p className="form-error" id="err-subject">{errors.subject}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: "1.2rem" }}>
                  <label htmlFor="contact-message" className="contact-label">Message</label>
                  <textarea
                    name="message"
                    className={inputClass("message")}
                    placeholder="Tell me about the project, the timeline and what you're trying to build."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setField("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    id="contact-message"
                    style={{ resize: "vertical" }}
                  />
                  {errors.message && <p className="form-error" id="err-message">{errors.message}</p>}
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
