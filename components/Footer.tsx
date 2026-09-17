"use client";

import React from "react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#050504] text-[#F5F0E8] border-t border-white/10 pt-20 pb-12 overflow-hidden">
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
              <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                Private Client Office
              </span>
              <p className="text-xs text-[#F5F0E8]/80 font-light mt-1">
                liaison@maisonaurelia.com
              </p>
            </div>
          </div>

          {/* Ateliers Col */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Atelier Salons
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E8]/65 font-light">
              <li>14 New Bond Street, London</li>
              <li>26 Place Vendôme, Paris</li>
              <li>Bandra West Atelier, Mumbai</li>
              <li>720 Fifth Avenue, New York</li>
            </ul>
          </div>

          {/* Maison Col */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F0E8]/65 font-light">
              <li>
                <a href="#collection" className="hover:text-[#C6A15B] transition-colors">
                  The Collection
                </a>
              </li>
              <li>
                <a href="#ring-story" className="hover:text-[#C6A15B] transition-colors">
                  Solitaire Rings
                </a>
              </li>
              <li>
                <a href="#gemstones" className="hover:text-[#C6A15B] transition-colors">
                  The Gemstones
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-[#C6A15B] transition-colors">
                  The Craft
                </a>
              </li>
              <li>
                <a href="#bridal" className="hover:text-[#C6A15B] transition-colors">
                  Bridal Heirlooms
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#C6A15B] transition-colors">
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
            <ul className="space-y-2 text-xs text-[#F5F0E8]/65 font-light">
              <li>Private Tenders</li>
              <li>GIA & Gübelin Certification</li>
              <li>Bespoke Commissions</li>
              <li>Heritage Restoration</li>
            </ul>
          </div>
        </div>

        {/* Giant Architectural Wordmark */}
        <div className="py-12 select-none border-b border-white/5">
          <h2
            onClick={scrollToTop}
            className="font-serif text-[18vw] leading-none tracking-[0.18em] text-center text-[#F5F0E8]/10 hover:text-[#C6A15B]/25 transition-colors duration-700 cursor-pointer uppercase"
          >
            Aurelia
          </h2>
        </div>

        {/* Lower Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/40 gap-4">
          <p>© {new Date().getFullYear()} Aurelia High Jewellery Maison. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F5F0E8] cursor-pointer">Confidentiality Policy</span>
            <span>·</span>
            <span className="hover:text-[#F5F0E8] cursor-pointer">Ethical Kimberley Charter</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="text-[#C6A15B] hover:text-[#DFCA95] transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
