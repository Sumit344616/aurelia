"use client";

import React, { useState, useEffect, useRef } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  // SVG geometry: radius 20, circumference = 2 * PI * 20 ≈ 125.66
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (progressCircleRef.current) {
      progressCircleRef.current.style.strokeDasharray = `${circumference}`;
      progressCircleRef.current.style.strokeDashoffset = `${circumference}`;
    }

    const updateScrollProgress = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        (window as any).__lenis?.scroll ||
        0;

      const maxScroll =
        (document.documentElement.scrollHeight - window.innerHeight) ||
        (window as any).__lenis?.limit ||
        1;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      const offset = circumference - progress * circumference;

      if (progressCircleRef.current) {
        progressCircleRef.current.style.strokeDashoffset = `${offset}`;
      }

      // Show button once user scrolls past 200px
      setIsVisible(scrollY > 200);
    };

    // 1. Listen to window scroll (native & fallback)
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    // 2. Poll and bind to Lenis smooth scroll
    let lenisAttached = false;
    const attachLenis = () => {
      const lenis = (window as any).__lenis;
      if (lenis && !lenisAttached) {
        lenis.on("scroll", updateScrollProgress);
        lenisAttached = true;
      }
    };

    attachLenis();
    const lenisPollInterval = setInterval(attachLenis, 150);

    // Initial updates to handle page load & refreshed scroll positions
    updateScrollProgress();
    const t1 = setTimeout(updateScrollProgress, 120);
    const t2 = setTimeout(updateScrollProgress, 500);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      clearInterval(lenisPollInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      const lenis = (window as any).__lenis;
      if (lenis && lenisAttached) {
        lenis.off("scroll", updateScrollProgress);
      }
    };
  }, [circumference]);

  const handleScrollToTop = () => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      // Butter-smooth easeOutCubic glide without thread blocking
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="Scroll back to top"
      title="Back to Top"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-13 md:h-13 rounded-full flex items-center justify-center bg-[#070605] border border-[#C6A15B]/40 hover:border-[#C6A15B] shadow-[0_6px_25px_rgba(0,0,0,0.9)] hover:shadow-[0_0_25px_rgba(198,161,91,0.5)] group cursor-pointer transition-all duration-300 will-change-transform select-none ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
    >
      {/* Circular Progress Ring matching uploaded reference */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        viewBox="0 0 48 48"
      >
        {/* Subtle Background Track Ring */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(198, 161, 91, 0.2)"
          strokeWidth="2.5"
        />
        {/* Active Progress Indicator Ring (1:1 Synchronized with Scroll) */}
        <circle
          ref={progressCircleRef}
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#C6A15B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Centered Luxury Upward Arrow Icon */}
      <svg
        className="relative z-10 w-4 h-4 md:w-5 md:h-5 text-[#C6A15B] group-hover:text-[#F5F0E8] transform group-hover:-translate-y-0.5 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.4}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19V5M5 12l7-7 7 7"
        />
      </svg>
    </button>
  );
}
