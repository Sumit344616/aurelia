"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StackPhoto {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  shortSubtitle: string;
  image: string;
  initialRotation: number;
  zIndex: number;
}

const STACK_PHOTOS: StackPhoto[] = [
  {
    id: "chandelier",
    title: "The Cascade Chandelier",
    shortTitle: "The Chandelier",
    subtitle: "Platinum & Pear-Cut Diamonds",
    shortSubtitle: "Diamonds & Platinum",
    image: "/images/collection-chandelier-earrings.jpg",
    initialRotation: -3.2,
    zIndex: 6,
  },
  {
    id: "solitaire",
    title: "The Sovereign Solitaire",
    shortTitle: "The Solitaire",
    subtitle: "D-Flawless Type IIa Diamond",
    shortSubtitle: "D-Flawless Diamond",
    image: "/images/collection-solitaire-ring.jpg",
    initialRotation: 2.4,
    zIndex: 8,
  },
  {
    id: "collar",
    title: "The Eternity Cascade Collar",
    shortTitle: "The Cascade Collar",
    subtitle: "Archival Exhibition Specimen",
    shortSubtitle: "Archival Specimen",
    image: "/images/collection-eternity-necklace.jpg",
    initialRotation: 0,
    zIndex: 10,
  },
  {
    id: "cuff",
    title: "The Serpentine Cuff",
    shortTitle: "The Serpentine",
    subtitle: "Sculptural 18k Satin Noble Alloy",
    shortSubtitle: "18k Satin Gold",
    image: "/images/collection-cuff-bracelet.jpg",
    initialRotation: -2.1,
    zIndex: 8,
  },
  {
    id: "brooch",
    title: "The Sovereign Brooch",
    shortTitle: "The Sovereign",
    subtitle: "Unheated Colombian Emerald",
    shortSubtitle: "Colombian Emerald",
    image: "/images/signature-piece.jpg",
    initialRotation: 3.5,
    zIndex: 6,
  },
];


