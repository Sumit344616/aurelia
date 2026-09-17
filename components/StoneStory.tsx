"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GemstoneData {
  id: string;
  name: string;
  subtitle: string;
  provenance: string;
  hardness: string;
  refractiveIndex: string;
  atmosphereColor: string;
  accentColor: string;
  image: string;
  story: string;
}

const GEMSTONES: GemstoneData[] = [
  {
    id: "diamond",
    name: "Diamond",
    subtitle: "Pure Carbon Crystallized in the Earth's Deep Mantle",
    provenance: "Kimberlite Pipes · Botswana & Golconda",
    hardness: "10 Mohs (Unyielding)",
    refractiveIndex: "2.417 (Extreme Dispersion)",
    atmosphereColor: "from-[#0B0A08] to-[#12110E]",
    accentColor: "#C6A15B",
    image: "/images/hero-gemstone-macro.jpg",
    story:
      "Formed three billion years ago under pressures that bend continents. The diamond possesses an eternal optical geometry that splits pure light into the entire visible spectrum.",
  },
  {
    id: "emerald",
    name: "Emerald",
    subtitle: "The Sacred Jardin of Colombian Green Fire",
    provenance: "Muzo & Chivor Mines · Colombia",
    hardness: "7.5–8 Mohs",
    refractiveIndex: "1.577–1.583 (Velvety Depth)",
    atmosphereColor: "from-[#05130A] to-[#0A2214]",
    accentColor: "#34D399",
    image: "/images/gem-emerald.jpg",
    story:
      "Unlike any other crystal, an untreated emerald breathes with its 'jardin'—internal silk inclusions that act as the stone's biological fingerprint, proving its natural earth origin.",
  },
  {
    id: "ruby",
    name: "Ruby",
    subtitle: "Pigeon's Blood Crimson with Red Fluorescence",
    provenance: "Mogok Valley · Burma",
    hardness: "9 Mohs (Corundum)",
    refractiveIndex: "1.762–1.770 (Internal Fire)",
    atmosphereColor: "from-[#1D050A] to-[#2B0912]",
    accentColor: "#F43F5E",
    image: "/images/gem-ruby.jpg",
    story:
      "Revered across antiquity as the Ratnaraj—'King of Precious Stones'. Rare Burmese rubies glow from within when touched by daylight due to high chromium and zero iron interference.",
  },
  {
    id: "sapphire",
    name: "Sapphire",
    subtitle: "The Velvety Twilight of Royal Kashmir",
    provenance: "Zanskar Range · Kashmir",
    hardness: "9 Mohs (Corundum)",
    refractiveIndex: "1.762–1.770 (Deep Dispersion)",
    atmosphereColor: "from-[#050B1A] to-[#09152E]",
    accentColor: "#60A5FA",
    image: "/images/gem-sapphire.jpg",
    story:
      "A serene cornflower blue with microscopic rutile silk that scatters light without dulling brilliance. Sourced from glacial mountain peaks discovered in 1881.",
  },
  {
    id: "pearl",
    name: "Pearl",
    subtitle: "Natural Luminescence Born in Oceanic Solitude",
    provenance: "South Seas · Australia & Tahiti",
    hardness: "2.5–4.5 Mohs (Organic Nacre)",
    refractiveIndex: "Iridescent Orient Refraction",
    atmosphereColor: "from-[#15120E] to-[#201B14]",
    accentColor: "#E2D3B8",
    image: "/images/gem-pearl.jpg",
    story:
      "The only gem created by a living entity. Thick layers of concentric aragonite nacre produce an ethereal orient glow that warms immediately against human skin.",
  },
];

export default function StoneStory() {
  const [activeStone, setActiveStone] = useState<GemstoneData>(GEMSTONES[0]);

  return (
    <section
      id="gemstones"
      className="relative w-full min-h-screen py-28 md:py-36 transition-colors duration-1000 text-[#F5F0E8] overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #0B0A08 0%, ${
          activeStone.id === "emerald"
            ? "#061A0E"
            : activeStone.id === "ruby"
            ? "#22050B"
            : activeStone.id === "sapphire"
            ? "#050C1F"
            : activeStone.id === "pearl"
            ? "#17140E"
            : "#0F0E0C"
        } 50%, #0B0A08 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.45em] text-[#C6A15B]">
            Gemology & Earth Origin
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F5F0E8] font-light mt-3 tracking-tight">
            THE STONE <span className="italic text-[#C6A15B]">IS THE STORY.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F5F0E8]/60 font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Every gemstone selected by Aurelia is untreated, ethically acquired,
            and examined for extraordinary optical character.
          </p>
        </div>

        {/* Gemstone Atmosphere Selector Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-6 mb-16 border-b border-white/10 pb-6">
          {GEMSTONES.map((gem) => (
            <button
              key={gem.id}
              onClick={() => setActiveStone(gem)}
              className={`text-xs uppercase font-sans tracking-[0.3em] py-2 px-4 transition-all duration-500 relative ${
                activeStone.id === gem.id
                  ? "text-[#F5F0E8] font-medium"
                  : "text-[#F5F0E8]/40 hover:text-[#F5F0E8]"
              }`}
            >
              {gem.name}
              {activeStone.id === gem.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
                  style={{ backgroundColor: gem.accentColor }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Selected Gemstone Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Macro Gemstone Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-sm overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-white/10 group bg-[#0B0A08]">
              <Image
                src={activeStone.image}
                alt={`${activeStone.name} Macro Photography`}
                fill
                className="object-cover object-center transition-all duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />

              {/* Internal Crystal Depth Glow */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"
                style={{
                  background: `radial-gradient(circle, ${activeStone.accentColor} 0%, transparent 70%)`,
                }}
              />
            </div>
          </div>

          {/* Right: Gemological Story & Scientific Specifications */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span
                className="text-[10px] uppercase font-sans tracking-[0.35em] block mb-2"
                style={{ color: activeStone.accentColor }}
              >
                {activeStone.name} · Provenance
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F0E8] font-light leading-tight">
                {activeStone.subtitle}
              </h3>
              <p className="text-sm md:text-base text-[#F5F0E8]/70 font-light mt-6 leading-relaxed">
                {activeStone.story}
              </p>
            </div>

            {/* Scientific Specs Table */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                  Geological Origin
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-light">
                  {activeStone.provenance}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                  Hardness Rating
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-light">
                  {activeStone.hardness}
                </p>
              </div>

              <div className="col-span-2 space-y-1 pt-2">
                <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                  Optical Characteristic
                </span>
                <p className="text-xs sm:text-sm text-[#F5F0E8] font-light">
                  {activeStone.refractiveIndex}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
