"use client";

import React, { useState } from "react";
import Diamond3DCanvas, { GemCut, GemColor, RingAlloy } from "./3d/Diamond3DCanvas";
import { Sparkles, RotateCw } from "lucide-react";

interface RingExperienceProps {
  onEnquireRing: (commissionDetails?: string) => void;
}

export default function RingExperience({ onEnquireRing }: RingExperienceProps) {
  const selectedCut: GemCut = "emerald";
  const [selectedColor, setSelectedColor] = useState<GemColor>("diamond");
  const [selectedAlloy, setSelectedAlloy] = useState<string>("Platinum 950");

  const ALLOY_OPTIONS: { name: string; key: RingAlloy; color: string }[] = [
    { name: "Platinum 950", key: "platinum", color: "#F0EEF5" },
    { name: "18k Champagne Gold", key: "champagne", color: "#D4AF64" },
    { name: "18k Rose Gold", key: "rose", color: "#DF9487" },
  ];

  const GEM_OPTIONS: { id: GemColor; name: string; tag: string; dot: string }[] = [
    { id: "diamond", name: "D-Flawless Diamond", tag: "Type IIa Ice", dot: "#FFFFFF" },
    { id: "emerald", name: "Colombian Emerald", tag: "Muzo Green", dot: "#10B981" },
    { id: "ruby", name: "Burmese Ruby", tag: "Pigeon's Blood", dot: "#EF4444" },
    { id: "sapphire", name: "Ceylon Sapphire", tag: "Royal Velvet", dot: "#3B82F6" },
  ];

  const currentAlloyKey =
    ALLOY_OPTIONS.find((a) => a.name === selectedAlloy)?.key || "platinum";

  const selectedGemObj = GEM_OPTIONS.find((g) => g.id === selectedColor);

  const commissionString = `The Imperial Solitaire (${selectedCut.toUpperCase()} · ${selectedGemObj?.name || "Diamond"} · ${selectedAlloy})`;

  return (
    <section
      id="ring-story"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-center py-6 sm:py-8 lg:py-10 bg-[#070605] text-[#F5F0E8] overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-center h-full">
        {/* Compact Editorial Header (Single-Screen Optimized) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-3 mb-4 sm:mb-6 gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-6 h-[1px] bg-[#C6A15B]" />
              <span className="text-[9px] uppercase font-sans tracking-[0.35em] text-[#C6A15B]">
                Private Commission Salon
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F0E8] font-light tracking-tight leading-none">
              THE IMPERIAL <span className="italic text-[#C6A15B]">SOLITAIRE.</span>
            </h2>
          </div>

          <p className="max-w-sm text-[11px] text-[#F5F0E8]/60 font-light leading-relaxed">
            Configure your bespoke solitaire commission. French talon prongs, 
            micro-pavé shoulders, and crystal refraction cast in Place Vendôme.
          </p>
        </div>

        {/* Single-Screen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left: Interactive 3D Showcase (Comfortably Zoomed Out to Show Entire Ring) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative h-[40vh] sm:h-[48vh] lg:h-[58vh] max-h-[520px] bg-[#0A0907] border border-white/10 rounded-sm shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-center group">
              <Diamond3DCanvas
                scrollProgress={0}
                cut={selectedCut}
                color={selectedColor}
                alloy={currentAlloyKey}
                caratScale={1.0}
                autoRotate={true}
                showMounting={true}
                className="w-full h-full"
              />

              {/* Top Floating Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="bg-[#070605]/85 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full text-[8px] sm:text-[9px] uppercase font-sans tracking-[0.25em] text-[#C6A15B] flex items-center gap-1.5">
                  <Sparkles className="w-2.5 h-2.5 text-[#C6A15B]" />
                  <span>360° Studio Showcase</span>
                </div>

                <div className="bg-[#070605]/85 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-full text-[8px] uppercase font-sans tracking-[0.2em] text-[#F5F0E8]/60 hidden sm:block">
                  Type IIa Pure Crystal · IOR 2.417
                </div>
              </div>

              {/* Bottom Turntable Status Cue */}
              <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-none text-[8px] sm:text-[9px] uppercase font-sans tracking-[0.2em] text-[#F5F0E8]/40">
                <span className="flex items-center gap-1.5">
                  <RotateCw className="w-2.5 h-2.5 text-[#C6A15B]/70 animate-spin-slow" />
                  Continuous 360° Turntable · Drag to Orbit
                </span>
                <span>Real-Time Facet Refraction</span>
              </div>
            </div>
          </div>

          {/* Right: Bespoke Atelier Specifications Panel */}
          <div className="lg:col-span-5 space-y-4 bg-[#0E0D0B] p-5 sm:p-6 border border-white/10 rounded-sm shadow-xl">
            {/* Gemstone Specimen */}
            <div>
              <span className="text-[9px] uppercase font-sans tracking-[0.35em] text-[#C6A15B] block mb-1.5">
                Gemstone Specimen
              </span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {GEM_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedColor(g.id)}
                    className={`p-2 text-left rounded-sm transition-all border flex items-center gap-2 ${
                      selectedColor === g.id
                        ? "border-[#C6A15B] bg-[#C6A15B]/15 text-[#F5F0E8] ring-1 ring-[#C6A15B]/50"
                        : "border-white/10 text-[#F5F0E8]/50 hover:border-white/25 hover:text-[#F5F0E8]"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/20 shrink-0 shadow-sm"
                      style={{ backgroundColor: g.dot }}
                    />
                    <div className="min-w-0">
                      <span className="block text-[11px] font-sans truncate text-[#F5F0E8]">
                        {g.name}
                      </span>
                      <span className="block text-[7px] uppercase font-sans tracking-[0.15em] text-[#C6A15B]/80 truncate">
                        {g.tag}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Noble Mounting Alloy */}
            <div>
              <span className="text-[9px] uppercase font-sans tracking-[0.35em] text-[#C6A15B] block mb-1.5">
                Noble Mounting Alloy
              </span>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {ALLOY_OPTIONS.map((al) => (
                  <button
                    key={al.name}
                    onClick={() => setSelectedAlloy(al.name)}
                    className={`py-2 px-1 text-center rounded-sm transition-all border flex flex-col items-center gap-1 ${
                      selectedAlloy === al.name
                        ? "border-[#C6A15B] bg-[#C6A15B]/15 text-[#F5F0E8] ring-1 ring-[#C6A15B]/50"
                        : "border-white/10 text-[#F5F0E8]/50 hover:border-white/25"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: al.color }}
                    />
                    <span className="text-[9px] font-sans tracking-wide leading-tight">
                      {al.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Bespoke Dossier Summary Card */}
            <div className="bg-[#13120F] p-3 border border-[#C6A15B]/30 rounded-sm space-y-1">
              <div className="flex items-center justify-between text-[8px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
                <span>Commission Dossier</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse" />
              </div>
              <div className="text-xs font-serif text-[#F5F0E8] font-light truncate">
                EMERALD CUT · {selectedGemObj?.name} · {selectedAlloy}
              </div>
              <div className="text-[8.5px] text-[#F5F0E8]/50 font-sans tracking-wide">
                Hand-sculpted French talon prongs · Place Vendôme Hallmark
              </div>
            </div>

            {/* CTA Enquiry Button */}
            <div className="pt-0.5">
              <button
                onClick={() => onEnquireRing(commissionString)}
                className="relative w-full py-3 border border-[#C6A15B] bg-[#0E0C09]/90 text-[#F5F0E8] overflow-hidden group cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                {/* Left-to-Right Fill Animation Curtain */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-[#C6A15B] via-[#E8D6AC] to-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  aria-hidden="true"
                />
                <span className="relative z-10 text-[11px] uppercase font-sans tracking-[0.28em] font-medium group-hover:text-[#0A0907] transition-colors duration-400 flex items-center justify-center gap-2">
                  <span>Request Bespoke Allocation</span>
                  <span className="text-[#C6A15B] group-hover:text-[#0A0907] transition-all duration-300 group-hover:translate-x-1 font-sans">
                    →
                  </span>
                </span>
              </button>
              <p className="text-[8px] text-center text-[#F5F0E8]/40 mt-1.5 font-light tracking-wide">
                Confidential private allocation with Master Gemologist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
