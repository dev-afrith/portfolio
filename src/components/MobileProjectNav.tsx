"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function MobileProjectNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="aw-mobile-bar">
        <Link href="/" style={{ fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em" }}>
          Muhammad Afrith
        </Link>
        <button
          type="button"
          className="aw-menu-icon-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="aw-project-mobile-sheet"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ pointerEvents: "none" }}
          >
            <line x1="4" x2="20" y1="7" y2="7" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="17" y2="17" />
          </svg>
        </button>
      </div>

      {menuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="aw-project-mobile-sheet"
            className="aw-mobile-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "44px" }}>
              <span style={{ fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em" }}>Muhammad Afrith</span>
              <button
                type="button"
                className="aw-menu-icon-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                  style={{ pointerEvents: "none" }}
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "32px" }} aria-label="Mobile">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`aw-mobile-sheet-link ${item.id === "projects" ? "is-active" : ""}`}
                  onClick={() => {
                    document.body.style.overflow = "";
                    document.documentElement.style.overflow = "";
                    setMenuOpen(false);
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ fontSize: "14px", color: "#858078" }} aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
