"use client";

import React, { useEffect, useRef } from "react";

export default function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const isVisibleRef = useRef<boolean>(false);
  const tickingRef = useRef<boolean>(false);

  // SVG geometry: radius 20, circumference = 2 * PI * 20 ≈ 125.66
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Initial state: hidden
    if (buttonRef.current) {
      buttonRef.current.style.opacity = "0";
      buttonRef.current.style.transform = "translate3d(0, 16px, 0) scale(0.9)";
      buttonRef.current.style.pointerEvents = "none";
    }

    if (progressCircleRef.current) {
      progressCircleRef.current.style.strokeDasharray = `${circumference}`;
      progressCircleRef.current.style.strokeDashoffset = `${circumference}`;
    }

    const updatePosition = (currentScroll: number, maxScroll: number) => {
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      const offset = circumference - progress * circumference;

      // 1. Direct hardware-accelerated SVG offset update (Zero React re-renders)
      if (progressCircleRef.current) {
        progressCircleRef.current.style.strokeDashoffset = `${offset}`;
      }

      // 2. Direct visibility update
      const shouldBeVisible = currentScroll > 260;
      if (shouldBeVisible !== isVisibleRef.current && buttonRef.current) {
        isVisibleRef.current = shouldBeVisible;
        if (shouldBeVisible) {
          buttonRef.current.style.opacity = "1";
          buttonRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
          buttonRef.current.style.pointerEvents = "auto";
        } else {
          buttonRef.current.style.opacity = "0";
          buttonRef.current.style.transform = "translate3d(0, 16px, 0) scale(0.9)";
          buttonRef.current.style.pointerEvents = "none";
        }
      }
    };

    // Use Lenis scroll if available for synchronized frame updates
    const lenis = (window as any).__lenis;
    if (lenis) {
      const onLenisScroll = ({
        scroll,
        limit,
      }: {
        scroll: number;
        limit: number;
      }) => {
        updatePosition(scroll, limit);
      };

      lenis.on("scroll", onLenisScroll);

      // Trigger initial
      updatePosition(lenis.scroll || window.scrollY, lenis.limit || (document.documentElement.scrollHeight - window.innerHeight));

      return () => {
        lenis.off("scroll", onLenisScroll);
      };
    } else {
      // Native window scroll with requestAnimationFrame throttling
      const onWindowScroll = () => {
        if (!tickingRef.current) {
          window.requestAnimationFrame(() => {
            const scroll = window.scrollY || document.documentElement.scrollTop;
            const limit = document.documentElement.scrollHeight - window.innerHeight;
            updatePosition(scroll, limit);
            tickingRef.current = false;
          });
          tickingRef.current = true;
        }
      };

      window.addEventListener("scroll", onWindowScroll, { passive: true });
      onWindowScroll();

      return () => {
        window.removeEventListener("scroll", onWindowScroll);
      };
    }
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
      ref={buttonRef}
      onClick={handleScrollToTop}
      aria-label="Scroll back to top"
      title="Back to Top"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-13 md:h-13 rounded-full flex items-center justify-center bg-[#070605] border border-[#C6A15B]/35 hover:border-[#C6A15B] shadow-[0_6px_25px_rgba(0,0,0,0.9)] hover:shadow-[0_0_25px_rgba(198,161,91,0.4)] group cursor-pointer transition-[border-color,box-shadow,transform] duration-300 will-change-transform select-none"
      style={{
        transitionProperty: "opacity, transform, border-color, box-shadow",
        transitionDuration: "300ms",
      }}
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
          stroke="rgba(198, 161, 91, 0.18)"
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
