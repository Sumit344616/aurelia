"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);

    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check element under cursor for cursor attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const customEl = target.closest("[data-cursor]") as HTMLElement | null;
        if (customEl) {
          const type = customEl.getAttribute("data-cursor") || "explore";
          setCursorText(type.toUpperCase());
          setIsHovered(true);
        } else if (
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a")
        ) {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp for outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } hidden md:block`}
      aria-hidden="true"
    >
      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed -top-1 -left-1 w-2 h-2 rounded-full bg-[#C6A15B] pointer-events-none will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />

      {/* Outer Luxury Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed pointer-events-none will-change-transform flex items-center justify-center transition-all duration-300 ease-out ${
          isHovered
            ? cursorText
              ? "-top-8 -left-8 w-16 h-16 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/80 backdrop-blur-[2px]"
              : "-top-4 -left-4 w-8 h-8 rounded-full border border-[#C6A15B]/70 bg-[#C6A15B]/10"
            : "-top-5 -left-5 w-10 h-10 rounded-full border border-[#C6A15B]/30"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {cursorText && (
          <span className="text-[9px] font-sans tracking-[0.2em] font-medium text-[#F5F0E8] select-none text-center">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
