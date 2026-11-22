"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasLoadedOnce = sessionStorage.getItem("portfolio-loader-complete") === "1";
    return !(reduceMotion || hasLoadedOnce);
  });

  const handleLoadComplete = useCallback(() => {
    sessionStorage.setItem("portfolio-loader-complete", "1");
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Content is always rendered so the prerendered HTML carries every section
          for crawlers and social scrapers. The loader sits on top as an overlay. */}
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>

      {isLoading && <Loader onComplete={handleLoadComplete} />}
    </>
  );
}
