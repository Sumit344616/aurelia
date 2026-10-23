"use client";

import React, { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  PhoneCall,
  Mail,
  Clock,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Compass,
} from "lucide-react";
import {
  SITE_CONTACT,
  buildWhatsAppLink,
  getDirectCallLink,
} from "@/lib/siteContact";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkContainerRef = useRef<HTMLDivElement>(null);
  const wordmarkTextRef = useRef<HTMLHeadingElement>(null);
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyMobile = () => {
    navigator.clipboard.writeText(SITE_CONTACT.mobileNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2200);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-14 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <BrandLogo variant="full" size="md" />
            <p className="text-xs sm:text-[13px] text-[#F5F0E8]/65 font-light max-w-md leading-relaxed">
              Aurelia High Jewellery Maison. Sculptors of rare earth, D-Flawless
              diamonds, and untreated royal gems for the world&apos;s most
              distinguished collectors.
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
              <span>Direct Liaison & Bespoke Commissions</span>
            </div>
          </div>

          {/* Luxury Private Concierge Card with Direct Mobile & WhatsApp */}
          <div className="lg:col-span-6">
            <div className="border border-[#C6A15B]/30 bg-gradient-to-br from-[#100E0A] to-[#070605] p-5 sm:p-6 backdrop-blur-md relative overflow-hidden group shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between text-[9px] uppercase font-sans tracking-[0.32em] text-[#C6A15B]">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Private Client Office · Concierge Desk
                </span>
                <span className="hidden sm:inline-block text-[#F5F0E8]/40">
                  By Appointment
                </span>
              </div>

              {/* Direct Mobile & WhatsApp Info in Concierge Card */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <span className="text-[9.5px] uppercase tracking-[0.2em] font-sans text-[#C6A15B] block">
                    Mobile / WhatsApp
                  </span>
                  <a
                    href={getDirectCallLink()}
                    className="text-base sm:text-lg font-serif text-[#F5F0E8] hover:text-[#C6A15B] transition-colors block font-light tracking-wide no-underline mt-0.5"
                  >
                    {SITE_CONTACT.mobileNumber}
                  </a>
                </div>
                <div>
                  <span className="text-[9.5px] uppercase tracking-[0.2em] font-sans text-[#C6A15B] block">
                    Concierge Desk Line
                  </span>
                  <a
                    href={`tel:${SITE_CONTACT.telephoneRaw}`}
                    className="text-base sm:text-lg font-serif text-[#F5F0E8] hover:text-[#C6A15B] transition-colors block font-light tracking-wide no-underline mt-0.5"
                  >
                    {SITE_CONTACT.telephoneNumber}
                  </a>
                </div>
              </div>

              {/* Email & Actions */}
              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="text-xs text-[#F5F0E8]/70 hover:text-[#C6A15B] transition-colors flex items-center gap-1.5 font-light"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{SITE_CONTACT.email}</span>
                </a>
                <div className="flex items-center gap-2.5">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase font-sans tracking-[0.18em] px-3 py-1.5 bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={getDirectCallLink()}
                    className="text-[10px] uppercase font-sans tracking-[0.18em] px-3 py-1.5 bg-[#C6A15B]/15 border border-[#C6A15B]/40 text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A0907] transition-all flex items-center gap-1.5"
                  >
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flagship Boutique & Google Map Location Section */}
        <div className="py-12 sm:py-16 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                <Compass className="w-3.5 h-3.5" />
                <span>Flagship Atelier & Showroom</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8] font-light mt-1.5">
                Visit Aurelia Atelier in Mumbai
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] text-[#F5F0E8]/60 font-light max-w-md leading-relaxed">
              Step into our bespoke high jewellery salon. View rare D-Flawless
              solitaires, emerald suites, and consult with master artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Shop Contact & Details Box (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 border border-[#C6A15B]/25 bg-gradient-to-b from-[#110F0B] to-[#080706] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <div className="space-y-6">
                {/* Physical Address */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10.5px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] font-medium">
                    <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                    <span>Showroom Address</span>
                  </div>
                  <p className="font-serif text-lg text-[#F5F0E8]">
                    {SITE_CONTACT.flagship.name}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#F5F0E8]/70 font-light leading-relaxed">
                    {SITE_CONTACT.flagship.formatted}
                  </p>
                  <p className="text-[11px] text-[#C6A15B]/80 font-sans tracking-wide">
                    Landmark: {SITE_CONTACT.flagship.landmark}
                  </p>
                </div>

                {/* Mobile & Telephone Numbers */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] block">
                      Shop Mobile & WhatsApp
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <a
                        href={getDirectCallLink()}
                        className="font-serif text-lg sm:text-xl text-[#F5F0E8] hover:text-[#C6A15B] transition-colors"
                      >
                        {SITE_CONTACT.mobileNumber}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyMobile}
                        className="text-[10px] uppercase font-sans tracking-wider text-[#C6A15B] hover:text-[#E8D6AC] flex items-center gap-1 cursor-pointer"
                        title="Copy phone number"
                      >
                        {copiedNumber ? (
                          <>
                            <Check className="w-3 h-3 text-[#25D366]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] block">
                      Boutique Desk Line
                    </span>
                    <a
                      href={`tel:${SITE_CONTACT.telephoneRaw}`}
                      className="font-serif text-base sm:text-lg text-[#F5F0E8]/80 hover:text-[#C6A15B] transition-colors block mt-0.5"
                    >
                      {SITE_CONTACT.telephoneNumber}
                    </a>
                  </div>
                </div>

                {/* Visiting Hours */}
                <div className="pt-4 border-t border-white/5 space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Salon Timings</span>
                  </div>
                  <p className="text-xs text-[#F5F0E8]/80 font-light">
                    {SITE_CONTACT.flagship.hours}
                  </p>
                  <p className="text-[11px] text-[#F5F0E8]/50 font-light">
                    {SITE_CONTACT.flagship.sundayHours}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-3">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#1FA855] text-white text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer text-center no-underline shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={getDirectCallLink()}
                  className="py-3 px-4 border border-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A0907] text-[#F5F0E8] text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer text-center no-underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Right: Interactive Google Map Embed (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-white/10 bg-[#0B0A08] relative overflow-hidden group shadow-[0_15px_50px_rgba(0,0,0,0.7)] min-h-[380px]">
              {/* Header inside map frame */}
              <div className="p-4 bg-[#0F0E0B] border-b border-white/10 flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                  <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
                    Google Maps Location · Turner Road, Bandra West
                  </span>
                </div>
                <a
                  href={SITE_CONTACT.flagship.googleMapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10.5px] uppercase font-sans tracking-wider text-[#C6A15B] hover:text-[#E8D6AC] flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Google Maps iFrame with luxury integration */}
              <div className="relative w-full h-full min-h-[330px] flex-1 bg-[#100E0A]">
                <iframe
                  title="Aurelia High Jewellery Maison Location - Turner Road, Bandra West, Mumbai"
                  src={SITE_CONTACT.flagship.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(25%) contrast(105%)",
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[330px] object-cover"
                />

                {/* Subtle Overlay badge on map */}
                <div className="absolute bottom-4 left-4 pointer-events-auto bg-[#070605]/90 border border-[#C6A15B]/40 px-3.5 py-2 backdrop-blur-md shadow-lg hidden sm:flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C6A15B]" />
                  <div>
                    <span className="text-[10px] font-serif text-[#F5F0E8] block font-medium">
                      Aurelia Flagship Atelier
                    </span>
                    <span className="text-[9px] text-[#F5F0E8]/60 uppercase tracking-widest block font-sans">
                      Bandra West · Mumbai
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Multi-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12 pt-10 sm:pt-14 pb-12 sm:pb-16 border-t border-white/5">
          {/* Col 1: Navigation */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5F0E8]/65 font-light">
              <li>
                <a
                  href="#collection"
                  className="hover:text-[#C6A15B] transition-colors block"
                >
                  The Collection
                </a>
              </li>
              <li>
                <a
                  href="#ring-story"
                  className="hover:text-[#C6A15B] transition-colors block"
                >
                  Solitaire Rings
                </a>
              </li>
              <li>
                <a
                  href="#gemstones"
                  className="hover:text-[#C6A15B] transition-colors block"
                >
                  The Gemstones
                </a>
              </li>
              <li>
                <a
                  href="#craft"
                  className="hover:text-[#C6A15B] transition-colors block"
                >
                  The Craft
                </a>
              </li>
              <li>
                <a
                  href="#bridal"
                  className="hover:text-[#C6A15B] transition-colors block"
                >
                  Bridal Heirlooms
                </a>
              </li>
              <li>
                <a
                  href="#journal"
                  className="hover:text-[#C6A15B] transition-colors block"
                >
                  Editorial Journal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Atelier Salons with Phone Numbers */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
              Atelier Salons
            </h4>
            <div className="space-y-3.5 text-xs font-light">
              <div className="group">
                <span className="text-[#F5F0E8] group-hover:text-[#C6A15B] transition-colors block font-medium">
                  Mumbai (Flagship Atelier)
                </span>
                <span className="text-[#F5F0E8]/50 text-[11px] block">
                  24/A Turner Road, Bandra West
                </span>
                <a
                  href={getDirectCallLink()}
                  className="text-[#C6A15B] text-[10.5px] block font-sans tracking-wide hover:underline mt-0.5"
                >
                  Tel: {SITE_CONTACT.mobileNumber}
                </a>
              </div>
              <div className="group">
                <span className="text-[#F5F0E8] group-hover:text-[#C6A15B] transition-colors block font-medium">
                  Paris
                </span>
                <span className="text-[#F5F0E8]/50 text-[11px] block">
                  26 Place Vendôme · +33 1 42 68 00 00
                </span>
              </div>
              <div className="group">
                <span className="text-[#F5F0E8] group-hover:text-[#C6A15B] transition-colors block font-medium">
                  London
                </span>
                <span className="text-[#F5F0E8]/50 text-[11px] block">
                  14 New Bond Street · +44 20 7946 0912
                </span>
              </div>
              <div className="group">
                <span className="text-[#F5F0E8] group-hover:text-[#C6A15B] transition-colors block font-medium">
                  New York
                </span>
                <span className="text-[#F5F0E8]/50 text-[11px] block">
                  720 Fifth Avenue · +1 212 555 0198
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
                ✦ Private Tenders & Auctions
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                ✦ GIA & Gübelin Certified
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                ✦ Bespoke Bridal Commissions
              </li>
              <li className="hover:text-[#F5F0E8] transition-colors">
                ✦ Heritage Restoration & Vault
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
            © {new Date().getFullYear()} Aurelia High Jewellery Maison · Sumit ·
            All Rights Reserved.
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
            <span className="text-[#C6A15B]/30">·</span>
            <span className="hover:text-[#F5F0E8] transition-colors cursor-pointer">
              Discretion Assured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
