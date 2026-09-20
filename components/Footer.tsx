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
      className="relative w-full bg-[#050504] text-[#F5F0E8] border-t border-white/10 pt-16 sm:pt-20 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16">
        {/* Upper Brand & Concierge Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-14">
          {/* Brand Col */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <BrandLogo variant="full" size="md" />
            <p className="text-xs sm:text-[13px] text-[#F5F0E8]/65 font-light max-w-md leading-relaxed">
              Aurelia High Jewellery Maison. Sculptors of rare earth, D-Flawless
              diamonds, and untreated royal gems for the world&apos;s most
              distinguished collectors.
            </p>
          </div>

          {/* Luxury Private Concierge Card */}
          <div className="lg:col-span-6">
            <div className="border border-[#C6A15B]/30 bg-gradient-to-br from-[#100E0A] to-[#070605] p-5 sm:p-6 backdrop-blur-md relative overflow-hidden group shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between text-[9px] uppercase font-sans tracking-[0.32em] text-[#C6A15B]">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" />
                  Private Client Office · Concierge
                </span>
                <span className="hidden sm:inline-block text-[#F5F0E8]/40">
                  By Appointment
                </span>
              </div>
              <a
                href="mailto:liaison@maisonaurelia.com"
                className="text-base sm:text-lg font-serif text-[#F5F0E8] hover:text-[#C6A15B] transition-colors mt-3 block font-light tracking-wide no-underline"
              >
                liaison@maisonaurelia.com
              </a>
              <p className="text-[9.5px] text-[#F5F0E8]/50 uppercase tracking-[0.2em] font-sans mt-2">
                Worldwide Residence & Private Salon Appointments Available
              </p>
            </div>
          </div>
        </div>

        {/* Lower Multi-Column Grid (2 Columns on Mobile, 4 Columns on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12 pt-10 sm:pt-14 pb-12 sm:pb-16 border-t border-white/5">
          {/* Col 1: Navigation */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E8]/65 font-light">
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

          {/* Col 2: Atelier Salons */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Atelier Salons
            </h4>
            <div className="space-y-3 text-xs font-light">
              <div className="group">
                <span className="text-[#F5F0E8] group-hover:text-[#C6A15B] transition-colors block font-medium">
                  London
                </span>
                <span className="text-[#F5F0E8]/50 text-[11px] block">
                  14 New Bond Street
                </span>
              </div>
              <div className="group">
                <span className="text-[#F5F0E8] group-hover:text-[#C6A15B] transition-colors block font-medium">
                  Paris
                </span>
                <span className="text-[#F5F0E8]/50 text-[11px] block">
                  26 Place Vendôme
                </span>
              </div>
              <div className="group">
                <span className="text-[#F5F0E8] group-hover:text-[#C6A15B] transition-colors block font-medium">
                  Mumbai
                </span>
                <span className="text-[#F5F0E8]/50 text-[11px] block">
                  Bandra West Atelier
                </span>
              </div>
              <div className="group">
                <span className="text-[#F5F0E8] group-hover:text-[#C6A15B] transition-colors block font-medium">
                  New York
                </span>
                <span className="text-[#F5F0E8]/50 text-[11px] block">
                  720 Fifth Avenue
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Connoisseurship */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Connoisseurship
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E8]/65 font-light">
              <li className="hover:text-[#F5F0E8] transition-colors">
                ✦ Private Tenders
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                ✦ GIA & Gübelin
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                ✦ Bespoke Commissions
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                ✦ Heritage Restoration
              </li>
            </ul>
          </div>

          {/* Col 4: Maison Charters */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Maison Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E8]/65 font-light">
              <li className="hover:text-[#F5F0E8] transition-colors">
                Ethical Kimberley Origin
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                Armoured Global Transit
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                Vendôme Assay Hallmark
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                Lifetime Vault Archive
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Architectural Wordmark with Right-to-Center Scroll-Scrub Slide */}
        <div
          ref={wordmarkContainerRef}
          className="py-8 sm:py-14 select-none overflow-hidden w-full flex justify-center border-t border-b border-white/5"
        >
          <h2
            ref={wordmarkTextRef}
            onClick={scrollToTop}
            title="Click to scroll to top"
            className="font-serif text-[clamp(2.5rem,11.5vw,135px)] leading-none tracking-[0.06em] sm:tracking-[0.1em] whitespace-nowrap text-center text-[#F5F0E8]/15 hover:text-[#C6A15B]/40 transition-colors duration-700 cursor-pointer uppercase will-change-transform select-none max-w-full inline-block"
          >
            Aurelia
          </h2>
        </div>

        {/* Lower Legal Baseline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[9.5px] uppercase font-sans tracking-[0.22em] text-[#F5F0E8]/40 gap-4 text-center sm:text-left">
          {/* Copyright */}
          <p className="whitespace-normal sm:whitespace-nowrap">
            © {new Date().getFullYear()} Aurelia High Jewellery Maison · Sumit · All Rights Reserved.
          </p>

          {/* Confidentiality & Kimberley Charter */}
          <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap">
            <span className="hover:text-[#F5F0E8] transition-colors cursor-pointer">
              Confidentiality
            </span>
            <span className="text-[#C6A15B]/30">·</span>
            <span className="hover:text-[#F5F0E8] transition-colors cursor-pointer">
              Ethical Charter
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
