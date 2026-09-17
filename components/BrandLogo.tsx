"use client";

import React from "react";

interface BrandLogoProps {
  variant?: "full" | "monogram" | "minimal";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({
  variant = "full",
  className = "",
  size = "md",
}: BrandLogoProps) {
  const monogramSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-sm tracking-[0.3em]",
    md: "text-lg tracking-[0.35em]",
    lg: "text-2xl tracking-[0.4em]",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Original Geometric Monogram: Interlocking Diamond Arch "A" */}
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${monogramSizes[size]} text-[#C6A15B] shrink-0 transition-transform duration-500 hover:scale-105`}
        aria-label="Aurelia Monogram"
      >
        {/* Outer Rhombus / Diamond Facet */}
        <path
          d="M30 3L57 30L30 57L3 30L30 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        {/* Inner Stylized Architectural 'A' Chevron */}
        <path
          d="M30 14L44 42H38L30 26L22 42H16L30 14Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        {/* Precision Crossbar Accent */}
        <line
          x1="22"
          y1="34"
          x2="38"
          y2="34"
          stroke="#0B0A08"
          strokeWidth="1.5"
        />
        {/* Central Brilliant Star Facet */}
        <circle cx="30" cy="30" r="1.5" fill="#F5F0E8" />
      </svg>

      {variant !== "monogram" && (
        <div className="flex flex-col">
          <span
            className={`font-serif uppercase font-light text-[#F5F0E8] leading-none ${textSizes[size]}`}
          >
            Aurelia
          </span>
          {variant === "full" && (
            <span className="text-[7px] md:text-[8px] font-sans uppercase tracking-[0.45em] text-[#C6A15B]/80 mt-1">
              High Jewellery
            </span>
          )}
        </div>
      )}
    </div>
  );
}
