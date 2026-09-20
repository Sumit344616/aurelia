"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CollectionRunwayProps {
  onSelectPiece: (pieceName: string) => void;
}

interface Piece {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  materials: string;
  image: string;
  isMarquee?: boolean;
}

const PIECES: Piece[] = [
  {
    id: "01",
    name: "The Eternity Necklace",
    subtitle: "A cascade of light sculpted in platinum and pear diamonds.",
    category: "High Jewellery Necklace",
    materials: "D-Flawless Diamonds · 18k White Gold",
    image: "/images/collection-eternity-necklace.jpg",
    isMarquee: true,
  },
  {
    id: "02",
    name: "The Imperial Solitaire",
    subtitle: "Emerald-cut geometry embraced by hand-sculpted prongs.",
    category: "Rings & Solitaires",
    materials: "12.4 Carats · Platinum 950",
    image: "/images/collection-solitaire-ring.jpg",
  },
  {
    id: "03",
    name: "The Cascade Chandelier",
    subtitle: "Articulated leaf drops that sway with Parisian grace.",
    category: "Chandelier Earrings",
    materials: "Marquise & Pear Diamonds · Platinum",
    image: "/images/collection-chandelier-earrings.jpg",
  },
  {
    id: "04",
    name: "The Serpentine Cuff",
    subtitle: "Brushed 18k yellow gold waves in continuous harmony.",
    category: "Sculptural Bracelet",
    materials: "Satin 18k Gold · Micro-Pavé",
    image: "/images/collection-cuff-bracelet.jpg",
  },
  {
    id: "05",
    name: "The Rajputana Royal Parure",
    subtitle: "Uncut Polki diamonds and Zambian emeralds.",
    category: "Bridal Heirloom",
    materials: "Polki Diamonds · Zambian Emeralds · 22k Gold",
    image: "/images/bridal-heirloom.jpg",
  },
];

export default function CollectionRunway({
  onSelectPiece,
}: CollectionRunwayProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !pinStageRef.current || !trackRef.current)
        return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth + 200;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1.2,
          pin: pinStageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal runway movement: Right to Left
      tl.to(track, {
        x: () => -scrollWidth,
        ease: "none",
      });

      // Background watermark parallax: slower movement (0.3x)
      if (bgTextRef.current) {
        tl.to(
          bgTextRef.current,
          {
            x: () => -scrollWidth * 0.3,
            ease: "none",
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative w-full bg-[#0B0A08] text-[#F5F0E8]"
    >
      <div
        ref={pinStageRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-8 md:px-14"
      >
        {/* Top Editorial Header (Clean, Compact, No Overlap) */}
        <div className="relative z-20 flex items-baseline justify-between border-b border-white/10 pb-2.5 sm:pb-3 shrink-0">
          <div className="flex items-baseline gap-4">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F5F0E8] font-light tracking-tight">
              THE COLLECTION.
            </h2>
            <span className="hidden sm:inline-block text-xs text-[#F5F0E8]/50 font-light tracking-wide">
              Pieces designed to outlive the moment.
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[9px] uppercase font-sans tracking-[0.25em] text-[#C6A15B]">
            <span>Rings</span>
            <span>·</span>
            <span>Necklaces</span>
            <span>·</span>
            <span>Earrings</span>
            <span>·</span>
            <span>Bracelets</span>
          </div>
        </div>

        {/* Background Depth Watermark Typography */}
        <div
          ref={bgTextRef}
          className="absolute inset-y-0 left-0 flex items-center pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.03] will-change-transform"
        >
          <span className="font-serif text-[24vw] uppercase tracking-[0.2em] text-white">
            AURELIA HAUTE JOAILLERIE
          </span>
        </div>

        {/* Horizontal Moving Runway (Uniform Luxury Aspect Ratio Cards) */}
        <div
          ref={trackRef}
          className="relative z-10 flex items-center my-auto gap-5 sm:gap-8 md:gap-10 will-change-transform py-1 sm:py-2"
        >
          {PIECES.map((piece) => (
            <div
              key={piece.id}
              data-cursor="explore"
              onClick={() => onSelectPiece(piece.name)}
              className="shrink-0 flex flex-col w-[210px] sm:w-[250px] md:w-[280px] group cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image Container Uniform 3:4 Aspect Ratio */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#141310] border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.85)] group-hover:border-[#C6A15B]/40 transition-colors">
                <Image
                  src={piece.image}
                  alt={piece.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 260px, 280px"
                />

                {/* Chiaroscuro Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/90 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Hover Studio Light Sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C6A15B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* Editorial Piece Metadata (Clean, Spacious Luxury Presentation) */}
              <div className="mt-3.5 space-y-1.5">
                <span className="text-[8.5px] uppercase font-sans tracking-[0.28em] text-[#C6A15B] block">
                  {piece.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg text-[#F5F0E8] font-light group-hover:text-[#C6A15B] transition-colors line-clamp-1">
                  {piece.name}
                </h3>
                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[8.5px] font-sans uppercase tracking-[0.2em] text-[#F5F0E8]/50">
                  <span className="truncate max-w-[170px]">{piece.materials}</span>
                  <span className="text-[#C6A15B] group-hover:translate-x-1 transition-transform shrink-0 font-medium">
                    Inquire →
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* End of Runway Minimalist Statement Card */}
          <div className="shrink-0 w-[240px] sm:w-[280px] flex flex-col justify-center px-6 text-left">
            <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-[#C6A15B]">
              Atelier Archive
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F0E8] font-light mt-2 leading-snug">
              One of One.
              <br />
              Never Replicated.
            </h3>
            <p className="text-[11px] text-[#F5F0E8]/60 font-light mt-2.5 leading-relaxed">
              Every stone is sourced through confidential private tenders and
              set in hand-cast 18k noble alloys.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
