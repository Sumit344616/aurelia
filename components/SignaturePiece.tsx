"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SignaturePieceProps {
  onEnquire: (pieceName: string) => void;
}

export default function SignaturePiece({ onEnquire }: SignaturePieceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinStageRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: pinStageRef.current,
          anticipatePin: 1,
        },
      });

      // Jewellery slowly magnifies
      tl.to(
        imageRef.current,
        {
          scale: 1.2,
          ease: "power1.inOut",
          duration: 3.0,
        },
        0
      );

      // Subtle champagne ambient halo intensifies
      tl.to(
        glowRef.current,
        {
          opacity: 0.6,
          scale: 1.3,
          ease: "power2.out",
          duration: 2.5,
        },
        0.5
      );

      // Typography moves gracefully upward into focus
      tl.fromTo(
        textRef.current,
        { y: 30, opacity: 0.7 },
        {
          y: -10,
          opacity: 1,
          ease: "none",
          duration: 2.0,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="signature-piece"
      className="relative w-full h-[220vh] bg-[#050504] text-[#F5F0E8]"
    >
      <div
        ref={pinStageRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-12 px-6 md:px-16 bg-[#050504]"
      >
        {/* Subtle Champagne Ambient Radial Glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-1000 flex items-center justify-center will-change-transform"
        >
          <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-radial from-[#C6A15B]/20 via-[#C6A15B]/5 to-transparent blur-3xl" />
        </div>

        {/* Top Minimal Header */}
        <div className="relative z-20 flex items-center justify-between border-b border-white/5 pb-4">
          <span className="text-[10px] uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
            Pinnacle Masterpiece · No. 01
          </span>
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#F5F0E8]/40">
            Confidential Provenance
          </span>
        </div>

        {/* Centerpiece Presentation */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          <div
            ref={imageRef}
            className="relative w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[26vw] aspect-[3/4] will-change-transform"
          >
            <Image
              src="/images/signature-piece.jpg"
              alt="The Aurelia Grand Solitaire and Emerald Cascade Masterpiece"
              fill
              className="object-cover object-center drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
              sizes="(max-width: 1024px) 70vw, 30vw"
            />
          </div>

          <div ref={textRef} className="mt-8 space-y-4 max-w-xl mx-auto will-change-transform">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#F5F0E8] font-light leading-tight tracking-tight">
              ONE PIECE.
              <br />
              <span className="italic text-[#C6A15B]">ENDLESS MOMENTS.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#F5F0E8]/70 font-light max-w-md mx-auto leading-relaxed">
              The Aurelia Sovereign Brooch Pendant. A 50.18-carat unheated
              Colombian emerald bordered by 48 architectural baguette diamonds.
            </p>

            <div className="pt-4">
              <button
                onClick={() =>
                  onEnquire("The Sovereign Emerald Pinnacle Masterpiece")
                }
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#C6A15B] text-[#0B0A08] hover:bg-[#DFCA95] text-xs uppercase font-sans tracking-[0.3em] font-medium transition-all duration-300 shadow-[0_10px_35px_rgba(198,161,91,0.25)] group"
              >
                <span>Enquire About the Piece</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-20 flex items-center justify-between text-[10px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/40 border-t border-white/5 pt-4">
          <span>Private Vault Exhibition</span>
          <span className="text-[#C6A15B]">Bespoke Commission Only</span>
        </div>
      </div>
    </section>
  );
}
