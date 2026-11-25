"use client";

import { useEffect, useRef } from "react";

const PARTICLES = [
  { x: 8, y: 82, s: 1.5, d: 16, delay: -2 },
  { x: 14, y: 64, s: 1, d: 21, delay: -7 },
  { x: 21, y: 90, s: 2, d: 18, delay: -4 },
  { x: 29, y: 52, s: 1.5, d: 24, delay: -11 },
  { x: 37, y: 76, s: 1, d: 15, delay: -3 },
  { x: 46, y: 88, s: 2, d: 22, delay: -9 },
  { x: 58, y: 68, s: 1.5, d: 19, delay: -5 },
  { x: 71, y: 84, s: 1, d: 25, delay: -13 },
  { x: 78, y: 58, s: 2, d: 17, delay: -6 },
  { x: 85, y: 79, s: 1.5, d: 20, delay: -10 },
  { x: 92, y: 66, s: 1, d: 14, delay: -1 },
  { x: 11, y: 38, s: 1.5, d: 23, delay: -12 },
  { x: 33, y: 31, s: 1, d: 18, delay: -8 },
  { x: 49, y: 42, s: 2, d: 26, delay: -15 },
  { x: 64, y: 35, s: 1.5, d: 16, delay: -4 },
  { x: 76, y: 28, s: 1, d: 21, delay: -7 },
  { x: 88, y: 44, s: 2, d: 19, delay: -14 },
  { x: 95, y: 33, s: 1.5, d: 24, delay: -9 },
];

export default function AmbientBg() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const onVis = () => {
      layer.dataset.paused = document.hidden ? "1" : "0";
    };
    document.addEventListener("visibilitychange", onVis);

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || window.innerWidth <= 768) {
      return () => document.removeEventListener("visibilitychange", onVis);
    }

    let tx = window.innerWidth * 0.5;
    let ty = window.innerHeight * 0.35;
    let cx = tx;
    let cy = ty;
    let raf = 0;

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      layer.style.setProperty("--mx", `${cx.toFixed(1)}px`);
      layer.style.setProperty("--my", `${cy.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={layerRef} className="bg-layer" aria-hidden="true">
      <div className="bg-glow bg-glow-gold" />
      <div className="bg-glow bg-glow-cool" />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`bg-dust ${i >= 8 ? "bg-dust-extra" : ""}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            animationDuration: `${p.d}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <div className="bg-spotlight" />
    </div>
  );
}

