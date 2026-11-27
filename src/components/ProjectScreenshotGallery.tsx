"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

interface GalleryFrame {
  id: string;
  label: string;
  src: string | StaticImageData;
  alt: string;
  isSvg?: boolean;
  focalClass?: string;
}

const SVG_SCHEMATICS: Record<string, string> = {
  "bizgenie-ai": "/covers/bizgenie.svg",
  tikizaya: "/covers/tikizaya.svg",
  skillsync: "/covers/skillsync.svg",
  ridegram: "/covers/ridegram.svg",
  "salary-payroll": "/covers/salary-payroll.svg",
  "notes-app": "/covers/notes-app.svg",
};

interface ProjectScreenshotGalleryProps {
  slug: string;
  title: string;
  cover: string | StaticImageData;
  alt: string;
}

export default function ProjectScreenshotGallery({
  slug,
  title,
  cover,
  alt,
}: ProjectScreenshotGalleryProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [lightboxFrame, setLightboxFrame] = useState<GalleryFrame | null>(null);

  const svgPath = SVG_SCHEMATICS[slug];

  const frames: GalleryFrame[] = [
    {
      id: "overview",
      label: `${title} — Primary interface`,
      src: cover,
      alt: `${alt} — primary interface view`,
      focalClass: "aw-gallery-img-center",
    },
    svgPath
      ? {
          id: "architecture",
          label: `${title} — Layout architecture`,
          src: svgPath,
          alt: `${title} system and layout schematic`,
          isSvg: true,
        }
      : {
          id: "workflow",
          label: `${title} — Workspace focus`,
          src: cover,
          alt: `${alt} — focused workspace view`,
          focalClass: "aw-gallery-img-left",
        },
    {
      id: "controls",
      label: `${title} — Interactive detail`,
      src: cover,
      alt: `${alt} — interactive detail view`,
      focalClass: "aw-gallery-img-right",
    },
  ];

  const syncScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".aw-gallery-card");
    const step = (card?.getBoundingClientRect().width || 320) + 14;
    setActiveSlide(Math.min(frames.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollByCard = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".aw-gallery-card");
    const step = (card?.getBoundingClientRect().width || 320) + 14;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    syncScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!lightboxFrame) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxFrame(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxFrame]);

  return (
    <section className="aw-gallery-wrap" aria-label={`${title} screenshot gallery`}>
      <div className="aw-gallery-head">
        <div>
          <p className="aw-label" style={{ color: "var(--gold-text)" }}>
            SCREENSHOTS
          </p>
          <p className="aw-gallery-sub">Interface views &amp; visual frames</p>
        </div>
        <div className="aw-gallery-controls">
          <span className="aw-label" style={{ color: "var(--ink-2)" }}>
            0{activeSlide + 1} / 0{frames.length}
          </span>
          <button
            type="button"
            className="aw-gallery-btn"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous screenshot"
          >
            ←
          </button>
          <button
            type="button"
            className="aw-gallery-btn"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next screenshot"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="aw-gallery-rail"
        onScroll={syncScroll}
        tabIndex={0}
        role="region"
        aria-label="Horizontal screenshot gallery"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scrollByCard(1);
          if (e.key === "ArrowLeft") scrollByCard(-1);
        }}
      >
        {frames.map((frame, i) => (
          <button
            key={frame.id}
            type="button"
            className="aw-gallery-card"
            onClick={() => setLightboxFrame(frame)}
            aria-label={`Inspect ${frame.label}`}
          >
            <div className="aw-gallery-media">
              {frame.isSvg && typeof frame.src === "string" ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={frame.src}
                  alt={frame.alt}
                  referrerPolicy="no-referrer"
                  className="aw-gallery-img"
                />
              ) : (
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  width={1200}
                  height={750}
                  sizes="(max-width: 640px) 80vw, 340px"
                  className={`aw-gallery-img ${frame.focalClass || ""}`}
                />
              )}
            </div>
            <div className="aw-gallery-caption">
              <span className="aw-label" style={{ color: "var(--ink-3)" }}>
                0{i + 1}
              </span>
              <span className="aw-gallery-caption-text">{frame.label}</span>
            </div>
          </button>
        ))}
      </div>

      {lightboxFrame && (
        <div
          className="aw-pmodal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxFrame.label}
          onClick={() => setLightboxFrame(null)}
        >
          <div
            className="aw-gallery-lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aw-pmodal-topbar">
              <span className="aw-label" style={{ color: "var(--gold-text)" }}>
                {lightboxFrame.label}
              </span>
              <button
                type="button"
                className="aw-pmodal-close"
                onClick={() => setLightboxFrame(null)}
                aria-label="Close screenshot preview"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="aw-gallery-lightbox-imgwrap">
              {lightboxFrame.isSvg && typeof lightboxFrame.src === "string" ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={lightboxFrame.src}
                  alt={lightboxFrame.alt}
                  referrerPolicy="no-referrer"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              ) : (
                <Image
                  src={lightboxFrame.src}
                  alt={lightboxFrame.alt}
                  width={1200}
                  height={750}
                  sizes="92vw"
                  className={lightboxFrame.focalClass || ""}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
