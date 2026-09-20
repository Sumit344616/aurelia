"use client";

import React from "react";
import Image from "next/image";
import BrandLogo from "./BrandLogo";

interface FinalCTAProps {
  onOpenConsultation: () => void;
}

export default function FinalCTA({ onOpenConsultation }: FinalCTAProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#070605] text-[#F5F0E8] flex flex-col justify-between overflow-hidden">
      {/* Background Cinematic Visual with Chiaroscuro Lighting */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-necklace-portrait.jpg"
          alt="Aurelia High Jewellery Campaign Finale"
          fill
          className="object-cover object-center filter brightness-40 contrast-125 scale-105 transition-transform duration-[10000ms] hover:scale-100"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-[#070605]/60 to-[#070605]/80" />
      </div>

      {/* Top Floating Brand Watermark */}
      <div className="relative z-10 pt-20 px-6 text-center">
        <BrandLogo variant="monogram" size="md" className="mx-auto opacity-70" />
      </div>

      {/* Main Luxury Invitation */}
      <div className="relative z-10 max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-6 text-center my-auto py-10 sm:py-16">
        <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.45em] text-[#C6A15B] block">
          The Invitation
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] text-[#F5F0E8] font-light mt-3 sm:mt-4 tracking-tight leading-[1.08] sm:leading-tight">
          YOUR NEXT HEIRLOOM{" "}
          <br className="hidden sm:inline" />
          <span className="italic text-[#C6A15B]">BEGINS HERE.</span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-[#F5F0E8]/65 font-light mt-4 max-w-xl mx-auto leading-relaxed">
          Private consultations available in London, Paris, Mumbai, or your
          residence worldwide.
        </p>

        {/* Action Buttons with Left-to-Right Fill Hover Animation */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md mx-auto">
          {/* Primary CTA: Liquid Gold Fill from Left to Right */}
          <button
            onClick={onOpenConsultation}
            className="relative w-full sm:w-auto px-7 sm:px-9 py-3.5 border border-[#C6A15B] bg-[#0E0C09]/90 text-[#F5F0E8] overflow-hidden group cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300"
          >
            {/* Left-to-Right Fill Animation Curtain */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-[#C6A15B] via-[#E8D6AC] to-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
              aria-hidden="true"
            />
            <span className="relative z-10 text-[11px] uppercase font-sans tracking-[0.25em] font-semibold text-[#F5F0E8] group-hover:text-[#0A0907] transition-colors duration-400 flex items-center justify-center gap-3">
              <span>Begin Private Consultation</span>
              <span className="text-[#C6A15B] group-hover:text-[#0A0907] transition-all duration-300 group-hover:translate-x-1 font-sans">
                →
              </span>
            </span>
          </button>

          {/* Secondary CTA: Champagne Fill from Left to Right */}
          <button
            onClick={onOpenConsultation}
            className="relative w-full sm:w-auto px-7 sm:px-8 py-3.5 border border-[#C6A15B]/50 bg-[#070605]/80 text-[#F5F0E8] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            {/* Left-to-Right Fill Animation Curtain */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-[#C6A15B] via-[#E8D6AC] to-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
              aria-hidden="true"
            />
            <span className="relative z-10 text-[11px] uppercase font-sans tracking-[0.25em] font-light text-[#F5F0E8] group-hover:text-[#0A0907] transition-colors duration-400 flex items-center justify-center gap-2.5">
              <span>Visit the Atelier</span>
              <span className="text-[#C6A15B] group-hover:text-[#0A0907] transition-all duration-300 group-hover:translate-x-1 font-sans">
                →
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Quiet Note */}
      <div className="relative z-10 pb-8 sm:pb-12 text-center text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.3em] text-[#F5F0E8]/40">
        Discretion Assured · By Appointment Only
      </div>
    </section>
  );
}