export default function CampaignStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop / Tablet (Spread across circular arc: 2 left, 1 center apex, 2 right)
    mm.add("(min-width: 768px)", () => {
      // Pin pinStageRef to viewport while BridalSection scrolls up and overrides it
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: pinStageRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Cards settle along circular arc over the first scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 0.75),
          scrub: 1.0,
        },
      });

      // Card 0: Far Left Settle (Dipped on circle arc)
      if (photoRefs.current[0]) {
        tl.to(
          photoRefs.current[0],
          {
            xPercent: -208,
            yPercent: 12,
            rotation: -8.5,
            scale: 0.93,
            ease: "power2.out",
          },
          0
        );
      }

      // Card 1: Inner Left Settle (Gently curved on circle arc)
      if (photoRefs.current[1]) {
        tl.to(
          photoRefs.current[1],
          {
            xPercent: -104,
            yPercent: 4,
            rotation: -4,
            scale: 0.98,
            ease: "power2.out",
          },
          0.06
        );
      }

      // Card 3: Inner Right Settle (Gently curved on circle arc)
      if (photoRefs.current[3]) {
        tl.to(
          photoRefs.current[3],
          {
            xPercent: 104,
            yPercent: 4,
            rotation: 4,
            scale: 0.98,
            ease: "power2.out",
          },
          0.06
        );
      }

      // Card 4: Far Right Settle (Dipped on circle arc)
      if (photoRefs.current[4]) {
        tl.to(
          photoRefs.current[4],
          {
            xPercent: 208,
            yPercent: 12,
            rotation: 8.5,
            scale: 0.93,
            ease: "power2.out",
          },
          0
        );
      }

      // Card 2: Center - Remains in Middle (Circle apex / hero spotlight)
      if (photoRefs.current[2]) {
        tl.to(
          photoRefs.current[2],
          {
            xPercent: 0,
            yPercent: -2,
            rotation: 0,
            scale: 1.06,
            ease: "power2.out",
          },
          0.1
        );
      }
    });

    // Mobile (Fanned out circular arc deck - all 5 cards visible with zero edge clipping)
    mm.add("(max-width: 767px)", () => {
      // Pin pinStageRef to viewport while BridalSection scrolls up and overrides it
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: pinStageRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 0.7),
          scrub: 1.0,
        },
      });

      if (photoRefs.current[0]) {
        tl.to(
          photoRefs.current[0],
          {
            xPercent: -86,
            yPercent: 6,
            rotation: -8.5,
            scale: 0.88,
            ease: "power2.out",
          },
          0
        );
      }

      if (photoRefs.current[1]) {
        tl.to(
          photoRefs.current[1],
          {
            xPercent: -43,
            yPercent: 2,
            rotation: -4,
            scale: 0.94,
            ease: "power2.out",
          },
          0.05
        );
      }

      if (photoRefs.current[3]) {
        tl.to(
          photoRefs.current[3],
          {
            xPercent: 43,
            yPercent: 2,
            rotation: 4,
            scale: 0.94,
            ease: "power2.out",
          },
          0.05
        );
      }

      if (photoRefs.current[4]) {
        tl.to(
          photoRefs.current[4],
          {
            xPercent: 86,
            yPercent: 6,
            rotation: 8.5,
            scale: 0.88,
            ease: "power2.out",
          },
          0
        );
      }

      if (photoRefs.current[2]) {
        tl.to(
          photoRefs.current[2],
          {
            xPercent: 0,
            yPercent: -2,
            rotation: 0,
            scale: 1.06,
            ease: "power2.out",
          },
          0.08
        );
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="campaign-stack-container"
      style={{ zIndex: 10 }}
      className="relative z-10 w-full h-[190vh] bg-[#090807]"
    >
      {/* 
        Pinned Stage:
        GSAP pins this stage firmly to the top of the viewport for the container height,
        allowing BridalSection (z-30) to naturally scroll up and override/overlap it like an opulent curtain!
      */}
      <section
        ref={pinStageRef}
        id="campaign-stack"
        style={{ zIndex: 10 }}
        className="w-full h-screen overflow-hidden flex flex-col justify-between pt-24 sm:pt-22 md:pt-16 pb-5 sm:pb-6 px-4 sm:px-8 md:px-14 bg-[#090807] text-[#F5F0E8]"
      >
        {/* Top Header (Cleanly Clears Fixed Navbar on Mobile & Desktop) */}
        <div className="relative z-20 max-w-3xl mx-auto text-center shrink-0">
          <span className="text-[9px] sm:text-[10px] md:text-xs uppercase font-sans tracking-[0.35em] sm:tracking-[0.4em] text-[#C6A15B]">
            Editorial Proof Table
          </span>
          <h2 className="font-serif text-xl sm:text-3xl md:text-5xl text-[#F5F0E8] font-light mt-1 tracking-tight">
            THE CAMPAIGN <span className="italic text-[#C6A15B]">PROOFS.</span>
          </h2>
          <p className="text-[11px] sm:text-xs md:text-[13px] text-[#F5F0E8]/60 font-light mt-1">
            Scroll to reveal the photographic proofs settled across the Maison archive.
          </p>
        </div>

        {/* Central Physical Photo Stack Canvas (Properly Proportioned for Mobile & Desktop) */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-auto py-1 sm:py-2">
          <div className="relative w-[34vw] sm:w-[26vw] md:w-[22vw] lg:w-[17vw] xl:w-[16vw] max-w-[130px] sm:max-w-[170px] md:max-w-[220px] lg:max-w-[270px] aspect-[3/4]">
            {STACK_PHOTOS.map((photo, index) => (
              <div
                key={photo.id}
                ref={(el) => {
                  photoRefs.current[index] = el;
                }}
                className={`absolute inset-0 p-1.5 sm:p-2 md:p-2.5 pb-4 sm:pb-5 md:pb-6 bg-[#161513] border rounded-sm shadow-[0_25px_70px_rgba(0,0,0,0.95)] will-change-transform select-none flex flex-col justify-between transition-colors duration-300 ${
                  index === 2
                    ? "border-[#C6A15B]/50 hover:border-[#C6A15B] shadow-[0_25px_70px_rgba(198,161,91,0.12)]"
                    : "border-white/15 hover:border-[#C6A15B]/30"
                }`}
                style={{
                  transform: `rotate(${photo.initialRotation}deg)`,
                  zIndex: photo.zIndex,
                }}
              >
                {/* Image Canvas */}
                <div className="relative w-full flex-1 overflow-hidden bg-[#0B0A08] rounded-[2px]">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 40vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/70 via-transparent to-transparent" />
                </div>

                {/* Physical Print Footer Caption (Clean, Legible on Mobile & Desktop) */}
                <div className="pt-1.5 sm:pt-2 px-1 text-center shrink-0">
                  <p className="font-serif text-[9.5px] sm:text-[11.5px] md:text-xs text-[#F5F0E8] font-light truncate leading-tight">
                    <span className="hidden sm:inline">{photo.title}</span>
                    <span className="sm:hidden">{photo.shortTitle}</span>
                  </p>
                  <span className="text-[7px] sm:text-[7.5px] md:text-[8px] font-sans tracking-[0.14em] sm:tracking-[0.16em] text-[#C6A15B]/85 block truncate mt-0.5 uppercase">
                    <span className="hidden sm:inline">{photo.subtitle}</span>
                    <span className="sm:hidden">{photo.shortSubtitle}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Archive Cue (Removed the requested 'Scroll for Bridal Collection' line) */}
        <div className="relative z-20 flex items-center justify-between text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/40 border-t border-white/5 pt-2.5 sm:pt-3 shrink-0">
          <span>Editorial Archive Sequence</span>
          <span className="text-[#C6A15B]/50 font-serif italic text-xs tracking-normal">Maison Aurelia</span>
        </div>
      </section>
    </div>
  );
}
