"use client";

import React, { useEffect, useRef } from "react";
import BrandLogo from "./BrandLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkContainerRef = useRef<HTMLDivElement>(null);
  const wordmarkTextRef = useRef<HTMLHeadingElement>(null);

  const scrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!wordmarkContainerRef.current || !wordmarkTextRef.current) return;

      // Scroll-scrub slide: Starts smoothly shifted right and glides to dead-center as user enters footer
      gsap.fromTo(
        wordmarkTextRef.current,
        {
          x: 80,
          opacity: 0.15,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050504] text-[#F5F0E8] border-t border-white/10 pt-20 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <BrandLogo variant="full" size="md" />
            <p className="text-xs text-[#F5F0E8]/60 font-light max-w-sm leading-relaxed">
              Aurelia High Jewellery Maison. Sculptors of rare earth, D-Flawless
              diamonds, and untreated royal gems for the world&apos;s most
              distinguished collectors.
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B] block">
                Private Client Office
              </span>
              <a
                href="mailto:liaison@maisonaurelia.com"
                className="text-xs text-[#F5F0E8]/75 hover:text-[#C6A15B] transition-colors font-light mt-1 inline-block no-underline"
              >
                liaison@maisonaurelia.com
              </a>
            </div>
          </div>

          {/* Ateliers Col */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Atelier Salons
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E8]/60 font-light">
              <li className="hover:text-[#F5F0E8] transition-colors">14 New Bond Street, London</li>
              <li className="hover:text-[#F5F0E8] transition-colors">26 Place Vendôme, Paris</li>
              <li className="hover:text-[#F5F0E8] transition-colors">Bandra West Atelier, Mumbai</li>
              <li className="hover:text-[#F5F0E8] transition-colors">720 Fifth Avenue, New York</li>
            </ul>
          </div>

          {/* Maison Col */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E8]/60 font-light">
              <li>
                <a href="#collection" className="hover:text-[#C6A15B] transition-colors block">
                  The Collection
                </a>
              </li>
              <li>
                <a href="#ring-story" className="hover:text-[#C6A15B] transition-colors block">
                  Solitaire Rings
                </a>
              </li>
              <li>
                <a href="#gemstones" className="hover:text-[#C6A15B] transition-colors block">
                  The Gemstones
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-[#C6A15B] transition-colors block">
                  The Craft
                </a>
              </li>
              <li>
                <a href="#bridal" className="hover:text-[#C6A15B] transition-colors block">
                  Bridal Heirlooms
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#C6A15B] transition-colors block">
                  Editorial Journal
                </a>
              </li>
            </ul>
          </div>

          {/* Social / Discretion */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Connoisseurship
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E8]/60 font-light">
              <li className="hover:text-[#F5F0E8] transition-colors">Private Tenders</li>
              <li className="hover:text-[#F5F0E8] transition-colors">GIA & Gübelin Certification</li>
              <li className="hover:text-[#F5F0E8] transition-colors">Bespoke Commissions</li>
              <li className="hover:text-[#F5F0E8] transition-colors">Heritage Restoration</li>
            </ul>
          </div>
        </div>

        {/* Giant Architectural Wordmark with Right-to-Center Scroll-Scrub Slide */}
        <div
          ref={wordmarkContainerRef}
          className="py-10 sm:py-16 select-none overflow-hidden w-full flex justify-center border-b border-white/5"
        >
          <h2
            ref={wordmarkTextRef}
            onClick={scrollToTop}
            title="Click to scroll to top"
            className="font-serif text-[clamp(2.5rem,10.5vw,135px)] leading-none tracking-[0.06em] sm:tracking-[0.1em] whitespace-nowrap text-center text-[#F5F0E8]/15 hover:text-[#C6A15B]/40 transition-colors duration-700 cursor-pointer uppercase will-change-transform select-none max-w-full inline-block"
          >
            Aurelia
          </h2>
        </div>

        {/* Lower Legal Baseline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/40 gap-4 text-center sm:text-left">
          {/* Copyright */}
          <p className="whitespace-nowrap">
            © {new Date().getFullYear()} Aurelia High Jewellery Maison · Sumit · All Rights Reserved.
          </p>

          {/* Confidentiality & Kimberley Charter */}
          <div className="flex items-center gap-6 whitespace-nowrap">
            <span className="hover:text-[#F5F0E8] transition-colors cursor-pointer">
              Confidentiality Policy
            </span>
            <span className="text-[#C6A15B]/30">·</span>
            <span className="hover:text-[#F5F0E8] transition-colors cursor-pointer">
              Ethical Kimberley Charter
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
