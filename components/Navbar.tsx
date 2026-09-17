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
            ? "bg-[#0B0A08]/85 backdrop-blur-md border-b border-[#C6A15B]/15 py-4"
            : "bg-gradient-to-b from-[#0B0A08]/80 via-[#0B0A08]/30 to-transparent border-b border-white/5 py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
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
                className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/70 hover:text-[#C6A15B] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action: Enquire CTA */}
          <div className="flex items-center space-x-5">
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-2 text-xs uppercase font-sans tracking-[0.25em] px-5 py-2.5 border border-[#C6A15B]/40 hover:border-[#C6A15B] text-[#F5F0E8] hover:bg-[#C6A15B]/10 transition-all duration-300 group"
            >
              <span>Enquire</span>
              <span className="text-[#C6A15B] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F5F0E8] hover:text-[#C6A15B] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0A08]/98 backdrop-blur-xl flex flex-col justify-between p-8 md:p-12 lg:hidden">
          <div className="pt-20">
            <span className="text-[10px] uppercase font-sans tracking-[0.35em] text-[#C6A15B]">
              Maison Aurelia
            </span>
            <div className="mt-8 flex flex-col space-y-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="font-serif text-3xl md:text-4xl text-[#F5F0E8] hover:text-[#C6A15B] text-left transition-colors font-light"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-4 text-center text-xs uppercase tracking-[0.3em] bg-[#C6A15B] text-[#0B0A08] font-medium"
            >
              Begin Private Consultation →
            </button>
            <div className="text-center text-[10px] uppercase tracking-[0.25em] text-[#F5F0E8]/40">
              London · Paris · Mumbai · New York
            </div>
          </div>
        </div>
      )}
    </>
  );
}
