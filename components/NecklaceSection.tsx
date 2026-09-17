"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NecklaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageBgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const floatingDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Background image slow vertical drift
      if (imageBgRef.current) {
        gsap.to(imageBgRef.current, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        });
      }

      // Typography moves faster in opposite direction (depth parallax)
      if (textRef.current) {
        gsap.to(textRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Floating detail card rises smoothly into view
      if (floatingDetailRef.current) {
        gsap.fromTo(
          floatingDetailRef.current,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: -40,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "center center",
              scrub: 1.5,
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
      className="relative w-full min-h-[140vh] bg-[#0B0A08] text-[#F5F0E8] overflow-hidden flex items-center justify-between py-24"
    >
      {/* Background Fullscreen Portrait with Vertical Parallax */}
      <div
        ref={imageBgRef}
        className="absolute -top-[20%] inset-x-0 h-[140%] will-change-transform"
      >
        <Image
          src="/images/hero-necklace-portrait.jpg"
          alt="The Signature High Jewellery Necklace"
          fill
          className="object-cover object-center opacity-40 filter brightness-90 contrast-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/40 to-[#0B0A08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A08] via-transparent to-[#0B0A08]" />
      </div>

      {/* Main Content Diptych / Editorial Arrangement */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Editorial Headline */}
        <div ref={textRef} className="max-w-xl will-change-transform">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C6A15B]" />
            <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
              The High Jewellery Collar
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl text-[#F5F0E8] font-light leading-[0.92] tracking-tight">
            THE
            <br />
            <span className="italic text-[#C6A15B]">SIGNATURE.</span>
          </h2>

          <p className="text-sm md:text-base text-[#F5F0E8]/70 font-light mt-6 leading-relaxed">
            Draped across the collarbone like a tapestry of pure light. Seven
            cascading rows of Colombian pear-cut emeralds balanced by 18k white
            gold links that articulate with every breath.
          </p>

          <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-8 text-[10px] uppercase font-sans tracking-[0.3em] text-[#F5F0E8]/50">
            <div className="flex flex-col">
              <span className="text-[#C6A15B]">Pendant</span>
              <span>Central Pear Drop</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[#C6A15B]">Setting</span>
              <span>Invisible Articulation</span>
            </div>
          </div>
        </div>

        {/* Right Floating Detail Card */}
        <div
          ref={floatingDetailRef}
          className="w-full sm:w-[380px] lg:w-[420px] will-change-transform"
        >
          <div className="relative aspect-[3/4] bg-[#12110E] border border-white/15 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.9)] group">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/collection-eternity-necklace.jpg"
                alt="Detail of The Signature Necklace Setting"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-transparent to-transparent opacity-80" />
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                Focus // Macro 01
              </span>
              <p className="font-serif text-xl text-[#F5F0E8] font-light mt-1">
                The Cascade Droplet
              </p>
              <p className="text-[11px] text-[#F5F0E8]/60 font-light mt-1">
                Individually calibrated gems matched for hue and saturation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
