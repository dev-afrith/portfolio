"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { navLinks, personalInfo } from "@/data/portfolio";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#about");
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(() => navLinks.map((link) => link.href.replace("#", "")), []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 50));
    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock the page behind the mobile menu so only the menu and scrim are visible.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Close the menu and release the scroll lock. The scroll itself is left to the
  // anchor handler in SmoothScroll (Lenis, offset -80) so the two never fight;
  // when Lenis is disabled (prefers-reduced-motion) the native jump runs and
  // section[id] { scroll-margin-top: 84px } keeps the target clear of the navbar.
  const handleMenuNavigate = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.nav
        className="navbar glass"
        style={{
          padding: scrolled ? "0.75rem 1.4rem" : "1.05rem 1.4rem",
          background: scrolled
            ? "rgba(10, 10, 10, 0.72)"
            : "linear-gradient(180deg, rgba(10, 10, 10, 0.52), rgba(10, 10, 10, 0.2))",
          backdropFilter: "blur(24px) saturate(135%)",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="content-container navbar-inner">
          <a href="#hero" className="navbar-brand" aria-label="Go to top">
            {personalInfo.name}
          </a>

          <div className="nav-desktop" role="navigation" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="nav-mobile-btn"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            <div className="hamburger-wrap">
              <span className={`hamburger-line ${isOpen ? "open-top" : ""}`} />
              <span className={`hamburger-line ${isOpen ? "open-middle" : ""}`} />
              <span className={`hamburger-line ${isOpen ? "open-bottom" : ""}`} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-menu"
            >
              {navLinks.map((link, index) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleMenuNavigate}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="mobile-nav-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mobile-nav-label">{link.label}</span>
                    <span className="mobile-nav-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
