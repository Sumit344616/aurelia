"use client";

import React, { useEffect, useRef } from "react";
import BrandLogo from "./BrandLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const QUOTE_LINES = [
  ["“Jewellery", "is", "not", "simply", "worn."],
  ["It", "becomes", "part", "of", "the", "moments", "we", "keep,"],
  ["the", "legacies", "we", "whisper,", "and", "the", "light"],
  ["we", "pass", "into", "eternity.”"],
];

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const words = containerRef.current.querySelectorAll(".quote-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Monogram & Header reveal
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        // 2. Poetic Quote: Word-by-Word handwriting write-in effect
        .fromTo(
          words,
          {
            opacity: 0,
            y: 8,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.45,
            stagger: 0.05, // Cadence for word-by-word write-in
            ease: "power2.out",
          },
          "-=0.2"
        )
        // 3. Supporting Philosophy Paragraph
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        )
        // 4. Heritage Credentials
        .fromTo(
          credentialsRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 md:py-40 bg-[#0B0A08] text-[#F5F0E8] overflow-hidden border-y border-white/5"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        {/* Monogram & Header */}
        <div ref={headerRef} className="flex flex-col items-center">
          <BrandLogo variant="monogram" size="sm" className="mb-8" />
          <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.45em] text-[#C6A15B]">
            The Aurelia Philosophy
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F5F0E8] font-light mt-4 tracking-tight leading-tight">
            BEYOND <span className="italic text-[#C6A15B]">JEWELLERY.</span>
          </h2>
        </div>

        {/* Poetic Editorial Statement with Word-by-Word Write-In Animation */}
        <blockquote
          ref={quoteRef}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F5F0E8]/90 font-light mt-10 max-w-3xl leading-relaxed italic select-none"
        >
          {QUOTE_LINES.map((line, lineIdx) => (
            <span key={lineIdx} className="block mb-1 sm:mb-2">
              {line.map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  className="quote-word inline-block mr-[0.28em] will-change-transform"
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </blockquote>

        {/* Supporting Philosophy */}
        <p
          ref={paragraphRef}
          className="mt-8 text-xs sm:text-sm text-[#F5F0E8]/60 font-light max-w-xl leading-relaxed"
        >
          Founded on the uncompromising pursuit of geological rarity, our maison
          bridges the royal heritage of Indian craftsmanship with the clean,
          sculptural clarity of modern European high design.
        </p>

        {/* Heritage Credentials */}
        <div
          ref={credentialsRef}
          className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full text-center"
        >
          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-light block">
              100%
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/50 mt-1 block">
              Ethical Sourcing
            </span>
          </div>

          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-light block">
              D-IF
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/50 mt-1 block">
              Diamond Purity
            </span>
          </div>

          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-light block">
              240h
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/50 mt-1 block">
              Handcraft Per Piece
            </span>
          </div>

          <div>
            <span className="font-serif text-2xl sm:text-3xl text-[#C6A15B] font-light block">
              18K/Pt
            </span>
            <span className="text-[9px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/50 mt-1 block">
              Noble Alloys Only
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
