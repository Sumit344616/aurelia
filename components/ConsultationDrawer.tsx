"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Check,
  ChevronDown,
  MapPin,
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
  User,
  Building2,
  Video,
  Clock,
  ArrowRight,
} from "lucide-react";
import BrandLogo from "./BrandLogo";

interface ConsultationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

interface AtelierOption {
  id: string;
  city: string;
  location: string;
  badge: string;
  phone: string;
  isVirtual?: boolean;
}

const CATEGORIES = [
  "Rings & Solitaires",
  "High Jewellery Necklaces",
  "Chandelier Earrings",
  "Sculptural Bracelets",
  "Bridal & Royal Heirlooms",
  "Bespoke Commissions",
];

const ATELIER_OPTIONS: AtelierOption[] = [
  {
    id: "paris",
    city: "Paris",
    location: "26 Place Vendôme · Flagship Haute Joaillerie Salon",
    badge: "Haute Joaillerie",
    phone: "+33 1 42 68 00 00",
  },
  {
    id: "london",
    city: "London",
    location: "14 New Bond Street · Private Vault & Salon",
    badge: "Historic Atelier",
    phone: "+44 20 7946 0912",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    location: "Bandra West Atelier · High Jewellery Studio",
    badge: "Bespoke Studio",
    phone: "+91 22 2640 1800",
  },
  {
    id: "new-york",
    city: "New York",
    location: "720 Fifth Avenue · Connoisseur Penthouse",
    badge: "Private Penthouse",
    phone: "+1 212 555 0198",
  },
  {
    id: "virtual",
    city: "Virtual Private Salon",
    location: "Worldwide Encrypted 4K Video Liaison",
    badge: "Global VIP",
    phone: "Encrypted Line",
    isVirtual: true,
  },
];

const QUOTE_WORDS = [
  "Every",
  "singular",
  "creation",
  "begins",
  "with",
  "a",
  "confidential",
  "dialogue.",
  "We",
  "sculpt",
  "eternity",
  "from",
  "rare",
  "earth,",
  "untreated",
  "gemstones,",
  "and",
  "D-Flawless",
  "brilliance.",
];

