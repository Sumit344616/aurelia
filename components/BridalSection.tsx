"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BridalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -15,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0.5, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center+=20%",
              end: "center center",
              scrub: 1.0,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bridal"
      className="relative w-full py-28 md:py-40 bg-[#12060A] text-[#F5F0E8] overflow-hidden"
    >
      {/* Subtle deep wine atmospheric gradient */}
      <div className="absolute inset-0 bg-radial from-[#6F1724]/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Royal Bridal Portrait */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] overflow-hidden border border-[#C6A15B]/25 shadow-[0_40px_120px_rgba(0,0,0,0.95)] bg-[#18090E] will-change-transform group"
            >
              <Image
                src="/images/bridal-heirloom.jpg"
                alt="Aurelia Royal Rajputana Bridal Polki Parure"
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12060A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                  Modern Indian Grandeur
                </span>
                <p className="font-serif text-xl text-[#F5F0E8] font-light">
                  The Royal Polki & Zambian Emerald Parure
                </p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div ref={textRef} className="lg:col-span-6 order-1 lg:order-2 space-y-8 will-change-transform">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#C6A15B]" />
                <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.45em] text-[#C6A15B]">
                  The Heirloom Bridal Parure
                </span>
              </div>

              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#F5F0E8] font-light leading-[0.95] tracking-tight">
                FOR THE
                <br />
                MOMENTS THAT
                <br />
                <span className="italic text-[#C6A15B]">MATTER.</span>
              </h2>

              <p className="text-sm md:text-base text-[#F5F0E8]/75 font-light mt-6 leading-relaxed">
                Where royal Rajputana Polki craft merges with the precision of
                contemporary European high jewellery. Uncut natural diamonds set
                in 22k gold foil alongside luminous untreated Zambian emeralds,
                crafted to be passed down through generations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-1">
                  Diamond Cut
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-light">
                  Natural Uncut Polki
                </p>
              </div>

              <div>
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-1">
                  Gemstone Provenance
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-light">
                  Zambian Royal Drops
                </p>
              </div>

              <div className="col-span-2 pt-2">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block mb-1">
                  Custom Atelier Craft
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-light">
                  Bespoke bridal commissions require a 4-month private salon preparation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
