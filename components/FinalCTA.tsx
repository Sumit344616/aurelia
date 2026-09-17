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
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto py-16">
        <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.45em] text-[#C6A15B] mb-6 block">
          The Invitation
        </span>

        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F5F0E8] font-light tracking-tight leading-[0.92]">
          YOUR NEXT
          <br />
          HEIRLOOM
          <br />
          <span className="italic text-[#C6A15B]">BEGINS HERE.</span>
        </h2>

        <p className="mt-8 text-xs sm:text-sm md:text-base font-light text-[#F5F0E8]/70 tracking-[0.2em] uppercase max-w-lg mx-auto">
          Private consultations available in London, Paris, Mumbai, or your
          residence worldwide.
        </p>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-10 py-4 bg-[#C6A15B] text-[#0B0A08] hover:bg-[#DFCA95] text-xs uppercase font-sans tracking-[0.3em] font-medium transition-all duration-300 shadow-[0_15px_40px_rgba(198,161,91,0.25)]"
          >
            Begin a Private Consultation →
          </button>

          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-4 border border-[#C6A15B]/40 hover:border-[#C6A15B] text-xs uppercase font-sans tracking-[0.3em] text-[#F5F0E8] hover:bg-[#C6A15B]/10 transition-all duration-300"
          >
            Visit the Atelier →
          </button>
        </div>
      </div>

      {/* Bottom Quiet Note */}
      <div className="relative z-10 pb-12 text-center text-[10px] uppercase font-sans tracking-[0.3em] text-[#F5F0E8]/40">
        Discretion Assured · By Appointment Only
      </div>
    </section>
  );
}
