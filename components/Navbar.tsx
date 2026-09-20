"use client";

import React, { useState, useEffect } from "react";
import BrandLogo from "./BrandLogo";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
}

const NAV_LINKS = [
  { name: "Collection", href: "#collection" },
  { name: "The Ring", href: "#ring-story" },
  { name: "The Stone", href: "#gemstones" },
  { name: "Atelier & Craft", href: "#craft" },
  { name: "Bridal Heirloom", href: "#bridal" },
  { name: "Journal", href: "#journal" },
];

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if ((window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-[#0B0A08]/85 backdrop-blur-md border-b border-[#C6A15B]/15 py-3.5 sm:py-4"
            : "bg-gradient-to-b from-[#0B0A08]/85 via-[#0B0A08]/30 to-transparent border-b border-white/5 py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark & Monogram */}
          <a
            href="#"
            className="flex items-center group cursor-pointer"
            aria-label="Aurelia High Jewellery Maison"
          >
            <BrandLogo variant="full" size="md" />
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-9">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/70 hover:text-[#C6A15B] transition-colors relative py-1 group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action: Enquire CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <button
              onClick={onOpenConsultation}
              className="relative hidden sm:inline-flex items-center gap-2 text-xs uppercase font-sans tracking-[0.25em] px-6 py-2.5 border border-[#C6A15B] text-[#F5F0E8] overflow-hidden group cursor-pointer transition-colors duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              {/* Left-to-Right Fill Animation Curtain */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-[#C6A15B] via-[#E6D4A8] to-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                aria-hidden="true"
              />
              <span className="relative z-10 font-medium group-hover:text-[#0A0907] transition-colors duration-400">
                Enquire
              </span>
              <span className="relative z-10 text-[#C6A15B] group-hover:text-[#0A0907] transition-all duration-400 group-hover:translate-x-1 font-sans">
                →
              </span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#F5F0E8] hover:text-[#C6A15B] transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop Dimmer Overlay */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-55 bg-black/75 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Ultra-Luxury Mobile Navigation Menu (Full Width on Phones, Pan Left Drawer on Tablets) */}
      <div
        className={`fixed inset-y-0 left-0 z-60 w-full sm:max-w-[420px] bg-[#070605] border-r border-[#C6A15B]/20 shadow-[25px_0_70px_rgba(0,0,0,0.95)] flex flex-col justify-between p-6 sm:p-8 lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Soft Radial Gold Aura behind Drawer */}
        <div
          className="absolute -top-10 -left-10 w-72 h-72 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(198,161,91,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Drawer Header: Logo + Close Icon */}
        <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
          <BrandLogo variant="full" size="sm" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-white/15 hover:border-[#C6A15B] flex items-center justify-center text-[#F5F0E8] hover:text-[#C6A15B] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Editorial Sequence with Roman Numbers */}
        <div className="relative z-10 py-6 my-auto">
          <span className="text-[9.5px] uppercase font-sans tracking-[0.35em] text-[#C6A15B] block mb-4">
            Maison Aurelia · Directory
          </span>

          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link, idx) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="group flex items-center justify-between py-3 sm:py-3.5 border-b border-white/5 hover:border-[#C6A15B]/30 transition-all text-left w-full cursor-pointer"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] font-sans tracking-[0.3em] text-[#C6A15B]/50 group-hover:text-[#C6A15B] transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] group-hover:text-[#C6A15B] group-hover:translate-x-1.5 transition-all duration-300 font-light tracking-wide">
                    {link.name}
                  </span>
                </div>
                <span className="text-xs text-[#C6A15B] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Drawer Footer Action & Global Salons */}
        <div className="relative z-10 pt-5 border-t border-white/10 space-y-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="relative w-full py-3.5 px-6 border border-[#C6A15B] overflow-hidden group cursor-pointer shadow-[0_4px_25px_rgba(198,161,91,0.15)] flex items-center justify-center transition-colors"
          >
            {/* Left-to-Right Fill Animation Curtain */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-[#C6A15B] via-[#E6D4A8] to-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
              aria-hidden="true"
            />
            <span className="relative z-10 text-[11px] uppercase tracking-[0.28em] font-sans font-medium text-[#F5F0E8] group-hover:text-[#0A0907] transition-colors duration-400 flex items-center justify-center gap-3">
              <span>Begin Private Consultation</span>
              <span className="text-[#C6A15B] group-hover:text-[#0A0907] group-hover:translate-x-1 transition-all duration-300 font-sans">
                →
              </span>
            </span>
          </button>

          <div className="flex items-center justify-center gap-2.5 text-[8.5px] uppercase tracking-[0.25em] text-[#F5F0E8]/40">
            <span>London</span>
            <span className="text-[#C6A15B]/40">·</span>
            <span>Paris</span>
            <span className="text-[#C6A15B]/40">·</span>
            <span>Mumbai</span>
            <span className="text-[#C6A15B]/40">·</span>
            <span>New York</span>
          </div>
        </div>
      </div>
    </>
  );
}
