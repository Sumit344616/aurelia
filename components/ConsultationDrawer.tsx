"use client";

import React, { useState, useEffect } from "react";
import { X, Phone, PhoneCall, Sparkles, ArrowRight } from "lucide-react";
import BrandLogo from "./BrandLogo";
import {
  SITE_CONTACT,
  buildWhatsAppLink,
  getDirectCallLink,
} from "@/lib/siteContact";

interface ConsultationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export default function ConsultationDrawer({
  isOpen,
  onClose,
  initialInterest = "",
}: ConsultationDrawerProps) {
  const [selectedPiece, setSelectedPiece] = useState<string>(initialInterest);

  // Sync initial interest
  useEffect(() => {
    setSelectedPiece(initialInterest || "");
  }, [initialInterest]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      (window as any).__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      (window as any).__lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      (window as any).__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key listener to close modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleWhatsApp = () => {
    const url = buildWhatsAppLink(selectedPiece);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Dimmed Backdrop - Click to Close */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      {/* Centered Compact Luxury Modal */}
      <div
        className="relative z-10 w-full max-w-md bg-[#0D0B08] border border-[#C6A15B]/35 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-7 text-[#F5F0E8] overflow-hidden animate-scaleIn select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Gold Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Monogram & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <BrandLogo variant="minimal" size="sm" />
            <span className="text-[10px] uppercase font-sans tracking-[0.28em] text-[#C6A15B] font-medium">
              Direct Atelier Enquiry
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/15 hover:border-[#C6A15B] text-[#F5F0E8]/70 hover:text-[#C6A15B] hover:bg-white/5 transition-all flex items-center justify-center cursor-pointer group"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="pt-5 space-y-4">
          <div>
            <h3 className="font-serif text-2xl sm:text-[1.75rem] text-[#F5F0E8] font-light tracking-wide leading-snug">
              Chat Directly with Us
            </h3>
            <p className="text-xs text-[#F5F0E8]/65 font-light leading-relaxed mt-1">
              Connect directly with our master jewellers for pricing, gemstone
              details, and instant assistance. No forms required.
            </p>
          </div>

          {/* Piece Tag if clicked on a specific jewellery item */}
          {selectedPiece && (
            <div className="py-2 px-3 bg-[#17140E] border border-[#C6A15B]/30 flex items-center justify-between text-xs">
              <div className="truncate pr-2">
                <span className="text-[9px] uppercase tracking-wider text-[#C6A15B] block font-sans">
                  Enquiring About
                </span>
                <span className="font-serif text-[#F5F0E8] font-medium truncate block">
                  {selectedPiece}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPiece("")}
                className="text-[9.5px] uppercase tracking-wider text-[#F5F0E8]/40 hover:text-[#C6A15B] cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}

          {/* Action 1: 1-Click WhatsApp Button (Primary) */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-[#1FA855] via-[#25D366] to-[#128C7E] hover:from-[#25D366] hover:to-[#1FA855] text-white font-sans text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-between shadow-[0_8px_30px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {/* WhatsApp Icon */}
              <svg
                className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.712 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.487-8.413z"
                  fill="currentColor"
                />
              </svg>
              <div className="text-left">
                <span className="block font-medium">Message on WhatsApp</span>
                <span className="text-[9.5px] text-white/80 font-sans tracking-normal normal-case block font-light">
                  Direct Chat · Instant Reply
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Action 2: Direct Phone Call Button (Secondary) */}
          <a
            href={getDirectCallLink()}
            className="w-full py-3 px-5 border border-[#C6A15B]/40 hover:border-[#C6A15B] bg-[#12100C] hover:bg-[#191611] text-[#F5F0E8] font-sans text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-between transition-all duration-300 group no-underline"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-[#C6A15B] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="block font-medium">Call Mobile Directly</span>
                <span className="text-[10px] text-[#F5F0E8]/60 font-serif tracking-normal normal-case block font-light">
                  {SITE_CONTACT.mobileNumber}
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#C6A15B] font-sans font-normal">
              Tap to Dial
            </span>
          </a>

          {/* Showroom Quick Info Footer Strip */}
          <div className="pt-3 border-t border-white/5 space-y-1 text-center text-[10px] font-sans tracking-wide text-[#F5F0E8]/50">
            <p>
              <span className="text-[#C6A15B]">Flagship Atelier:</span> 24/A Turner
              Road, Bandra West, Mumbai
            </p>
            <p className="text-[9.5px] text-[#F5F0E8]/40">
              Hours: Mon – Sat 10:30 AM – 8:30 PM IST · Discretion Assured
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
