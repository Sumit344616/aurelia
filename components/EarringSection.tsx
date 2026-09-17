"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

export default function EarringSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Smooth editorial reveal on scroll into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }
      )
        .fromTo(
          [leftCardRef.current, rightCardRef.current],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.18,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .fromTo(
          specsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="earrings"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#0B0A08] text-[#F5F0E8] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C6A15B]" />
            <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
              Earring Architecture
            </span>
            <span className="w-6 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5F0E8] font-light tracking-tight leading-[1.05]">
            WEIGHTLESS <span className="italic text-[#C6A15B]">BRILLIANCE.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E8]/60 font-light mt-4 max-w-lg mx-auto leading-relaxed">
            Engineered to balance effortless kinetic movement with luminous diamond fire. 
            Calibrated marquise cuts articulate gently with every motion.
          </p>
        </div>

        {/* Balanced Architectural Diptych Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left: Editorial Model Portrait */}
          <div
            ref={leftCardRef}
            className="group relative h-[460px] sm:h-[540px] md:h-[580px] rounded-sm overflow-hidden border border-white/10 bg-[#12110E] shadow-2xl transition-all duration-700 hover:border-[#C6A15B]/50 flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Background Image with safe inner zoom */}
            <Image
              src="/images/hero-necklace-portrait.jpg"
              alt="Model wearing Aurelia High Jewellery earrings"
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Ambient Shadow Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A08]/60 via-transparent to-transparent pointer-events-none" />

            {/* Top Tag */}
            <div className="relative z-10 flex items-center justify-between text-[9px] uppercase font-sans tracking-[0.3em] text-[#F5F0E8]/60">
              <span>Salon Editorial</span>
              <span className="text-[#C6A15B]">Edition 2026</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="relative z-10">
              <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-1">
                Editorial Perspective
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light leading-snug">
                The Contour of Grace
              </h3>
              <p className="text-xs text-[#F5F0E8]/70 font-light mt-2 max-w-sm leading-relaxed">
                Sculpted to follow the natural cadence of the jawline, creating a halo of ambient light.
              </p>
            </div>
          </div>

          {/* Right: Close-up Haute Joaillerie Specimen */}
          <div
            ref={rightCardRef}
            className="group relative h-[460px] sm:h-[540px] md:h-[580px] rounded-sm overflow-hidden border border-[#C6A15B]/30 bg-[#141310] shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-all duration-700 hover:border-[#C6A15B]/70 flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Background Image with safe inner zoom */}
            <Image
              src="/images/earring-close.jpg"
              alt="Close-up Chandelier Diamond Earring"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Ambient Shadow Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A08]/60 via-transparent to-transparent pointer-events-none" />

            {/* Top Tag */}
            <div className="relative z-10 flex items-center justify-between text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Kinetic Diamond Articulation
              </span>
              <span className="border border-[#C6A15B]/40 px-2 py-0.5 rounded-full text-[8px] tracking-[0.2em]">
                D-Flawless
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="relative z-10">
              <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-1">
                Kinetic Articulation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] font-light leading-snug">
                The Cascade Drops
              </h3>
              <p className="text-xs text-[#F5F0E8]/70 font-light mt-2 max-w-sm leading-relaxed">
                Marquise and pear cuts hand-set on platinum linkages calibrated to catch salon light at every tilt.
              </p>
            </div>
          </div>
        </div>

        {/* Atelier Technical Specifications */}
        <div
          ref={specsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 mt-12 border-t border-white/10"
        >
          <div>
            <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-1.5">
              01 · Dynamic Balance
            </span>
            <p className="text-xs text-[#F5F0E8]/70 font-light leading-relaxed">
              Multi-axis platinum linkages engineered for frictionless sway and featherlight all-evening wear.
            </p>
          </div>
          <div>
            <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-1.5">
              02 · Facet Alignment
            </span>
            <p className="text-xs text-[#F5F0E8]/70 font-light leading-relaxed">
              D-Flawless marquise diamonds positioned at opposing 45° angles for omnidirectional refraction.
            </p>
          </div>
          <div>
            <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-1.5">
              03 · Place Vendôme Handcraft
            </span>
            <p className="text-xs text-[#F5F0E8]/70 font-light leading-relaxed">
              Over 140 meticulous atelier hours of hand-sculpted prongs and mirror-polished noble platinum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
