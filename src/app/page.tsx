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
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      {!isLoading && (
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
      )}
    </>
  );
}
