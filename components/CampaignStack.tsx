"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StackPhoto {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  initialRotation: number;
  zIndex: number;
}

const STACK_PHOTOS: StackPhoto[] = [
  {
    id: "chandelier",
    title: "The Cascade Chandelier",
    subtitle: "Platinum & Pear-Cut Diamonds",
    image: "/images/collection-chandelier-earrings.jpg",
    initialRotation: -3.2,
    zIndex: 6,
  },
  {
    id: "solitaire",
    title: "The Sovereign Solitaire",
    subtitle: "D-Flawless Type IIa Diamond",
    image: "/images/collection-solitaire-ring.jpg",
    initialRotation: 2.4,
    zIndex: 8,
  },
  {
    id: "collar",
    title: "The Eternity Cascade Collar",
    subtitle: "Archival Exhibition Specimen",
    image: "/images/collection-eternity-necklace.jpg",
    initialRotation: 0,
    zIndex: 10,
  },
  {
    id: "cuff",
    title: "The Serpentine Cuff",
    subtitle: "Sculptural 18k Satin Noble Alloy",
    image: "/images/collection-cuff-bracelet.jpg",
    initialRotation: -2.1,
    zIndex: 8,
  },
  {
    id: "brooch",
    title: "The Sovereign Brooch",
    subtitle: "Unheated Colombian Emerald",
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
      // Pin stage for the full 200vh section height with pinSpacing: false so BridalSection overrides it
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinStageRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Cards settle along a circular arc over the first 100vh of scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
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
            duration: 1.2,
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
            duration: 1.2,
          },
          0.1
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
            duration: 1.2,
          },
          0.1
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
            duration: 1.2,
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
            duration: 1.2,
          },
          0.15
        );
      }
    });

    // Mobile (Fanned out circular arc accordion deck)
    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinStageRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1.0,
        },
      });

      if (photoRefs.current[0]) {
        tl.to(
          photoRefs.current[0],
          {
            xPercent: -70,
            yPercent: 7.5,
            rotation: -11,
            scale: 0.88,
            ease: "power2.out",
            duration: 1,
          },
          0
        );
      }

      if (photoRefs.current[1]) {
        tl.to(
          photoRefs.current[1],
          {
            xPercent: -35,
            yPercent: 2.5,
            rotation: -5,
            scale: 0.94,
            ease: "power2.out",
            duration: 1,
          },
          0.08
        );
      }

      if (photoRefs.current[3]) {
        tl.to(
          photoRefs.current[3],
          {
            xPercent: 35,
            yPercent: 2.5,
            rotation: 5,
            scale: 0.94,
            ease: "power2.out",
            duration: 1,
          },
          0.08
        );
      }

      if (photoRefs.current[4]) {
        tl.to(
          photoRefs.current[4],
          {
            xPercent: 70,
            yPercent: 7.5,
            rotation: 11,
            scale: 0.88,
            ease: "power2.out",
            duration: 1,
          },
          0
        );
      }

      if (photoRefs.current[2]) {
        tl.to(
          photoRefs.current[2],
          {
            xPercent: 0,
            yPercent: -1,
            rotation: 0,
            scale: 1.05,
            ease: "power2.out",
            duration: 1,
          },
          0.12
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="campaign-stack"
      style={{ zIndex: 10 }}
      className="relative z-10 w-full h-[200vh] bg-[#090807] text-[#F5F0E8]"
    >
      <div
        ref={pinStageRef}
        style={{ zIndex: 10 }}
        className="relative z-10 w-full h-screen overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10 px-5 sm:px-8 md:px-14 bg-[#090807]"
      >
        {/* Top Header */}
        <div className="relative z-20 max-w-3xl mx-auto text-center pt-2 sm:pt-4 shrink-0">
          <span className="text-[10px] md:text-xs uppercase font-sans tracking-[0.4em] text-[#C6A15B]">
            Editorial Proof Table
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#F5F0E8] font-light mt-1.5 sm:mt-2 tracking-tight">
            THE CAMPAIGN <span className="italic text-[#C6A15B]">PROOFS.</span>
          </h2>
          <p className="text-xs sm:text-[13px] text-[#F5F0E8]/60 font-light mt-1.5">
            Scroll to reveal the photographic proofs settled across the Maison archive.
          </p>
        </div>

        {/* Central Physical Photo Stack Canvas (Spreads Out into 5 Settled Cards) */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-auto py-2">
          <div className="relative w-[68vw] sm:w-[32vw] md:w-[22vw] lg:w-[17vw] xl:w-[16vw] max-w-[270px] aspect-[3/4]">
            {STACK_PHOTOS.map((photo, index) => (
              <div
                key={photo.id}
                ref={(el) => {
                  photoRefs.current[index] = el;
                }}
                className={`absolute inset-0 p-2 sm:p-2.5 pb-5 sm:pb-6 bg-[#161513] border rounded-sm shadow-[0_25px_70px_rgba(0,0,0,0.95)] will-change-transform select-none flex flex-col justify-between transition-colors duration-300 ${
                  index === 2
                    ? "border-[#C6A15B]/40 hover:border-[#C6A15B]"
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
                    sizes="(max-width: 768px) 70vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/70 via-transparent to-transparent" />
                </div>

                {/* Physical Print Footer Caption (Clean, No Numbers) */}
                <div className="pt-2 px-1 text-center shrink-0">
                  <p className="font-serif text-[11.5px] sm:text-xs text-[#F5F0E8] font-light truncate">
                    {photo.title}
                  </p>
                  <span className="text-[7.5px] sm:text-[8px] font-sans tracking-[0.16em] text-[#C6A15B]/80 block truncate mt-0.5 uppercase">
                    {photo.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Progress Cue */}
        <div className="relative z-20 flex items-center justify-between text-[9.5px] sm:text-[10px] uppercase font-sans tracking-[0.25em] text-[#F5F0E8]/40 border-t border-white/5 pt-3 shrink-0">
          <span>Editorial Archive Sequence</span>
          <span className="text-[#C6A15B]">Scroll to Settle Proofs ↓</span>
        </div>
      </div>
    </section>
  );
}
