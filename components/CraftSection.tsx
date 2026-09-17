"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
}

const STAGES: ProcessStage[] = [
  {
    step: "Stage 01",
    title: "THE STONE",
    subtitle: "Sorting & Gemological Harmonization",
    description:
      "Hundreds of rough and faceted stones are auditioned for color matching, pavilion depth, and natural fire. Fewer than three percent meet Aurelia standards.",
    hours: "40+ Hours of Selection",
  },
  {
    step: "Stage 02",
    title: "THE ARCHITECTURE",
    subtitle: "Wax Maquette & Hand-Forged Platinum",
    description:
      "A three-dimensional wax sculpture is carved entirely by hand, calculating the exact weight distribution and articulated hinge flexures.",
    hours: "65 Hours of Metalwork",
  },
  {
    step: "Stage 03",
    title: "THE SETTING",
    subtitle: "Micro-Prong & Serti Invisible",
    description:
      "Under high-power binocular microscopes, the artisan pushes tapered platinum beads over each gem facet without scratching the crystal pavilion.",
    hours: "120 Hours of Micro-Setting",
  },
  {
    step: "Stage 04",
    title: "THE POLISHING",
    subtitle: "Multi-Step Rouge & Thread Polishing",
    description:
      "Delicate cotton threads coated in jewelers rouge are pulled through interior gallery piercings to ensure unseen surfaces achieve a mirror shine.",
    hours: "35 Hours of Hand Finish",
  },
  {
    step: "Stage 05",
    title: "THE MASTERPIECE",
    subtitle: "Atelier Signature & Hallmarking",
    description:
      "The jewel is struck with the Aurelia maison mark and official national assay hallmarks, sealed into an archival handcrafted presentation coffer.",
    hours: "Eternal Heirloom Complete",
  },
];

export default function CraftSection() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(2);

  return (
    <section
      id="craft"
      className="relative w-full py-28 md:py-36 bg-[#0B0A08] text-[#F5F0E8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 mb-16 gap-6">
          <div>
            <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
              Place Vendôme & Indian Atelier
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#F5F0E8] font-light mt-2 tracking-tight">
              THE ART OF <span className="italic text-[#C6A15B]">MAKING.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#F5F0E8]/60 font-light leading-relaxed">
            Preserving techniques unchanged across four centuries. Where
            patience is the only measure of true luxury.
          </p>
        </div>

        {/* Master Visual & Active Process Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Authentic Master Goldsmith Photograph */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] bg-[#141310] group">
              <Image
                src="/images/craft-atelier-hands.jpg"
                alt="Master Goldsmith setting diamond in high jewellery atelier"
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[9px] uppercase font-sans tracking-[0.3em] text-[#C6A15B]">
                    Atelier Place Vendôme
                  </span>
                  <p className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light mt-1">
                    The Setter&apos;s Bench
                  </p>
                </div>
                <span className="text-[10px] font-sans tracking-[0.2em] text-[#F5F0E8]/50 hidden sm:block">
                  40x Magnification
                </span>
              </div>
            </div>
          </div>

          {/* Right: The 5-Stage Editorial Sequence */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase font-sans tracking-[0.35em] text-[#C6A15B] block mb-2">
              The Metamorphosis Sequence
            </span>

            <div className="space-y-3">
              {STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <div
                    key={stage.step}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`p-5 transition-all duration-500 border cursor-pointer ${
                      isActive
                        ? "bg-[#141310] border-[#C6A15B] shadow-lg"
                        : "bg-transparent border-white/5 hover:border-white/20 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[9px] font-sans uppercase tracking-[0.25em] ${
                            isActive ? "text-[#C6A15B]" : "text-white/40"
                          }`}
                        >
                          {stage.step}
                        </span>
                        <h4 className="font-serif text-lg md:text-xl text-[#F5F0E8] font-light">
                          {stage.title}
                        </h4>
                      </div>
                      <span className="text-[9px] font-sans tracking-[0.2em] text-[#C6A15B]/80">
                        {stage.hours}
                      </span>
                    </div>

                    {isActive && (
                      <div
                        key={`stage-details-${stage.step}`}
                        className="mt-3 pt-3 border-t border-[#C6A15B]/30 space-y-1 animate-canva-rise"
                      >
                        <p className="text-xs text-[#C6A15B] font-light tracking-wide">
                          {stage.subtitle}
                        </p>
                        <p className="text-xs text-[#F5F0E8]/80 font-light leading-relaxed pt-1">
                          {stage.description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
