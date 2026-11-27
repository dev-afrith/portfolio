"use client";

import { useEffect, useRef, type CSSProperties, type PointerEventHandler, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
}

export default function TiltCard({
  children,
  className = "",
  style,
  maxTilt = 5,
  onPointerMove: externalPointerMove,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;

    let rafId = 0;
    let targetRx = 0;
    let targetRy = 0;
    let currentRx = 0;
    let currentRy = 0;
    let targetScale = 1;
    let currentScale = 1;
    let active = false;

    const animate = () => {
      currentRx += (targetRx - currentRx) * 0.14;
      currentRy += (targetRy - currentRy) * 0.14;
      currentScale += (targetScale - currentScale) * 0.14;

      el.style.transform = `perspective(1100px) rotateX(${currentRx.toFixed(3)}deg) rotateY(${currentRy.toFixed(3)}deg) scale3d(${currentScale.toFixed(4)}, ${currentScale.toFixed(4)}, 1)`;

      const settled =
        !active &&
        Math.abs(currentRx) < 0.02 &&
        Math.abs(currentRy) < 0.02 &&
        Math.abs(currentScale - 1) < 0.0005;

      if (settled) {
        el.style.transform = "";
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const onPointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(".aw-pill-btn")) {
        targetRx = 0;
        targetRy = 0;
        targetScale = 1;
        startLoop();
        return;
      }

      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      targetRy = (px - 0.5) * (maxTilt * 2);
      targetRx = (0.5 - py) * (maxTilt * 1.7);
      targetScale = 1.015;
      active = true;

      el.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
      el.dataset.tilting = "1";
      startLoop();
    };

    const onPointerLeave = () => {
      active = false;
      targetRx = 0;
      targetRy = 0;
      targetScale = 1;
      el.dataset.tilting = "0";
      startLoop();
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={cardRef} className={className} style={style} onPointerMove={externalPointerMove}>
      <div className="aw-pcard-border-glow" aria-hidden="true" />
      {children}
      <div className="aw-pcard-glare" aria-hidden="true" />
    </div>
  );
}
