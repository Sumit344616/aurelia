"use client";

import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import BrandLogo from "./BrandLogo";

interface ConsultationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

const CATEGORIES = [
  "Rings & Solitaires",
  "High Jewellery Necklaces",
  "Chandelier Earrings",
  "Sculptural Bracelets",
  "Bridal & Royal Heirlooms",
  "Bespoke Commission",
];

const ATELIERS = [
  "London — New Bond Street",
  "Paris — Place Vendôme",
  "Mumbai — Bandra Atelier",
  "New York — Fifth Avenue",
  "Virtual Private Salon",
];

export default function ConsultationDrawer({
  isOpen,
  onClose,
  initialInterest = "",
}: ConsultationDrawerProps) {
  const [selectedInterest, setSelectedInterest] = useState<string>(
    initialInterest || "High Jewellery Necklaces"
  );
  const [selectedAtelier, setSelectedAtelier] = useState<string>(
    "Paris — Place Vendôme"
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (initialInterest) {
      setSelectedInterest(initialInterest);
    }
  }, [initialInterest]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex justify-end transition-opacity duration-500"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0A08]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-[#0F0E0C] border-l border-[#C6A15B]/20 text-[#F5F0E8] h-full overflow-y-auto p-6 md:p-12 flex flex-col justify-between shadow-2xl z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-8 border-b border-[#C6A15B]/15">
            <BrandLogo variant="minimal" size="sm" />
            <button
              onClick={onClose}
              className="p-2 text-[#F5F0E8]/60 hover:text-[#C6A15B] transition-colors rounded-full hover:bg-white/5"
              aria-label="Close consultation modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <div className="mt-8">
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#C6A15B]">
                Private Client Liaison
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] font-light mt-2 tracking-wide">
                Begin a Private Consultation
              </h2>
              <p className="text-sm text-[#F5F0E8]/60 font-light mt-3 leading-relaxed">
                Discover exceptional gemstones, commission a one-of-a-kind
                creation, or view the high jewellery collection in total
                confidentiality.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Interest Selection */}
                <div>
                  <label className="block text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]/80 mb-3">
                    Area of Interest
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedInterest(cat)}
                        className={`text-xs py-2.5 px-3 text-left transition-all border ${
                          selectedInterest === cat
                            ? "border-[#C6A15B] bg-[#C6A15B]/10 text-[#F5F0E8]"
                            : "border-white/10 text-[#F5F0E8]/60 hover:border-white/25 hover:text-[#F5F0E8]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]/80 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Lady / Lord / Mr / Ms..."
                      className="w-full bg-[#151412] border border-white/10 px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C6A15B] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]/80 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="client@maison.com"
                        className="w-full bg-[#151412] border border-white/10 px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C6A15B] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]/80 mb-2">
                        Telephone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+44 / +33 / +91..."
                        className="w-full bg-[#151412] border border-white/10 px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C6A15B] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]/80 mb-2">
                      Preferred Atelier
                    </label>
                    <select
                      value={selectedAtelier}
                      onChange={(e) => setSelectedAtelier(e.target.value)}
                      className="w-full bg-[#151412] border border-white/10 px-4 py-3 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#C6A15B] transition-colors"
                    >
                      {ATELIERS.map((loc) => (
                        <option key={loc} value={loc} className="bg-[#151412]">
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]/80 mb-2">
                      Private Notes / Specific Piece
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Please note any bespoke requirements or preferred consultation timing..."
                      className="w-full bg-[#151412] border border-white/10 px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C6A15B] transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#C6A15B] text-[#0B0A08] hover:bg-[#DFCA95] font-sans text-xs uppercase tracking-[0.3em] font-medium transition-all duration-300 shadow-[0_10px_30px_rgba(198,161,91,0.2)]"
                  >
                    Request Confidential Appointment →
                  </button>
                  <p className="text-[10px] text-center text-[#F5F0E8]/40 mt-3 font-light">
                    Discretion and privacy assured by Aurelia High Jewellery Maison.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="mt-20 text-center py-12 px-6">
              <div className="w-14 h-14 mx-auto rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] mb-6">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#C6A15B]">
                Request Confirmed
              </span>
              <h3 className="font-serif text-3xl text-[#F5F0E8] font-light mt-3">
                We Await Your Presence
              </h3>
              <p className="text-sm text-[#F5F0E8]/70 mt-4 leading-relaxed max-w-sm mx-auto">
                Thank you, {formData.name || "Esteemed Guest"}. A senior client
                curator from our {selectedAtelier} atelier will contact you
                within 24 hours to coordinate your private salon appointment.
              </p>
              <button
                onClick={onClose}
                className="mt-8 px-8 py-3 border border-[#C6A15B]/50 hover:border-[#C6A15B] text-xs uppercase tracking-[0.25em] text-[#F5F0E8] transition-colors"
              >
                Return to Experience
              </button>
            </div>
          )}
        </div>

        {/* Footer info in drawer */}
        <div className="pt-8 mt-8 border-t border-white/10 text-center text-[11px] text-[#F5F0E8]/40">
          London · Paris · Mumbai · New York
        </div>
      </div>
    </div>
  );
}
