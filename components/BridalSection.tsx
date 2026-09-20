"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, Sparkles, Gem } from "lucide-react";

export default function BridalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        imageRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }
      ).fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bridal"
      style={{ zIndex: 30 }}
      className="relative z-30 w-full min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-center py-6 sm:py-10 lg:py-12 bg-[#12060A] text-[#F5F0E8] overflow-hidden border-t-2 border-[#C6A15B]/40 shadow-[0_-25px_60px_rgba(198,161,91,0.1),0_-50px_140px_rgba(0,0,0,1)]"
    >
      {/* Subtle deep wine atmospheric gradient */}
      <div className="absolute inset-0 bg-radial from-[#6F1724]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Royal Bridal Portrait (Optimized to prevent cropping) */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative w-full max-w-[420px] lg:max-w-none h-[380px] sm:h-[460px] lg:h-[500px] xl:h-[540px] max-h-[64vh] aspect-[3/4] overflow-hidden rounded-sm border border-[#C6A15B]/30 shadow-[0_30px_90px_rgba(0,0,0,0.95)] bg-[#18090E] group"
            >
              <Image
                src="/images/bridal-heirloom.jpg"
                alt="Aurelia Royal Rajputana Bridal Polki Parure"
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12060A]/90 via-[#12060A]/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#12060A]/40 via-transparent to-transparent pointer-events-none" />

              {/* Top Archival Tag */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[9px] uppercase font-sans tracking-[0.3em] text-[#F5F0E8]/70 pointer-events-none">
                <span className="flex items-center gap-1.5 text-[#C6A15B]">
                  <Crown className="w-3 h-3" />
                  Rajputana Royal Atelier
                </span>
                <span>Bridal 2026</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-0.5">
                  Modern Indian Grandeur
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light">
                  The Royal Polki & Zambian Emerald Parure
                </p>
                <p className="text-[11px] text-[#F5F0E8]/60 font-light mt-0.5">
                  Uncut diamond slices hand-set in 22k pure gold foil
                </p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative & Specifications */}
          <div
            ref={textRef}
            className="lg:col-span-6 order-1 lg:order-2 space-y-6 lg:space-y-8"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[1px] bg-[#C6A15B]" />
                <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
                  The Heirloom Bridal Parure
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F0E8] font-light leading-[1.02] tracking-tight">
                FOR THE
                <br />
                MOMENTS THAT
                <br />
                <span className="italic text-[#C6A15B]">MATTER.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#F5F0E8]/75 font-light mt-4 max-w-lg leading-relaxed">
                Where royal Rajputana Polki craft merges with the precision of
                contemporary European high jewellery. Uncut natural diamonds set
                in 22k gold foil alongside luminous untreated Zambian emeralds,
                crafted to be passed down through generations.
              </p>
            </div>

            {/* Micro Specifications Grid */}
            <div className="grid grid-cols-2 gap-5 pt-5 border-t border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-sans tracking-[0.28em] text-[#C6A15B]">
                  <Gem className="w-3 h-3 text-[#C6A15B]" />
                  Diamond Cut
                </div>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-light">
                  Natural Uncut Polki
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-sans tracking-[0.28em] text-[#C6A15B]">
                  <Sparkles className="w-3 h-3 text-[#C6A15B]" />
                  Gemstone Provenance
                </div>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-light">
                  Zambian Royal Drops
                </p>
              </div>

              <div className="col-span-2 pt-2 space-y-1">
                <span className="text-[9px] uppercase font-sans tracking-[0.28em] text-[#C6A15B] block">
                  Custom Atelier Craft
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8]/80 font-light leading-relaxed">
                  Bespoke bridal commissions require a 4-month private salon preparation with master setters in Jaipur & Place Vendôme.
                </p>
              </div>
            </div>

            {/* Bottom Atelier Hallmark Bar */}
            <div className="p-3 bg-[#1A0C12] border border-[#C6A15B]/30 rounded-sm flex items-center justify-between text-[8.5px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
              <span>Handcrafted 22K/18K Gold Setting</span>
              <span className="text-[#F5F0E8]/50">Maison Archival Parure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
