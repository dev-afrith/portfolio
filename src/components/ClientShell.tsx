"use client";

import AmbientBg from "@/components/AmbientBg";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <AmbientBg />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