export default function ConsultationDrawer({
  isOpen,
  onClose,
  initialInterest = "",
}: ConsultationDrawerProps) {
  const [selectedInterest, setSelectedInterest] = useState<string>(
    initialInterest || "High Jewellery Necklaces"
  );
  const [selectedAtelier, setSelectedAtelier] = useState<AtelierOption>(
    ATELIER_OPTIONS[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [burstKey, setBurstKey] = useState<number>(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTiming: "Afternoon Salon (14:00 - 18:00)",
    notes: "",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync initial interest
  useEffect(() => {
    if (initialInterest) {
      setSelectedInterest(initialInterest);
    }
  }, [initialInterest]);

  // Click outside to close custom dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Lock background scroll, freeze Lenis, and trigger burst animation on open
  useEffect(() => {
    if (isOpen) {
      (window as any).__lenis?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      setBurstKey((prev) => prev + 1);

      const randomRef =
        "AUR-2026-" +
        selectedAtelier.city.slice(0, 2).toUpperCase() +
        "-" +
        Math.floor(1000 + Math.random() * 9000);
      setReferenceNumber(randomRef);
    } else {
      (window as any).__lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setIsDropdownOpen(false);
      setSubmitted(false);
    }

    return () => {
      (window as any).__lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, selectedAtelier.city]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDropdownOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] w-full h-full max-w-full max-h-full bg-[#070605] text-[#F5F0E8] overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen
          ? "translate-x-0 pointer-events-auto"
          : "translate-x-full pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Continuous Full-Screen Luxury Atelier Image Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/journal-craft-heritage.jpg"
          alt="Aurelia High Jewellery Atelier"
          className="w-full h-full object-cover opacity-20 filter grayscale-[15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070605] via-[#070605]/85 to-[#070605]" />
      </div>

      {/* Unified 12-Column Layout: Direct Connection With Zero Gap */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Side: Editorial Showcase (4 Columns) */}
        <aside className="hidden md:flex md:col-span-5 lg:col-span-4 h-full flex-col justify-between py-8 px-6 lg:px-8 border-r border-[#C6A15B]/20 select-none">
          {/* Top Brand Identity */}
          <div className="space-y-3">
            <BrandLogo variant="full" size="md" />
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
              <span className="text-[9px] uppercase font-sans tracking-[0.35em] text-[#C6A15B]">
                Haute Joaillerie Maison · Est. 1926
              </span>
            </div>
          </div>

          {/* Middle Philosophy Quote with Canva-style Text Burst Animation */}
          <div className="my-auto py-6 w-full space-y-4">
            <div className="w-12 h-[1px] bg-[#C6A15B]/60" />
            <blockquote className="font-serif text-xl lg:text-2xl text-[#F5F0E8] font-light leading-relaxed tracking-wide italic flex flex-wrap gap-x-2 gap-y-1 w-full">
              {QUOTE_WORDS.map((word, i) => (
                <span
                  key={`${burstKey}-${i}`}
                  className="inline-block opacity-0 animate-canva-burst will-change-transform"
                  style={{
                    animationDelay: `${isOpen ? 320 + i * 45 : 0}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  {word === "D-Flawless" ? (
                    <span className="text-[#C6A15B] font-normal not-italic">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </blockquote>
            <p className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]/80 pt-1">
              Direct Client Liaison & Bespoke Office
            </p>
          </div>

          {/* Bottom Salon Directory */}
          <div className="border-t border-white/10 pt-6 space-y-3 text-[11px] text-[#F5F0E8]/70">
            <div className="grid grid-cols-2 gap-3 text-[10px] font-light">
              <div>
                <p className="font-serif font-medium text-[#F5F0E8]">Paris</p>
                <p className="text-[#F5F0E8]/50">26 Place Vendôme</p>
              </div>
              <div>
                <p className="font-serif font-medium text-[#F5F0E8]">London</p>
                <p className="text-[#F5F0E8]/50">14 New Bond Street</p>
              </div>
              <div>
                <p className="font-serif font-medium text-[#F5F0E8]">Mumbai</p>
                <p className="text-[#F5F0E8]/50">Bandra West Atelier</p>
              </div>
              <div>
                <p className="font-serif font-medium text-[#F5F0E8]">New York</p>
                <p className="text-[#F5F0E8]/50">720 Fifth Avenue</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] uppercase tracking-[0.2em] text-[#C6A15B]/70">
              <span>Private Salons by Appointment</span>
              <span>liaison@maisonaurelia.com</span>
            </div>
          </div>
        </aside>

        {/* Right Side: Consultation Form Suite (8 Columns, Directly Adjacent) */}
        <main className="w-full md:col-span-7 lg:col-span-8 h-full overflow-y-auto overscroll-contain py-8 px-6 sm:px-8 lg:px-10 flex flex-col justify-between bg-[#070605]/50">
          <div className="w-full">
            {/* Top Bar Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#C6A15B]/20">
              <div className="flex items-center gap-3">
                <div className="md:hidden">
                  <BrandLogo variant="minimal" size="sm" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/10 border border-[#C6A15B]/25">
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse" />
                  <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] font-medium">
                    Private Concierge Desk Active
                  </span>
                </div>
              </div>

              {/* Minimal Clean Close Button: Only Icon */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C6A15B] text-[#F5F0E8]/70 hover:text-[#C6A15B] hover:bg-white/5 transition-all duration-300 flex items-center justify-center cursor-pointer group"
                aria-label="Close consultation modal"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {!submitted ? (
              <div className="mt-8">
                {/* Headline Area */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                    <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#C6A15B] font-medium">
                      Haute Joaillerie · Private Client Office
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F0E8] font-light tracking-wide">
                    Begin a Private Consultation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#F5F0E8]/70 font-light leading-relaxed">
                    Direct liaison with Senior Curators for rare investment-grade gemstones, high jewellery acquisitions, and bespoke private commissions.
                  </p>
                </div>

                {/* Form: Directly Connected, Spacious */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-7">
                  {/* 01: Area of Interest */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] font-medium">
                        01 · Area of Interest
                      </label>
                      <span className="text-[11px] text-[#F5F0E8]/40 tracking-wider">
                        Select Primary Focus
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {CATEGORIES.map((cat) => {
                        const isSelected = selectedInterest === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedInterest(cat)}
                            className={`text-xs sm:text-sm py-3 px-4 text-left transition-all duration-200 border cursor-pointer ${
                              isSelected
                                ? "border-[#C6A15B] bg-[#C6A15B]/15 text-[#F5F0E8] shadow-[0_0_18px_rgba(198,161,91,0.2)] font-medium"
                                : "border-white/10 bg-[#12110F] text-[#F5F0E8]/70 hover:border-[#C6A15B]/50 hover:text-[#F5F0E8]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate leading-snug">{cat}</span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 02: Preferred Salon / Atelier */}
                  <div ref={dropdownRef} className="relative">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] font-medium">
                        02 · Preferred Salon / Atelier *
                      </label>
                      <span className="text-[11px] text-[#F5F0E8]/40 tracking-wider">
                        In-Person Salon or Encrypted Virtual Suite
                      </span>
                    </div>

                    {/* Dropdown Trigger Box */}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-[#12110F] border px-4 py-3.5 text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        isDropdownOpen
                          ? "border-[#C6A15B] shadow-[0_0_20px_rgba(198,161,91,0.18)] ring-1 ring-[#C6A15B]/40"
                          : "border-white/15 hover:border-[#C6A15B]/60"
                      }`}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/30 flex items-center justify-center shrink-0">
                          {selectedAtelier.isVirtual ? (
                            <Video className="w-4 h-4 text-[#C6A15B]" />
                          ) : (
                            <MapPin className="w-4 h-4 text-[#C6A15B]" />
                          )}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm sm:text-base font-serif tracking-wider text-[#F5F0E8] font-medium">
                              {selectedAtelier.city}
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-[#C6A15B]/15 text-[#C6A15B] border border-[#C6A15B]/25">
                              {selectedAtelier.badge}
                            </span>
                          </div>
                          <p className="text-xs text-[#F5F0E8]/60 font-light truncate mt-0.5">
                            {selectedAtelier.location}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 text-[#C6A15B] transition-transform duration-300 shrink-0 ml-2 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Popup */}
                    {isDropdownOpen && (
                      <div
                        className="absolute left-0 right-0 top-full mt-2 bg-[#12110F] border border-[#C6A15B]/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)] z-50 overflow-hidden backdrop-blur-xl animate-fadeIn"
                        role="listbox"
                      >
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B]/60 to-transparent" />
                        <div className="p-1.5 space-y-1 max-h-64 overflow-y-auto overscroll-contain">
                          {ATELIER_OPTIONS.map((atelier) => {
                            const isSelected = selectedAtelier.id === atelier.id;
                            return (
                              <button
                                key={atelier.id}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setSelectedAtelier(atelier);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${
                                  isSelected
                                    ? "bg-[#C6A15B]/20 border-l-2 border-[#C6A15B] text-[#F5F0E8]"
                                    : "hover:bg-white/5 hover:text-[#F5F0E8] text-[#F5F0E8]/75 border-l-2 border-transparent"
                                }`}
                              >
                                <div className="flex items-center gap-3.5">
                                  <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                      isSelected
                                        ? "bg-[#C6A15B] text-[#0C0B0A]"
                                        : "bg-white/5 text-[#F5F0E8]/50"
                                    }`}
                                  >
                                    {atelier.isVirtual ? (
                                      <Video className="w-3.5 h-3.5" />
                                    ) : (
                                      <Building2 className="w-3.5 h-3.5" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-serif font-medium tracking-wide">
                                        {atelier.city}
                                      </span>
                                      <span className="text-[8px] uppercase tracking-[0.2em] px-1.5 py-0.5 rounded bg-white/5 text-[#C6A15B]">
                                        {atelier.badge}
                                      </span>
                                    </div>
                                    <p className="text-xs text-[#F5F0E8]/55 font-light">
                                      {atelier.location}
                                    </p>
                                  </div>
                                </div>

                                {isSelected && (
                                  <Check className="w-4 h-4 text-[#C6A15B] shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 03: Client Particulars */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] font-medium">
                        03 · Client Credentials
                      </label>
                      <span className="text-[11px] text-[#F5F0E8]/40 tracking-wider">
                        Strictly Confidential Liaison
                      </span>
                    </div>

                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]/70">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Full Name (Lady / Lord / Mr / Ms...)"
                          className="w-full bg-[#12110F] border border-white/15 pl-10 pr-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/35 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30 transition-all"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]/70">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="Email Address (client@maison.com)"
                          className="w-full bg-[#12110F] border border-white/15 pl-10 pr-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/35 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone + Preferred Timing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]/70">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="Telephone / WhatsApp (+44 / +33 / +91...)"
                          className="w-full bg-[#12110F] border border-white/15 pl-10 pr-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/35 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30 transition-all"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]/70">
                          <Clock className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={formData.preferredTiming}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredTiming: e.target.value,
                            })
                          }
                          placeholder="Preferred Timing (e.g. Afternoon Salon)"
                          className="w-full bg-[#12110F] border border-white/15 pl-10 pr-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/35 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Bespoke Notes Input */}
                    <div>
                      <input
                        type="text"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Specific piece from collection, gemstone carat weight, or bespoke anniversary requirements..."
                        className="w-full bg-[#12110F] border border-white/15 px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/35 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit CTA & Discretion Guarantee */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-gradient-to-r from-[#C6A15B] via-[#E2CE9F] to-[#C6A15B] text-[#0B0A08] font-sans text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-[0_10px_35px_rgba(198,161,91,0.25)] hover:shadow-[0_15px_45px_rgba(198,161,91,0.45)] hover:scale-[1.008] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      <span>Request Confidential Appointment</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-[#F5F0E8]/50 font-light text-center">
                      <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
                      <span>
                        256-Bit Encrypted Liaison Protocol · Aurelia Maison Discretion Charter · Guaranteed Privacy
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              /* Confirmation Screen */
              <div className="mt-16 text-center py-12 px-6 animate-fadeIn max-w-xl mx-auto">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-[#C6A15B]/15 animate-ping" />
                  <div className="relative w-20 h-20 rounded-full border-2 border-[#C6A15B] flex items-center justify-center text-[#C6A15B] bg-[#12110F] shadow-[0_0_30px_rgba(198,161,91,0.35)]">
                    <Check className="w-10 h-10 stroke-[2.5]" />
                  </div>
                </div>

                <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#C6A15B] font-medium">
                  Appointment Protocol Confirmed
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F0E8] font-light mt-3">
                  We Await Your Presence
                </h3>

                <div className="mt-6 p-5 rounded bg-[#12110F] border border-[#C6A15B]/30 text-left space-y-2.5">
                  <div className="flex justify-between items-center text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
                    <span>Confidential Dossier</span>
                    <span>{referenceNumber}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2.5 text-xs text-[#F5F0E8]/80 space-y-1.5">
                    <p>
                      <span className="text-[#F5F0E8]/40">Guest:</span>{" "}
                      {formData.name || "Esteemed Client"}
                    </p>
                    <p>
                      <span className="text-[#F5F0E8]/40">Salon:</span>{" "}
                      {selectedAtelier.city} ({selectedAtelier.location})
                    </p>
                    <p>
                      <span className="text-[#F5F0E8]/40">Focus:</span>{" "}
                      {selectedInterest}
                    </p>
                    <p>
                      <span className="text-[#F5F0E8]/40">Timing:</span>{" "}
                      {formData.preferredTiming}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#F5F0E8]/70 mt-6 leading-relaxed font-light">
                  Thank you, {formData.name || "Esteemed Client"}. A Senior High
                  Jewellery Curator from our {selectedAtelier.city} salon has been
                  personally assigned to your dossier and will reach out privately within 24 hours.
                </p>

                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-3.5 border border-[#C6A15B] hover:bg-[#C6A15B]/15 text-xs uppercase tracking-[0.25em] text-[#F5F0E8] transition-all duration-300 cursor-pointer"
                >
                  Return to Experience
                </button>
              </div>
            )}
          </div>

          {/* Bottom Footer Bar */}
          <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-[10px] text-[#F5F0E8]/40 uppercase tracking-[0.25em] w-full">
            <span>London · Paris · Mumbai · New York</span>
            <span className="text-[#C6A15B]/70">Maison Aurelia · Private Registry</span>
          </div>
        </main>
      </div>
    </div>
  );
}
